import { z } from 'zod';

export const stageSchema = z.object({
  stageNumber: z.number().int().min(1).max(5),
  title: z.string().min(1),
  description: z.string().optional().default(''),
  durationMinutes: z.number().int().min(5).default(45),
  totalQuestions: z.number().int().min(1).default(15),
  totalMarks: z.number().default(30),
  passingMarks: z.number().default(18),
  passingPercentage: z.number().default(60),
  examDate: z.string().optional().default(''),
  status: z.enum(['active', 'locked', 'completed']).optional().default('active'),
  syllabusChapters: z.array(z.string()).optional().default([]),
});

export const createExamSchema = z.object({
  name: z.string().min(3, 'Exam name must be at least 3 characters'),
  subtitle: z.string().optional().default(''),
  badge: z.string().optional().default('National Olympiad'),
  category: z.string().default('National Olympiad'),
  isFree: z.boolean().default(true),
  fee: z.number().min(0).default(0),
  currency: z.string().default('INR'),
  status: z
    .enum([
      'draft',
      'published',
      'registration_open',
      'registration_closed',
      'in_progress',
      'completed',
      'archived',
    ])
    .optional()
    .default('registration_open'),
  isMultiStage: z.boolean().default(false),
  totalStages: z.number().int().min(1).max(5).default(1),
  totalQuestions: z.number().int().min(1).default(10),
  durationMinutes: z.number().int().min(5).default(30),
  totalMarks: z.number().default(20),
  passingMarks: z.number().default(12),
  passingPercentage: z.number().default(60),
  negativeMarking: z.boolean().default(false),
  negativeMarkValue: z.number().min(0).default(0),
  registrationDeadline: z.string().optional().nullable(),
  examDate: z.string().optional().nullable(),
  examEndDate: z.string().optional().nullable(),
  eligibility: z.string().optional().default('Open to all students.'),
  overview: z.string().optional().default(''),
  instructions: z.array(z.string()).optional().default([]),
  stages: z.array(stageSchema).optional().default([]),
  prizes: z
    .array(
      z.object({
        rank: z.string(),
        prize: z.string(),
      })
    )
    .optional()
    .default([]),
  centers: z.array(z.string()).optional().default([]),
});

export const updateExamSchema = createExamSchema.partial();
