import { Router } from 'express';
import * as resultController from '../controllers/result.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { requireAdmin } from '../middleware/role.middleware.js';

const router = Router();

router.get('/my', authenticate, resultController.getMyResults);
router.get('/leaderboard', resultController.getLeaderboard);
router.get('/admin', authenticate, requireAdmin, resultController.adminListResults);
router.get('/:id', authenticate, resultController.getResultById);

export default router;
