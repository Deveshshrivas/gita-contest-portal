import React from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Award,
  Calendar,
  HelpCircle,
  PlusCircle,
  TrendingUp,
  CheckCircle,
  Clock,
  ArrowRight,
  ShieldCheck,
  FileSpreadsheet,
} from 'lucide-react';
import { useExam } from '../../context/ExamContext';

export default function AdminDashboard() {
  const { exams, questions, candidates, results } = useExam();

  const totalCandidates = candidates.length;
  const totalExams = exams.length;
  const totalQuestions = questions.length;
  const totalCompleted = results.length;
  const passingRate = totalCompleted > 0
    ? Math.round((results.filter(r => r.resultStatus === 'pass').length / totalCompleted) * 100)
    : 100;

  return (
    <div className="space-y-8">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Examiner Overview & Live Analytics
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time management for the National Gita Leadership Contest & Olympiads.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/admin/questions"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-700 text-white shadow-xs transition"
          >
            <PlusCircle size={15} />
            <span>Add Question</span>
          </Link>

          <Link
            to="/admin/contests"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 transition"
          >
            <Calendar size={15} />
            <span>Manage Contests</span>
          </Link>
        </div>
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-500 font-semibold uppercase">Total Candidates</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Users size={16} />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900">{totalCandidates}</div>
          <span className="text-[11px] text-emerald-600 font-semibold">Active registrations across India</span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-500 font-semibold uppercase">Active Contests</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <Calendar size={16} />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900">{totalExams}</div>
          <span className="text-[11px] text-slate-500">Live examination tracks</span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-500 font-semibold uppercase">Questions Bank</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <HelpCircle size={16} />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900">{totalQuestions}</div>
          <span className="text-[11px] text-slate-500">Curated Gita MCQs</span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-500 font-semibold uppercase">Pass / Merit Rate</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <TrendingUp size={16} />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900">{passingRate}%</div>
          <span className="text-[11px] text-purple-700 font-semibold">{totalCompleted} submissions evaluated</span>
        </div>
      </div>

      {/* ── Recent Registrations & Live Contests ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Candidates Table Preview */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900">Recent Enrolled Candidates</h3>
            <Link to="/admin/candidates" className="text-xs font-semibold text-purple-600 hover:underline">
              View All ({candidates.length}) →
            </Link>
          </div>
          <div className="divide-y divide-slate-100 text-xs">
            {candidates.slice(0, 5).map((c) => (
              <div key={c.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition">
                <div>
                  <strong className="text-slate-900 block font-semibold">{c.name}</strong>
                  <span className="text-slate-500">{c.school} • {c.city}</span>
                </div>
                <div className="text-right">
                  <span className="font-mono text-purple-700 font-bold block">{c.rollNo}</span>
                  <span className="text-[10px] text-slate-400">{new Date(c.registeredAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Contests List */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900">Configured Contests & Dates</h3>
            <Link to="/admin/contests" className="text-xs font-semibold text-purple-600 hover:underline">
              Manage Contests →
            </Link>
          </div>
          <div className="divide-y divide-slate-100 text-xs">
            {exams.map((e) => (
              <div key={e.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition">
                <div>
                  <strong className="text-slate-900 block font-semibold">{e.name}</strong>
                  <span className="text-slate-500">{e.durationMinutes} mins • {e.totalQuestions} questions • Pass: {e.passingMarks}</span>
                </div>
                <div className="text-right">
                  <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[10px]">
                    {e.examLiveDate}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
