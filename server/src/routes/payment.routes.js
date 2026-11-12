import { Router } from 'express';
import * as paymentController from '../controllers/payment.controller.js';
import { validate } from '../middleware/validate.middleware.js';
import { createOrderSchema, verifyPaymentSchema } from '../validators/payment.validator.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/create-order', authenticate, validate(createOrderSchema), paymentController.createOrder);
router.post('/verify', authenticate, validate(verifyPaymentSchema), paymentController.verify);

export default router;
