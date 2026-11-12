import { Router } from 'express';
import authRoutes from './auth.routes.js';
import examRoutes from './exam.routes.js';
import questionRoutes from './question.routes.js';
import attemptRoutes from './attempt.routes.js';
import resultRoutes from './result.routes.js';
import certificateRoutes from './certificate.routes.js';
import bookRoutes from './book.routes.js';
import donationRoutes from './donation.routes.js';
import paymentRoutes from './payment.routes.js';
import adminRoutes from './admin.routes.js';
import { sendSuccess } from '../utils/response.js';

const router = Router();

// Health check
router.get('/health', (req, res) => {
  return sendSuccess(res, {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'gita-exam-api-v1',
    uptime: process.uptime(),
  }, 'Gita Examination API is online and operational');
});

// Mounted modules
router.use('/auth', authRoutes);
router.use('/exams', examRoutes);
router.use('/questions', questionRoutes);
router.use('/attempts', attemptRoutes);
router.use('/results', resultRoutes);
router.use('/certificates', certificateRoutes);
router.use('/books', bookRoutes);
router.use('/donations', donationRoutes);
router.use('/payments', paymentRoutes);
router.use('/admin', adminRoutes);

export default router;
