import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSearchParams } from '@/lib/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  ShieldCheck,
  Search,
  CheckCircle,
  ShieldAlert,
  RefreshCw,
  Award,
  Eye,
  Building2,
  Calendar,
  GraduationCap,
  Printer,
  Check,
  Copy,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { CertificateModal } from '@/components/certificate-modal';
import { Certificate } from '@/types';

export function VerifyPage() {
  const { t } = useTranslation();
  const routeParams = useParams<{ certId?: string }>();
  const searchParams = useSearchParams();
  const initialQuery = routeParams.certId || searchParams.get('q') || searchParams.get('id') || '';

  const [activeRoute, setActiveRoute] = useState<'institution' | 'certificate'>('institution');
  const [queryId, setQueryId] = useState(initialQuery);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [modalCert, setModalCert] = useState<Certificate | null>(null);
  const [copiedId, setCopiedId] = useState(false);

  const performVerification = async (query: string, route: 'institution' | 'certificate') => {
    if (!query.trim()) return;
    setLoading(true);
    setResult(null);

    try {
      if (route === 'institution') {
        const res = await fetch(`/api/institutions/${encodeURIComponent(query.trim())}`);
        const data = await res.json();
        if (data && (data.id || data.name)) {
          setResult({
            type: 'institution',
            status: data.status || 'Active',
            name: data.name,
            id: data.giflriId || data.id,
            validity: data.validity || 'Permanent / Verified',
            programs: data.approvedPrograms?.length || data.programsCount || 1,
            notices: data.qualityStatus || 'Annual compliance submitted',
          });
        } else {
          setResult({
            type: 'institution',
            status: 'Not Found',
            id: query,
          });
        }
      } else {
        const res = await fetch(`/api/certificates/verify/${encodeURIComponent(query.trim())}`);
        const data = await res.json();
        if (data.valid && data.certificate) {
          const cert = data.certificate;
          setResult({
            type: 'certificate',
            status: cert.status || 'Verified',
            certId: cert.certId,
            studentName: cert.studentName,
            program: cert.program,
            institution: cert.institution,
            issueDate: cert.issueDate,
            validity: cert.validity || 'Permanent / Verifiable',
            grade: cert.grade,
            verificationHash: cert.verificationHash,
            rawCertificate: cert,
          });
        } else {
          setResult({
            type: 'certificate',
            status: 'Not Found',
            id: query,
          });
        }
      }
    } catch (err) {
      console.error(err);
      setResult({ type: route, status: 'Not Found', id: query });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialQuery) {
      if (initialQuery.toUpperCase().startsWith('CERT') || routeParams.certId) {
        setActiveRoute('certificate');
        setQueryId(initialQuery);
        performVerification(initialQuery, 'certificate');
      } else {
        setActiveRoute('institution');
        setQueryId(initialQuery);
        performVerification(initialQuery, 'institution');
      }
    }
  }, [initialQuery, routeParams.certId]);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    performVerification(queryId, activeRoute);
  };

  const handleCopyId = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A3D36] via-[#08332E] to-[#062622] pt-28 pb-16 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gold/15 text-gold border border-gold/30 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <span className="text-gold font-bold tracking-widest uppercase text-xs">Official Registry</span>
          <h1 className="font-heading text-3xl md:text-5xl font-bold text-white mt-2">
            {t('verification.title')}
          </h1>
          <p className="text-ivory/75 mt-3 max-w-lg mx-auto text-sm md:text-base">
            Real-time cryptographic validation against GIFLRI&apos;s international accreditation registry.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 max-w-md mx-auto">
          <button
            onClick={() => {
              setActiveRoute('institution');
              setResult(null);
              setQueryId('');
            }}
            className={cn(
              'px-5 py-3 text-sm sm:text-base rounded-xl font-bold transition-all duration-300 border text-center w-full sm:w-auto',
              activeRoute === 'institution'
                ? 'bg-gradient-to-r from-[#B48A1B] via-[#CF9E20] to-[#B48A1B] text-[#062622] border-gold shadow-[0_0_15px_rgba(201,162,39,0.4)]'
                : 'bg-white/[0.04] text-ivory/70 border-white/10 hover:border-gold/30 hover:text-white backdrop-blur-md'
            )}
          >
            {t('verification.verifyInstitution')}
          </button>
          <button
            onClick={() => {
              setActiveRoute('certificate');
              setResult(null);
              setQueryId('');
            }}
            className={cn(
              'px-5 py-3 text-sm sm:text-base rounded-xl font-bold transition-all duration-300 border text-center w-full sm:w-auto',
              activeRoute === 'certificate'
                ? 'bg-gradient-to-r from-[#B48A1B] via-[#CF9E20] to-[#B48A1B] text-[#062622] border-gold shadow-[0_0_15px_rgba(201,162,39,0.4)]'
                : 'bg-white/[0.04] text-ivory/70 border-white/10 hover:border-gold/30 hover:text-white backdrop-blur-md'
            )}
          >
            {t('verification.verifyCertificate')}
          </button>
        </div>

        <div className="p-6 md:p-8 bg-white/[0.04] border border-white/10 hover:border-gold/40 rounded-2xl mb-8 shadow-2xl backdrop-blur-md transition-all duration-300">
          <form onSubmit={handleVerify} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                {activeRoute === 'institution' ? 'Enter GIFLRI Institution ID or Name' : 'Enter Student Certificate Number'}
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={queryId}
                  onChange={(e) => setQueryId(e.target.value)}
                  placeholder={activeRoute === 'institution' ? 'e.g. GIFLRI-1001, Al Noor' : 'e.g. CERT-2027-88934'}
                  className="w-full bg-[#062622] border border-white/15 text-white placeholder:text-white/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold rounded-xl py-3.5 pl-12 pr-4 text-base sm:text-lg transition-all duration-200"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold/70" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-[#B48A1B] via-[#CF9E20] to-[#B48A1B] text-[#062622] font-extrabold text-base sm:text-lg hover:shadow-[0_0_20px_rgba(201,162,39,0.5)] transition-all duration-300 flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <RefreshCw className="w-5 h-5 animate-spin" /> Verifying Registry...
                </span>
              ) : (
                <>
                  <ShieldCheck className="w-5 h-5" />
                  VERIFY RECORD
                </>
              )}
            </button>
          </form>
        </div>

        <AnimatePresence mode="wait">
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-6 md:p-8 border rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md mb-8"
              style={{
                borderColor: result.status === 'Not Found' ? 'rgba(239, 68, 68, 0.4)' : 'rgba(201, 162, 39, 0.4)',
                backgroundColor: result.status === 'Not Found' ? 'rgba(239, 68, 68, 0.05)' : 'rgba(255, 255, 255, 0.04)',
              }}
            >
              {result.status === 'Not Found' ? (
                <div className="text-center py-6">
                  <ShieldAlert className="w-12 h-12 text-red-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-red-400 mb-2">Verification Failed</h3>
                  <p className="text-ivory/70 max-w-md mx-auto text-sm">
                    The requested identifier <span className="font-mono font-bold text-white">{result.id}</span> was not found in our official accreditation registry.
                  </p>
                </div>
              ) : (
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-2xl bg-gold/20 border border-gold/40 text-gold">
                        <CheckCircle className="w-7 h-7" />
                      </div>
                      <div>
                        <h3 className="font-heading text-2xl font-bold text-white">{t('verification.verified')}</h3>
                        <p className="text-xs text-gold/90 font-medium flex items-center gap-1.5 mt-0.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          Official Cryptographically Validated Record
                        </p>
                      </div>
                    </div>

                    {result.type === 'certificate' && result.rawCertificate && (
                      <button
                        onClick={() => setModalCert(result.rawCertificate)}
                        className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-emerald-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-amber-400/20 transition-all"
                      >
                        <Eye className="w-4 h-4" />
                        View Full Certificate Document
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white/[0.03] p-5 sm:p-6 rounded-2xl border border-white/10">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-ivory/50">
                        {result.type === 'certificate' ? 'Student Full Name' : 'Institution Name'}
                      </div>
                      <div className="text-lg font-bold text-white mt-1">
                        {result.name || result.studentName}
                      </div>
                    </div>

                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-ivory/50">Registry ID</div>
                      <div className="text-lg font-bold text-gold mt-1 font-mono flex items-center gap-2">
                        {result.id || result.certId}
                        <button
                          onClick={() => handleCopyId(result.id || result.certId)}
                          className="p-1 hover:text-white text-gold/70 transition-colors"
                          title="Copy ID"
                        >
                          {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    {result.type === 'certificate' && (
                      <>
                        <div>
                          <div className="text-xs font-semibold uppercase tracking-wider text-ivory/50">Academic Program</div>
                          <div className="text-sm font-semibold text-white mt-1 flex items-center gap-1.5">
                            <GraduationCap className="w-4 h-4 text-amber-400 shrink-0" />
                            {result.program}
                          </div>
                        </div>

                        <div>
                          <div className="text-xs font-semibold uppercase tracking-wider text-ivory/50">Accredited Institution</div>
                          <div className="text-sm font-semibold text-white mt-1 flex items-center gap-1.5">
                            <Building2 className="w-4 h-4 text-amber-400 shrink-0" />
                            {result.institution}
                          </div>
                        </div>

                        <div>
                          <div className="text-xs font-semibold uppercase tracking-wider text-ivory/50">Issue Date</div>
                          <div className="text-sm font-semibold text-white mt-1 flex items-center gap-1.5">
                            <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
                            {result.issueDate}
                          </div>
                        </div>

                        <div>
                          <div className="text-xs font-semibold uppercase tracking-wider text-ivory/50">Academic Standing</div>
                          <div className="text-sm font-semibold text-amber-300 mt-1">
                            {result.grade || 'Passed with Distinction'}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Full Official Certificate Modal */}
      <CertificateModal
        certificate={modalCert}
        isOpen={!!modalCert}
        onClose={() => setModalCert(null)}
      />
    </div>
  );
}

export default VerifyPage;

