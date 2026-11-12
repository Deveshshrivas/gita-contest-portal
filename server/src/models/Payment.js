import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    exam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Exam',
      required: true,
    },
    examIdString: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: [0, 'Amount must be greater than or equal to 0'],
    },
    currency: {
      type: String,
      default: 'INR',
    },
    provider: {
      type: String,
      enum: ['mock', 'razorpay', 'stripe'],
      default: 'mock',
    },
    providerOrderId: {
      type: String,
      default: '',
      index: true,
    },
    providerPaymentId: {
      type: String,
      default: '',
      index: true,
    },
    status: {
      type: String,
      enum: ['created', 'pending', 'paid', 'failed', 'refunded'],
      default: 'created',
      index: true,
    },
    signature: {
      type: String,
      default: '',
    },
    metadata: {
      type: Map,
      of: String,
      default: () => new Map(),
    },
    paidAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export const Payment = mongoose.model('Payment', paymentSchema);
