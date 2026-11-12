// Initial Contests & Olympiads configuration
export const INITIAL_EXAMS = [
  {
    id: "glc-2026",
    slug: "gita-leadership-contest-2026",
    name: "Gita Leadership Contest (GLC) 2026",
    subtitle: "All-India National Shrimad Bhagavad Gita Olympiad",
    badge: "Flagship National Contest",
    category: "Senior & Open (Class 9th to College & Professionals)",
    durationMinutes: 45,
    totalQuestions: 12,
    totalMarks: 32,
    passingMarks: 16,
    negativeMarking: true,
    negativeMarkValue: 0.5,
    feeType: "Free",
    feeAmount: 0,
    startDate: "2026-11-01T00:00:00Z",
    endDate: "2026-12-06T23:59:59Z",
    examLiveDate: "2026-12-06",
    status: "active",
    isFeatured: true,
    description: "The Gita Leadership Contest (GLC) is India's most prestigious spiritual and value-based competition. Test your grasp of the Gita's timeless wisdom on leadership, mental mastery, decision-making, and Dharma.",
    syllabus: [
      "Chapter 2: Contents of the Gita Summarized (Sankhya Yoga)",
      "Chapter 3: Karma Yoga (Selfless Action & Leadership)",
      "Chapter 4: Transcendental Knowledge",
      "Chapter 6: Dhyana Yoga (Mind Control & Meditation)",
      "Chapter 9: Most Confidential Knowledge",
      "Chapter 18: Conclusion—The Perfection of Renunciation"
    ],
    prizes: [
      { rank: "1st Prize", reward: "₹51,000 Cash + Gold Trophy & Gita Ratna Medal" },
      { rank: "2nd Prize", reward: "₹31,000 Cash + Silver Trophy & Gita Ratna Medal" },
      { rank: "3rd Prize", reward: "₹21,000 Cash + Bronze Trophy & Certificate of Excellence" },
      { rank: "Consolation (Top 100)", reward: "₹1,100 + Special Commendation Certificate + Sacred Bhagavad Gita As It Is" },
      { rank: "All Participants", reward: "Personalized Digital Certificate of Merit with Verification QR" }
    ],
    guidelines: [
      "All questions are Multiple Choice Questions (MCQs) with single correct answer.",
      "The exam duration is 45 minutes with a strict countdown timer.",
      "Negative marking applies: 0.5 marks deducted for wrong answers on selected questions.",
      "You can mark questions for review and return to them anytime before final submission.",
      "Upon completion, your detailed scorecard and Certificate of Achievement are generated immediately."
    ]
  },
  {
    id: "gita-junior-2026",
    slug: "junior-gita-olympiad",
    name: "Junior Gita Olympiad 2026",
    subtitle: "Values, Character & Moral Wisdom for Young Champions",
    badge: "School Category",
    category: "Junior (Classes 5th to 8th)",
    durationMinutes: 30,
    totalQuestions: 8,
    totalMarks: 20,
    passingMarks: 10,
    negativeMarking: false,
    negativeMarkValue: 0,
    feeType: "Free",
    feeAmount: 0,
    startDate: "2026-10-15T00:00:00Z",
    endDate: "2026-12-15T23:59:59Z",
    examLiveDate: "2026-12-15",
    status: "active",
    isFeatured: false,
    description: "Specially crafted for school students to build strong moral character, concentration, respect for parents and teachers, and positive thinking through practical stories and shlokas.",
    syllabus: [
      "Story of Kurukshetra & Arjuna's Dilemma",
      "Qualities of the Soul (Atman) vs Physical Body",
      "Duty, Respect, and Truthfulness",
      "Essential Shlokas: BG 2.47, 9.26, 4.7"
    ],
    prizes: [
      { rank: "1st Prize", reward: "₹21,000 + Laptop / Tablet + Trophy" },
      { rank: "2nd Prize", reward: "₹15,000 + Smart Watch + Trophy" },
      { rank: "3rd Prize", reward: "₹10,000 + Educational Kit + Medal" },
      { rank: "All Students", reward: "Digital Certificate of Participation" }
    ],
    guidelines: [
      "No negative marking.",
      "30 minutes duration for 8 foundational questions.",
      "Instant certificate generation upon completion."
    ]
  },
  {
    id: "gita-practice-mock",
    slug: "gita-practice-mock-test",
    name: "Gita Contest 2026 Mock & Practice Test",
    subtitle: "Open Instant Self-Evaluation with Shloka Explanations",
    badge: "Instant Test — Practice Anytime",
    category: "Open for Everyone",
    durationMinutes: 20,
    totalQuestions: 6,
    totalMarks: 15,
    passingMarks: 8,
    negativeMarking: false,
    negativeMarkValue: 0,
    feeType: "Free",
    feeAmount: 0,
    startDate: "2026-01-01T00:00:00Z",
    endDate: "2026-12-31T23:59:59Z",
    examLiveDate: "Available 24/7",
    status: "active",
    isFeatured: true,
    description: "Take this instant mock exam anytime without waiting! Features instant answer feedback, verse citations, and an immediate Certificate of Completion.",
    syllabus: [
      "Key Shlokas of Chapter 2, 4, 9 and 18",
      "Basic philosophical concepts of Karma, Bhakti, and Jnana",
      "Practical leadership principles from the battlefield of Kurukshetra"
    ],
    prizes: [
      { rank: "All Participants", reward: "Immediate Digital Certificate of Completion + Detailed verse analysis" }
    ],
    guidelines: [
      "Unlimited retakes allowed.",
      "20 minutes countdown.",
      "Great way to prepare for the main national contest on December 6."
    ]
  }
];
