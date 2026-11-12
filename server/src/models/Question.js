import mongoose from 'mongoose';

const optionSchema = new mongoose.Schema(
  {
    key: { type: String, required: true }, // 'A', 'B', 'C', 'D'
    text: { type: String, required: true },
  },
  { _id: false }
);

const questionSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    examId: {
      type: String,
      default: 'all',
      index: true,
    },
    chapter: {
      type: Number,
      required: true,
      min: 1,
      max: 18,
      index: true,
    },
    verse: {
      type: String,
      required: true,
      trim: true,
    },
    shlokaText: {
      type: String,
      default: '',
    },
    question: {
      type: String,
      required: [true, 'Question text in English is required'],
    },
    questionHindi: {
      type: String,
      default: '',
    },
    options: {
      type: [optionSchema],
      validate: [
        (val) => val.length >= 2,
        'A question must have at least 2 options',
      ],
    },
    correctAnswer: {
      type: String,
      required: [true, 'Correct answer option key is required'],
      select: false, // hidden from candidate queries by default
    },
    explanation: {
      type: String,
      default: '',
      select: false, // hidden from candidate queries until evaluation
    },
    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard'],
      default: 'Medium',
      index: true,
    },
    type: {
      type: String,
      enum: ['MCQ', 'TrueFalse', 'ShortAnswer'],
      default: 'MCQ',
    },
    marks: {
      type: Number,
      default: 2,
      min: 1,
    },
    negativeMarks: {
      type: Number,
      default: 0.5,
      min: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

questionSchema.index({ chapter: 1, difficulty: 1, isActive: 1 });

export const Question = mongoose.model('Question', questionSchema);
