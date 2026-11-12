import React, { useState, useEffect } from 'react';
import {
  Search,
  Download,
  Users,
  Mail,
  Phone,
  MapPin,
  Building,
  Printer,
  Eye,
  CheckCircle,
  Award,
  UserPlus,
  BookOpen,
} from 'lucide-react';
import { useExam } from '../../context/ExamContext';
import { mockApi } from '../../services/mockApi';
import { apiClient } from '../../services/apiClient';
import Modal from '../../components/ui/Modal';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

export default function ManageCandidates() {
  const { exams } = useExam();
  const [candidateList, setCandidateList] = useState(() => mockApi.getStudents());
  const [search, setSearch] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [admitCardModal, setAdmitCardModal] = useState(false);
  const [enrollModal, setEnrollModal] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // New Candidate Enrollment Form State
  const [newCandidate, setNewCandidate] = useState({
    name: '',
    email: '',
    phone: '',
    category: 'Senior (Classes 9th to 12th)',
    examId: exams[0]?.id || 'glc-2026',
    school: '',
    city: '',
    state: 'Delhi',
    assignedCenter: 'Delhi Public School Center',
  });

  // Pull live registered students from backend database if accessible
  useEffect(() => {
    let isMounted = true;
    apiClient
      .getUsers({ role: 'student' })
      .then((res) => {
        if (!isMounted) return;
        const liveUsers = Array.isArray(res) ? res : res?.data || res?.users || [];
        if (liveUsers.length > 0) {
          const normalized = liveUsers.map((u) => ({
            id: u.id || u._id,
            rollNo: u.rollNo || `GLC-2026-${Math.floor(1000 + Math.random() * 9000)}`,
            name: u.name,
            email: u.email,
            phone: u.phone,
            school: u.school || 'Self Study',
            city: u.city || 'Delhi',
            category: u.category || 'Senior (Class 10-12)',
            currentStage: u.currentStage || 1,
            attendance: u.status === 'active' ? 'Registered' : u.status,
            assignedCenter: u.assignedCenter || 'National Online Center',
          }));

          // Merge without duplicate emails
          setCandidateList((prev) => {
            const existingEmails = new Set(prev.map((c) => c.email.toLowerCase()));
            const incoming = normalized.filter((u) => !existingEmails.has(u.email.toLowerCase()));
            return [...prev, ...incoming];
          });
        }
      })
      .catch((err) => {
        console.info('[ManageCandidates] Using local candidate store:', err.message);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const filtered = candidateList.filter(
    (c) =>
      (c.name || '').toLowerCase().includes(search.toLowerCase()) ||
      (c.rollNo || '').toLowerCase().includes(search.toLowerCase()) ||
      (c.city || '').toLowerCase().includes(search.toLowerCase()) ||
      (c.school || '').toLowerCase().includes(search.toLowerCase())
  );

  const handlePromoteStage = (candidate) => {
    const nextStage = (candidate.currentStage || 1) + 1;
    if (nextStage > 3) {
      alert('Candidate has already reached Stage 3 Grand Finale!');
      return;
    }

    mockApi.promoteStudentStage(candidate.id, nextStage);
    setCandidateList(mockApi.getStudents());
    setSuccessMsg(`${candidate.name} has been promoted to Stage ${nextStage}!`);
    setTimeout(() => setSuccessMsg(null), 4000);
  };

  const handleOpenAdmitCard = (candidate) => {
    setSelectedCandidate(candidate);
    setAdmitCardModal(true);
  };

  const handleEnrollSubmit = async (e) => {
    e.preventDefault();
    if (!newCandidate.name.trim() || !newCandidate.email.trim()) return;

    setIsSubmitting(true);
    try {
      const rollNo = `GLC-2026-${Math.floor(1000 + Math.random() * 9000)}`;

      // Attempt backend persistence
      let created = null;
      try {
        const res = await apiClient.createUser({
          ...newCandidate,
          role: 'student',
          password: 'Student@2026',
          rollNo,
        });
        created = res?.data || res;
      } catch (err) {
        console.warn('[ManageCandidates] Backend enrollment sync warning:', err.message);
      }

      const enrolledCandidate = {
        id: created?._id || created?.id || `std-${Date.now()}`,
        rollNo: created?.rollNo || rollNo,
        name: newCandidate.name.trim(),
        email: newCandidate.email.trim().toLowerCase(),
        phone: newCandidate.phone.trim(),
        category: newCandidate.category,
        examId: newCandidate.examId,
        school: newCandidate.school.trim() || 'Self Study',
        city: newCandidate.city.trim() || 'Delhi',
        state: newCandidate.state.trim() || 'Delhi',
        assignedCenter: newCandidate.assignedCenter.trim(),
        currentStage: 1,
        attendance: 'Registered',
        registeredAt: new Date().toISOString(),
      };

      mockApi.registerStudent(enrolledCandidate);
      setCandidateList((prev) => [enrolledCandidate, ...prev]);

      setSuccessMsg(
        `Candidate "${enrolledCandidate.name}" enrolled successfully with Roll Number ${enrolledCandidate.rollNo}!`
      );
      setTimeout(() => setSuccessMsg(null), 5000);

      // Reset form & close
      setNewCandidate({
        name: '',
        email: '',
        phone: '',
        category: 'Senior (Classes 9th to 12th)',
        examId: exams[0]?.id || 'glc-2026',
        school: '',
        city: '',
        state: 'Delhi',
        assignedCenter: 'Delhi Public School Center',
      });
      setEnrollModal(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const exportCSV = () => {
    const headers = ["Roll No", "Name", "Email", "Phone", "School", "City", "Category", "Current Stage", "Attendance"];
    const rows = filtered.map(c => [
      c.rollNo,
      `"${c.name}"`,
      c.email,
      c.phone || '',
      `"${c.school}"`,
      `"${c.city}"`,
      `"${c.category}"`,
      `Stage ${c.currentStage || 1}`,
      c.attendance || 'Registered'
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `gita_candidates_stage_roster_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Registered Candidates & Multi-Stage Progression
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage student registrations, center allocations, stage promotions, and admit cards.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            size="sm"
            icon={UserPlus}
            onClick={() => setEnrollModal(true)}
            className="font-bold bg-vedic-primary hover:bg-vedic-dark text-white cursor-pointer"
          >
            + Enroll New Candidate
          </Button>

          <button
            onClick={exportCSV}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 shadow-xs transition shrink-0 cursor-pointer"
          >
            <Download size={14} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {successMsg && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <CheckCircle size={16} className="text-emerald-600 shrink-0" />
            <span>{successMsg}</span>
          </div>
          <button
            onClick={() => setSuccessMsg(null)}
            className="text-emerald-700 hover:text-emerald-900 text-xs font-bold"
          >
            ✕
          </button>
        </div>
      )}

      {/* Search Bar */}
      <div className="flex items-center justify-between gap-4 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search candidate name, roll no, city, school..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-vedic-teal"
          />
        </div>
        <span className="text-xs text-slate-500 font-semibold whitespace-nowrap">
          {filtered.length} Candidates Enrolled
        </span>
      </div>

      {/* Candidates Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Candidate Name</th>
                <th className="py-3 px-4">Roll Number</th>
                <th className="py-3 px-4">Current Stage</th>
                <th className="py-3 px-4">School & Center</th>
                <th className="py-3 px-4">Attendance</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    No candidates registered yet. Click "+ Enroll New Candidate" to add students.
                  </td>
                </tr>
              ) : (
                filtered.map((c) => {
                  const stageNum = c.currentStage || 1;

                  return (
                    <tr key={c.id} className="hover:bg-slate-50/80 transition">
                      <td className="py-3.5 px-4">
                        <strong className="text-slate-900 block font-semibold">{c.name}</strong>
                        <span className="text-[11px] text-slate-400">{c.email}</span>
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-vedic-primary">
                        {c.rollNo}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
                          <Award size={12} className="text-purple-600" />
                          Stage {stageNum} {stageNum === 1 ? '(Prelims)' : stageNum === 2 ? '(Semi-Final)' : '(Grand Finale)'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-medium text-slate-800">{c.school}</div>
                        <div className="text-slate-500 text-[11px]">{c.city} • Center: {c.assignedCenter || 'National Hub'}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="text-[10px] font-bold uppercase text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                          {c.attendance || 'Registered'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Button
                            size="xs"
                            variant="outline"
                            onClick={() => handleOpenAdmitCard(c)}
                            icon={Printer}
                          >
                            Admit Card
                          </Button>
                          {stageNum < 3 && (
                            <Button
                              size="xs"
                              onClick={() => handlePromoteStage(c)}
                              className="font-bold text-[10px]"
                            >
                              Promote to Stage {stageNum + 1}
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── ENROLL NEW CANDIDATE MODAL ── */}
      <Modal
        isOpen={enrollModal}
        onClose={() => setEnrollModal(false)}
        title="Enroll New Examination Candidate"
        maxWidth="max-w-xl"
      >
        <form onSubmit={handleEnrollSubmit} className="space-y-4">
          <p className="text-xs text-slate-500">
            Manually register a student candidate for the Gita Examination and allocate their examination center and roll number.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Candidate Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Radheshyam Sharma"
                value={newCandidate.name}
                onChange={(e) => setNewCandidate({ ...newCandidate, name: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-vedic-teal focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                required
                placeholder="candidate@example.com"
                value={newCandidate.email}
                onChange={(e) => setNewCandidate({ ...newCandidate, email: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-vedic-teal focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Phone / WhatsApp Number
              </label>
              <input
                type="tel"
                placeholder="+91 98765 43210"
                value={newCandidate.phone}
                onChange={(e) => setNewCandidate({ ...newCandidate, phone: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-vedic-teal focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Participation Category *
              </label>
              <select
                value={newCandidate.category}
                onChange={(e) => setNewCandidate({ ...newCandidate, category: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-vedic-teal focus:outline-none bg-white font-medium"
              >
                <option value="Senior (Classes 9th to 12th)">Senior (Classes 9th to 12th)</option>
                <option value="Junior (Classes 5th to 8th)">Junior (Classes 5th to 8th)</option>
                <option value="College & Youth (Undergraduate / PG)">College & Youth (Undergraduate / PG)</option>
                <option value="Open / Working Professionals">Open / Working Professionals</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Enrolled Examination *
              </label>
              <select
                value={newCandidate.examId}
                onChange={(e) => setNewCandidate({ ...newCandidate, examId: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-vedic-teal focus:outline-none bg-white font-medium"
              >
                {exams.map((exam) => (
                  <option key={exam.id} value={exam.id}>
                    {exam.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                School / College / Organization
              </label>
              <input
                type="text"
                placeholder="e.g. Kendriya Vidyalaya"
                value={newCandidate.school}
                onChange={(e) => setNewCandidate({ ...newCandidate, school: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-vedic-teal focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                City / State *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. New Delhi, Delhi"
                value={newCandidate.city}
                onChange={(e) => setNewCandidate({ ...newCandidate, city: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-vedic-teal focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Assigned Examination Center
              </label>
              <input
                type="text"
                value={newCandidate.assignedCenter}
                onChange={(e) => setNewCandidate({ ...newCandidate, assignedCenter: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-vedic-teal focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setEnrollModal(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={isSubmitting}
              className="bg-vedic-primary hover:bg-vedic-dark text-white font-bold cursor-pointer"
            >
              {isSubmitting ? 'Enrolling Candidate...' : 'Confirm Candidate Enrollment'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Admit Card Preview Modal */}
      <Modal
        isOpen={admitCardModal}
        onClose={() => setAdmitCardModal(false)}
        title="Official Candidate Hall Ticket / Admit Card"
        maxWidth="max-w-lg"
      >
        {selectedCandidate && (
          <div className="space-y-4">
            <div className="border-2 border-vedic-primary rounded-2xl p-6 bg-amber-50/20 text-xs space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-shloka">🕉️</span>
                  <div>
                    <span className="font-extrabold text-sm text-slate-900 block">Gita Leadership Contest 2026</span>
                    <span className="text-[10px] text-slate-500 uppercase">National Examination Board</span>
                  </div>
                </div>
                <span className="font-mono text-xs font-bold text-vedic-primary bg-vedic-light px-2.5 py-1 rounded">
                  {selectedCandidate.rollNo}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-slate-700">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Candidate Name</span>
                  <strong className="text-slate-900 text-sm">{selectedCandidate.name}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Category</span>
                  <strong className="text-slate-900">{selectedCandidate.category || 'Senior'}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Exam Date</span>
                  <strong className="text-slate-900">06 Dec 2026, 10:00 AM IST</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Assigned Center</span>
                  <strong className="text-slate-900">{selectedCandidate.assignedCenter || 'Delhi Center'}</strong>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-600">
                <strong>Current Stage:</strong> Stage {selectedCandidate.currentStage || 1} • Keep photo ID and internet connection ready.
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <Button size="sm" onClick={() => window.print()} icon={Printer}>
                Print Admit Card
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
