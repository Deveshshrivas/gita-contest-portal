import { z } from 'zod';

export const createDonationSchema = z.object({
  campaignId: z.string().min(1, 'Campaign ID is required'),
  amount: z.number().min(1, 'Donation amount must be at least ₹1'),
  donorName: z.string().min(2, 'Donor name is required'),
  donorEmail: z.string().email('Valid donor email is required'),
  donorPhone: z.string().optional().default(''),
  panNumber: z.string().min(5, 'Valid PAN number is required for 80G tax receipt').toUpperCase(),
  allocatedCenter: z.string().optional().default('National Youth Pool'),
  paymentMethod: z.string().optional().default('UPI / Online'),
});
