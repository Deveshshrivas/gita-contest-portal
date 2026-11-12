import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Award, BookOpen, Calendar, CheckCircle, Clock, PlayCircle, Printer, User, QrCode, Shield, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useExam } from '../../context/ExamContext';
import CertificateModal from '../../components/common/CertificateModal';

export default function StudentDashboard() {
  const { user } = useAuth();
  const { exams, results } = useExam();
  const [selectedResult, setSelectedResult] = useState(null);

  // Filter results for this candidate
  const myResults = results.filter(
    (r) => (user?.rollNo && r.rollNo === user.rollNo) || (user?.name && r.candidateName === user.name)
  );

  const mainContest = exams[0];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Welcome Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-vedic-primary bg-vedic-light px-2.5 py-0.5 rounded">
            Student Portal
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Welcome, {user?.name || 'Candidate'}!
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Roll Number: <strong className="font-mono text-slate-700">{user?.rollNo || 'GLC-2026-8842'}</strong> • {user?.school || 'Delhi Public School'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/student/lobby/gita-practice-mock"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-xs transition"
          >
            <PlayCircle size={15} />
            <span>Take Practice Exam</span>
          </Link>
        </div>
      </div>

      {/* Grid: Official Admit Card & Live Contest Gate */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Official Admit Card Card (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-3xl border-2 border-vedic-primary/30 p-6 sm:p-8 shadow-card relative overflow-hidden">
          <div className="absolute top-0 right-0 w-36 h-36 bg-amber-100/40 rounded-full blur-2xl pointer-events-none"></div>

          <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-shloka">🕉️</span>
              <div>
                <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider">Official Hall Ticket / Admit Card</h3>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest">Gita Leadership Contest 2026</span>
              </div>
            </div>

            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
              <CheckCircle size={12} />
              <span>Verified Candidate</span>
            </span>
          </div>

          {/* Details Table */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 text-xs text-slate-600 mb-6">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-medium">Candidate Name</span>
              <strong className="text-sm font-bold text-slate-900">{user?.name || 'Arjun Sharma'}</strong>
            </div>

            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-medium">Student Roll No</span>
              <strong className="text-sm font-mono font-bold text-vedic-primary">{user?.rollNo || 'GLC-2026-8842'}</strong>
            </div>

            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-medium">Participation Category</span>
              <strong className="text-sm font-bold text-slate-900">{user?.category || 'Senior (Class 10th)'}</strong>
            </div>

            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-medium">Exam Date & Time</span>
              <strong className="text-slate-900 font-bold">06 Dec 2026, 10:00 AM IST</strong>
            </div>

            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-medium">Center Mode</span>
              <strong className="text-slate-900 font-bold">Online Portal (45 Mins)</strong>
            </div>

            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-medium">Location</span>
              <strong className="text-slate-900 font-bold">{user?.city || 'New Delhi, India'}</strong>
            </div>
          </div>

          {/* Instructions note */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs text-slate-600 space-y-1 mb-6">
            <span className="font-bold text-slate-800 block">Exam Day Instructions:</span>
            <p>1. Please join the examination room 15 minutes prior to start time.</p>
            <p>2. Keep a stable internet connection. In case of disruption, your progress is automatically saved.</p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to={`/student/lobby/${mainContest.id}`}
              className="px-5 py-2.5 rounded-xl font-bold text-xs bg-vedic-primary hover:bg-vedic-dark text-white shadow-xs transition inline-flex items-center gap-1.5"
            >
              <span>Enter National Exam Lobby</span>
              <ArrowRight size={14} />
            </Link>

            <button
              onClick={() => window.print()}
              className="px-4 py-2.5 rounded-xl font-semibold text-xs border border-slate-300 text-slate-700 hover:bg-slate-50 transition inline-flex items-center gap-1.5"
            >
              <Printer size={14} />
              <span>Print Admit Card</span>
            </button>
          </div>
        </div>

        {/* Quick Practice Card (1 col) */}
        <div className="bg-gradient-to-b from-amber-50 to-white rounded-3xl border border-amber-200 p-6 sm:p-7 shadow-card flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-400/20 text-amber-700 flex items-center justify-center font-bold text-xl">
              🎯
            </div>
            <div>
              <span className="text-[10px] font-bold text-amber-800 uppercase tracking-widest bg-amber-100 px-2 py-0.5 rounded">
                Unlimited Attempts
              </span>
              <h3 className="font-extrabold text-lg text-slate-900 mt-2">
                Instant Mock Test
              </h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Take a 20-minute practice simulation with real Gita shlokas and get instant performance insights.
              </p>
            </div>
          </div>

          <div className="pt-6">
            <Link
              to="/student/lobby/gita-practice-mock"
              className="w-full py-3 rounded-xl font-bold text-xs bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center justify-center gap-2 shadow-xs transition"
            >
              <PlayCircle size={16} />
              <span>Start Mock Test Now</span>
            </Link>
          </div>
        </div>

      </div>

      {/* ── My Completed Contests & Certificates ── */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-card space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-lg text-slate-900">My Certificates & Completed Contests</h3>
            <p className="text-xs text-slate-500">Official digital records and verified certificates</p>
          </div>
        </div>

        {myResults.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {myResults.map((result) => (
              <div key={result.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {result.meritTier || 'Pass with Distinction'}
                  </span>
                  <h4 className="font-bold text-base text-slate-900">{result.examName}</h4>
                  <div className="text-xs text-slate-500 flex items-center gap-3">
                    <span>Score: <strong className="text-vedic-primary font-bold">{result.score}/{result.totalMarks}</strong> ({result.percentage}%)</span>
                    <span>•</span>
                    <span>Date: {new Date(result.submittedAt).toLocaleDateString('en-IN')}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => setSelectedResult(result)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-vedic-primary hover:bg-vedic-dark text-white shadow-xs transition"
                  >
                    <Award size={15} />
                    <span>View Certificate</span>
                  </button>

                  <Link
                    to={`/student/results/${result.id}`}
                    className="px-3.5 py-2 rounded-xl text-xs font-semibold border border-slate-300 text-slate-700 hover:bg-slate-50 transition"
                  >
                    Review Scorecard
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center space-y-3 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            <Award size={36} className="text-slate-300 mx-auto" />
            <h4 className="font-bold text-sm text-slate-700">No Exams Taken Yet</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Once you finish a practice exam or the live contest, your scorecard and verified certificate will appear here!
            </p>
            <Link
              to="/student/lobby/gita-practice-mock"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-vedic-primary hover:underline"
            >
              <span>Take a 20-min practice exam now →</span>
            </Link>
          </div>
        )}
      </div>

      {/* Certificate Modal */}
      {selectedResult && (
        <CertificateModal
          result={selectedResult}
          onClose={() => setSelectedResult(null)}
        />
      )}

    </div>
  );
}
