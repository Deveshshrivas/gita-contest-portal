import * as donationService from '../services/donation.service.js';
import { sendSuccess } from '../utils/response.js';

export async function listCampaigns(req, res, next) {
  try {
    const campaigns = await donationService.getCampaigns();
    return sendSuccess(res, campaigns, 'Active donation & sponsorship campaigns');
  } catch (err) {
    next(err);
  }
}

export async function createDonation(req, res, next) {
  try {
    const donation = await donationService.createDonation(req.body, req.user, req);
    return sendSuccess(res, donation, 'Donation processed and 80G tax receipt generated', 201);
  } catch (err) {
    next(err);
  }
}

export async function listDonations(req, res, next) {
  try {
    const { search, page, limit } = req.query;
    // If not admin, only show this user's donations
    const isAdmin = [
      'super_admin',
      'admin',
      'finance_manager',
      'manager',
    ].includes(req.user.role);

    const email = isAdmin ? req.query.email : req.user.email;
    const result = await donationService.getDonations({ search, email, page, limit });

    return sendSuccess(res, result.donations, 'Donations and 80G receipts', 200, result.pagination);
  } catch (err) {
    next(err);
  }
}
