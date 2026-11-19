import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { User, Mail, Phone, BookOpen, MapPin, Building, ArrowRight, ShieldCheck, CheckCircle, Lock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useExam } from '../../context/ExamContext';
import { apiClient } from '../../services/apiClient';

export default function Register() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedExamId = searchParams.get('examId') || 'glc-2026';
  
  const { loginAsStudent } = useAuth();
  const { exams, registerCandidate } = useExam();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    category: 'Senior (Classes 9th to 12th)',
    school: '',
    city: '',
    language: 'English',
  });

  const [submitted, setSubmitted] = useState(false);
  const [newRollNo, setNewRollNo] = useState('');
  const [loading, setLoading] = useState(false);

  const targetExam = exams.find((e) => e.id === selectedExamId) || exams[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.school.trim() ||
      !formData.password ||
      formData.password.length < 6
    ) {
      return;
    }

    setLoading(true);
    const candidate = registerCandidate(formData, targetExam.id);

    try {
      await apiClient.register({
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        phone: formData.phone.trim(),
        role: 'student',
        category: formData.category,
        school: formData.school.trim(),
        city: formData.city.trim(),
        rollNo: candidate.rollNo,
      }).catch((err) => {
        console.info('[Register] Backend registration notice:', err.message);
      });
    } finally {
      loginAsStudent({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        school: formData.school,
        city: formData.city,
        category: formData.category,
        rollNo: candidate.rollNo,
      });

      setNewRollNo(candidate.rollNo);
      setSubmitted(true);
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl mx-auto">
          ✓
        </div>
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
          Registration Confirmed
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Congratulations, {formData.name}!
        </h1>
        <p className="text-sm text-slate-600 max-w-md mx-auto">
          You are officially registered for the <strong className="text-slate-900">{targetExam.name}</strong>.
        </p>

        {/* Generated Admit Card Box */}
        <div className="bg-white rounded-2xl border-2 border-emerald-500/80 p-6 text-left shadow-card space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="text-[11px] font-bold uppercase text-slate-400">Official Admit Card</span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Active Candidate</span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase">Candidate Name</span>
              <strong className="text-sm font-bold text-slate-900">{formData.name}</strong>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase">Roll Number</span>
              <strong className="text-sm font-mono font-bold text-vedic-primary">{newRollNo}</strong>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase">Exam Date</span>
              <strong className="text-slate-800">{targetExam.examLiveDate}</strong>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase">Exam Mode</span>
              <strong className="text-slate-800">Online Portal (45 Mins)</strong>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => navigate('/student/dashboard')}
            className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs sm:text-sm bg-vedic-primary hover:bg-vedic-dark text-white shadow-sm transition"
          >
            Go to Student Dashboard
          </button>

          <Link
            to="/student/lobby/gita-practice-mock"
            className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs sm:text-sm border border-slate-300 text-slate-700 hover:bg-slate-50 transition"
          >
            Take Free Practice Test Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      {/* Title */}
      <div className="text-center space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-vedic-primary bg-vedic-light px-3 py-1 rounded-full">
          National Candidate Enrollment
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Register for {targetExam.name}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Participation is 100% Free. Complete the form to receive your Roll Number and instant access.
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-card">
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Full Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Full Name (As you want on certificate) *
            </label>
            <div className="relative">
              <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                required
                placeholder="e.g. Arjun Sharma"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-vedic-primary/20 focus:border-vedic-primary"
              />
            </div>
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Email Address *
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-vedic-primary/20 focus:border-vedic-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Phone / WhatsApp Number *
              </label>
              <div className="relative">
                <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-vedic-primary/20 focus:border-vedic-primary"
                />
              </div>
            </div>
          </div>

          {/* Account Password */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Portal Account Password (for future logins) *
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                required
                minLength={6}
                placeholder="Enter a secure password (min 6 characters)"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-vedic-primary/20 focus:border-vedic-primary"
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Use this password with your email to log in to your student dashboard.</p>
          </div>

          {/* Category & Language */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Participation Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-vedic-primary/20 focus:border-vedic-primary"
              >
                <option value="Senior (Classes 9th to 12th)">Senior (Classes 9th to 12th)</option>
                <option value="Junior (Classes 5th to 8th)">Junior (Classes 5th to 8th)</option>
                <option value="College & Youth (Undergraduate / PG)">College & Youth (Undergraduate / PG)</option>
                <option value="Open / Working Professionals">Open / Working Professionals</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Language Preference *
              </label>
              <select
                value={formData.language}
                onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-vedic-primary/20 focus:border-vedic-primary"
              >
                <option value="English">English</option>
                <option value="Hindi">Hindi (हिंदी)</option>
                <option value="Bilingual">Bilingual (English + Hindi Shlokas)</option>
              </select>
            </div>
          </div>

          {/* School / College & City */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                School / College / Organization *
              </label>
              <div className="relative">
                <Building size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Delhi Public School"
                  value={formData.school}
                  onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-vedic-primary/20 focus:border-vedic-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                City / State *
              </label>
              <div className="relative">
                <MapPin size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="e.g. New Delhi, Delhi"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-vedic-primary/20 focus:border-vedic-primary"
                />
              </div>
            </div>
          </div>

          {/* Agreement */}
          <div className="pt-2 flex items-start gap-2.5 text-xs text-slate-500">
            <input type="checkbox" required defaultChecked className="rounded text-vedic-primary mt-0.5" />
            <span>
              I agree to abide by the examination honor code and confirm that the details provided are accurate for certificate generation.
            </span>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl font-bold text-sm bg-vedic-primary hover:bg-vedic-dark text-white shadow-md shadow-vedic-primary/20 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
          >
            <span>{loading ? 'Registering Candidate...' : 'Complete Free Registration'}</span>
            <ArrowRight size={16} />
          </button>

        </form>
      </div>

    </div>
  );
}
