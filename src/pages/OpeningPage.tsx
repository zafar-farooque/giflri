import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from '@/components/ui/link';
import {
  Globe,
  Sparkles,
  ArrowRight,
  RotateCcw,
  BookOpen,
  GraduationCap,
  ShieldCheck,
  Building2,
  Search,
  ExternalLink,
  Users,
  Award
} from 'lucide-react';
import { OpeningExperience } from '@/components/opening-experience';
import { cn } from '@/lib/utils';

const COUNTRIES = [
  { code: 'AE', name: 'United Arab Emirates', native: 'الإمارات العربية المتحدة', flag: '🇦🇪', region: 'Middle East', institutions: 12 },
  { code: 'SA', name: 'Saudi Arabia', native: 'المملكة العربية السعودية', flag: '🇸🇦', region: 'Middle East', institutions: 28 },
  { code: 'MY', name: 'Malaysia', native: 'Malaysia', flag: '🇲🇾', region: 'Southeast Asia', institutions: 19 },
  { code: 'TR', name: 'Türkiye', native: 'Türkiye Cumhuriyeti', flag: '🇹🇷', region: 'Eurasia', institutions: 15 },
  { code: 'ID', name: 'Indonesia', native: 'Republik Indonesia', flag: '🇮🇩', region: 'Southeast Asia', institutions: 24 },
  { code: 'QA', name: 'Qatar', native: 'دولة قطر', flag: '🇶🇦', region: 'Middle East', institutions: 8 },
  { code: 'KW', name: 'Kuwait', native: 'دولة الكويت', flag: '🇰🇼', region: 'Middle East', institutions: 7 },
  { code: 'BH', name: 'Bahrain', native: 'مملكة البحرين', flag: '🇧🇭', region: 'Middle East', institutions: 6 },
  { code: 'OM', name: 'Oman', native: 'سلطنة عمان', flag: '🇴🇲', region: 'Middle East', institutions: 5 },
  { code: 'EG', name: 'Egypt', native: 'جمهورية مصر العربية', flag: '🇪🇬', region: 'North Africa', institutions: 18 },
  { code: 'JO', name: 'Jordan', native: 'المملكة الأردنية الهاشمية', flag: '🇯🇴', region: 'Middle East', institutions: 9 },
  { code: 'LB', name: 'Lebanon', native: 'الجمهورية اللبنانية', flag: '🇱🇧', region: 'Middle East', institutions: 4 },
  { code: 'MA', name: 'Morocco', native: 'المملكة المغربية', flag: '🇲🇦', region: 'North Africa', institutions: 11 },
  { code: 'DZ', name: 'Algeria', native: 'الجمهورية الجزائرية', flag: '🇩🇿', region: 'North Africa', institutions: 8 },
  { code: 'TN', name: 'Tunisia', native: 'الجمهورية التونسية', flag: '🇹🇳', region: 'North Africa', institutions: 7 },
  { code: 'PK', name: 'Pakistan', native: 'Islamic Republic of Pakistan', flag: '🇵🇰', region: 'South Asia', institutions: 16 },
  { code: 'BD', name: 'Bangladesh', native: 'গণপ্রজাতন্ত্রী বাংলাদেশ', flag: '🇧🇩', region: 'South Asia', institutions: 10 },
  { code: 'BN', name: 'Brunei', native: 'Negara Brunei Darussalam', flag: '🇧🇳', region: 'Southeast Asia', institutions: 4 },
  { code: 'SG', name: 'Singapore', native: 'Singapore', flag: '🇸🇬', region: 'Southeast Asia', institutions: 5 },
  { code: 'MV', name: 'Maldives', native: 'Dhivehi Raajje', flag: '🇲🇻', region: 'South Asia', institutions: 3 },
  { code: 'UZ', name: 'Uzbekistan', native: 'Oʻzbekiston Respublikasi', flag: '🇺🇿', region: 'Central Asia', institutions: 6 },
  { code: 'KZ', name: 'Kazakhstan', native: 'Qazaqstan Respýblıkasy', flag: '🇰🇿', region: 'Central Asia', institutions: 7 },
  { code: 'AZ', name: 'Azerbaijan', native: 'Azərbaycan Respublikası', flag: '🇦🇿', region: 'Caucasus', institutions: 5 },
  { code: 'NG', name: 'Nigeria', native: 'Federal Republic of Nigeria', flag: '🇳🇬', region: 'West Africa', institutions: 9 },
  { code: 'SN', name: 'Senegal', native: 'République du Sénégal', flag: '🇸🇳', region: 'West Africa', institutions: 4 },
];

export function OpeningPage() {
  const { t } = useTranslation();
  const [isPlayingAnimation, setIsPlayingAnimation] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');

  const filteredCountries = useMemo(() => {
    return COUNTRIES.filter((country) => {
      const matchesSearch =
        country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        country.native.toLowerCase().includes(searchQuery.toLowerCase()) ||
        country.region.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRegion = selectedRegion === 'All' || country.region === selectedRegion;
      return matchesSearch && matchesRegion;
    });
  }, [searchQuery, selectedRegion]);

  const regions = useMemo(() => {
    const list = Array.from(new Set(COUNTRIES.map((c) => c.region)));
    return ['All', ...list];
  }, []);

  return (
    <div className="min-h-screen bg-[#031714] text-white selection:bg-gold selection:text-black">
      {/* Dynamic Animated Convergence Intro */}
      <AnimatePresence>
        {isPlayingAnimation && (
          <OpeningExperience
            forcePlay={true}
            disableStorage={true}
            onComplete={() => setIsPlayingAnimation(false)}
            onSkip={() => setIsPlayingAnimation(false)}
          />
        )}
      </AnimatePresence>

      {/* Main Opening Showcase Content */}
      <div className="relative z-10">
        {/* Hero Banner with Islamic Geometry & Glow */}
        <div className="relative pt-28 pb-20 px-4 sm:px-6 lg:px-8 border-b border-gold/20 overflow-hidden bg-gradient-to-b from-[#052622] via-[#031916] to-[#02100E]">
          {/* Ambient light glow */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gold/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="max-w-6xl mx-auto text-center relative z-10">
            {/* Replay Button Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-gold text-xs font-bold uppercase tracking-wider mb-6 shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-gold" />
              <span>GIFLRI Inaugural & Member Nations Convergence</span>
            </motion.div>

            {/* Sacred IQRA Emblem */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="mb-6 flex flex-col items-center justify-center"
            >
              <span
                className="font-arabic text-6xl sm:text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-gold to-yellow-500 select-none drop-shadow-[0_0_35px_rgba(212,175,55,0.4)]"
              >
                إِقْرَأْ
              </span>
              <span className="font-heading text-2xl sm:text-3xl tracking-[0.4em] uppercase text-ivory/90 font-bold mt-2">
                IQRA • READ • LEARN • REFLECT
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl sm:text-5xl md:text-6xl font-bold font-heading text-white tracking-tight leading-tight max-w-4xl mx-auto"
            >
              Global Islamic Finance & Language Research Institution
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-5 text-base sm:text-lg md:text-xl text-emerald-100/80 max-w-3xl mx-auto leading-relaxed"
            >
              Unifying 59 sovereign member states under a singular standard of academic integrity, ethical Islamic finance, and Arabic linguistic mastery.
            </motion.p>

            {/* Main Action CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-4"
            >
              <Link
                href="/"
                className="flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-gold via-amber-400 to-yellow-500 text-emerald-950 font-bold text-sm sm:text-base hover:brightness-110 shadow-lg shadow-gold/20 transition-all transform hover:-translate-y-0.5"
              >
                <span>Enter Main Portal</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                onClick={() => setIsPlayingAnimation(true)}
                className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 text-gold border border-gold/40 font-bold text-sm sm:text-base backdrop-blur-md transition-all shadow"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Replay Convergence Ceremony</span>
              </button>

              <Link
                href="/affiliation"
                className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#062924] hover:bg-[#08352F] text-white border border-emerald-500/30 font-semibold text-sm sm:text-base transition-all"
              >
                <GraduationCap className="w-4 h-4 text-gold" />
                <span>Affiliation Hub</span>
              </Link>
            </motion.div>

            {/* Quick Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12 pt-8 border-t border-white/10"
            >
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                <div className="text-3xl font-extrabold text-gold">59</div>
                <div className="text-xs text-ivory/70 uppercase tracking-wider font-semibold mt-1">Sovereign Nations</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                <div className="text-3xl font-extrabold text-gold">200+</div>
                <div className="text-xs text-ivory/70 uppercase tracking-wider font-semibold mt-1">Accredited Institutions</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                <div className="text-3xl font-extrabold text-gold">400+</div>
                <div className="text-xs text-ivory/70 uppercase tracking-wider font-semibold mt-1">Global Programs</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                <div className="text-3xl font-extrabold text-gold">100%</div>
                <div className="text-xs text-ivory/70 uppercase tracking-wider font-semibold mt-1">Ethical Standard</div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* 59 Nations Convergence Explorer */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <div className="flex items-center gap-2 text-gold text-xs font-bold uppercase tracking-widest mb-2">
                <Globe className="w-4 h-4" />
                <span>Global Participation Network</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold font-heading text-white">
                59 Sovereign Member States
              </h2>
              <p className="text-sm text-emerald-200/70 mt-1 max-w-xl">
                Explore member state academic directorates, affiliated universities, and regional research institutes.
              </p>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search countries..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 rounded-xl bg-[#062622] border border-emerald-500/30 text-white placeholder-emerald-400/50 text-sm focus:outline-none focus:border-gold w-full sm:w-64"
                />
              </div>

              <div className="flex gap-1 overflow-x-auto pb-1 max-w-xs sm:max-w-md">
                {regions.slice(0, 4).map((region) => (
                  <button
                    key={region}
                    onClick={() => setSelectedRegion(region)}
                    className={cn(
                      'px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors',
                      selectedRegion === region
                        ? 'bg-gold text-[#031714]'
                        : 'bg-[#062622] text-white/70 hover:text-white border border-emerald-500/20'
                    )}
                  >
                    {region}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Country Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredCountries.map((country, idx) => (
              <motion.div
                key={country.code}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(idx * 0.03, 0.5) }}
                className="group relative p-5 rounded-2xl bg-gradient-to-br from-[#062A25] to-[#041D19] border border-emerald-500/20 hover:border-gold/50 shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl group-hover:scale-110 transition-transform duration-200">
                      {country.flag}
                    </span>
                    <div>
                      <h3 className="font-bold text-white text-base leading-tight group-hover:text-gold transition-colors">
                        {country.name}
                      </h3>
                      <p className="text-xs text-emerald-300/70 font-arabic mt-0.5" dir="rtl">
                        {country.native}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-ivory/70">
                  <span className="px-2 py-0.5 rounded-md bg-white/5 text-[11px] border border-white/5">
                    {country.region}
                  </span>
                  <span className="text-gold font-bold flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5" />
                    {country.institutions} Affiliates
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Portal Access CTA */}
          <div className="mt-16 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#062D27] via-[#083D35] to-[#041E1A] border border-gold/30 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="relative z-10">
              <h3 className="text-2xl sm:text-3xl font-bold font-heading text-white">
                Ready to explore GIFLRI's Global Ecosystem?
              </h3>
              <p className="text-sm text-emerald-100/75 mt-2 max-w-xl">
                Access official verification, accredited programs, research publications, and executive directories.
              </p>
            </div>
            <Link
              href="/"
              className="relative z-10 flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-gold via-amber-400 to-yellow-500 text-emerald-950 font-bold text-base hover:brightness-110 shadow-xl transition-all whitespace-nowrap"
            >
              <span>Launch Main Homepage</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OpeningPage;
