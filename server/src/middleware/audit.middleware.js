import { AuditLog } from '../models/AuditLog.js';
import { logger } from '../utils/logger.js';

export async function logAuditAction({ action, req, targetResource, targetId = '', details = {} }) {
  try {
    // Sanitize details: strip passwords, tokens, secrets
    const sanitizedDetails = { ...details };
    delete sanitizedDetails.password;
    delete sanitizedDetails.passwordHash;
    delete sanitizedDetails.token;
    delete sanitizedDetails.refreshToken;
    delete sanitizedDetails.signature;

    await AuditLog.create({
      action,
      performedBy: req?.user?._id || null,
      performerRole: req?.user?.role || 'anonymous',
      targetResource,
      targetId: String(targetId),
      ipAddress: req?.ip || '',
      details: sanitizedDetails,
    });
  } catch (error) {
    logger.warn('Failed to record audit log:', error.message);
  }
}
