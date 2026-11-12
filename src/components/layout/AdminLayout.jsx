import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Calendar,
  HelpCircle,
  Users,
  Award,
  BookOpen,
  Truck,
  HeartHandshake,
  CreditCard,
  UserCheck,
  BarChart3,
  Settings,
  BookMarked,
  FileText,
  ChevronRight,
  ExternalLink,
  Shield,
  ArrowLeft,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ADMIN_NAV_CONFIG } from '../../app/navigation';
import { ROLE_LABELS, ROLE_COLORS, ROLES } from '../../constants/roles';

// Map icon strings to Lucide components
const ICON_MAP = {
  LayoutDashboard,
  Calendar,
  HelpCircle,
  Users,
  Award,
  BookOpen,
  Truck,
  HeartHandshake,
  CreditCard,
  UserCheck,
  BarChart3,
  Settings,
  BookMarked,
  FileText,
};

export default function AdminLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentRole, user, logout } = useAuth();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = ADMIN_NAV_CONFIG[currentRole] || ADMIN_NAV_CONFIG[ROLES.SUPER_ADMIN] || [];
  const colorMeta = ROLE_COLORS[currentRole] || { bg: 'bg-purple-50 text-purple-700 border-purple-200', badge: 'bg-purple-600' };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
      {/* ── Admin Sidebar (Sticky on Desktop) ── */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-slate-300 flex flex-col shrink-0 border-r border-slate-800 transition-transform md:translate-x-0 md:sticky md:top-0 md:h-screen md:max-h-screen ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between shrink-0">
          <Link to="/" className="flex items-center gap-2.5">
            <div className={`w-9 h-9 rounded-xl ${colorMeta.badge} text-white flex items-center justify-center font-bold shadow-md`}>
              <Shield size={18} />
            </div>
            <div>
              <span className="font-extrabold text-sm text-white tracking-wide block">Gita Examination</span>
              <span className="text-[10px] text-amber-400 font-semibold uppercase tracking-wider">
                {ROLE_LABELS[currentRole] || 'Admin Console'}
              </span>
            </div>
          </Link>
          <button
            onClick={() => setMobileSidebarOpen(false)}
            className="md:hidden text-slate-400 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* Current User Card */}
        <div className="p-3.5 bg-slate-800/60 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center font-bold text-xs text-amber-300 shrink-0">
              {user?.name ? user.name.charAt(0) : 'U'}
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-bold text-white truncate">{user?.name}</div>
              <div className="text-[10px] text-slate-400 truncate">{user?.title}</div>
            </div>
          </div>
          <button
            onClick={() => setRoleModalOpen(true)}
            className="text-[10px] text-amber-400 hover:text-amber-300 underline font-semibold shrink-0"
            title="Switch demo role"
          >
            Switch
          </button>
        </div>

        {/* Nav Links */}
        <nav className="p-3 space-y-1 flex-1 overflow-y-auto min-h-0">
          <div className="px-3 py-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            {ROLE_LABELS[currentRole]} Menu
          </div>

          {menuItems.map((item) => {
            const Icon = ICON_MAP[item.icon] || LayoutDashboard;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.label}
                to={item.path}
                onClick={() => setMobileSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                  isActive
                    ? 'bg-vedic-primary text-white shadow-xs'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <Icon size={16} className={isActive ? 'text-amber-300' : 'text-slate-400'} />
                <span className="flex-1 truncate">{item.label}</span>
                {isActive && <ChevronRight size={14} className="text-slate-200" />}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Navigation & Sign Out */}
        <div className="p-3 border-t border-slate-800 space-y-2 shrink-0">
          <Link
            to="/"
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white transition"
          >
            <ArrowLeft size={14} />
            <span>Public Website</span>
          </Link>

          <button
            onClick={handleLogout}
            type="button"
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 transition cursor-pointer"
          >
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Backdrop for mobile */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/60 md:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* ── Admin Main Content ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="bg-white border-b border-slate-200 px-4 sm:px-6 py-3.5 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 md:hidden"
            >
              <Menu size={20} />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-slate-900">National Gita Examination Authority</h2>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${colorMeta.bg}`}>
                  {ROLE_LABELS[currentRole]}
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                ISKCON & National Gita Leadership Contest Board • {user?.organization}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 text-xs">
            <span className="hidden sm:inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-full font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Exam Server Online
            </span>

            <button
              onClick={handleLogout}
              type="button"
              className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-600 font-bold flex items-center gap-1.5 text-xs border border-slate-300 transition cursor-pointer"
            >
              <LogOut size={13} />
              <span>Sign Out</span>
            </button>

            <Link
              to="/"
              className="hidden lg:inline-flex items-center gap-1 text-slate-500 hover:text-slate-800 font-medium"
            >
              <span>Public Website</span>
              <ExternalLink size={13} />
            </Link>
          </div>
        </header>

        {/* Inner Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
