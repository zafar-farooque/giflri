'use client';

import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  Network,
  CheckCircle,
  Gavel,
  FileText,
  RefreshCw,
  Shield,
  ArrowRight,
  Clock,
  Users,
  Award,
  TrendingUp,
  Globe,
} from 'lucide-react';

const journeySteps = [
  {
    id: 'why',
    icon: Network,
    number: '01',
    title: 'affiliation.whyAffiliate',
    desc: 'affiliation.whyDesc',
    color: 'primary',
  },
  {
    id: 'eligibility',
    icon: CheckCircle,
    number: '02',
    title: 'affiliation.eligibility',
    desc: 'affiliation.eligibilityDesc',
    color: 'emerald',
  },
  {
    id: 'standards',
    icon: Gavel,
    number: '03',
    title: 'affiliation.standards',
    desc: 'affiliation.standardsDesc',
    color: 'gold',
  },
  {
    id: 'fees',
    icon: FileText,
    number: '04',
    title: 'affiliation.fees',
    desc: 'affiliation.feesDesc',
    color: 'blue',
  },
  {
    id: 'application',
    icon: FileText,
    number: '05',
    title: 'affiliation.application',
    desc: 'affiliation.applicationDesc',
    color: 'purple',
  },
  {
    id: 'renewal',
    icon: RefreshCw,
    number: '06',
    title: 'affiliation.renewal',
    desc: 'affiliation.renewalDesc',
    color: 'orange',
  },
];

const benefits = [
  { icon: Globe, title: 'affiliation.benefit1Title', desc: 'affiliation.benefit1Desc' },
  { icon: Shield, title: 'affiliation.benefit2Title', desc: 'affiliation.benefit2Desc' },
  { icon: CheckCircle, title: 'affiliation.benefit3Title', desc: 'affiliation.benefit3Desc' },
  { icon: Award, title: 'affiliation.benefit4Title', desc: 'affiliation.benefit4Desc' },
  { icon: Users, title: 'affiliation.benefit5Title', desc: 'affiliation.benefit5Desc' },
  { icon: TrendingUp, title: 'affiliation.benefit6Title', desc: 'affiliation.benefit6Desc' },
];

const stats = [
  { value: 200, label: 'affiliation.statInstitutions', suffix: '+' },
  { value: 59, label: 'affiliation.statCountries', suffix: '+' },
  { value: 400, label: 'affiliation.statPrograms', suffix: '+' },
  { value: 98, label: 'affiliation.statRenewal', suffix: '%' },
];

import { useWebsiteContent } from '@/hooks/use-website-content';

export function AffiliationHubSection() {
  const { t } = useTranslation();
  const { content } = useWebsiteContent();

  const activeJourney = content.affiliation.journeySteps && content.affiliation.journeySteps.length ? content.affiliation.journeySteps : journeySteps;
  const activeBenefits = content.affiliation.benefits && content.affiliation.benefits.length ? content.affiliation.benefits : benefits;
  const activeStats = content.affiliation.stats
    ? [
        { value: content.affiliation.stats.institutions, label: 'affiliation.statInstitutions', suffix: '+' },
        { value: content.affiliation.stats.countries, label: 'affiliation.statCountries', suffix: '+' },
        { value: content.affiliation.stats.programs, label: 'affiliation.statPrograms', suffix: '+' },
        { value: content.affiliation.stats.renewalRate, label: 'affiliation.statRenewal', suffix: '%' },
      ]
    : stats;

  return (
    <section className="section bg-gradient-to-b from-[#0A3D36] via-[#08332E] to-[#062622] relative overflow-hidden" aria-labelledby="affiliation-title">
      {/* Background Islamic Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#C9A227_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Hero */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <span className="section-eyebrow text-gold font-bold tracking-widest uppercase text-xs">
            {content.affiliation.eyebrow || t('affiliation.forInstitutions')}
          </span>
          <h2 id="affiliation-title" className="section-title text-white font-heading text-3xl md:text-5xl font-bold mt-2">
            {content.affiliation.title || t('affiliation.hubTitle')}
          </h2>
          <p className="section-subtitle text-ivory/75 max-w-2xl mx-auto mt-4 text-base md:text-lg">
            {content.affiliation.subtitle || t('affiliation.hubSubtitle')}
          </p>
          <motion.div className="inline-flex items-center gap-2 mt-6 px-6 py-2.5 rounded-full bg-gold/15 text-gold border border-gold/30 text-sm font-bold shadow-lg backdrop-blur-md" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }} whileHover={{ scale: 1.02 }}>
            <Shield className="w-4 h-4 text-gold" />
            {content.affiliation.trustTitle || t('affiliation.trustFirst')}
          </motion.div>
        </motion.div>

        {/* Trust Badge */}
        <motion.div
          className="max-w-3xl mx-auto mb-16 md:mb-20 p-6 md:p-8 rounded-2xl text-center bg-white/[0.04] border border-white/10 hover:border-gold/40 shadow-xl backdrop-blur-md transition-all duration-300"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className="w-16 h-16 rounded-2xl bg-gold/15 border border-gold/30 flex items-center justify-center mx-auto mb-4 text-gold shadow-md">
            <Shield className="w-8 h-8" />
          </div>
          <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-3">
            {content.affiliation.trustTitle || t('affiliation.trustFirst')}
          </h3>
          <p className="text-ivory/80 text-base md:text-lg font-normal leading-relaxed">
            {content.affiliation.trustDesc || t('affiliation.trustDesc')}
          </p>
        </motion.div>

        {/* Journey Steps */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className="section-header mb-12 text-center">
            <span className="section-eyebrow text-gold font-bold tracking-widest uppercase text-xs">{t('affiliation.theJourney')}</span>
            <h3 className="section-title text-white font-heading text-2xl md:text-4xl font-bold mt-2">{t('affiliation.affiliationPathway')}</h3>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gold/20 -translate-x-1/2" aria-hidden="true" />

            <div className="space-y-8">
              {activeJourney.map((step: any, index: number) => {
                const Icon = step.icon || (step.id === 'why' ? Network : step.id === 'eligibility' ? CheckCircle : step.id === 'standards' ? Gavel : step.id === 'fees' || step.id === 'application' ? FileText : RefreshCw);
                return (
                  <motion.div
                    key={step.id}
                    className={cn(
                      'relative flex lg:flex-row',
                      index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                    )}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {/* Content */}
                    <motion.div
                      className={cn(
                        'lg:w-1/2 lg:pr-12 lg:pl-0 flex flex-col items-end lg:items-end',
                        index % 2 === 1 ? 'lg:pl-12 lg:pr-0 lg:items-start' : ''
                      )}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="p-6 md:p-8 w-full max-w-md bg-white/[0.04] border border-white/10 hover:border-gold/40 rounded-2xl shadow-xl backdrop-blur-md transition-all duration-300">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-gold/15 text-gold border border-gold/30">
                            <Icon className="w-6 h-6" />
                          </div>
                          <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-gold bg-gold/10 px-2.5 py-1 rounded-md border border-gold/25">
                              Step {step.number}
                            </span>
                            <h4 className="font-heading text-lg md:text-xl font-bold text-white mt-2">
                              {step.title.startsWith('affiliation.') ? t(step.title) : step.title}
                            </h4>
                          </div>
                        </div>
                        <p className="text-ivory/75 text-sm md:text-base leading-relaxed font-normal">
                          {step.desc.startsWith('affiliation.') ? t(step.desc) : step.desc}
                        </p>
                      </div>
                    </motion.div>

                    {/* Timeline marker */}
                    <motion.div
                      className="hidden lg:flex lg:w-12 lg:items-center lg:justify-center"
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="relative">
                        <div className="w-5 h-5 rounded-full border-4 border-gold bg-[#062622] z-10 shadow-[0_0_10px_rgba(201,162,39,0.5)]" />
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Benefits */}
        <motion.div className="mt-20" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }}>
          <div className="section-header mb-12 text-center">
            <span className="section-eyebrow text-gold font-bold tracking-widest uppercase text-xs">{t('affiliation.benefits')}</span>
            <h3 className="section-title text-white font-heading text-2xl md:text-4xl font-bold mt-2">{t('affiliation.whyAffiliate')}</h3>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            {activeBenefits.map((benefit: any, index: number) => {
              const Icon = benefit.icon || (index === 0 ? Globe : index === 1 ? Shield : index === 2 ? CheckCircle : index === 3 ? Award : index === 4 ? Users : TrendingUp);
              return (
                <motion.div
                  key={benefit.title}
                  className="p-6 md:p-8 h-full group bg-white/[0.04] border border-white/10 hover:border-gold/40 rounded-2xl shadow-xl backdrop-blur-md transition-all duration-300 flex flex-col justify-between"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -6 }}
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-gold/15 flex items-center justify-center mb-5 group-hover:bg-gold group-hover:text-[#062622] transition-all duration-300 border border-gold/30 text-gold shadow-md">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h4 className="font-heading text-lg md:text-xl font-bold text-white mb-3 group-hover:text-gold transition-colors">
                      {benefit.title.startsWith('affiliation.') ? t(benefit.title) : benefit.title}
                    </h4>
                    <p className="text-ivory/75 text-sm md:text-base font-normal leading-relaxed">
                      {benefit.desc.startsWith('affiliation.') ? t(benefit.desc) : benefit.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Impact Stats */}
        <motion.div className="mt-20" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {activeStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="p-6 text-center bg-white/[0.04] border border-white/10 hover:border-gold/40 rounded-2xl shadow-xl backdrop-blur-md transition-all duration-300"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: 'spring' }}
                whileHover={{ y: -4 }}
              >
                <div className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-gold">
                  <span className="counter" data-target={stat.value}>{stat.value}</span>{stat.suffix}
                </div>
                <p className="text-ivory/80 font-medium text-xs sm:text-sm mt-2">{t(stat.label)}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div className="mt-20 text-center" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }}>
          <div className="max-w-2xl mx-auto p-8 rounded-3xl bg-white/[0.04] border border-white/10 hover:border-gold/40 shadow-2xl backdrop-blur-md">
            <span className="section-eyebrow text-gold font-bold tracking-widest uppercase text-xs">{t('affiliation.readyToBegin')}</span>
            <h3 className="section-title text-white font-heading text-2xl md:text-3xl font-bold my-3">{t('affiliation.startEligibilityCheck')}</h3>
            <p className="text-ivory/80 text-sm md:text-base mb-8 font-normal leading-relaxed">{t('affiliation.ctaDesc')}</p>
            <Link href="/affiliation/apply" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#B48A1B] via-[#CF9E20] to-[#B48A1B] text-[#062622] font-bold text-base hover:shadow-[0_0_20px_rgba(201,162,39,0.5)] transition-all duration-300 group">
              <Clock className="w-5 h-5 text-[#062622]" />
              {t('affiliation.startCheck')}
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}