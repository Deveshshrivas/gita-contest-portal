import mongoose from 'mongoose';
import { connectDB, disconnectDB } from '../config/db.js';
import { User } from '../models/User.js';
import { Exam } from '../models/Exam.js';
import { Question } from '../models/Question.js';
import { Book } from '../models/Book.js';
import { DonationCampaign } from '../models/DonationCampaign.js';
import { Donation } from '../models/Donation.js';
import { DistributionConsignment } from '../models/DistributionConsignment.js';
import { hashPassword } from '../utils/password.js';

// Predefined demo accounts matching frontend roles
const SEED_USERS = [
  {
    name: 'Dr. Achyuta Krishna Das',
    email: 'superadmin@gitacontest.in',
    role: 'super_admin',
    title: 'Chief Director & Super Administrator',
    organization: 'ISKCON Global Education Board',
    phone: '+91 98100 11001',
    permissions: ['all'],
  },
  {
    name: 'Prof. Ramanathan Sharma',
    email: 'admin@gitacontest.in',
    role: 'admin',
    title: 'Platform Administrator',
    organization: 'National Gita Olympiad Directorate',
    phone: '+91 98200 22002',
    permissions: ['exams_manage', 'students_manage', 'schedules_manage'],
  },
  {
    name: 'Dr. Damodar Swarup',
    email: 'controller@gitacontest.in',
    role: 'exam_controller',
    title: 'Chief Examination Controller',
    organization: 'Vedic Academic Evaluation Council',
    phone: '+91 98300 33003',
    permissions: ['exams_manage', 'stages_manage', 'questions_manage'],
  },
  {
    name: 'Shri Brijesh Agarwal',
    email: 'manager.delhi@gitacontest.in',
    role: 'manager',
    title: 'Regional Manager & Distribution Head',
    organization: 'ISKCON Delhi & NCR Zone',
    phone: '+91 98400 44004',
    permissions: ['centers_manage', 'inventory_manage'],
  },
  {
    name: 'Sunita Deshmukh',
    email: 'coordinator.mumbai@gitacontest.in',
    role: 'exam_coordinator',
    title: 'Senior Exam Coordinator',
    organization: 'Western Zone Coordination Cell',
    phone: '+91 98500 55005',
    permissions: ['students_register', 'attendance_manage'],
  },
  {
    name: 'CA Hemant Singhania',
    email: 'finance@gitacontest.in',
    role: 'finance_manager',
    title: 'Chief Financial Officer & Accounts Head',
    organization: 'ISKCON Youth Trust Finance',
    phone: '+91 98600 66006',
    permissions: ['finance_manage', 'donations_view'],
  },
  {
    name: 'Dr. Vidya Devi Dasi',
    email: 'content@gitacontest.in',
    role: 'content_manager',
    title: 'Publications & Curriculum Lead',
    organization: 'Bhaktivedanta Book Trust Editorial',
    phone: '+91 98700 77007',
    permissions: ['books_manage', 'syllabus_manage'],
  },
  {
    name: 'Arjun Sharma',
    email: 'arjun.sharma@example.com',
    role: 'student',
    title: 'Student Candidate',
    organization: 'Delhi Public School, R.K. Puram',
    rollNo: 'GLC-2026-8842',
    category: 'Senior (Class 10-12)',
    school: 'Delhi Public School, R.K. Puram',
    city: 'New Delhi',
    state: 'Delhi',
    currentStage: 2,
    stageStatus: {
      stage1: { status: 'qualified', score: 26, totalMarks: 30, percentage: 86.7 },
      stage2: { status: 'unlocked', score: null, totalMarks: 50, percentage: null },
      stage3: { status: 'locked', score: null, totalMarks: 100, percentage: null },
    },
    booksReceived: true,
  },
  {
    name: 'Shri Rajeshwar Singhania',
    email: 'rajeshwar.singhania@apexcorp.in',
    role: 'donor',
    title: 'Patron Donor & Educational Sponsor',
    organization: 'Singhania Foundation & Philanthropies',
    totalDonated: 150000,
    booksSponsored: 750,
    studentsSponsored: 120,
  },
];

const SEED_EXAMS = [
  {
    id: 'glc-2026',
    slug: 'gita-leadership-contest-2026',
    name: 'National Gita Leadership Contest (GLC) 2026',
    subtitle: "India's Premier Moral, Spiritual & Leadership Olympiad based on Bhagavad Gita",
    badge: 'National Championship',
    category: 'National Olympiad',
    isFree: true,
    fee: 0,
    currency: 'INR',
    status: 'registration_open',
    featured: true,
    isMultiStage: true,
    totalStages: 3,
    totalQuestions: 15,
    durationMinutes: 45,
    totalMarks: 30,
    passingMarks: 18,
    passingPercentage: 60,
    negativeMarking: true,
    negativeMarkValue: 0.5,
    registrationDeadline: new Date('2026-11-30T23:59:59Z'),
    examDate: new Date('2026-12-06T10:00:00Z'),
    enrolledCount: 28450,
    eligibility: 'Open to School Students (Class 6-12), College Undergraduates, and Working Professionals up to 30 years.',
    overview: 'Tests practical leadership, resilience, ethical decision-making, and profound spiritual insights drawn from the 18 chapters of Bhagavad Gita As It Is.',
    instructions: [
      'The examination is divided into 3 sequential stages: Preliminary, Zonal Intermediate, and National Grand Finale.',
      'You must score at least 60% in Stage 1 to qualify for Stage 2.',
      'Each question carries 2 marks. For every incorrect answer, 0.5 marks will be deducted.',
    ],
    stages: [
      {
        stageNumber: 1,
        title: 'Stage 1: National Preliminary Online Exam',
        description: 'Foundational concepts and Sanskrit verses across Chapters 1-6.',
        durationMinutes: 45,
        totalQuestions: 15,
        totalMarks: 30,
        passingMarks: 18,
        passingPercentage: 60,
        status: 'active',
        syllabusChapters: ['Chapter 1: Observing the Armies', 'Chapter 2: Sankhya Yoga', 'Chapter 3: Karma Yoga'],
      },
      {
        stageNumber: 2,
        title: 'Stage 2: Regional Zonal Semi-Finals',
        description: 'Advanced thematic reasoning across Chapters 7-12.',
        durationMinutes: 60,
        totalQuestions: 25,
        totalMarks: 50,
        passingMarks: 30,
        passingPercentage: 60,
        status: 'locked',
        syllabusChapters: ['Chapter 7: Knowledge of the Absolute', 'Chapter 12: Devotional Service'],
      },
      {
        stageNumber: 3,
        title: 'Stage 3: National Grand Finale & Viva Voce',
        description: 'Comprehensive philosophical analysis across Chapters 13-18.',
        durationMinutes: 90,
        totalQuestions: 40,
        totalMarks: 100,
        passingMarks: 60,
        passingPercentage: 60,
        status: 'locked',
        syllabusChapters: ['Chapter 13-18 Synthesis'],
      },
    ],
    prizes: [
      { rank: '1st Rank', prize: '₹51,000 Cash + Gold Trophy' },
      { rank: '2nd Rank', prize: '₹31,000 Cash + Silver Trophy' },
      { rank: '3rd Rank', prize: '₹21,000 Cash + Bronze Trophy' },
    ],
  },
  {
    id: 'gita-junior-2026',
    slug: 'junior-gita-olympiad-2026',
    name: 'Junior Bhagavad Gita Olympiad 2026',
    subtitle: 'Inspiring Character, Values, and Concentration for School Students (Class 4 to 8)',
    badge: 'School Special',
    category: 'Junior School',
    isFree: true,
    fee: 0,
    status: 'registration_open',
    featured: true,
    isMultiStage: false,
    totalStages: 1,
    totalQuestions: 10,
    durationMinutes: 30,
    totalMarks: 20,
    passingMarks: 10,
    passingPercentage: 50,
    negativeMarking: false,
    negativeMarkValue: 0,
    enrolledCount: 14200,
  },
  {
    id: 'gita-leadership-advanced',
    slug: 'advanced-gita-leadership-diploma',
    name: 'Executive & Corporate Gita Leadership Certification',
    subtitle: 'Strategic Decision-Making, Mental Clarity, and Vedic Management for Professionals',
    badge: 'Professional & Paid',
    category: 'Corporate & Executive',
    isFree: false,
    fee: 499,
    status: 'registration_open',
    featured: false,
    isMultiStage: true,
    totalStages: 2,
    totalQuestions: 20,
    durationMinutes: 60,
    totalMarks: 40,
    passingMarks: 24,
    passingPercentage: 60,
    negativeMarking: true,
    negativeMarkValue: 0.5,
    enrolledCount: 3820,
  },
  {
    id: 'gita-practice-mock',
    slug: '24-7-free-practice-mock',
    name: '24x7 Self-Assessment & Instant Practice Exam',
    subtitle: 'Instant Evaluation, Detailed Shloka Explanations, and Unlimited Retakes',
    badge: 'Instant & Free',
    category: 'Practice & Mock',
    isFree: true,
    fee: 0,
    status: 'registration_open',
    featured: true,
    isMultiStage: false,
    totalStages: 1,
    totalQuestions: 10,
    durationMinutes: 20,
    totalMarks: 20,
    passingMarks: 12,
    passingPercentage: 60,
    negativeMarking: false,
    enrolledCount: 65920,
  },
];

const SEED_QUESTIONS = [
  {
    id: 'q-1',
    chapter: 2,
    verse: '2.47',
    difficulty: 'Easy',
    marks: 2,
    negativeMarks: 0.5,
    shlokaText: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥',
    question: "According to Bhagavad Gita 2.47 ('Karmanye Vadhikaraste...'), what does Lord Krishna state you have a right to?",
    questionHindi: 'भगवद्गीता २.४७ के अनुसार, भगवान श्रीकृष्ण क्या कहते हैं कि आपका किस पर अधिकार है?',
    options: [
      { key: 'A', text: 'To the fruits and results of your actions' },
      { key: 'B', text: 'Only to perform your prescribed duty, but never to the fruits' },
      { key: 'C', text: 'To renounce all work and remain inactive' },
      { key: 'D', text: 'To demand divine rewards for every sacrifice' },
    ],
    correctAnswer: 'B',
    explanation: 'Lord Krishna instructs Arjuna in Chapter 2, Verse 47 that one has a right only to perform duties (Karma), but not to the fruits thereof.',
  },
  {
    id: 'q-2',
    chapter: 2,
    verse: '2.20',
    difficulty: 'Easy',
    marks: 2,
    negativeMarks: 0.5,
    shlokaText: 'न जायते म्रियते वा कदाचिन्नायं भूत्वा भविता वा न भूयः। अजो नित्यः शाश्वतोऽयं पुराणो न हन्यते हन्यमाने शरीरे॥',
    question: 'What are the core eternal qualities of the soul (Atman) described in Bhagavad Gita 2.20?',
    questionHindi: 'भगवद्गीता २.२० में आत्मा के मुख्य शाश्वत गुणों का क्या वर्णन है?',
    options: [
      { key: 'A', text: 'It is born with the body and dies with the body' },
      { key: 'B', text: 'It changes constantly through physical transformations' },
      { key: 'C', text: 'It is never born and never dies; it is unborn, eternal, ever-existing and primeval' },
      { key: 'D', text: 'It can be destroyed by modern scientific weapons' },
    ],
    correctAnswer: 'C',
    explanation: 'For the soul there is neither birth nor death at any time. It is unborn, eternal, ever-existing, and primeval. It is not slain when the body is slain.',
  },
  {
    id: 'q-3',
    chapter: 3,
    verse: '3.21',
    difficulty: 'Medium',
    marks: 2,
    negativeMarks: 0.5,
    shlokaText: 'यद्यदाचरति श्रेष्ठस्तत्तदेवेतरो जनः। स यत्प्रमाणं कुरुते लोकस्तदनुवर्तते॥',
    question: 'According to BG 3.21, why must a leader act with exemplary responsibility?',
    questionHindi: 'भगवद्गीता ३.२१ के अनुसार, श्रेष्ठ पुरुष (नेता) को आदर्श आचरण क्यों करना चाहिए?',
    options: [
      { key: 'A', text: 'To earn high taxes from the public' },
      { key: 'B', text: 'Whatever action a great man performs, common men follow; and whatever standards he sets, the world pursues' },
      { key: 'C', text: 'To prove intellectual superiority over others' },
      { key: 'D', text: 'To avoid physical exertion in administration' },
    ],
    correctAnswer: 'B',
    explanation: 'BG 3.21 highlights the supreme principle of leadership by example (Yad yad acarati sresthah...). Leaders set the cultural and ethical standards for society.',
  },
  {
    id: 'q-4',
    chapter: 18,
    verse: '18.66',
    difficulty: 'Medium',
    marks: 2,
    negativeMarks: 0.5,
    shlokaText: 'सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज। अहं त्वां सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः॥',
    question: "What is Lord Krishna's ultimate instruction to Arjuna in the concluding chapter (BG 18.66)?",
    questionHindi: 'अंतिम अध्याय (१८.६६) में भगवान श्रीकृष्ण का अर्जुन को परम उपदेश क्या है?',
    options: [
      { key: 'A', text: 'Abandon all varieties of religion and just surrender unto Me alone' },
      { key: 'B', text: 'Perform rigorous physical penances in the forest' },
      { key: 'C', text: 'Renounce all worldly duties immediately without fighting' },
      { key: 'D', text: 'Worship only demigods for material prosperity' },
    ],
    correctAnswer: 'A',
    explanation: 'In Chapter 18 Verse 66 (Charama Shloka), Krishna instructs: "Abandon all varieties of religion and just surrender unto Me alone. I shall deliver you from all sinful reactions. Do not fear."',
  },
  {
    id: 'q-5',
    chapter: 12,
    verse: '12.13-14',
    difficulty: 'Hard',
    type: 'TrueFalse',
    marks: 2,
    negativeMarks: 0.5,
    shlokaText: 'अद्वेष्टा सर्वभूतानां मैत्रः करुण एव च। निर्ममो निरहङ्कारः समदुःखसुखः क्षमी॥',
    question: 'True or False: In BG 12.13, Krishna declares that a person who is non-envious, a kind friend to all living entities, free from possessiveness and false ego, and equipoised in happiness and distress is very dear to Him.',
    questionHindi: 'सत्य या असत्य: भगवद्गीता १२.१३ में श्रीकृष्ण कहते हैं कि जो किसी से द्वेष नहीं करता, सबका मित्र व दयालु है, अहंकार रहित है, वह उन्हें अत्यंत प्रिय है।',
    options: [
      { key: 'A', text: 'True' },
      { key: 'B', text: 'False' },
    ],
    correctAnswer: 'A',
    explanation: 'True. Krishna specifically enumerates these divine qualities across verses 12.13 to 12.20 as characteristics of one who is dearest to Him.',
  },
];

const SEED_BOOKS = [
  {
    id: 'b-1',
    title: 'Bhagavad-gītā As It Is (Complete Deluxe Edition)',
    hindiTitle: 'श्रीमद्भगवद्गीता यथारूप (सम्पूर्ण संस्करण)',
    author: 'A.C. Bhaktivedanta Swami Prabhupāda',
    language: 'English',
    isbn: '978-0892131341',
    pages: 928,
    edition: 'Deluxe Hardbound Edition with 56 Color Plates',
    price: 350,
    sponsorCost: 200,
    coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&auto=format&fit=crop&q=80',
    description: "The world's largest-selling and most authoritative English edition of the Gita.",
    stockReceived: 25000,
    stockAllocated: 12000,
    stockDistributed: 9500,
    distributionLocations: ['Delhi Central', 'Mumbai', 'Bengaluru', 'Kolkata'],
  },
  {
    id: 'b-2',
    title: 'श्रीमद्भगवद्गीता यथारूप (सचित्र बृहद् संस्करण)',
    hindiTitle: 'श्रीमद्भगवद्गीता यथारूप (हिन्दी बृहद् संस्करण)',
    author: 'ए.सी. भक्तिवेदांत स्वामी प्रभुपाद',
    language: 'Hindi',
    isbn: '978-9382109280',
    pages: 884,
    edition: 'Hardbound Gold-foiled Edition',
    price: 320,
    sponsorCost: 180,
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&auto=format&fit=crop&q=80',
    description: 'मूल संस्कृत श्लोक, अन्वय, हिन्दी अनुवाद तथा स्वामी प्रभुपाद के प्रामाणिक तात्पर्यों सहित।',
    stockReceived: 35000,
    stockAllocated: 16000,
    stockDistributed: 14200,
    distributionLocations: ['Delhi NCR', 'Jaipur', 'Lucknow', 'Patna'],
  },
  {
    id: 'b-3',
    title: 'Bhagavad Gita for Students: Illustrated Wisdom',
    hindiTitle: 'विद्यार्थियों के लिए सचित्र भगवद्गीता',
    author: 'ISKCON Youth Forum Editorial Team',
    language: 'English',
    isbn: '978-9388123401',
    pages: 184,
    edition: 'Student Full-Color Softcover',
    price: 150,
    sponsorCost: 99,
    coverImage: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&auto=format&fit=crop&q=80',
    description: 'Special edition crafted for schools and youth Olympiad candidates.',
    stockReceived: 40000,
    stockAllocated: 22000,
    stockDistributed: 15000,
    distributionLocations: ['Pan-India Exam Centers'],
  },
];

const SEED_CAMPAIGNS = [
  {
    id: 'camp-1',
    title: "Sponsor a Student's Gita Exam Kit & Book",
    subtitle: 'Provide free registration, a personal hardbound Bhagavad Gita, and study pack to underprivileged students.',
    targetAmount: 1500000,
    raisedAmount: 1142000,
    unitCost: 250,
    donorsCount: 412,
    beneficiariesCount: 4568,
    category: 'Student Sponsorship',
    coverImage: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&auto=format&fit=crop&q=80',
    description: 'Thousands of brilliant school students across government schools wish to participate in the National Gita Leadership Contest.',
    taxBenefit: '100% Tax Exemption under Section 80G of IT Act',
  },
  {
    id: 'camp-2',
    title: '100,000 Free Bhagavad Gitas for Indian Youth & Colleges',
    subtitle: 'Mass book distribution drive placing sacred wisdom into the hands of future doctors and engineers.',
    targetAmount: 5000000,
    raisedAmount: 3875000,
    unitCost: 180,
    donorsCount: 1250,
    beneficiariesCount: 21500,
    category: 'Book Distribution',
    coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80',
    description: 'National initiative distributing authentic copies of Bhagavad Gita As It Is across 500+ campuses.',
    taxBenefit: 'Eligible for 80G Tax Deductions',
  },
];

async function seed() {
  try {
    console.log('[Seed] Connecting to MongoDB...');
    await connectDB();

    console.log('[Seed] Cleaning old database collections...');
    await Promise.all([
      User.deleteMany({}),
      Exam.deleteMany({}),
      Question.deleteMany({}),
      Book.deleteMany({}),
      DonationCampaign.deleteMany({}),
      Donation.deleteMany({}),
      DistributionConsignment.deleteMany({}),
    ]);

    console.log('[Seed] Seeding 9 demo role users with secure hashed password...');
    const defaultPassword = 'GitaExam@2026';
    const passwordHash = await hashPassword(defaultPassword);

    for (const u of SEED_USERS) {
      await User.create({
        ...u,
        passwordHash,
      });
    }

    console.log('[Seed] Seeding multi-stage examinations...');
    for (const ex of SEED_EXAMS) {
      await Exam.create(ex);
    }

    console.log('[Seed] Seeding Bhagavad Gita question bank...');
    for (const q of SEED_QUESTIONS) {
      await Question.create(q);
    }

    console.log('[Seed] Seeding books inventory...');
    for (const b of SEED_BOOKS) {
      await Book.create(b);
    }

    console.log('[Seed] Seeding sponsorship campaigns...');
    for (const c of SEED_CAMPAIGNS) {
      await DonationCampaign.create(c);
    }

    console.log('[Seed] Seeding sample 80G donation records...');
    await Donation.create({
      receiptNo: 'REC-ISKCON-2026-0491',
      campaignId: 'camp-1',
      campaignTitle: "Sponsor a Student's Gita Exam Kit & Book",
      donorName: 'Shri Rajeshwar Singhania',
      donorEmail: 'rajeshwar.singhania@apexcorp.in',
      donorPhone: '+91 98900 88008',
      panNumber: 'AAECS1234F',
      amount: 50000,
      studentsSponsored: 200,
      booksSponsored: 200,
      paymentMethod: 'UPI / Net Banking',
      paymentStatus: 'paid',
      transactionId: 'TXN-884920194',
      allocatedCenter: 'Delhi NCR & Mayapur',
      is80GCertified: true,
    });

    console.log('[Seed] Seeding sample distribution consignments...');
    await DistributionConsignment.create({
      trackingNumber: 'DTDC-DEL-984210',
      campaignId: 'dist-camp-1',
      bookId: 'b-2',
      bookTitle: 'श्रीमद्भगवद्गीता यथारूप (हिन्दी)',
      quantity: 1500,
      sourceHub: 'Mayapur Central Warehouse',
      destination: 'Delhi Public School, R.K. Puram (Center 01)',
      courierName: 'DTDC Express Logistics',
      dispatchDate: '2026-11-01',
      estimatedDelivery: '2026-11-03',
      status: 'delivered',
      receivedBy: 'Principal Office / Ved Vyas Club',
      notes: 'Verified undamaged, distributed to registered candidates.',
    });

    console.log('=======================================================');
    console.log('  Database Seed Completed Successfully!');
    console.log('  Default Password for All Demo Accounts: GitaExam@2026');
    console.log('  Accounts:');
    SEED_USERS.forEach((u) => console.log(`   - [${u.role}] ${u.email}`));
    console.log('=======================================================');

    await disconnectDB();
    process.exit(0);
  } catch (error) {
    console.error('[Seed] Error during seeding:', error);
    process.exit(1);
  }
}

seed();
