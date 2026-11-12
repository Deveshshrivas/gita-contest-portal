export const ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  EXAM_CONTROLLER: 'exam_controller',
  MANAGER: 'manager',
  EXAM_COORDINATOR: 'exam_coordinator',
  FINANCE_MANAGER: 'finance_manager',
  CONTENT_MANAGER: 'content_manager',
  STUDENT: 'student',
  DONOR: 'donor',
};

export const ROLE_LABELS = {
  [ROLES.SUPER_ADMIN]: 'Super Administrator',
  [ROLES.ADMIN]: 'Platform Administrator',
  [ROLES.EXAM_CONTROLLER]: 'Exam Controller',
  [ROLES.MANAGER]: 'Center & Distribution Manager',
  [ROLES.EXAM_COORDINATOR]: 'Exam Coordinator',
  [ROLES.FINANCE_MANAGER]: 'Finance Manager',
  [ROLES.CONTENT_MANAGER]: 'Content & Books Manager',
  [ROLES.STUDENT]: 'Student / Candidate',
  [ROLES.DONOR]: 'Patron & Donor',
};

export const ROLE_COLORS = {
  [ROLES.SUPER_ADMIN]: { bg: 'bg-red-50 text-red-700 border-red-200', badge: 'bg-red-600' },
  [ROLES.ADMIN]: { bg: 'bg-purple-50 text-purple-700 border-purple-200', badge: 'bg-purple-600' },
  [ROLES.EXAM_CONTROLLER]: { bg: 'bg-emerald-50 text-emerald-700 border-emerald-200', badge: 'bg-emerald-600' },
  [ROLES.MANAGER]: { bg: 'bg-blue-50 text-blue-700 border-blue-200', badge: 'bg-blue-600' },
  [ROLES.EXAM_COORDINATOR]: { bg: 'bg-indigo-50 text-indigo-700 border-indigo-200', badge: 'bg-indigo-600' },
  [ROLES.FINANCE_MANAGER]: { bg: 'bg-amber-50 text-amber-700 border-amber-200', badge: 'bg-amber-600' },
  [ROLES.CONTENT_MANAGER]: { bg: 'bg-teal-50 text-teal-700 border-teal-200', badge: 'bg-teal-600' },
  [ROLES.STUDENT]: { bg: 'bg-emerald-50 text-emerald-800 border-emerald-200', badge: 'bg-emerald-700' },
  [ROLES.DONOR]: { bg: 'bg-orange-50 text-orange-800 border-orange-200', badge: 'bg-orange-600' },
};
