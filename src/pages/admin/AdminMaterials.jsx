import React, { useState } from 'react';
import { FileText, PlusCircle, Download, Trash2, Edit2, CheckCircle, Search, UploadCloud } from 'lucide-react';
import { MOCK_DOWNLOADABLE_RESOURCES } from '../../mock/materials';
import Modal from '../../components/ui/Modal';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

export default function AdminMaterials() {
  const [resources, setResources] = useState(MOCK_DOWNLOADABLE_RESOURCES);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    title: '',
    category: 'Syllabus Guide',
    fileSize: '3.5 MB',
    pages: 20,
  });

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    const newRes = {
      id: `res-${Date.now()}`,
      title: uploadForm.title,
      category: uploadForm.category,
      fileSize: uploadForm.fileSize,
      pages: Number(uploadForm.pages),
      downloadCount: 0,
      downloadUrl: '#new-resource.pdf',
    };
    setResources([newRes, ...resources]);
    setShowUploadModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Educational Resources & Study Materials (PDFs)
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage student guides, past olympiad papers, and audio recitation packs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button size="sm" onClick={() => setShowUploadModal(true)} icon={UploadCloud}>
            Upload New Material (PDF)
          </Button>
        </div>
      </div>

      {/* Grid of Materials */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resources.map((res) => (
          <div key={res.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 uppercase">
                  {res.category}
                </span>
                <span className="text-xs text-slate-400 font-mono">{res.fileSize} • {res.pages} Pages</span>
              </div>

              <h3 className="font-bold text-base text-slate-900 leading-snug">
                {res.title}
              </h3>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-4">
              <span className="text-xs text-slate-500">
                📥 <strong>{(res.downloadCount || 0).toLocaleString()}</strong> Student Downloads
              </span>

              <button
                onClick={() => alert(`Simulated download for: ${res.title}`)}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition flex items-center gap-1.5"
              >
                <Download size={13} />
                <span>Download Sample</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Modal */}
      <Modal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        title="Upload Student Study Resource"
        maxWidth="max-w-md"
      >
        <form onSubmit={handleUploadSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Document Title *</label>
            <input
              type="text"
              required
              value={uploadForm.title}
              onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-vedic-teal focus:outline-none"
              placeholder="e.g. 2026 Gita Olympiad Mock Question Paper 1"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Category</label>
              <select
                value={uploadForm.category}
                onChange={(e) => setUploadForm({ ...uploadForm, category: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-vedic-teal focus:outline-none"
              >
                <option>Syllabus Guide</option>
                <option>Sample Papers</option>
                <option>Shloka Handbook</option>
                <option>Leadership Special</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Estimated Pages</label>
              <input
                type="number"
                min="1"
                value={uploadForm.pages}
                onChange={(e) => setUploadForm({ ...uploadForm, pages: Number(e.target.value) })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-vedic-teal focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => setShowUploadModal(false)}>
              Cancel
            </Button>
            <Button type="submit" size="sm">
              Confirm Upload
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
