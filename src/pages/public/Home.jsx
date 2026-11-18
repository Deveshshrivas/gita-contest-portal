import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Award,
  BookOpen,
  Calendar,
  CheckCircle,
  Sparkles,
  ArrowRight,
  Shield,
  Star,
  Users,
  ChevronDown,
  HelpCircle,
  Gift,
  BookMarked,
  Heart,
  ExternalLink,
  GraduationCap,
  Check,
  Building2,
  MapPin,
  MessageCircle,
} from 'lucide-react';
import { useExam } from '../../context/ExamContext';

export default function Home() {
  const { exams } = useExam();

  const [activeFaq, setActiveFaq] = useState(null);

  const faqs = [
    {
      q: 'What is the Gita Leadership Contest (GLC) 2026?',
      a: 'The Gita Leadership Contest (GLC 2026) is India’s prestigious online values, ethics, and leadership olympiad organized by the Government of Madhya Pradesh (मध्य प्रदेश शासन) in joint collaboration with ISKCON Ujjain, Avantkulam, and Veer Bharat Nyas. It inspires youth with the wisdom of the Shrimad Bhagavad Gita.',
    },
    {
      q: 'Who is eligible to participate?',
      a: 'The primary championship is open specifically for Students of Class 9th to 12th across Madhya Pradesh and India. Additional practice tracks are open for college youth, educators, and open participants.',
    },
    {
      q: 'How can I take the exam from home?',
      a: 'The entire contest is conducted 100% online! Register on this official portal, receive your verified Roll Number and Admit Card, and log in on 06th December 2026 from your smartphone, tablet, or laptop for the 45-minute online examination.',
    },
    {
      q: 'Is there any registration fee?',
      a: 'No! Participation is 100% Free for all students, backed by the Government of Madhya Pradesh and ISKCON Ujjain.',
    },
    {
      q: 'What are the official cash prizes?',
      a: '1st Prize: ₹ 1,00,001/- with Gold Trophy; 2nd Prize: ₹ 50,001/- with Silver Trophy; 3rd Prize: ₹ 30,001/- with Bronze Trophy. The top 100 participants receive cash commendation awards and sacred copies of Bhagavad Gita As It Is. All qualifying students receive a verified Government & ISKCON Certificate of Merit with unique QR authenticity.',
    },
  ];

  const steps = [
    {
      step: '01',
      title: 'Free Online Registration',
      subtitle: 'Instant Roll Number & Hall Ticket',
      description: 'Fill in your name, category (Class 9th-12th), and school in 60 seconds. Receive your official admit card roll number immediately.',
      image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&auto=format&fit=crop&q=80',
      badge: 'Step 1',
    },
    {
      step: '02',
      title: 'Learn & Practice Mocks',
      subtitle: 'Chapter Summaries & 24/7 Practice',
      description: 'Access curated Gita notes, core verses, and take unlimited practice tests with instant evaluation, explanations, and practice certificates.',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80',
      badge: 'Step 2',
    },
    {
      step: '03',
      title: 'Appear Online on 06 Dec 2026',
      subtitle: 'Win ₹1,00,001 + State Honors',
      description: 'Appear from the comfort of your home. Win national recognition, state cash scholarships, trophies, and digital merit credentials.',
      image: 'https://images.unsplash.com/photo-1579208575657-c595a05383b7?w=600&auto=format&fit=crop&q=80',
      badge: 'Step 3',
    },
  ];

  const testimonials = [
    {
      name: 'Aditya Rajawat',
      role: '1st Rank Winner (GLC State)',
      school: 'Government Excellence School, Ujjain',
      quote:
        'Preparing for the Gita Contest completely changed my mindset towards studies. The shlokas of Chapter 2 helped me eliminate exam fear and stay calm. Winning the ₹1,00,001 scholarship was a dream come true for my family!',
      image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80',
      score: '99.2% Score',
    },
    {
      name: 'Pooja Chouhan',
      role: '2nd Rank Winner',
      school: 'Maharishi Vidya Mandir, Bhopal',
      quote:
        'The practice tests on this portal are amazing. The explanations for each verse gave me deep clarity. The guidance from ISKCON Ujjain and the MP Government gives this contest highest prestige.',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      score: '98.0% Score',
    },
    {
      name: 'Dr. Suresh Tiwari',
      role: 'District Education Officer',
      school: 'School Education Department, MP',
      quote:
        'Under the leadership of Chief Minister Dr. Mohan Yadav, this initiative brings moral courage, ethical decision-making, and cultural pride to lakhs of students across our state.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
      score: 'Official Coordinator',
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-24">
      {/* ── OFFICIAL GOVERNMENT & ISKCON HERO SECTION ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-amber-50/70 via-vedic-light/30 to-vedic-cream pt-6 sm:pt-10 pb-16 sm:pb-24 border-b border-amber-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Organizers Ribbon Banner with Authentic Official Logos */}
          <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-amber-300/80 p-2.5 sm:p-4 mb-6 sm:mb-8 shadow-sm flex flex-col xl:flex-row items-center justify-between gap-3 sm:gap-4">
            {/* 4 Organizers: 2x2 grid on mobile (<sm), 4-col row on sm, flex on xl */}
            <div className="grid grid-cols-2 sm:grid-cols-4 xl:flex xl:items-center gap-2 sm:gap-4 xl:gap-6 w-full xl:w-auto text-xs font-bold text-slate-800">
              
              {/* 1. Avantkulam */}
              <div className="flex items-center gap-2 sm:gap-2.5 p-2 sm:p-0 bg-slate-50/90 sm:bg-transparent rounded-xl sm:rounded-none border border-slate-200/80 sm:border-0">
                <img
                  src="/images/logo-avantkulam-clean.png"
                  alt="Avantkulam Logo"
                  className="w-8 h-8 sm:w-10 sm:h-10 object-contain rounded-full border border-slate-200 shadow-2xs shrink-0"
                />
                <div className="min-w-0">
                  <span className="text-[9px] sm:text-[10px] text-emerald-800 uppercase block tracking-wider font-extrabold truncate">अवंतिकुलम</span>
                  <span className="text-[11px] sm:text-xs text-slate-900 font-bold block truncate">Avantkulam</span>
                </div>
              </div>

              {/* 2. Madhya Pradesh Shasan */}
              <div className="flex items-center gap-2 sm:gap-2.5 p-2 sm:p-0 bg-amber-50/70 sm:bg-transparent rounded-xl sm:rounded-none border border-amber-200/80 sm:border-0">
                <img
                  src="/images/logo-mp-shasan-clean.png"
                  alt="Madhya Pradesh Shasan Official Seal"
                  className="w-8 h-8 sm:w-10 sm:h-10 object-contain rounded-full border border-amber-300 shadow-2xs shrink-0"
                />
                <div className="min-w-0">
                  <span className="text-[9px] sm:text-[10px] text-amber-800 uppercase block tracking-wider font-extrabold truncate">मध्य प्रदेश शासन</span>
                  <span className="text-[11px] sm:text-xs text-slate-900 font-bold block truncate">Govt. of MP</span>
                </div>
              </div>

              {/* 3. ISKCON Ujjain */}
              <div className="flex items-center gap-2 sm:gap-2.5 p-2 sm:p-0 bg-slate-50/90 sm:bg-transparent rounded-xl sm:rounded-none border border-slate-200/80 sm:border-0">
                <img
                  src="/images/logo-iskcon-ujjain-clean.png"
                  alt="ISKCON Ujjain Official Logo"
                  className="w-8 h-8 sm:w-10 sm:h-10 object-contain shrink-0"
                />
                <div className="min-w-0">
                  <span className="text-[9px] sm:text-[10px] text-slate-800 uppercase block tracking-wider font-extrabold truncate">इस्कॉन उज्जैन</span>
                  <span className="text-[11px] sm:text-xs text-slate-900 font-bold block truncate">ISKCON Ujjain</span>
                </div>
              </div>

              {/* 4. Veer Bharat Nyas */}
              <div className="flex items-center gap-2 sm:gap-2.5 p-2 sm:p-0 bg-rose-50/70 sm:bg-transparent rounded-xl sm:rounded-none border border-rose-200/80 sm:border-0">
                <img
                  src="/images/logo-veer-bharat-clean.png"
                  alt="Veer Bharat Nyas Official Logo"
                  className="h-7 sm:h-9 w-auto object-contain shrink-0"
                />
                <div className="min-w-0">
                  <span className="text-[9px] sm:text-[10px] text-rose-800 uppercase block tracking-wider font-extrabold truncate">वीर भारत न्यास</span>
                  <span className="text-[11px] sm:text-xs text-slate-900 font-bold block truncate">Veer Bharat</span>
                </div>
              </div>
            </div>

            {/* Dignitary Special Thanks Badge with Centered CM Portrait */}
            <div className="w-full xl:w-auto bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl shadow-md border border-amber-400/40 flex items-center justify-center sm:justify-start gap-2.5 sm:gap-3 shrink-0">
              <img
                src="/images/dr-mohan-yadav-cm.png"
                alt="Dr. Mohan Yadav, Chief Minister Madhya Pradesh"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white object-cover object-center shadow-xs shrink-0 bg-sky-100"
              />
              <div className="text-left">
                <span className="text-[8px] sm:text-[9px] uppercase tracking-wider block text-amber-200 font-bold leading-tight">
                  SPECIAL THANKS
                </span>
                <strong className="text-xs sm:text-sm block leading-tight text-white font-black tracking-wide">
                  DR. MOHAN YADAV
                </strong>
                <span className="text-[9px] sm:text-[10px] text-amber-100 font-medium block leading-tight">
                  Chief Minister, Madhya Pradesh
                </span>
              </div>
            </div>
          </div>

          {/* Main Hero Split Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              {/* Official Badges */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold tracking-wide">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                  <span>मध्य प्रदेश शासन द्वारा आयोजित</span>
                </span>
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold">
                  Class 9th to 12th Only
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                Gita Leadership Contest<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-vedic-primary to-emerald-700">
                  GLC 2026 Online Exam
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Participate in the grand online values & character olympiad based on the Shrimad Bhagavad Gita. Win state cash scholarships up to <strong>₹ 1,00,001/-</strong>, trophies, and official government-certified merit credentials.
              </p>

              {/* 4 Official Diamond Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                <div className="p-3 bg-white rounded-2xl border border-amber-200/90 text-center shadow-2xs">
                  <strong className="text-xl sm:text-2xl font-black text-amber-700 font-mono block">8</strong>
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Years Legacy</span>
                </div>
                <div className="p-3 bg-white rounded-2xl border border-amber-200/90 text-center shadow-2xs">
                  <strong className="text-xl sm:text-2xl font-black text-slate-900 font-mono block">120</strong>
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Districts</span>
                </div>
                <div className="p-3 bg-white rounded-2xl border border-amber-200/90 text-center shadow-2xs">
                  <strong className="text-xl sm:text-2xl font-black text-slate-900 font-mono block">1,700</strong>
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Institutions</span>
                </div>
                <div className="p-3 bg-white rounded-2xl border border-emerald-300 text-center shadow-2xs bg-emerald-50/50">
                  <strong className="text-xl sm:text-2xl font-black text-emerald-800 font-mono block">5L+</strong>
                  <span className="text-[10px] font-bold text-emerald-700 uppercase">Participants</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
                <Link
                  to="/register"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-extrabold text-sm bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:brightness-105 text-slate-950 shadow-md shadow-amber-500/25 hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Register for Online Exam (Free)</span>
                  <ArrowRight size={16} />
                </Link>

                <a
                  href="https://whatsapp.com/channel/0029Va9xyzOfficialGitaContest"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle size={17} />
                  <span>Join WhatsApp Channel</span>
                </a>
              </div>
            </div>

            {/* Right Visual Column: Official Poster Banner */}
            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-lg lg:max-w-none">
                {/* Spiritual Golden Halo */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-amber-500/30 via-orange-400/20 to-emerald-400/20 rounded-3xl blur-2xl -z-10" />

                {/* Main Official Poster Container */}
                <div className="relative rounded-3xl overflow-hidden border-3 border-amber-400/90 shadow-2xl bg-white group">
                  <img
                    src="/images/gita-contest-2026-official-banner.webp"
                    alt="Official Gita Contest 2026 - MP Government & ISKCON Ujjain"
                    className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-500 block"
                  />

                  <div className="p-4 bg-gradient-to-r from-amber-50 via-white to-amber-50 border-t border-amber-200 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-amber-800 font-bold uppercase block">Venue & Date</span>
                      <strong className="text-xs text-slate-900">Online Across All MP Districts • 06 Dec 2026</strong>
                    </div>
                    <Link
                      to="/register"
                      className="px-3.5 py-1.5 rounded-lg bg-vedic-primary hover:bg-vedic-dark text-white text-xs font-bold transition shadow-xs"
                    >
                      Enroll Now →
                    </Link>
                  </div>
                </div>

                {/* Floating Bottom Card: Real-time Live Exam Counter */}
                <div className="mt-3.5 bg-white rounded-2xl border border-slate-200 p-3 shadow-md flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-xs font-semibold text-slate-700">
                      National Registration: <strong className="text-emerald-700">Open & 100% Free</strong>
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-amber-700 font-mono">
                    Class 9th - 12th Focus
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── OFFICIAL PRIZES SECTION (पुरस्कार राशि) ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-amber-800 bg-amber-100 border border-amber-300 px-3.5 py-1 rounded-full uppercase tracking-widest">
            पुरस्कार एवं सम्मान • Official Awards
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-3">
            Cash Prizes Worth Lakhs
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Sanctioned under the patronage of the Government of Madhya Pradesh and ISKCON Ujjain.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 1st Prize */}
          <div className="relative rounded-3xl bg-gradient-to-b from-amber-50 via-white to-amber-50/70 border-3 border-amber-400 p-8 text-center shadow-card hover:shadow-elevated transition-all transform hover:-translate-y-1">
            <div className="w-20 h-20 rounded-3xl bg-amber-400/20 text-amber-600 flex items-center justify-center text-4xl mx-auto mb-4 border border-amber-300 shadow-inner">
              🥇
            </div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-amber-900 bg-amber-200/80 border border-amber-300 px-3.5 py-1 rounded-full inline-block">
              प्रथम पुरस्कार • 1st Prize
            </span>
            <div className="text-4xl sm:text-5xl font-black text-slate-900 mt-3 mb-1 font-mono tracking-tight text-amber-700">
              ₹ 1,00,001/-
            </div>
            <p className="text-xs font-bold text-slate-700 uppercase tracking-wide">One Lakh & One Rupee</p>
            <p className="text-xs text-slate-600 mt-4 pt-4 border-t border-amber-200">
              Gold Trophy of Excellence + State Gita Ratna Medal + Verified Commendation Certificate
            </p>
          </div>

          {/* 2nd Prize */}
          <div className="rounded-3xl bg-white border-2 border-slate-300 p-8 text-center shadow-soft hover:shadow-card transition-all">
            <div className="w-20 h-20 rounded-3xl bg-slate-100 text-slate-600 flex items-center justify-center text-4xl mx-auto mb-4 border border-slate-200">
              🥈
            </div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-800 bg-slate-100 border border-slate-300 px-3.5 py-1 rounded-full inline-block">
              द्वितीय पुरस्कार • 2nd Prize
            </span>
            <div className="text-4xl sm:text-5xl font-black text-slate-900 mt-3 mb-1 font-mono tracking-tight text-slate-800">
              ₹ 50,001/-
            </div>
            <p className="text-xs font-bold text-slate-600 uppercase tracking-wide">Fifty Thousand & One Rupee</p>
            <p className="text-xs text-slate-600 mt-4 pt-4 border-t border-slate-100">
              Silver Trophy + State Gita Medal + Verified Commendation Certificate
            </p>
          </div>

          {/* 3rd Prize */}
          <div className="rounded-3xl bg-white border-2 border-amber-900/30 p-8 text-center shadow-soft hover:shadow-card transition-all">
            <div className="w-20 h-20 rounded-3xl bg-amber-900/10 text-amber-800 flex items-center justify-center text-4xl mx-auto mb-4 border border-amber-900/20">
              🥉
            </div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-amber-950 bg-amber-100 border border-amber-200 px-3.5 py-1 rounded-full inline-block">
              तृतीय पुरस्कार • 3rd Prize
            </span>
            <div className="text-4xl sm:text-5xl font-black text-slate-900 mt-3 mb-1 font-mono tracking-tight text-amber-900">
              ₹ 30,001/-
            </div>
            <p className="text-xs font-bold text-amber-800 uppercase tracking-wide">Thirty Thousand & One Rupee</p>
            <p className="text-xs text-slate-600 mt-4 pt-4 border-t border-slate-100">
              Bronze Trophy + State Gita Medal + Verified Commendation Certificate
            </p>
          </div>
        </div>

        {/* Consolation Banner with Book Distribution */}
        <div className="mt-8 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-slate-800">
          <div className="flex items-center gap-4">
            <img
              src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=160&auto=format&fit=crop&q=80"
              alt="Bhagavad Gita Deluxe Edition"
              className="w-16 h-20 rounded-xl object-cover border border-amber-400/40 shrink-0 shadow-md"
            />
            <div>
              <strong className="text-base sm:text-lg block text-white">
                Top 100 Scholars: Sacred Bhagavad Gita + Consolation Cash Awards
              </strong>
              <span className="text-xs text-slate-300 mt-1 block max-w-xl">
                Cash scholarships of ₹ 1,100 each + Deluxe Hardbound copy of <em>Bhagavad Gita As It Is</em> with original Sanskrit commentary.
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

      {/* ── 3 SIMPLE PARTICIPATION STEPS ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-vedic-primary bg-vedic-light px-3.5 py-1 rounded-full uppercase tracking-widest">
            सरल प्रक्रिया • 3 Easy Steps
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-3">
            How to Take the Online Examination
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            The entire process is online, seamless, and takes less than a minute to get started.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((st, i) => (
            <div
              key={st.step}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-card hover:shadow-elevated transition-all overflow-hidden flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={st.image}
                    alt={st.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
                  <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-md text-slate-900 text-xs font-extrabold px-3 py-1 rounded-full shadow-xs">
                    {st.badge}
                  </span>
                  <span className="absolute bottom-3 right-3 text-3xl font-extrabold text-white/90 font-mono">
                    {st.step}
                  </span>
                </div>

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
                <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
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

      {/* ── CONTEST TRACKS ── */}
      <section id="contests" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-vedic-primary bg-vedic-light px-3 py-1 rounded-full uppercase tracking-widest">
            Class 9th to 12th Track
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-3">
            Active Contests & Examination Tracks
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Main state competition for secondary & higher secondary students with instant practice mocks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {exams.map((exam) => (
            <div
              key={exam.id}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-card hover:shadow-elevated transition-all flex flex-col justify-between overflow-hidden group"
            >
              <div>
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
                      <span className="text-slate-400 block text-[10px] uppercase">Top Prize</span>
                      <strong className="text-amber-700 font-bold">₹ 1,00,001/-</strong>
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded-xl">
                      <span className="text-slate-400 block text-[10px] uppercase">Registration</span>
                      <strong className="text-emerald-700 font-bold">100% Free</strong>
                    </div>
                  </div>
                </div>
              </div>

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

      {/* ── SYLLABUS & WHY BHAGAVAD GITA ── */}
      <section className="bg-gradient-to-r from-vedic-dark via-vedic-primary to-vedic-dark text-white py-16 sm:py-20 relative overflow-hidden">
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
                    <strong className="text-sm text-white block">Overcome Fear, Stress & Board Exam Anxiety</strong>
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

            {/* Sacred Quote Card */}
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

      {/* ── TESTIMONIALS ── */}
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

      {/* ── FAQ ── */}
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
              मध्य प्रदेश शासन एवं इस्कॉन उज्जैन
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Join 5,00,000+ Students Across 120 Districts
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 max-w-lg mx-auto font-light">
              Free registration for Class 9th to 12th. Receive your admit card instantly and start practicing with unlimited mocks.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/register"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-md transition cursor-pointer"
              >
                Register Now for Free
              </Link>
              <a
                href="https://whatsapp.com/channel/0029Va9xyzOfficialGitaContest"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-700 text-white transition cursor-pointer flex items-center justify-center gap-2"
              >
                <MessageCircle size={16} />
                <span>Join WhatsApp Channel</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
