import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ROLE_LABELS, ROLES } from '../../constants/roles';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, currentRole, isAdminMode } = useAuth();

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Contests & Exams', path: '/exams' },
    { label: 'Books Catalog', path: '/books' },
    { label: 'Syllabus & Notes', path: '/study-material' },
    { label: 'Sponsor & Donate', path: '/donations' },
    { label: 'Verify Merit', path: '/verify' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* ── Top Announcement Banner ── */}
      <div className="bg-gradient-to-r from-vedic-dark via-vedic-primary to-vedic-dark text-white py-1.5 px-4 text-xs font-medium tracking-wide">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="bg-amber-400 text-vedic-dark font-bold text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
              National Olympiad
            </span>
            <span>
              🕉️ <strong>National Gita Leadership Contest (GLC) 2026</strong> • Multi-Stage Grand Olympiad • Win ₹51,000 + Gold Trophy
            </span>
          </div>

          <div className="hidden md:flex items-center gap-4 text-slate-200 text-xs shrink-0">
            <span>ISKCON Global Youth Forum & Education Board</span>
            <span className="text-amber-400 font-semibold flex items-center gap-1">
              <Sparkles size={13} /> Over 28,000+ Candidates Enrolled
            </span>
          </div>
        </div>
      </div>

      {/* ── Main Navigation Bar ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-vedic-primary to-vedic-teal flex items-center justify-center text-white shadow-md shadow-vedic-primary/20 group-hover:scale-105 transition-transform">
              <span className="text-2xl font-bold font-shloka">🕉️</span>
            </div>
            <div>
              <div className="font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight leading-none group-hover:text-vedic-primary transition-colors flex items-center gap-1.5">
                <span>GitaContest</span>
                <span className="text-xs bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded border border-amber-200">
                  2026
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium tracking-wider uppercase mt-1">
                National Bhagavad Gita Olympiad
              </p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                  isActive(link.path)
                    ? 'text-vedic-primary bg-vedic-light'
                    : 'text-slate-600 hover:text-vedic-primary hover:bg-slate-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Quick Practice Mode */}
            <Link
              to="/student/lobby/gita-practice-mock"
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition"
              title="Practice with unlimited attempts & instant certificate"
            >
              <PlayCircle size={15} className="text-amber-500" />
              <span>Practice Mock</span>
            </Link>

            {/* Candidate Portal */}
            <Link
              to="/student/dashboard"
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg bg-vedic-light text-vedic-dark hover:bg-emerald-100 transition"
            >
              <User size={14} className="text-vedic-primary" />
              <span>Student Portal</span>
            </Link>

            {/* Admin Desk Link if role allows or quick demo login */}
            {isAdminMode ? (
              <Link
                to="/admin"
                className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-lg bg-purple-600 text-white shadow-xs hover:bg-purple-700 transition"
              >
                <Shield size={14} />
                <span>Admin Desk</span>
              </Link>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition"
              >
                <LogIn size={14} />
                <span>Sign In</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex xl:hidden items-center gap-2">
            <Link
              to="/student/dashboard"
              className="p-2 rounded-lg text-vedic-primary bg-vedic-light text-xs font-bold sm:hidden"
            >
              Portal
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-700 hover:bg-vedic-light hover:text-vedic-primary"
            >
              {link.label}
            </Link>
          ))}

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <Link
              to="/student/lobby/gita-practice-mock"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 text-sm font-semibold rounded-lg bg-amber-50 text-amber-900 border border-amber-200"
            >
              <PlayCircle size={16} className="text-amber-600" />
              <span>Take Free Practice Exam</span>
            </Link>

            <Link
              to="/student/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 text-sm font-semibold rounded-lg bg-vedic-primary text-white"
            >
              <User size={16} />
              <span>Student Dashboard & Admit Card</span>
            </Link>

            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 text-xs font-bold rounded-lg bg-purple-50 text-purple-700 border border-purple-200"
            >
              <Shield size={14} />
              <span>Admin & Controller Portal</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
