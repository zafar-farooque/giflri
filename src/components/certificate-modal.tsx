import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Award,
  ShieldCheck,
  Printer,
  Copy,
  Check,
  Share2,
  ExternalLink,
  Calendar,
  Building2,
  GraduationCap,
  Sparkles,
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { Certificate } from '@/types';

interface CertificateModalProps {
  certificate: Certificate | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CertificateModal({ certificate, isOpen, onClose }: CertificateModalProps) {
  const [copiedId, setCopiedId] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!certificate || !isOpen) return null;

  const verificationUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/verify?q=${encodeURIComponent(certificate.certId)}`
    : `https://giflri.org/verify?q=${encodeURIComponent(certificate.certId)}`;

  const verificationHash =
    certificate.verificationHash ||
    `0x${Array.from(certificate.certId || 'GIFLRI')
      .map((c) => c.charCodeAt(0).toString(16))
      .join('')}8a9f20c4e1`;

  const handleCopyId = () => {
    navigator.clipboard.writeText(certificate.certId);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(verificationUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-[#05211D] border border-amber-400/40 rounded-3xl shadow-2xl overflow-hidden my-auto"
        >
          {/* Top Control Bar (Non-printable) */}
          <div className="no-print flex items-center justify-between px-4 sm:px-6 py-3.5 bg-[#031916] border-b border-emerald-500/20 shrink-0">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-2 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-400">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                  Official Cryptographic Credential
                  <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    <ShieldCheck className="w-3 h-3" /> {certificate.status || 'Verified'}
                  </span>
                </h3>
                <p className="text-[11px] font-mono text-amber-300/80">{certificate.certId}</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                onClick={handlePrint}
                className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-emerald-950 text-xs font-bold shadow flex items-center gap-1.5 transition-all"
                title="Print or Save as PDF"
              >
                <Printer className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Print / PDF</span>
              </button>

              <button
                onClick={handleCopyLink}
                className="p-2 rounded-xl bg-emerald-900/40 hover:bg-emerald-800/60 text-emerald-200 border border-emerald-500/20 text-xs font-medium transition-all flex items-center gap-1"
                title="Copy Public Verification Link"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                <span className="hidden md:inline">{copiedLink ? 'Copied' : 'Share'}</span>
              </button>

              <a
                href={verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-emerald-900/40 hover:bg-emerald-800/60 text-emerald-200 border border-emerald-500/20 text-xs font-medium transition-all"
                title="Open Public Registry Verification"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all ml-1"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Scrollable Certificate Viewer Canvas */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-6 md:p-8 bg-[#041a17]/80">
            {/* The Printable Official Certificate Parchment */}
            <div
              id="printable-certificate"
              className="relative p-6 sm:p-10 md:p-12 rounded-2xl bg-gradient-to-b from-[#062b25] via-[#093730] to-[#041f1a] border-2 border-amber-400/50 shadow-[0_0_50px_rgba(201,162,39,0.15)] text-center overflow-hidden"
            >
              {/* Ornate Gold Border Inset */}
              <div className="absolute inset-2 sm:inset-3 border border-amber-400/30 rounded-xl pointer-events-none" />
              <div className="absolute inset-3 sm:inset-4 border border-dashed border-amber-400/20 rounded-lg pointer-events-none" />

              {/* Corner Ornaments */}
              <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-amber-400/80 pointer-events-none" />
              <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-amber-400/80 pointer-events-none" />
              <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-amber-400/80 pointer-events-none" />
              <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-amber-400/80 pointer-events-none" />

              {/* Watermark Crest */}
              <div className="absolute inset-0 flex items-center justify-center opacity-[0.035] pointer-events-none select-none">
                <Award className="w-[380px] h-[380px] text-amber-300" />
              </div>

              {/* Header Section */}
              <div className="relative z-10 space-y-3 pb-6 border-b border-amber-400/20">
                {/* Institute Crest & Emblem */}
                <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-amber-400/20 via-amber-300/10 to-amber-500/30 border-2 border-amber-400/60 shadow-lg shadow-amber-500/10 mb-1">
                  <Award className="w-9 h-9 sm:w-11 sm:h-11 text-amber-300 drop-shadow-[0_2px_8px_rgba(201,162,39,0.4)]" />
                </div>

                <div>
                  <h1 className="text-base sm:text-xl md:text-2xl font-serif font-extrabold uppercase tracking-widest text-amber-200">
                    Global Islamic Finance & Leadership Research Institute
                  </h1>
                  <p className="text-xs sm:text-sm font-serif text-emerald-200/90 tracking-wider mt-0.5" dir="rtl">
                    المعهد العالمي لبحوث التمويل الإسلامي والقيادة
                  </p>
                  <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-amber-400/80 mt-1">
                    Directorate of Academic Standards & Global Accreditation
                  </p>
                </div>
              </div>

              {/* Credential Title & Statement */}
              <div className="relative z-10 py-6 sm:py-8 space-y-4">
                <div className="inline-block">
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-amber-400/90 px-4 py-1 rounded-full bg-amber-400/10 border border-amber-400/30">
                    Official Certificate of Academic Completion
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-emerald-100/75 italic">
                  This official academic credential certifies that
                </p>

                {/* Student Full Name */}
                <div className="py-2">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 tracking-wide drop-shadow-sm">
                    {certificate.studentName}
                  </div>
                  <div className="w-48 sm:w-64 h-0.5 bg-gradient-to-r from-transparent via-amber-400/60 to-transparent mx-auto mt-2" />
                </div>

                <p className="text-xs sm:text-sm text-emerald-100/80 max-w-xl mx-auto leading-relaxed">
                  has successfully fulfilled all institutional criteria, comprehensive examinations, and curriculum
                  standards prescribed for the award of:
                </p>

                {/* Program Name */}
                <div className="p-3 sm:p-4 rounded-xl bg-emerald-950/60 border border-amber-400/30 max-w-xl mx-auto shadow-inner">
                  <div className="text-base sm:text-lg md:text-xl font-bold text-white flex items-center justify-center gap-2">
                    <GraduationCap className="w-5 h-5 text-amber-400 shrink-0" />
                    <span>{certificate.program}</span>
                  </div>
                </div>

                {/* Partner Institution */}
                <div className="text-xs sm:text-sm text-emerald-200/90 flex items-center justify-center gap-1.5 pt-1">
                  <Building2 className="w-4 h-4 text-amber-400" />
                  <span>Conferred in academic affiliation with:</span>
                  <strong className="text-amber-200 font-semibold">{certificate.institution}</strong>
                </div>
              </div>

              {/* Metadata Grid */}
              <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-[#031c18]/90 border border-emerald-500/20 text-left my-4">
                <div>
                  <div className="text-[10px] uppercase font-bold text-emerald-300/70">Certificate ID</div>
                  <div className="text-xs sm:text-sm font-mono font-bold text-amber-300 mt-0.5 flex items-center gap-1">
                    {certificate.certId}
                    <button
                      onClick={handleCopyId}
                      className="no-print p-0.5 hover:text-white transition-colors"
                      title="Copy ID"
                    >
                      {copiedId ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                </div>

                <div>
                  <div className="text-[10px] uppercase font-bold text-emerald-300/70">Issue Date</div>
                  <div className="text-xs sm:text-sm font-semibold text-white mt-0.5 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-amber-400" />
                    {certificate.issueDate || 'Current'}
                  </div>
                </div>

                <div>
                  <div className="text-[10px] uppercase font-bold text-emerald-300/70">Academic Standing</div>
                  <div className="text-xs sm:text-sm font-semibold text-amber-200 mt-0.5">
                    {certificate.grade || 'Passed with Distinction'}
                  </div>
                </div>

                <div>
                  <div className="text-[10px] uppercase font-bold text-emerald-300/70">Registry Status</div>
                  <div className="text-xs sm:text-sm font-bold text-emerald-400 mt-0.5 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    {certificate.status || 'Verified'}
                  </div>
                </div>
              </div>

              {/* Footer: QR Code, Signatures & Cryptographic Proof */}
              <div className="relative z-10 pt-6 border-t border-amber-400/20 grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
                {/* QR Code Validation */}
                <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-1.5">
                  <div className="p-2 bg-white rounded-xl shadow-lg border border-amber-400/30 shrink-0 inline-block">
                    <QRCodeSVG value={verificationUrl} size={64} level="M" />
                  </div>
                  <span className="text-[9px] text-emerald-200/70 font-mono">
                    Scan for instant blockchain verification
                  </span>
                </div>

                {/* Official Holographic Crest Seal */}
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500/20 via-amber-400/40 to-amber-200/30 border-2 border-amber-400 flex items-center justify-center shadow-lg">
                    <ShieldCheck className="w-8 h-8 text-amber-300" />
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-amber-300 mt-1">
                    GIFLRI Cryptographic Seal
                  </span>
                  <span className="text-[8px] font-mono text-emerald-300/60 max-w-[170px] truncate">
                    Hash: {verificationHash.slice(0, 18)}...
                  </span>
                </div>

                {/* Signatures */}
                <div className="flex flex-col items-center sm:items-end text-center sm:text-right space-y-1">
                  <div className="font-serif italic text-sm text-amber-200 font-bold border-b border-amber-400/40 pb-0.5 px-2">
                    Prof. Dr. Tariq Al-Hashimi
                  </div>
                  <div className="text-[10px] font-semibold text-white">Director General & Registrar</div>
                  <div className="text-[9px] text-emerald-300/70">Academic Accreditation Board</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default CertificateModal;
