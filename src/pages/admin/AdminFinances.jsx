import React, { useState } from 'react';
import { CreditCard, Download, ArrowUpRight, ArrowDownLeft, Search, Filter, CheckCircle, Shield } from 'lucide-react';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

export default function AdminFinances() {
  const [filterType, setFilterType] = useState('all');

  const transactions = [
    { id: 'TXN-90141', date: '2026-11-03', type: 'Exam Fee', description: 'Executive Certification Fee - Vivek Deshmukh', amount: 499, status: 'Completed', in: true },
    { id: 'TXN-90140', date: '2026-11-03', type: 'Donation', description: 'Sponsor a Student Drive - Anand R. Verma', amount: 5000, status: 'Completed', in: true },
    { id: 'TXN-90139', date: '2026-11-02', type: 'Donation', description: '100k Gitas Drive - Dr. Sunita Kapoor', amount: 18000, status: 'Completed', in: true },
    { id: 'TXN-90138', date: '2026-11-02', type: 'Logistics Outflow', description: 'Blue Dart Freight Consignment Disp-102 (Bengaluru)', amount: -3200, status: 'Settled', in: false },
    { id: 'TXN-90137', date: '2026-11-01', type: 'Donation', description: 'Patron Sponsorship - Shri Rajeshwar Singhania', amount: 50000, status: 'Completed', in: true },
    { id: 'TXN-90136', date: '2026-11-01', type: 'Logistics Outflow', description: 'DTDC Freight Consignment Disp-101 (Delhi)', amount: -4500, status: 'Settled', in: false },
    { id: 'TXN-90135', date: '2026-10-31', type: 'Exam Fee', description: 'Corporate Certification Fee - Meera Nair', amount: 499, status: 'Completed', in: true },
  ];

  const totalInflow = transactions.filter((t) => t.in).reduce((sum, t) => sum + t.amount, 0);
  const totalOutflow = Math.abs(transactions.filter((t) => !t.in).reduce((sum, t) => sum + t.amount, 0));
  const netBalance = totalInflow - totalOutflow;

  const filteredTxns = transactions.filter((t) => {
    if (filterType === 'inflow') return t.in;
    if (filterType === 'outflow') return !t.in;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Financial Ledger & Examination Accounts
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Audit of examination receipts, donor sponsorships, and book distribution freight costs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button size="sm" variant="secondary" onClick={() => window.print()} icon={Download}>
            Print Financial Summary
          </Button>
        </div>
      </div>

      {/* Financial Health Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Inflow (Donations & Fees)</span>
          <strong className="text-2xl font-extrabold text-emerald-700 flex items-center gap-1.5 mt-1">
            <ArrowUpRight size={20} /> ₹{totalInflow.toLocaleString()}
          </strong>
          <span className="text-xs text-slate-500 block mt-1">Exam fees & 80G grants</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Logistics & Printing Outflow</span>
          <strong className="text-2xl font-extrabold text-rose-700 flex items-center gap-1.5 mt-1">
            <ArrowDownLeft size={20} /> ₹{totalOutflow.toLocaleString()}
          </strong>
          <span className="text-xs text-slate-500 block mt-1">BBT freight & exam centers</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Net Operating Reserve</span>
          <strong className="text-2xl font-extrabold text-slate-900 block mt-1">
            ₹{netBalance.toLocaleString()}
          </strong>
          <span className="text-xs text-emerald-600 font-semibold block mt-1">Balanced & Audited</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        {['all', 'inflow', 'outflow'].map((f) => (
          <button
            key={f}
            onClick={() => setFilterType(f)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition capitalize ${
              filterType === f
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {f === 'all' ? 'All Transactions' : f}
          </button>
        ))}
      </div>

      {/* Ledger Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Transaction ID</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4 text-right">Amount (INR)</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredTxns.map((txn) => (
                <tr key={txn.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-800">
                    {txn.id}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px] font-semibold">
                      {txn.type}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-800">
                    {txn.description}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">
                    {txn.date}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-bold">
                    <span className={txn.in ? 'text-emerald-700' : 'text-rose-700'}>
                      {txn.in ? `+₹${txn.amount.toLocaleString()}` : `-₹${Math.abs(txn.amount).toLocaleString()}`}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full text-[10px] font-bold">
                      {txn.status}
                    </span>
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
