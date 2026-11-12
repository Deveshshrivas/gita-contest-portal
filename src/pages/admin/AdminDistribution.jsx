import React, { useState } from 'react';
import {
  Truck,
  PlusCircle,
  Package,
  CheckCircle,
  Clock,
  MapPin,
  AlertTriangle,
  Search,
  Filter,
  FileText,
  UserCheck,
} from 'lucide-react';
import { mockApi } from '../../services/mockApi';
import Modal from '../../components/ui/Modal';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

export default function AdminDistribution() {
  const [distributionCampaigns, setDistributionCampaigns] = useState(() => mockApi.getDistributionCampaigns());
  const [dispatchLogs, setDispatchLogs] = useState(() => mockApi.getDispatchLogs());
  const [books] = useState(() => mockApi.getBooks());
  const [centers] = useState(() => mockApi.getCenters());

  const [activeTab, setActiveTab] = useState('dispatches'); // 'dispatches' or 'campaigns'
  const [search, setSearch] = useState('');
  const [showDispatchModal, setShowDispatchModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedDispatch, setSelectedDispatch] = useState(null);
  const [statusUpdate, setStatusUpdate] = useState('delivered');
  const [receiverName, setReceiverName] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  // New Dispatch Form
  const [dispatchForm, setDispatchForm] = useState({
    bookId: books[0]?.id || '',
    quantity: 500,
    sourceHub: 'Mayapur Central Warehouse',
    destination: 'Delhi Public School (Center 01)',
    courierName: 'DTDC Express Logistics',
    notes: 'Official student packs for exam participants',
  });

  const filteredLogs = dispatchLogs.filter(
    (log) =>
      log.destination.toLowerCase().includes(search.toLowerCase()) ||
      log.trackingNumber.toLowerCase().includes(search.toLowerCase()) ||
      log.bookTitle.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenStatusUpdate = (log) => {
    setSelectedDispatch(log);
    setStatusUpdate(log.status);
    setReceiverName(log.receivedBy || '');
    setShowStatusModal(true);
  };

  const handleSaveStatus = (e) => {
    e.preventDefault();
    if (!selectedDispatch) return;

    mockApi.updateDispatchStatus(selectedDispatch.id, statusUpdate, receiverName);
    setDispatchLogs(mockApi.getDispatchLogs());
    setShowStatusModal(false);
    setSuccessMsg(`Dispatch ${selectedDispatch.trackingNumber} updated to ${statusUpdate}.`);
    setTimeout(() => setSuccessMsg(null), 4000);
  };

  const handleCreateDispatch = (e) => {
    e.preventDefault();
    setErrorMsg(null);

    const targetBook = books.find((b) => b.id === dispatchForm.bookId);

    try {
      mockApi.createDispatchLog({
        ...dispatchForm,
        bookTitle: targetBook?.title || 'Bhagavad Gita As It Is',
      });

      setDispatchLogs(mockApi.getDispatchLogs());
      setShowDispatchModal(false);
      setSuccessMsg(`Dispatch consignment created and stock allocated!`);
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
            Book Distribution & Dispatch Logistics
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitor courier consignments, delivery confirmations, and center stock handovers.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button size="sm" onClick={() => setShowDispatchModal(true)} icon={PlusCircle}>
            Create Dispatch Consignment
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

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('dispatches')}
          className={`pb-3 px-3 text-xs font-bold transition flex items-center gap-1.5 border-b-2 ${
            activeTab === 'dispatches'
              ? 'border-vedic-primary text-vedic-primary'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Truck size={15} />
          <span>Active Consignments & Dispatches ({dispatchLogs.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('campaigns')}
          className={`pb-3 px-3 text-xs font-bold transition flex items-center gap-1.5 border-b-2 ${
            activeTab === 'campaigns'
              ? 'border-vedic-primary text-vedic-primary'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Package size={15} />
          <span>Zonal Distribution Drives ({distributionCampaigns.length})</span>
        </button>
      </div>

      {activeTab === 'dispatches' ? (
        <div className="space-y-4">
          {/* Search bar */}
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
            <input
              type="text"
              placeholder="Search by tracking no, school, center..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-vedic-teal bg-white"
            />
          </div>

          {/* Dispatches Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Tracking Number</th>
                    <th className="py-3 px-4">Book Edition</th>
                    <th className="py-3 px-4 text-center">Quantity</th>
                    <th className="py-3 px-4">Destination</th>
                    <th className="py-3 px-4">Logistics Partner</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredLogs.map((log) => {
                    const isDelivered = log.status === 'delivered';
                    const isInTransit = log.status === 'in_transit';

                    return (
                      <tr key={log.id} className="hover:bg-slate-50/80 transition">
                        <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                          {log.trackingNumber}
                          <div className="text-[10px] text-slate-400 font-normal">Date: {log.dispatchDate}</div>
                        </td>
                        <td className="py-3.5 px-4 font-medium text-slate-800">
                          {log.bookTitle}
                        </td>
                        <td className="py-3.5 px-4 text-center font-bold font-mono text-slate-900">
                          {log.quantity.toLocaleString()} bks
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-slate-800">{log.destination}</div>
                          {log.receivedBy && (
                            <div className="text-[10px] text-emerald-700">Recv: {log.receivedBy}</div>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-slate-600">
                          {log.courierName}
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                              isDelivered
                                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                : isInTransit
                                ? 'bg-amber-50 text-amber-800 border border-amber-200'
                                : 'bg-blue-50 text-blue-800 border border-blue-200'
                            }`}
                          >
                            {isDelivered && <CheckCircle size={11} className="text-emerald-600" />}
                            {isInTransit && <Clock size={11} className="text-amber-600" />}
                            <span className="capitalize">{log.status.replace('_', ' ')}</span>
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <Button
                            size="xs"
                            variant="outline"
                            onClick={() => handleOpenStatusUpdate(log)}
                            className="font-bold"
                          >
                            Update Status
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        /* Distribution Campaigns Grid */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {distributionCampaigns.map((camp) => (
            <div key={camp.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                  {camp.allocatedCenter}
                </span>
                <h3 className="font-bold text-base text-slate-900 mt-1">{camp.name}</h3>
                <p className="text-xs text-slate-500 font-medium">{camp.bookTitle}</p>
              </div>

              <div className="space-y-2 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Target Copies:</span>
                  <strong>{camp.targetQuantity.toLocaleString()}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Delivered:</span>
                  <strong className="text-emerald-700">{camp.deliveredQuantity.toLocaleString()}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Coordinator:</span>
                  <span>{camp.coordinator}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Dispatch Consignment Modal */}
      <Modal
        isOpen={showDispatchModal}
        onClose={() => setShowDispatchModal(false)}
        title="Create New Dispatch Consignment"
        maxWidth="max-w-lg"
      >
        <form onSubmit={handleCreateDispatch} className="space-y-4">
          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-300 text-rose-800 rounded-xl text-xs font-bold flex items-start gap-2">
              <AlertTriangle size={16} className="text-rose-600 shrink-0 mt-0.5" />
              <div>
                <strong>Stock Guard Violation:</strong> {errorMsg}
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Select Book Edition to Dispatch *</label>
            <select
              value={dispatchForm.bookId}
              onChange={(e) => setDispatchForm({ ...dispatchForm, bookId: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-vedic-teal focus:outline-none"
            >
              {books.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.title} ({b.stockAvailable} available in stock)
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Quantity (Books) *</label>
              <input
                type="number"
                min="10"
                required
                value={dispatchForm.quantity}
                onChange={(e) => setDispatchForm({ ...dispatchForm, quantity: Number(e.target.value) })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-vedic-teal focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Logistics / Courier Name *</label>
              <input
                type="text"
                required
                value={dispatchForm.courierName}
                onChange={(e) => setDispatchForm({ ...dispatchForm, courierName: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-vedic-teal focus:outline-none"
                placeholder="e.g. DTDC Logistics"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Destination Center / School *</label>
            <input
              type="text"
              required
              value={dispatchForm.destination}
              onChange={(e) => setDispatchForm({ ...dispatchForm, destination: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-vedic-teal focus:outline-none"
              placeholder="e.g. Delhi Public School Examination Hub"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => setShowDispatchModal(false)}>
              Cancel
            </Button>
            <Button type="submit" size="sm">
              Confirm Dispatch Consignment
            </Button>
          </div>
        </form>
      </Modal>

      {/* Update Dispatch Status Modal */}
      <Modal
        isOpen={showStatusModal}
        onClose={() => setShowStatusModal(false)}
        title={selectedDispatch ? `Update Consignment: ${selectedDispatch.trackingNumber}` : 'Status Update'}
        maxWidth="max-w-md"
      >
        <form onSubmit={handleSaveStatus} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Delivery Status</label>
            <select
              value={statusUpdate}
              onChange={(e) => setStatusUpdate(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-vedic-teal focus:outline-none"
            >
              <option value="dispatched">Dispatched</option>
              <option value="in_transit">In Transit</option>
              <option value="delivered">Delivered / Handed Over</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Handed Over To / Receiver Name</label>
            <input
              type="text"
              value={receiverName}
              onChange={(e) => setReceiverName(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-vedic-teal focus:outline-none"
              placeholder="e.g. Library Department / Headmaster"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => setShowStatusModal(false)}>
              Cancel
            </Button>
            <Button type="submit" size="sm">
              Update Status
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
