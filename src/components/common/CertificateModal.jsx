import React from 'react';
import { Award, Printer, X, ShieldCheck, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CertificateModal({ result, onClose }) {
  if (!result) return null;

  // Trigger celebratory confetti on mount
  React.useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#044e45', '#d97706', '#10b981'],
      });
    } catch {}
  }, []);

  const handlePrint = () => {
    const certElement = document.getElementById('printable-certificate');
    if (!certElement) {
      window.print();
      return;
    }

    try {
      // Create isolated, hidden iframe for crystal-clear certificate printing
      const iframe = document.createElement('iframe');
      iframe.style.position = 'fixed';
      iframe.style.right = '0';
      iframe.style.bottom = '0';
      iframe.style.width = '0';
      iframe.style.height = '0';
      iframe.style.border = '0';
      iframe.setAttribute('title', 'Print Certificate Frame');
      document.body.appendChild(iframe);

      const doc = iframe.contentWindow.document;
      doc.open();
      doc.write(`
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="utf-8" />
            <title>Certificate of Merit - ${result.candidateName || 'Candidate'}</title>
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800&family=Noto+Serif+Devanagari:wght@400;600;700&family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
            ${Array.from(document.querySelectorAll('link[rel="stylesheet"], style'))
              .map((el) => el.outerHTML)
              .join('\n')}
            <style>
              @page {
                size: A4 landscape;
                margin: 6mm;
              }
              *, *::before, *::after {
                box-sizing: border-box !important;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
              html, body {
                margin: 0 !important;
                padding: 0 !important;
                background-color: #ffffff !important;
                color: #0f172a !important;
                font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif !important;
              }
              body {
                display: flex;
                align-items: center;
                justify-content: center;
                min-height: 100vh;
                padding: 8px;
              }
              #printable-certificate {
                width: 100% !important;
                max-width: 980px !important;
                margin: 0 auto !important;
                padding: 20px !important;
                background-color: #fffdfa !important;
                page-break-inside: avoid !important;
                border-radius: 8px !important;
              }
              .font-shloka {
                font-family: 'Noto Serif Devanagari', 'Merriweather', serif !important;
              }
            </style>
          </head>
          <body>
            ${certElement.outerHTML}
          </body>
        </html>
      `);
      doc.close();

      setTimeout(() => {
        try {
          iframe.contentWindow.focus();
          iframe.contentWindow.print();
        } catch (e) {
          console.warn('Iframe print execution fallback:', e);
          window.print();
        } finally {
          setTimeout(() => {
            if (document.body.contains(iframe)) {
              document.body.removeChild(iframe);
            }
          }, 4000);
        }
      }, 400);
    } catch (err) {
      console.warn('Printing error, standard fallback:', err);
      window.print();
    }
  };

  const formattedDate = new Date(result.submittedAt || Date.now()).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="certificate-modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm overflow-y-auto">
      <div className="certificate-modal-wrapper relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Top Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white print:hidden">
          <div className="flex items-center gap-2">
            <Award className="text-amber-400" size={20} />
            <span className="font-bold text-sm">Official Gita Contest Certificate of Merit</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-slate-950 transition cursor-pointer"
            >
              <Printer size={14} />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={onClose}
              type="button"
              aria-label="Close Certificate"
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* ── Printable Certificate Body ── */}
        <div id="printable-certificate" className="p-6 sm:p-10 bg-[#fffdfa] text-slate-900 relative">
          {/* Ornate Outer Border */}
          <div className="border-4 border-amber-600/70 p-2 sm:p-3 rounded-lg relative overflow-hidden">
            <div className="border border-amber-500/40 p-6 sm:p-10 rounded-sm relative bg-gradient-to-b from-amber-50/20 via-white to-amber-50/20 overflow-hidden">
              
              {/* Corner Ornaments */}
              <div className="absolute top-2 left-2 text-amber-700/80 text-xl font-shloka select-none pointer-events-none z-10">☸</div>
              <div className="absolute top-2 right-2 text-amber-700/80 text-xl font-shloka select-none pointer-events-none z-10">☸</div>
              <div className="absolute bottom-2 left-2 text-amber-700/80 text-xl font-shloka select-none pointer-events-none z-10">☸</div>
              <div className="absolute bottom-2 right-2 text-amber-700/80 text-xl font-shloka select-none pointer-events-none z-10">☸</div>

              {/* ── Sacred Om (ॐ) Watermark strictly in background layer ── */}
              <div
                aria-hidden="true"
                className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden"
              >
                <span
                  className="font-shloka select-none text-amber-800 leading-none transform -rotate-3 transition-all"
                  style={{
                    fontSize: 'clamp(180px, 24vw, 280px)',
                    opacity: 0.045,
                    lineHeight: 1,
                    filter: 'blur(0.3px)',
                    userSelect: 'none',
                    pointerEvents: 'none',
                  }}
                >
                  ॐ
                </span>
              </div>

              {/* ── Foreground Content strictly in z-10 layer above watermark ── */}
              <div className="relative z-10 text-center">
                {/* Header Symbol */}
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-3xl font-bold font-shloka text-amber-600">🕉️</span>
                </div>

                <div className="text-[11px] font-bold tracking-[0.25em] text-vedic-dark uppercase">
                  National Gita Leadership Contest & Examination Board
                </div>
                <div className="text-[10px] text-slate-500 tracking-wider uppercase mb-5">
                  ISKCON Global Education Board & Youth Directorate
                </div>

                {/* Certificate Title */}
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-amber-800 tracking-wide uppercase mb-1">
                  Certificate of Merit
                </h2>
                <div className="w-48 h-0.5 bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto mb-6"></div>

                {/* Presentation Text */}
                <p className="text-xs sm:text-sm text-slate-600 italic mb-2">
                  This certificate is proudly awarded to
                </p>

                {/* Candidate Name - Clear, Bold, Unobscured */}
                <div className="text-2xl sm:text-3xl md:text-4xl font-serif font-extrabold text-slate-900 underline decoration-amber-400 decoration-2 underline-offset-8 mb-4 tracking-tight">
                  {result.candidateName}
                </div>

                <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed mb-6">
                  for demonstrating outstanding wisdom, discipline, and understanding in the{' '}
                  <strong className="text-slate-900 font-semibold">{result.examName}</strong>. 
                  Awarded with the distinction of{' '}
                  <span className="font-bold text-vedic-primary bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {result.meritTier || 'Distinguished Achiever'}
                  </span>
                  .
                </p>

                {/* Scorecard pill */}
                <div className="inline-flex items-center justify-center gap-6 bg-amber-50/70 border border-amber-200 rounded-xl px-6 py-2.5 mb-8 text-xs sm:text-sm shadow-xs">
                  <div>
                    <span className="text-slate-500 block text-[11px]">Roll Number</span>
                    <strong className="text-slate-900 font-bold">{result.rollNo}</strong>
                  </div>
                  <div className="w-px h-8 bg-amber-200"></div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Score Obtained</span>
                    <strong className="text-vedic-primary font-bold">{result.score} / {result.totalMarks}</strong>
                  </div>
                  <div className="w-px h-8 bg-amber-200"></div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Percentage</span>
                    <strong className="text-amber-700 font-bold">{result.percentage}%</strong>
                  </div>
                </div>

                {/* Signatures & Seal */}
                <div className="grid grid-cols-3 items-end pt-6 border-t border-slate-200/80">
                  {/* Left signature */}
                  <div className="text-center">
                    <div className="font-serif italic font-bold text-slate-800 text-sm mb-1">
                      Gopal Das, M.Tech
                    </div>
                    <div className="w-28 h-px bg-slate-400 mx-auto mb-1"></div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                      Controller of Examinations
                    </div>
                  </div>

                  {/* Center Seal */}
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-16 h-16 rounded-full border-2 border-dashed border-amber-600 flex items-center justify-center text-center p-1 bg-amber-50 shadow-inner">
                      <div className="text-[9px] font-bold text-amber-800 uppercase tracking-tighter leading-none">
                        ★ OFFICIAL ★<br />SEAL<br />2026
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-500 mt-1 flex items-center gap-1">
                      <CheckCircle2 size={11} className="text-emerald-600 inline" /> Verified Credential
                    </span>
                  </div>

                  {/* Right signature */}
                  <div className="text-center">
                    <div className="font-serif italic font-bold text-slate-800 text-sm mb-1">
                      Dr. H.G. Radheshyam Das
                    </div>
                    <div className="w-28 h-px bg-slate-400 mx-auto mb-1"></div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                      President, Youth Forum
                    </div>
                  </div>
                </div>

                {/* Bottom Credential Bar */}
                <div className="mt-8 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-[10px] text-slate-400 gap-2">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck size={13} className="text-emerald-600" />
                    <span>Certificate ID: <strong className="text-slate-600 font-mono">{result.certificateId}</strong></span>
                  </div>
                  <span>Issued on: {formattedDate}</span>
                  <span>Verify at: gitacontest.in/verify</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 print:hidden">
          <p className="text-xs text-slate-500 text-center sm:text-left">
            This digital certificate is cryptographically verifiable by anyone using your Roll No.
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              type="button"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-vedic-primary hover:bg-vedic-dark text-white shadow-sm transition cursor-pointer"
            >
              <Printer size={15} />
              <span>Print Certificate</span>
            </button>
            <button
              onClick={onClose}
              type="button"
              className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-200 transition cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
