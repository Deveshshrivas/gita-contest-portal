import React from 'react';
import { Bookmark, CheckCircle2, HelpCircle } from 'lucide-react';

export default function QuestionPalette({
  questions = [],
  answers = {},
  reviewMarks = {},
  currentIndex = 0,
  onSelectQuestion,
}) {
  const answeredCount = Object.keys(answers).length;
  const reviewCount = Object.values(reviewMarks).filter(Boolean).length;
  const totalCount = questions.length;
  const unattemptedCount = Math.max(0, totalCount - answeredCount);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
      {/* Header & Stats summary */}
      <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 pb-3 border-b border-slate-100 flex items-center justify-between">
        <span>Question Palette</span>
        <span className="text-xs text-slate-500 font-normal">
          {answeredCount}/{totalCount} Attempted
        </span>
      </h3>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-2 text-xs mb-5 p-3 bg-slate-50 rounded-xl">
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded bg-emerald-600"></span>
          <span className="text-slate-700">Answered ({answeredCount})</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded bg-slate-200 border border-slate-300"></span>
          <span className="text-slate-700">Not Answered ({unattemptedCount})</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded bg-purple-600"></span>
          <span className="text-slate-700">Marked for Review ({reviewCount})</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded ring-2 ring-vedic-primary ring-offset-1 bg-white"></span>
          <span className="text-slate-700">Current Question</span>
        </div>
      </div>

      {/* Questions Grid */}
      <div className="grid grid-cols-4 sm:grid-cols-5 gap-2.5 max-h-[340px] overflow-y-auto pr-1">
        {questions.map((q, idx) => {
          const isAnswered = Boolean(answers[q.id]);
          const isReview = Boolean(reviewMarks[q.id]);
          const isCurrent = idx === currentIndex;

          let btnClass = "bg-white border-slate-200 text-slate-700 hover:border-slate-400";
          if (isReview && isAnswered) {
            btnClass = "bg-purple-600 text-white border-purple-700 shadow-xs";
          } else if (isReview) {
            btnClass = "bg-purple-100 text-purple-800 border-purple-300 font-bold";
          } else if (isAnswered) {
            btnClass = "bg-emerald-600 text-white border-emerald-700 font-bold shadow-xs";
          }

          if (isCurrent) {
            btnClass += " ring-2 ring-vedic-primary ring-offset-2";
          }

          return (
            <button
              key={q.id}
              onClick={() => onSelectQuestion(idx)}
              className={`relative h-10 rounded-xl border text-sm font-semibold flex items-center justify-center transition-all ${btnClass}`}
              title={`Question ${idx + 1}: ${isAnswered ? 'Answered' : 'Not answered'}`}
            >
              <span>{idx + 1}</span>
              {isReview && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full ring-1 ring-white" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
