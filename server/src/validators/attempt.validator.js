import { z } from 'zod';

export const startAttemptSchema = z.object({
  examId: z.string().min(1, 'Exam ID is required'),
  stageNumber: z.number().int().min(1).max(5).optional().default(1),
});

export const saveAnswerSchema = z.object({
  questionId: z.string().min(1, 'Question ID is required'),
  selectedOption: z.string().nullable().optional(),
  isReview: z.boolean().optional(),
  currentQuestionIndex: z.number().int().min(0).optional(),
});

export const submitAttemptSchema = z.object({
  attemptId: z.string().min(1, 'Attempt ID is required'),
});
