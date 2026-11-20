import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from '@/components/ui/link';
import { cn } from '@/lib/utils';
import { PillarContent } from '@/types';

const MotionLink = motion(Link);
import {
  TrendingUp,
  Languages,
  Microscope,
  Building2,
  Globe,
  Brain,
  ArrowRight,
  Check,
  Shield,
  LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  finance: TrendingUp,
  languages: Languages,
  research: Microscope,
  development: Building2,
  cooperation: Globe,
  digital: Brain,
};

const defaultPillars: Array<{
  id: string;
  icon: LucideIcon;
  titleKey: string;
  descKey: string;
  features: string[];
  color: string;
  gradient: string;
  bgGradient: string;
}> = [
  {
    id: 'finance',
    icon: TrendingUp,
    titleKey: 'pillars.islamicFinance',
    descKey: 'pillars.financeDesc',
    features: [
      'pillars.financeFeature1',
      'pillars.financeFeature2',
      'pillars.financeFeature3',
      'pillars.financeFeature4',
    ],
    color: 'emerald',
    gradient: 'from-emerald-600 to-emerald-700',
    bgGradient: 'from-emerald-500/10 to-emerald-600/10',
  },
  {
    id: 'languages',
    icon: Languages,
    titleKey: 'pillars.languages',
    descKey: 'pillars.languagesDesc',
    features: [
      'pillars.langFeature1',
      'pillars.langFeature2',
      'pillars.langFeature3',
      'pillars.langFeature4',
    ],
    color: 'gold',
    gradient: 'from-gold-500 to-gold-600',
    bgGradient: 'from-gold-500/10 to-gold-600/10',
  },
  {
    id: 'research',
    icon: Microscope,
    titleKey: 'pillars.research',
    descKey: 'pillars.researchDesc',
    features: [
      'pillars.researchFeature1',
      'pillars.researchFeature2',
      'pillars.researchFeature3',
      'pillars.researchFeature4',
    ],
    color: 'blue',
    gradient: 'from-blue-500 to-blue-600',
    bgGradient: 'from-blue-500/10 to-blue-600/10',
  },
  {
    id: 'development',
    icon: Building2,
    titleKey: 'pillars.institutionDev',
    descKey: 'pillars.devDesc',
    features: [
      'pillars.devFeature1',
      'pillars.devFeature2',
      'pillars.devFeature3',
      'pillars.devFeature4',
    ],
    color: 'purple',
    gradient: 'from-purple-500 to-purple-600',
    bgGradient: 'from-purple-500/10 to-purple-600/10',
  },
  {
    id: 'cooperation',
    icon: Globe,
    titleKey: 'pillars.intlCooperation',
    descKey: 'pillars.coopDesc',
    features: [
      'pillars.coopFeature1',
      'pillars.coopFeature2',
      'pillars.coopFeature3',
      'pillars.coopFeature4',
    ],
    color: 'orange',
    gradient: 'from-orange-500 to-orange-600',
    bgGradient: 'from-orange-500/10 to-orange-600/10',
  },
  {
    id: 'digital',
    icon: Brain,
    titleKey: 'pillars.knowledgeDigital',
    descKey: 'pillars.digitalDesc',
    features: [
      'pillars.digitalFeature1',
      'pillars.digitalFeature2',
      'pillars.digitalFeature3',
      'pillars.digitalFeature4',
    ],
    color: 'pink',
    gradient: 'from-pink-500 to-pink-600',
    bgGradient: 'from-pink-500/10 to-pink-600/10',
  },
];

export function PillarsSection() {
  const { t } = useTranslation();
  const [dynamicPillars, setDynamicPillars] = useState<PillarContent[]>([]);

  const fetchPillars = async () => {
    try {
      const res = await fetch('/api/admin/pillars');
      const data = await res.json();
      if (data.success && Array.isArray(data.data) && data.data.length > 0) {
        setDynamicPillars(data.data);
      }
    } catch (err) {
      console.error('Failed to fetch dynamic pillars:', err);
    }
  };

  useEffect(() => {
    fetchPillars();

    const handleUpdate = () => {
      fetchPillars();
    };

    window.addEventListener('website-content-updated', handleUpdate);
    return () => window.removeEventListener('website-content-updated', handleUpdate);
  }, []);

  const items = defaultPillars.map((defaultPillar, index) => {
    const dyn = dynamicPillars.find(
      (p) => p.id.toLowerCase() === defaultPillar.id.toLowerCase()
    );

    const Icon = iconMap[defaultPillar.id] || Shield;
    const title = dyn?.customTitle || t(defaultPillar.titleKey);
    const desc = dyn?.customDesc || t(defaultPillar.descKey);
    
    // If initiatives are defined on dynamic pillar, use their titles, else use default translated features
    const features = dyn?.initiatives && dyn.initiatives.length > 0
      ? dyn.initiatives.map((init) => init.title)
      : defaultPillar.features.map((feat) => t(feat));

    return {
      id: defaultPillar.id,
      index,
      icon: Icon,
      title,
      desc,
      features,
      color: dyn?.color || defaultPillar.color,
      gradient: dyn?.gradient || defaultPillar.gradient,
      bgGradient: dyn?.bgGradient || defaultPillar.bgGradient,
    };
  });

  return (
    <section className="section bg-gradient-to-b from-[#062622] via-[#08332E] to-[#0A3D36] text-ivory relative overflow-hidden border-b border-primary/20" aria-labelledby="pillars-title">
      {/* Background Decorative Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" aria-hidden="true">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="pillars-islamic-pattern" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 80 40 L 40 80 L 0 40 Z" fill="none" stroke="currentColor" strokeWidth="1" />
              <circle cx="40" cy="40" r="16" fill="none" stroke="currentColor" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pillars-islamic-pattern)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <span className="section-eyebrow">{t('pillars.ourWork')}</span>
          <h2 id="pillars-title" className="section-title">{t('pillars.fivePillars')}</h2>
          <p className="section-subtitle">{t('pillars.pillarsDesc')}</p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          {items.map((pillar, index) => (
            <motion.article
              key={pillar.id}
              className="relative group overflow-hidden rounded-2xl bg-white/[0.04] border border-white/10 hover:border-gold/40 shadow-lg hover:shadow-gold/10 transition-all duration-300 flex flex-col backdrop-blur-md"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -6 }}
            >
              <div className="p-6 md:p-8 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-gold/15 text-gold border border-gold/30 shadow-inner group-hover:scale-105 group-hover:bg-gold group-hover:text-primary transition-all duration-300">
                      <pillar.icon className="w-7 h-7" aria-hidden="true" />
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gold/10 text-gold border border-gold/30">
                      Pillar {index + 1}
                    </span>
                  </div>

                  <h3 className="font-heading text-heading-xl font-bold text-white group-hover:text-gold transition-colors mb-3">{pillar.title}</h3>
                  <p className="text-ivory/70 text-body-md leading-relaxed mb-6 font-normal">{pillar.desc}</p>

                  <ul className="space-y-2.5 mb-6">
                    {pillar.features.map((feature, i) => (
                      <motion.li
                        key={i}
                        className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.03] border border-white/10"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + i * 0.08 }}
                      >
                        <Check className="w-4 h-4 text-gold flex-shrink-0 font-bold" />
                        <span className="text-ivory/90 font-medium text-xs sm:text-sm">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <MotionLink
                  href={`/pillars/${pillar.id}`}
                  className="inline-flex items-center gap-2 font-bold text-sm text-gold hover:text-gold-light mt-auto group"
                  whileHover={{ x: 4 }}
                >
                  {t('common.explore')}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </MotionLink>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}