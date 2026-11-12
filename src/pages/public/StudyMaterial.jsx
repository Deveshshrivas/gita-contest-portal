import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Search, Sparkles, CheckCircle, PlayCircle, Download } from 'lucide-react';
import { STUDY_MODULES } from '../../data/studyMaterials';

export default function StudyMaterial() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('all');

  const filtered = STUDY_MODULES.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.keyVerse.sanskrit.includes(searchTerm);

    const matchesChapter =
      selectedChapter === 'all' || String(m.chapter) === selectedChapter;

    return matchesSearch && matchesChapter;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-vedic-primary bg-vedic-light px-3 py-1 rounded-full">
          Official Preparation Resources
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Syllabus & Study Notes
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          Curated chapter overviews, foundational Sanskrit shlokas, and key philosophical principles to help you excel in the national contest.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search verse, topic, or concept..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-vedic-primary/20 focus:border-vedic-primary transition"
          />
        </div>

        {/* Chapter selector */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 text-xs">
          <button
            onClick={() => setSelectedChapter('all')}
            className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition ${
              selectedChapter === 'all'
                ? 'bg-vedic-primary text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Chapters
          </button>
          {[2, 3, 4, 6, 12, 18].map((ch) => (
            <button
              key={ch}
              onClick={() => setSelectedChapter(String(ch))}
              className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition ${
                selectedChapter === String(ch)
                  ? 'bg-vedic-primary text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Ch. {ch}
            </button>
          ))}
        </div>
      </div>

      {/* Modules List */}
      <div className="space-y-6">
        {filtered.map((module) => (
          <div
            key={module.chapter}
            className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-card space-y-6 hover:border-vedic-teal/40 transition-colors"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-lg bg-vedic-light text-vedic-dark flex items-center justify-center font-bold text-sm">
                  {module.chapter}
                </span>
                <h2 className="text-xl font-bold text-slate-900">
                  Chapter {module.chapter}: {module.name}
                </h2>
              </div>
              <span className="text-xs text-slate-500 font-medium">
                {module.shlokasCount} Sanskrit Verses
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {module.summary}
            </p>

            {/* Key Shloka Box */}
            <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-5 space-y-2 text-amber-950">
              <div className="flex items-center justify-between text-xs font-bold text-amber-800">
                <span className="flex items-center gap-1.5">
                  <Sparkles size={14} /> Key Shloka ({module.keyVerse.ref})
                </span>
                <span className="text-[11px] font-semibold bg-amber-200/60 px-2 py-0.5 rounded">
                  Must Memorize
                </span>
              </div>
              <p className="font-shloka text-base sm:text-lg font-semibold leading-relaxed pt-1">
                {module.keyVerse.sanskrit}
              </p>
              <p className="text-xs sm:text-sm text-slate-700 italic pt-1">
                &ldquo;{module.keyVerse.meaning}&rdquo;
              </p>
            </div>

            {/* Key Topics Covered */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                Core Themes Tested in Examination:
              </span>
              <div className="flex flex-wrap gap-2">
                {module.topics.map((t, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-medium"
                  >
                    <CheckCircle size={12} className="text-emerald-600" />
                    <span>{t}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Practice Link */}
            <div className="pt-2 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Ready to test your knowledge on Chapter {module.chapter}?
              </span>
              <Link
                to="/student/lobby/gita-practice-mock"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-vedic-primary hover:text-vedic-dark"
              >
                <PlayCircle size={14} />
                <span>Practice MCQs →</span>
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
