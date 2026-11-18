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
  BookMarked,
  Heart,
  ExternalLink,
  GraduationCap,
  Check,
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
      q: 'What is the Gita Leadership Contest (GLC) 2026?',
      a: "The Gita Leadership Contest is India's premier online value-education examination based on the teachings of the Shrimad Bhagavad Gita. It aims to empower youth with decision-making skills, stress management, moral courage, and high character.",
    },
    {
      q: 'How can I take the exam from home?',
      a: 'The entire contest is conducted online! You can register directly on this site, obtain your admit card roll number, and on the examination date log in from any mobile, tablet, or laptop to take the 45-minute MCQ exam.',
    },
    {
      q: 'Is there any fee to register?',
      a: 'No! Registration is completely free for all students and participants across India thanks to philanthropic sponsorships by the ISKCON Youth Forum.',
    },
    {
      q: 'Can I practice before the actual exam?',
      a: 'Yes! We provide an instant 24/7 Practice & Mock Test right on this portal. You can take it multiple times with immediate score feedback, shloka explanations, and an instant certificate.',
    },
    {
      q: 'What rewards do participants receive?',
      a: 'The top 3 national rankers receive cash prizes of ₹51,000, ₹31,000, and ₹21,000 along with gold/silver/bronze trophies. The top 100 receive special commendation awards and sacred copies of Bhagavad Gita As It Is. All qualified participants receive an official Certificate of Merit with unique QR verification.',
    },
  ];

  const steps = [
    {
      step: '01',
      title: 'Free Online Registration',
      subtitle: 'Instant Roll Number & Hall Ticket',
      description: 'Fill in your name, category, and school in 60 seconds. Receive your official admit card roll number immediately.',
      image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&auto=format&fit=crop&q=80',
      badge: 'Step 1',
    },
    {
      step: '02',
      title: 'Learn & Practice Mocks',
      subtitle: '18 Chapters & Shloka Insights',
      description: 'Read curated chapter notes, core verses, and take unlimited practice tests with instant answers and explanations.',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80',
      badge: 'Step 2',
    },
    {
      step: '03',
      title: 'Appear Online & Win',
      subtitle: '₹51,000 + Gold Trophy & Honors',
      description: 'Appear from home on 06 Dec 2026. Qualify for Stage 2 & Grand Finale and earn verified digital certificates.',
      image: 'https://images.unsplash.com/photo-1579208575657-c595a05383b7?w=600&auto=format&fit=crop&q=80',
      badge: 'Step 3',
    },
  ];

  const testimonials = [
    {
      name: 'Rahul Verma',
      role: 'National Rank 1 (2025)',
      school: 'Delhi Public School, R.K. Puram',
      quote:
        'The Gita Contest completely transformed how I handled board exam stress. Instead of being anxious about marks, Chapter 2 taught me to focus 100% on preparation. Winning ₹51,000 was a blessing!',
      image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80',
      score: '98.5% Score',
    },
    {
      name: 'Ananya Sharma',
      role: 'National Rank 2 (2025)',
      school: 'Kendriya Vidyalaya, Bengaluru',
      quote:
        'The practice mock tests on this portal were so intuitive! The shloka explanations helped me remember the philosophy with clarity. Every student in India should participate.',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      score: '96.2% Score',
    },
    {
      name: 'Dr. K. Radhakrishnan',
      role: 'Principal & Educator',
      school: 'DAV Public School Network',
      quote:
        'In today’s age of digital distraction, the Gita Leadership Contest introduces youth to ethical decision-making, mental discipline, and character. We enrolled our entire senior batch!',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
      score: 'Institutional Patron',
    },
  ];

  return (
    <div className="space-y-20 pb-24">
      {/* ── HERO SECTION ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-amber-50/60 via-vedic-light/40 to-vedic-cream pt-8 sm:pt-14 pb-16 sm:pb-24 border-b border-amber-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold tracking-wide shadow-xs">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                <span>All-India National Gita Contest 2026 • 100% Free Entry</span>
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
                Master Timeless Wisdom.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-vedic-primary via-vedic-teal to-amber-600">
                  Lead with Gita Values.
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Test your understanding of the Shrimad Bhagavad Gita in India&apos;s premier values & leadership olympiad. Win prestigious national scholarships, gold trophies, and cryptographically verified digital credentials.
              </p>

              {/* Live Countdown Box */}
              <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-amber-200/90 p-4 shadow-card max-w-lg mx-auto lg:mx-0">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-2.5 flex items-center justify-center lg:justify-start gap-1.5">
                  <Clock size={14} className="text-amber-600" />
                  <span>National Examination Commences In</span>
                </div>
                <div className="grid grid-cols-4 gap-2.5 text-center">
                  <div className="p-2 bg-amber-50/90 rounded-xl border border-amber-100">
                    <div className="text-xl sm:text-2xl font-extrabold text-slate-900 font-mono">{timeLeft.days}</div>
                    <div className="text-[10px] text-slate-500 font-semibold uppercase">Days</div>
                  </div>
                  <div className="p-2 bg-amber-50/90 rounded-xl border border-amber-100">
                    <div className="text-xl sm:text-2xl font-extrabold text-slate-900 font-mono">{timeLeft.hours}</div>
                    <div className="text-[10px] text-slate-500 font-semibold uppercase">Hours</div>
                  </div>
                  <div className="p-2 bg-amber-50/90 rounded-xl border border-amber-100">
                    <div className="text-xl sm:text-2xl font-extrabold text-slate-900 font-mono">{timeLeft.minutes}</div>
                    <div className="text-[10px] text-slate-500 font-semibold uppercase">Mins</div>
                  </div>
                  <div className="p-2 bg-amber-50/90 rounded-xl border border-amber-100">
                    <div className="text-xl sm:text-2xl font-extrabold text-slate-900 font-mono">{timeLeft.seconds}</div>
                    <div className="text-[10px] text-slate-500 font-semibold uppercase">Secs</div>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
                <Link
                  to="/register"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-vedic-primary via-vedic-teal to-vedic-accent hover:opacity-95 text-white shadow-md shadow-vedic-primary/25 hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Register for Contest (Free)</span>
                  <ArrowRight size={16} />
                </Link>

                <Link
                  to="/student/lobby/gita-practice-mock"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-sm bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <PlayCircle size={17} className="text-amber-500" />
                  <span>Start Practice Test</span>
                </Link>
              </div>

              {/* Trust metrics & student avatars */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-600">
                <div className="flex -space-x-2">
                  <img
                    src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80"
                    alt="Student"
                    className="w-7 h-7 rounded-full border-2 border-white object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                    alt="Student"
                    className="w-7 h-7 rounded-full border-2 border-white object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                    alt="Educator"
                    className="w-7 h-7 rounded-full border-2 border-white object-cover"
                  />
                  <div className="w-7 h-7 rounded-full border-2 border-white bg-amber-400 text-slate-950 font-bold text-[10px] flex items-center justify-center">
                    +28k
                  </div>
                </div>
                <span className="font-semibold text-slate-700">
                  Joined by <strong>28,450+ students</strong> across 1,200+ schools & colleges
                </span>
              </div>
            </div>

            {/* Right Visual Image Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Background Golden Glow */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-amber-400/30 via-emerald-400/20 to-vedic-primary/30 rounded-3xl blur-2xl -z-10" />

                {/* Main Hero Card with High-Res Spiritual Image */}
                <div className="relative rounded-3xl overflow-hidden border-2 border-amber-300/80 shadow-2xl bg-white group">
                  <img
                    src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80"
                    alt="Bhagavad Gita Sacred Scripture & Wisdom"
                    className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />

                  {/* Card Content Overlay */}
                  <div className="absolute bottom-0 inset-x-0 p-6 text-white space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-full inline-block">
                      Official 2026 Edition
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold font-shloka leading-snug">
                      श्रीमद्भगवद्गीता • The Song of the Divine
                    </h3>
                    <p className="text-xs text-slate-300 line-clamp-2">
                      Ancient leadership philosophy for decision making, stress elimination, and unshakeable character.
                    </p>
                  </div>

                  {/* Floating Badge Top-Right: Trophy */}
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-lg border border-amber-300 flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-lg shrink-0">
                      🏆
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">1st Prize</span>
                      <strong className="text-xs font-extrabold text-slate-900 block leading-tight">
                        ₹51,000 + Gold
                      </strong>
                    </div>
                  </div>

                  {/* Floating Badge Top-Left: Digital Certificate */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md rounded-2xl py-1.5 px-3 shadow-md border border-slate-200 flex items-center gap-1.5">
                    <Shield size={14} className="text-emerald-600" />
                    <span className="text-[11px] font-bold text-slate-800">Verified QR Certificate</span>
                  </div>
                </div>

                {/* Floating Bottom Card: Real-time Live Exam Counter */}
                <div className="mt-4 bg-white rounded-2xl border border-slate-200 p-3.5 shadow-md flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-xs font-semibold text-slate-700">
                      Exam Server Status: <strong className="text-emerald-700">Live & Operational</strong>
                    </span>
                  </div>
                  <Link
                    to="/student/lobby/gita-practice-mock"
                    className="text-xs font-bold text-vedic-primary hover:underline flex items-center gap-1"
                  >
                    <span>Practice Free</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 3 SIMPLE STEPS WITH IMAGES ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-vedic-primary bg-vedic-light px-3 py-1 rounded-full uppercase tracking-widest">
            Simple & Transparent
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-3">
            How the Contest Works
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Participating in the Gita Leadership Contest is 100% online, free, and accessible from any smartphone or computer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((st, i) => (
            <div
              key={st.step}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-card hover:shadow-elevated transition-all overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {/* Step Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={st.image}
                    alt={st.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
                  <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-md text-slate-900 text-xs font-extrabold px-3 py-1 rounded-full shadow-xs">
                    {st.badge}
                  </span>
                  <span className="absolute bottom-3 right-3 text-3xl font-extrabold text-white/90 font-mono">
                    {st.step}
                  </span>
                </div>

                {/* Step Text */}
                <div className="p-6 space-y-2">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-vedic-primary transition-colors">
                    {st.title}
                  </h3>
                  <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide">
                    {st.subtitle}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed pt-1">
                    {st.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <div className="h-0.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-vedic-primary rounded-full transition-all duration-500"
                    style={{ width: `${(i + 1) * 33.3}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PRIZES & AWARDS SHOWCASE ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-amber-700 bg-amber-100 px-3 py-1 rounded-full uppercase tracking-widest">
            Scholarships & Honours
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-3">
            National Awards & Cash Scholarships
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Recognizing extraordinary young thinkers, scholars, and future ethical leaders across the country.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 1st Prize */}
          <div className="relative rounded-3xl bg-gradient-to-b from-amber-50 via-white to-amber-50/50 border-2 border-amber-400 p-8 text-center shadow-card hover:shadow-elevated transition-all transform hover:-translate-y-1">
            <div className="w-18 h-18 rounded-3xl bg-amber-400/20 text-amber-600 flex items-center justify-center text-4xl mx-auto mb-4 border border-amber-300">
              🥇
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 border border-amber-200 px-3 py-1 rounded-full inline-block">
              1st National Rank
            </span>
            <div className="text-4xl font-extrabold text-slate-900 mt-3 mb-1">₹51,000</div>
            <p className="text-xs font-bold text-amber-700 uppercase tracking-wide">Cash Scholarship</p>
            <p className="text-xs text-slate-600 mt-4 pt-4 border-t border-amber-200">
              Gold Trophy of Excellence + Gita Ratna Medal + National Commendation Certificate
            </p>
          </div>

          {/* 2nd Prize */}
          <div className="rounded-3xl bg-white border border-slate-200 p-8 text-center shadow-soft hover:shadow-card transition-all">
            <div className="w-18 h-18 rounded-3xl bg-slate-100 text-slate-600 flex items-center justify-center text-4xl mx-auto mb-4 border border-slate-200">
              🥈
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 bg-slate-100 border border-slate-200 px-3 py-1 rounded-full inline-block">
              2nd National Rank
            </span>
            <div className="text-4xl font-extrabold text-slate-900 mt-3 mb-1">₹31,000</div>
            <p className="text-xs font-bold text-slate-600 uppercase tracking-wide">Cash Scholarship</p>
            <p className="text-xs text-slate-600 mt-4 pt-4 border-t border-slate-100">
              Silver Trophy + Gita Medal + Commendation Certificate
            </p>
          </div>

          {/* 3rd Prize */}
          <div className="rounded-3xl bg-white border border-slate-200 p-8 text-center shadow-soft hover:shadow-card transition-all">
            <div className="w-18 h-18 rounded-3xl bg-amber-900/10 text-amber-800 flex items-center justify-center text-4xl mx-auto mb-4 border border-amber-900/20">
              🥉
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-900 bg-amber-100 border border-amber-200 px-3 py-1 rounded-full inline-block">
              3rd National Rank
            </span>
            <div className="text-4xl font-extrabold text-slate-900 mt-3 mb-1">₹21,000</div>
            <p className="text-xs font-bold text-amber-800 uppercase tracking-wide">Cash Scholarship</p>
            <p className="text-xs text-slate-600 mt-4 pt-4 border-t border-slate-100">
              Bronze Trophy + Gita Medal + Commendation Certificate
            </p>
          </div>
        </div>

        {/* Consolation Banner with Book Distribution */}
        <div className="mt-8 p-6 rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-slate-800">
          <div className="flex items-center gap-4">
            <img
              src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=160&auto=format&fit=crop&q=80"
              alt="Bhagavad Gita Deluxe Edition"
              className="w-16 h-20 rounded-xl object-cover border border-amber-400/40 shrink-0 shadow-md"
            />
            <div>
              <strong className="text-base sm:text-lg block text-white">
                Top 100 Scholars: Sacred Bhagavad Gita + Cash Awards
              </strong>
              <span className="text-xs text-slate-400 mt-0.5 block max-w-xl">
                Cash scholarships of ₹1,100 each + Deluxe Hardbound edition of <em>Bhagavad Gita As It Is</em> with original Sanskrit commentary.
              </span>
            </div>
          </div>

          <Link
            to="/register"
            className="px-6 py-3 rounded-xl text-xs font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 shrink-0 transition shadow-md"
          >
            Claim Your Spot Now
          </Link>
        </div>
      </section>

      {/* ── CONTEST TRACKS (WITH VISUAL CARDS) ── */}
      <section id="contests" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-vedic-primary bg-vedic-light px-3 py-1 rounded-full uppercase tracking-widest">
            Choose Your Track
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
              className="bg-white rounded-3xl border border-slate-200/90 shadow-card hover:shadow-elevated transition-all flex flex-col justify-between overflow-hidden group"
            >
              <div>
                {/* Visual Header Banner for Exam */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={
                      exam.id === 'glc-2026'
                        ? 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&auto=format&fit=crop&q=80'
                        : exam.id === 'gita-practice-mock'
                        ? 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80'
                        : 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&auto=format&fit=crop&q=80'
                    }
                    alt={exam.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
                      {exam.badge || 'Track'}
                    </span>
                  </div>
                  <span className="absolute bottom-3 left-4 text-xs font-bold text-amber-300">
                    {exam.category}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-vedic-primary transition-colors leading-snug">
                    {exam.name}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {exam.description || exam.overview}
                  </p>

                  {/* Exam details grid */}
                  <div className="pt-2 grid grid-cols-2 gap-2 text-xs text-slate-600">
                    <div className="p-2.5 bg-slate-50 rounded-xl">
                      <span className="text-slate-400 block text-[10px] uppercase">Duration</span>
                      <strong className="text-slate-800">{exam.durationMinutes} Minutes</strong>
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded-xl">
                      <span className="text-slate-400 block text-[10px] uppercase">Format</span>
                      <strong className="text-slate-800">{exam.totalQuestions} Questions</strong>
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded-xl">
                      <span className="text-slate-400 block text-[10px] uppercase">Marks</span>
                      <strong className="text-slate-800">{exam.totalMarks} Total</strong>
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded-xl">
                      <span className="text-slate-400 block text-[10px] uppercase">Status</span>
                      <strong className="text-emerald-700 font-bold">100% Free</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Card Actions */}
              <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between gap-3 bg-white mt-4">
                <Link
                  to={`/contest/${exam.id}`}
                  className="text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  Syllabus & Rules
                </Link>

                <Link
                  to={
                    exam.id === 'gita-practice-mock'
                      ? `/student/lobby/${exam.id}`
                      : `/register?examId=${exam.id}`
                  }
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

      {/* ── SYLLABUS & WHY BHAGAVAD GITA (WITH HIGH-RES SCRIPTURE ART) ── */}
      <section className="bg-gradient-to-r from-vedic-dark via-vedic-primary to-vedic-dark text-white py-16 sm:py-20 relative overflow-hidden">
        {/* Subtle geometric backdrop */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
                Universal Leadership Wisdom
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Why Participate in the Gita Leadership Contest?
              </h2>
              <p className="text-sm text-slate-200 leading-relaxed font-light">
                The Bhagavad Gita is not merely a historical or religious text; it is humanity&apos;s most profound handbook on psychological resilience, mental focus, ethical decision-making, and selfless leadership.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3.5">
                  <div className="w-7 h-7 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 border border-amber-400/30">
                    <Check size={14} />
                  </div>
                  <div>
                    <strong className="text-sm text-white block">Overcome Fear, Stress & Anxiety</strong>
                    <p className="text-xs text-slate-300 mt-0.5">Learn how Arjuna transformed from paralyzed despair to fearless, purposeful action.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-7 h-7 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 border border-amber-400/30">
                    <Check size={14} />
                  </div>
                  <div>
                    <strong className="text-sm text-white block">Master the Restless Mind</strong>
                    <p className="text-xs text-slate-300 mt-0.5">Techniques from Chapter 6 for laser-like focus, meditation, and emotional stability.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-7 h-7 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 border border-amber-400/30">
                    <Check size={14} />
                  </div>
                  <div>
                    <strong className="text-sm text-white block">Duty Without Burnout (Nishkama Karma)</strong>
                    <p className="text-xs text-slate-300 mt-0.5">Give 100% effort in your exams and profession without being crushed by the result.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  to="/study-material"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 transition shadow-md"
                >
                  <BookOpen size={16} />
                  <span>Explore Study Notes & Chapter Summaries</span>
                </Link>
              </div>
            </div>

            {/* Sacred Quote & Visual Card */}
            <div className="space-y-6">
              <div className="relative rounded-3xl overflow-hidden border border-amber-300/40 shadow-2xl bg-slate-900/80">
                <img
                  src="https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&auto=format&fit=crop&q=80"
                  alt="Sacred Bhagavad Gita Text"
                  className="w-full h-56 object-cover object-center opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent p-7 flex flex-col justify-end space-y-3">
                  <div className="text-xs text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles size={14} /> Core Shloka Spotlight
                  </div>

                  <p className="font-shloka text-xl sm:text-2xl text-amber-200 font-bold leading-relaxed">
                    &ldquo;कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।<br />
                    मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥&rdquo;
                  </p>

                  <p className="text-xs sm:text-sm text-slate-300 italic">
                    &ldquo;You have a right only to perform your prescribed duty, but never to the fruits of action. Never consider yourself the cause of results, nor be attached to inaction.&rdquo; — BG 2.47
                  </p>

                  <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                    <span>Central Leadership Doctrine</span>
                    <span className="text-amber-400 font-semibold">Chapter 2 • Verse 47</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── VERIFIED STUDENT & EDUCATOR TESTIMONIALS (WITH PHOTOS) ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-amber-700 bg-amber-100 px-3 py-1 rounded-full uppercase tracking-widest">
            Inspiring Journeys
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-3">
            What Rankers & Educators Say
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Hear from students and school leaders who found clarity, discipline, and purpose through the contest.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-slate-200 p-7 shadow-card hover:shadow-elevated transition-all flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} fill="currentColor" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-3.5 pt-4 border-t border-slate-100">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-amber-300 shadow-xs"
                />
                <div>
                  <strong className="text-sm font-bold text-slate-900 block leading-tight">{t.name}</strong>
                  <span className="text-[11px] font-semibold text-vedic-primary block">{t.role}</span>
                  <span className="text-[10px] text-slate-400 block truncate max-w-[170px]">{t.school}</span>
                </div>
              </div>
            </div>
          ))}
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
                className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 hover:text-vedic-primary transition cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  size={18}
                  className={`shrink-0 transition-transform ${
                    activeFaq === idx ? 'rotate-180 text-vedic-primary' : 'text-slate-400'
                  }`}
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
        <div className="relative bg-gradient-to-r from-vedic-dark via-vedic-primary to-vedic-teal rounded-3xl p-8 sm:p-14 text-white text-center space-y-6 shadow-2xl overflow-hidden">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-amber-400/20 blur-3xl" />
          <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-emerald-400/20 blur-3xl" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <span className="text-[11px] font-bold uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full text-amber-300">
              National Wisdom Movement
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Join Over 28,000+ Students in India&apos;s Greatest Leadership Olympiad
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 max-w-lg mx-auto font-light">
              Registration takes less than 60 seconds. Free enrollment, admit card generation, and instant access to practice exams.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/register"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-md transition cursor-pointer"
              >
                Register Now for Free
              </Link>
              <Link
                to="/student/lobby/gita-practice-mock"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-sm bg-white/10 hover:bg-white/20 text-white border border-white/30 transition cursor-pointer"
              >
                Try Free Practice Test
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
