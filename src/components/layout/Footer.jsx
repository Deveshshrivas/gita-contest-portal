import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Award, Shield, Mail, Phone, MapPin, Heart, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand & Mission */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-400 flex items-center justify-center text-slate-950 font-bold text-xl shadow-md">
                🕉️
              </div>
              <div>
                <span className="font-extrabold text-xl text-white tracking-tight">Gita Contest</span>
                <p className="text-xs text-amber-400 font-medium">Leadership & Wisdom Olympiad</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Inspiring the youth of India with the timeless principles of the Shrimad Bhagavad Gita—cultivating ethical leadership, emotional resilience, self-discipline, and universal brotherhood.
            </p>
            <div className="pt-2 text-xs text-slate-400 space-y-2">
              <div>
                <span className="text-amber-300 font-bold block">मध्य प्रदेश शासन द्वारा आयोजित</span>
                <span>In collaboration with <strong className="text-white">ISKCON Ujjain</strong>, <strong className="text-white">Avantkulam</strong> & <strong className="text-white">Veer Bharat Nyas</strong></span>
              </div>
              <div className="pt-1 flex items-center gap-2.5">
                <img src="/images/logo-mp-shasan-clean.png" alt="MP Shasan" className="w-8 h-8 object-contain rounded-full bg-white p-0.5 shadow-2xs" />
                <img src="/images/logo-iskcon-ujjain-clean.png" alt="ISKCON Ujjain" className="w-8 h-8 object-contain bg-white rounded-md p-0.5 shadow-2xs" />
                <img src="/images/logo-avantkulam-clean.png" alt="Avantkulam" className="w-8 h-8 object-contain rounded-full bg-white p-0.5 shadow-2xs" />
                <img src="/images/logo-veer-bharat-clean.png" alt="Veer Bharat Nyas" className="h-7 w-auto object-contain bg-white rounded-md px-1 py-0.5 shadow-2xs" />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">Exam Navigation</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-amber-400 transition-colors">National Contest 2026</Link>
              </li>
              <li>
                <Link to="/student/lobby/gita-practice-mock" className="hover:text-amber-400 transition-colors">Instant Mock / Practice Exam</Link>
              </li>
              <li>
                <Link to="/study-material" className="hover:text-amber-400 transition-colors">Chapter Summaries & Key Shlokas</Link>
              </li>
              <li>
                <Link to="/student/dashboard" className="hover:text-amber-400 transition-colors">Candidate Admit Card & Portal</Link>
              </li>
              <li>
                <Link to="/leaderboard" className="hover:text-amber-400 transition-colors">National Leaderboard & Rankers</Link>
              </li>
              <li>
                <Link to="/verify" className="hover:text-amber-400 transition-colors">Certificate Verification Engine</Link>
              </li>
            </ul>
          </div>

          {/* Contest Categories & Awards */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">Awards & Recognition</h4>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center justify-between text-slate-300">
                <span>🥇 1st Prize</span>
                <span className="font-semibold text-amber-400 font-mono">₹ 1,00,001/- + Gold</span>
              </li>
              <li className="flex items-center justify-between text-slate-300">
                <span>🥈 2nd Prize</span>
                <span className="font-semibold text-amber-400 font-mono">₹ 50,001/- + Silver</span>
              </li>
              <li className="flex items-center justify-between text-slate-300">
                <span>🥉 3rd Prize</span>
                <span className="font-semibold text-amber-400 font-mono">₹ 30,001/- + Bronze</span>
              </li>
              <li className="flex items-center justify-between text-slate-300">
                <span>🎖️ Top 100 Scholars</span>
                <span className="text-slate-400">Cash + Gita As It Is</span>
              </li>
              <li className="text-xs text-slate-400 pt-2 border-t border-slate-800">
                All qualified participants receive a verified Certificate of Merit with unique QR credentials.
              </li>
            </ul>
          </div>

          {/* Helpdesk & Support */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">Contest Support</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin size={16} className="text-amber-400 shrink-0 mt-0.5" />
                <span>Gita Contest Examination Directorate, ISKCON Campus, India</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={16} className="text-amber-400 shrink-0" />
                <a href="mailto:support@gitacontest.in" className="hover:text-white transition">support@gitacontest.in</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={16} className="text-amber-400 shrink-0" />
                <span>+91 98765 43210 (10 AM - 6 PM IST)</span>
              </li>
              <li className="pt-2">
                <a
                  href="http://www.gitacontest.in/contest/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-semibold"
                >
                  <span>Official Reference: gitacontest.in</span>
                  <ExternalLink size={12} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Shloka Banner */}
        <div className="bg-slate-800/80 rounded-2xl p-6 text-center border border-slate-700/60 my-8">
          <p className="font-shloka text-lg md:text-xl text-amber-300 font-semibold mb-2">
            &ldquo;यत्र योगेश्वरः कृष्णो यत्र पार्थो धनुर्धरः। तत्र श्रीर्विजयो भूतिर्ध्रुवा नीतिर्मतिर्मम॥&rdquo;
          </p>
          <p className="text-xs text-slate-400 max-w-2xl mx-auto">
            &ldquo;Wherever there is Krishna, the Lord of Yoga, and wherever there is Arjuna, the supreme archer, there will certainly be opulence, victory, extraordinary power, and morality.&rdquo; — Bhagavad Gita 18.78
          </p>
        </div>

        {/* Bottom copyright */}
        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Gita Leadership Contest Portal. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Non-profit Educational & Values Initiative</span>
            <span>Made with devotion for Dharma</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
