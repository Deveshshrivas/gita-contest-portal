import mongoose from 'mongoose';

export const USER_ROLES = [
  'super_admin',
  'admin',
  'exam_controller',
  'manager',
  'exam_coordinator',
  'finance_manager',
  'content_manager',
  'student',
  'donor',
];

const stageStatusSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ['pending', 'unlocked', 'qualified', 'completed', 'locked', 'disqualified'],
      default: 'locked',
    },
    score: { type: Number, default: null },
    totalMarks: { type: Number, default: null },
    percentage: { type: Number, default: null },
    completedAt: { type: Date, default: null },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    passwordHash: {
      type: String,
      required: [true, 'Password is required'],
      select: false, // never returned by default in queries
    },
    phone: {
      type: String,
      trim: true,
      default: '',
    },
    role: {
      type: String,
      enum: USER_ROLES,
      default: 'student',
      index: true,
    },
    title: {
      type: String,
      default: 'Candidate',
    },
    organization: {
      type: String,
      default: 'General Public',
    },
    rollNo: {
      type: String,
      sparse: true,
      unique: true,
      index: true,
    },
    category: {
      type: String,
      default: 'Senior (Class 10-12)',
    },
    school: {
      type: String,
      default: 'Self Study',
    },
    city: {
      type: String,
      default: 'New Delhi',
    },
    state: {
      type: String,
      default: 'Delhi',
    },
    assignedCenter: {
      type: String,
      default: 'National Online Portal',
    },
    centerCode: {
      type: String,
      default: 'DEL-01',
    },
    status: {
      type: String,
      enum: ['active', 'suspended', 'deleted'],
      default: 'active',
    },
    currentStage: {
      type: Number,
      default: 1,
      min: 1,
      max: 3,
    },
    stageStatus: {
      stage1: { type: stageStatusSchema, default: () => ({ status: 'pending' }) },
      stage2: { type: stageStatusSchema, default: () => ({ status: 'locked' }) },
      stage3: { type: stageStatusSchema, default: () => ({ status: 'locked' }) },
    },
    permissions: [{ type: String }],
    totalDonated: {
      type: Number,
      default: 0,
    },
    booksSponsored: {
      type: Number,
      default: 0,
    },
    studentsSponsored: {
      type: Number,
      default: 0,
    },
    attendance: {
      type: String,
      enum: ['Registered', 'Present', 'Absent'],
      default: 'Registered',
    },
    booksReceived: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.passwordHash;
        delete ret.__v;
        return ret;
      },
    },
  }
);

userSchema.index({ email: 1, status: 1 });
userSchema.index({ role: 1, status: 1 });

export const User = mongoose.model('User', userSchema);
