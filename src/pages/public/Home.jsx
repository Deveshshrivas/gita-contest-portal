import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Award,
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
  Sparkles,
  ArrowRight,
  Shield,
  Star,
  Users,
  ChevronDown,
  PlayCircle,
  HelpCircle,
  Gift,
} from 'lucide-react';
import { useExam } from '../../context/ExamContext';

export default function Home() {
  const { exams } = useExam();

  // Target date for main contest: Dec 6, 2026
  const [timeLeft, setTimeLeft] = useState({ days: 32, hours: 14, minutes: 22, seconds: 45 });

  useEffect(() => {
    const target = new Date('2026-12-06T10:00:00Z').getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = Math.max(0, target - now);
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const [activeFaq, setActiveFaq] = useState(null);

  const faqs = [
    {
      q: "What is the Gita Leadership Contest (GLC) 2026?",
      a: "The Gita Leadership Contest is India's premier online value-education examination based on the teachings of the Shrimad Bhagavad Gita. It aims to empower youth with decision-making skills, stress management, moral courage, and high character."
    },
    {
      q: "How can I take the exam from home?",
      a: "The entire contest is conducted online! You can register directly on this site, obtain your admit card roll number, and on the examination date log in from any mobile, tablet, or laptop to take the 45-minute MCQ exam."
    },
    {
      q: "Is there any fee to register?",
      a: "No! Registration is completely free for all students and participants across India thanks to philanthropic sponsorships by the ISKCON Youth Forum."
    },
    {
      q: "Can I practice before the actual exam?",
      a: "Yes! We provide an instant 24/7 Practice & Mock Test right on this portal. You can take it multiple times with immediate score feedback, shloka explanations, and an instant certificate."
    },
    {
      q: "What rewards do participants receive?",
      a: "The top 3 national rankers receive cash prizes of ₹51,000, ₹31,000, and ₹21,000 along with gold/silver/bronze trophies. The top 100 receive special commendation awards and sacred copies of Bhagavad Gita As It Is. All qualified participants receive an official Certificate of Merit."
    }
  ];

  return (
    <div className="space-y-20 pb-20">
      
      {/* ── HERO SECTION ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-vedic-light/60 via-amber-50/40 to-vedic-cream pt-12 pb-20 sm:pt-20 sm:pb-28 border-b border-amber-200/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            
            {/* Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300/80 text-xs font-bold tracking-wide shadow-xs">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
              <span>All-India National Gita Contest 2026 • Official Registration Open</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Master Timeless Wisdom.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-vedic-primary via-vedic-teal to-amber-600">
                Lead with Gita Values.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Test your understanding of the Shrimad Bhagavad Gita in India&apos;s largest values & leadership olympiad. Win prestigous national scholarships, trophies, and verified digital credentials.
            </p>

            {/* Live Countdown Box */}
            <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-amber-200/80 p-5 shadow-card max-w-xl mx-auto">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center justify-center gap-1.5">
                <Clock size={14} className="text-amber-600" />
                <span>National Examination Starts In</span>
              </div>
              <div className="grid grid-cols-4 gap-3 text-center">
                <div className="p-2 sm:p-3 bg-amber-50/80 rounded-xl border border-amber-100">
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">{timeLeft.days}</div>
                  <div className="text-[10px] sm:text-xs text-slate-500 font-semibold uppercase">Days</div>
                </div>
                <div className="p-2 sm:p-3 bg-amber-50/80 rounded-xl border border-amber-100">
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">{timeLeft.hours}</div>
                  <div className="text-[10px] sm:text-xs text-slate-500 font-semibold uppercase">Hours</div>
                </div>
                <div className="p-2 sm:p-3 bg-amber-50/80 rounded-xl border border-amber-100">
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">{timeLeft.minutes}</div>
                  <div className="text-[10px] sm:text-xs text-slate-500 font-semibold uppercase">Mins</div>
                </div>
                <div className="p-2 sm:p-3 bg-amber-50/80 rounded-xl border border-amber-100">
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">{timeLeft.seconds}</div>
                  <div className="text-[10px] sm:text-xs text-slate-500 font-semibold uppercase">Secs</div>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/register"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-sm bg-vedic-primary hover:bg-vedic-dark text-white shadow-md shadow-vedic-primary/25 hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span>Register for Contest (Free)</span>
                <ArrowRight size={16} />
              </Link>

              <Link
                to="/student/lobby/gita-practice-mock"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-sm bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 shadow-xs transition-all flex items-center justify-center gap-2"
              >
                <PlayCircle size={17} className="text-amber-500" />
                <span>Start Practice Test</span>
              </Link>
            </div>

            {/* Quick stats pills */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle size={15} className="text-emerald-600" /> Free Registration
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle size={15} className="text-emerald-600" /> 100% Online Examination
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle size={15} className="text-emerald-600" /> Verified Certificate with QR
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* ── PRIZES & AWARDS SHOWCASE ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-amber-700 bg-amber-100 px-3 py-1 rounded-full uppercase tracking-widest">
            Scholarships & Honours
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-3">
            National Awards & Recognition
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Recognizing extraordinary young thinkers, scholars, and future ethical leaders of the nation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 1st Prize */}
          <div className="relative rounded-2xl bg-gradient-to-b from-amber-50 via-white to-amber-50/50 border-2 border-amber-400 p-8 text-center shadow-card hover:shadow-elevated transition-all transform hover:-translate-y-1">
            <div className="w-16 h-16 rounded-2xl bg-amber-400/20 text-amber-600 flex items-center justify-center text-3xl mx-auto mb-4">
              🥇
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-2.5 py-1 rounded-md">
              1st National Rank
            </span>
            <div className="text-3xl font-extrabold text-slate-900 mt-3 mb-1">₹51,000</div>
            <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide">Cash Scholarship</p>
            <p className="text-xs text-slate-600 mt-3 pt-3 border-t border-amber-200">
              Gold Trophy of Excellence + Gita Ratna Medal + Commendation Certificate
            </p>
          </div>

          {/* 2nd Prize */}
          <div className="rounded-2xl bg-white border border-slate-200 p-8 text-center shadow-soft hover:shadow-card transition-all">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-600 flex items-center justify-center text-3xl mx-auto mb-4">
              🥈
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md">
              2nd National Rank
            </span>
            <div className="text-3xl font-extrabold text-slate-900 mt-3 mb-1">₹31,000</div>
            <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Cash Scholarship</p>
            <p className="text-xs text-slate-600 mt-3 pt-3 border-t border-slate-100">
              Silver Trophy + Gita Medal + Commendation Certificate
            </p>
          </div>

          {/* 3rd Prize */}
          <div className="rounded-2xl bg-white border border-slate-200 p-8 text-center shadow-soft hover:shadow-card transition-all">
            <div className="w-16 h-16 rounded-2xl bg-amber-900/10 text-amber-800 flex items-center justify-center text-3xl mx-auto mb-4">
              🥉
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-900 bg-amber-100 px-2.5 py-1 rounded-md">
              3rd National Rank
            </span>
            <div className="text-3xl font-extrabold text-slate-900 mt-3 mb-1">₹21,000</div>
            <p className="text-xs font-semibold text-amber-800 uppercase tracking-wide">Cash Scholarship</p>
            <p className="text-xs text-slate-600 mt-3 pt-3 border-t border-slate-100">
              Bronze Trophy + Gita Medal + Commendation Certificate
            </p>
          </div>
        </div>

        {/* Consolation banner */}
        <div className="mt-6 p-5 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-lg shrink-0">
              <Gift size={20} />
            </div>
            <div>
              <strong className="text-sm block">Top 100 Consolation Awards + Sacred Bhagavad Gita</strong>
              <span className="text-xs text-slate-400">Cash awards of ₹1,100 each + Deluxe Hardbound edition of Bhagavad Gita As It Is.</span>
            </div>
          </div>

          <Link
            to="/register"
            className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shrink-0 transition"
          >
            Claim Your Spot
          </Link>
        </div>
      </section>

      {/* ── CONTEST CATEGORIES & EXAMS ── */}
      <section id="contests" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-vedic-primary bg-vedic-light px-3 py-1 rounded-full uppercase tracking-widest">
            Choose Your Contest
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-3">
            Active Contests & Examination Tracks
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Select the category that matches your age or experience. Free participation across all tracks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {exams.map((exam) => (
            <div
              key={exam.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-card hover:shadow-elevated transition-all flex flex-col justify-between overflow-hidden"
            >
              <div className="p-6 sm:p-7 space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-vedic-primary bg-vedic-light px-2.5 py-1 rounded-md">
                    {exam.badge || 'Contest Track'}
                  </span>
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {exam.feeType}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 leading-snug">
                  {exam.name}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {exam.description}
                </p>

                {/* Exam meta pill */}
                <div className="pt-2 grid grid-cols-2 gap-2 text-xs text-slate-600">
                  <div className="p-2.5 bg-slate-50 rounded-xl">
                    <span className="text-slate-400 block text-[10px] uppercase">Duration</span>
                    <strong className="text-slate-800">{exam.durationMinutes} Minutes</strong>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-xl">
                    <span className="text-slate-400 block text-[10px] uppercase">Format</span>
                    <strong className="text-slate-800">{exam.totalQuestions} MCQs</strong>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-xl">
                    <span className="text-slate-400 block text-[10px] uppercase">Category</span>
                    <strong className="text-slate-800 truncate block">{exam.category.split(' ')[0]}</strong>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-xl">
                    <span className="text-slate-400 block text-[10px] uppercase">Exam Date</span>
                    <strong className="text-slate-800">{exam.examLiveDate}</strong>
                  </div>
                </div>
              </div>

              {/* Bottom Card Actions */}
              <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
                <Link
                  to={`/contest/${exam.id}`}
                  className="text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  View Syllabus & Rules
                </Link>

                <Link
                  to={exam.id === 'gita-practice-mock' ? `/student/lobby/${exam.id}` : `/register?examId=${exam.id}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-vedic-primary hover:bg-vedic-dark text-white shadow-xs transition"
                >
                  <span>{exam.id === 'gita-practice-mock' ? 'Start Test Now' : 'Enroll Free'}</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SYLLABUS & WHY BHAGAVAD GITA ── */}
      <section className="bg-gradient-to-r from-vedic-dark via-vedic-primary to-vedic-dark text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
                Universal Leadership Wisdom
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Why Participate in the Gita Leadership Contest?
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                The Bhagavad Gita is not merely a historical or religious text; it is the world&apos;s most profound handbook on psychological resilience, mental focus, ethical decision-making, and selfless leadership.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <strong className="text-sm text-white block">Overcome Fear, Stress & Anxiety</strong>
                    <p className="text-xs text-slate-300">Learn how Arjuna transformed from paralyzed despair to fearless clarity.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <strong className="text-sm text-white block">Master the Restless Mind</strong>
                    <p className="text-xs text-slate-300">Practical techniques from Chapter 6 for unbreakable focus and emotional balance.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <strong className="text-sm text-white block">Duty Without Burnout (Nishkama Karma)</strong>
                    <p className="text-xs text-slate-300">How to give 100% effort to your exams and career without being crushed by the result.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  to="/study-material"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 transition"
                >
                  <BookOpen size={16} />
                  <span>Explore Study Notes & Chapter Summaries</span>
                </Link>
              </div>
            </div>

            {/* Sacred Quote Card */}
            <div className="bg-slate-800/80 rounded-2xl border border-slate-700/80 p-8 space-y-6">
              <div className="text-xs text-amber-400 font-bold uppercase tracking-wider flex items-center gap-2">
                <Sparkles size={14} /> Sacred Shloka Spotlight
              </div>

              <p className="font-shloka text-xl sm:text-2xl text-amber-200 font-bold leading-relaxed">
                &ldquo;कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।<br />
                मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥&rdquo;
              </p>

              <p className="text-xs sm:text-sm text-slate-300 italic">
                &ldquo;You have a right only to perform your prescribed duty, but never to the fruits of action. Never consider yourself the cause of the results, nor be attached to inaction.&rdquo; — BG 2.47
              </p>

              <div className="pt-4 border-t border-slate-700 text-xs text-slate-400 flex items-center justify-between">
                <span>Core Theme of the 2026 Contest</span>
                <span className="text-amber-400 font-semibold">Chapter 2 • Verse 47</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FREQUENTLY ASKED QUESTIONS (FAQ) ── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-amber-700 bg-amber-100 px-3 py-1 rounded-full uppercase tracking-widest">
            Clear Your Doubts
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 hover:text-vedic-primary transition"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  size={18}
                  className={`shrink-0 transition-transform ${activeFaq === idx ? 'rotate-180 text-vedic-primary' : 'text-slate-400'}`}
                />
              </button>

              {activeFaq === idx && (
                <div className="px-6 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-50 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── FINAL CALL TO ACTION ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-vedic-primary to-vedic-teal rounded-3xl p-8 sm:p-14 text-white text-center space-y-6 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl sm:text-4xl font-extrabold">
              Join Over 25,000+ Students in India&apos;s Greatest Wisdom Olympiad
            </h2>
            <p className="text-sm text-slate-200">
              Registration takes less than 2 minutes. Free enrollment, admit card generation, and free access to practice tests.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/register"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-md transition"
              >
                Register Now for Free
              </Link>
              <Link
                to="/student/lobby/gita-practice-mock"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-sm bg-white/10 hover:bg-white/20 text-white border border-white/30 transition"
              >
                Try Practice Test
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
