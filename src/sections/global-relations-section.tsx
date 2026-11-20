'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  Building2,
  GraduationCap,
  Banknote,
  Languages,
  FileText,
  Handshake,
  Globe,
  Award,
  Calendar,
  MapPin,
  TrendingUp,
  ArrowRight,
  Users,
  Target,
} from 'lucide-react';

const partners = {
  organizations: [
    { name: 'Islamic Development Bank', desc: 'Research & Capacity Building', status: 'Active', since: '2025' },
    { name: 'AAOIFI', desc: 'Standards Harmonization', status: 'Active', since: '2024' },
    { name: 'IIFM', desc: 'Sukuk Market Development', status: 'Active', since: '2024' },
    { name: 'IFSB', desc: 'Regulatory Standards', status: 'Active', since: '2023' },
    { name: 'World Bank', desc: 'Global Partnerships', status: 'Active', since: '2025' },
    { name: 'UNESCO', desc: 'Language Preservation', status: 'Active', since: '2024' },
  ],
  universities: [
    { name: 'Al-Azhar University', desc: 'Language Programs & Research', status: 'Active', since: '2024' },
    { name: 'INCEIF Malaysia', desc: 'Joint Programs & Faculty Exchange', status: 'Active', since: '2025' },
    { name: 'UIA', desc: 'Research Collaboration', status: 'Active', since: '2023' },
    { name: 'Hamad Bin Khalifa University', desc: 'Islamic Finance Programs', status: 'Active', since: '2024' },
    { name: 'IIUM', desc: 'Islamic Studies & Finance', status: 'Active', since: '2023' },
    { name: 'Zaytuna College', desc: 'Liberal Arts & Islamic Sciences', status: 'Active', since: '2025' },
  ],
  finance: [
    { name: 'Dubai Islamic Bank', desc: 'Industry Input & Projects', status: 'Active', since: '2024' },
    { name: 'Al Rajhi Bank', desc: 'Professional Learning', status: 'Active', since: '2024' },
    { name: 'Bank Islam Malaysia', desc: 'Research & Development', status: 'Active', since: '2024' },
    { name: 'Kuwait Finance House', desc: 'Takaful & Innovation', status: 'Active', since: '2023' },
  ],
  academies: [
    { name: 'Academy of Arabic Language (Cairo)', desc: 'Research & Teaching Frameworks', status: 'Active', since: '2024' },
    { name: 'King Abdullah Academy', desc: 'Arabic Language Research', status: 'Active', since: '2024' },
    { name: 'Dubai Arabic Language Centre', desc: 'Teaching & Exchange', status: 'Active', since: '2025' },
  ],
};

const mos = [
  { partner: 'Islamic Development Bank', date: 'Mar 2025', scope: 'Research & Capacity Building', status: 'Active', outcomes: ['Joint Research', 'Capacity Building', 'Scholarships'] },
  { partner: 'INCEIF Malaysia', date: 'Jan 2025', scope: 'Joint Programs & Faculty Exchange', status: 'Active', outcomes: ['Dual Degree Programs', 'Faculty Exchange', 'Research Collaboration'] },
  { partner: 'AAOIFI', date: 'Nov 2024', scope: 'Standards Harmonization', status: 'Active', outcomes: ['Standards Alignment', 'Joint Publications', 'Training'] },
  { partner: 'Al-Azhar University', date: 'Sep 2024', scope: 'Language Programs & Research', status: 'Active', outcomes: ['Arabic Programs', 'Research', 'Student Exchange'] },
];

const jointProjects = [
  { title: 'Green Sukuk for Climate Finance', partners: ['IsDB', 'World Bank'], status: 'Active', outputs: ['Policy Brief', 'Framework', 'Pilot Project'] },
  { title: 'Arabic Language Corpus Development', partners: ['Al-Azhar', 'Khalifa Univ'], status: 'Active', outputs: ['Digital Corpus', 'NLP Models', 'Open Data'] },
  { title: 'Islamic FinTech Regulatory Sandbox', partners: ['Dubai Islamic Bank', 'CBUAE'], status: 'Active', outputs: ['Regulatory Framework', 'Pilot Programs', 'Standards'] },
];

import { useWebsiteContent } from '@/hooks/use-website-content';

export function GlobalRelationsSection() {
  const { t } = useTranslation();
  const { content } = useWebsiteContent();
  const [activeTab, setActiveTab] = useState<'organizations' | 'universities' | 'finance' | 'academies' | 'mous' | 'projects'>('organizations');

  const activePartners = content.relations.partners || partners;
  const activeMous = content.relations.mous && content.relations.mous.length ? content.relations.mous : mos;
  const activeProjects = content.relations.jointProjects && content.relations.jointProjects.length ? content.relations.jointProjects : jointProjects;

  return (
    <section className="section bg-gradient-to-b from-[#0A3D36] via-[#08332E] to-[#062622] relative overflow-hidden" aria-labelledby="relations-title">
      {/* Background Islamic Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#C9A227_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="section-header text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <span className="section-eyebrow text-gold font-bold tracking-widest uppercase text-xs">
            {content.relations.eyebrow || t('relations.internationalCooperation')}
          </span>
          <h2 id="relations-title" className="section-title text-white font-heading text-3xl md:text-5xl font-bold mt-2">
            {content.relations.title || t('relations.title')}
          </h2>
          <p className="section-subtitle text-ivory/75 max-w-2xl mx-auto mt-4 text-base md:text-lg">
            {content.relations.subtitle || t('relations.subtitle')}
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          className="flex flex-wrap gap-3 justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {[
            { id: 'organizations', label: 'relations.organizations', icon: Building2 },
            { id: 'universities', label: 'relations.universities', icon: GraduationCap },
            { id: 'finance', label: 'relations.financeInstitutions', icon: Banknote },
            { id: 'academies', label: 'relations.languageAcademies', icon: Languages },
            { id: 'mous', label: 'relations.mous', icon: FileText },
            { id: 'projects', label: 'relations.jointProjects', icon: Handshake },
          ].map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                'px-5 py-2.5 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 text-sm',
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-[#B48A1B] via-[#CF9E20] to-[#B48A1B] text-[#062622] font-bold shadow-[0_0_15px_rgba(201,162,39,0.4)]'
                  : 'bg-white/[0.04] text-ivory/70 border border-white/10 hover:border-gold/30 hover:text-white backdrop-blur-md'
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <tab.icon className="w-4 h-4" />
              {t(tab.label)}
            </motion.button>
          ))}
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {(['organizations', 'universities', 'finance', 'academies'].includes(activeTab)) && (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                {((activePartners as any)[activeTab] || []).map((partner: any, index: number) => {
                  const PartnerIcon = activeTab === 'organizations' ? Building2 : activeTab === 'universities' ? GraduationCap : activeTab === 'finance' ? Banknote : Languages;
                  return (
                    <motion.article
                      key={partner.name}
                      className="p-6 h-full group bg-white/[0.04] border border-white/10 hover:border-gold/40 rounded-2xl shadow-xl backdrop-blur-md transition-all duration-300 flex flex-col justify-between"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.08 }}
                      whileHover={{ y: -6 }}
                    >
                      <div>
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-12 h-12 rounded-xl bg-gold/15 border border-gold/30 flex items-center justify-center group-hover:bg-gold group-hover:text-[#062622] text-gold transition-all duration-300 shrink-0 shadow-md">
                            <PartnerIcon className="w-6 h-6" />
                          </div>
                          <div>
                            <h4 className="font-heading text-lg font-bold text-white group-hover:text-gold transition-colors">{partner.name}</h4>
                            <p className="text-ivory/70 text-sm mt-1">{partner.desc}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-4">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gold/15 text-gold border border-gold/30">{partner.status}</span>
                        <span className="text-xs text-ivory/50">Since {partner.since}</span>
                      </div>
                    </motion.article>
                  );
                })}
              </motion.div>
            )}

            {(activeTab === 'mous') && (
              <motion.div className="space-y-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                {activeMous.map((mou: any, index: number) => (
                  <motion.article key={mou.partner} className="p-6 bg-white/[0.04] border border-white/10 hover:border-gold/40 rounded-2xl shadow-xl backdrop-blur-md transition-all duration-300" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }}>
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                      <div>
                        <h4 className="font-heading text-xl font-bold text-white">{mou.partner}</h4>
                        <p className="text-ivory/75 text-sm mt-1">{mou.scope}</p>
                      </div>
                      <div className="sm:text-right flex sm:flex-col items-center sm:items-end justify-between">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gold/15 text-gold border border-gold/30">{mou.status}</span>
                        <div className="text-xs text-ivory/50 mt-1">{mou.date}</div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {mou.outcomes.map((outcome: string) => (
                        <span key={outcome} className="px-3 py-1 text-xs font-medium rounded-lg bg-gold/10 text-gold border border-gold/20">{outcome}</span>
                      ))}
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            )}

            {(activeTab === 'projects') && (
              <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                {activeProjects.map((project: any, index: number) => (
                  <motion.article key={project.title} className="p-6 h-full group bg-white/[0.04] border border-white/10 hover:border-gold/40 rounded-2xl shadow-xl backdrop-blur-md transition-all duration-300 flex flex-col justify-between" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} whileHover={{ y: -6 }}>
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-gold/15 border border-gold/30 flex items-center justify-center mb-4 group-hover:bg-gold group-hover:text-[#062622] text-gold transition-all duration-300 shadow-md">
                        <Target className="w-6 h-6" />
                      </div>
                      <h4 className="font-heading text-lg font-bold text-white mb-2 group-hover:text-gold transition-colors">{project.title}</h4>
                      <p className="text-ivory/70 text-sm mb-4">Partners: {Array.isArray(project.partners) ? project.partners.join(', ') : project.partners}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {(project.outputs || []).map((output: string) => (
                          <span key={output} className="px-2.5 py-1 text-xs font-medium rounded-lg bg-gold/10 text-gold border border-gold/20">{output}</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <span className="text-xs text-gold font-bold">{project.status || 'Active'}</span>
                      <span className="text-xs text-ivory/50">{project.targetYear || ''}</span>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
        <motion.div className="mt-16 text-center" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }}>
          <Link href="/directory" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#B48A1B] via-[#CF9E20] to-[#B48A1B] text-[#062622] font-bold text-base hover:shadow-[0_0_20px_rgba(201,162,39,0.5)] transition-all duration-300 group">
            {t('common.explore')} {t('relations.globalNetwork')}
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}