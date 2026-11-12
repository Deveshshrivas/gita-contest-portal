import { verifyAccessToken } from '../utils/jwt.js';
import { User } from '../models/User.js';
import { sendError } from '../utils/response.js';

export async function authenticate(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return sendError(res, 'Authentication token missing or invalid', 401, 'UNAUTHORIZED');
    }

    const token = authHeader.split(' ')[1];
    let payload;
    try {
      payload = verifyAccessToken(token);
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return sendError(res, 'Access token has expired. Please refresh your session.', 401, 'TOKEN_EXPIRED');
      }
      return sendError(res, 'Invalid token signature', 401, 'INVALID_TOKEN');
    }

    const user = await User.findById(payload.userId);
    if (!user) {
      return sendError(res, 'User associated with this token no longer exists', 401, 'USER_NOT_FOUND');
    }

    if (user.status === 'suspended') {
      return sendError(res, 'This account has been suspended by administration', 403, 'ACCOUNT_SUSPENDED');
    }

    if (user.status === 'deleted') {
      return sendError(res, 'This account has been deleted', 401, 'ACCOUNT_DELETED');
    }

    req.user = user;
    next();
  } catch (error) {
    return sendError(res, 'Authentication error', 500, 'AUTH_ERROR', error.message);
  }
}

// Optional auth: If token present, populates req.user; otherwise proceeds with req.user = null
export async function optionalAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const payload = verifyAccessToken(token);
      const user = await User.findById(payload.userId);
      if (user && user.status === 'active') {
        req.user = user;
      }
    }
  } catch {
    // Ignore error for optional auth
  }
  next();
}
