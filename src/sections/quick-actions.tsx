import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from '@/components/ui/link';
import { cn } from '@/lib/utils';
import {
  Building2,
  Search,
  ShieldCheck,
  BookOpen,
  FlaskConical,
  Bot,
  ArrowRight,
  LucideIcon,
  Sparkles,
} from 'lucide-react';
import { useWebsiteContent } from '@/hooks/use-website-content';

const iconMap: Record<string, LucideIcon> = {
  Building2,
  Search,
  ShieldCheck,
  BookOpen,
  FlaskConical,
  Bot,
};

const defaultActions = [
  {
    label: 'actions.applyAffiliation',
    desc: 'Start your institution\'s affiliation journey',
    href: '/affiliation/apply',
    icon: 'Building2',
    color: 'gold',
  },
  {
    label: 'actions.findInstitution',
    desc: 'Search the global directory of institutions',
    href: '/directory',
    icon: 'Search',
    color: 'primary',
  },
  {
    label: 'actions.verifyAffiliation',
    desc: 'Instantly verify affiliation status',
    href: '/verify',
    icon: 'ShieldCheck',
    color: 'emerald',
  },
  {
    label: 'actions.findProgram',
    desc: 'Discover approved learning pathways',
    href: '/programs/find',
    icon: 'BookOpen',
    color: 'blue',
  },
  {
    label: 'actions.submitResearch',
    desc: 'Submit papers to GIFLRI journals',
    href: '/research',
    icon: 'FlaskConical',
    color: 'purple',
  },
  {
    label: 'actions.askAI',
    desc: 'Get answers from GIFLRI\'s AI assistant',
    href: '/ai',
    icon: 'Bot',
    color: 'orange',
  },
];

const MotionLink = motion(Link);

export function QuickActions() {
  const { t } = useTranslation();
  const { content } = useWebsiteContent();

  const actions = (content.quickActions?.actions && content.quickActions.actions.length > 0)
    ? content.quickActions.actions
    : defaultActions;

  return (
    <section className="section bg-gradient-to-b from-[#0A3D36] via-[#08332E] to-[#062622] text-ivory relative overflow-hidden border-b border-primary/20" aria-labelledby="actions-title">
      {/* Background Decorative Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" aria-hidden="true">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="quick-actions-islamic-pattern" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 80 40 L 40 80 L 0 40 Z" fill="none" stroke="currentColor" strokeWidth="1" />
              <circle cx="40" cy="40" r="16" fill="none" stroke="currentColor" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#quick-actions-islamic-pattern)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <span className="section-eyebrow">
            {content.quickActions?.eyebrow || t('homepage.quickActions')}
          </span>
          <h2 id="actions-title" className="section-title">
            {content.quickActions?.title || t('hero.subtitle')}
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          {actions.map((action, index) => {
            const iconKey = (action as any).icon || (action as any).iconName;
            const Icon = (typeof iconKey === 'string' ? iconMap[iconKey] : null) || Sparkles;
            const label = action.label.startsWith('actions.') ? t(action.label) : action.label;
            const desc = action.desc.startsWith('actions.') ? t(action.desc) : action.desc;

            return (
              <MotionLink
                key={action.href + index}
                href={action.href}
                className="group relative p-6 md:p-8 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-gold/40 text-ivory overflow-hidden transition-all duration-500 backdrop-blur-md hover:bg-white/[0.07] shadow-lg flex flex-col justify-between"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-14 h-14 rounded-2xl bg-gold/15 text-gold flex items-center justify-center mb-6 group-hover:scale-105 group-hover:bg-gold group-hover:text-primary transition-all duration-300 border border-gold/30 shadow-inner">
                    <Icon className="w-7 h-7" aria-hidden="true" />
                  </div>

                  <h3 className="font-heading text-heading-lg font-bold text-white group-hover:text-gold transition-colors mb-3">
                    {label}
                  </h3>
                  <p className="text-ivory/70 text-body-md leading-relaxed flex-1">
                    {desc}
                  </p>

                  <div className="mt-6 flex items-center gap-2 text-gold font-bold text-sm group-hover:gap-3 transition-all duration-300">
                    <span>{t('common.view')}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </MotionLink>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}