import { getAdminOverviewStats } from '../services/stats.service.js';
import { User } from '../models/User.js';
import { AuditLog } from '../models/AuditLog.js';
import { logAuditAction } from '../middleware/audit.middleware.js';
import { sendSuccess, sendError } from '../utils/response.js';
import { hashPassword } from '../utils/password.js';

export async function getOverview(req, res, next) {
  try {
    const stats = await getAdminOverviewStats();
    return sendSuccess(res, stats, 'Admin real-time dashboard analytics');
  } catch (err) {
    next(err);
  }
}

export async function listUsers(req, res, next) {
  try {
    const { role, search, page = 1, limit = 50 } = req.query;
    const query = { status: { $ne: 'deleted' } };

    if (role && role !== 'all') {
      query.role = role;
    }

    if (search && search.trim()) {
      const regex = new RegExp(search.trim(), 'i');
      query.$or = [{ name: regex }, { email: regex }, { rollNo: regex }, { organization: regex }, { school: regex }, { city: regex }];
    }

    const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
    const total = await User.countDocuments(query);
    const users = await User.find(query).sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit, 10));

    return sendSuccess(res, users, 'Users roster', 200, {
      total,
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      pages: Math.ceil(total / parseInt(limit, 10)),
    });
  } catch (err) {
    next(err);
  }
}

export async function createUser(req, res, next) {
  try {
    const {
      name,
      email,
      password = 'Password@123',
      phone = '',
      role = 'admin',
      title = '',
      organization = 'National Gita Leadership Examination Board',
      category = 'Senior (Class 10-12)',
      school = 'Self Study',
      city = 'New Delhi',
      state = 'Delhi',
      assignedCenter = 'National Online Portal',
      status = 'active',
      permissions = [],
    } = req.body;

    if (!name || !email) {
      return sendError(res, 'Name and email are required', 400, 'VALIDATION_ERROR');
    }

    const cleanEmail = email.toLowerCase().trim();
    const existing = await User.findOne({ email: cleanEmail });
    if (existing) {
      return sendError(res, 'A user account with this email address already exists', 409, 'DUPLICATE_EMAIL');
    }

    const passwordHash = await hashPassword(password);
    const rollNo = `GLC-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const newUser = await User.create({
      name: name.trim(),
      email: cleanEmail,
      passwordHash,
      phone,
      role,
      title: title || (role === 'student' ? 'Student Candidate' : `${role.replace('_', ' ').toUpperCase()} Officer`),
      organization,
      category,
      school,
      city,
      state,
      assignedCenter,
      rollNo,
      status,
      currentStage: 1,
      permissions:
        permissions.length > 0
          ? permissions
          : role === 'super_admin'
          ? ['all']
          : ['exams_manage', 'students_manage'],
    });

    await logAuditAction({
      action: 'ADMIN_USER_CREATE',
      req,
      targetResource: 'User',
      targetId: newUser._id,
      details: { name: newUser.name, email: newUser.email, role: newUser.role },
    });

    return sendSuccess(res, newUser, `User account for ${newUser.name} created successfully`, 201);
  } catch (err) {
    next(err);
  }
}

export async function updateUserRole(req, res, next) {
  try {
    const { id } = req.params;
    const { role } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return sendError(res, 'User not found', 404, 'NOT_FOUND');
    }

    const oldRole = user.role;
    user.role = role;
    await user.save();

    await logAuditAction({
      action: 'USER_ROLE_CHANGE',
      req,
      targetResource: 'User',
      targetId: user._id,
      details: { email: user.email, oldRole, newRole: role },
    });

    return sendSuccess(res, user, `User role updated from '${oldRole}' to '${role}'`);
  } catch (err) {
    next(err);
  }
}

export async function promoteCandidateStage(req, res, next) {
  try {
    const { id } = req.params;
    const { nextStage } = req.body;

    const user = await User.findOne({
      $or: [{ _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }, { rollNo: id }],
    });

    if (!user) {
      return sendError(res, 'Candidate not found', 404, 'NOT_FOUND');
    }

    const stageNum = parseInt(nextStage, 10);
    const prevKey = `stage${stageNum - 1}`;
    const nextKey = `stage${stageNum}`;

    if (user.stageStatus?.[prevKey]) {
      user.stageStatus[prevKey].status = 'qualified';
    }
    if (user.stageStatus?.[nextKey]) {
      user.stageStatus[nextKey].status = 'unlocked';
    }
    user.currentStage = stageNum;

    await user.save();

    await logAuditAction({
      action: 'CANDIDATE_STAGE_PROMOTION',
      req,
      targetResource: 'User',
      targetId: user._id,
      details: { rollNo: user.rollNo, promotedToStage: stageNum },
    });

    return sendSuccess(res, user, `Candidate ${user.name} promoted to Stage ${stageNum}`);
  } catch (err) {
    next(err);
  }
}

export async function getAuditLogs(req, res, next) {
  try {
    const { page = 1, limit = 50 } = req.query;
    const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
    const total = await AuditLog.countDocuments();
    const logs = await AuditLog.find()
      .populate('performedBy', 'name email role')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit, 10));

    return sendSuccess(res, logs, 'System audit trail logs', 200, {
      total,
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      pages: Math.ceil(total / parseInt(limit, 10)),
    });
  } catch (err) {
    next(err);
  }
}
