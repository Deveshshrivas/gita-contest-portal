import React from 'react';
import { AlertCircle, CheckCircle, Clock, CheckSquare, X } from 'lucide-react';

export default function SubmitConfirmModal({
  totalQuestions,
  answeredCount,
  reviewCount,
  secondsLeft,
  onConfirm,
  onCancel,
}) {
  const unattempted = Math.max(0, totalQuestions - answeredCount);

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins}m ${s}s`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-7 border border-slate-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <CheckSquare size={18} />
            </div>
            <h3 className="font-bold text-base text-slate-900">Confirm Exam Submission</h3>
          </div>
          <button
            onClick={onCancel}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Status Breakdown */}
        <div className="py-5 space-y-3">
          <p className="text-xs text-slate-500 mb-3">
            Please review your exam summary before final submission. Once submitted, you cannot change your answers.
          </p>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl">
              <span className="text-emerald-800 font-semibold block">Attempted</span>
              <strong className="text-xl font-extrabold text-emerald-950">{answeredCount}</strong>
              <span className="text-emerald-700 text-[11px] block">of {totalQuestions} Questions</span>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-slate-600 font-semibold block">Unattempted</span>
              <strong className="text-xl font-extrabold text-slate-900">{unattempted}</strong>
              <span className="text-slate-500 text-[11px] block">Questions Left</span>
            </div>

            <div className="p-3 bg-purple-50 border border-purple-100 rounded-xl">
              <span className="text-purple-800 font-semibold block">Under Review</span>
              <strong className="text-xl font-extrabold text-purple-950">{reviewCount}</strong>
              <span className="text-purple-700 text-[11px] block">Flagged Questions</span>
            </div>

            <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl">
              <span className="text-amber-800 font-semibold block">Time Remaining</span>
              <strong className="text-xl font-extrabold text-amber-950">{formatTime(secondsLeft)}</strong>
              <span className="text-amber-700 text-[11px] block">Available to verify</span>
            </div>
          </div>

          {unattempted > 0 && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-900 text-xs mt-3">
              <AlertCircle size={15} className="shrink-0 text-amber-600" />
              <span>You still have {unattempted} unattempted question(s). You can go back and answer them.</span>
            </div>
          )}
        </div>

        {/* Modal Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            onClick={onCancel}
            className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border border-slate-300 text-slate-700 hover:bg-slate-100 transition"
          >
            Return to Exam
          </button>

          <button
            onClick={onConfirm}
            className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-vedic-primary hover:bg-vedic-dark text-white shadow-sm transition"
          >
            Yes, Submit & View Score
          </button>
        </div>

      </div>
    </div>
  );
}
