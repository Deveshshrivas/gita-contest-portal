import React, { useState } from 'react';
import {
  HeartHandshake,
  Download,
  Search,
  Filter,
  FileCheck2,
  DollarSign,
  TrendingUp,
  Award,
  Users,
} from 'lucide-react';
import { mockApi } from '../../services/mockApi';
import Modal from '../../components/ui/Modal';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

export default function AdminDonations() {
  const [donations, setDonations] = useState(() => mockApi.getDonations());
  const [campaigns] = useState(() => mockApi.getCampaigns());
  const [search, setSearch] = useState('');
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  const filtered = donations.filter(
    (d) =>
      d.donorName.toLowerCase().includes(search.toLowerCase()) ||
      d.receiptNo.toLowerCase().includes(search.toLowerCase()) ||
      d.panNumber.toLowerCase().includes(search.toLowerCase()) ||
      d.campaignTitle.toLowerCase().includes(search.toLowerCase())
  );

  const totalFunds = donations.reduce((sum, d) => sum + (d.amount || 0), 0);
  const totalStudents = donations.reduce((sum, d) => sum + (d.studentsSponsored || 0), 0);
  const totalBooks = donations.reduce((sum, d) => sum + (d.booksSponsored || 0), 0);

  const exportCSV = () => {
    const headers = ['Receipt No', 'Donor Name', 'PAN', 'Amount (INR)', 'Campaign', 'Date', 'Status'];
    const rows = filtered.map((d) => [
      d.receiptNo,
      `"${d.donorName}"`,
      d.panNumber,
      d.amount,
      `"${d.campaignTitle}"`,
      d.donatedAt,
      d.paymentStatus,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `gita_80g_donations_${Date.now()}.csv`);
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
            Philanthropy & 80G Tax-Exempt Donations Ledger
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Audit logs of student sponsorships, book grants, and statutory IT Act certificates.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button size="sm" variant="secondary" onClick={exportCSV} icon={Download}>
            Export 80G Ledger (CSV)
          </Button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-xl">
            ₹
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Raised</span>
            <strong className="text-2xl font-extrabold text-slate-900">₹{totalFunds.toLocaleString()}</strong>
            <span className="text-xs text-orange-600 font-semibold block">100% Tax Deductible</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-xl">
            📖
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Gitas Sponsored</span>
            <strong className="text-2xl font-extrabold text-slate-900">{totalBooks.toLocaleString()}</strong>
            <span className="text-xs text-slate-500 block">Allocated to schools</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xl">
            🎓
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Students Sponsored</span>
            <strong className="text-2xl font-extrabold text-slate-900">{totalStudents.toLocaleString()}</strong>
            <span className="text-xs text-emerald-600 font-semibold block">Admit cards subsidized</span>
          </div>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
          <input
            type="text"
            placeholder="Search by donor name, PAN, receipt no..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-vedic-teal"
          />
        </div>
      </div>

      {/* Donations Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Receipt Number</th>
                <th className="py-3 px-4">Donor Name & PAN</th>
                <th className="py-3 px-4">Campaign Track</th>
                <th className="py-3 px-4 text-center">Amount (INR)</th>
                <th className="py-3 px-4 text-center">Impact (Gitas/Std)</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filtered.map((d) => (
                <tr key={d.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3.5 px-4 font-mono font-bold text-amber-800">
                    {d.receiptNo}
                  </td>
                  <td className="py-3.5 px-4">
                    <strong className="text-slate-900 block font-semibold">{d.donorName}</strong>
                    <span className="text-[11px] text-slate-400 font-mono">PAN: {d.panNumber}</span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-700 font-medium">
                    {d.campaignTitle}
                  </td>
                  <td className="py-3.5 px-4 text-center font-bold text-slate-900">
                    ₹{d.amount.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 text-center text-slate-600">
                    {d.booksSponsored > 0 && <span className="block">{d.booksSponsored} Gitas</span>}
                    {d.studentsSponsored > 0 && <span className="block text-emerald-700 font-semibold">{d.studentsSponsored} Students</span>}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">
                    {new Date(d.donatedAt).toLocaleDateString('en-IN')}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Button
                      size="xs"
                      variant="outline"
                      onClick={() => setSelectedReceipt(d)}
                      icon={FileCheck2}
                    >
                      View 80G
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 80G Certificate Preview Modal */}
      <Modal
        isOpen={Boolean(selectedReceipt)}
        onClose={() => setSelectedReceipt(null)}
        title="Official 80G Tax Exemption Certificate"
        maxWidth="max-w-lg"
      >
        {selectedReceipt && (
          <div className="space-y-4">
            <div className="border-2 border-dashed border-amber-300 rounded-2xl p-6 bg-amber-50/40 text-xs space-y-3">
              <div className="text-center pb-3 border-b border-amber-200">
                <span className="font-extrabold text-base text-slate-900 block">ISKCON Youth Trust of India</span>
                <span className="text-[10px] text-slate-500 uppercase tracking-widest">Under Section 80G(5)(vi) of IT Act 1961</span>
                <span className="font-mono text-xs font-bold text-amber-800 block mt-1">{selectedReceipt.receiptNo}</span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-slate-700 pt-1">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Donor Name</span>
                  <strong className="text-slate-900">{selectedReceipt.donorName}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">PAN Number</span>
                  <strong className="font-mono text-slate-900">{selectedReceipt.panNumber}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Donation Amount</span>
                  <strong className="text-base text-slate-950 font-bold">₹{selectedReceipt.amount.toLocaleString()}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Payment Method</span>
                  <strong className="text-slate-900">{selectedReceipt.paymentMethod}</strong>
                </div>
              </div>

              <div className="pt-2 border-t border-amber-200 text-[10px] text-slate-500 leading-relaxed text-center">
                This donation is 50% eligible for tax deduction under Section 80G. Generated electronically and valid without physical signature.
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <Button size="sm" onClick={() => window.print()} icon={Download}>
                Print Official Certificate
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
