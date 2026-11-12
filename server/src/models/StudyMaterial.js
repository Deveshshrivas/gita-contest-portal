import mongoose from 'mongoose';

const studyMaterialSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['Syllabus Guide', 'Sample Papers', 'Shloka Handbook', 'Leadership Special'],
      default: 'Syllabus Guide',
      index: true,
    },
    chapter: {
      type: Number,
      min: 1,
      max: 18,
      default: null,
    },
    fileSize: {
      type: String,
      default: '2.5 MB',
    },
    pages: {
      type: Number,
      default: 20,
    },
    downloadUrl: {
      type: String,
      required: true,
    },
    downloadCount: {
      type: Number,
      default: 0,
    },
    isRestricted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const StudyMaterial = mongoose.model('StudyMaterial', studyMaterialSchema);
