import { z } from 'zod';

export const createOrderSchema = z.object({
  examId: z.string().min(1, 'Exam ID is required'),
});

export const verifyPaymentSchema = z.object({
  orderId: z.string().min(1, 'Order ID is required'),
  providerPaymentId: z.string().optional().default(''),
  signature: z.string().optional().default(''),
});
