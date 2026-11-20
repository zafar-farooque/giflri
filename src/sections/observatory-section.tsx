'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { useWebsiteContent } from '@/hooks/use-website-content';
import {
  Languages,
  Globe,
  BarChart2,
  TrendingUp,
  Target,
  ArrowRight,
  ChevronRight,
  Database,
  Zap,
  BookOpen,
  MapPin,
  Building2,
  FileText,
  Shield,
  GraduationCap,
  Microscope,
  Users,
  X,
  ChevronRight as ChevronRightIcon,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';

const financeThemes = [
  { id: 'banking', icon: Building2, title: 'observatory.banking', desc: 'observatory.bankingDesc', metrics: ['Total Assets', 'Financing Growth', 'NPL Ratio', 'Liquidity Coverage'] },
  { id: 'sukuk', icon: FileText, title: 'observatory.sukuk', desc: 'observatory.sukukDesc', metrics: ['Issuance Volume', 'Yield Spreads', 'Sovereign vs Corporate', 'Green Sukuk Share'] },
  { id: 'takaful', icon: Shield, title: 'observatory.takaful', desc: 'observatory.takafulDesc', metrics: ['Contributions', 'Retention Ratio', 'Claims Ratio', 'Solvency Margin'] },
  { id: 'fintech', icon: Zap, title: 'observatory.fintech', desc: 'observatory.fintechDesc', metrics: ['Startup Count', 'Investment Volume', 'Regulatory Sandboxes', 'Digital Adoption'] },
  { id: 'profiles', icon: Globe, title: 'observatory.countryProfiles', desc: 'observatory.profilesDesc', metrics: ['Market Size', 'Regulatory Index', 'Talent Pool', 'Innovation Score'] },
  { id: 'trends', icon: TrendingUp, title: 'observatory.researchTrends', desc: 'observatory.trendsDesc', metrics: ['Publication Volume', 'Citation Impact', 'Collaboration Index', 'Funding Flow'] },
];

const languageThemes = [
  { id: 'education', icon: GraduationCap, title: 'observatory.arabicEducation', desc: 'observatory.educationDesc', metrics: ['Enrollment', 'Proficiency Levels', 'Teacher Ratio', 'Digital Adoption'] },
  { id: 'research', icon: Microscope, title: 'observatory.languageResearch', desc: 'observatory.researchDesc', metrics: ['Publications', 'Corpus Size', 'Dialect Coverage', 'AI Applications'] },
  { id: 'translation', icon: Languages, title: 'observatory.translationTrends', desc: 'observatory.translationDesc', metrics: ['Volume', 'Quality Scores', 'MT Adoption', 'Domain Coverage'] },
  { id: 'digital', icon: Database, title: 'observatory.digitalArabic', desc: 'observatory.digitalDesc', metrics: ['Corpus Size', 'OCR Accuracy', 'NLP Models', 'Open Data'] },
  { id: 'ai', icon: Zap, title: 'observatory.aiLanguage', desc: 'observatory.aiDesc', metrics: ['Model Count', 'Benchmark Scores', 'Deployment', 'Ethics Score'] },
  { id: 'profiles', icon: MapPin, title: 'observatory.countryProfiles', desc: 'observatory.profilesDesc', metrics: ['Speakers', 'Education Index', 'Digital Readiness', 'Policy Score'] },
];

const financeChartData = [
  { year: '2020', banking: 8500, sukuk: 420, takaful: 180, fintech: 45 },
  { year: '2021', banking: 9200, sukuk: 510, takaful: 210, fintech: 78 },
  { year: '2022', banking: 9800, sukuk: 580, takaful: 245, fintech: 120 },
  { year: '2023', banking: 10500, sukuk: 650, takaful: 280, fintech: 185 },
  { year: '2024', banking: 11200, sukuk: 720, takaful: 320, fintech: 260 },
  { year: '2025', banking: 11900, sukuk: 790, takaful: 360, fintech: 340 },
  { year: '2026', banking: 12600, sukuk: 860, takaful: 410, fintech: 420 },
];

const languageChartData = [
  { year: '2020', education: 120, research: 45, translation: 30, digital: 15, ai: 5 },
  { year: '2021', education: 135, research: 52, translation: 38, digital: 22, ai: 12 },
  { year: '2022', education: 150, research: 60, translation: 48, digital: 35, ai: 25 },
  { year: '2023', education: 168, research: 72, translation: 62, digital: 52, ai: 45 },
  { year: '2024', education: 185, research: 85, translation: 78, digital: 75, ai: 72 },
  { year: '2025', education: 205, research: 102, translation: 95, digital: 105, ai: 110 },
  { year: '2026', education: 225, research: 120, translation: 115, digital: 140, ai: 165 },
];

const countryData = [
  { country: 'Malaysia', finance: 92, language: 78 },
  { country: 'Saudi Arabia', finance: 88, language: 85 },
  { country: 'UAE', finance: 95, language: 82 },
  { country: 'Indonesia', finance: 78, language: 72 },
  { country: 'Türkiye', finance: 85, language: 80 },
  { country: 'Pakistan', finance: 72, language: 88 },
  { country: 'Egypt', finance: 75, language: 90 },
  { country: 'India', finance: 68, language: 85 },
  { country: 'Bangladesh', finance: 65, language: 80 },
  { country: 'Nigeria', finance: 58, language: 75 },
];

export function ObservatorySection() {
  const { t } = useTranslation();
  const { content } = useWebsiteContent();
  const [activeTab, setActiveTab] = useState<'finance' | 'language'>('finance');
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);

  const activeFinanceThemes = content.observatory.financeThemes && content.observatory.financeThemes.length ? content.observatory.financeThemes : financeThemes;
  const activeLanguageThemes = content.observatory.languageThemes && content.observatory.languageThemes.length ? content.observatory.languageThemes : languageThemes;

  const themes = activeTab === 'finance' ? activeFinanceThemes : activeLanguageThemes;
  const chartData = activeTab === 'finance' ? financeChartData : languageChartData;
  const chartColors = activeTab === 'finance' ? ['#0F4C45', '#C9A227', '#146B5E', '#F97316'] : ['#0F4C45', '#C9A227', '#146B5E', '#F97316', '#EC4899'];


  return (
    <section className="section bg-gradient-to-b from-[#062622] via-[#08332E] to-[#0A3D36] text-ivory relative overflow-hidden border-b border-primary/20" aria-labelledby="observatory-title">
      {/* Background Decorative Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" aria-hidden="true">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="observatory-islamic-pattern" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 80 40 L 40 80 L 0 40 Z" fill="none" stroke="currentColor" strokeWidth="1" />
              <circle cx="40" cy="40" r="16" fill="none" stroke="currentColor" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#observatory-islamic-pattern)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <span className="section-eyebrow">{content.observatory.eyebrow || t('observatory.flagship')}</span>
          <h2 id="observatory-title" className="section-title">{content.observatory.title || t('observatory.title')}</h2>
          <p className="section-subtitle">{content.observatory.subtitle || t('observatory.subtitle')}</p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          className="flex gap-4 justify-center mb-10 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.button
            onClick={() => setActiveTab('finance')}
            className={cn(
              'px-6 py-3 rounded-xl font-bold transition-all duration-300 flex items-center gap-2 text-sm',
              activeTab === 'finance'
                ? 'bg-gradient-to-r from-[#B48A1B] via-[#CF9E20] to-[#B48A1B] text-[#062622] shadow-lg shadow-gold/20'
                : 'bg-white/[0.05] text-ivory/80 hover:bg-white/[0.1] border border-white/10'
            )}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <TrendingUp className="w-5 h-5" />
            {t('observatory.financeObservatory')}
          </motion.button>
          <motion.button
            onClick={() => setActiveTab('language')}
            className={cn(
              'px-6 py-3 rounded-xl font-bold transition-all duration-300 flex items-center gap-2 text-sm',
              activeTab === 'language'
                ? 'bg-gradient-to-r from-[#B48A1B] via-[#CF9E20] to-[#B48A1B] text-[#062622] shadow-lg shadow-gold/20'
                : 'bg-white/[0.05] text-ivory/80 hover:bg-white/[0.1] border border-white/10'
            )}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Languages className="w-5 h-5" />
            {t('observatory.languageObservatory')}
          </motion.button>
        </motion.div>

        {/* Theme Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          {themes.map((theme: any, index: number) => {
            const Icon = theme.icon || BarChart2;
            return (
              <motion.article
                key={theme.id}
                className={cn(
                  'p-6 h-full rounded-2xl bg-white/[0.04] border border-white/10 hover:border-gold/40 shadow-lg transition-all duration-300 backdrop-blur-md cursor-pointer flex flex-col justify-between',
                  selectedTheme === theme.id && 'border-gold shadow-gold/20 bg-white/[0.08]'
                )}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                onClick={() => setSelectedTheme(selectedTheme === theme.id ? null : theme.id)}
                whileHover={{ y: -6 }}
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-gold/15 text-gold flex items-center justify-center mb-4 border border-gold/30 shadow-inner">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading text-heading-lg font-bold text-white group-hover:text-gold transition-colors mb-2">{t(theme.title)}</h3>
                  <p className="text-ivory/70 text-body-md mb-5 leading-relaxed">{t(theme.desc)}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {(theme.metrics || []).map((metric: string) => (
                      <span key={metric} className="px-2.5 py-0.5 text-xs rounded-full bg-white/[0.06] text-gold border border-gold/20 font-semibold">{metric}</span>
                    ))}
                  </div>
                </div>
                <button className={cn(
                  'mt-auto inline-flex items-center gap-2 font-bold text-sm pt-3 border-t border-white/10',
                  selectedTheme === theme.id ? 'text-gold' : 'text-gold hover:text-gold-light',
                  'transition-colors group'
                )}>
                  {selectedTheme === theme.id ? t('common.hide') : t('common.explore')}
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </motion.article>
            );
          })}
        </motion.div>

        {/* Selected Theme Detail */}
        <AnimatePresence>
          {selectedTheme && (
            <motion.div
              key={selectedTheme}
              className="mb-12 p-6 md:p-8 rounded-3xl bg-white/[0.06] border border-gold/40 shadow-2xl backdrop-blur-xl"
              initial={{ opacity: 0, y: 20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -20, height: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <span className="px-3 py-1 rounded-full bg-gold/15 text-gold border border-gold/30 text-xs font-bold uppercase mb-2 inline-block">
                    {activeTab === 'finance' ? t('observatory.financeObservatory') : t('observatory.languageObservatory')}
                  </span>
                  <h3 className="font-heading text-heading-xl font-bold text-white">
                    {t(themes.find((item: any) => item.id === selectedTheme)?.title || '')}
                  </h3>
                </div>
                <button onClick={() => setSelectedTheme(null)} className="p-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-white transition-colors" aria-label="Close">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-ivory/80 text-body-lg mb-6 leading-relaxed">
                {t(themes.find((item: any) => item.id === selectedTheme)?.desc || '')}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {(themes.find((item: any) => item.id === selectedTheme)?.metrics || []).map((metric: string, i: number) => (
                  <motion.div key={metric} className="text-center p-4 bg-white/[0.04] border border-white/10 rounded-2xl" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.08 }}>
                    <div className="font-heading text-2xl font-bold text-gold mb-1">—</div>
                    <div className="text-xs text-ivory/70 font-semibold">{metric}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Charts Section */}
        <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }}>
          {/* Trend Chart */}
          <motion.div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-lg" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-heading text-heading-xl font-bold text-white">
                {activeTab === 'finance' ? t('observatory.marketTrends') : t('observatory.languageTrends')}
              </h3>
              <select className="bg-[#062622] border border-white/15 text-white px-3 py-1.5 rounded-xl font-semibold text-xs focus:border-gold focus:outline-none" defaultValue="yearly">
                <option value="yearly">Yearly</option>
                <option value="quarterly">Quarterly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff15" vertical={false} />
                  <XAxis dataKey="year" stroke="#94A3B8" fontSize={12} />
                  <YAxis stroke="#94A3B8" fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: '#062622', border: '1px solid #C9A227', borderRadius: '8px', color: '#F8FAF9' }} />
                  {activeTab === 'finance' ? (
                    <>
                      <Line type="monotone" dataKey="banking" stroke="#C9A227" strokeWidth={2.5} dot={false} name="Banking" />
                      <Line type="monotone" dataKey="sukuk" stroke="#10B981" strokeWidth={2.5} dot={false} name="Sukuk" />
                      <Line type="monotone" dataKey="takaful" stroke="#38BDF8" strokeWidth={2.5} dot={false} name="Takaful" />
                      <Line type="monotone" dataKey="fintech" stroke="#F97316" strokeWidth={2.5} dot={false} name="FinTech" />
                    </>
                  ) : (
                    <>
                      <Line type="monotone" dataKey="education" stroke="#C9A227" strokeWidth={2.5} dot={false} name="Education" />
                      <Line type="monotone" dataKey="research" stroke="#10B981" strokeWidth={2.5} dot={false} name="Research" />
                      <Line type="monotone" dataKey="translation" stroke="#38BDF8" strokeWidth={2.5} dot={false} name="Translation" />
                      <Line type="monotone" dataKey="digital" stroke="#F97316" strokeWidth={2.5} dot={false} name="Digital" />
                      <Line type="monotone" dataKey="ai" stroke="#EC4899" strokeWidth={2.5} dot={false} name="AI" />
                    </>
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Bar Chart - Country Comparison */}
          <motion.div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-lg" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <h3 className="font-heading text-heading-xl font-bold text-white mb-6">
              {activeTab === 'finance' ? t('observatory.countryComparisonFinance') : t('observatory.countryComparisonLanguage')}
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={countryData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff15" horizontal={false} />
                  <XAxis stroke="#94A3B8" fontSize={11} />
                  <YAxis dataKey="country" type="category" width={100} stroke="#94A3B8" fontSize={11} />
                  <Tooltip contentStyle={{ backgroundColor: '#062622', border: '1px solid #C9A227', borderRadius: '8px', color: '#F8FAF9' }} />
                  {activeTab === 'finance' ? (
                    <Bar dataKey="finance" fill="#C9A227" name="Finance Index" radius={[0, 4, 4, 0]} />
                  ) : (
                    <Bar dataKey="language" fill="#10B981" name="Language Index" radius={[0, 4, 4, 0]} />
                  )}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </motion.div>

        {/* Pie Chart - Market Share */}
        <motion.div className="mb-12" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }}>
          <h3 className="font-heading text-heading-xl font-bold text-white text-center mb-8">
            {activeTab === 'finance' ? t('observatory.sectorShare') : t('observatory.domainShare')}
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-lg" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h4 className="font-heading text-heading-lg font-bold text-white mb-6 text-center">
                {activeTab === 'finance' ? t('observatory.financeShare') : t('observatory.languageShare')}
              </h4>
              <div className="h-80 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={activeTab === 'finance' ? [
                        { name: 'Banking', value: 65 },
                        { name: 'Sukuk', value: 18 },
                        { name: 'Takaful', value: 10 },
                        { name: 'FinTech', value: 7 },
                      ] : [
                        { name: 'Education', value: 45 },
                        { name: 'Research', value: 25 },
                        { name: 'Translation', value: 15 },
                        { name: 'Digital', value: 10 },
                        { name: 'AI', value: 5 },
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      fill="#8884d8"
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {activeTab === 'finance' ? (
                        <>
                          <Cell fill="#C9A227" />
                          <Cell fill="#10B981" />
                          <Cell fill="#38BDF8" />
                          <Cell fill="#F97316" />
                        </>
                      ) : (
                        <>
                          <Cell fill="#C9A227" />
                          <Cell fill="#10B981" />
                          <Cell fill="#38BDF8" />
                          <Cell fill="#F97316" />
                          <Cell fill="#EC4899" />
                        </>
                      )}
                    </Pie>
                    <Tooltip formatter={(value: number) => [value + '%', '']} contentStyle={{ backgroundColor: '#062622', border: '1px solid #C9A227', borderRadius: '8px', color: '#F8FAF9' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            <motion.div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-lg" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <h4 className="font-heading text-heading-lg font-bold text-white mb-6 text-center">
                {t('observatory.keyInsights')}
              </h4>
              <div className="space-y-4">
                {(activeTab === 'finance' ? [
                  'observatory.insight1',
                  'observatory.insight2',
                  'observatory.insight3',
                  'observatory.insight4',
                ] : [
                  'observatory.insight5',
                  'observatory.insight6',
                  'observatory.insight7',
                  'observatory.insight8',
                ]).map((insight, i) => (
                  <motion.div key={insight} className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/10" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}>
                    <Target className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                    <span className="text-ivory/80 text-sm leading-relaxed">{t(insight)}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}