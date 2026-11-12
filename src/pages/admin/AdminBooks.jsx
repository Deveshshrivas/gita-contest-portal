import React, { useState } from 'react';
import {
  BookOpen,
  PlusCircle,
  PackageCheck,
  AlertTriangle,
  Edit2,
  Trash2,
  Search,
  Filter,
  Layers,
  CheckCircle,
  TrendingDown,
  Globe,
  X,
} from 'lucide-react';
import { mockApi } from '../../services/mockApi';
import Modal from '../../components/ui/Modal';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

export default function AdminBooks() {
  const [books, setBooks] = useState(() => mockApi.getBooks());
  const [search, setSearch] = useState('');
  const [selectedLang, setSelectedLang] = useState('All');
  const [editingBook, setEditingBook] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showStockModal, setShowStockModal] = useState(false);
  const [selectedBookForStock, setSelectedBookForStock] = useState(null);
  const [stockDelta, setStockDelta] = useState({ received: 0, allocated: 0, distributed: 0 });
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  // New book form
  const [formData, setFormData] = useState({
    title: '',
    hindiTitle: '',
    author: 'A.C. Bhaktivedanta Swami Prabhupāda',
    language: 'English',
    isbn: '',
    pages: 800,
    edition: 'Standard Hardbound',
    price: 300,
    sponsorCost: 180,
    stockReceived: 1000,
    stockAllocated: 0,
    stockDistributed: 0,
    description: '',
  });

  const filteredBooks = books.filter((b) => {
    const matchesSearch =
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      (b.hindiTitle && b.hindiTitle.toLowerCase().includes(search.toLowerCase())) ||
      (b.isbn && b.isbn.toLowerCase().includes(search.toLowerCase()));
    const matchesLang = selectedLang === 'All' || b.language.toLowerCase() === selectedLang.toLowerCase();
    return matchesSearch && matchesLang;
  });

  const totalReceived = books.reduce((acc, b) => acc + (b.stockReceived || 0), 0);
  const totalAllocated = books.reduce((acc, b) => acc + (b.stockAllocated || 0), 0);
  const totalDistributed = books.reduce((acc, b) => acc + (b.stockDistributed || 0), 0);
  const totalAvailable = books.reduce((acc, b) => acc + (b.stockAvailable || 0), 0);

  const handleOpenStockAdjust = (book) => {
    setSelectedBookForStock(book);
    setStockDelta({
      received: book.stockReceived,
      allocated: book.stockAllocated,
      distributed: book.stockDistributed,
    });
    setErrorMsg(null);
    setShowStockModal(true);
  };

  const handleSaveStock = (e) => {
    e.preventDefault();
    if (!selectedBookForStock) return;
    setErrorMsg(null);

    try {
      mockApi.updateBookInventory(selectedBookForStock.id, {
        stockReceived: stockDelta.received,
        stockAllocated: stockDelta.allocated,
        stockDistributed: stockDelta.distributed,
      });

      setBooks(mockApi.getBooks());
      setSuccessMsg(`Inventory for "${selectedBookForStock.title}" updated successfully.`);
      setShowStockModal(false);
      setTimeout(() => setSuccessMsg(null), 4000);
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  const handleAddBookSubmit = (e) => {
    e.preventDefault();
    try {
      mockApi.addBook(formData);
      setBooks(mockApi.getBooks());
      setShowAddModal(false);
      setSuccessMsg(`New book title added to inventory!`);
      setTimeout(() => setSuccessMsg(null), 4000);
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Bhagavad Gita Inventory & Stock Management
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time tracking of book stock with automated Negative Stock Protection.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button size="sm" onClick={() => setShowAddModal(true)} icon={PlusCircle}>
            Add New Title
          </Button>
        </div>
      </div>

      {/* Success Notification */}
      {successMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2">
          <CheckCircle size={15} className="text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Stock Analytics Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Received</span>
          <strong className="text-xl sm:text-2xl font-extrabold text-slate-900">{totalReceived.toLocaleString()}</strong>
          <span className="text-[11px] text-slate-500 block mt-1">From BBT Press</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block">Currently Available</span>
          <strong className="text-xl sm:text-2xl font-extrabold text-emerald-700">{totalAvailable.toLocaleString()}</strong>
          <span className="text-[11px] text-emerald-600 font-medium block mt-1">Protected (No deficit)</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider block">Allocated to Centers</span>
          <strong className="text-xl sm:text-2xl font-extrabold text-amber-700">{totalAllocated.toLocaleString()}</strong>
          <span className="text-[11px] text-slate-500 block mt-1">Pending dispatch</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">Total Distributed</span>
          <strong className="text-xl sm:text-2xl font-extrabold text-blue-700">{totalDistributed.toLocaleString()}</strong>
          <span className="text-[11px] text-slate-500 block mt-1">To school candidates</span>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
          <input
            type="text"
            placeholder="Search by title, ISBN..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-vedic-teal"
          />
        </div>

        <div className="flex items-center gap-1 overflow-x-auto w-full md:w-auto">
          {['All', 'English', 'Hindi', 'Gujarati', 'Bengali', 'Marathi'].map((lang) => (
            <button
              key={lang}
              onClick={() => setSelectedLang(lang)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition whitespace-nowrap ${
                selectedLang === lang ? 'bg-slate-900 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>

      {/* Books Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Book Edition</th>
                <th className="py-3 px-4">Language</th>
                <th className="py-3 px-4">Price / Sponsor</th>
                <th className="py-3 px-4 text-center">Received</th>
                <th className="py-3 px-4 text-center">Allocated</th>
                <th className="py-3 px-4 text-center">Distributed</th>
                <th className="py-3 px-4 text-center">Available Stock</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredBooks.map((book) => {
                const isLowStock = book.stockAvailable < 2000;
                return (
                  <tr key={book.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">{book.title}</div>
                      <div className="text-[11px] text-slate-400 font-mono">ISBN: {book.isbn || 'BBT-STD'}</div>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-600">
                      <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px]">
                        {book.language}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div>₹{book.price} <span className="text-[10px] text-slate-400">(MRP)</span></div>
                      <div className="text-[10px] text-amber-700 font-bold">₹{book.sponsorCost} (Sponsor)</div>
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono font-semibold text-slate-800">
                      {book.stockReceived.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono text-amber-700 font-semibold">
                      {book.stockAllocated.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono text-blue-700 font-semibold">
                      {book.stockDistributed.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-extrabold ${
                          isLowStock
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        }`}
                      >
                        {isLowStock && <AlertTriangle size={12} className="text-rose-500" />}
                        {book.stockAvailable.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Button
                        size="xs"
                        variant="outline"
                        onClick={() => handleOpenStockAdjust(book)}
                        className="font-bold"
                      >
                        Adjust Stock
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stock Adjustment Modal with Negative Stock Protection */}
      <Modal
        isOpen={showStockModal}
        onClose={() => setShowStockModal(false)}
        title={selectedBookForStock ? `Manage Inventory: ${selectedBookForStock.title}` : 'Adjust Stock'}
        maxWidth="max-w-lg"
      >
        <form onSubmit={handleSaveStock} className="space-y-4">
          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-300 text-rose-800 rounded-xl text-xs font-bold flex items-start gap-2">
              <AlertTriangle size={16} className="text-rose-600 shrink-0 mt-0.5" />
              <div>
                <strong>Negative Stock Blocked:</strong> {errorMsg}
              </div>
            </div>
          )}

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Inventory Calculation Guard:</span>
            <div className="font-mono text-xs">Available = Received ({stockDelta.received}) - [Allocated ({stockDelta.allocated}) + Distributed ({stockDelta.distributed})]</div>
            <div className="text-sm font-bold pt-1">
              Resulting Available Stock:{' '}
              <span className={stockDelta.received - (stockDelta.allocated + stockDelta.distributed) < 0 ? 'text-rose-600' : 'text-emerald-700'}>
                {stockDelta.received - (stockDelta.allocated + stockDelta.distributed)} units
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Stock Received (Total from Press) *</label>
            <input
              type="number"
              min="0"
              required
              value={stockDelta.received}
              onChange={(e) => setStockDelta({ ...stockDelta, received: Number(e.target.value) })}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-vedic-teal focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Stock Allocated to Centers</label>
              <input
                type="number"
                min="0"
                required
                value={stockDelta.allocated}
                onChange={(e) => setStockDelta({ ...stockDelta, allocated: Number(e.target.value) })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-vedic-teal focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Stock Handed Over / Distributed</label>
              <input
                type="number"
                min="0"
                required
                value={stockDelta.distributed}
                onChange={(e) => setStockDelta({ ...stockDelta, distributed: Number(e.target.value) })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-vedic-teal focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => setShowStockModal(false)}>
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={stockDelta.received - (stockDelta.allocated + stockDelta.distributed) < 0}
            >
              Save Stock Changes
            </Button>
          </div>
        </form>
      </Modal>

      {/* Add New Book Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Bhagavad Gita Publication"
        maxWidth="max-w-lg"
      >
        <form onSubmit={handleAddBookSubmit} className="space-y-3">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Book Title (English) *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-vedic-teal focus:outline-none"
              placeholder="e.g. Bhagavad-gītā As It Is (Tamil Edition)"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Language *</label>
              <select
                value={formData.language}
                onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-vedic-teal focus:outline-none"
              >
                <option>English</option>
                <option>Hindi</option>
                <option>Gujarati</option>
                <option>Bengali</option>
                <option>Marathi</option>
                <option>Tamil</option>
                <option>Telugu</option>
                <option>Kannada</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">ISBN</label>
              <input
                type="text"
                value={formData.isbn}
                onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-vedic-teal focus:outline-none font-mono"
                placeholder="978-9382109..."
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Price (₹)</label>
              <input
                type="number"
                min="0"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-vedic-teal focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Sponsor Rate (₹)</label>
              <input
                type="number"
                min="0"
                value={formData.sponsorCost}
                onChange={(e) => setFormData({ ...formData, sponsorCost: Number(e.target.value) })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-vedic-teal focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Initial Stock</label>
              <input
                type="number"
                min="0"
                value={formData.stockReceived}
                onChange={(e) => setFormData({ ...formData, stockReceived: Number(e.target.value) })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-vedic-teal focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button type="submit" size="sm">
              Save Book Title
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
