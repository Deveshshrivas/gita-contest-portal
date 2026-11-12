import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Heart,
  HeartHandshake,
  FileCheck2,
  TrendingUp,
  Award,
  Users,
  BookOpen,
  ArrowRight,
  Download,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { mockApi } from '../../services/mockApi';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';

export default function DonorDashboard() {
  const { user } = useAuth();
  const [donations] = useState(() => mockApi.getDonations());
  const [campaigns] = useState(() => mockApi.getCampaigns());
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  const myDonations = donations.filter(
    (d) => (user?.email && d.donorEmail === user.email) || (user?.name && d.donorName === user.name)
  );

  // If none found for this user, show all demo donations so it's not empty
  const displayDonations = myDonations.length > 0 ? myDonations : donations;

  const totalDonated = displayDonations.reduce((sum, d) => sum + (d.amount || 0), 0);
  const totalStudents = displayDonations.reduce((sum, d) => sum + (d.studentsSponsored || 0), 0);
  const totalBooks = displayDonations.reduce((sum, d) => sum + (d.booksSponsored || 0), 0);

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 rounded-3xl p-6 sm:p-8 text-white shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-xs">
            <Heart size={13} className="fill-white" />
            <span>Patron & Philanthropy Desk</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Hare Krishna, {user?.name || 'Patron Donor'}!
          </h1>
          <p className="text-xs sm:text-sm text-orange-100 max-w-xl leading-relaxed">
            Thank you for bringing spiritual wisdom and moral strength to thousands of students across the nation.
          </p>
        </div>

        <Link
          to="/donations"
          className="px-5 py-3 rounded-2xl bg-white hover:bg-orange-50 text-orange-700 font-extrabold text-xs shadow-md transition flex items-center gap-2 shrink-0"
        >
          <HeartHandshake size={16} />
          <span>Sponsor Another Campaign</span>
        </Link>
      </div>

      {/* Impact Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Donated</span>
            <div className="w-9 h-9 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center font-bold">
              ₹
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            ₹{totalDonated.toLocaleString()}
          </div>
          <span className="text-xs text-orange-600 font-semibold block mt-1">100% Tax Exempt under 80G</span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Students Sponsored</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Users size={18} />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-800">
            {totalStudents} Candidates
          </div>
          <span className="text-xs text-slate-500 block mt-1">Free exam access provided</span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Gita Books Distributed</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <BookOpen size={18} />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-800">
            {totalBooks} Copies
          </div>
          <span className="text-xs text-slate-500 block mt-1">Bhagavad Gita As It Is</span>
        </div>
      </div>

      {/* Recent Receipts & 80G Certificates */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-base text-slate-900">Your Official 80G Tax Certificates</h3>
            <p className="text-xs text-slate-500">Download or print verified tax exemption receipts</p>
          </div>
          <Link to="/donor/history" className="text-xs font-bold text-orange-600 hover:underline">
            View All →
          </Link>
        </div>

        <div className="divide-y divide-slate-100">
          {displayDonations.map((d) => (
            <div key={d.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="font-mono text-xs font-bold text-amber-800 block">{d.receiptNo}</span>
                <strong className="text-sm text-slate-900 block font-semibold">{d.campaignTitle}</strong>
                <span className="text-xs text-slate-400">
                  {new Date(d.donatedAt).toLocaleDateString('en-IN')} • {d.paymentMethod} • Txn: {d.transactionId}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-base font-extrabold text-slate-900 block">₹{d.amount.toLocaleString()}</span>
                  <span className="text-[10px] text-emerald-600 font-bold uppercase">80G Verified</span>
                </div>

                <Button
                  size="xs"
                  variant="outline"
                  onClick={() => setSelectedReceipt(d)}
                  icon={FileCheck2}
                >
                  View 80G
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 80G Certificate Preview Modal */}
      <Modal
        isOpen={Boolean(selectedReceipt)}
        onClose={() => setSelectedReceipt(null)}
        title="80G Tax Exemption Receipt"
        maxWidth="max-w-md"
      >
        {selectedReceipt && (
          <div className="space-y-4">
            <div className="border-2 border-dashed border-amber-300 rounded-2xl p-5 bg-amber-50/50 text-xs space-y-2.5">
              <div className="text-center pb-2 border-b border-amber-200">
                <span className="font-extrabold text-sm text-slate-900 block">ISKCON Youth Trust of India</span>
                <span className="text-[10px] text-slate-500 uppercase">Under Sec 80G(5)(vi) • CIT(E)/80G/2021-22</span>
                <span className="font-mono text-xs font-bold text-amber-800 block mt-1">{selectedReceipt.receiptNo}</span>
              </div>

              <div className="space-y-1 text-slate-700">
                <div><strong>Donor:</strong> {selectedReceipt.donorName}</div>
                <div><strong>PAN:</strong> {selectedReceipt.panNumber}</div>
                <div><strong>Amount:</strong> ₹{selectedReceipt.amount.toLocaleString()}</div>
                <div><strong>Campaign:</strong> {selectedReceipt.campaignTitle}</div>
                <div><strong>Allocated:</strong> {selectedReceipt.allocatedCenter}</div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button size="sm" onClick={() => window.print()} icon={Download}>
                Print Receipt
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
