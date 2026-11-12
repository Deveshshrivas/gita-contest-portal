import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema(
  {
    resultId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    certificateId: {
      type: String,
      index: { unique: true, sparse: true },
    },
    attempt: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ExamAttempt',
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
    rollNo: {
      type: String,
      required: true,
      index: true,
    },
    city: {
      type: String,
      default: 'India',
    },
    totalQuestions: {
      type: Number,
      required: true,
    },
    attempted: {
      type: Number,
      required: true,
    },
    correct: {
      type: Number,
      required: true,
    },
    incorrect: {
      type: Number,
      required: true,
    },
    unattempted: {
      type: Number,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    totalMarks: {
      type: Number,
      required: true,
    },
    percentage: {
      type: Number,
      required: true,
    },
    timeSpentSeconds: {
      type: Number,
      default: 0,
    },
    resultStatus: {
      type: String,
      enum: ['pass', 'fail'],
      required: true,
      index: true,
    },
    meritTier: {
      type: String,
      default: 'Participant',
    },
    answers: {
      type: Map,
      of: String,
      default: () => new Map(),
    },
    // Detailed question reviews with explanation released upon evaluation
    questionReviews: [
      {
        id: String,
        question: String,
        questionHindi: String,
        shlokaText: String,
        chapter: Number,
        verse: String,
        marks: Number,
        userAnswer: String,
        correctAnswer: String,
        isCorrect: Boolean,
        explanation: String,
      },
    ],
    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

resultSchema.index({ user: 1, submittedAt: -1 });
resultSchema.index({ exam: 1, score: -1, timeSpentSeconds: 1 }); // for leaderboard ranking

export const Result = mongoose.model('Result', resultSchema);
