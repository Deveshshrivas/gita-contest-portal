import { storage } from './storage';

export const mockApi = {
  // ── EXAMS ──
  getExams: () => storage.get('exams', []),
  getExamById: (id) => {
    const list = storage.get('exams', []);
    return list.find((e) => e.id === id || e.slug === id);
  },
  createExam: (examData) => {
    const list = storage.get('exams', []);
    const newExam = {
      ...examData,
      id: `exam-${Date.now()}`,
      slug: (examData.name || 'exam').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      enrolledCount: 0,
      createdAt: new Date().toISOString(),
    };
    storage.set('exams', [newExam, ...list]);
    return newExam;
  },
  updateExam: (id, updateData) => {
    const list = storage.get('exams', []);
    const updated = list.map((e) => (e.id === id ? { ...e, ...updateData } : e));
    storage.set('exams', updated);
    return updated.find((e) => e.id === id);
  },
  deleteExam: (id) => {
    const list = storage.get('exams', []);
    const filtered = list.filter((e) => e.id !== id);
    storage.set('exams', filtered);
    return true;
  },

  // ── MULTI-STAGE MANAGEMENT ──
  updateExamStages: (examId, stages) => {
    const list = storage.get('exams', []);
    const target = list.find((e) => e.id === examId);
    if (!target) return null;
    const updated = list.map((e) =>
      e.id === examId ? { ...e, stages, totalStages: stages.length } : e
    );
    storage.set('exams', updated);
    return stages;
  },

  // ── QUESTIONS ──
  getQuestions: () => storage.get('questions', []),
  addQuestion: (qData) => {
    const list = storage.get('questions', []);
    const newQ = {
      ...qData,
      id: `q-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    storage.set('questions', [newQ, ...list]);
    return newQ;
  },
  updateQuestion: (id, qData) => {
    const list = storage.get('questions', []);
    const updated = list.map((q) => (q.id === id ? { ...q, ...qData } : q));
    storage.set('questions', updated);
    return updated.find((q) => q.id === id);
  },
  deleteQuestion: (id) => {
    const list = storage.get('questions', []);
    const filtered = list.filter((q) => q.id !== id);
    storage.set('questions', filtered);
    return true;
  },

  // ── STUDENTS ──
  getStudents: () => storage.get('students', []),
  getStudentById: (id) => {
    const list = storage.get('students', []);
    return list.find((s) => s.id === id || s.rollNo === id);
  },
  registerStudent: (studentData) => {
    const list = storage.get('students', []);
    const rollNo = `GLC-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newStudent = {
      id: `std-${Date.now()}`,
      rollNo,
      ...studentData,
      registeredAt: new Date().toISOString(),
      attendance: 'Registered',
      stageStatus: {
        stage1: { status: 'pending', score: null, totalMarks: 30, percentage: null },
        stage2: { status: 'locked', score: null, totalMarks: 50, percentage: null },
        stage3: { status: 'locked', score: null, totalMarks: 100, percentage: null },
      },
      currentStage: 1,
    };
    storage.set('students', [newStudent, ...list]);

    // Update exam enrolled count
    const exams = storage.get('exams', []);
    const examTarget = exams.find((e) => e.id === studentData.examId);
    if (examTarget) {
      examTarget.enrolledCount = (examTarget.enrolledCount || 0) + 1;
      storage.set('exams', exams);
    }

    return newStudent;
  },
  promoteStudentStage: (studentId, nextStageNumber) => {
    const list = storage.get('students', []);
    const updated = list.map((s) => {
      if (s.id === studentId || s.rollNo === studentId) {
        const stageKey = `stage${nextStageNumber}`;
        const prevKey = `stage${nextStageNumber - 1}`;
        const newStageStatus = { ...s.stageStatus };
        if (newStageStatus[prevKey]) {
          newStageStatus[prevKey].status = 'qualified';
        }
        if (newStageStatus[stageKey]) {
          newStageStatus[stageKey].status = 'unlocked';
        }
        return {
          ...s,
          currentStage: nextStageNumber,
          stageStatus: newStageStatus,
        };
      }
      return s;
    });
    storage.set('students', updated);
    return updated.find((s) => s.id === studentId);
  },

  // ── BOOKS & INVENTORY (WITH NEGATIVE STOCK PROTECTION) ──
  getBooks: () => storage.get('books', []),
  addBook: (bookData) => {
    const list = storage.get('books', []);
    const newBook = {
      ...bookData,
      id: `b-${Date.now()}`,
      stockReceived: Number(bookData.stockReceived || 0),
      stockAllocated: Number(bookData.stockAllocated || 0),
      stockDistributed: Number(bookData.stockDistributed || 0),
      stockAvailable: Math.max(
        0,
        Number(bookData.stockReceived || 0) -
          (Number(bookData.stockAllocated || 0) + Number(bookData.stockDistributed || 0))
      ),
    };
    storage.set('books', [newBook, ...list]);
    return newBook;
  },
  updateBookInventory: (bookId, { stockReceived, stockAllocated, stockDistributed }) => {
    const list = storage.get('books', []);
    let error = null;

    const updated = list.map((b) => {
      if (b.id === bookId) {
        const received = stockReceived !== undefined ? Number(stockReceived) : b.stockReceived;
        const allocated = stockAllocated !== undefined ? Number(stockAllocated) : b.stockAllocated;
        const distributed = stockDistributed !== undefined ? Number(stockDistributed) : b.stockDistributed;

        // Validation: Stock Available must never fall below 0
        const available = received - (allocated + distributed);
        if (available < 0) {
          error = `Cannot allocate or distribute more than available stock! Deficit: ${Math.abs(available)} units.`;
          return b; // do not update if negative
        }

        return {
          ...b,
          stockReceived: received,
          stockAllocated: allocated,
          stockDistributed: distributed,
          stockAvailable: available,
        };
      }
      return b;
    });

    if (error) {
      throw new Error(error);
    }

    storage.set('books', updated);
    return updated.find((b) => b.id === bookId);
  },

  // ── DONATIONS & CAMPAIGNS ──
  getCampaigns: () => storage.get('campaigns', []),
  getDonations: () => storage.get('donations', []),
  donateToCampaign: (campaignId, donationData) => {
    const campaigns = storage.get('campaigns', []);
    const donations = storage.get('donations', []);

    const targetCamp = campaigns.find((c) => c.id === campaignId);
    const amount = Number(donationData.amount || 500);

    const receiptNo = `REC-ISKCON-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newDonation = {
      id: `don-${Date.now()}`,
      receiptNo,
      campaignId,
      campaignTitle: targetCamp?.title || 'General Youth Wisdom Fund',
      donorName: donationData.donorName,
      donorEmail: donationData.donorEmail,
      donorPhone: donationData.donorPhone || '',
      panNumber: donationData.panNumber || 'EXEMPT80G',
      amount,
      studentsSponsored: Math.floor(amount / (targetCamp?.unitCost || 250)),
      booksSponsored: Math.floor(amount / (targetCamp?.unitCost || 180)),
      paymentMethod: donationData.paymentMethod || 'UPI / QR',
      paymentStatus: 'paid',
      transactionId: `TXN-${Math.floor(100000000 + Math.random() * 900000000)}`,
      donatedAt: new Date().toISOString(),
      allocatedCenter: donationData.allocatedCenter || 'National Distribution Pool',
      is80GCertified: true,
    };

    // Update campaign raisedAmount and donorsCount
    if (targetCamp) {
      targetCamp.raisedAmount = (targetCamp.raisedAmount || 0) + amount;
      targetCamp.donorsCount = (targetCamp.donorsCount || 0) + 1;
      targetCamp.beneficiariesCount =
        (targetCamp.beneficiariesCount || 0) +
        Math.max(1, Math.floor(amount / (targetCamp.unitCost || 200)));
      storage.set('campaigns', campaigns);
    }

    storage.set('donations', [newDonation, ...donations]);
    return newDonation;
  },

  // ── DISTRIBUTION ──
  getDistributionCampaigns: () => storage.get('distributionCampaigns', []),
  createDistributionCampaign: (campData) => {
    const list = storage.get('distributionCampaigns', []);
    const newCamp = {
      ...campData,
      id: `dist-camp-${Date.now()}`,
      dispatchedQuantity: 0,
      deliveredQuantity: 0,
      status: 'in_progress',
    };
    storage.set('distributionCampaigns', [newCamp, ...list]);
    return newCamp;
  },
  getDispatchLogs: () => storage.get('dispatchLogs', []),
  createDispatchLog: (dispatchData) => {
    const list = storage.get('dispatchLogs', []);
    const books = storage.get('books', []);
    const targetBook = books.find((b) => b.id === dispatchData.bookId);

    const quantity = Number(dispatchData.quantity || 0);

    // Negative stock check before dispatch!
    if (targetBook && targetBook.stockAvailable < quantity) {
      throw new Error(
        `Insufficient available stock for '${targetBook.title}'. Available: ${targetBook.stockAvailable}, Requested: ${quantity}`
      );
    }

    const newLog = {
      ...dispatchData,
      id: `disp-${Date.now()}`,
      trackingNumber: `EXP-${Math.floor(100000 + Math.random() * 900000)}`,
      dispatchDate: new Date().toISOString().split('T')[0],
      status: 'dispatched',
    };

    // Deduct available stock and increment distributed
    if (targetBook) {
      targetBook.stockAllocated = Math.max(0, targetBook.stockAllocated - quantity);
      targetBook.stockDistributed = targetBook.stockDistributed + quantity;
      targetBook.stockAvailable = Math.max(
        0,
        targetBook.stockReceived - (targetBook.stockAllocated + targetBook.stockDistributed)
      );
      storage.set('books', books);
    }

    storage.set('dispatchLogs', [newLog, ...list]);
    return newLog;
  },
  updateDispatchStatus: (dispatchId, status, receivedBy = '') => {
    const list = storage.get('dispatchLogs', []);
    const updated = list.map((d) =>
      d.id === dispatchId
        ? {
            ...d,
            status,
            receivedBy: receivedBy || d.receivedBy,
            deliveredAt: status === 'delivered' ? new Date().toISOString() : d.deliveredAt,
          }
        : d
    );
    storage.set('dispatchLogs', updated);
    return updated.find((d) => d.id === dispatchId);
  },

  // ── CENTERS ──
  getCenters: () => storage.get('centers', []),

  // ── USERS & ROLES ──
  getUsers: () => storage.get('users', []),
  addUser: (userData) => {
    const users = storage.get('users', []);
    const newUser = {
      ...userData,
      id: `usr-${Date.now()}`,
      status: 'active',
      createdAt: new Date().toISOString(),
    };
    storage.set('users', [newUser, ...users]);
    apiClient.createUser(userData).catch(() => {});
    return newUser;
  },
  updateUserRole: (userId, newRole) => {
    const users = storage.get('users', []);
    const updated = users.map((u) => (u.id === userId ? { ...u, role: newRole } : u));
    storage.set('users', updated);
    return updated.find((u) => u.id === userId);
  },
};
