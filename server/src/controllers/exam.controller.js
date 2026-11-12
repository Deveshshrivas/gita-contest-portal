import * as examService from '../services/exam.service.js';
import { sendSuccess } from '../utils/response.js';

export async function listExams(req, res, next) {
  try {
    const { category, isFree, isMultiStage, status, search, page, limit } = req.query;
    const result = await examService.getExams({
      category,
      isFree,
      isMultiStage,
      status,
      search,
      page,
      limit,
    });
    return sendSuccess(res, result.exams, 'Examinations list', 200, result.pagination);
  } catch (err) {
    next(err);
  }
}

export async function getExam(req, res, next) {
  try {
    const exam = await examService.getExamByIdOrSlug(req.params.idOrSlug);
    return sendSuccess(res, exam, 'Exam details');
  } catch (err) {
    next(err);
  }
}

export async function createExam(req, res, next) {
  try {
    const newExam = await examService.createExam(req.body, req.user, req);
    return sendSuccess(res, newExam, 'Exam created successfully', 201);
  } catch (err) {
    next(err);
  }
}

export async function updateExam(req, res, next) {
  try {
    const updatedExam = await examService.updateExam(req.params.idOrSlug, req.body, req.user, req);
    return sendSuccess(res, updatedExam, 'Exam updated successfully');
  } catch (err) {
    next(err);
  }
}

export async function deleteExam(req, res, next) {
  try {
    await examService.deleteExam(req.params.idOrSlug, req.user, req);
    return sendSuccess(res, null, 'Exam deleted successfully');
  } catch (err) {
    next(err);
  }
}

export async function enroll(req, res, next) {
  try {
    const result = await examService.enrollCandidate(req.params.idOrSlug, req.user, req);
    return sendSuccess(res, result, 'Candidate enrolled successfully');
  } catch (err) {
    next(err);
  }
}
