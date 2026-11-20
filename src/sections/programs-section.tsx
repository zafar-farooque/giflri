import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from '@/components/ui/link';
import { cn } from '@/lib/utils';
import {
  Filter,
  ChevronDown,
  BookOpen,
  Languages,
  Clock,
  Users,
  ArrowRight,
  Search,
  Microscope,
  TrendingUp,
  RefreshCw,
  X,
  CheckCircle2,
  GraduationCap,
  Sparkles,
  Award,
  Layers,
  FileCheck,
} from 'lucide-react';
import { Program } from '@/types';
import { initialPrograms } from '@/data/seedData';

const categories = [
  { id: 'all', icon: Layers, title: 'programs.allPrograms', label: 'All Curricula' },
  { id: 'finance', icon: TrendingUp, title: 'programs.islamicFinance', label: 'Islamic Finance' },
  { id: 'languages', icon: Languages, title: 'programs.arabicLanguages', label: 'Arabic & Languages' },
  { id: 'research', icon: Microscope, title: 'programs.research', label: 'Research & Policy' },
  { id: 'fintech', icon: Sparkles, title: 'programs.shariahFintech', label: 'Shariah FinTech' },
];

const filters = {
  level: ['All Levels', 'Diploma', 'Executive Program', 'Professional Certificate', 'Advanced Diploma', 'Doctorate', 'Master of Science'],
  mode: ['All Modes', 'Online', 'On-Campus', 'Blended'],
};

export function ProgramsSection() {
  const { t } = useTranslation();
  const params = useParams();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('finance');
  const [searchQuery, setSearchQuery] = useState('');
  const [programs, setPrograms] = useState<Program[]>(() => initialPrograms);
  const [loading, setLoading] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [filtersState, setFiltersState] = useState({
    level: 'All Levels',
    mode: 'All Modes',
  });

  const fetchPrograms = async () => {
    setLoading(true);
    try {
      const qParams = new URLSearchParams();
      if (activeCategory && activeCategory !== 'all') qParams.append('category', activeCategory);
      if (filtersState.level !== 'All Levels') qParams.append('level', filtersState.level);
      if (filtersState.mode !== 'All Modes') qParams.append('mode', filtersState.mode);
      if (searchQuery.trim()) qParams.append('search', searchQuery.trim());

      const res = await fetch(`/api/programs?${qParams.toString()}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setPrograms(data.data);
      } else {
        // Fallback local filtering
        let filtered = [...initialPrograms];
        if (activeCategory !== 'all') {
          filtered = filtered.filter((p) => {
            const cat = (p.category || '').toLowerCase();
            if (activeCategory === 'finance') return cat.includes('finance') || cat.includes('banking');
            if (activeCategory === 'languages') return cat.includes('language') || cat.includes('arabic');
            if (activeCategory === 'research') return cat.includes('research');
            if (activeCategory === 'fintech') return cat.includes('fintech') || cat.includes('tech');
            return cat.includes(activeCategory);
          });
        }
        if (filtersState.level !== 'All Levels') {
          filtered = filtered.filter((p) => p.level === filtersState.level);
        }
        if (filtersState.mode !== 'All Modes') {
          filtered = filtered.filter((p) => p.mode === filtersState.mode);
        }
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          filtered = filtered.filter(
            (p) =>
              p.title.toLowerCase().includes(q) ||
              p.description?.toLowerCase().includes(q) ||
              p.category.toLowerCase().includes(q)
          );
        }
        setPrograms(filtered);
      }
    } catch (err) {
      console.error('Failed to fetch programs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, [activeCategory, filtersState, searchQuery]);

  // Check URL param if accessed directly /programs/:id
  useEffect(() => {
    if (params.id) {
      const match = initialPrograms.find((p) => p.id === params.id) || programs.find((p) => p.id === params.id);
      if (match) {
        setSelectedProgram(match);
      }
    }
  }, [params.id, programs]);

  const resetAllFilters = () => {
    setActiveCategory('all');
    setSearchQuery('');
    setFiltersState({
      level: 'All Levels',
      mode: 'All Modes',
    });
  };

  return (
    <section className="section bg-gradient-to-b from-[#0A3D36] via-[#08332E] to-[#062622] text-ivory relative overflow-hidden border-b border-primary/20 min-h-screen py-16" aria-labelledby="programs-title">
      {/* Background Decorative Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" aria-hidden="true">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="programs-islamic-pattern" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 80 40 L 40 80 L 0 40 Z" fill="none" stroke="currentColor" strokeWidth="1" />
              <circle cx="40" cy="40" r="16" fill="none" stroke="currentColor" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#programs-islamic-pattern)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="section-header text-center mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <span className="section-eyebrow inline-block px-4 py-1.5 rounded-full bg-gold/15 text-gold border border-gold/30 text-xs font-bold uppercase tracking-wider mb-3">
            {t('programs.academic', 'Academic Curricula & Accreditation')}
          </span>
          <h2 id="programs-title" className="section-title text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            {t('programs.title', 'Standardized Academic Programs')}
          </h2>
          <p className="section-subtitle max-w-2xl mx-auto text-ivory/70 text-sm md:text-base leading-relaxed">
            {t('programs.subtitle', 'Explore internationally accredited curricula spanning Islamic Banking, Fiqh al-Muamalat, Arabic Computational Linguistics, and Shariah FinTech.')}
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          className="flex flex-wrap gap-2.5 justify-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                'px-5 py-2.5 rounded-xl font-bold transition-all duration-300 text-xs md:text-sm flex items-center gap-2 border',
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-[#B48A1B] via-[#CF9E20] to-[#B48A1B] text-[#062622] border-gold shadow-lg shadow-gold/20 scale-105'
                  : 'bg-white/[0.05] text-ivory/80 hover:bg-white/[0.1] border-white/10 hover:border-gold/30'
              )}
            >
              <cat.icon className="w-4 h-4" />
              {t(cat.title, cat.label)}
            </button>
          ))}
        </motion.div>

        {/* Search & Filters Bar */}
        <motion.div
          className="p-5 md:p-6 rounded-2xl mb-10 bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-2xl flex flex-col md:flex-row gap-4 items-center justify-between"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Search Box */}
          <div className="w-full md:w-80 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/70" />
            <input
              type="text"
              placeholder="Search by curriculum title, code, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#062622] border border-white/15 text-white pl-10 pr-4 py-2.5 rounded-xl text-xs md:text-sm focus:border-gold focus:outline-none placeholder-white/40"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Filter Selects */}
          <div className="flex flex-wrap gap-3 w-full md:w-auto flex-1 justify-end">
            {Object.entries(filters).map(([key, options]) => (
              <div key={key} className="flex-1 min-w-[150px] max-w-[220px]">
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gold/70" />
                  <select
                    value={filtersState[key as keyof typeof filtersState]}
                    onChange={(e) => setFiltersState((prev) => ({ ...prev, [key]: e.target.value }))}
                    className="w-full bg-[#062622] border border-white/15 text-white pl-9 pr-8 py-2.5 rounded-xl appearance-none font-medium text-xs md:text-sm focus:border-gold focus:outline-none"
                  >
                    {options.map((opt) => (
                      <option key={opt} value={opt} className="bg-[#062622] text-white">
                        {opt}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50 pointer-events-none" />
                </div>
              </div>
            ))}

            {(activeCategory !== 'all' || filtersState.level !== 'All Levels' || filtersState.mode !== 'All Modes' || searchQuery) && (
              <button
                onClick={resetAllFilters}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-ivory text-xs font-bold flex items-center gap-1.5 transition-colors"
                title="Reset all filters"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Reset
              </button>
            )}
          </div>

          {loading && <RefreshCw className="w-5 h-5 text-gold animate-spin" />}
        </motion.div>

        {/* Results Count Banner */}
        <div className="flex items-center justify-between mb-6 px-1 text-xs text-ivory/60 font-semibold">
          <span>
            Showing <strong className="text-gold">{programs.length}</strong> standardized accredited curricula
          </span>
        </div>

        {/* Programs Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          {programs.map((program, index) => (
            <motion.article
              key={program.id}
              className="p-6 h-full group flex flex-col justify-between rounded-2xl bg-white/[0.04] border border-white/10 hover:border-gold/50 shadow-xl hover:shadow-gold/5 transition-all duration-300 backdrop-blur-md relative overflow-hidden"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04 }}
              whileHover={{ y: -5 }}
            >
              {/* Subtle top glow line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gold/15 text-gold flex items-center justify-center group-hover:bg-gold group-hover:text-[#062622] transition-all duration-300 border border-gold/30 shadow-inner">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-white/[0.06] text-gold border border-gold/20">
                    {program.category}
                  </span>
                </div>

                <h3 className="font-heading text-lg font-bold text-white group-hover:text-gold transition-colors mb-2 line-clamp-2">
                  {program.title}
                </h3>
                <p className="text-ivory/70 text-xs line-clamp-3 mb-4 leading-relaxed font-normal">
                  {program.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  <span className="px-2.5 py-1 text-[11px] rounded-lg bg-gold/15 text-gold border border-gold/30 font-bold">
                    {program.level}
                  </span>
                  <span className="px-2.5 py-1 text-[11px] rounded-lg bg-white/[0.06] text-ivory/80 border border-white/10 font-medium">
                    {program.mode}
                  </span>
                  <span className="px-2.5 py-1 text-[11px] rounded-lg bg-white/[0.06] text-ivory/80 border border-white/10 font-medium">
                    {program.language}
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <div className="flex items-center justify-between text-xs text-ivory/60 font-medium mb-4">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-gold" /> {program.hours}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-gold" /> {program.students || 35} enrolled
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedProgram(program)}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-gold/20 to-gold/10 hover:from-gold hover:to-gold-light text-gold hover:text-[#062622] border border-gold/30 font-bold text-xs flex items-center justify-center gap-1.5 transition-all duration-300 shadow-sm"
                  >
                    <span>{t('common.viewDetails', 'Curriculum Details')}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <Link
                    href="/affiliation/apply"
                    className="p-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.15] text-ivory border border-white/10 transition-colors"
                    title="Adopt this curriculum"
                  >
                    <GraduationCap className="w-4 h-4 text-gold" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Empty State */}
        {!loading && programs.length === 0 && (
          <div className="text-center py-20 px-4 rounded-3xl bg-white/[0.02] border border-white/10 max-w-xl mx-auto my-8">
            <BookOpen className="w-12 h-12 text-gold/40 mx-auto mb-3 animate-pulse" />
            <p className="text-lg font-bold text-white mb-1">No programs match the selected filter.</p>
            <p className="text-xs text-ivory/60 mb-6">Try broadening your search query or selecting a different academic domain.</p>
            <button
              onClick={resetAllFilters}
              className="btn btn-primary btn-sm inline-flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Reset All Filters
            </button>
          </div>
        )}

        {/* CTA */}
        <motion.div className="mt-16 text-center" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <Link href="/affiliation/apply" className="btn btn-primary btn-lg group inline-flex shadow-xl shadow-gold/10">
            <span className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5" />
              {t('programs.adoptCurriculum', 'Adopt Standardized Curriculum for Your Institution')}
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </motion.div>
      </div>

      {/* Program Detail Modal */}
      <AnimatePresence>
        {selectedProgram && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProgram(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-gradient-to-b from-[#08332E] to-[#041A17] border border-gold/40 shadow-2xl p-6 md:p-8 text-ivory z-10 custom-scrollbar"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProgram(null)}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="mb-6 pr-10">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full bg-gold/15 text-gold border border-gold/30 text-xs font-bold uppercase tracking-wider">
                    {selectedProgram.category}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold">
                    {selectedProgram.level}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1">
                    <FileCheck className="w-3 h-3" /> Standardized ISO & AAOIFI
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 font-heading">
                  {selectedProgram.title}
                </h2>
                <p className="text-ivory/70 text-xs md:text-sm leading-relaxed">
                  {selectedProgram.description}
                </p>
              </div>

              {/* Meta Stats Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-white/[0.04] border border-white/10 mb-6 text-center">
                <div>
                  <span className="block text-[11px] text-gold font-bold uppercase">Learning Mode</span>
                  <span className="text-sm font-semibold text-white">{selectedProgram.mode}</span>
                </div>
                <div>
                  <span className="block text-[11px] text-gold font-bold uppercase">Curriculum Load</span>
                  <span className="text-sm font-semibold text-white">{selectedProgram.hours}</span>
                </div>
                <div>
                  <span className="block text-[11px] text-gold font-bold uppercase">Instruction Medium</span>
                  <span className="text-sm font-semibold text-white">{selectedProgram.language}</span>
                </div>
                <div>
                  <span className="block text-[11px] text-gold font-bold uppercase">Active Cohorts</span>
                  <span className="text-sm font-semibold text-white">{selectedProgram.students || 35} Scholars</span>
                </div>
              </div>

              {/* Key Learning Outcomes */}
              {selectedProgram.outcomes && selectedProgram.outcomes.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-bold text-gold uppercase tracking-wider mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> Standardized Learning Competencies
                  </h4>
                  <ul className="space-y-2.5">
                    {selectedProgram.outcomes.map((outcome, idx) => (
                      <li key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-ivory/90 leading-relaxed">
                        <Award className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Syllabus / Modules Breakdown */}
              {selectedProgram.syllabus && selectedProgram.syllabus.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-bold text-gold uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Layers className="w-4 h-4" /> Structured Course Modules
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedProgram.syllabus.map((module, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] font-bold text-gold uppercase tracking-wider block">{module.code}</span>
                          <span className="text-xs font-semibold text-white">{module.title}</span>
                        </div>
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-gold/10 text-gold border border-gold/20">
                          {module.credits}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Prerequisites */}
              {selectedProgram.prerequisites && (
                <div className="p-4 rounded-xl bg-gold/10 border border-gold/20 mb-6 text-xs text-ivory/80">
                  <strong className="text-gold block mb-1">Academic Prerequisites:</strong>
                  {selectedProgram.prerequisites}
                </div>
              )}

              {/* Modal Actions */}
              <div className="flex flex-col sm:flex-row gap-3 justify-end pt-4 border-t border-white/10">
                <button
                  onClick={() => setSelectedProgram(null)}
                  className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-ivory text-xs font-bold transition-colors"
                >
                  Close Window
                </button>
                <Link
                  href="/affiliation/apply"
                  className="btn btn-primary btn-sm inline-flex items-center justify-center gap-2"
                >
                  <GraduationCap className="w-4 h-4" />
                  Adopt This Curriculum for Institution
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}