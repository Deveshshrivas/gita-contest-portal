import { Router } from 'express';
import * as questionController from '../controllers/question.controller.js';
import { validate } from '../middleware/validate.middleware.js';
import { createQuestionSchema, updateQuestionSchema } from '../validators/question.validator.js';
import { authenticate, optionalAuth } from '../middleware/auth.middleware.js';
import { requireAdmin } from '../middleware/role.middleware.js';

const router = Router();

router.get('/', optionalAuth, questionController.listQuestions);
router.post('/', authenticate, requireAdmin, validate(createQuestionSchema), questionController.createQuestion);
router.put('/:id', authenticate, requireAdmin, validate(updateQuestionSchema), questionController.updateQuestion);
router.delete('/:id', authenticate, requireAdmin, questionController.deleteQuestion);

export default router;
