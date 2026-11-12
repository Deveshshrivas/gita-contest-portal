import { connectDB, disconnectDB } from '../config/db.js';
import { User } from '../models/User.js';
import { ExamAttempt } from '../models/ExamAttempt.js';
import { Result } from '../models/Result.js';
import { Certificate } from '../models/Certificate.js';
import { Donation } from '../models/Donation.js';
import { DistributionConsignment } from '../models/DistributionConsignment.js';
import { RefreshToken } from '../models/RefreshToken.js';
import { Exam } from '../models/Exam.js';
import { hashPassword } from '../utils/password.js';

async function setupCleanSuperAdmin() {
  console.log('[Setup] Connecting to database...');
  await connectDB();

  console.log('[Setup] Wiping seed/demo users, test attempts, results, and transactions...');
  await Promise.all([
    User.deleteMany({}),
    ExamAttempt.deleteMany({}),
    Result.deleteMany({}),
    Certificate.deleteMany({}),
    Donation.deleteMany({}),
    DistributionConsignment.deleteMany({}),
    RefreshToken.deleteMany({}),
    // Remove test-generated integration test exams
    Exam.deleteMany({ name: { $regex: /Test Gita Olympiad/i } }),
  ]);

  console.log('[Setup] Creating official Super Admin account...');
  const adminPassword = 'Admin@Gita2026';
  const passwordHash = await hashPassword(adminPassword);

  const superAdmin = await User.create({
    name: 'Super Administrator',
    email: 'admin@gitacontest.in',
    passwordHash,
    role: 'super_admin',
    title: 'Chief Examination Director & Super Administrator',
    organization: 'National Gita Leadership Examination Board',
    phone: '+91 98000 00001',
    status: 'active',
    permissions: ['all'],
  });

  // Also support superadmin@gitacontest.in alias
  await User.create({
    name: 'Super Administrator',
    email: 'superadmin@gitacontest.in',
    passwordHash,
    role: 'super_admin',
    title: 'Chief Examination Director & Super Administrator',
    organization: 'National Gita Leadership Examination Board',
    phone: '+91 98000 00001',
    status: 'active',
    permissions: ['all'],
  });

  console.log('=======================================================');
  console.log('  Clean Super Admin Accounts Created Successfully!');
  console.log('  Email 1:   admin@gitacontest.in');
  console.log('  Email 2:   superadmin@gitacontest.in');
  console.log('  Password:  Admin@Gita2026');
  console.log('  Role:      super_admin (Full Master Privileges)');
  console.log('=======================================================');

  await disconnectDB();
}

setupCleanSuperAdmin().catch((err) => {
  console.error('[Setup] Fatal error:', err);
  process.exit(1);
});
