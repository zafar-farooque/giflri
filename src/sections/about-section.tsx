'use client';

import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import {
  Target,
  Eye,
  Users,
  Gavel,
  Globe,
  TrendingUp,
  CheckCircle,
  BookOpen,
  Award,
  Shield,
  Lightbulb,
  Heart,
} from 'lucide-react';

import { useWebsiteContent } from '@/hooks/use-website-content';

const values = [
  { icon: BookOpen, title: 'about.iqra', desc: 'about.iqraDesc' },
  { icon: Shield, title: 'about.amanah', desc: 'about.amanahDesc' },
  { icon: Lightbulb, title: 'about.ihsan', desc: 'about.ihsanDesc' },
  { icon: Heart, title: 'about.adl', desc: 'about.adlDesc' },
];

const missionPoints = [
  'about.missionPoint1',
  'about.missionPoint2',
  'about.missionPoint3',
];

const visionPoints = [
  'about.visionPoint1',
  'about.visionPoint2',
  'about.visionPoint3',
];

export function AboutSection() {
  const { t } = useTranslation();
  const { content } = useWebsiteContent();

  return (
    <section className="section relative overflow-hidden bg-gradient-to-b from-[#0A3D36] via-[#08332E] to-[#062622] text-ivory" aria-labelledby="about-title">
      {/* Background Islamic Geometric Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" aria-hidden="true">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="about-islamic-pattern" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 80 40 L 40 80 L 0 40 Z" fill="none" stroke="currentColor" strokeWidth="1" />
              <circle cx="40" cy="40" r="16" fill="none" stroke="currentColor" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#about-islamic-pattern)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Values Band */}
        <motion.div
          className="mb-16 rounded-3xl bg-white/[0.04] border border-white/15 backdrop-blur-xl p-8 md:p-14 overflow-hidden shadow-2xl relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <motion.div className="mb-6" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
              <span className="text-5xl md:text-7xl font-arabic text-gold drop-shadow-[0_4px_20px_rgba(201,162,39,0.4)]">
                {content.about.calligraphyText || 'إِقْرَأْ'}
              </span>
            </motion.div>
            <motion.p className="font-heading text-xl md:text-2xl lg:text-3xl font-medium text-ivory leading-relaxed mb-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              &ldquo;{content.about.calligraphyTranslation || 'He who treads a path in search of knowledge, Allah will make easy for him a path to Paradise.'}&rdquo;
            </motion.p>
            <motion.p className="text-gold text-sm tracking-widest uppercase font-bold" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              — Prophet Muhammad ﷺ
            </motion.p>
          </div>
        </motion.div>

        {/* Core Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className="section-header mb-12">
            <span className="section-eyebrow">{t('about.coreValues')}</span>
            <h2 id="about-title" className="section-title">{t('about.ourValues')}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(content.about.values && content.about.values.length ? content.about.values : values).map((value: any, index: number) => {
              const Icon = value.icon || (value.iconName === 'BookOpen' ? BookOpen : value.iconName === 'Shield' ? Shield : value.iconName === 'Lightbulb' ? Lightbulb : Heart);
              return (
                <motion.div
                  key={value.title}
                  className="p-6 md:p-8 text-center rounded-2xl bg-white/[0.04] border border-white/10 hover:border-gold/40 hover:bg-white/[0.07] backdrop-blur-md transition-all duration-300 group shadow-lg"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -6 }}
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gold/15 flex items-center justify-center group-hover:bg-gold group-hover:text-[#062622] transition-all duration-300 border border-gold/30 shadow-inner">
                    <Icon className="w-8 h-8 text-gold group-hover:text-[#062622] transition-colors" />
                  </div>
                  <h3 className="font-heading text-heading-lg font-bold text-gold mb-2">
                    {value.title.startsWith('about.') ? t(value.title) : value.title}
                  </h3>
                  <p className="text-ivory/70 text-body-md font-normal leading-relaxed">
                    {value.desc.startsWith('about.') ? t(value.desc) : value.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Mission & Vision */}
        <motion.div className="mt-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }}>
          <div className="section-header mb-12">
            <span className="section-eyebrow">{content.about.eyebrow || t('about.missionVision')}</span>
            <h2 className="section-title">{content.about.title || t('about.missionAndVision')}</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Mission */}
            <motion.div
              className="p-6 md:p-8 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-gold/30 backdrop-blur-md shadow-lg h-full"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="w-14 h-14 rounded-2xl bg-gold/15 flex items-center justify-center mb-6 border border-gold/30">
                <Target className="w-7 h-7 text-gold" />
              </div>
              <h3 className="font-heading text-heading-xl font-bold text-gold mb-4">{t('about.ourMission')}</h3>
              <p className="text-ivory/80 text-body-lg leading-relaxed mb-6 font-normal">
                {content.about.mission || t('about.missionDesc')}
              </p>
              <ul className="space-y-3">
                {(content.about.missionPoints && content.about.missionPoints.length ? content.about.missionPoints : missionPoints).map((point: string, i: number) => (
                  <motion.li key={point} className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/10" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.1 }}>
                    <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                    <span className="text-ivory/85 text-sm leading-relaxed">{point.startsWith('about.') ? t(point) : point}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Vision */}
            <motion.div
              className="p-6 md:p-8 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-gold/30 backdrop-blur-md shadow-lg h-full"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="w-14 h-14 rounded-2xl bg-gold/15 flex items-center justify-center mb-6 border border-gold/30">
                <Eye className="w-7 h-7 text-gold" />
              </div>
              <h3 className="font-heading text-heading-xl font-bold text-gold mb-4">{t('about.ourVision')}</h3>
              <p className="text-ivory/80 text-body-lg leading-relaxed mb-6 font-normal">
                {content.about.vision || t('about.visionDesc')}
              </p>
              <ul className="space-y-3">
                {(content.about.visionPoints && content.about.visionPoints.length ? content.about.visionPoints : visionPoints).map((point: string, i: number) => (
                  <motion.li key={point} className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/10" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.1 }}>
                    <span className="w-5 h-5 flex-shrink-0 text-gold font-bold">★</span>
                    <span className="text-ivory/85 text-sm leading-relaxed">{point.startsWith('about.') ? t(point) : point}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>

        {/* Governance & Impact */}
        <motion.div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }}>
          <motion.div className="p-6 md:p-8 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-gold/30 backdrop-blur-md shadow-lg" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="w-14 h-14 rounded-2xl bg-gold/15 border border-gold/30 flex items-center justify-center mb-6">
              <Users className="w-7 h-7 text-gold" />
            </div>
            <h3 className="font-heading text-heading-xl font-bold text-gold mb-4">{t('about.governance')}</h3>
            <p className="text-ivory/80 text-body-lg leading-relaxed mb-4">{t('about.governanceDesc')}</p>
            <ul className="space-y-2.5">
              {[
                'about.governancePoint1',
                'about.governancePoint2',
                'about.governancePoint3',
              ].map((point, i) => (
                <li key={point} className="flex items-center gap-2.5 text-ivory/85 text-sm">
                  <span className="w-2 h-2 rounded-full bg-gold" />
                  {t(point)}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div className="p-6 md:p-8 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-gold/30 backdrop-blur-md shadow-lg" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="w-14 h-14 rounded-2xl bg-gold/15 border border-gold/30 flex items-center justify-center mb-6">
              <TrendingUp className="w-7 h-7 text-gold" />
            </div>
            <h3 className="font-heading text-heading-xl font-bold text-gold mb-4">{t('about.annualImpact')}</h3>
            <p className="text-ivory/80 text-body-lg leading-relaxed mb-4">{t('about.impactDesc')}</p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '200+', label: 'about.impactInstitutions' },
                { value: '59', label: 'about.impactCountries' },
                { value: '400+', label: 'about.impactPrograms' },
                { value: '150+', label: 'about.impactExperts' },
              ].map((stat, i) => (
                <motion.div key={stat.label} className="text-center p-4 bg-white/[0.03] border border-white/10 rounded-xl" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 + i * 0.05 }}>
                  <div className="font-heading text-3xl font-bold text-gold">{stat.value}</div>
                  <div className="text-xs text-ivory/70 mt-1">{t(stat.label)}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}