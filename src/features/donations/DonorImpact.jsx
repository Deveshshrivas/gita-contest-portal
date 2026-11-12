import React from 'react';
import { Award, Users, BookOpen, MapPin, Heart, CheckCircle } from 'lucide-react';
import Badge from '../../components/ui/Badge';

export default function DonorImpact() {
  const beneficiarySchools = [
    { name: 'Delhi Public School, R.K. Puram', city: 'New Delhi', students: 450, booksReceived: 450, date: 'Nov 2026' },
    { name: 'National Public School, Indiranagar', city: 'Bengaluru', students: 380, booksReceived: 380, date: 'Oct 2026' },
    { name: 'Ujjain Gurukul Vidyalaya', city: 'Ujjain, MP', students: 220, booksReceived: 220, date: 'Oct 2026' },
    { name: 'St. Xavier’s High School', city: 'Mumbai', students: 510, booksReceived: 510, date: 'Nov 2026' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Philanthropic Impact & Beneficiary Reports
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Transparent reporting of student sponsorships and educational book deliveries.
          </p>
        </div>
      </div>

      {/* Key Impact Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
            <Users size={22} />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-900">28,450+</div>
            <div className="text-xs text-slate-500 uppercase font-semibold">Candidates Subsidized</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold">
            <BookOpen size={22} />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-900">45,000+</div>
            <div className="text-xs text-slate-500 uppercase font-semibold">Gita Books Distributed</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
            <MapPin size={22} />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-900">120+</div>
            <div className="text-xs text-slate-500 uppercase font-semibold">Schools & Colleges Reached</div>
          </div>
        </div>
      </div>

      {/* Beneficiary Schools Roster */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100">
          <h3 className="font-bold text-sm text-slate-900">Recent Institutional Beneficiary Allocations</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">School / College Name</th>
                <th className="py-3 px-4">City</th>
                <th className="py-3 px-4 text-center">Students Enrolled</th>
                <th className="py-3 px-4 text-center">Gitas Delivered</th>
                <th className="py-3 px-4">Delivery Month</th>
                <th className="py-3 px-4 text-center">Audit Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {beneficiarySchools.map((s) => (
                <tr key={s.name} className="hover:bg-slate-50/80 transition">
                  <td className="py-3.5 px-4 font-bold text-slate-900">{s.name}</td>
                  <td className="py-3.5 px-4 text-slate-600">{s.city}</td>
                  <td className="py-3.5 px-4 text-center font-bold font-mono text-emerald-700">{s.students}</td>
                  <td className="py-3.5 px-4 text-center font-bold font-mono text-amber-700">{s.booksReceived}</td>
                  <td className="py-3.5 px-4 text-slate-500">{s.date}</td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full text-[10px] font-bold">
                      Verified
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
