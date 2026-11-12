import mongoose from 'mongoose';

const donationCampaignSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    subtitle: {
      type: String,
      default: '',
    },
    targetAmount: {
      type: Number,
      required: true,
      min: 1,
    },
    raisedAmount: {
      type: Number,
      default: 0,
      min: 0,
    },
    unitCost: {
      type: Number,
      required: true,
      default: 250,
    },
    donorsCount: {
      type: Number,
      default: 0,
    },
    beneficiariesCount: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      default: 'Student Sponsorship',
    },
    coverImage: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['active', 'paused', 'completed'],
      default: 'active',
      index: true,
    },
    taxBenefit: {
      type: String,
      default: '100% Tax Exemption under Section 80G of IT Act',
    },
  },
  {
    timestamps: true,
  }
);

export const DonationCampaign = mongoose.model('DonationCampaign', donationCampaignSchema);
