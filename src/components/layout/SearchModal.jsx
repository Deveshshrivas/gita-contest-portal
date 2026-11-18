import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  X,
  Award,
  BookOpen,
  Calendar,
  CheckCircle,
  ArrowRight,
  Shield,
  FileText,
  PlayCircle,
  HelpCircle,
  Sparkles,
} from 'lucide-react';

const SEARCHABLE_ITEMS = [
  // Exams
  {
    category: 'Exams & Contests',
    icon: Award,
    title: 'Gita Leadership Contest (GLC) 2026 - MP Govt & ISKCON Ujjain',
    description: 'Online exam for Class 9th-12th with ₹1,00,001 cash prize & gold medal',
    url: '/contest/glc-2026',
    badge: 'National',
  },
  {
    category: 'Exams & Contests',
    icon: PlayCircle,
    title: 'Instant Practice Mock Examination',
    description: '24/7 unlimited practice mock test with immediate score & certificate',
    url: '/student/lobby/gita-practice-mock',
    badge: 'Free Instant',
  },
  {
    category: 'Exams & Contests',
    icon: Calendar,
    title: 'All Available Contests & Schedule',
    description: 'Browse upcoming school, college, and open category exams',
    url: '/exams',
  },
  {
    category: 'Exams & Contests',
    icon: Award,
    title: 'National Merit Leaderboard',
    description: 'Live top rankers, high scores, and state distinctions',
    url: '/leaderboard',
  },

  // Learning & Syllabus
  {
    category: 'Study & Curriculum',
    icon: BookOpen,
    title: 'Chapter Summaries & Key Shlokas',
    description: 'Complete breakdown of all 18 Chapters with authentic Sanskrit verses',
    url: '/study-material',
  },
  {
    category: 'Study & Curriculum',
    icon: FileText,
    title: 'Chapter 2: Sankhya Yoga (Contents of the Gita)',
    description: 'Core concepts of the immortal soul (Atman) and prescribed duty',
    url: '/study-material',
  },
  {
    category: 'Study & Curriculum',
    icon: FileText,
    title: 'Chapter 3 & 4: Karma Yoga & Transcendental Knowledge',
    description: 'Selfless action, leadership by example, and ancient lineage of wisdom',
    url: '/study-material',
  },
  {
    category: 'Study & Curriculum',
    icon: FileText,
    title: 'Chapter 12: Bhakti Yoga (The Path of Devotion)',
    description: 'The 35 divine leadership qualities cherished by Sri Krishna',
    url: '/study-material',
  },

  // Books
  {
    category: 'Sacred Literature',
    icon: BookOpen,
    title: 'Bhagavad Gita As It Is (Deluxe Hardcover)',
    description: 'Complete English edition with authentic Sanskrit, word meanings, and purport',
    url: '/books',
    badge: 'Official Text',
  },
  {
    category: 'Sacred Literature',
    icon: BookOpen,
    title: 'Shrimad Bhagavad Gita (Hindi Edition)',
    description: 'Full Hindi translation for northern zone candidates',
    url: '/books',
  },
  {
    category: 'Sacred Literature',
    icon: BookOpen,
    title: 'Science of Self-Realization',
    description: 'Practical essays on mind control, meditation, and modern leadership',
    url: '/books',
  },

  // Tools & Seva
  {
    category: 'Services & Verification',
    icon: Shield,
    title: 'Verify Merit Certificate (QR Verification)',
    description: 'Cryptographically verify candidate score, rank, and certificate validity',
    url: '/verify',
    badge: 'Official QR',
  },
  {
    category: 'Services & Verification',
    icon: Sparkles,
    title: 'Vidya Daan: Sponsor Students & Books',
    description: 'Support underprivileged students with Bhagavad Gita copies & 80G deduction',
    url: '/donations',
    badge: '80G Tax Free',
  },
  {
    category: 'Services & Verification',
    icon: HelpCircle,
    title: 'Helpdesk & Support Center',
    description: 'Frequently asked questions, examination helpline, and guidelines',
    url: '/contact',
  },
];

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setQuery('');
      setSelectedIndex(0);
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const filtered = query.trim() === ''
    ? SEARCHABLE_ITEMS.slice(0, 6)
    : SEARCHABLE_ITEMS.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      );

  const handleSelect = (url) => {
    onClose();
    navigate(url);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filtered.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % Math.max(1, filtered.length));
    } else if (e.key === 'Enter' && filtered[selectedIndex]) {
      e.preventDefault();
      handleSelect(filtered[selectedIndex].url);
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center px-4 sm:px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <Search size={20} className="text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search contests, chapters, shlokas, books, roll number..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            className="w-full pl-3 pr-10 py-1.5 text-sm sm:text-base bg-transparent text-slate-900 placeholder:text-slate-400 focus:outline-none"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition"
            >
              <X size={16} />
            </button>
          ) : (
            <span className="hidden sm:inline-block text-[10px] font-bold text-slate-400 border border-slate-200 rounded px-1.5 py-0.5 uppercase tracking-wider bg-white">
              ESC
            </span>
          )}
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-3 space-y-1">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-slate-500 space-y-2">
              <Search size={32} className="mx-auto text-slate-300" />
              <p className="font-semibold text-sm">No results found for "{query}"</p>
              <p className="text-xs text-slate-400">
                Try searching for "GLC 2026", "Practice", "Chapter 2", "Books", or "Verify".
              </p>
            </div>
          ) : (
            filtered.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = idx === selectedIndex;

              return (
                <div
                  key={item.title + idx}
                  onClick={() => handleSelect(item.url)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between p-3 rounded-2xl cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-vedic-light text-vedic-dark shadow-xs'
                      : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'bg-vedic-primary text-white shadow-xs'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      <Icon size={18} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                          {item.title}
                        </span>
                        {item.badge && (
                          <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-amber-100 text-amber-900 border border-amber-200 shrink-0">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 truncate mt-0.5">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <ArrowRight
                    size={15}
                    className={`shrink-0 ml-3 transition-transform ${
                      isSelected ? 'text-vedic-primary translate-x-1' : 'text-slate-300'
                    }`}
                  />
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-6 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <span className="text-vedic-primary font-semibold">Gita Olympiad Quick Finder</span>
        </div>
      </div>
    </div>
  );
}
