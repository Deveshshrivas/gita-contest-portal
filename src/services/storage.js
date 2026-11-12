import { INITIAL_EXAMS } from '../mock/exams';
import { MOCK_QUESTIONS } from '../mock/questions';
import { MOCK_STUDENTS } from '../mock/students';
import { MOCK_BOOKS } from '../mock/books';
import { MOCK_CAMPAIGNS, MOCK_DONATIONS } from '../mock/donations';
import { MOCK_DISTRIBUTION_CAMPAIGNS, MOCK_DISPATCH_LOGS, MOCK_CENTERS } from '../mock/distribution';
import { DEMO_USERS } from '../mock/users';

const PREFIX = 'gita_portal_';

export const storage = {
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(PREFIX + key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
      console.warn(`Storage get error for ${key}:`, e);
      return defaultValue;
    }
  },

  set: (key, value) => {
    try {
      localStorage.setItem(PREFIX + key, JSON.stringify(value));
    } catch (e) {
      console.warn(`Storage set error for ${key}:`, e);
    }
  },

  remove: (key) => {
    try {
      localStorage.removeItem(PREFIX + key);
    } catch (e) {
      console.warn(`Storage remove error for ${key}:`, e);
    }
  },

  init: () => {
    if (!storage.get('exams')) storage.set('exams', INITIAL_EXAMS);
    if (!storage.get('questions')) storage.set('questions', MOCK_QUESTIONS);
    if (!storage.get('students')) storage.set('students', []);
    if (!storage.get('books')) storage.set('books', MOCK_BOOKS);
    if (!storage.get('campaigns')) storage.set('campaigns', MOCK_CAMPAIGNS);
    if (!storage.get('donations')) storage.set('donations', []);
    if (!storage.get('distributionCampaigns')) storage.set('distributionCampaigns', MOCK_DISTRIBUTION_CAMPAIGNS);
    if (!storage.get('dispatchLogs')) storage.set('dispatchLogs', []);
    if (!storage.get('centers')) storage.set('centers', MOCK_CENTERS);
    
    // Initialize users if not present; purge legacy seeded mock users if present
    const currentUsers = storage.get('users');
    if (!currentUsers || currentUsers.length === 0) {
      storage.set('users', DEMO_USERS);
    } else if (currentUsers.some((u) => u.id === 'usr-admin-1')) {
      // Purge only legacy seeded dummy users from earlier versions
      storage.set('users', DEMO_USERS);
    }

    // Automatically purge legacy seeded dummy students and dispatch logs
    const currentStudents = storage.get('students');
    if (currentStudents && currentStudents.length > 0 && currentStudents[0]?.id === 'std-101') {
      storage.set('students', []);
    }
    const currentLogs = storage.get('dispatchLogs');
    if (currentLogs && currentLogs.length > 0 && currentLogs[0]?.id === 'disp-101') {
      storage.set('dispatchLogs', []);
    }
    const currentDonations = storage.get('donations');
    if (currentDonations && currentDonations.length > 0 && currentDonations[0]?.id === 'don-1001') {
      storage.set('donations', []);
    }
  }
};

// Auto-run initialization
storage.init();
