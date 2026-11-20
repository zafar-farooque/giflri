import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  LogIn,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ShieldCheck,
  Building2,
  GraduationCap,
  Sparkles,
  Award,
  ArrowRight,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Home,
} from 'lucide-react';
import { Link } from '@/components/ui/link';
import { useAuth } from '@/context/auth-context';
import { UserRole } from '@/types';

const QUICK_ACCOUNTS = [
  {
    role: 'admin' as UserRole,
    name: 'Dr. Tariq Al-Mansoor',
    email: 'admin@giflri.org',
    password: 'admin123',
    title: 'Executive Director & Chief Registrar',
    icon: ShieldCheck,
    color: 'from-amber-500/20 to-amber-600/10 border-amber-500/40 text-gold',
    badge: 'Executive Admin',
    portalUrl: '/admin',
    desc: 'Access Global Registry CMS, quality scorecards, institution affiliations, and system telemetry.',
  },
  {
    role: 'institution' as UserRole,
    name: 'Al Noor Institute Registrar',
    email: 'alnoor@institution.edu',
    password: 'inst123',
    title: 'Director of Academic Affairs',
    icon: Building2,
    color: 'from-emerald-500/20 to-emerald-600/10 border-emerald-500/40 text-emerald-400',
    badge: 'Affiliated Institution',
    portalUrl: '/eservices/institution',
    desc: 'Submit affiliation renewals, audit self-assessments, curriculum approvals, and student cohorts.',
  },
  {
    role: 'faculty' as UserRole,
    name: 'Prof. Dr. Bilal Qadir',
    email: 'faculty@giflri.org',
    password: 'faculty123',
    title: 'Senior Professor of Islamic Economics',
    icon: Award,
    color: 'from-blue-500/20 to-blue-600/10 border-blue-500/40 text-blue-400',
    badge: 'Faculty & Scholar',
    portalUrl: '/eservices/faculty',
    desc: 'Track CPD points, submit peer-reviewed research papers, grade exams, and access corpora.',
  },
  {
    role: 'student' as UserRole,
    name: 'Zayd Ibrahim Al-Khatib',
    email: 'student@giflri.org',
    password: 'student123',
    title: 'Diploma Candidate in Islamic Finance',
    icon: GraduationCap,
    color: 'from-purple-500/20 to-purple-600/10 border-purple-500/40 text-purple-400',
    badge: 'Candidate Scholar',
    portalUrl: '/eservices/student',
    desc: 'View cryptographically verified diplomas, request transcripts, and access digital curricula.',
  },
];

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<'quick' | 'form'>('quick');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setErrorMsg('Please enter your portal email address.');
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    const res = await login({ email: email.trim(), password });
    setIsLoading(false);

    if (res.success && res.user) {
      setSuccessMsg(`Welcome back, ${res.user.name}!`);
      setTimeout(() => {
        if (res.user?.role === 'admin') {
          navigate('/admin');
        } else if (res.user?.role === 'institution') {
          navigate('/eservices/institution');
        } else if (res.user?.role === 'faculty') {
          navigate('/eservices/faculty');
        } else if (res.user?.role === 'student') {
          navigate('/eservices/student');
        } else {
          navigate('/home');
        }
      }, 700);
    } else {
      setErrorMsg(res.error || 'Authentication failed. Please verify your credentials.');
    }
  };

  const handleQuickLogin = async (acc: typeof QUICK_ACCOUNTS[0]) => {
    setIsLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    const res = await login({ email: acc.email, password: acc.password, role: acc.role });
    setIsLoading(false);

    if (res.success && res.user) {
      setSuccessMsg(`Logged in as ${acc.name} (${acc.badge})`);
      setTimeout(() => {
        navigate(acc.portalUrl);
      }, 600);
    } else {
      setErrorMsg(res.error || 'Failed to authenticate quick role.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A3D36] via-[#08332E] to-[#041A17] text-ivory flex flex-col justify-center py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Islamic Geometric Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" aria-hidden="true">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="login-page-pattern" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 80 40 L 40 80 L 0 40 Z" fill="none" stroke="currentColor" strokeWidth="1" />
              <circle cx="40" cy="40" r="16" fill="none" stroke="currentColor" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#login-page-pattern)" />
        </svg>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-xl relative z-10">
        {/* Return Home Button */}
        <div className="text-left mb-4">
          <Link
            href="/home"
            className="inline-flex items-center gap-1.5 text-xs text-gold/80 hover:text-gold font-bold px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            Back to Homepage
          </Link>
        </div>

        {/* Header Branding */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gold/15 border border-gold/40 text-gold flex items-center justify-center mx-auto mb-3 shadow-inner">
            <LogIn className="w-8 h-8" />
          </div>
          <span className="inline-block px-3 py-1 rounded-full bg-gold/15 text-gold border border-gold/30 text-[11px] font-bold uppercase tracking-widest mb-2">
            GIFLRI Secure Unified Authentication
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-heading tracking-tight">
            Portal Access & Identification
          </h1>
          <p className="text-xs sm:text-sm text-ivory/70 mt-2 max-w-md mx-auto">
            Sign in to access your administrative directorate, institution dashboard, scholar records, or student e-services.
          </p>
        </div>

        {/* Card Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl bg-white/[0.04] border border-gold/30 backdrop-blur-2xl p-6 sm:p-8 shadow-2xl"
        >
          {/* Tabs */}
          <div className="flex rounded-xl bg-white/[0.06] p-1 mb-6 border border-white/10">
            <button
              onClick={() => {
                setActiveTab('quick');
                setErrorMsg(null);
              }}
              className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'quick'
                  ? 'bg-gradient-to-r from-[#B48A1B] to-[#CF9E20] text-[#062622] shadow-md'
                  : 'text-ivory/70 hover:text-white'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              1-Click Fast Role Sign In
            </button>
            <button
              onClick={() => {
                setActiveTab('form');
                setErrorMsg(null);
              }}
              className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'form'
                  ? 'bg-gradient-to-r from-[#B48A1B] to-[#CF9E20] text-[#062622] shadow-md'
                  : 'text-ivory/70 hover:text-white'
              }`}
            >
              <Mail className="w-4 h-4" />
              Credentials Form
            </button>
          </div>

          {/* Feedback Messages */}
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-red-500/20 border border-red-500/40 text-red-200 text-xs flex items-center gap-2 mb-4">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-2 mb-4">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-400" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Tab 1: Fast Role Cards */}
          {activeTab === 'quick' && (
            <div className="space-y-3">
              <span className="text-[11px] font-bold text-ivory/50 uppercase tracking-wider block mb-1">
                Select an authorized account to enter:
              </span>

              {QUICK_ACCOUNTS.map((acc) => (
                <motion.button
                  key={acc.email}
                  disabled={isLoading}
                  onClick={() => handleQuickLogin(acc)}
                  whileHover={{ scale: 1.01, x: 3 }}
                  whileTap={{ scale: 0.99 }}
                  className={`w-full p-4 rounded-2xl bg-gradient-to-r ${acc.color} border hover:border-gold/60 transition-all flex items-center justify-between group text-left`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center text-gold group-hover:scale-110 transition-transform flex-shrink-0">
                      <acc.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white group-hover:text-gold transition-colors">
                          {acc.name}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-white/90">
                          {acc.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-ivory/70 line-clamp-1 mt-0.5">{acc.desc}</p>
                      <span className="text-[11px] text-ivory/50 font-mono block mt-0.5">
                        {acc.email} • Password: <strong className="text-gold/90">{acc.password}</strong>
                      </span>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-gold group-hover:text-[#062622] flex items-center justify-center transition-all text-white/50 flex-shrink-0 ml-2">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </motion.button>
              ))}
            </div>
          )}

          {/* Tab 2: Custom Credentials Form */}
          {activeTab === 'form' && (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gold uppercase tracking-wider mb-1.5">
                  Portal Registered Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/70" />
                  <input
                    type="email"
                    required
                    placeholder="e.g. admin@giflri.org or student@giflri.org"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#062622] border border-white/15 text-white pl-10 pr-4 py-3 rounded-xl text-sm focus:border-gold focus:outline-none placeholder-white/30"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gold uppercase tracking-wider mb-1.5">
                  Security Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/70" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter security password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#062622] border border-white/15 text-white pl-10 pr-10 py-3 rounded-xl text-sm focus:border-gold focus:outline-none placeholder-white/30"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <div className="flex items-center justify-between mt-1.5 text-[11px] text-ivory/50">
                  <span>Demo passwords: <strong className="text-gold">admin123</strong>, <strong className="text-gold">inst123</strong>, <strong className="text-gold">faculty123</strong>, <strong className="text-gold">student123</strong></span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#B48A1B] via-[#CF9E20] to-[#B48A1B] text-[#062622] font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-gold/20 hover:brightness-110 transition-all disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Authenticating Session...
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    Sign In to Portal Account
                  </>
                )}
              </button>
            </form>
          )}

          {/* Footer */}
          <div className="mt-6 pt-4 border-t border-white/10 text-center text-xs text-ivory/50 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>End-to-End Cryptographic Session Authentication • ISO 9001:2026</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
