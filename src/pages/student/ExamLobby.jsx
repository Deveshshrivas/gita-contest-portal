import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Clock, CheckCircle2, AlertTriangle, Monitor, Wifi, BookOpen, ArrowRight, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useExam } from '../../context/ExamContext';

export default function ExamLobby() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { exams, startExam } = useExam();

  const exam = exams.find((e) => e.id === id) || exams[0];

  const [honorPledged, setHonorPledged] = useState(false);
  const [deviceChecked, setDeviceChecked] = useState(true);

  const handleStartExam = () => {
    if (!honorPledged) return;
    startExam(exam.id, user);
    navigate('/student/exam');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      {/* Back link */}
      <Link to="/student/dashboard" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800">
        <ArrowLeft size={14} />
        <span>Return to Dashboard</span>
      </Link>

      {/* Header card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-card space-y-3 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-vedic-primary bg-vedic-light px-2.5 py-1 rounded">
              Examination Entrance Lobby
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              {exam.name}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Candidate: <strong className="text-slate-800">{user?.name || 'Arjun Sharma'}</strong> • Roll No: <strong className="font-mono text-vedic-primary">{user?.rollNo || 'GLC-2026-8842'}</strong>
            </p>
          </div>

          <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl text-center shrink-0">
            <span className="text-[10px] text-amber-800 font-bold uppercase block">Duration</span>
            <span className="text-xl font-extrabold text-amber-950">{exam.durationMinutes} Mins</span>
          </div>
        </div>
      </div>

      {/* Pre-Exam Checklist */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-card space-y-6">
        <h3 className="font-bold text-base text-slate-900 pb-3 border-b border-slate-100 flex items-center gap-2">
          <ShieldCheck size={18} className="text-vedic-primary" />
          <span>System Readiness & Integrity Check</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center gap-3">
            <Monitor size={20} className="text-emerald-600 shrink-0" />
            <div>
              <strong className="text-slate-900 block font-semibold">Display & Device</strong>
              <span className="text-emerald-700">Compatible Browser</span>
            </div>
          </div>

          <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center gap-3">
            <Wifi size={20} className="text-emerald-600 shrink-0" />
            <div>
              <strong className="text-slate-900 block font-semibold">Network State</strong>
              <span className="text-emerald-700">Auto-Save Enabled</span>
            </div>
          </div>

          <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center gap-3">
            <CheckCircle2 size={20} className="text-emerald-600 shrink-0" />
            <div>
              <strong className="text-slate-900 block font-semibold">Candidate Status</strong>
              <span className="text-emerald-700">Admit Card Verified</span>
            </div>
          </div>
        </div>

        {/* Rules summary */}
        <div className="space-y-2 text-xs text-slate-600 pt-2">
          <strong className="text-slate-900 block text-sm">Exam Instructions:</strong>
          <ul className="space-y-1.5 list-disc pl-5">
            <li>The test contains <strong>{exam.totalQuestions} Multiple Choice Questions</strong>.</li>
            <li>Each question has 4 options with only one correct response.</li>
            {exam.negativeMarking ? (
              <li className="text-amber-800 font-semibold">
                Negative marking of {exam.negativeMarkValue || 0.5} marks applies for incorrect answers.
              </li>
            ) : (
              <li className="text-emerald-700 font-semibold">No negative marking for this contest.</li>
            )}
            <li>You can navigate back and forth between questions using the Question Palette.</li>
            <li>Your answers are continuously saved in local storage.</li>
          </ul>
        </div>

        {/* Honor Code Pledge */}
        <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-3">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={honorPledged}
              onChange={(e) => setHonorPledged(e.target.checked)}
              className="mt-0.5 rounded text-vedic-primary focus:ring-vedic-primary w-4 h-4 cursor-pointer"
            />
            <span className="text-xs sm:text-sm text-amber-950 font-medium leading-relaxed">
              <strong>Vedic Honor Pledge:</strong> I solemnly pledge to take this examination with honesty, truthfulness (Satya), and devotion, without resorting to any unfair means, books, or external assistance.
            </span>
          </label>
        </div>

        {/* Start Button */}
        <div className="pt-2">
          <button
            onClick={handleStartExam}
            disabled={!honorPledged}
            className="w-full py-4 rounded-xl font-bold text-sm bg-vedic-primary hover:bg-vedic-dark text-white shadow-md disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
          >
            <span>Start Online Examination Now</span>
            <ArrowRight size={17} />
          </button>
          {!honorPledged && (
            <p className="text-[11px] text-slate-400 text-center mt-2">
              Please check the Vedic Honor Pledge above to activate the exam button.
            </p>
          )}
        </div>
      </div>

    </div>
  );
}
