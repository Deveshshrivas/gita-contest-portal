import * as questionService from '../services/question.service.js';
import { sendSuccess } from '../utils/response.js';

export async function listQuestions(req, res, next) {
  try {
    const { chapter, difficulty, search, page, limit } = req.query;
    const userRole = req.user?.role || 'student';

    const result = await questionService.getQuestions({
      chapter,
      difficulty,
      search,
      page,
      limit,
      userRole,
    });

    return sendSuccess(res, result.questions, 'Questions retrieved', 200, result.pagination);
  } catch (err) {
    next(err);
  }
}

export async function createQuestion(req, res, next) {
  try {
    const newQ = await questionService.createQuestion(req.body, req.user, req);
    return sendSuccess(res, newQ, 'Question created successfully in bank', 201);
  } catch (err) {
    next(err);
  }
}

export async function updateQuestion(req, res, next) {
  try {
    const updatedQ = await questionService.updateQuestion(req.params.id, req.body, req.user, req);
    return sendSuccess(res, updatedQ, 'Question updated successfully');
  } catch (err) {
    next(err);
  }
}

export async function deleteQuestion(req, res, next) {
  try {
    await questionService.deleteQuestion(req.params.id, req.user, req);
    return sendSuccess(res, null, 'Question removed from bank');
  } catch (err) {
    next(err);
  }
}
