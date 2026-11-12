import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema(
  {
    receiptNo: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    campaignId: {
      type: String,
      required: true,
      index: true,
    },
    campaignTitle: {
      type: String,
      required: true,
    },
    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
      index: true,
    },
    donorName: {
      type: String,
      required: true,
      trim: true,
    },
    donorEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    donorPhone: {
      type: String,
      default: '',
    },
    panNumber: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
      min: [1, 'Donation amount must be at least ₹1'],
    },
    studentsSponsored: {
      type: Number,
      default: 0,
    },
    booksSponsored: {
      type: Number,
      default: 0,
    },
    paymentMethod: {
      type: String,
      default: 'UPI / Online',
    },
    paymentStatus: {
      type: String,
      enum: ['paid', 'pending', 'refunded', 'failed'],
      default: 'paid',
      index: true,
    },
    transactionId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    allocatedCenter: {
      type: String,
      default: 'National Youth Pool',
    },
    is80GCertified: {
      type: Boolean,
      default: true,
    },
    donatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export const Donation = mongoose.model('Donation', donationSchema);
