import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ROLES, ROLE_LABELS, ROLE_COLORS } from '../../constants/roles';
import Modal from './Modal';
import { Shield, Check, Users, Sparkles, ArrowRight, UserCheck, BookOpen, Heart, Award } from 'lucide-react';

const ALL_ROLES = [
  {
    role: ROLES.SUPER_ADMIN,
    name: 'Super Administrator',
    title: 'Chief Examination Director',
    organization: 'National Gita Leadership Examination Board',
    description: 'Full root access to all platform controls, exams, finances, users and audit logs',
  },
  {
    role: ROLES.ADMIN,
    name: 'Platform Administrator',
    title: 'Central Operations Administrator',
    organization: 'ISKCON National Board',
    description: 'Manage examinations, students, staff, center schedules, and operations',
  },
  {
    role: ROLES.EXAM_CONTROLLER,
    name: 'Gopal Das, M.Tech',
    title: 'Controller of Examinations',
    organization: 'National Exam Evaluation Cell',
    description: 'Manage questions, stages, scheduling, answer keys, results and certifications',
  },
  {
    role: ROLES.MANAGER,
    name: 'Rajesh Sharma',
    title: 'Center & Distribution Manager',
    organization: 'Delhi Regional Examination Center',
    description: 'Manage center operations, book inventory, physical logistics and dispatches',
  },
  {
    role: ROLES.EXAM_COORDINATOR,
    name: 'Ananya Verma',
    title: 'Exam Coordinator',
    organization: 'North Zone Examination Cell',
    description: 'Candidate enrollments, multi-stage qualifications, and attendance roster',
  },
  {
    role: ROLES.FINANCE_MANAGER,
    name: 'CA Suresh Iyer',
    title: 'Finance & Accounts Manager',
    organization: 'National Finance & Audit Board',
    description: 'Manage 80G tax exemptions, donations ledger, fee receipts and reconciliation',
  },
  {
    role: ROLES.CONTENT_MANAGER,
    name: 'Dr. Radharani Devi',
    title: 'Content & Publications Manager',
    organization: 'Global Gita Curriculum Forum',
    description: 'Curate Gita literature, Bhagavad Gita translations, syllabus & study guides',
  },
  {
    role: ROLES.STUDENT,
    name: 'Arjun Sharma',
    title: 'Registered Candidate (Stage 1)',
    organization: 'Delhi Public School / Student',
    description: 'Student portal, practice tests, live timer exam, admit card & credentials',
  },
  {
    role: ROLES.DONOR,
    name: 'Pooja Agarwal',
    title: 'Vidya Daan Patron & Sponsor',
    organization: 'Sponsor & Philanthropist',
    description: 'Browse campaigns, sponsor students or books, download 80G tax receipts',
  },
];

export default function RoleSwitcherModal({ isOpen, onClose }) {
  const { currentRole, switchRole } = useAuth();
  const navigate = useNavigate();

  const handleSelectRole = (roleKey) => {
    switchRole(roleKey);
    onClose();

    // Navigate to appropriate landing page
    if (roleKey === ROLES.STUDENT) {
      navigate('/student/dashboard');
    } else if (roleKey === ROLES.DONOR) {
      navigate('/donor/dashboard');
    } else {
      navigate('/admin');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Simulated Role Switcher (All 9 Profiles)" maxWidth="max-w-4xl">
      <div className="space-y-4">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-xs text-amber-900 flex items-start gap-2.5">
          <Sparkles size={16} className="text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong>Interactive Role Simulation:</strong> Choose any of the 9 official roles below. The platform will dynamically adapt its navigation, authorization, analytics, and operational permissions to that profile immediately.
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {ALL_ROLES.map((usr) => {
            const isSelected = currentRole === usr.role;
            const colorMeta = ROLE_COLORS[usr.role] || { bg: 'bg-slate-50 text-slate-700 border-slate-200', badge: 'bg-slate-700' };

            return (
              <div
                key={usr.role}
                onClick={() => handleSelectRole(usr.role)}
                className={`cursor-pointer rounded-xl border p-3.5 transition-all flex flex-col justify-between text-left hover:scale-[1.01] ${
                  isSelected
                    ? 'border-vedic-primary ring-2 ring-vedic-primary/20 bg-emerald-50/50 shadow-sm'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${colorMeta.bg}`}>
                      {ROLE_LABELS[usr.role]}
                    </span>
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-vedic-primary text-white flex items-center justify-center shrink-0">
                        <Check size={12} />
                      </span>
                    )}
                  </div>

                  <h4 className="font-bold text-slate-900 text-sm">{usr.name}</h4>
                  <p className="text-[11px] text-slate-600 font-medium">{usr.title}</p>
                  <p className="text-[10px] text-slate-400 mt-1 line-clamp-1">{usr.organization}</p>
                  <p className="text-[11px] text-slate-500 mt-2 bg-slate-50 rounded-lg p-2 border border-slate-100">
                    {usr.description}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
                  <span className="text-[10px] text-slate-400">
                    {usr.role === ROLES.STUDENT ? 'Student Portal' : usr.role === ROLES.DONOR ? 'Donor Portal' : 'Admin Panel'}
                  </span>
                  <span className={`flex items-center gap-1 text-[11px] ${isSelected ? 'text-vedic-primary font-bold' : 'text-slate-600'}`}>
                    {isSelected ? 'Active Profile' : 'Switch to Profile'} <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
}
