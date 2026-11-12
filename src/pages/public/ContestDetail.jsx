import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Award, Calendar, CheckCircle, Clock, BookOpen, Shield, ArrowRight, ArrowLeft } from 'lucide-react';
import { useExam } from '../../context/ExamContext';

export default function ContestDetail() {
  const { id } = useParams();
  const { exams } = useExam();

  const exam = exams.find((e) => e.id === id || e.slug === id) || exams[0];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Back button */}
      <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800">
        <ArrowLeft size={14} />
        <span>Back to All Contests</span>
      </Link>

      {/* Header Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-card">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <span className="text-xs font-bold uppercase tracking-wider bg-vedic-light text-vedic-primary px-3 py-1 rounded-md">
            {exam.badge || 'National Contest'}
          </span>
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
            {exam.feeType} Participation
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
          {exam.name}
        </h1>
        <p className="text-base text-slate-600 max-w-3xl leading-relaxed mb-6">
          {exam.description}
        </p>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-y border-slate-100 text-xs text-slate-600">
          <div>
            <span className="text-slate-400 block uppercase font-medium">Duration</span>
            <strong className="text-base font-bold text-slate-900">{exam.durationMinutes} Minutes</strong>
          </div>
          <div>
            <span className="text-slate-400 block uppercase font-medium">Questions</span>
            <strong className="text-base font-bold text-slate-900">{exam.totalQuestions} MCQs</strong>
          </div>
          <div>
            <span className="text-slate-400 block uppercase font-medium">Eligibility</span>
            <strong className="text-base font-bold text-slate-900">{exam.category.split(' ')[0]}</strong>
          </div>
          <div>
            <span className="text-slate-400 block uppercase font-medium">Exam Date</span>
            <strong className="text-base font-bold text-slate-900">{exam.examLiveDate}</strong>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-6 flex flex-wrap items-center gap-4">
          <Link
            to={exam.id === 'gita-practice-mock' ? `/student/lobby/${exam.id}` : `/register?examId=${exam.id}`}
            className="px-7 py-3 rounded-xl font-bold text-sm bg-vedic-primary hover:bg-vedic-dark text-white shadow-md shadow-vedic-primary/20 transition flex items-center gap-2"
          >
            <span>{exam.id === 'gita-practice-mock' ? 'Start Test Right Now' : 'Register for this Contest (Free)'}</span>
            <ArrowRight size={16} />
          </Link>

          <Link
            to="/study-material"
            className="px-6 py-3 rounded-xl font-semibold text-sm border border-slate-300 text-slate-700 hover:bg-slate-50 transition"
          >
            View Study Materials
          </Link>
        </div>
      </div>

      {/* Grid: Syllabus & Guidelines */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Syllabus Topics */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
          <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
            <BookOpen size={18} className="text-vedic-primary" />
            <span>Syllabus & Core Topics</span>
          </h3>
          <p className="text-xs text-slate-500">
            Questions are curated by scholars from the authorized Sanskrit verses and standard commentaries.
          </p>

          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 pt-2">
            {(exam.syllabus || []).map((topic, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <CheckCircle size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                <span>{topic}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Exam Guidelines & Rules */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
          <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
            <Shield size={18} className="text-amber-600" />
            <span>Examination Guidelines</span>
          </h3>
          <p className="text-xs text-slate-500">
            Rules to ensure fairness, transparency, and a distraction-free experience.
          </p>

          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 pt-2">
            {(exam.guidelines || []).map((rule, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Prizes Section */}
      {exam.prizes && (
        <div className="bg-amber-50/60 rounded-2xl border border-amber-200/80 p-8 space-y-4">
          <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
            <Award size={18} className="text-amber-600" />
            <span>Rewards & Awards for this Track</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
            {exam.prizes.map((p, i) => (
              <div key={i} className="p-4 bg-white rounded-xl border border-amber-200 shadow-xs">
                <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block mb-1">
                  {p.rank}
                </span>
                <strong className="text-sm text-slate-900 block font-semibold">
                  {p.reward}
                </strong>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
