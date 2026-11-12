import * as paymentService from '../services/payment.service.js';
import { sendSuccess } from '../utils/response.js';

export async function createOrder(req, res, next) {
  try {
    const { examId } = req.body;
    const order = await paymentService.createPaymentOrder({
      examId,
      user: req.user,
      req,
    });
    return sendSuccess(res, order, 'Payment order created', 201);
  } catch (err) {
    next(err);
  }
}

export async function verify(req, res, next) {
  try {
    const { orderId, providerPaymentId, signature } = req.body;
    const result = await paymentService.verifyPayment({
      orderId,
      providerPaymentId,
      signature,
      user: req.user,
      req,
    });
    return sendSuccess(res, result, result.message);
  } catch (err) {
    next(err);
  }
}
