import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Award,
  Calendar,
  CheckCircle,
  Shield,
  User,
  Menu,
  X,
  PlayCircle,
  Sparkles,
  Heart,
  Search,
  BookMarked,
  PhoneCall,
  LogIn,
  LogOut,
  ChevronDown,
  ArrowRight,
  FileText,
  HelpCircle,
  Clock,
  Layers,
  GraduationCap,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ROLE_LABELS, ROLES, ROLE_COLORS } from '../../constants/roles';
import SearchModal from './SearchModal';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); // 'exams' | 'study' | 'seva' | 'about' | 'user'
  const [isScrolled, setIsScrolled] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(() => {
    try {
      return sessionStorage.getItem('gita_banner_dismissed') === 'true';
    } catch {
      return false;
    }
  });
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { user, currentRole, isAdminMode, logout } = useAuth();
  const navRef = useRef(null);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  // Handle scroll detection for glassmorphic navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard shortcut Ctrl+K / Cmd+K for search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchModalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleDismissBanner = () => {
    setBannerDismissed(true);
    try {
      sessionStorage.setItem('gita_banner_dismissed', 'true');
    } catch {}
  };

  const handleLogout = () => {
    logout();
    setOpenDropdown(null);
    navigate('/');
  };

  const isCurrentActive = (path) => location.pathname === path;

  const roleMeta = ROLE_COLORS[currentRole] || {
    bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    badge: 'bg-emerald-600',
  };

  return (
    <>
      <header
        ref={navRef}
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200/90 shadow-sm py-1.5'
            : 'bg-white/90 backdrop-blur-md border-b border-slate-200/60 py-2.5'
        }`}
      >
        {/* ── Top Sleek Announcement Bar ── */}
        {!bannerDismissed && (
          <div className="bg-gradient-to-r from-amber-700 via-amber-600 to-vedic-primary text-white text-[11px] font-medium tracking-wide py-1 px-3 sm:px-4 -mt-1.5 mb-1.5 sm:-mt-2.5 sm:mb-2 transition-all">
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-3">
              <div className="flex items-center gap-1.5 sm:gap-2 overflow-hidden text-ellipsis whitespace-nowrap min-w-0">
                <span className="hidden sm:inline-flex bg-white/20 text-white font-extrabold text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider backdrop-blur-xs shrink-0 items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-ping" />
                  National 2026
                </span>
                <span className="truncate text-[10px] sm:text-[11px]">
                  🕉️ <strong>मध्य प्रदेश शासन एवं ISKCON Ujjain द्वारा आयोजित</strong> • Gita Contest 2026 • 1st Prize ₹1,00,001
                </span>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                <Link
                  to="/student/lobby/gita-practice-mock"
                  className="hidden md:inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-amber-400 hover:bg-amber-300 text-slate-950 px-2.5 py-0.5 rounded-md shadow-xs transition"
                >
                  <PlayCircle size={12} />
                  <span>Free Mock Test →</span>
                </Link>
                <button
                  onClick={handleDismissBanner}
                  className="p-1 hover:bg-white/20 rounded text-amber-100 hover:text-white transition cursor-pointer"
                  aria-label="Dismiss banner"
                >
                  <X size={13} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── Main Navigation Bar ── */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            {/* ── Brand Logo ── */}
            <Link to="/" className="flex items-center gap-2 sm:gap-3 group shrink-0 py-1">
              <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-vedic-dark via-vedic-primary to-vedic-teal flex items-center justify-center text-white shadow-md shadow-vedic-primary/25 group-hover:scale-105 transition-transform duration-200 border border-emerald-400/30 shrink-0">
                <span className="text-lg sm:text-2xl font-bold font-shloka leading-none">ॐ</span>
                <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-amber-400 border-2 border-white flex items-center justify-center">
                  <span className="w-1 h-1 rounded-full bg-amber-900" />
                </span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-sm sm:text-lg text-slate-900 tracking-tight leading-none group-hover:text-vedic-primary transition-colors">
                    GITA CONTEST
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-extrabold bg-amber-100 text-amber-900 border border-amber-300/80 px-1.5 py-0.2 rounded-md">
                    2026
                  </span>
                </div>
                <p className="text-[9px] sm:text-[10px] text-slate-500 font-semibold tracking-wider uppercase mt-0.5">
                  National Leadership Olympiad
                </p>
              </div>
            </Link>

            {/* ── Desktop Navigation Links ── */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {/* Home */}
              <Link
                to="/"
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  isCurrentActive('/')
                    ? 'text-vedic-primary bg-vedic-light'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                Home
              </Link>

              {/* ── 1. Exams Dropdown ── */}
              <div className="relative">
                <button
                  onClick={() => setOpenDropdown(openDropdown === 'exams' ? null : 'exams')}
                  className={`flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                    openDropdown === 'exams' ||
                    location.pathname.startsWith('/contest') ||
                    location.pathname === '/exams' ||
                    location.pathname === '/leaderboard'
                      ? 'text-vedic-primary bg-vedic-light'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  <span>Exams & Contests</span>
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${
                      openDropdown === 'exams' ? 'rotate-180 text-vedic-primary' : 'text-slate-400'
                    }`}
                  />
                </button>

                {openDropdown === 'exams' && (
                  <div className="absolute left-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200/90 p-2.5 space-y-1 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                    <Link
                      to="/contest/glc-2026"
                      onClick={() => setOpenDropdown(null)}
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition group"
                    >
                      <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        <Award size={18} />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <strong className="text-xs font-bold text-slate-900 group-hover:text-vedic-primary transition-colors">
                            GLC 2026 Olympiad
                          </strong>
                          <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-100 text-amber-800">
                            Grand Finale
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          Organized by MP Govt & ISKCON Ujjain with ₹1,00,001 prize & gold medal.
                        </p>
                      </div>
                    </Link>

                    <Link
                      to="/student/lobby/gita-practice-mock"
                      onClick={() => setOpenDropdown(null)}
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition group"
                    >
                      <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        <PlayCircle size={18} />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <strong className="text-xs font-bold text-slate-900 group-hover:text-vedic-primary transition-colors">
                            Instant Practice Mock
                          </strong>
                          <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">
                            Free
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          Take a 45-min live simulation with instant score & digital certificate.
                        </p>
                      </div>
                    </Link>

                    <Link
                      to="/exams"
                      onClick={() => setOpenDropdown(null)}
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition group"
                    >
                      <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        <Calendar size={18} />
                      </div>
                      <div>
                        <strong className="text-xs font-bold text-slate-900 group-hover:text-vedic-primary transition-colors">
                          All Contests & Schedule
                        </strong>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          School, College & Youth, and Open Category examination dates.
                        </p>
                      </div>
                    </Link>

                    <Link
                      to="/leaderboard"
                      onClick={() => setOpenDropdown(null)}
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition group"
                    >
                      <div className="w-9 h-9 rounded-xl bg-purple-50 border border-purple-200 text-purple-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        <Sparkles size={18} />
                      </div>
                      <div>
                        <strong className="text-xs font-bold text-slate-900 group-hover:text-vedic-primary transition-colors">
                          National Leaderboard
                        </strong>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          Top national rankers, scores, and state distinctions.
                        </p>
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              {/* ── 2. Study & Literature Dropdown ── */}
              <div className="relative">
                <button
                  onClick={() => setOpenDropdown(openDropdown === 'study' ? null : 'study')}
                  className={`flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                    openDropdown === 'study' ||
                    location.pathname === '/books' ||
                    location.pathname === '/study-material'
                      ? 'text-vedic-primary bg-vedic-light'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  <span>Study & Books</span>
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${
                      openDropdown === 'study' ? 'rotate-180 text-vedic-primary' : 'text-slate-400'
                    }`}
                  />
                </button>

                {openDropdown === 'study' && (
                  <div className="absolute left-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200/90 p-2.5 space-y-1 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                    <Link
                      to="/study-material"
                      onClick={() => setOpenDropdown(null)}
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition group"
                    >
                      <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        <FileText size={18} />
                      </div>
                      <div>
                        <strong className="text-xs font-bold text-slate-900 group-hover:text-vedic-primary transition-colors">
                          Syllabus & Chapter Notes
                        </strong>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          Breakdown of all 18 Chapters with authentic Sanskrit verses.
                        </p>
                      </div>
                    </Link>

                    <Link
                      to="/books"
                      onClick={() => setOpenDropdown(null)}
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition group"
                    >
                      <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        <BookOpen size={18} />
                      </div>
                      <div>
                        <strong className="text-xs font-bold text-slate-900 group-hover:text-vedic-primary transition-colors">
                          Bhagavad Gita Books
                        </strong>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          Sacred translations in English, Hindi, and regional languages.
                        </p>
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              {/* ── 3. Seva & Impact Dropdown ── */}
              <div className="relative">
                <button
                  onClick={() => setOpenDropdown(openDropdown === 'seva' ? null : 'seva')}
                  className={`flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                    openDropdown === 'seva' || location.pathname === '/donations'
                      ? 'text-vedic-primary bg-vedic-light'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  <span>Vidya Daan (Seva)</span>
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${
                      openDropdown === 'seva' ? 'rotate-180 text-vedic-primary' : 'text-slate-400'
                    }`}
                  />
                </button>

                {openDropdown === 'seva' && (
                  <div className="absolute left-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200/90 p-2.5 space-y-1 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                    <Link
                      to="/donations"
                      onClick={() => setOpenDropdown(null)}
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition group"
                    >
                      <div className="w-9 h-9 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        <Heart size={18} />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <strong className="text-xs font-bold text-slate-900 group-hover:text-vedic-primary transition-colors">
                            Sponsor Students & Books
                          </strong>
                          <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-rose-100 text-rose-800">
                            80G Tax Free
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          Enable rural youth with free Gita copies & examination kits.
                        </p>
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              {/* ── 4. Verify Merit Link ── */}
              <Link
                to="/verify"
                className={`flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  isCurrentActive('/verify')
                    ? 'text-vedic-primary bg-vedic-light'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                <Shield size={14} className="text-emerald-600" />
                <span>Verify Merit</span>
              </Link>

              {/* ── 5. About Dropdown ── */}
              <div className="relative">
                <button
                  onClick={() => setOpenDropdown(openDropdown === 'about' ? null : 'about')}
                  className={`flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                    openDropdown === 'about' ||
                    location.pathname === '/about' ||
                    location.pathname === '/contact'
                      ? 'text-vedic-primary bg-vedic-light'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  <span>About</span>
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${
                      openDropdown === 'about' ? 'rotate-180 text-vedic-primary' : 'text-slate-400'
                    }`}
                  />
                </button>

                {openDropdown === 'about' && (
                  <div className="absolute left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200/90 p-2.5 space-y-1 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                    <Link
                      to="/about"
                      onClick={() => setOpenDropdown(null)}
                      className="block p-2.5 rounded-xl hover:bg-slate-50 transition"
                    >
                      <strong className="text-xs font-bold text-slate-900 block">About the Olympiad</strong>
                      <span className="text-[11px] text-slate-500">ISKCON Youth Forum & mission</span>
                    </Link>
                    <Link
                      to="/contact"
                      onClick={() => setOpenDropdown(null)}
                      className="block p-2.5 rounded-xl hover:bg-slate-50 transition"
                    >
                      <strong className="text-xs font-bold text-slate-900 block">Helpdesk & Support</strong>
                      <span className="text-[11px] text-slate-500">Contact regional examination cells</span>
                    </Link>
                  </div>
                )}
              </div>
            </nav>

            {/* ── Right-Side Quick Actions ── */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* Search Trigger Button */}
              <button
                onClick={() => setSearchModalOpen(true)}
                className="flex items-center gap-2 px-2.5 sm:px-3 py-2 rounded-xl bg-slate-100/80 hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition text-xs font-medium border border-slate-200/60"
                title="Search contests, shlokas, books (Ctrl+K)"
              >
                <Search size={15} />
                <span className="hidden md:inline text-[11px]">Search...</span>
                <kbd className="hidden md:inline-block bg-white text-[9px] font-mono font-bold text-slate-400 px-1.5 py-0.5 rounded border border-slate-200">
                  ⌘K
                </kbd>
              </button>

              {/* User Profile or Sign-In & Register CTA */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setOpenDropdown(openDropdown === 'user' ? null : 'user')}
                    className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full border border-slate-200 bg-white hover:border-slate-300 shadow-2xs transition"
                  >
                    <div className="w-7 h-7 rounded-full bg-vedic-primary text-white flex items-center justify-center font-bold text-xs shadow-2xs">
                      {(user.name || 'U').charAt(0).toUpperCase()}
                    </div>
                    <div className="text-left hidden sm:block">
                      <span className="text-xs font-bold text-slate-900 block leading-tight max-w-[100px] truncate">
                        {user.name.split(' ')[0]}
                      </span>
                      <span className="text-[9px] text-slate-400 font-semibold block uppercase">
                        {ROLE_LABELS[currentRole]?.split(' ')[0] || 'User'}
                      </span>
                    </div>
                    <ChevronDown size={13} className="text-slate-400" />
                  </button>

                  {/* User Profile Dropdown Menu */}
                  {openDropdown === 'user' && (
                    <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200/90 p-3 space-y-2 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                        <span className="font-bold text-slate-900 text-xs block truncate">
                          {user.name}
                        </span>
                        <span className="text-[11px] text-slate-400 font-mono block truncate">
                          {user.email}
                        </span>
                        <span
                          className={`inline-block mt-2 px-2 py-0.5 rounded-full text-[10px] font-bold border ${roleMeta.bg}`}
                        >
                          {ROLE_LABELS[currentRole]}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <Link
                          to="/student/dashboard"
                          onClick={() => setOpenDropdown(null)}
                          className="flex items-center gap-2.5 p-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition"
                        >
                          <User size={15} className="text-vedic-primary" />
                          <span>Student Dashboard & Admit Card</span>
                        </Link>

                        <Link
                          to="/student/lobby/gita-practice-mock"
                          onClick={() => setOpenDropdown(null)}
                          className="flex items-center gap-2.5 p-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition"
                        >
                          <PlayCircle size={15} className="text-amber-500" />
                          <span>Practice Mock Exam</span>
                        </Link>

                        {/* Admin Link if authorized or admin mode */}
                        {isAdminMode && (
                          <Link
                            to="/admin"
                            onClick={() => setOpenDropdown(null)}
                            className="flex items-center gap-2.5 p-2 rounded-xl text-xs font-bold text-purple-700 bg-purple-50/80 hover:bg-purple-100 transition"
                          >
                            <Shield size={15} className="text-purple-600" />
                            <span>Administration Operations Portal</span>
                          </Link>
                        )}
                      </div>

                      <div className="pt-2 border-t border-slate-100">
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-2 w-full p-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition"
                        >
                          <LogOut size={14} />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Link
                    to="/login"
                    className="hidden md:inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition cursor-pointer"
                  >
                    <LogIn size={14} />
                    <span>Sign In</span>
                  </Link>

                  <Link
                    to="/register"
                    className="hidden sm:inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-extrabold bg-gradient-to-r from-vedic-primary via-vedic-teal to-vedic-accent text-white shadow-md shadow-vedic-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                  >
                    <span>Register Free</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              )}

              {/* Mobile Hamburger Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition lg:hidden"
                aria-label="Open Navigation Drawer"
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* ── Mobile Slide-Out Drawer (Elevated UI/UX) ── */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Drawer Content */}
            <div className="relative ml-auto w-full max-w-xs sm:max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-200">
              {/* Drawer Header */}
              <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-vedic-primary text-white flex items-center justify-center font-bold text-sm">
                    ॐ
                  </div>
                  <div>
                    <strong className="text-xs font-extrabold text-slate-900 block leading-tight">
                      Gita Olympiad
                    </strong>
                    <span className="text-[10px] text-slate-400">Navigation Menu</span>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Drawer Links */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* Search in Drawer */}
                <div
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setSearchModalOpen(true);
                  }}
                  className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-100 text-slate-500 text-xs font-medium cursor-pointer"
                >
                  <Search size={16} />
                  <span>Search contests, syllabus, books...</span>
                </div>

                {/* Primary Actions */}
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to="/student/lobby/gita-practice-mock"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex flex-col items-center justify-center p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-center"
                  >
                    <PlayCircle size={20} className="text-amber-600 mb-1" />
                    <span className="text-xs font-bold">Practice Mock</span>
                    <span className="text-[10px] text-amber-700">Instant test</span>
                  </Link>

                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex flex-col items-center justify-center p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-center"
                  >
                    <Award size={20} className="text-emerald-600 mb-1" />
                    <span className="text-xs font-bold">Register Free</span>
                    <span className="text-[10px] text-emerald-700">GLC 2026</span>
                  </Link>
                </div>

                {!user && (
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 p-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
                  >
                    <LogIn size={15} />
                    <span>Already registered? Sign In</span>
                  </Link>
                )}

                {/* Categories */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block px-2 mb-1">
                    Explore & Learn
                  </span>
                  <Link
                    to="/"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-50"
                  >
                    Home
                  </Link>
                  <Link
                    to="/contest/glc-2026"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-50"
                  >
                    National Olympiad (GLC 2026)
                  </Link>
                  <Link
                    to="/exams"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-50"
                  >
                    All Contests & Schedule
                  </Link>
                  <Link
                    to="/study-material"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-50"
                  >
                    Syllabus & Chapter Notes
                  </Link>
                  <Link
                    to="/books"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-50"
                  >
                    Bhagavad Gita Books
                  </Link>
                  <Link
                    to="/donations"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-50"
                  >
                    Vidya Daan (Sponsor Students)
                  </Link>
                  <Link
                    to="/verify"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-50"
                  >
                    Verify Certificate (QR)
                  </Link>
                  <Link
                    to="/about"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-50"
                  >
                    About & Contact
                  </Link>
                </div>

                {/* Portal Links */}
                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block px-2">
                    Portals
                  </span>
                  <Link
                    to="/student/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-vedic-light text-vedic-dark text-xs font-bold"
                  >
                    <User size={15} className="text-vedic-primary" />
                    <span>Candidate Dashboard & Hall Ticket</span>
                  </Link>

                  <Link
                    to="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-purple-50 text-purple-800 border border-purple-200 text-xs font-bold"
                  >
                    <Shield size={15} className="text-purple-600" />
                    <span>Admin Operations Portal</span>
                  </Link>
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="p-4 border-t border-slate-100 bg-slate-50 text-[11px] text-slate-500 flex items-center justify-between">
                <span>Helpline: +91 98765 43210</span>
                <span className="font-semibold text-vedic-primary">GLC 2026</span>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ── Integrated Search / Command Palette ── */}
      <SearchModal isOpen={searchModalOpen} onClose={() => setSearchModalOpen(false)} />
    </>
  );
}
