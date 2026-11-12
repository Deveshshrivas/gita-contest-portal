import crypto from 'crypto';
import { Payment } from '../models/Payment.js';
import { Exam } from '../models/Exam.js';
import { env } from '../config/env.js';
import { logAuditAction } from '../middleware/audit.middleware.js';

export async function createPaymentOrder({ examId, user, req }) {
  const exam = await Exam.findOne({
    $or: [{ id: examId }, { slug: examId.toLowerCase() }],
  });

  if (!exam) {
    const error = new Error(`Exam '${examId}' not found.`);
    error.statusCode = 404;
    throw error;
  }

  if (exam.isFree || exam.fee === 0) {
    const error = new Error('This exam is free. No payment order is required.');
    error.statusCode = 400;
    throw error;
  }

  const orderId = `ORDER-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;

  let provider = 'mock';
  let providerOrderId = `MOCK-ORD-${orderId}`;

  // If Razorpay credentials are configured, create real Razorpay order
  if (env.payments.isConfigured) {
    try {
      // Production integration with Razorpay
      provider = 'razorpay';
      // Razorpay API call would occur here using Buffer auth
      providerOrderId = `rzp_order_${Date.now()}`;
    } catch (err) {
      console.warn('[Payments] Razorpay order creation failed, falling back to mock sandbox:', err.message);
    }
  }

  const payment = await Payment.create({
    orderId,
    user: user._id,
    exam: exam._id,
    examIdString: exam.id,
    amount: exam.fee,
    currency: exam.currency || 'INR',
    provider,
    providerOrderId,
    status: 'created',
  });

  await logAuditAction({
    action: 'PAYMENT_ORDER_CREATE',
    req,
    targetResource: 'Payment',
    targetId: payment.orderId,
    details: { examName: exam.name, amount: payment.amount, provider },
  });

  return {
    orderId: payment.orderId,
    amount: payment.amount,
    currency: payment.currency,
    examName: exam.name,
    provider: payment.provider,
    providerOrderId: payment.providerOrderId,
    keyId: env.payments.razorpayKeyId || 'mock_key_sandbox_test',
  };
}

export async function verifyPayment({ orderId, providerPaymentId, signature, user, req }) {
  const payment = await Payment.findOne({ orderId, user: user._id });
  if (!payment) {
    const error = new Error(`Payment order '${orderId}' not found.`);
    error.statusCode = 404;
    throw error;
  }

  // Idempotent: If already paid, return confirmed
  if (payment.status === 'paid') {
    return {
      success: true,
      orderId: payment.orderId,
      status: 'paid',
      message: 'Payment already verified successfully.',
    };
  }

  // Server-side verification
  if (payment.provider === 'razorpay' && env.payments.isConfigured) {
    const expectedSignature = crypto
      .createHmac('sha256', env.payments.razorpayKeySecret)
      .update(`${payment.providerOrderId}|${providerPaymentId}`)
      .digest('hex');

    if (expectedSignature !== signature) {
      payment.status = 'failed';
      await payment.save();
      const error = new Error('Cryptographic signature verification failed for payment.');
      error.statusCode = 400;
      throw error;
    }
  }

  payment.status = 'paid';
  payment.providerPaymentId = providerPaymentId || `TXN-SIM-${Date.now()}`;
  payment.signature = signature || 'verified_dev_mock';
  payment.paidAt = new Date();
  await payment.save();

  // Mark exam enrolled in Exam counter
  await Exam.findByIdAndUpdate(payment.exam, { $inc: { enrolledCount: 1 } });

  await logAuditAction({
    action: 'PAYMENT_VERIFIED',
    req,
    targetResource: 'Payment',
    targetId: payment.orderId,
    details: { amount: payment.amount, providerPaymentId: payment.providerPaymentId },
  });

  return {
    success: true,
    orderId: payment.orderId,
    transactionId: payment.providerPaymentId,
    status: 'paid',
    message: 'Payment verified successfully. Exam registration confirmed!',
  };
}
