import { z } from 'zod';

export const createBookSchema = z.object({
  title: z.string().min(2, 'Title is required'),
  hindiTitle: z.string().optional().default(''),
  author: z.string().default('A.C. Bhaktivedanta Swami Prabhupāda'),
  language: z.string().min(2, 'Language is required'),
  isbn: z.string().optional().default(''),
  pages: z.number().int().min(1).default(800),
  edition: z.string().default('Standard Hardbound Edition'),
  price: z.number().min(0, 'Price must be positive'),
  sponsorCost: z.number().min(0, 'Sponsor cost must be positive'),
  coverImage: z.string().optional().default(''),
  description: z.string().optional().default(''),
  stockReceived: z.number().int().min(0).default(0),
  stockAllocated: z.number().int().min(0).default(0),
  stockDistributed: z.number().int().min(0).default(0),
  distributionLocations: z.array(z.string()).optional().default([]),
});

export const updateStockSchema = z.object({
  stockReceived: z.number().int().min(0).optional(),
  stockAllocated: z.number().int().min(0).optional(),
  stockDistributed: z.number().int().min(0).optional(),
});
