import React, { useState } from 'react';
import { Settings, Shield, Award, CheckCircle, Save, RefreshCw } from 'lucide-react';
import Button from '../../components/ui/Button';

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    platformName: 'National Gita Leadership Examination Board',
    passingPercentage: 60,
    tabSwitchLimit: 3,
    autoSubmitOnTimerExpiry: true,
    certificateSignatoryName: 'Dr. Achyuta Krishna Das (Director)',
    certificateSignatoryTitle: 'Chairman, ISKCON Global Education Board',
    verificationPrefix: 'CERT-GLC-2026',
    enableNegativeMarkingDefault: true,
  });

  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Platform Configuration & System Settings
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure examination rules, proctoring security, and certificate credentials.
          </p>
        </div>
      </div>

      {saved && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2">
          <CheckCircle size={15} className="text-emerald-600 shrink-0" />
          <span>System configuration updated and applied successfully!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Examination & Proctoring Rules */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Shield size={18} className="text-vedic-primary" />
            <h3 className="font-bold text-sm text-slate-900">Examination & Proctoring Controls</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-slate-700">Global Passing Percentage (%)</label>
              <input
                type="number"
                min="35"
                max="90"
                value={settings.passingPercentage}
                onChange={(e) => setSettings({ ...settings, passingPercentage: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-vedic-teal focus:outline-none"
              />
              <span className="text-[10px] text-slate-400">Score needed to unlock Stage 2</span>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">Tab-Switch Warning Tolerance</label>
              <input
                type="number"
                min="1"
                max="10"
                value={settings.tabSwitchLimit}
                onChange={(e) => setSettings({ ...settings, tabSwitchLimit: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-vedic-teal focus:outline-none"
              />
              <span className="text-[10px] text-slate-400">Violations allowed before auto-freeze</span>
            </div>
          </div>
        </div>

        {/* Certificate Credentials */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Award size={18} className="text-amber-500" />
            <h3 className="font-bold text-sm text-slate-900">Certificate of Merit Signatory & Credentials</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-slate-700">Official Signatory Name</label>
              <input
                type="text"
                value={settings.certificateSignatoryName}
                onChange={(e) => setSettings({ ...settings, certificateSignatoryName: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-vedic-teal focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700">Signatory Designation</label>
              <input
                type="text"
                value={settings.certificateSignatoryTitle}
                onChange={(e) => setSettings({ ...settings, certificateSignatoryTitle: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-vedic-teal focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button type="submit" size="md" icon={Save} className="font-bold">
            Save Platform Settings
          </Button>
        </div>
      </form>
    </div>
  );
}
