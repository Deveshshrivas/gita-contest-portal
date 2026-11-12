import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Search,
  Filter,
  CheckCircle,
  Heart,
  Globe,
  Layers,
  Sparkles,
  Info,
  ChevronRight,
  PackageCheck,
} from 'lucide-react';
import { mockApi } from '../../services/mockApi';
import Modal from '../../components/ui/Modal';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

export default function BooksCatalog() {
  const [books, setBooks] = useState(() => mockApi.getBooks());
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [sponsorModalOpen, setSponsorModalOpen] = useState(false);
  const [sponsorQuantity, setSponsorQuantity] = useState(10);
  const [sponsorSuccess, setSponsorSuccess] = useState(false);

  const languages = ['All', 'English', 'Hindi', 'Gujarati', 'Bengali', 'Marathi'];

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      (book.hindiTitle && book.hindiTitle.toLowerCase().includes(search.toLowerCase())) ||
      book.description.toLowerCase().includes(search.toLowerCase());

    const matchesLang = selectedLanguage === 'All' || book.language.toLowerCase() === selectedLanguage.toLowerCase();
    return matchesSearch && matchesLang;
  });

  const handleOpenPreview = (book) => {
    setSelectedBook(book);
    setPreviewModalOpen(true);
  };

  const handleOpenSponsor = (book) => {
    setSelectedBook(book);
    setSponsorSuccess(false);
    setSponsorQuantity(10);
    setSponsorModalOpen(true);
  };

  const handleConfirmSponsor = () => {
    if (!selectedBook) return;
    try {
      mockApi.donateToCampaign('camp-2', {
        amount: sponsorQuantity * selectedBook.sponsorCost,
        donorName: 'Generous Gita Patron',
        donorEmail: 'patron@example.com',
        allocatedCenter: selectedBook.distributionLocations?.[0] || 'National Pool',
      });
      setSponsorSuccess(true);
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div className="py-12 bg-vedic-cream/40 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="gold" className="text-xs uppercase tracking-widest px-3 py-1">
            Bhaktivedanta Book Trust • Sacred Publications
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Bhagavad Gita Sacred Books Catalog
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            The authentic, unaltered editions of <em>Bhagavad-gītā As It Is</em> with original Sanskrit verses, English translations, word-for-word synonyms, and elaborative purports.
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
            <input
              type="text"
              placeholder="Search books by title, language, or ISBN..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-vedic-teal bg-slate-50/50"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            <span className="text-xs font-bold text-slate-500 mr-1 flex items-center gap-1">
              <Globe size={14} /> Language:
            </span>
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLanguage(lang)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                  selectedLanguage === lang
                    ? 'bg-vedic-primary text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* Catalog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-card transition-all flex flex-col justify-between"
            >
              <div>
                {/* Book Cover Image Container */}
                <div className="relative h-56 bg-slate-100 overflow-hidden group">
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="bg-slate-900/85 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                      {book.language}
                    </span>
                    <span className="bg-amber-400 text-slate-950 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                      ₹{book.price}
                    </span>
                  </div>

                  <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-lg text-[11px] font-bold text-emerald-800 shadow-sm flex items-center gap-1">
                    <PackageCheck size={13} className="text-emerald-600" />
                    <span>{book.stockAvailable.toLocaleString()} Available</span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="font-bold text-base text-slate-900 leading-snug line-clamp-2">
                      {book.title}
                    </h3>
                    {book.hindiTitle && (
                      <p className="text-xs text-amber-800 font-medium font-shloka mt-0.5 truncate">
                        {book.hindiTitle}
                      </p>
                    )}
                  </div>

                  <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                    {book.description}
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <div>
                      <span className="text-slate-400 block font-semibold">Author</span>
                      <strong className="text-slate-800 truncate block">{book.author.split('Swami')[0]}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-semibold">Pages / Binding</span>
                      <strong className="text-slate-800 truncate block">{book.pages} Pages</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => handleOpenPreview(book)}
                  className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-200 transition"
                >
                  Read Sample
                </button>
                <Button
                  size="sm"
                  variant="gold"
                  onClick={() => handleOpenSponsor(book)}
                  className="text-xs font-bold"
                  icon={Heart}
                >
                  Sponsor Copies (₹{book.sponsorCost}/bk)
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Book Sample Preview Modal */}
      <Modal
        isOpen={previewModalOpen}
        onClose={() => setPreviewModalOpen(false)}
        title={selectedBook ? `Sample Preview: ${selectedBook.title}` : 'Book Excerpt'}
        maxWidth="max-w-xl"
      >
        {selectedBook && (
          <div className="space-y-4">
            <div className="bg-amber-50 rounded-xl p-4 border border-amber-200 text-center space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                Sample Excerpt • Chapter 2, Verse 47
              </span>
              <p className="font-shloka text-lg text-amber-950 font-bold">
                कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।<br />
                मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥
              </p>
              <p className="text-xs text-slate-700 italic">
                &ldquo;You have a right to perform your prescribed duty, but you are not entitled to the fruits of action. Never consider yourself the cause of the results of your activities, and never be attached to not doing your duty.&rdquo;
              </p>
            </div>

            <div className="space-y-2 text-xs text-slate-600">
              <h5 className="font-bold text-slate-800">Purport Summary by Srila Prabhupada:</h5>
              <p className="leading-relaxed">
                One must act out of duty according to one&apos;s prescribed work, without attachment to personal gain. Inaction (akarma) is strictly prohibited. The living entity is meant to work in harmony with the supreme cosmic order.
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end">
              <Button size="sm" onClick={() => setPreviewModalOpen(false)}>
                Close Preview
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Sponsor Book Copies Modal */}
      <Modal
        isOpen={sponsorModalOpen}
        onClose={() => setSponsorModalOpen(false)}
        title={selectedBook ? `Sponsor: ${selectedBook.title}` : 'Sponsor Books'}
        maxWidth="max-w-lg"
      >
        {sponsorSuccess ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-2xl mx-auto">
              ❤️
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-900">Thank You for Your Sacred Sponsorship!</h4>
              <p className="text-xs text-slate-500 mt-1">
                You have sponsored <strong>{sponsorQuantity} copies</strong> of {selectedBook?.title}. These will be distributed directly to registered school students.
              </p>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 text-xs text-orange-950 text-left space-y-1">
              <div><strong>Amount Contributed:</strong> ₹{(sponsorQuantity * (selectedBook?.sponsorCost || 180)).toLocaleString()}</div>
              <div><strong>80G Receipt:</strong> Generated & recorded in your Donor history</div>
              <div><strong>Destination:</strong> {selectedBook?.distributionLocations?.[0]} Exam Center</div>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <Button size="sm" onClick={() => setSponsorModalOpen(false)}>
                Done
              </Button>
              <Link
                to="/donations"
                className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold transition"
              >
                View Campaigns & Receipts
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-xs text-amber-900">
              Subsidized student sponsorship rate: <strong>₹{selectedBook?.sponsorCost} per book</strong> (Regular ₹{selectedBook?.price}). Eligible for 80G tax deduction.
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Select Number of Copies to Sponsor:</label>
              <div className="grid grid-cols-4 gap-2">
                {[5, 10, 25, 50].map((qty) => (
                  <button
                    key={qty}
                    type="button"
                    onClick={() => setSponsorQuantity(qty)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition ${
                      sponsorQuantity === qty
                        ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {qty} Copies
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs space-y-1">
              <div className="flex justify-between text-slate-600">
                <span>Rate per book:</span>
                <span>₹{selectedBook?.sponsorCost}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Number of students reached:</span>
                <span>{sponsorQuantity} Students</span>
              </div>
              <div className="flex justify-between font-bold text-slate-900 pt-2 border-t border-slate-200 text-sm">
                <span>Total Contribution:</span>
                <span className="text-amber-700">₹{(sponsorQuantity * (selectedBook?.sponsorCost || 180)).toLocaleString()}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => setSponsorModalOpen(false)}>
                Cancel
              </Button>
              <Button size="sm" variant="gold" onClick={handleConfirmSponsor}>
                Confirm Sponsorship (Simulated)
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
