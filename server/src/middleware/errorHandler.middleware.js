import { sendError } from '../utils/response.js';
import { logger } from '../utils/logger.js';
import { env } from '../config/env.js';

export function errorHandler(err, req, res, next) {
  logger.error(`Unhandled error on ${req.method} ${req.originalUrl}:`, err.message);

  // Mongoose CastError (invalid ObjectId)
  if (err.name === 'CastError') {
    return sendError(res, `Invalid resource identifier: ${err.value}`, 400, 'INVALID_ID');
  }

  // Mongoose Duplicate Key Error (E11000)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    return sendError(res, `A resource with that ${field} already exists.`, 409, 'DUPLICATE_KEY');
  }

  // Mongoose Validation Error
  if (err.name === 'ValidationError') {
    const details = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message,
    }));
    return sendError(res, 'Database validation failed', 400, 'VALIDATION_ERROR', details);
  }

  // JWT Errors
  if (err.name === 'JsonWebTokenError') {
    return sendError(res, 'Invalid token', 401, 'INVALID_TOKEN');
  }
  if (err.name === 'TokenExpiredError') {
    return sendError(res, 'Token has expired', 401, 'TOKEN_EXPIRED');
  }

  const statusCode = err.statusCode || 500;
  const message = env.isProduction && statusCode === 500 ? 'Internal server error' : err.message || 'Internal server error';

  return sendError(res, message, statusCode, err.code || 'INTERNAL_ERROR', env.isProduction ? null : err.stack);
}
