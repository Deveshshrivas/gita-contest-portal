import mongoose from 'mongoose';
import { Exam } from '../models/Exam.js';
import { User } from '../models/User.js';
import { logAuditAction } from '../middleware/audit.middleware.js';

export async function getExams({ category, isFree, isMultiStage, status, search, page = 1, limit = 20 }) {
  const query = {};

  if (category && category !== 'all') {
    query.category = category;
  }

  if (isFree !== undefined && isFree !== null && isFree !== '') {
    query.isFree = isFree === 'true' || isFree === true;
  }

  if (isMultiStage !== undefined && isMultiStage !== null && isMultiStage !== '') {
    query.isMultiStage = isMultiStage === 'true' || isMultiStage === true;
  }

  if (status && status !== 'all') {
    query.status = status;
  }

  if (search && search.trim()) {
    const regex = new RegExp(search.trim(), 'i');
    query.$or = [{ name: regex }, { subtitle: regex }, { overview: regex }];
  }

  const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
  const total = await Exam.countDocuments(query);
  const exams = await Exam.find(query)
    .sort({ featured: -1, createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit, 10));

  return {
    exams,
    pagination: {
      total,
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      pages: Math.ceil(total / parseInt(limit, 10)),
    },
  };
}

export async function getExamByIdOrSlug(idOrSlug) {
  if (!idOrSlug) {
    const error = new Error('Exam identifier is required');
    error.statusCode = 400;
    throw error;
  }

  const isObjectId = mongoose.Types.ObjectId.isValid(idOrSlug);
  const conditions = [{ id: idOrSlug }, { slug: idOrSlug.toLowerCase() }];
  if (isObjectId) {
    conditions.push({ _id: idOrSlug });
  }

  const exam = await Exam.findOne({ $or: conditions });

  if (!exam) {
    const error = new Error(`Examination '${idOrSlug}' not found.`);
    error.statusCode = 404;
    throw error;
  }

  return exam;
}

export async function createExam(examData, adminUser, req) {
  const slug = (examData.name || 'exam')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  const id = `exam-${Date.now()}`;

  const newExam = await Exam.create({
    ...examData,
    id,
    slug: `${slug}-${Math.floor(100 + Math.random() * 900)}`,
    enrolledCount: 0,
  });

  await logAuditAction({
    action: 'EXAM_CREATE',
    req,
    targetResource: 'Exam',
    targetId: newExam.id,
    details: { name: newExam.name, category: newExam.category, isFree: newExam.isFree },
  });

  return newExam;
}

export async function updateExam(idOrSlug, examData, adminUser, req) {
  const exam = await getExamByIdOrSlug(idOrSlug);

  Object.assign(exam, examData);
  await exam.save();

  await logAuditAction({
    action: 'EXAM_UPDATE',
    req,
    targetResource: 'Exam',
    targetId: exam.id,
    details: { name: exam.name, status: exam.status },
  });

  return exam;
}

export async function deleteExam(idOrSlug, adminUser, req) {
  const exam = await getExamByIdOrSlug(idOrSlug);
  await Exam.deleteOne({ _id: exam._id });

  await logAuditAction({
    action: 'EXAM_DELETE',
    req,
    targetResource: 'Exam',
    targetId: exam.id,
    details: { name: exam.name },
  });

  return true;
}

export async function enrollCandidate(examIdOrSlug, user, req) {
  const exam = await getExamByIdOrSlug(examIdOrSlug);

  // Increment enrolled count
  exam.enrolledCount = (exam.enrolledCount || 0) + 1;
  await exam.save();

  // If candidate roll number does not exist, assign one
  if (!user.rollNo) {
    user.rollNo = `GLC-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    await user.save();
  }

  await logAuditAction({
    action: 'EXAM_ENROLL',
    req,
    targetResource: 'Exam',
    targetId: exam.id,
    details: { examName: exam.name, candidateName: user.name, rollNo: user.rollNo },
  });

  return {
    exam,
    candidate: user,
  };
}
