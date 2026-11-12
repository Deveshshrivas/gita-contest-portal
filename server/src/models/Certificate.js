import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema(
  {
    certificateId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    verificationCode: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    result: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Result',
      required: true,
      unique: true,
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
    examName: {
      type: String,
      required: true,
    },
    meritTier: {
      type: String,
      required: true,
    },
    percentage: {
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
    issueDate: {
      type: Date,
      default: Date.now,
    },
    signatory: {
      name: { type: String, default: 'Dr. Achyuta Krishna Das' },
      title: { type: String, default: 'Chairman, ISKCON Global Education Board' },
    },
    isValid: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

certificateSchema.index({ rollNo: 1, isValid: 1 });

export const Certificate = mongoose.model('Certificate', certificateSchema);
