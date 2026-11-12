import { z } from 'zod';
import { USER_ROLES } from '../models/User.js';

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Valid email address is required').toLowerCase(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  phone: z.string().optional().default(''),
  role: z.enum(USER_ROLES).optional().default('student'),
  category: z.string().optional().default('Senior (Class 10-12)'),
  school: z.string().optional().default('Self Study'),
  city: z.string().optional().default('New Delhi'),
  state: z.string().optional().default('Delhi'),
  assignedCenter: z.string().optional().default('Delhi Center'),
});

export const loginSchema = z.object({
  email: z.string().email('Valid email address is required').toLowerCase(),
  password: z.string().min(1, 'Password is required'),
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, 'Refresh token is required'),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(6, 'New password must be at least 6 characters'),
});
