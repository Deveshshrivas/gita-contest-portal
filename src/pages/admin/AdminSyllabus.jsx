import React, { useState } from 'react';
import { BookMarked, PlusCircle, Edit2, Trash2, CheckCircle, Search, Layers } from 'lucide-react';
import { MOCK_MATERIALS } from '../../mock/materials';
import Modal from '../../components/ui/Modal';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

export default function AdminSyllabus() {
  const [modules, setModules] = useState(MOCK_MATERIALS);
  const [selectedModule, setSelectedModule] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Curriculum & Chapter Syllabus Architecture
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage the 18 chapters of Bhagavad Gita mapped to Multi-Stage Examination tracks.
          </p>
        </div>
      </div>

      {/* Modules List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {modules.map((m) => (
          <div key={m.chapter} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full uppercase">
                  Chapter {m.chapter}
                </span>
                <h3 className="font-bold text-base text-slate-900 mt-1">{m.name}</h3>
                <span className="text-xs text-slate-400">{m.shlokasCount} Sanskrit Verses</span>
              </div>

              <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-200">
                Stage {m.chapter <= 6 ? 1 : m.chapter <= 12 ? 2 : 3} Exam
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {m.summary}
            </p>

            {m.keyVerse && (
              <div className="bg-amber-50/50 p-3 rounded-xl border border-amber-100 text-xs space-y-1">
                <span className="text-[10px] font-bold text-amber-800 block">Key Verse: {m.keyVerse.ref}</span>
                <p className="font-shloka text-amber-950 font-bold">{m.keyVerse.sanskrit}</p>
                <p className="text-slate-600 text-[11px] italic">{m.keyVerse.meaning}</p>
              </div>
            )}

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {m.topics?.map((t) => (
                  <span key={t} className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
