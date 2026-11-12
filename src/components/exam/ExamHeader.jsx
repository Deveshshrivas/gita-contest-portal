import React from 'react';
import { Clock, AlertTriangle, CheckSquare, Shield, HelpCircle } from 'lucide-react';

export default function ExamHeader({
  examName,
  candidateName,
  rollNo,
  secondsLeft,
  totalSeconds,
  onSubmitClick,
}) {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const isLowTime = secondsLeft <= 300; // under 5 mins
  const progressPercent = totalSeconds > 0 ? ((totalSeconds - secondsLeft) / totalSeconds) * 100 : 0;

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          
          {/* Left: Exam Info & Candidate */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-vedic-primary flex items-center justify-center text-white font-bold text-lg shrink-0">
              🕉️
            </div>
            <div className="min-w-0">
              <h1 className="text-base sm:text-lg font-bold text-slate-900 truncate">
                {examName}
              </h1>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="font-semibold text-slate-700">{candidateName}</span>
                <span>•</span>
                <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">Roll: {rollNo}</span>
              </div>
            </div>
          </div>

          {/* Center / Right: Live Countdown Timer */}
          <div className="flex items-center gap-4 shrink-0">
            <div
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-sm font-mono font-bold transition-colors ${
                isLowTime
                  ? 'bg-rose-50 border-rose-300 text-rose-700 animate-pulse'
                  : 'bg-emerald-50 border-emerald-200 text-emerald-800'
              }`}
              title="Time remaining"
            >
              <Clock size={16} className={isLowTime ? 'text-rose-600' : 'text-emerald-600'} />
              <span>{formatTime(secondsLeft)}</span>
              <span className="text-[10px] font-sans font-medium text-slate-500 uppercase">Left</span>
            </div>

            {/* Submit Button */}
            <button
              onClick={onSubmitClick}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-vedic-primary hover:bg-vedic-dark text-white shadow-sm hover:shadow transition"
            >
              <CheckSquare size={16} />
              <span>Finish Exam</span>
            </button>
          </div>

        </div>
      </div>

      {/* Thin time elapsed progress bar */}
      <div className="w-full bg-slate-100 h-1">
        <div
          className={`h-full transition-all duration-1000 ${
            isLowTime ? 'bg-rose-500' : 'bg-emerald-500'
          }`}
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </header>
  );
}
