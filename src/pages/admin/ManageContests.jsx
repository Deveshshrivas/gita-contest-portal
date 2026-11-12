import React, { useState } from 'react';
import { PlusCircle, Edit2, Trash2, Calendar, Clock, CheckCircle, X } from 'lucide-react';
import { useExam } from '../../context/ExamContext';

export default function ManageContests() {
  const { exams, addExam, updateExam, deleteExam } = useExam();
  const [showModal, setShowModal] = useState(false);
  const [editingExam, setEditingExam] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    category: 'Senior (Classes 9th to 12th)',
    durationMinutes: 45,
    totalQuestions: 12,
    passingMarks: 16,
    negativeMarking: true,
    negativeMarkValue: 0.5,
    examLiveDate: '2026-12-06',
    description: '',
  });

  const handleOpenAdd = () => {
    setEditingExam(null);
    setFormData({
      name: '',
      category: 'Senior (Classes 9th to 12th)',
      durationMinutes: 45,
      totalQuestions: 12,
      passingMarks: 16,
      negativeMarking: true,
      negativeMarkValue: 0.5,
      examLiveDate: '2026-12-06',
      description: '',
    });
    setShowModal(true);
  };

  const handleOpenEdit = (exam) => {
    setEditingExam(exam);
    setFormData({
      name: exam.name,
      category: exam.category,
      durationMinutes: exam.durationMinutes,
      totalQuestions: exam.totalQuestions,
      passingMarks: exam.passingMarks,
      negativeMarking: exam.negativeMarking,
      negativeMarkValue: exam.negativeMarkValue,
      examLiveDate: exam.examLiveDate,
      description: exam.description || '',
    });
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingExam) {
      updateExam(editingExam.id, formData);
    } else {
      addExam({
        ...formData,
        feeType: 'Free',
        feeAmount: 0,
        badge: 'Contest Track',
        syllabus: ['Bhagavad Gita Wisdom', 'Leadership Principles', 'Mind Mastery'],
        prizes: [
          { rank: '1st Prize', reward: '₹21,000 + Gold Medal' },
          { rank: 'All Participants', reward: 'Official Certificate of Merit' }
        ]
      });
    }
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Contests & Exam Schedules
          </h1>
          <p className="text-xs text-slate-500">
            Configure examination schedules, durations, passing criteria, and eligibility.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-700 text-white shadow-xs transition shrink-0"
        >
          <PlusCircle size={15} />
          <span>Create New Contest</span>
        </button>
      </div>

      {/* Contests Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[11px] font-bold tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-5">Contest Name</th>
                <th className="py-3 px-5">Category</th>
                <th className="py-3 px-5">Duration</th>
                <th className="py-3 px-5">Questions / Pass</th>
                <th className="py-3 px-5">Negative Marking</th>
                <th className="py-3 px-5">Exam Date</th>
                <th className="py-3 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {exams.map((exam) => (
                <tr key={exam.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-4 px-5">
                    <strong className="text-slate-900 block font-semibold">{exam.name}</strong>
                    <span className="text-[11px] text-slate-400 font-mono">ID: {exam.id}</span>
                  </td>
                  <td className="py-4 px-5 text-slate-600">
                    {exam.category}
                  </td>
                  <td className="py-4 px-5 text-slate-600">
                    {exam.durationMinutes} Mins
                  </td>
                  <td className="py-4 px-5 text-slate-600">
                    {exam.totalQuestions} Qs • Pass: {exam.passingMarks}
                  </td>
                  <td className="py-4 px-5">
                    {exam.negativeMarking ? (
                      <span className="text-[11px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                        -{exam.negativeMarkValue || 0.5} Mark
                      </span>
                    ) : (
                      <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        None
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-5 font-semibold text-slate-800">
                    {exam.examLiveDate}
                  </td>
                  <td className="py-4 px-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEdit(exam)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-purple-600 hover:bg-purple-50 transition"
                        title="Edit Contest"
                      >
                        <Edit2 size={15} />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete ${exam.name}?`)) deleteExam(exam.id);
                        }}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition"
                        title="Delete Contest"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900">
                {editingExam ? 'Edit Contest Settings' : 'Create New Contest Track'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Contest Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Gita Leadership Contest (GLC) 2026"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Duration (Minutes)</label>
                  <input
                    type="number"
                    min="10"
                    max="180"
                    value={formData.durationMinutes}
                    onChange={(e) => setFormData({ ...formData, durationMinutes: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Total MCQs</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={formData.totalQuestions}
                    onChange={(e) => setFormData({ ...formData, totalQuestions: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Passing Marks</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.passingMarks}
                    onChange={(e) => setFormData({ ...formData, passingMarks: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Live Exam Date</label>
                  <input
                    type="text"
                    value={formData.examLiveDate}
                    onChange={(e) => setFormData({ ...formData, examLiveDate: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Eligibility Category</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Contest Description</label>
                <textarea
                  rows="2"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-purple-600 text-white font-bold hover:bg-purple-700 shadow-xs"
                >
                  Save Contest
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
