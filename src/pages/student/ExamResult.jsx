import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Award, CheckCircle, XCircle, AlertCircle, Clock, Printer, RotateCcw, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import { useExam } from '../../context/ExamContext';
import CertificateModal from '../../components/common/CertificateModal';

export default function ExamResult() {
  const { id } = useParams();
  const { results, questions } = useExam();
  const [showCertificate, setShowCertificate] = useState(false);

  const result = results.find((r) => r.id === id) || results[0];

  if (!result) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">No Exam Result Found</h2>
        <Link to="/student/dashboard" className="text-sm font-semibold text-vedic-primary hover:underline">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  const isPass = result.resultStatus === 'pass';
  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins}m ${s}s`;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* ── Result Summary Card ── */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-card text-center space-y-6">
        
        {/* Distinction badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold uppercase tracking-wider">
          <Award size={14} className="text-emerald-600" />
          <span>{result.meritTier || 'Pass with Distinction'}</span>
        </div>

        <div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
            {isPass ? 'Outstanding Performance!' : 'Exam Completed'}
          </h1>
          <p className="text-sm text-slate-600 mt-2">
            Candidate: <strong className="text-slate-900">{result.candidateName}</strong> • Roll No: <strong className="font-mono text-vedic-primary">{result.rollNo}</strong>
          </p>
        </div>

        {/* Big Scorecard Banner */}
        <div className="bg-gradient-to-r from-vedic-dark to-vedic-primary text-white rounded-2xl p-6 sm:p-8 max-w-xl mx-auto shadow-md">
          <span className="text-xs uppercase tracking-widest text-amber-300 font-bold block mb-1">
            Total Score Achieved
          </span>
          <div className="text-4xl sm:text-5xl font-extrabold font-mono text-white">
            {result.score} <span className="text-2xl text-slate-300 font-normal">/ {result.totalMarks}</span>
          </div>
          <div className="text-sm font-semibold text-amber-300 mt-2">
            Percentage: {result.percentage}% • {result.resultStatus === 'pass' ? 'PASSED (QUALIFIED)' : 'PARTICIPATED'}
          </div>
        </div>

        {/* Detailed Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-2">
          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
            <span className="text-emerald-700 block font-semibold">Correct Answers</span>
            <strong className="text-lg font-bold text-emerald-950">{result.correct}</strong>
          </div>
          <div className="p-3 bg-rose-50 rounded-xl border border-rose-100">
            <span className="text-rose-700 block font-semibold">Incorrect Answers</span>
            <strong className="text-lg font-bold text-rose-950">{result.incorrect}</strong>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-slate-600 block font-semibold">Unattempted</span>
            <strong className="text-lg font-bold text-slate-900">{result.unattempted}</strong>
          </div>
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-100">
            <span className="text-amber-800 block font-semibold">Time Spent</span>
            <strong className="text-lg font-bold text-amber-950">{formatTime(result.timeSpentSeconds || 600)}</strong>
          </div>
        </div>

        {/* Certificate CTA */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => setShowCertificate(true)}
            className="w-full sm:w-auto px-7 py-3 rounded-xl font-bold text-sm bg-vedic-primary hover:bg-vedic-dark text-white shadow-md flex items-center justify-center gap-2 transition"
          >
            <Award size={18} />
            <span>View & Download Certificate of Merit</span>
          </button>

          <Link
            to="/student/lobby/gita-practice-mock"
            className="w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-sm border border-slate-300 text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-2 transition"
          >
            <RotateCcw size={15} />
            <span>Retake Practice Test</span>
          </Link>
        </div>
      </div>

      {/* ── Question-by-Question Detailed Review ── */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-card space-y-6">
        <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Detailed Answer Review & Gita Verse Analysis</h3>
            <p className="text-xs text-slate-500">Explanations and Shloka citations for every question</p>
          </div>
          <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-md">
            {result.totalQuestions} Questions
          </span>
        </div>

        <div className="space-y-6">
          {(result.questions || questions.slice(0, result.totalQuestions)).map((q, idx) => {
            const userAns = result.answers?.[q.id];
            const isCorrect = userAns === q.correctAnswer;
            const isUnattempted = !userAns;

            return (
              <div
                key={q.id}
                className={`p-6 rounded-2xl border transition-all ${
                  isCorrect
                    ? 'bg-emerald-50/40 border-emerald-200'
                    : isUnattempted
                    ? 'bg-slate-50/60 border-slate-200'
                    : 'bg-rose-50/40 border-rose-200'
                }`}
              >
                <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-200/60 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">Question {idx + 1}</span>
                    {q.verse && (
                      <span className="bg-white px-2 py-0.5 rounded border text-slate-600 font-mono">
                        BG {q.verse}
                      </span>
                    )}
                  </div>

                  <div>
                    {isCorrect ? (
                      <span className="inline-flex items-center gap-1 font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded">
                        <CheckCircle size={13} /> Correct (+{q.marks || 2} marks)
                      </span>
                    ) : isUnattempted ? (
                      <span className="font-semibold text-slate-500 bg-slate-200 px-2.5 py-0.5 rounded">
                        Unattempted (0 marks)
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 font-bold text-rose-700 bg-rose-100 px-2.5 py-0.5 rounded">
                        <XCircle size={13} /> Incorrect (-{q.negativeMarks || 0.5} marks)
                      </span>
                    )}
                  </div>
                </div>

                {/* Shloka if available */}
                {q.shlokaText && (
                  <p className="font-shloka text-sm font-semibold text-amber-900 bg-amber-50/80 p-3 rounded-xl border border-amber-200/60 mb-3">
                    {q.shlokaText}
                  </p>
                )}

                {/* Question */}
                <h4 className="font-bold text-sm text-slate-900 mb-4">{q.question}</h4>

                {/* Options Review */}
                <div className="space-y-2 mb-4">
                  {q.options.map((opt) => {
                    const isUserChoice = userAns === opt.key;
                    const isRightChoice = q.correctAnswer === opt.key;

                    let optStyle = "bg-white border-slate-200 text-slate-700";
                    if (isRightChoice) {
                      optStyle = "bg-emerald-100/80 border-emerald-400 text-emerald-950 font-bold";
                    } else if (isUserChoice && !isRightChoice) {
                      optStyle = "bg-rose-100 border-rose-300 text-rose-950 line-through";
                    }

                    return (
                      <div
                        key={opt.key}
                        className={`p-3 rounded-xl border text-xs sm:text-sm flex items-center justify-between ${optStyle}`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="font-bold">{opt.key}.</span>
                          <span>{opt.text}</span>
                        </div>
                        {isRightChoice && (
                          <span className="text-[11px] font-bold text-emerald-700 uppercase">
                            ✓ Correct Answer
                          </span>
                        )}
                        {isUserChoice && !isRightChoice && (
                          <span className="text-[11px] font-bold text-rose-700 uppercase">
                            ✗ Your Choice
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Explanation */}
                {q.explanation && (
                  <div className="p-3.5 bg-white rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed">
                    <strong className="text-vedic-primary block mb-1 flex items-center gap-1">
                      <HelpCircle size={13} /> Vedic Insight & Meaning:
                    </strong>
                    {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Certificate Modal */}
      {showCertificate && (
        <CertificateModal
          result={result}
          onClose={() => setShowCertificate(false)}
        />
      )}

    </div>
  );
}
