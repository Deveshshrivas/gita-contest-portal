import * as attemptService from '../services/attempt.service.js';
import { sendSuccess } from '../utils/response.js';

export async function start(req, res, next) {
  try {
    const { examId, stageNumber } = req.body;
    const result = await attemptService.startAttempt({
      examId,
      stageNumber,
      user: req.user,
      req,
    });

    return sendSuccess(res, result, result.isResumed ? 'Resumed active examination attempt' : 'Exam attempt started successfully', 201);
  } catch (err) {
    next(err);
  }
}

export async function saveAnswer(req, res, next) {
  try {
    const { attemptId } = req.params;
    const { questionId, selectedOption, isReview, currentQuestionIndex } = req.body;

    const result = await attemptService.saveAnswer({
      attemptId,
      questionId,
      selectedOption,
      isReview,
      currentQuestionIndex,
      user: req.user,
    });

    return sendSuccess(res, result, 'Answer response saved');
  } catch (err) {
    next(err);
  }
}

export async function getAttempt(req, res, next) {
  try {
    const { attemptId } = req.params;
    const result = await attemptService.getAttemptDetails({
      attemptId,
      user: req.user,
    });

    return sendSuccess(res, result, 'Active attempt details');
  } catch (err) {
    next(err);
  }
}

export async function submit(req, res, next) {
  try {
    const { attemptId } = req.params;
    const result = await attemptService.submitAttempt({
      attemptId,
      user: req.user,
      req,
    });

    return sendSuccess(res, result, 'Examination submitted and evaluated successfully');
  } catch (err) {
    next(err);
  }
}
