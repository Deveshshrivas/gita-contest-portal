import React, { useState } from 'react';
import { ShieldCheck, Search, Award, CheckCircle, AlertCircle, Printer } from 'lucide-react';
import { useExam } from '../../context/ExamContext';
import CertificateModal from '../../components/common/CertificateModal';

export default function Verification() {
  const { results, candidates } = useExam();
  const [query, setQuery] = useState('');
  const [searched, setSearched] = useState(false);
  const [matchResult, setMatchResult] = useState(null);
  const [showCertificate, setShowCertificate] = useState(false);

  const handleVerify = (e) => {
    e.preventDefault();
    setSearched(true);
    const cleanQuery = query.trim().toUpperCase();

    // Look for matching certificate or roll number
    const found = results.find(
      (r) =>
        (r.certificateId && r.certificateId.toUpperCase() === cleanQuery) ||
        (r.rollNo && r.rollNo.toUpperCase() === cleanQuery)
    );

    if (found) {
      setMatchResult(found);
    } else {
      // Check candidate list
      const candidateFound = candidates.find(
        (c) => c.rollNo && c.rollNo.toUpperCase() === cleanQuery
      );
      if (candidateFound) {
        setMatchResult({
          candidateName: candidateFound.name,
          rollNo: candidateFound.rollNo,
          examName: "Gita Leadership Contest 2026",
          resultStatus: "registered",
          meritTier: "Candidate Enrolled • Exam Pending",
          submittedAt: candidateFound.registeredAt,
          score: "Pending",
          totalMarks: 32,
          percentage: "N/A"
        });
      } else {
        setMatchResult(null);
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
      
      {/* Title */}
      <div className="text-center space-y-3">
        <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-2">
          <ShieldCheck size={28} />
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Certificate & Credential Verification
        </h1>
        <p className="text-sm text-slate-600">
          Verify the authenticity of any Gita Contest Certificate of Merit or Student Admit Card Roll Number.
        </p>
      </div>

      {/* Verification Search Form */}
      <form onSubmit={handleVerify} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-card space-y-4">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
          Enter Certificate ID or Student Roll Number
        </label>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="e.g. CERT-GLC-2026-0914 or GLC-2026-8843"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-vedic-primary/20 focus:border-vedic-primary font-mono uppercase"
            />
          </div>

          <button
            type="submit"
            className="px-7 py-3 rounded-xl font-bold text-sm bg-vedic-primary hover:bg-vedic-dark text-white shadow-sm transition shrink-0"
          >
            Verify Credential
          </button>
        </div>

        <p className="text-[11px] text-slate-400 pt-1">
          Demo verification keys to test: <button type="button" onClick={() => setQuery("CERT-GLC-2026-0914")} className="underline text-vedic-primary">CERT-GLC-2026-0914</button> or <button type="button" onClick={() => setQuery("GLC-2026-8843")} className="underline text-vedic-primary">GLC-2026-8843</button>
        </p>
      </form>

      {/* Verification Result Display */}
      {searched && (
        <div className="transition-all">
          {matchResult ? (
            <div className="bg-emerald-50/70 border-2 border-emerald-500 rounded-3xl p-6 sm:p-8 space-y-5">
              <div className="flex items-center gap-3">
                <CheckCircle className="text-emerald-600 shrink-0" size={28} />
                <div>
                  <h3 className="font-extrabold text-lg text-emerald-950">
                    Official Authenticated Credential
                  </h3>
                  <span className="text-xs text-emerald-700">
                    Verified by National Gita Examination Authority, ISKCON
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-emerald-200 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-slate-600">
                <div>
                  <span className="text-slate-400 block text-[11px] uppercase">Candidate Name</span>
                  <strong className="text-sm font-bold text-slate-900">{matchResult.candidateName}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px] uppercase">Roll Number</span>
                  <strong className="text-sm font-mono font-bold text-slate-900">{matchResult.rollNo}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px] uppercase">Contest Name</span>
                  <strong className="text-sm font-bold text-slate-900">{matchResult.examName}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px] uppercase">Score & Result</span>
                  <strong className="text-sm font-bold text-vedic-primary">
                    {matchResult.score} / {matchResult.totalMarks} ({matchResult.percentage}%)
                  </strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px] uppercase">Distinction Status</span>
                  <strong className="text-sm font-bold text-amber-700">{matchResult.meritTier}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px] uppercase">Date of Record</span>
                  <strong className="text-sm font-bold text-slate-900">
                    {new Date(matchResult.submittedAt || Date.now()).toLocaleDateString('en-IN')}
                  </strong>
                </div>
              </div>

              {matchResult.certificateId && (
                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => setShowCertificate(true)}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold bg-vedic-primary hover:bg-vedic-dark text-white shadow-xs transition"
                  >
                    <Award size={16} />
                    <span>View Digital Certificate</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-rose-50 border border-rose-200 rounded-3xl p-8 text-center space-y-2">
              <AlertCircle size={32} className="text-rose-500 mx-auto" />
              <h3 className="font-bold text-base text-rose-900">No Record Found</h3>
              <p className="text-xs text-rose-700 max-w-md mx-auto">
                No matching candidate or certificate found for &ldquo;{query}&rdquo;. Please verify the Roll Number or Certificate ID and try again.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Certificate Modal */}
      {showCertificate && matchResult && (
        <CertificateModal
          result={matchResult}
          onClose={() => setShowCertificate(false)}
        />
      )}

    </div>
  );
}
