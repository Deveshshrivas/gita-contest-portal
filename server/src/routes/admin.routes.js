import { Router } from 'express';
import * as adminController from '../controllers/admin.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { requireAdmin, requireRole } from '../middleware/role.middleware.js';

const router = Router();

router.get('/overview', authenticate, requireAdmin, adminController.getOverview);
router.get('/users', authenticate, requireAdmin, adminController.listUsers);
router.post('/users', authenticate, requireAdmin, adminController.createUser);
router.patch('/users/:id/role', authenticate, requireRole('super_admin', 'admin'), adminController.updateUserRole);
router.post('/candidates/:id/promote', authenticate, requireAdmin, adminController.promoteCandidateStage);
router.get('/audit-logs', authenticate, requireRole('super_admin'), adminController.getAuditLogs);

export default router;
