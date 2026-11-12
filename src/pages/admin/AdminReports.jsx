import React from 'react';
import { BarChart3, TrendingUp, Users, Award, Download, CheckCircle, PieChart } from 'lucide-react';
import { useExam } from '../../context/ExamContext';
import Button from '../../components/ui/Button';

export default function AdminReports() {
  const { candidates, results, exams } = useExam();

  const totalCandidates = candidates.length;
  const totalSubmissions = results.length;
  const passCount = results.filter((r) => r.resultStatus === 'pass').length;
  const passRate = totalSubmissions > 0 ? ((passCount / totalSubmissions) * 100).toFixed(1) : 100;

  const stateData = [
    { state: 'Delhi NCR', enrolled: 12450, qualifiedStage2: 8940, pct: 71.8 },
    { state: 'Maharashtra', enrolled: 8920, qualifiedStage2: 6420, pct: 72.0 },
    { state: 'Karnataka', enrolled: 7100, qualifiedStage2: 5210, pct: 73.4 },
    { state: 'West Bengal', enrolled: 5400, qualifiedStage2: 3880, pct: 71.9 },
    { state: 'Madhya Pradesh', enrolled: 4800, qualifiedStage2: 3410, pct: 71.0 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Examination Analytics & Zonal Reports
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Cross-state candidate participation, multi-stage qualification rates, and evaluation metrics.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button size="sm" variant="secondary" onClick={() => window.print()} icon={Download}>
            Export Executive Report (PDF)
          </Button>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Pass Rate (Min 60%)</span>
          <strong className="text-2xl font-extrabold text-emerald-700 block mt-1">{passRate}%</strong>
          <span className="text-xs text-slate-500 block mt-0.5">Stage 1 qualification threshold</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Submissions</span>
          <strong className="text-2xl font-extrabold text-slate-900 block mt-1">
            {totalSubmissions.toLocaleString()}
          </strong>
          <span className="text-xs text-slate-500 block mt-0.5">Completed test runs</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Registered</span>
          <strong className="text-2xl font-extrabold text-slate-900 block mt-1">
            {totalCandidates.toLocaleString()}
          </strong>
          <span className="text-xs text-slate-500 block mt-0.5">Admit cards issued</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Active Exam Tracks</span>
          <strong className="text-2xl font-extrabold text-purple-700 block mt-1">{exams.length} Tracks</strong>
          <span className="text-xs text-slate-500 block mt-0.5">Olympiad & Certifications</span>
        </div>
      </div>

      {/* Zonal Performance Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-sm text-slate-900">Zonal & State-wise Enrolment and Stage 2 Qualification</h3>
          <span className="text-xs text-slate-400 font-mono">Live Sync</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">State / Regional Hub</th>
                <th className="py-3 px-4 text-center">Enrolled Candidates</th>
                <th className="py-3 px-4 text-center">Stage 2 Qualified</th>
                <th className="py-3 px-4 text-center">Qualification Rate</th>
                <th className="py-3 px-4">Progression Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {stateData.map((row) => (
                <tr key={row.state} className="hover:bg-slate-50/80 transition">
                  <td className="py-3.5 px-4 font-bold text-slate-900">{row.state}</td>
                  <td className="py-3.5 px-4 text-center font-mono font-semibold">{row.enrolled.toLocaleString()}</td>
                  <td className="py-3.5 px-4 text-center font-mono text-emerald-700 font-bold">
                    {row.qualifiedStage2.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 text-center font-bold text-slate-800">{row.pct}%</td>
                  <td className="py-3.5 px-4">
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden max-w-[140px]">
                      <div className="h-full bg-vedic-primary rounded-full" style={{ width: `${row.pct}%` }} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
