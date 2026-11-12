import { Router } from 'express';
import * as examController from '../controllers/exam.controller.js';
import { validate } from '../middleware/validate.middleware.js';
import { createExamSchema, updateExamSchema } from '../validators/exam.validator.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { requireAdmin } from '../middleware/role.middleware.js';

const router = Router();

router.get('/', examController.listExams);
router.get('/:idOrSlug', examController.getExam);
router.post('/', authenticate, requireAdmin, validate(createExamSchema), examController.createExam);
router.put('/:idOrSlug', authenticate, requireAdmin, validate(updateExamSchema), examController.updateExam);
router.patch('/:idOrSlug', authenticate, requireAdmin, validate(updateExamSchema), examController.updateExam);
router.delete('/:idOrSlug', authenticate, requireAdmin, examController.deleteExam);
router.post('/:idOrSlug/enroll', authenticate, examController.enroll);

export default router;
