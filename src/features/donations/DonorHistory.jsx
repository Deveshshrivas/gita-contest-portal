import React, { useState } from 'react';
import { FileCheck2, Download, Search, Heart, Sparkles } from 'lucide-react';
import { mockApi } from '../../services/mockApi';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';

export default function DonorHistory() {
  const [donations] = useState(() => mockApi.getDonations());
  const [search, setSearch] = useState('');
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  const filtered = donations.filter(
    (d) =>
      d.receiptNo.toLowerCase().includes(search.toLowerCase()) ||
      d.campaignTitle.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            My 80G Tax Certificates & Sponsorship History
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Download IT Act Section 80G tax receipts and verify contribution records.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Receipt Number</th>
                <th className="py-3 px-4">Campaign Drive</th>
                <th className="py-3 px-4 text-center">Amount (INR)</th>
                <th className="py-3 px-4 text-center">Sponsored Impact</th>
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
                  <td className="py-3.5 px-4 font-semibold text-slate-900">
                    {d.campaignTitle}
                  </td>
                  <td className="py-3.5 px-4 text-center font-bold text-slate-900">
                    ₹{d.amount.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 text-center text-slate-600">
                    {d.studentsSponsored > 0 && <span className="block font-semibold text-emerald-700">{d.studentsSponsored} Students</span>}
                    {d.booksSponsored > 0 && <span className="block text-slate-500">{d.booksSponsored} Gitas</span>}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">
                    {new Date(d.donatedAt).toLocaleDateString('en-IN')}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Button
                      size="xs"
                      variant="outline"
                      onClick={() => setSelectedReceipt(d)}
                      icon={Download}
                    >
                      Download Receipt
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={Boolean(selectedReceipt)}
        onClose={() => setSelectedReceipt(null)}
        title="Official 80G Tax Exemption Receipt"
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
