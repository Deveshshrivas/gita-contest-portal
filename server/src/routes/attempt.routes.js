import { Router } from 'express';
import * as attemptController from '../controllers/attempt.controller.js';
import { validate } from '../middleware/validate.middleware.js';
import { startAttemptSchema, saveAnswerSchema } from '../validators/attempt.validator.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/start', authenticate, validate(startAttemptSchema), attemptController.start);
router.post('/:attemptId/save', authenticate, validate(saveAnswerSchema), attemptController.saveAnswer);
router.get('/:attemptId', authenticate, attemptController.getAttempt);
router.post('/:attemptId/submit', authenticate, attemptController.submit);

export default router;
