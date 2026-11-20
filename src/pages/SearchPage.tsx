import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from '@/components/ui/link';
import {
  Search,
  BookOpen,
  GraduationCap,
  FlaskConical,
  Building2,
  ShieldCheck,
  Globe,
  Sparkles,
  ArrowRight,
  SlidersHorizontal,
  X,
  FileText,
  UserCheck
} from 'lucide-react';
import { performSearch, searchableData, SearchItem } from '@/data/searchData';
import { cn } from '@/lib/utils';

const categoryIcons: Record<string, React.ElementType> = {
  Pages: Globe,
  Programs: BookOpen,
  Research: FlaskConical,
  Affiliation: GraduationCap,
  Experts: UserCheck,
  Countries: Building2,
  Verification: ShieldCheck,
};

const categoryColors: Record<string, string> = {
  Pages: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
  Programs: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  Research: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
  Affiliation: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  Experts: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
  Countries: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
  Verification: 'bg-gold/20 text-gold border-gold/40',
};

const popularSuggestions = [
  'Opening',
  'Affiliation',
  'Verify Certificate',
  'Islamic Finance',
  'Arabic NLP',
  'Sukuk',
  'Saudi Arabia',
  'UAE',
  'Quality Standards',
  'Research Report',
];

export function SearchPage() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const q = searchParams.get('q') || '';
    setQuery(q);
  }, [searchParams]);

  const handleQueryChange = (newQuery: string) => {
    setQuery(newQuery);
    if (newQuery.trim()) {
      setSearchParams({ q: newQuery }, { replace: true });
    } else {
      setSearchParams({}, { replace: true });
    }
  };

  const results = useMemo(() => {
    if (!query.trim()) {
      return selectedCategory === 'All'
        ? searchableData
        : searchableData.filter((i) => i.category === selectedCategory);
    }
    return performSearch(query, selectedCategory);
  }, [query, selectedCategory]);

  const categories = ['All', 'Pages', 'Programs', 'Research', 'Affiliation', 'Experts', 'Countries', 'Verification'];

  return (
    <div className="min-h-screen bg-[#031916] text-white pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Background radial glow */}
      <div className="fixed top-20 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gold/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-gold text-xs font-bold uppercase tracking-wider mb-4"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Global Knowledge Search</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white tracking-tight"
          >
            Institutional Search & Explorer
          </motion.h1>

          <p className="text-emerald-200/70 text-sm sm:text-base mt-2 max-w-xl mx-auto">
            Instantly discover programs, research publications, affiliated universities, member states, and official verification registries.
          </p>
        </div>

        {/* Search Input Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative mb-6"
        >
          <div className="flex items-center gap-3 p-2 sm:p-2.5 rounded-2xl bg-[#062924] border border-gold/30 shadow-2xl focus-within:border-gold transition-all">
            <Search className="w-6 h-6 text-gold ml-3 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => handleQueryChange(e.target.value)}
              placeholder="Search across all programs, research, 59 nations, affiliations, certificates..."
              className="w-full bg-transparent text-white text-base sm:text-lg placeholder:text-emerald-300/40 outline-none pr-2"
              autoFocus
            />
            {query && (
              <button
                onClick={() => handleQueryChange('')}
                className="p-2 rounded-xl text-emerald-300/60 hover:text-white hover:bg-white/10 transition-colors mr-1"
                aria-label="Clear search"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </motion.div>

        {/* Quick Popular Suggestions */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 scrollbar-none">
          <span className="text-xs text-emerald-300/60 font-semibold shrink-0">Popular:</span>
          {popularSuggestions.map((item) => (
            <button
              key={item}
              onClick={() => handleQueryChange(item)}
              className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 hover:bg-gold/20 text-emerald-100 hover:text-gold border border-white/10 hover:border-gold/30 transition-all shrink-0"
            >
              {item}
            </button>
          ))}
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-8 scrollbar-none border-b border-white/10">
          <SlidersHorizontal className="w-4 h-4 text-gold mr-1 shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                'px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all',
                selectedCategory === cat
                  ? 'bg-gold text-emerald-950 shadow-md shadow-gold/20'
                  : 'bg-white/5 text-ivory/70 hover:text-white hover:bg-white/10 border border-white/5'
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Results Count & Meta */}
        <div className="flex items-center justify-between mb-4 text-xs font-semibold text-emerald-200/70">
          <span>
            Showing <strong className="text-gold font-bold">{results.length}</strong> {results.length === 1 ? 'result' : 'results'} {query ? `for "${query}"` : ''}
          </span>
          {selectedCategory !== 'All' && (
            <span className="text-gold">Filtered by: {selectedCategory}</span>
          )}
        </div>

        {/* Results List */}
        <div className="space-y-3.5">
          <AnimatePresence mode="popLayout">
            {results.length > 0 ? (
              results.map((item, idx) => {
                const IconComponent = categoryIcons[item.category] || FileText;
                const badgeColor = categoryColors[item.category] || 'bg-white/10 text-white border-white/20';

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2, delay: Math.min(idx * 0.03, 0.3) }}
                  >
                    <Link
                      href={item.href}
                      className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-[#062823] to-[#041F1B] border border-emerald-500/20 hover:border-gold/50 shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5"
                    >
                      <div className="flex items-start gap-4 flex-1 min-w-0">
                        <div className="w-11 h-11 rounded-xl bg-gold/15 text-gold flex items-center justify-center shrink-0 border border-gold/30 group-hover:scale-105 group-hover:bg-gold group-hover:text-emerald-950 transition-all">
                          <IconComponent className="w-5 h-5" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span className={cn('text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full border', badgeColor)}>
                              {item.category}
                            </span>
                            {item.badge && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/5 text-ivory/80 border border-white/10">
                                {item.badge}
                              </span>
                            )}
                          </div>

                          <h3 className="font-bold text-white text-base sm:text-lg group-hover:text-gold transition-colors truncate">
                            {item.title}
                          </h3>

                          {item.titleAr && (
                            <p className="text-xs text-emerald-300/60 font-arabic mt-0.5" dir="rtl">
                              {item.titleAr}
                            </p>
                          )}

                          <p className="text-xs sm:text-sm text-emerald-100/70 mt-1 line-clamp-2 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-gold font-bold text-xs uppercase tracking-wider shrink-0 sm:self-center pl-15 sm:pl-0">
                        <span>Open</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  </motion.div>
                );
              })
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16 px-4 rounded-3xl bg-white/5 border border-white/10"
              >
                <div className="w-16 h-16 rounded-full bg-gold/10 text-gold flex items-center justify-center mx-auto mb-4 border border-gold/30">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">No matching results found</h3>
                <p className="text-sm text-emerald-200/70 max-w-md mx-auto mb-6">
                  We couldn't find anything matching "{query}". Try checking for spelling mistakes or explore our main categories.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <button
                    onClick={() => {
                      setQuery('');
                      setSelectedCategory('All');
                    }}
                    className="px-4 py-2 rounded-xl bg-gold text-emerald-950 font-bold text-xs hover:brightness-110 transition-all"
                  >
                    View All Institutional Directory
                  </button>
                  <Link
                    href="/opening"
                    className="px-4 py-2 rounded-xl bg-white/10 text-white hover:text-gold font-bold text-xs border border-white/10 transition-all"
                  >
                    Opening Ceremony
                  </Link>
                  <Link
                    href="/verify"
                    className="px-4 py-2 rounded-xl bg-white/10 text-white hover:text-gold font-bold text-xs border border-white/10 transition-all"
                  >
                    Verify Certificate
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
