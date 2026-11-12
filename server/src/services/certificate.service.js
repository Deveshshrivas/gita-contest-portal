import { Certificate } from '../models/Certificate.js';
import { Result } from '../models/Result.js';

export async function verifyCertificate(queryCode) {
  if (!queryCode || !queryCode.trim()) {
    const error = new Error('Certificate ID, Roll Number, or Verification Code is required');
    error.statusCode = 400;
    throw error;
  }

  const cleanQuery = queryCode.trim().toUpperCase();

  const certificate = await Certificate.findOne({
    $or: [
      { certificateId: cleanQuery },
      { verificationCode: cleanQuery },
      { rollNo: cleanQuery },
    ],
    isValid: true,
  });

  if (!certificate) {
    return {
      isValid: false,
      message: 'No active or valid Certificate of Merit found for the provided identifier.',
    };
  }

  return {
    isValid: true,
    certificateId: certificate.certificateId,
    verificationCode: certificate.verificationCode,
    candidateName: certificate.candidateName,
    rollNo: certificate.rollNo,
    examName: certificate.examName,
    meritTier: certificate.meritTier,
    percentage: certificate.percentage,
    issueDate: certificate.issueDate,
    signatory: certificate.signatory,
    message: 'Official Bhagavad Gita Olympiad Certificate of Merit verified by Examination Authority.',
  };
}

export async function getUserCertificates(userId) {
  return Certificate.find({ user: userId, isValid: true }).sort({ issueDate: -1 });
}
