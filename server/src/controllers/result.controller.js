import { Result } from '../models/Result.js';
import { sendSuccess, sendError } from '../utils/response.js';

export async function getMyResults(req, res, next) {
  try {
    const results = await Result.find({ user: req.user._id }).sort({ submittedAt: -1 });
    return sendSuccess(res, results, 'Candidate result history');
  } catch (err) {
    next(err);
  }
}

export async function getResultById(req, res, next) {
  try {
    const { id } = req.params;
    const result = await Result.findOne({
      $or: [{ resultId: id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }, { certificateId: id }],
    });

    if (!result) {
      return sendError(res, 'Exam result not found', 404, 'NOT_FOUND');
    }

    // Verify ownership: only the candidate or admins can view full result
    const isAdmin = [
      'super_admin',
      'admin',
      'exam_controller',
      'manager',
      'exam_coordinator',
    ].includes(req.user.role);

    if (!isAdmin && result.user.toString() !== req.user._id.toString()) {
      return sendError(res, 'You are not authorized to view another candidate’s examination result', 403, 'FORBIDDEN');
    }

    return sendSuccess(res, result, 'Scorecard and question review details');
  } catch (err) {
    next(err);
  }
}

export async function getLeaderboard(req, res, next) {
  try {
    const { examId = 'glc-2026', limit = 20 } = req.query;

    // Tie breaking rule: Highest score, then lowest timeSpentSeconds, then earlier submittedAt
    const topRankers = await Result.find({
      examIdString: examId,
      resultStatus: 'pass',
    })
      .sort({ score: -1, timeSpentSeconds: 1, submittedAt: 1 })
      .limit(parseInt(limit, 10))
      .select('candidateName rollNo city score totalMarks percentage meritTier timeSpentSeconds submittedAt');

    return sendSuccess(res, topRankers, 'Official National Leaderboard & Rankers');
  } catch (err) {
    next(err);
  }
}

export async function adminListResults(req, res, next) {
  try {
    const { examId, status, search, page = 1, limit = 25 } = req.query;
    const query = {};

    if (examId && examId !== 'all') {
      query.examIdString = examId;
    }

    if (status && status !== 'all') {
      query.resultStatus = status;
    }

    if (search && search.trim()) {
      const regex = new RegExp(search.trim(), 'i');
      query.$or = [{ candidateName: regex }, { rollNo: regex }, { certificateId: regex }, { city: regex }];
    }

    const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
    const total = await Result.countDocuments(query);
    const results = await Result.find(query).sort({ submittedAt: -1 }).skip(skip).limit(parseInt(limit, 10));

    return sendSuccess(res, results, 'Admin evaluation results roster', 200, {
      total,
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      pages: Math.ceil(total / parseInt(limit, 10)),
    });
  } catch (err) {
    next(err);
  }
}
