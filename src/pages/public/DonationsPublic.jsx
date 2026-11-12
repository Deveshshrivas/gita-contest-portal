import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Heart,
  HeartHandshake,
  Users,
  BookOpen,
  Award,
  Sparkles,
  ShieldCheck,
  CheckCircle,
  Download,
  CreditCard,
  Building,
  ArrowRight,
} from 'lucide-react';
import { mockApi } from '../../services/mockApi';
import Modal from '../../components/ui/Modal';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

export default function DonationsPublic() {
  const [campaigns, setCampaigns] = useState(() => mockApi.getCampaigns());
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [donateModalOpen, setDonateModalOpen] = useState(false);
  const [donationAmount, setDonationAmount] = useState(2500);
  const [donorData, setDonorData] = useState({
    name: 'Shri Rajeshwar Singhania',
    email: 'rajeshwar@example.com',
    phone: '+91 98900 88008',
    panNumber: 'AAECS1234F',
    allocatedCenter: 'National Youth Pool',
  });
  const [receiptSuccess, setReceiptSuccess] = useState(null);

  const handleOpenDonate = (campaign) => {
    setSelectedCampaign(campaign);
    setReceiptSuccess(null);
    setDonateModalOpen(true);
  };

  const handleDonationSubmit = (e) => {
    e.preventDefault();
    if (!selectedCampaign) return;

    const receipt = mockApi.donateToCampaign(selectedCampaign.id, {
      amount: donationAmount,
      donorName: donorData.name,
      donorEmail: donorData.email,
      donorPhone: donorData.phone,
      panNumber: donorData.panNumber,
      allocatedCenter: donorData.allocatedCenter,
      paymentMethod: 'UPI / Online',
    });

    // Refresh campaigns
    setCampaigns(mockApi.getCampaigns());
    setReceiptSuccess(receipt);
  };

  const calculateProgress = (raised, target) => {
    return Math.min(100, Math.round((raised / target) * 100));
  };

  return (
    <div className="py-12 bg-vedic-cream/40 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="warning" className="text-xs uppercase tracking-widest px-3 py-1">
            Tax Exempt Under Section 80G • ISKCON Youth Trust
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Sponsor Sacred Wisdom & Support Young Seekers
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Your generous contribution empowers thousands of underprivileged students to receive a personal copy of the Bhagavad Gita, attend guided moral leadership sessions, and take the national Olympiad without any fee barrier.
          </p>
        </div>

        {/* 3 Impact Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl border border-orange-200 p-6 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
              <Users size={24} />
            </div>
            <div>
              <div className="text-2xl font-extrabold text-slate-900">28,000+</div>
              <div className="text-xs text-slate-500 font-semibold uppercase">Students Sponsored to Date</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-amber-200 p-6 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
              <BookOpen size={24} />
            </div>
            <div>
              <div className="text-2xl font-extrabold text-slate-900">45,000+</div>
              <div className="text-xs text-slate-500 font-semibold uppercase">Bhagavad Gitas Distributed</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-emerald-200 p-6 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
              <ShieldCheck size={24} />
            </div>
            <div>
              <div className="text-2xl font-extrabold text-slate-900">100% Tax Free</div>
              <div className="text-xs text-slate-500 font-semibold uppercase">80G Instant PDF Receipts</div>
            </div>
          </div>
        </div>

        {/* Campaigns Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Featured Sponsorship Drives
            </h2>
            <Link
              to="/donor/dashboard"
              className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1"
            >
              <span>Donor Portal & Tax Receipts</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {campaigns.map((camp) => {
              const progress = calculateProgress(camp.raisedAmount, camp.targetAmount);

              return (
                <div
                  key={camp.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-card transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-48 bg-slate-100 overflow-hidden">
                      <img
                        src={camp.coverImage}
                        alt={camp.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                        {camp.category}
                      </div>
                    </div>

                    <div className="p-6 space-y-4">
                      <div>
                        <h3 className="font-bold text-lg text-slate-900 leading-snug">
                          {camp.title}
                        </h3>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                          {camp.subtitle}
                        </p>
                      </div>

                      {/* Progress bar */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs font-bold">
                          <span className="text-slate-900">₹{(camp.raisedAmount || 0).toLocaleString()} raised</span>
                          <span className="text-orange-600">{progress}%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full transition-all duration-500"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <div className="text-[11px] text-slate-400 flex justify-between">
                          <span>Goal: ₹{(camp.targetAmount || 0).toLocaleString()}</span>
                          <span>{camp.donorsCount || 0} Donors</span>
                        </div>
                      </div>

                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-600 space-y-1">
                        <div className="flex justify-between">
                          <span>Per Student/Unit Cost:</span>
                          <strong>₹{camp.unitCost}</strong>
                        </div>
                        <div className="flex justify-between">
                          <span>Beneficiaries Reached:</span>
                          <strong>{(camp.beneficiariesCount || 0).toLocaleString()}</strong>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-slate-50 border-t border-slate-100">
                    <Button
                      variant="gold"
                      className="w-full font-bold shadow-xs"
                      onClick={() => handleOpenDonate(camp)}
                      icon={Heart}
                    >
                      Sponsor Now (80G Tax-Deductible)
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Donation Modal */}
      <Modal
        isOpen={donateModalOpen}
        onClose={() => setDonateModalOpen(false)}
        title={selectedCampaign ? `Support: ${selectedCampaign.title}` : 'Sponsorship Contribution'}
        maxWidth="max-w-xl"
      >
        {receiptSuccess ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl mx-auto">
              ✓
            </div>
            <div>
              <h4 className="text-xl font-bold text-slate-900">Hare Krishna! Donation Received</h4>
              <p className="text-xs text-slate-500 mt-1">
                Your donation receipt and 80G tax exemption certificate have been generated.
              </p>
            </div>

            {/* Printable Receipt Preview Card */}
            <div className="bg-white border-2 border-dashed border-amber-300 rounded-2xl p-5 text-left text-xs space-y-2 shadow-xs">
              <div className="flex items-center justify-between border-b pb-2">
                <span className="font-extrabold text-sm text-slate-900">ISKCON Youth Trust • 80G Receipt</span>
                <span className="font-mono text-amber-700 font-bold">{receiptSuccess.receiptNo}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-slate-600 pt-1">
                <div><strong>Donor:</strong> {receiptSuccess.donorName}</div>
                <div><strong>PAN:</strong> {receiptSuccess.panNumber}</div>
                <div><strong>Amount:</strong> ₹{receiptSuccess.amount.toLocaleString()}</div>
                <div><strong>Txn ID:</strong> {receiptSuccess.transactionId}</div>
                <div><strong>Campaign:</strong> {receiptSuccess.campaignTitle}</div>
                <div><strong>Impact:</strong> ~{receiptSuccess.studentsSponsored} Students / Gitas</div>
              </div>
              <div className="text-[10px] text-slate-400 pt-2 border-t text-center">
                Registration No: CIT(E)/80G/2021-22/A/1042 • Exempt under Sec 80G(5)(vi)
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-100 transition flex items-center gap-1.5"
              >
                <Download size={14} />
                <span>Print / Save Receipt</span>
              </button>
              <Link
                to="/donor/dashboard"
                className="px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold transition"
              >
                View in Donor Dashboard
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleDonationSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Select Donation Amount (₹):</label>
              <div className="grid grid-cols-4 gap-2">
                {[500, 1000, 2500, 5000].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setDonationAmount(amt)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition ${
                      donationAmount === amt
                        ? 'bg-orange-500 text-white border-orange-600 shadow-xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    ₹{amt.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Or Enter Custom Amount (₹)</label>
              <input
                type="number"
                min="100"
                value={donationAmount}
                onChange={(e) => setDonationAmount(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-orange-400 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Donor Full Name (As per PAN) *</label>
              <input
                type="text"
                required
                value={donorData.name}
                onChange={(e) => setDonorData({ ...donorData, name: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-orange-400 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">PAN Number (For 80G Tax Benefit) *</label>
                <input
                  type="text"
                  required
                  value={donorData.panNumber}
                  onChange={(e) => setDonorData({ ...donorData, panNumber: e.target.value.toUpperCase() })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-orange-400 focus:outline-none font-mono"
                  placeholder="e.g. ABCDE1234F"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Email Address *</label>
                <input
                  type="email"
                  required
                  value={donorData.email}
                  onChange={(e) => setDonorData({ ...donorData, email: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => setDonateModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm" variant="gold">
                Proceed to Pay ₹{donationAmount.toLocaleString()} (Simulated)
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
