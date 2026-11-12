import { User } from '../models/User.js';
import { Exam } from '../models/Exam.js';
import { Question } from '../models/Question.js';
import { Result } from '../models/Result.js';
import { Book } from '../models/Book.js';
import { Donation } from '../models/Donation.js';
import { DistributionConsignment } from '../models/DistributionConsignment.js';

export async function getAdminOverviewStats() {
  const [
    totalCandidates,
    totalExams,
    totalQuestions,
    totalSubmissions,
    passedSubmissions,
    books,
    donations,
    consignmentsCount,
    recentResults,
  ] = await Promise.all([
    User.countDocuments({ role: 'student', status: 'active' }),
    Exam.countDocuments({ status: { $ne: 'archived' } }),
    Question.countDocuments({ isActive: true }),
    Result.countDocuments(),
    Result.countDocuments({ resultStatus: 'pass' }),
    Book.find(),
    Donation.find(),
    DistributionConsignment.countDocuments(),
    Result.find().sort({ submittedAt: -1 }).limit(5),
  ]);

  const passRate = totalSubmissions > 0 ? parseFloat(((passedSubmissions / totalSubmissions) * 100).toFixed(1)) : 100;

  const totalStockReceived = books.reduce((acc, b) => acc + (b.stockReceived || 0), 0);
  const totalStockAvailable = books.reduce((acc, b) => acc + (b.stockAvailable || 0), 0);
  const totalStockAllocated = books.reduce((acc, b) => acc + (b.stockAllocated || 0), 0);
  const totalStockDistributed = books.reduce((acc, b) => acc + (b.stockDistributed || 0), 0);

  const totalDonationsAmount = donations.reduce((acc, d) => acc + (d.amount || 0), 0);

  return {
    candidates: {
      total: totalCandidates,
    },
    exams: {
      total: totalExams,
    },
    questions: {
      total: totalQuestions,
    },
    evaluations: {
      totalSubmissions,
      passedSubmissions,
      passRate,
    },
    inventory: {
      totalReceived: totalStockReceived,
      totalAvailable: totalStockAvailable,
      totalAllocated: totalStockAllocated,
      totalDistributed: totalStockDistributed,
      consignmentsCount,
    },
    donations: {
      totalAmount: totalDonationsAmount,
      totalCount: donations.length,
    },
    recentResults,
  };
}
