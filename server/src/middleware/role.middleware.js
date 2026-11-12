import { sendError } from '../utils/response.js';

export function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return sendError(res, 'Authentication required', 401, 'UNAUTHORIZED');
    }

    // Super Admin has full administrative access to all endpoints
    if (req.user.role === 'super_admin') {
      return next();
    }

    if (!allowedRoles.includes(req.user.role)) {
      return sendError(
        res,
        `Access denied. Required roles: [${allowedRoles.join(', ')}]. Your role: '${req.user.role}'.`,
        403,
        'FORBIDDEN'
      );
    }

    next();
  };
}

export function requireAdmin(req, res, next) {
  const adminRoles = [
    'super_admin',
    'admin',
    'exam_controller',
    'manager',
    'exam_coordinator',
    'finance_manager',
    'content_manager',
  ];
  return requireRole(...adminRoles)(req, res, next);
}
