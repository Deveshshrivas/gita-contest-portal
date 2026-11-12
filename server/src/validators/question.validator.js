import { z } from 'zod';

export const optionSchema = z.object({
  key: z.string().min(1).max(2), // 'A', 'B', 'C', 'D'
  text: z.string().min(1, 'Option text cannot be empty'),
});

const baseQuestionSchema = z.object({
  examId: z.string().optional().default('all'),
  chapter: z.number().int().min(1).max(18),
  verse: z.string().min(1, 'Verse reference is required'),
  shlokaText: z.string().optional().default(''),
  question: z.string().min(5, 'Question text in English is required'),
  questionHindi: z.string().optional().default(''),
  options: z.array(optionSchema).min(2, 'At least 2 options are required'),
  correctAnswer: z.string().min(1, 'Correct answer key is required'),
  explanation: z.string().optional().default(''),
  difficulty: z.enum(['Easy', 'Medium', 'Hard']).default('Medium'),
  type: z.enum(['MCQ', 'TrueFalse', 'ShortAnswer']).default('MCQ'),
  marks: z.number().min(1).default(2),
  negativeMarks: z.number().min(0).default(0.5),
});

export const createQuestionSchema = baseQuestionSchema.refine(
  (data) => data.options.some((opt) => opt.key === data.correctAnswer),
  {
    message: 'correctAnswer must match one of the option keys provided in options',
    path: ['correctAnswer'],
  }
);

export const updateQuestionSchema = baseQuestionSchema.partial();
