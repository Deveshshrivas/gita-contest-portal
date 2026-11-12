import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, Building, Clock } from 'lucide-react';
import { mockApi } from '../../services/mockApi';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

export default function Contact() {
  const [centers] = useState(() => mockApi.getCenters());
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Contest Inquiries',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-12 bg-vedic-cream/30 min-h-screen space-y-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="primary" className="text-xs uppercase tracking-widest px-3 py-1">
            Support & Examination Centers
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Contact Directorate & Exam Centers
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Need assistance with registration, admit cards, book deliveries, or center allocations? Our support team and zonal coordinators are here to assist.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Details Card */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
              <h3 className="font-bold text-lg text-slate-900">National Headquarters</h3>
              
              <div className="space-y-3 text-xs text-slate-600">
                <div className="flex items-start gap-3">
                  <MapPin size={17} className="text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong>Central Examination Directorate</strong><br />
                    ISKCON Youth Forum, Sant Nagar, East of Kailash, New Delhi, Delhi 110065
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail size={17} className="text-amber-600 shrink-0" />
                  <div>
                    <strong>Email:</strong> support@gitacontest.in
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone size={17} className="text-amber-600 shrink-0" />
                  <div>
                    <strong>Helpline:</strong> +91 98765 43210 / +91 11 2698 0000
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock size={17} className="text-amber-600 shrink-0" />
                  <div>
                    <strong>Hours:</strong> Mon - Sat: 9:00 AM - 6:00 PM IST
                  </div>
                </div>
              </div>
            </div>

            {/* Quick WhatsApp Support Callout */}
            <div className="bg-emerald-50 rounded-2xl border border-emerald-200 p-6 shadow-xs space-y-2 text-xs">
              <span className="font-bold text-emerald-900 text-sm block">Direct Candidate WhatsApp Desk</span>
              <p className="text-emerald-700 leading-relaxed">
                Registered students can send roll number queries to our automated verification bot for instant admit card status.
              </p>
              <div className="pt-2">
                <span className="font-mono font-bold text-emerald-800 bg-white px-3 py-1.5 rounded-lg border border-emerald-300 inline-block">
                  +91 98123 45678 (WhatsApp Only)
                </span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
              {submitted ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl mx-auto">
                    ✓
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Message Received!</h3>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                    Thank you for reaching out. A coordinator will reply to <strong>{formData.email}</strong> within 24 business hours.
                  </p>
                  <Button size="sm" onClick={() => setSubmitted(false)}>
                    Send Another Query
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-xl font-bold text-slate-900">Send an Official Inquiry</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-vedic-teal focus:outline-none"
                        placeholder="e.g. Radhika Verma"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-vedic-teal focus:outline-none"
                        placeholder="radhika@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Phone / WhatsApp</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-vedic-teal focus:outline-none"
                        placeholder="+91 98765 43210"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Subject</label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-vedic-teal focus:outline-none"
                      >
                        <option>Exam Registration / Roll Number</option>
                        <option>Admit Card & Center Allocation</option>
                        <option>Bhagavad Gita Book Sponsorship</option>
                        <option>School Institutional Enrolment</option>
                        <option>Technical Issue during Test</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Detailed Message *</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-vedic-teal focus:outline-none"
                      placeholder="Please write your query here..."
                    />
                  </div>

                  <div className="pt-2">
                    <Button type="submit" size="md" icon={Send} className="font-bold">
                      Submit Message
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Examination Centers Directory */}
        <div className="space-y-4 pt-6">
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Official Zonal Examination Centers
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {centers.map((ctr) => (
              <div key={ctr.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded border">
                    {ctr.id}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    {ctr.status}
                  </span>
                </div>
                <h4 className="font-bold text-sm text-slate-900 leading-snug">{ctr.name}</h4>
                <p className="text-xs text-slate-500 line-clamp-2">{ctr.address}</p>
                <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-600 flex justify-between">
                  <span>Capacity: {ctr.capacity.toLocaleString()}</span>
                  <span>Manager: {ctr.managerName.split(' ')[0]}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
