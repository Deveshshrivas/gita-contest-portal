import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ROLE_LABELS, ROLE_COLORS } from '../../constants/roles';
import RoleSwitcherModal from './RoleSwitcherModal';
import { Shield, Sparkles } from 'lucide-react';

export default function FloatingRoleSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentRole, user } = useAuth();
  const location = useLocation();

  // Hide the floating pill in admin mode to avoid covering dashboard content/tables
  // The admin layout already has built-in role switchers in the top header and sidebar
  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  const colorMeta = ROLE_COLORS[currentRole] || { bg: 'bg-slate-50 text-slate-700', badge: 'bg-slate-700' };

  return (
    <>
      <div className="fixed bottom-4 right-4 z-40 print:hidden flex items-center gap-2">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2.5 bg-slate-900/95 hover:bg-slate-900 text-white pl-3.5 pr-4 py-2.5 rounded-full shadow-xl border border-slate-700/80 hover:scale-105 transition-all text-xs font-semibold backdrop-blur-md group"
          title="Click to switch simulated user roles (Super Admin, Admin, Controller, Manager, Student, Donor, etc.)"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping group-hover:scale-110" />
          <span className="text-[10px] uppercase tracking-wider font-bold text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-800/40">
            {ROLE_LABELS[currentRole] || 'Role'}
          </span>
          <span className="font-medium text-slate-200 hidden sm:inline truncate max-w-[140px]">
            {user?.name || 'User'}
          </span>
          <span className="text-slate-400 text-[10px] bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">
            Switch Role
          </span>
        </button>
      </div>

      <RoleSwitcherModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
