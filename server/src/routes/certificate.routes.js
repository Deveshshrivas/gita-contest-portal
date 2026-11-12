import { Router } from 'express';
import * as certController from '../controllers/certificate.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/verify/:code', certController.verify);
router.get('/my', authenticate, certController.myCertificates);

export default router;
