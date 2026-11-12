import { Question } from '../models/Question.js';
import { logAuditAction } from '../middleware/audit.middleware.js';

export async function getQuestions({ chapter, difficulty, search, page = 1, limit = 50, userRole = 'student' }) {
  const query = { isActive: true };

  if (chapter && chapter !== 'all') {
    query.chapter = parseInt(chapter, 10);
  }

  if (difficulty && difficulty !== 'all') {
    query.difficulty = difficulty;
  }

  if (search && search.trim()) {
    const regex = new RegExp(search.trim(), 'i');
    query.$or = [{ question: regex }, { questionHindi: regex }, { verse: regex }, { shlokaText: regex }];
  }

  const isAdmin = [
    'super_admin',
    'admin',
    'exam_controller',
    'manager',
    'exam_coordinator',
    'content_manager',
  ].includes(userRole);

  const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
  const total = await Question.countDocuments(query);

  let queryBuilder = Question.find(query).sort({ chapter: 1, verse: 1 }).skip(skip).limit(parseInt(limit, 10));

  // Only admins can see answer keys in the question bank
  if (isAdmin) {
    queryBuilder = queryBuilder.select('+correctAnswer +explanation');
  }

  const questions = await queryBuilder;

  return {
    questions,
    pagination: {
      total,
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      pages: Math.ceil(total / parseInt(limit, 10)),
    },
  };
}

export async function createQuestion(qData, adminUser, req) {
  const id = `q-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`;

  const newQ = await Question.create({
    ...qData,
    id,
  });

  await logAuditAction({
    action: 'QUESTION_CREATE',
    req,
    targetResource: 'Question',
    targetId: newQ.id,
    details: { chapter: newQ.chapter, verse: newQ.verse },
  });

  return newQ;
}

export async function updateQuestion(id, qData, adminUser, req) {
  const question = await Question.findOne({ id }).select('+correctAnswer +explanation');
  if (!question) {
    const error = new Error(`Question '${id}' not found`);
    error.statusCode = 404;
    throw error;
  }

  Object.assign(question, qData);
  await question.save();

  await logAuditAction({
    action: 'QUESTION_UPDATE',
    req,
    targetResource: 'Question',
    targetId: question.id,
    details: { chapter: question.chapter, verse: question.verse },
  });

  return question;
}

export async function deleteQuestion(id, adminUser, req) {
  const question = await Question.findOne({ id });
  if (!question) {
    const error = new Error(`Question '${id}' not found`);
    error.statusCode = 404;
    throw error;
  }

  await Question.deleteOne({ _id: question._id });

  await logAuditAction({
    action: 'QUESTION_DELETE',
    req,
    targetResource: 'Question',
    targetId: question.id,
    details: { chapter: question.chapter, verse: question.verse },
  });

  return true;
}
