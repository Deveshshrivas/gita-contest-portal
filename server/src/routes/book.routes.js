import { Router } from 'express';
import * as bookController from '../controllers/book.controller.js';
import { validate } from '../middleware/validate.middleware.js';
import { createBookSchema, updateStockSchema } from '../validators/book.validator.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { requireAdmin } from '../middleware/role.middleware.js';

const router = Router();

router.get('/', bookController.listBooks);
router.post('/', authenticate, requireAdmin, validate(createBookSchema), bookController.createBook);
router.patch('/:id/stock', authenticate, requireAdmin, validate(updateStockSchema), bookController.updateStock);

router.get('/consignments', authenticate, requireAdmin, bookController.listConsignments);
router.post('/consignments', authenticate, requireAdmin, bookController.createConsignment);
router.patch('/consignments/:trackingNumber/status', authenticate, requireAdmin, bookController.updateConsignment);

export default router;
