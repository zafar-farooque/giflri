'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  Building2,
  Microscope,
  BookOpen,
  FileText,
  Users,
  Globe,
  PenTool,
  Handshake,
  Search,
  Filter,
  ChevronDown,
  Calendar,
  Tag,
  ArrowRight,
  Clock,
  Award,
} from 'lucide-react';
import { ResearchPaper } from '@/types';

const researchAreas = [
  {
    id: 'centre',
    icon: Building2,
    title: 'research.researchCentre',
    desc: 'research.centreDesc',
    features: ['research.feature1', 'research.feature2', 'research.feature3', 'research.feature4', 'research.feature5'],
  },
  {
    id: 'journals',
    icon: PenTool,
    title: 'research.journals',
    desc: 'research.journalsDesc',
    features: ['research.feature6', 'research.feature7', 'research.feature8', 'research.feature9'],
  },
  {
    id: 'publications',
    icon: FileText,
    title: 'research.publications',
    desc: 'research.pubsDesc',
    features: ['research.feature10', 'research.feature11', 'research.feature12', 'research.feature13'],
  },
  {
    id: 'cfp',
    icon: PenTool,
    title: 'research.callForPapers',
    desc: 'research.cfpDesc',
    features: ['research.feature14', 'research.feature15', 'research.feature16', 'research.feature17'],
  },
  {
    id: 'experts',
    icon: Users,
    title: 'research.expertNetwork',
    desc: 'research.expertsDesc',
    features: ['research.feature18', 'research.feature19', 'research.feature20', 'research.feature21'],
  },
  {
    id: 'partnerships',
    icon: Handshake,
    title: 'research.partnerships',
    desc: 'research.partnershipsDesc',
    features: ['research.feature22', 'research.feature23', 'research.feature24', 'research.feature25'],
  },
];

const defaultRecentPapers = [
  {
    id: '1',
    title: 'New Study on Sukuk Risk Management in Volatile Markets',
    authors: 'Ahmed, R. et al.',
    journal: 'GIFLRI Journal of Islamic Finance',
    year: 2027,
    theme: 'Sukuk & Capital Markets',
    abstract: 'Analysis of algorithmic risk pricing models and collateralized structures under Shariah standards.',
    doi: '10.1016/j.giflri.2027.01.004',
    downloads: 1240,
    citations: 23,
    category: 'Finance',
  },
  {
    id: '2',
    title: 'Arabic Language Pedagogy in the Era of Large Language Models',
    authors: 'Zahra, F. et al.',
    journal: 'GIFLRI Journal of Arabic Pedagogy',
    year: 2027,
    theme: 'Linguistics & AI',
    abstract: 'Benchmarking generative NLP models on classical Arabic grammar corpus and student comprehension.',
    doi: '10.1016/j.giflri.2027.02.012',
    downloads: 890,
    citations: 15,
    category: 'Language',
  },
  {
    id: '3',
    title: 'Smart Contract Governance Framework for Decentralized Islamic Finance',
    authors: 'Hassan, O. et al.',
    journal: 'Global Shariah Policy Brief',
    year: 2026,
    theme: 'FinTech & Smart Contracts',
    abstract: 'Shariah compliance guardrails and deterministic state machines for Islamic asset tokenization.',
    doi: '10.1016/j.giflri.2026.08.019',
    downloads: 2100,
    citations: 45,
    category: 'FinTech',
  },
  {
    id: '4',
    title: 'Sustainable Green Sukuk & Renewable Infrastructure Financing',
    authors: 'Malik, A. et al.',
    journal: 'GIFLRI Journal of Islamic Finance',
    year: 2026,
    theme: 'ESG & Green Finance',
    abstract: 'Empirical assessment of carbon offset verification and yields in cross-border sovereign Sukuk.',
    doi: '10.1016/j.giflri.2026.11.007',
    downloads: 1560,
    citations: 31,
    category: 'Finance',
  },
];

export function ResearchSection() {
  const { t } = useTranslation();
  const [papers, setPapers] = useState<ResearchPaper[]>([]);

  const fetchPapers = async () => {
    try {
      const res = await fetch('/api/research');
      const data = await res.json();
      if (data.success && Array.isArray(data.data) && data.data.length > 0) {
        setPapers(data.data.slice(0, 4));
      }
    } catch (err) {
      console.error('Failed to fetch research papers:', err);
    }
  };

  useEffect(() => {
    fetchPapers();

    const handleUpdate = () => {
      fetchPapers();
    };

    window.addEventListener('website-content-updated', handleUpdate);
    return () => window.removeEventListener('website-content-updated', handleUpdate);
  }, []);

  const displayPapers = papers.length > 0 ? papers : defaultRecentPapers;

  return (
    <section className="section bg-gradient-to-b from-[#0A3D36] via-[#08332E] to-[#062622] text-ivory relative overflow-hidden border-b border-primary/20" aria-labelledby="research-title">
      {/* Background Decorative Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" aria-hidden="true">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="research-islamic-pattern" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 80 40 L 40 80 L 0 40 Z" fill="none" stroke="currentColor" strokeWidth="1" />
              <circle cx="40" cy="40" r="16" fill="none" stroke="currentColor" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#research-islamic-pattern)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <span className="section-eyebrow">{t('research.knowledge')}</span>
          <h2 id="research-title" className="section-title">{t('research.title')}</h2>
          <p className="section-subtitle">{t('research.subtitle')}</p>
        </motion.div>

        {/* Research Areas */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className="section-header mb-12">
            <span className="section-eyebrow">{t('research.platform')}</span>
            <h3 className="section-title">{t('research.researchPlatform')}</h3>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            {researchAreas.map((area, index) => (
              <motion.article
                key={area.id}
                className="p-6 h-full group flex flex-col rounded-2xl bg-white/[0.04] border border-white/10 hover:border-gold/40 shadow-lg hover:shadow-gold/10 transition-all duration-300 backdrop-blur-md"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -6 }}
              >
                <div className="w-12 h-12 rounded-xl bg-gold/15 text-gold flex items-center justify-center mb-5 group-hover:scale-105 group-hover:bg-gold group-hover:text-primary transition-all duration-300 border border-gold/30 shadow-inner">
                  <area.icon className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-heading-lg font-bold text-white group-hover:text-gold transition-colors mb-2">{t(area.title)}</h3>
                <p className="text-ivory/70 text-body-md mb-5 flex-1 leading-relaxed">{t(area.desc)}</p>
                <ul className="space-y-2 mb-6">
                  {area.features.map((feature, i) => (
                    <li key={feature} className="flex items-center gap-2 text-ivory/80 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                      {t(feature)}
                    </li>
                  ))}
                </ul>
                <Link href="/research" className="mt-auto inline-flex items-center gap-2 font-bold text-sm text-gold hover:text-gold-light transition-colors group">
                  {t('common.explore')}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.article>
            ))}
          </motion.div>
        </motion.div>

        {/* Recent Publications */}
        <motion.div className="mt-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }}>
          <div className="section-header flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <span className="section-eyebrow">{t('research.latest')}</span>
              <h3 className="section-title">{t('research.recentPublications')}</h3>
            </div>
            <Link href="/research/publications" className="px-5 py-2.5 rounded-xl bg-white/[0.06] hover:bg-gold hover:text-primary border border-white/15 text-white font-semibold text-sm transition-all self-end md:self-auto flex items-center gap-2">
              {t('homepage.viewAll')} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            {displayPapers.map((paper, index) => (
              <motion.article
                key={paper.id}
                className="group relative overflow-hidden rounded-2xl bg-white/[0.04] border border-white/10 hover:border-gold/40 transition-all duration-300 backdrop-blur-md flex flex-col justify-between"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -6 }}
              >
                <div className="p-6 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 rounded-full bg-gold/15 text-gold border border-gold/30 text-xs font-bold uppercase truncate max-w-[160px]">{paper.theme}</span>
                      <Tag className="w-4 h-4 text-ivory/40 shrink-0" />
                    </div>
                    <h4 className="font-heading text-heading-md font-bold text-white group-hover:text-gold transition-colors mb-3 line-clamp-2">{paper.title}</h4>
                    <p className="text-ivory/70 text-body-sm mb-4 line-clamp-3 leading-relaxed">{paper.abstract}</p>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-ivory/60 mb-4">
                      <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-gold" /> {paper.authors}</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-gold" /> {paper.year}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="flex items-center gap-3 text-xs text-ivory/60">
                      <span className="flex items-center gap-1"><FileText className="w-3 h-3 text-gold" /> {paper.downloads?.toLocaleString() || 0}</span>
                      <span className="flex items-center gap-1"><Award className="w-3 h-3 text-gold" /> {paper.citations || 0}</span>
                    </div>
                    <Link href={`/research/publications`} className="text-gold hover:text-gold-light font-bold text-sm flex items-center gap-1 group">
                      {t('common.view')} <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </motion.div>

        {/* Call for Papers */}
        <motion.div className="mt-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }}>
          <div className="section-header mb-8">
            <span className="section-eyebrow">{t('research.callForPapers')}</span>
            <h3 className="section-title">{t('research.openCalls')}</h3>
          </div>

          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }}>
            {[
              { theme: 'research.themeFinance', title: 'research.cfp1Title', deadline: '2027-06-30', journal: 'research.journalFinance' },
              { theme: 'research.themeLanguage', title: 'research.cfp2Title', deadline: '2027-07-15', journal: 'research.journalLanguage' },
              { theme: 'research.themeFintech', title: 'research.cfp3Title', deadline: '2027-08-31', journal: 'research.policyBrief' },
            ].map((cfp, index) => (
              <motion.div key={cfp.title} className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-gold/40 backdrop-blur-md shadow-lg transition-all duration-300 flex flex-col justify-between" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }}>
                <div>
                  <span className="px-3 py-1 rounded-full bg-gold/15 text-gold border border-gold/30 text-xs font-bold uppercase mb-3 inline-block">{t(cfp.theme)}</span>
                  <h4 className="font-heading text-heading-lg font-bold text-white mb-2">{t(cfp.title)}</h4>
                  <p className="text-ivory/70 text-body-md mb-4 leading-relaxed">{t(cfp.title + 'Desc')}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-ivory/60 mb-6">
                    <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-gold" /> {t('research.deadline')} {new Date(cfp.deadline).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    <span className="flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5 text-gold" /> {t(cfp.journal)}</span>
                  </div>
                </div>
                <Link href="/research/publications" className="w-full py-2.5 px-4 rounded-xl bg-white/[0.06] hover:bg-gold hover:text-primary border border-white/15 text-white font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2">
                  <ArrowRight className="w-4 h-4" /> {t('research.submitPaper')}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}