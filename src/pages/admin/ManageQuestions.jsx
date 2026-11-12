import React, { useState } from 'react';
import { PlusCircle, Search, Edit2, Trash2, HelpCircle, CheckCircle, Sparkles, X } from 'lucide-react';
import { useExam } from '../../context/ExamContext';

export default function ManageQuestions() {
  const { questions, addQuestion, updateQuestion, deleteQuestion } = useExam();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterChapter, setFilterChapter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingQ, setEditingQ] = useState(null);

  const [formData, setFormData] = useState({
    chapter: 2,
    verse: '2.47',
    difficulty: 'Medium',
    marks: 2,
    negativeMarks: 0.5,
    shlokaText: '',
    question: '',
    questionHindi: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correctAnswer: 'A',
    explanation: '',
  });

  const handleOpenAdd = () => {
    setEditingQ(null);
    setFormData({
      chapter: 2,
      verse: '',
      difficulty: 'Medium',
      marks: 2,
      negativeMarks: 0.5,
      shlokaText: '',
      question: '',
      questionHindi: '',
      optionA: '',
      optionB: '',
      optionC: '',
      optionD: '',
      correctAnswer: 'A',
      explanation: '',
    });
    setShowModal(true);
  };

  const handleOpenEdit = (q) => {
    setEditingQ(q);
    setFormData({
      chapter: q.chapter || 2,
      verse: q.verse || '',
      difficulty: q.difficulty || 'Medium',
      marks: q.marks || 2,
      negativeMarks: q.negativeMarks || 0.5,
      shlokaText: q.shlokaText || '',
      question: q.question || '',
      questionHindi: q.questionHindi || '',
      optionA: q.options?.[0]?.text || '',
      optionB: q.options?.[1]?.text || '',
      optionC: q.options?.[2]?.text || '',
      optionD: q.options?.[3]?.text || '',
      correctAnswer: q.correctAnswer || 'A',
      explanation: q.explanation || '',
    });
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      chapter: Number(formData.chapter),
      verse: formData.verse,
      difficulty: formData.difficulty,
      marks: Number(formData.marks),
      negativeMarks: Number(formData.negativeMarks),
      shlokaText: formData.shlokaText,
      question: formData.question,
      questionHindi: formData.questionHindi,
      options: [
        { key: 'A', text: formData.optionA },
        { key: 'B', text: formData.optionB },
        { key: 'C', text: formData.optionC },
        { key: 'D', text: formData.optionD },
      ],
      correctAnswer: formData.correctAnswer,
      explanation: formData.explanation,
    };

    if (editingQ) {
      updateQuestion(editingQ.id, payload);
    } else {
      addQuestion(payload);
    }
    setShowModal(false);
  };

  const filtered = questions.filter((q) => {
    const matchesSearch =
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (q.verse && q.verse.includes(searchTerm));
    const matchesChapter = filterChapter === 'all' || String(q.chapter) === filterChapter;
    return matchesSearch && matchesChapter;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Question Bank Manager
          </h1>
          <p className="text-xs text-slate-500">
            Curate Bhagavad Gita multiple-choice questions, verses, answers, and explanations.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-700 text-white shadow-xs transition shrink-0"
        >
          <PlusCircle size={15} />
          <span>Add New Question</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search questions or verse ref..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600/20"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={filterChapter}
            onChange={(e) => setFilterChapter(e.target.value)}
            className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
          >
            <option value="all">All Chapters</option>
            {[2, 3, 4, 6, 9, 12, 18].map((c) => (
              <option key={c} value={String(c)}>Chapter {c}</option>
            ))}
          </select>
          <span className="text-xs text-slate-400 font-medium whitespace-nowrap">
            {filtered.length} of {questions.length} Questions
          </span>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {filtered.map((q, idx) => (
          <div
            key={q.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3"
          >
            <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-100 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-800">Q#{idx + 1}</span>
                {q.verse && (
                  <span className="bg-amber-50 text-amber-900 border border-amber-200 px-2 py-0.5 rounded font-mono font-semibold">
                    BG {q.verse}
                  </span>
                )}
                <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                  Chapter {q.chapter}
                </span>
                <span className="bg-purple-50 text-purple-700 px-2 py-0.5 rounded font-semibold">
                  {q.difficulty}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  +{q.marks}m / -{q.negativeMarks || 0}m
                </span>
                <button
                  onClick={() => handleOpenEdit(q)}
                  className="p-1 rounded-lg text-slate-400 hover:text-purple-600 hover:bg-purple-50"
                  title="Edit Question"
                >
                  <Edit2 size={14} />
                </button>
                <button
                  onClick={() => {
                    if (window.confirm("Delete this question from the bank?")) deleteQuestion(q.id);
                  }}
                  className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                  title="Delete Question"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

            {q.shlokaText && (
              <p className="font-shloka text-xs sm:text-sm text-amber-950 bg-amber-50/60 p-2.5 rounded-lg border border-amber-200/50">
                {q.shlokaText}
              </p>
            )}

            <h3 className="font-bold text-sm text-slate-900">{q.question}</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
              {q.options.map((opt) => (
                <div
                  key={opt.key}
                  className={`p-2.5 rounded-lg border flex items-center justify-between ${
                    opt.key === q.correctAnswer
                      ? 'bg-emerald-50 border-emerald-300 font-bold text-emerald-950'
                      : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  <span>
                    <strong>{opt.key}.</strong> {opt.text}
                  </span>
                  {opt.key === q.correctAnswer && (
                    <span className="text-[10px] text-emerald-700 uppercase font-bold">✓ Key</span>
                  )}
                </div>
              ))}
            </div>

            {q.explanation && (
              <p className="text-[11px] text-slate-500 pt-1">
                <strong>Explanation:</strong> {q.explanation}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Add / Edit Question Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-4 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900">
                {editingQ ? 'Edit Question' : 'Add New Question to Bank'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Chapter</label>
                  <input
                    type="number"
                    min="1"
                    max="18"
                    value={formData.chapter}
                    onChange={(e) => setFormData({ ...formData, chapter: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Verse (Ref)</label>
                  <input
                    type="text"
                    placeholder="e.g. 2.47"
                    value={formData.verse}
                    onChange={(e) => setFormData({ ...formData, verse: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Marks</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.marks}
                    onChange={(e) => setFormData({ ...formData, marks: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Neg. Marks</label>
                  <input
                    type="number"
                    step="0.25"
                    min="0"
                    value={formData.negativeMarks}
                    onChange={(e) => setFormData({ ...formData, negativeMarks: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Sanskrit Shloka Text (Optional)</label>
                <textarea
                  rows="2"
                  placeholder="कर्मण्येवाधिकारस्ते मा फलेषु कदाचन..."
                  value={formData.shlokaText}
                  onChange={(e) => setFormData({ ...formData, shlokaText: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl font-shloka"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Question (English) *</label>
                <textarea
                  required
                  rows="2"
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              {/* 4 Options */}
              <div className="space-y-2">
                <label className="block font-bold text-slate-700 uppercase">Answer Options & Correct Key</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-600">A.</span>
                    <input
                      type="text"
                      required
                      placeholder="Option A"
                      value={formData.optionA}
                      onChange={(e) => setFormData({ ...formData, optionA: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-600">B.</span>
                    <input
                      type="text"
                      required
                      placeholder="Option B"
                      value={formData.optionB}
                      onChange={(e) => setFormData({ ...formData, optionB: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-600">C.</span>
                    <input
                      type="text"
                      required
                      placeholder="Option C"
                      value={formData.optionC}
                      onChange={(e) => setFormData({ ...formData, optionC: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-600">D.</span>
                    <input
                      type="text"
                      required
                      placeholder="Option D"
                      value={formData.optionD}
                      onChange={(e) => setFormData({ ...formData, optionD: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Correct Option Key *</label>
                  <select
                    value={formData.correctAnswer}
                    onChange={(e) => setFormData({ ...formData, correctAnswer: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl font-bold text-emerald-800"
                  >
                    <option value="A">Option A</option>
                    <option value="B">Option B</option>
                    <option value="C">Option C</option>
                    <option value="D">Option D</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Difficulty Level</label>
                  <select
                    value={formData.difficulty}
                    onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Verse Explanation / Insight</label>
                <textarea
                  rows="2"
                  value={formData.explanation}
                  onChange={(e) => setFormData({ ...formData, explanation: e.target.value })}
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
                  Save Question
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
