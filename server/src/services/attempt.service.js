import crypto from 'crypto';
import mongoose from 'mongoose';
import { Exam } from '../models/Exam.js';
import { Question } from '../models/Question.js';
import { ExamAttempt } from '../models/ExamAttempt.js';
import { Result } from '../models/Result.js';
import { Certificate } from '../models/Certificate.js';
import { User } from '../models/User.js';
import { logAuditAction } from '../middleware/audit.middleware.js';
import { certificateQueue } from '../jobs/queue.js';

export async function startAttempt({ examId, stageNumber = 1, user, req }) {
  const isObjectId = mongoose.Types.ObjectId.isValid(examId);
  const conditions = [{ id: examId }, { slug: examId.toLowerCase() }];
  if (isObjectId) {
    conditions.push({ _id: examId });
  }
  const exam = await Exam.findOne({ $or: conditions });

  if (!exam) {
    const error = new Error(`Examination '${examId}' not found.`);
    error.statusCode = 404;
    throw error;
  }

  // Check stage eligibility if multi-stage
  if (exam.isMultiStage && stageNumber > 1) {
    const prevStageKey = `stage${stageNumber - 1}`;
    const prevStatus = user.stageStatus?.[prevStageKey]?.status;
    if (prevStatus !== 'qualified' && prevStatus !== 'completed' && user.role !== 'super_admin') {
      const error = new Error(
        `Stage ${stageNumber} is locked. You must qualify in Stage ${stageNumber - 1} with at least ${exam.passingPercentage}% to unlock this stage.`
      );
      error.statusCode = 403;
      throw error;
    }
  }

  // Check if there is an active unexpired attempt for this user and exam
  const existingAttempt = await ExamAttempt.findOne({
    user: user._id,
    exam: exam._id,
    stageNumber,
    status: 'in_progress',
  });

  if (existingAttempt) {
    const now = new Date();
    // If still valid in time, resume existing attempt!
    if (now < existingAttempt.expiresAt) {
      const questions = await Question.find({ id: { $in: existingAttempt.questionIds } }).sort({ chapter: 1, verse: 1 });
      const secondsLeft = Math.max(0, Math.floor((existingAttempt.expiresAt.getTime() - now.getTime()) / 1000));

      return {
        attempt: existingAttempt,
        questions,
        secondsLeft,
        isResumed: true,
      };
    } else {
      // Time expired: auto submit and evaluate
      await submitAttempt({ attemptId: existingAttempt.attemptId, user, autoTimeout: true });
    }
  }

  // Determine stage duration and questions count
  let durationMinutes = exam.durationMinutes;
  let totalQuestionsCount = exam.totalQuestions;

  if (exam.isMultiStage && exam.stages?.length >= stageNumber) {
    const stageConf = exam.stages.find((s) => s.stageNumber === stageNumber) || exam.stages[stageNumber - 1];
    if (stageConf) {
      durationMinutes = stageConf.durationMinutes || durationMinutes;
      totalQuestionsCount = stageConf.totalQuestions || totalQuestionsCount;
    }
  }

  // Fetch candidate questions (never sending answer keys)
  let candidateQuestions = await Question.find({ isActive: true }).limit(totalQuestionsCount);

  if (candidateQuestions.length === 0) {
    const error = new Error('No questions available in the question bank for this examination.');
    error.statusCode = 500;
    throw error;
  }

  const questionIds = candidateQuestions.map((q) => q.id);
  const totalSeconds = durationMinutes * 60;
  const startedAt = new Date();
  const expiresAt = new Date(startedAt.getTime() + totalSeconds * 1000);
  const attemptId = `att-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;

  const newAttempt = await ExamAttempt.create({
    attemptId,
    exam: exam._id,
    examIdString: exam.id,
    examName: exam.name,
    stageNumber,
    user: user._id,
    candidateName: user.name,
    candidateRollNo: user.rollNo || `GLC-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    questionIds,
    durationMinutes,
    totalSeconds,
    startedAt,
    expiresAt,
    status: 'in_progress',
    answers: {},
    reviewMarks: {},
    ipAddress: req?.ip || '',
    userAgent: req?.headers?.['user-agent'] || '',
  });

  await logAuditAction({
    action: 'EXAM_ATTEMPT_START',
    req,
    targetResource: 'ExamAttempt',
    targetId: newAttempt.attemptId,
    details: { examName: exam.name, stageNumber, rollNo: newAttempt.candidateRollNo },
  });

  return {
    attempt: newAttempt,
    questions: candidateQuestions,
    secondsLeft: totalSeconds,
    isResumed: false,
  };
}

export async function saveAnswer({ attemptId, questionId, selectedOption, isReview, currentQuestionIndex, user }) {
  const attempt = await ExamAttempt.findOne({ attemptId, user: user._id });
  if (!attempt) {
    const error = new Error('Exam attempt not found or does not belong to you.');
    error.statusCode = 404;
    throw error;
  }

  if (attempt.status !== 'in_progress') {
    const error = new Error('Cannot save answers. This exam attempt has already been submitted or completed.');
    error.statusCode = 400;
    throw error;
  }

  const now = new Date();
  // Check if server timer expired
  if (now > attempt.expiresAt) {
    await submitAttempt({ attemptId, user, autoTimeout: true });
    const error = new Error('Exam time limit has expired. Your attempt has been automatically submitted.');
    error.statusCode = 400;
    throw error;
  }

  // Update answers Map
  if (selectedOption === null || selectedOption === undefined || selectedOption === '') {
    attempt.answers.delete(questionId);
  } else {
    attempt.answers.set(questionId, selectedOption);
  }

  // Update review mark if provided
  if (typeof isReview === 'boolean') {
    attempt.reviewMarks.set(questionId, isReview);
  }

  if (typeof currentQuestionIndex === 'number') {
    attempt.currentQuestionIndex = currentQuestionIndex;
  }

  await attempt.save();

  return {
    saved: true,
    answers: Object.fromEntries(attempt.answers),
    reviewMarks: Object.fromEntries(attempt.reviewMarks),
  };
}

export async function getAttemptDetails({ attemptId, user }) {
  const attempt = await ExamAttempt.findOne({ attemptId, user: user._id });
  if (!attempt) {
    const error = new Error('Exam attempt not found.');
    error.statusCode = 404;
    throw error;
  }

  const now = new Date();
  const secondsLeft = Math.max(0, Math.floor((attempt.expiresAt.getTime() - now.getTime()) / 1000));

  // If time expired and still in progress, auto submit
  if (secondsLeft === 0 && attempt.status === 'in_progress') {
    return submitAttempt({ attemptId, user, autoTimeout: true });
  }

  const questions = await Question.find({ id: { $in: attempt.questionIds } }).sort({ chapter: 1, verse: 1 });

  return {
    attempt,
    questions,
    secondsLeft,
  };
}

export async function submitAttempt({ attemptId, user, autoTimeout = false, req = null }) {
  const attempt = await ExamAttempt.findOne({ attemptId, user: user._id });
  if (!attempt) {
    const error = new Error('Exam attempt not found.');
    error.statusCode = 404;
    throw error;
  }

  // IDEMPOTENCY: If already submitted or evaluated, return existing Result
  const existingResult = await Result.findOne({ attempt: attempt._id });
  if (existingResult) {
    return existingResult;
  }

  // Mark attempt as submitted
  attempt.status = autoTimeout ? 'timed_out' : 'submitted';
  attempt.submittedAt = new Date();
  await attempt.save();

  // Load Exam definition for passing criteria & negative marking
  const exam = await Exam.findById(attempt.exam);
  const questions = await Question.find({ id: { $in: attempt.questionIds } }).select('+correctAnswer +explanation');

  let correct = 0;
  let incorrect = 0;
  let unattempted = 0;
  let obtainedMarks = 0;
  let totalMarks = 0;
  const questionReviews = [];

  for (const q of questions) {
    const qMarks = q.marks || 2;
    const qNeg = exam?.negativeMarking ? q.negativeMarks || exam.negativeMarkValue || 0 : 0;
    totalMarks += qMarks;

    const userAns = attempt.answers.get(q.id);
    const isCorrect = userAns && userAns.toUpperCase() === q.correctAnswer.toUpperCase();

    if (!userAns) {
      unattempted++;
    } else if (isCorrect) {
      correct++;
      obtainedMarks += qMarks;
    } else {
      incorrect++;
      obtainedMarks = Math.max(0, obtainedMarks - qNeg);
    }

    // Prepare reviewed question snapshot with released explanation
    questionReviews.push({
      id: q.id,
      question: q.question,
      questionHindi: q.questionHindi,
      shlokaText: q.shlokaText,
      chapter: q.chapter,
      verse: q.verse,
      marks: qMarks,
      userAnswer: userAns || 'Not Attempted',
      correctAnswer: q.correctAnswer,
      isCorrect: Boolean(isCorrect),
      explanation: q.explanation || 'Refer to Bhagavad Gita as It Is for philosophical details.',
    });
  }

  const percentage = totalMarks > 0 ? parseFloat(((obtainedMarks / totalMarks) * 100).toFixed(1)) : 0;
  const passingScore = exam?.passingMarks || (totalMarks * (exam?.passingPercentage || 60)) / 100;
  const isPass = obtainedMarks >= passingScore;

  let meritTier = 'Participant';
  if (percentage >= 90) meritTier = 'Gold Distinction (Top 5%)';
  else if (percentage >= 75) meritTier = 'Silver Merit (Top 15%)';
  else if (percentage >= 50) meritTier = 'Bronze Achiever';

  const resultId = `res-${Date.now()}`;
  const certificateId = `CERT-GLC-2026-${Math.floor(1000 + Math.random() * 9000)}`;
  const timeSpentSeconds = Math.min(
    attempt.totalSeconds,
    Math.floor((attempt.submittedAt.getTime() - attempt.startedAt.getTime()) / 1000)
  );

  const resultRecord = await Result.create({
    resultId,
    ...(isPass ? { certificateId } : {}),
    attempt: attempt._id,
    exam: attempt.exam,
    examIdString: attempt.examIdString,
    examName: attempt.examName,
    stageNumber: attempt.stageNumber,
    user: user._id,
    candidateName: attempt.candidateName,
    rollNo: attempt.candidateRollNo,
    totalQuestions: questions.length,
    attempted: correct + incorrect,
    correct,
    incorrect,
    unattempted,
    score: parseFloat(obtainedMarks.toFixed(1)),
    totalMarks,
    percentage,
    timeSpentSeconds,
    resultStatus: isPass ? 'pass' : 'fail',
    meritTier,
    answers: Object.fromEntries(attempt.answers),
    questionReviews,
  });

  // If passed, create Certificate
  if (isPass) {
    const verificationCode = crypto
      .createHash('sha256')
      .update(`${certificateId}-${resultRecord._id}-${user.rollNo}`)
      .digest('hex')
      .substring(0, 16)
      .toUpperCase();

    await Certificate.create({
      certificateId,
      verificationCode,
      user: user._id,
      result: resultRecord._id,
      candidateName: attempt.candidateName,
      rollNo: attempt.candidateRollNo,
      examName: attempt.examName,
      meritTier,
      percentage,
      score: obtainedMarks,
      totalMarks,
      issueDate: new Date(),
      isValid: true,
    });

    certificateQueue.add('GENERATE_CERTIFICATE_PDF', {
      certificateId,
      verificationCode,
      rollNo: attempt.candidateRollNo,
      candidateName: attempt.candidateName,
      meritTier,
      percentage,
    });

    // If multi-stage exam, promote candidate stage in User record
    if (exam?.isMultiStage) {
      const currentStageKey = `stage${attempt.stageNumber}`;
      const nextStageNum = attempt.stageNumber + 1;
      const nextStageKey = `stage${nextStageNum}`;

      const updateFields = {
        [`stageStatus.${currentStageKey}.status`]: 'qualified',
        [`stageStatus.${currentStageKey}.score`]: obtainedMarks,
        [`stageStatus.${currentStageKey}.totalMarks`]: totalMarks,
        [`stageStatus.${currentStageKey}.percentage`]: percentage,
        [`stageStatus.${currentStageKey}.completedAt`]: new Date(),
      };

      if (nextStageNum <= (exam.totalStages || 3)) {
        updateFields[`stageStatus.${nextStageKey}.status`] = 'unlocked';
        updateFields.currentStage = nextStageNum;
      }

      await User.findByIdAndUpdate(user._id, { $set: updateFields });
    }
  }

  // Update attempt status to evaluated
  attempt.status = 'evaluated';
  await attempt.save();

  if (req) {
    await logAuditAction({
      action: 'EXAM_ATTEMPT_SUBMIT',
      req,
      targetResource: 'ExamAttempt',
      targetId: attempt.attemptId,
      details: {
        score: obtainedMarks,
        percentage,
        resultStatus: resultRecord.resultStatus,
        certificateId: resultRecord.certificateId,
      },
    });
  }

  return resultRecord;
}
