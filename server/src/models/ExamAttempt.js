import mongoose from 'mongoose';

const examAttemptSchema = new mongoose.Schema(
  {
    attemptId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    exam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Exam',
      required: true,
      index: true,
    },
    examIdString: {
      type: String,
      required: true,
    },
    examName: {
      type: String,
      required: true,
    },
    stageNumber: {
      type: Number,
      default: 1,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    candidateName: {
      type: String,
      required: true,
    },
    candidateRollNo: {
      type: String,
      required: true,
    },
    questionIds: [
      {
        type: String,
      },
    ],
    durationMinutes: {
      type: Number,
      required: true,
    },
    totalSeconds: {
      type: Number,
      required: true,
    },
    startedAt: {
      type: Date,
      default: Date.now,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      index: true,
    },
    submittedAt: {
      type: Date,
      default: null,
    },
    status: {
      type: String,
      enum: ['in_progress', 'submitted', 'timed_out', 'evaluated'],
      default: 'in_progress',
      index: true,
    },
    // Answers map: questionId -> selectedKey ('A', 'B', etc)
    answers: {
      type: Map,
      of: String,
      default: () => new Map(),
    },
    // Review marks map: questionId -> boolean
    reviewMarks: {
      type: Map,
      of: Boolean,
      default: () => new Map(),
    },
    currentQuestionIndex: {
      type: Number,
      default: 0,
    },
    ipAddress: {
      type: String,
      default: '',
    },
    userAgent: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

examAttemptSchema.index({ user: 1, exam: 1, status: 1 });

export const ExamAttempt = mongoose.model('ExamAttempt', examAttemptSchema);
