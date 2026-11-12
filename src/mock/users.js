import { ROLES } from '../constants/roles';

export const DEMO_USERS = [
  {
    id: 'usr-super-admin',
    name: 'Super Administrator',
    email: 'admin@gitacontest.in',
    phone: '+91 98000 00001',
    role: ROLES.SUPER_ADMIN,
    title: 'Chief Examination Director & Super Administrator',
    organization: 'National Gita Leadership Examination Board',
    assignedCenter: 'Headquarters (New Delhi)',
    permissions: ['all'],
  },
];
