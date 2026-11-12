import React, { useState } from 'react';
import { Award, Download, Search, Printer, CheckCircle, XCircle } from 'lucide-react';
import { useExam } from '../../context/ExamContext';
import CertificateModal from '../../components/common/CertificateModal';

export default function ManageResults() {
  const { results } = useExam();
  const [search, setSearch] = useState('');
  const [selectedResult, setSelectedResult] = useState(null);

  const filtered = results.filter(
    (r) =>
      r.candidateName.toLowerCase().includes(search.toLowerCase()) ||
      r.rollNo.toLowerCase().includes(search.toLowerCase()) ||
      (r.certificateId && r.certificateId.toLowerCase().includes(search.toLowerCase()))
  );

  const exportCSV = () => {
    const headers = ["Cert ID", "Roll No", "Candidate Name", "Exam Name", "Score", "Total Marks", "Percentage", "Status", "Merit Tier", "Date"];
    const rows = filtered.map(r => [
      r.certificateId || '',
      r.rollNo,
      `"${r.candidateName}"`,
      `"${r.examName}"`,
      r.score,
      r.totalMarks,
      `${r.percentage}%`,
      r.resultStatus,
      `"${r.meritTier}"`,
      r.submittedAt
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `gita_results_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Exam Results & Certificate Records
          </h1>
          <p className="text-xs text-slate-500">
            View student scorecards, percentage calculations, and print verified certificates.
          </p>
        </div>

        <button
          onClick={exportCSV}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 shadow-xs transition shrink-0"
        >
          <Download size={15} />
          <span>Export Scorecards (CSV)</span>
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center justify-between gap-4 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search candidate, roll no, cert ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600/20"
          />
        </div>
        <span className="text-xs text-slate-500 font-semibold whitespace-nowrap">
          {filtered.length} Evaluated Results
        </span>
      </div>

      {/* Results Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[11px] font-bold tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-5">Candidate</th>
                <th className="py-3 px-5">Roll No</th>
                <th className="py-3 px-5">Contest Track</th>
                <th className="py-3 px-5">Score</th>
                <th className="py-3 px-5">Percentage</th>
                <th className="py-3 px-5">Distinction</th>
                <th className="py-3 px-5 text-right">Certificate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filtered.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3.5 px-5">
                    <strong className="text-slate-900 block font-semibold">{r.candidateName}</strong>
                    <span className="text-[11px] text-slate-400 font-mono">{r.certificateId}</span>
                  </td>
                  <td className="py-3.5 px-5 font-mono font-bold text-slate-800">
                    {r.rollNo}
                  </td>
                  <td className="py-3.5 px-5 text-slate-600">
                    {r.examName}
                  </td>
                  <td className="py-3.5 px-5 font-bold text-vedic-primary">
                    {r.score} / {r.totalMarks}
                  </td>
                  <td className="py-3.5 px-5 font-bold text-slate-900">
                    {r.percentage}%
                  </td>
                  <td className="py-3.5 px-5">
                    <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                      {r.meritTier || 'Pass'}
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-right">
                    <button
                      onClick={() => setSelectedResult(r)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-purple-50 text-purple-700 hover:bg-purple-100 transition"
                    >
                      <Award size={13} />
                      <span>Certificate</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Certificate Modal */}
      {selectedResult && (
        <CertificateModal
          result={selectedResult}
          onClose={() => setSelectedResult(null)}
        />
      )}

    </div>
  );
}
