import { Router } from 'express';
import * as donationController from '../controllers/donation.controller.js';
import { validate } from '../middleware/validate.middleware.js';
import { createDonationSchema } from '../validators/donation.validator.js';
import { authenticate, optionalAuth } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/campaigns', donationController.listCampaigns);
router.post('/', optionalAuth, validate(createDonationSchema), donationController.createDonation);
router.get('/', authenticate, donationController.listDonations);

export default router;
