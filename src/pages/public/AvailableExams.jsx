import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  Award,
  CheckCircle,
  HelpCircle,
  Search,
  Filter,
  Layers,
  ChevronRight,
  Shield,
  Sparkles,
  DollarSign,
  ArrowRight,
} from 'lucide-react';
import { useExam } from '../../context/ExamContext';
import { useAuth } from '../../context/AuthContext';
import Modal from '../../components/ui/Modal';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

export default function AvailableExams() {
  const { exams, registerCandidate } = useExam();
  const { user } = useAuth();

  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('all'); // all, free, paid, multi_stage
  const [selectedExam, setSelectedExam] = useState(null);
  const [enrollModalOpen, setEnrollModalOpen] = useState(false);
  const [enrollSuccess, setEnrollSuccess] = useState(null);

  // Form state for enrollment
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    school: user?.school || '',
    city: user?.city || '',
    category: 'Senior (Class 10-12)',
  });

  const filteredExams = exams.filter((exam) => {
    const matchesSearch =
      exam.name.toLowerCase().includes(search.toLowerCase()) ||
      exam.subtitle.toLowerCase().includes(search.toLowerCase()) ||
      exam.category.toLowerCase().includes(search.toLowerCase());

    if (!matchesSearch) return false;
    if (filterType === 'free') return exam.isFree;
    if (filterType === 'paid') return !exam.isFree;
    if (filterType === 'multi_stage') return exam.isMultiStage;
    return true;
  });

  const handleOpenEnroll = (exam) => {
    setSelectedExam(exam);
    setEnrollSuccess(null);
    setEnrollModalOpen(true);
  };

  const handleEnrollSubmit = (e) => {
    e.preventDefault();
    if (!selectedExam) return;

    const newCandidate = registerCandidate(
      {
        ...formData,
        category: formData.category,
      },
      selectedExam.id
    );

    setEnrollSuccess(newCandidate);
  };

  return (
    <div className="py-12 bg-vedic-cream/50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="gold" className="text-xs uppercase tracking-widest px-3 py-1">
            Official Examinations 2026-2027
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Available Bhagavad Gita Contests & Olympiads
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Browse our verified national examinations. From free student olympiads to executive leadership certifications, participate and earn recognized credentials.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
            <input
              type="text"
              placeholder="Search by exam name, topic, or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-vedic-teal focus:border-transparent bg-slate-50/50"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            {[
              { id: 'all', label: 'All Exams' },
              { id: 'free', label: 'Free Contests' },
              { id: 'multi_stage', label: 'Multi-Stage' },
              { id: 'paid', label: 'Certifications (Paid)' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterType(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                  filterType === tab.id
                    ? 'bg-vedic-primary text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Exams Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredExams.map((exam) => (
            <div
              key={exam.id}
              className="bg-white rounded-2xl border border-slate-200/90 hover:border-vedic-teal/50 shadow-xs hover:shadow-card transition-all flex flex-col justify-between overflow-hidden"
            >
              <div className="p-6 space-y-4">
                {/* Header row */}
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-200">
                        {exam.badge || exam.category}
                      </span>
                      {exam.isMultiStage && (
                        <span className="text-xs font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full border border-purple-200 flex items-center gap-1">
                          <Layers size={12} /> {exam.totalStages || 3} Stages
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 tracking-tight hover:text-vedic-primary transition">
                      {exam.name}
                    </h3>
                  </div>

                  <div className="text-right shrink-0">
                    {exam.isFree ? (
                      <span className="inline-block bg-emerald-100 text-emerald-800 font-extrabold text-xs px-2.5 py-1 rounded-full border border-emerald-300">
                        FREE
                      </span>
                    ) : (
                      <span className="inline-block bg-slate-900 text-white font-extrabold text-xs px-2.5 py-1 rounded-full">
                        ₹{exam.fee}
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {exam.subtitle || exam.overview}
                </p>

                {/* Key Meta Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-center">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Duration</span>
                    <strong className="text-xs text-slate-800">{exam.durationMinutes} Mins</strong>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-center">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Questions</span>
                    <strong className="text-xs text-slate-800">{exam.totalQuestions} MCQs</strong>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-center">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Passing</span>
                    <strong className="text-xs text-slate-800">{exam.passingPercentage}% Marks</strong>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-center">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Enrolled</span>
                    <strong className="text-xs text-slate-800">{(exam.enrolledCount || 1000).toLocaleString()}+</strong>
                  </div>
                </div>

                {/* Multi-stage summary if applicable */}
                {exam.isMultiStage && exam.stages && (
                  <div className="bg-purple-50/60 rounded-xl p-3 border border-purple-100 space-y-2">
                    <div className="text-[11px] font-bold text-purple-900 flex items-center gap-1.5">
                      <Sparkles size={13} className="text-purple-600" />
                      <span>Sequential Progression Model:</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {exam.stages.map((stg, i) => (
                        <div key={stg.id || i} className="bg-white p-2 rounded-lg border border-purple-100 text-xs">
                          <span className="text-[10px] font-bold text-purple-600 block">Stage {stg.stageNumber}</span>
                          <div className="font-semibold text-slate-800 truncate">{stg.title.split(':')[1] || stg.title}</div>
                          <span className="text-[10px] text-slate-400">{stg.durationMinutes}m • Pass: {stg.passingPercentage}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Card Footer */}
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
                <Link
                  to={`/contest/${exam.id}`}
                  className="text-xs font-bold text-slate-600 hover:text-vedic-primary transition flex items-center gap-1"
                >
                  <span>View Details & Syllabus</span>
                  <ChevronRight size={14} />
                </Link>

                <div className="flex items-center gap-2">
                  <Link
                    to={`/student/lobby/${exam.id}`}
                    className="px-3.5 py-2 rounded-xl text-xs font-semibold border border-slate-300 hover:bg-slate-100 text-slate-700 transition"
                  >
                    Test Room
                  </Link>
                  <Button
                    size="sm"
                    onClick={() => handleOpenEnroll(exam)}
                    className="font-bold"
                  >
                    {exam.isFree ? 'Enroll Free' : `Enroll (₹${exam.fee})`}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enrollment Modal */}
      <Modal
        isOpen={enrollModalOpen}
        onClose={() => setEnrollModalOpen(false)}
        title={selectedExam ? `Enroll: ${selectedExam.name}` : 'Exam Enrollment'}
        maxWidth="max-w-lg"
      >
        {enrollSuccess ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl mx-auto">
              ✓
            </div>
            <div>
              <h4 className="text-xl font-bold text-slate-900">Enrollment Confirmed!</h4>
              <p className="text-xs text-slate-500 mt-1">
                Your admission details have been registered into the central exam directory.
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 text-left border border-slate-200 text-xs space-y-1.5">
              <div><strong>Roll Number:</strong> <span className="font-mono text-vedic-primary font-bold">{enrollSuccess.rollNo}</span></div>
              <div><strong>Candidate Name:</strong> {enrollSuccess.name}</div>
              <div><strong>Exam:</strong> {selectedExam?.name}</div>
              <div><strong>Stage Status:</strong> Stage 1 Unlocked (Qualify with 60% to unlock Stage 2)</div>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <Link
                to="/student/dashboard"
                className="px-4 py-2.5 rounded-xl bg-vedic-primary text-white text-xs font-bold hover:bg-vedic-dark transition"
              >
                Go to Student Portal & Admit Card
              </Link>
              <Link
                to={`/student/lobby/${selectedExam?.id}`}
                className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-100 transition"
              >
                Go to Exam Room
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleEnrollSubmit} className="space-y-4">
            <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
              <Sparkles size={16} className="text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong>Simulated Enrollment:</strong> {selectedExam?.isFree ? '100% Free - No fees required!' : `Certification Fee: ₹${selectedExam?.fee} (Simulated Mock Checkout)`}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Full Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-vedic-teal focus:outline-none"
                placeholder="e.g. Arjun Sharma"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-vedic-teal focus:outline-none"
                  placeholder="name@example.com"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-vedic-teal focus:outline-none"
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">School / College / Org</label>
                <input
                  type="text"
                  value={formData.school}
                  onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-vedic-teal focus:outline-none"
                  placeholder="e.g. DPS R.K. Puram"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">City / State</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-vedic-teal focus:outline-none"
                  placeholder="e.g. New Delhi"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-vedic-teal focus:outline-none"
              >
                <option>Junior School (Class 4-8)</option>
                <option>Senior (Class 9-12)</option>
                <option>College Undergraduate / Postgraduate</option>
                <option>Working Professional / Open</option>
              </select>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => setEnrollModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm">
                Confirm Registration
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
