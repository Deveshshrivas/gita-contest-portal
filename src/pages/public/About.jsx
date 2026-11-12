import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Award, CheckCircle, Shield, Sparkles, Heart, Users, Target, ArrowRight } from 'lucide-react';
import Badge from '../../components/ui/Badge';

export default function About() {
  return (
    <div className="py-12 bg-vedic-cream/30 min-h-screen space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="gold" className="text-xs uppercase tracking-widest px-3 py-1">
            Vision & Values • National Gita Olympiad
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            About the National Gita Leadership Platform
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Nurturing a new generation of emotionally strong, ethically grounded, and intellectually resilient leaders through the sacred teachings of Sri Krishna in the Bhagavad Gita.
          </p>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-vedic-light text-vedic-primary flex items-center justify-center font-bold text-xl">
              🎯
            </div>
            <h3 className="text-lg font-bold text-slate-900">Our Sacred Mission</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              To present the timeless wisdom of the Gita not merely as ancient literature, but as the ultimate practical manual for modern youth—solving challenges of stress, peer pressure, decision-making, and existential purpose.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-xl">
              ⚖️
            </div>
            <h3 className="text-lg font-bold text-slate-900">Multi-Stage Rigor</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Unlike ordinary single-attempt quizzes, our multi-stage olympiad filters students through foundational understanding (Stage 1), zonal intermediate analytical reasoning (Stage 2), and a grand finale viva (Stage 3).
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-700 flex items-center justify-center font-bold text-xl">
              📖
            </div>
            <h3 className="text-lg font-bold text-slate-900">Mass Book Outreach</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              In conjunction with Bhaktivedanta Book Trust, we ensure that every participating student receives an authentic copy of Bhagavad-gītā As It Is, supported by philanthropic patrons across the country.
            </p>
          </div>
        </div>

        {/* 18 Chapters Philosophy Overview */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-vedic-primary text-white flex items-center justify-center font-bold">
              🕉️
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">The 3 Structural Divisions of the Gita</h3>
              <p className="text-xs text-slate-500">How the 18 chapters map into comprehensive leadership development</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="border border-slate-100 rounded-xl p-4 bg-slate-50/50 space-y-2">
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">Chapters 1–6</span>
              <h4 className="font-bold text-sm text-slate-900">Karma Yoga (Selfless Action)</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Focuses on the nature of the eternal soul, dutiful action without attachment to outcomes (Nishkama Karma), and conquering negative emotions like anger and greed.
              </p>
            </div>

            <div className="border border-slate-100 rounded-xl p-4 bg-amber-50/40 space-y-2">
              <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">Chapters 7–12</span>
              <h4 className="font-bold text-sm text-slate-900">Bhakti Yoga (Pure Devotion)</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                The confidential heart of the Gita. Reveals God's supreme nature, the universal cosmic form (Vishwaroop), and cultivating unalloyed love, gratitude, and surrender.
              </p>
            </div>

            <div className="border border-slate-100 rounded-xl p-4 bg-slate-50/50 space-y-2">
              <span className="text-xs font-bold text-purple-800 bg-purple-100 px-2 py-0.5 rounded">Chapters 13–18</span>
              <h4 className="font-bold text-sm text-slate-900">Jnana Yoga (Spiritual Knowledge)</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Deconstructs the three modes of material nature (Sattva, Rajas, Tamas), divine versus demoniac natures, and the ultimate perfection of renunciation and surrender.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-4">
          <Link
            to="/register"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-bold bg-vedic-primary hover:bg-vedic-dark text-white shadow-md transition"
          >
            <span>Register for GLC 2026 Free</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
