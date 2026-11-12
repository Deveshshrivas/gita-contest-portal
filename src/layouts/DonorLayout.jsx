import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Heart,
  HeartHandshake,
  FileCheck2,
  TrendingUp,
  Award,
  ArrowLeft,
  Shield,
  LogOut,
  Download,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function DonorLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinks = [
    { label: 'Donor Dashboard', path: '/donor/dashboard', icon: TrendingUp },
    { label: 'Active Campaigns', path: '/donations', icon: HeartHandshake },
    { label: 'My 80G Receipts', path: '/donor/history', icon: FileCheck2 },
    { label: 'Impact & Beneficiaries', path: '/donor/impact', icon: Award },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* ── Top Donor Header ── */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Link to="/" className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center font-bold shadow-md shadow-orange-500/20">
                  <Heart size={20} className="fill-white" />
                </div>
                <div>
                  <span className="font-extrabold text-base text-slate-900 tracking-tight block">
                    Gita Contest • Patron Portal
                  </span>
                  <span className="text-[10px] text-orange-600 font-bold uppercase tracking-wider">
                    Philanthropy & Book Sponsorship
                  </span>
                </div>
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-3 pr-3 border-r border-slate-200 text-xs">
                <div className="text-right">
                  <div className="font-bold text-slate-900">{user?.name || 'Patron Donor'}</div>
                  <div className="text-slate-500 text-[11px]">{user?.organization || 'Philanthropist'}</div>
                </div>
                <div className="w-9 h-9 rounded-full bg-orange-100 border border-orange-200 flex items-center justify-center text-orange-700 font-bold text-xs">
                  {user?.name ? user.name.charAt(0) : 'P'}
                </div>
              </div>

              <button
                onClick={handleLogout}
                type="button"
                className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 hover:text-rose-600 hover:bg-rose-50 border border-slate-300 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
              >
                <LogOut size={13} />
                <span>Sign Out</span>
              </button>

              <Link
                to="/"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-100 transition"
              >
                <ArrowLeft size={14} />
                <span>Public Site</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Navigation tabs */}
        <div className="bg-slate-50/80 border-t border-slate-200 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto py-2">
            {navLinks.map((tab) => {
              const Icon = tab.icon;
              const isActive = location.pathname === tab.path;
              return (
                <Link
                  key={tab.label}
                  to={tab.path}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition ${
                    isActive
                      ? 'bg-orange-500 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
                >
                  <Icon size={14} />
                  <span>{tab.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}
