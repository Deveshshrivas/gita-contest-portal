import { DonationCampaign } from '../models/DonationCampaign.js';
import { Donation } from '../models/Donation.js';
import { User } from '../models/User.js';
import { logAuditAction } from '../middleware/audit.middleware.js';
import { emailQueue } from '../jobs/queue.js';

export async function getCampaigns() {
  return DonationCampaign.find({ status: 'active' }).sort({ targetAmount: -1 });
}

export async function createDonation(donationData, currentUser = null, req = null) {
  const campaign = await DonationCampaign.findOne({ id: donationData.campaignId });
  const amount = Number(donationData.amount);

  const receiptNo = `REC-ISKCON-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
  const transactionId = `TXN-${Math.floor(100000000 + Math.random() * 900000000)}`;

  const unitCost = campaign?.unitCost || 250;
  const studentsSponsored = Math.floor(amount / unitCost);
  const booksSponsored = Math.floor(amount / (campaign?.unitCost || 180));

  const donation = await Donation.create({
    receiptNo,
    campaignId: donationData.campaignId,
    campaignTitle: campaign?.title || 'General Youth Wisdom Fund',
    donor: currentUser?._id || null,
    donorName: donationData.donorName,
    donorEmail: donationData.donorEmail.toLowerCase(),
    donorPhone: donationData.donorPhone || '',
    panNumber: donationData.panNumber.toUpperCase(),
    amount,
    studentsSponsored,
    booksSponsored,
    paymentMethod: donationData.paymentMethod || 'UPI / Online',
    paymentStatus: 'paid',
    transactionId,
    allocatedCenter: donationData.allocatedCenter || 'National Youth Pool',
    is80GCertified: true,
  });

  // Update campaign metrics
  if (campaign) {
    campaign.raisedAmount = (campaign.raisedAmount || 0) + amount;
    campaign.donorsCount = (campaign.donorsCount || 0) + 1;
    campaign.beneficiariesCount = (campaign.beneficiariesCount || 0) + Math.max(1, studentsSponsored);
    await campaign.save();
  }

  // Update User totals if user is logged in
  if (currentUser) {
    await User.findByIdAndUpdate(currentUser._id, {
      $inc: {
        totalDonated: amount,
        studentsSponsored: studentsSponsored,
        booksSponsored: booksSponsored,
      },
    });
  }

  if (req) {
    await logAuditAction({
      action: 'DONATION_CREATE',
      req,
      targetResource: 'Donation',
      targetId: donation.receiptNo,
      details: { amount, donorName: donation.donorName, pan: donation.panNumber },
    });
  }

  // Enqueue background 80G tax certificate dispatch job
  emailQueue.add('SEND_80G_RECEIPT', {
    donationId: donation._id,
    donorEmail: donation.donorEmail,
    donorName: donation.donorName,
    receiptNo: donation.receiptNo,
    amount: donation.amount,
  });

  return donation;
}

export async function getDonations({ search, email, page = 1, limit = 20 }) {
  const query = {};

  if (email) {
    query.donorEmail = email.toLowerCase();
  }

  if (search && search.trim()) {
    const regex = new RegExp(search.trim(), 'i');
    query.$or = [{ donorName: regex }, { receiptNo: regex }, { panNumber: regex }, { campaignTitle: regex }];
  }

  const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
  const total = await Donation.countDocuments(query);
  const donations = await Donation.find(query).sort({ donatedAt: -1 }).skip(skip).limit(parseInt(limit, 10));

  return {
    donations,
    pagination: {
      total,
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      pages: Math.ceil(total / parseInt(limit, 10)),
    },
  };
}
