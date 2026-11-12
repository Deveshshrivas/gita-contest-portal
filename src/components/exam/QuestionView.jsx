import React from 'react';
import { Bookmark, ChevronLeft, ChevronRight, RotateCcw, Sparkles } from 'lucide-react';

export default function QuestionView({
  question,
  questionNumber,
  totalQuestions,
  selectedOption,
  isReviewMarked,
  onSelectOption,
  onClearResponse,
  onToggleReview,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}) {
  if (!question) return null;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col justify-between min-h-[560px]">
      <div>
        {/* Question Header & Meta */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-bold uppercase tracking-wider bg-vedic-light text-vedic-dark px-2.5 py-1 rounded-md">
              Question {questionNumber} of {totalQuestions}
            </span>
            {question.chapter && (
              <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                Chapter {question.chapter} • Verse {question.verse || 'N/A'}
              </span>
            )}
            <span className="text-xs font-medium px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
              {question.difficulty || 'Medium'}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold">
            <span className="text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
              +{question.marks || 2} Marks
            </span>
            {Number(question.negativeMarks) > 0 && (
              <span className="text-rose-700 bg-rose-50 px-2 py-1 rounded border border-rose-200">
                -{question.negativeMarks} Neg.
              </span>
            )}
          </div>
        </div>

        {/* Sacred Sanskrit Shloka Box (if available) */}
        {question.shlokaText && (
          <div className="mb-6 p-4 rounded-xl bg-amber-50/60 border border-amber-200/80 text-amber-950">
            <div className="text-[11px] font-bold text-amber-800 uppercase tracking-widest mb-1 flex items-center gap-1.5">
              <Sparkles size={13} /> Sacred Verse Reference ({question.verse})
            </div>
            <p className="font-shloka text-base sm:text-lg font-semibold leading-relaxed">
              {question.shlokaText}
            </p>
          </div>
        )}

        {/* Question Text in English & Hindi */}
        <div className="space-y-2 mb-8">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
            {question.question}
          </h2>
          {question.questionHindi && (
            <p className="font-shloka text-sm text-slate-600 leading-relaxed">
              {question.questionHindi}
            </p>
          )}
        </div>

        {/* Options List */}
        <div className="space-y-3 mb-8">
          {question.options.map((option) => {
            const isSelected = selectedOption === option.key;

            return (
              <label
                key={option.key}
                onClick={() => onSelectOption(option.key)}
                className={`flex items-start gap-3.5 p-4 rounded-xl border text-sm cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-vedic-light/70 border-vedic-primary ring-2 ring-vedic-primary/20 text-vedic-dark font-medium shadow-xs'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/80 text-slate-700'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                    isSelected
                      ? 'bg-vedic-primary text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 border border-slate-300'
                  }`}
                >
                  {option.key}
                </div>
                <div className="pt-0.5 leading-relaxed text-sm sm:text-base">
                  {option.text}
                </div>
              </label>
            );
          })}
        </div>
      </div>

      {/* Bottom Action Controls */}
      <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {/* Mark for Review */}
          <button
            onClick={onToggleReview}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition ${
              isReviewMarked
                ? 'bg-purple-600 border-purple-700 text-white'
                : 'bg-white border-slate-300 text-purple-700 hover:bg-purple-50'
            }`}
          >
            <Bookmark size={15} />
            <span>{isReviewMarked ? 'Marked for Review' : 'Mark for Review'}</span>
          </button>

          {/* Clear Response */}
          {selectedOption && (
            <button
              onClick={onClearResponse}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition"
              title="Clear selected option"
            >
              <RotateCcw size={14} />
              <span>Clear Answer</span>
            </button>
          )}
        </div>

        {/* Prev / Next buttons */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onPrev}
            disabled={!hasPrev}
            className="inline-flex items-center gap-1 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold border border-slate-300 text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            <ChevronLeft size={16} />
            <span>Previous</span>
          </button>

          <button
            onClick={onNext}
            disabled={!hasNext}
            className="inline-flex items-center gap-1 px-5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-vedic-primary hover:bg-vedic-dark text-white disabled:opacity-40 disabled:cursor-not-allowed shadow-xs transition"
          >
            <span>Next Question</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
