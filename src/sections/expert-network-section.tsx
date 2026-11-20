'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  Search,
  MapPin,
  ArrowRight,
  FileText,
  Award,
  RefreshCw,
} from 'lucide-react';
import { Expert } from '@/types';
import { initialExperts } from '@/data/seedData';

const filterOptions = {
  field: ['All Fields', 'Islamic Finance', 'Arabic Language', 'Islamic Studies', 'Research', 'FinTech', 'Takaful', 'Risk Management'],
  country: ['All Countries', 'UAE', 'Saudi Arabia', 'Egypt', 'Pakistan', 'Malaysia', 'Bahrain'],
};

export function ExpertNetworkSection() {
  const { t } = useTranslation();
  const [experts, setExperts] = useState<Expert[]>(() => initialExperts);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    field: 'All Fields',
    country: 'All Countries',
  });
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const fetchExperts = async () => {
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (filters.field !== 'All Fields') params.append('field', filters.field);

      const res = await fetch(`/api/experts?${params.toString()}`);
      const data = await res.json();
      if (data.success && data.data?.length) {
        let result: Expert[] = [...data.data];
        if (filters.country !== 'All Countries') {
          result = result.filter((e) => e.country === filters.country);
        }
        result.sort((a, b) => {
          if (sortBy === 'name') return a.name.localeCompare(b.name);
          if (sortBy === 'country') return a.country.localeCompare(b.country);
          if (sortBy === 'publications') return (b.publications || 0) - (a.publications || 0);
          return 0;
        });
        setExperts(result);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchExperts();
  }, [filters, search, sortBy]);

  return (
    <section className="section bg-gradient-to-b from-[#0A3D36] via-[#08332E] to-[#062622] text-ivory relative overflow-hidden border-b border-primary/20" aria-labelledby="experts-title">
      {/* Background Decorative Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" aria-hidden="true">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="experts-islamic-pattern" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 80 40 L 40 80 L 0 40 Z" fill="none" stroke="currentColor" strokeWidth="1" />
              <circle cx="40" cy="40" r="16" fill="none" stroke="currentColor" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#experts-islamic-pattern)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <span className="section-eyebrow">{t('experts.people')}</span>
          <h2 id="experts-title" className="section-title">{t('experts.title')}</h2>
          <p className="section-subtitle">{t('experts.subtitle')}</p>
        </motion.div>

        {/* Filters */}
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
                placeholder={t('common.search') + ' experts by name, field...'}
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
                <option value="publications">{t('common.sortByPublications')}</option>
              </select>
              {loading && <RefreshCw className="w-4 h-4 text-gold animate-spin" />}
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {Object.entries(filterOptions).map(([key, options]) => (
              <div key={key} className="flex-1 min-w-[150px]">
                <label className="block text-xs font-bold text-gold mb-1.5 capitalize">
                  {key}
                </label>
                <select
                  value={filters[key as keyof typeof filters]}
                  onChange={(e) => setFilters((prev) => ({ ...prev, [key]: e.target.value }))}
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

        {/* Experts Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          {experts.map((expert, index) => (
            <motion.article
              key={expert.id}
              className="p-6 h-full group flex flex-col justify-between rounded-2xl bg-white/[0.04] border border-white/10 hover:border-gold/40 shadow-lg transition-all duration-300 backdrop-blur-md"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -6 }}
            >
              <div>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#B48A1B] to-[#CF9E20] text-[#062622] flex items-center justify-center flex-shrink-0 font-heading text-xl font-bold shadow-md shadow-gold/10">
                    {expert.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading text-heading-md font-bold text-white group-hover:text-gold transition-colors truncate">{expert.name}</h3>
                    <p className="text-gold font-semibold text-xs mt-0.5">{expert.role}</p>
                    <p className="flex items-center gap-1 text-ivory/60 text-xs mt-1">
                      <MapPin className="w-3 h-3 text-gold" /> {expert.country}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-ivory/70 line-clamp-3 mb-4 leading-relaxed font-normal">
                  {expert.biography}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {expert.fields?.slice(0, 3).map((field) => (
                    <span key={field} className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-gold/15 text-gold border border-gold/30">
                      {field}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-ivory/60">
                <span className="flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-gold" /> {expert.publications} Publications
                </span>
                <span className="font-bold text-gold">{expert.giflriRole}</span>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {!loading && experts.length === 0 && (
          <div className="text-center py-12 text-ivory/60">
            <p className="text-lg font-semibold">{t('common.noResults')}</p>
          </div>
        )}
      </div>
    </section>
  );
}