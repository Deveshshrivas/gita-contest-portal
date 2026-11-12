import mongoose from 'mongoose';

const stageSchema = new mongoose.Schema(
  {
    stageNumber: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String, default: '' },
    durationMinutes: { type: Number, required: true, default: 45 },
    totalQuestions: { type: Number, required: true, default: 15 },
    totalMarks: { type: Number, default: 30 },
    passingMarks: { type: Number, default: 18 },
    passingPercentage: { type: Number, default: 60 },
    examDate: { type: String, default: '' },
    status: {
      type: String,
      enum: ['active', 'locked', 'completed'],
      default: 'active',
    },
    syllabusChapters: [{ type: String }],
  },
  { _id: true }
);

const examSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
    },
    name: {
      type: String,
      required: [true, 'Exam name is required'],
      trim: true,
    },
    subtitle: {
      type: String,
      default: '',
    },
    badge: {
      type: String,
      default: 'National Olympiad',
    },
    category: {
      type: String,
      required: true,
      default: 'National Olympiad',
      index: true,
    },
    isFree: {
      type: Boolean,
      default: true,
      index: true,
    },
    fee: {
      type: Number,
      default: 0,
      min: 0,
    },
    currency: {
      type: String,
      default: 'INR',
    },
    status: {
      type: String,
      enum: [
        'draft',
        'published',
        'registration_open',
        'registration_closed',
        'in_progress',
        'completed',
        'archived',
      ],
      default: 'registration_open',
      index: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    isMultiStage: {
      type: Boolean,
      default: false,
      index: true,
    },
    totalStages: {
      type: Number,
      default: 1,
    },
    totalQuestions: {
      type: Number,
      default: 10,
    },
    durationMinutes: {
      type: Number,
      default: 30,
    },
    totalMarks: {
      type: Number,
      default: 20,
    },
    passingMarks: {
      type: Number,
      default: 12,
    },
    passingPercentage: {
      type: Number,
      default: 60,
    },
    negativeMarking: {
      type: Boolean,
      default: false,
    },
    negativeMarkValue: {
      type: Number,
      default: 0,
    },
    registrationDeadline: {
      type: Date,
      default: null,
    },
    examDate: {
      type: Date,
      default: null,
    },
    examEndDate: {
      type: Date,
      default: null,
    },
    enrolledCount: {
      type: Number,
      default: 0,
    },
    eligibility: {
      type: String,
      default: 'Open to all interested students.',
    },
    overview: {
      type: String,
      default: '',
    },
    instructions: [{ type: String }],
    stages: [stageSchema],
    prizes: [
      {
        rank: { type: String },
        prize: { type: String },
      },
    ],
    centers: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

examSchema.index({ status: 1, isFree: 1 });
examSchema.index({ featured: 1 });

export const Exam = mongoose.model('Exam', examSchema);
