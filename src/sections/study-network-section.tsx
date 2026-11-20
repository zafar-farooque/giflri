'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import {
  GraduationCap,
  Users,
  ArrowRight,
  Search,
  Building2,
  RefreshCw,
} from 'lucide-react';
import { Institution } from '@/types';

const filters = {
  country: ['All Countries', 'UAE', 'Saudi Arabia', 'Malaysia', 'Indonesia', 'India', 'Pakistan', 'Egypt', 'Türkiye', 'Qatar', 'Bahrain'],
  type: ['All Types', 'University', 'College', 'Training Center', 'Research Institute', 'Language Academy'],
  status: ['Active', 'Pending', 'Suspended'],
};

export function StudyNetworkSection() {
  const { t } = useTranslation();
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtersState, setFiltersState] = useState({
    country: 'All Countries',
    type: 'All Types',
    status: 'Active',
  });
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const fetchInstitutions = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (filtersState.country !== 'All Countries') params.append('country', filtersState.country);
      if (filtersState.type !== 'All Types') params.append('type', filtersState.type);
      if (filtersState.status !== 'All Statuses') params.append('status', filtersState.status);

      const res = await fetch(`/api/institutions?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        let result: Institution[] = [...data.data];
        result.sort((a, b) => {
          if (sortBy === 'name') return a.name.localeCompare(b.name);
          if (sortBy === 'country') return a.country.localeCompare(b.country);
          if (sortBy === 'students') return (b.students || 0) - (a.students || 0);
          return 0;
        });
        setInstitutions(result);
      }
    } catch (err) {
      console.error('Failed to fetch institutions:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInstitutions();
  }, [filtersState, search, sortBy]);

  return (
    <section className="section bg-gradient-to-b from-[#062622] via-[#08332E] to-[#0A3D36] text-ivory relative overflow-hidden border-b border-primary/20" aria-labelledby="study-title">
      {/* Background Decorative Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" aria-hidden="true">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="study-islamic-pattern" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 80 40 L 40 80 L 0 40 Z" fill="none" stroke="currentColor" strokeWidth="1" />
              <circle cx="40" cy="40" r="16" fill="none" stroke="currentColor" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#study-islamic-pattern)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <span className="section-eyebrow">{t('programs.studyNetwork')}</span>
          <h2 id="study-title" className="section-title">{t('programs.findYourProgram')}</h2>
          <p className="section-subtitle">{t('programs.searchGlobalNetwork')}</p>
        </motion.div>

        {/* Search & Filters */}
        <motion.div
          className="p-4 md:p-6 rounded-2xl mb-8 bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gold/70" />
              <input
                type="search"
                placeholder={t('common.search') + ' institutions, GIFLRI ID, city...'}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[#062622] border border-white/15 text-white pl-10 pr-4 py-2.5 rounded-xl font-medium text-sm placeholder:text-white/40 focus:border-gold focus:outline-none"
              />
            </div>
            <div className="flex items-center gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#062622] border border-white/15 text-white px-3 py-2.5 rounded-xl font-semibold text-xs focus:border-gold focus:outline-none"
              >
                <option value="name">{t('common.sortByName')}</option>
                <option value="country">{t('common.sortByCountry')}</option>
                <option value="students">{t('common.sortByStudents')}</option>
              </select>
              {loading && <RefreshCw className="w-4 h-4 text-gold animate-spin" />}
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {Object.entries(filters).map(([key, options]) => (
              <div key={key} className="flex-1 min-w-[150px]">
                <label className="block text-xs font-bold text-gold mb-1.5 capitalize">
                  {key}
                </label>
                <select
                  value={filtersState[key as keyof typeof filtersState]}
                  onChange={(e) => setFiltersState((prev) => ({ ...prev, [key]: e.target.value }))}
                  className="w-full bg-[#062622] border border-white/15 text-white px-3 py-2.5 rounded-xl appearance-none font-semibold text-xs focus:border-gold focus:outline-none"
                >
                  {options.map((opt) => (
                    <option key={opt} value={opt} className="bg-[#062622] text-white">
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Results Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          {institutions.map((inst, index) => (
            <motion.article
              key={inst.id}
              className="p-6 h-full group flex flex-col justify-between rounded-2xl bg-white/[0.04] border border-white/10 hover:border-gold/40 shadow-lg transition-all duration-300 backdrop-blur-md"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -6 }}
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="px-2.5 py-0.5 text-xs rounded-full bg-gold/15 text-gold border border-gold/30 font-bold">
                      {inst.type}
                    </span>
                    <span
                      className={`ml-2 px-2.5 py-0.5 text-xs rounded-full font-bold ${
                        inst.status === 'Active'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30'
                          : 'bg-red-500/20 text-red-300 border border-red-400/30'
                      }`}
                    >
                      {inst.status}
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold text-gold bg-white/[0.06] border border-gold/30 px-2 py-0.5 rounded">
                    {inst.giflriId}
                  </span>
                </div>

                <h3 className="font-heading text-heading-md font-bold text-white group-hover:text-gold transition-colors mb-1">
                  {inst.name}
                </h3>
                <p className="text-ivory/60 text-xs mb-4">
                  {inst.city}, {inst.country} • {inst.approvedPrograms?.length || inst.programsCount || 1} Approved Program(s)
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {inst.approvedPrograms?.slice(0, 2).map((p, idx) => (
                    <span key={idx} className="px-2.5 py-0.5 text-[11px] rounded bg-white/[0.04] border border-white/10 text-ivory/80 font-medium truncate max-w-[200px]">
                      {p}
                    </span>
                  ))}
                  {(inst.approvedPrograms?.length || 0) > 2 && (
                    <span className="px-2 py-0.5 text-[11px] rounded bg-gold/15 text-gold border border-gold/30 font-bold">
                      +{(inst.approvedPrograms?.length || 0) - 2} more
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between mt-auto">
                <div className="flex items-center gap-3 text-xs text-ivory/60">
                  <span className="flex items-center gap-1">
                    <GraduationCap className="w-3.5 h-3.5 text-gold" /> {inst.approvedPrograms?.length || 1}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-gold" /> {(inst.students || 0).toLocaleString()}
                  </span>
                </div>

                <Link
                  href={`/institution/${inst.id}`}
                  className="inline-flex items-center gap-1 font-bold text-xs text-gold hover:text-gold-light group"
                >
                  {t('common.viewProfile')}
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {!loading && institutions.length === 0 && (
          <motion.div className="text-center py-16 text-ivory/60" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Building2 className="w-12 h-12 text-gold/40 mx-auto mb-3" />
            <p className="text-white text-lg font-bold">{t('common.noResults')}</p>
            <p className="text-ivory/50 text-xs mt-1">Try clearing filters or search terms.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}