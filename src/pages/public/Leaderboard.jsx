import React, { useState } from 'react';
import { Award, Trophy, Medal, Search, Star, MapPin, User, ArrowRight } from 'lucide-react';
import { useExam } from '../../context/ExamContext';
import { Link } from 'react-router-dom';

export default function Leaderboard() {
  const { results } = useExam();
  const [filterCategory, setFilterCategory] = useState('all');

  // Pre-seed a few demo high rankers if results are low
  const mockLeaderboard = [
    { rank: 1, name: "Radha Krishnan", rollNo: "GLC-2026-8843", city: "Bengaluru", score: 31.5, total: 32, percentage: 98.4, badge: "National Rank 1 (Gold)" },
    { rank: 2, name: "Madhav Joshi", rollNo: "GLC-2026-8844", city: "Ujjain", score: 30.0, total: 32, percentage: 93.8, badge: "National Rank 2 (Silver)" },
    { rank: 3, name: "Ananya Patel", rollNo: "GLC-2026-8845", city: "Mumbai", score: 29.5, total: 32, percentage: 92.2, badge: "National Rank 3 (Bronze)" },
    { rank: 4, name: "Arjun Sharma", rollNo: "GLC-2026-8842", city: "New Delhi", score: 28.0, total: 32, percentage: 87.5, badge: "Top 5% Gold Distinction" },
    { rank: 5, name: "Kavita Deshmukh", rollNo: "GLC-2026-8846", city: "Pune", score: 27.5, total: 32, percentage: 85.9, badge: "Top 10% Silver Merit" },
    { rank: 6, name: "Rohan Varma", rollNo: "GLC-2026-8847", city: "Jaipur", score: 26.0, total: 32, percentage: 81.3, badge: "Top 15% Merit" },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
          National Hall of Fame
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Gita Contest Leaderboard
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          Celebrating the top scholars and performers of the National Bhagavad Gita Olympiad.
        </p>
      </div>

      {/* Top 3 Podium Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        {/* 2nd Place */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 text-center order-2 md:order-1 shadow-card flex flex-col justify-between">
          <div>
            <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center text-2xl mx-auto mb-3">
              🥈
            </div>
            <span className="text-[11px] font-bold text-slate-600 uppercase bg-slate-100 px-2 py-0.5 rounded">
              Rank 2 • Silver
            </span>
            <h3 className="font-extrabold text-lg text-slate-900 mt-2">{mockLeaderboard[1].name}</h3>
            <div className="text-xs text-slate-500 flex items-center justify-center gap-1 mt-1">
              <MapPin size={12} />
              <span>{mockLeaderboard[1].city}</span>
            </div>
          </div>
          <div className="pt-4 mt-4 border-t border-slate-100">
            <span className="text-xl font-extrabold text-slate-900">{mockLeaderboard[1].percentage}%</span>
            <span className="text-xs text-slate-500 block">Score: {mockLeaderboard[1].score}/{mockLeaderboard[1].total}</span>
          </div>
        </div>

        {/* 1st Place (Center elevated) */}
        <div className="bg-gradient-to-b from-amber-50 via-white to-amber-50/70 rounded-2xl border-2 border-amber-400 p-8 text-center order-1 md:order-2 shadow-elevated transform md:-translate-y-3 flex flex-col justify-between">
          <div>
            <div className="w-16 h-16 rounded-2xl bg-amber-400/20 text-amber-600 flex items-center justify-center text-3xl mx-auto mb-3">
              👑
            </div>
            <span className="text-xs font-bold text-amber-800 uppercase bg-amber-200 px-2.5 py-1 rounded">
              ★ National Champion ★
            </span>
            <h3 className="font-extrabold text-xl text-slate-900 mt-2">{mockLeaderboard[0].name}</h3>
            <div className="text-xs text-slate-600 flex items-center justify-center gap-1 mt-1">
              <MapPin size={12} className="text-amber-600" />
              <span>{mockLeaderboard[0].city}</span>
            </div>
          </div>
          <div className="pt-4 mt-4 border-t border-amber-200">
            <span className="text-2xl font-extrabold text-amber-700">{mockLeaderboard[0].percentage}%</span>
            <span className="text-xs text-slate-600 block">Score: {mockLeaderboard[0].score}/{mockLeaderboard[0].total}</span>
          </div>
        </div>

        {/* 3rd Place */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 text-center order-3 md:order-3 shadow-card flex flex-col justify-between">
          <div>
            <div className="w-14 h-14 rounded-2xl bg-amber-900/10 text-amber-800 flex items-center justify-center text-2xl mx-auto mb-3">
              🥉
            </div>
            <span className="text-[11px] font-bold text-amber-900 uppercase bg-amber-100 px-2 py-0.5 rounded">
              Rank 3 • Bronze
            </span>
            <h3 className="font-extrabold text-lg text-slate-900 mt-2">{mockLeaderboard[2].name}</h3>
            <div className="text-xs text-slate-500 flex items-center justify-center gap-1 mt-1">
              <MapPin size={12} />
              <span>{mockLeaderboard[2].city}</span>
            </div>
          </div>
          <div className="pt-4 mt-4 border-t border-slate-100">
            <span className="text-xl font-extrabold text-slate-900">{mockLeaderboard[2].percentage}%</span>
            <span className="text-xs text-slate-500 block">Score: {mockLeaderboard[2].score}/{mockLeaderboard[2].total}</span>
          </div>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-card overflow-hidden">
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-bold text-sm text-slate-900">National Top Rankings</h3>
          <span className="text-xs text-slate-500">Live Evaluation System</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-100/70 text-slate-600 uppercase text-[11px] font-bold tracking-wider">
              <tr>
                <th className="py-3 px-6">Rank</th>
                <th className="py-3 px-6">Candidate</th>
                <th className="py-3 px-6">Location</th>
                <th className="py-3 px-6">Roll No</th>
                <th className="py-3 px-6">Score</th>
                <th className="py-3 px-6 text-right">Percentage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {mockLeaderboard.map((item) => (
                <tr key={item.rollNo} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-6 font-bold text-slate-900">
                    <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs ${
                      item.rank === 1 ? 'bg-amber-400 text-slate-950 font-black' :
                      item.rank === 2 ? 'bg-slate-300 text-slate-900 font-bold' :
                      item.rank === 3 ? 'bg-amber-700 text-white font-bold' :
                      'text-slate-500 font-medium'
                    }`}>
                      {item.rank}
                    </span>
                  </td>
                  <td className="py-3.5 px-6 font-semibold text-slate-900">
                    {item.name}
                  </td>
                  <td className="py-3.5 px-6 text-slate-500">
                    {item.city}
                  </td>
                  <td className="py-3.5 px-6 font-mono text-slate-600">
                    {item.rollNo}
                  </td>
                  <td className="py-3.5 px-6 font-bold text-vedic-primary">
                    {item.score} / {item.total}
                  </td>
                  <td className="py-3.5 px-6 text-right font-extrabold text-slate-900">
                    {item.percentage}%
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
