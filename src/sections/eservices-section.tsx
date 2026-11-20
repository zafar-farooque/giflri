import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from '@/components/ui/link';
import { cn } from '@/lib/utils';
import {
  Building2,
  GraduationCap,
  UserCheck,
  Users,
  BookOpen,
  Shield,
  FileText,
  Clock,
  CreditCard,
  MessageSquare,
  Download,
  Search,
  ArrowRight,
  CheckCircle,
  Wifi,
  Laptop,
  Library,
  Headphones,
  LifeBuoy,
  ClipboardCheck,
  PenTool,
  BarChart2,
  FlaskConical,
  Bot,
} from 'lucide-react';

export function EServicesSection() {
  const { t } = useTranslation();

  return (
    <section className="section bg-gradient-to-b from-[#062622] via-[#08332E] to-[#0A3D36] text-ivory relative overflow-hidden border-b border-primary/20" aria-labelledby="eservices-title">
      {/* Background Decorative Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" aria-hidden="true">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="eservices-islamic-pattern" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 80 40 L 40 80 L 0 40 Z" fill="none" stroke="currentColor" strokeWidth="1" />
              <circle cx="40" cy="40" r="16" fill="none" stroke="currentColor" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#eservices-islamic-pattern)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="section-header mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <span className="section-eyebrow">{t('eservices.digitalServices')}</span>
          <h2 id="eservices-title" className="section-title">{t('eservices.title')}</h2>
          <p className="section-subtitle">{t('eservices.subtitle')}</p>
        </motion.div>

        {/* Features Highlight */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }}>
          <div className="section-header mb-12">
            <span className="section-eyebrow">{t('eservices.keyFeatures')}</span>
            <h3 className="section-title">{t('eservices.platformFeatures')}</h3>
          </div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            {[
              { icon: Wifi, title: 'eservices.feature1', desc: 'eservices.feature1Desc' },
              { icon: Shield, title: 'eservices.feature2', desc: 'eservices.feature2Desc' },
              { icon: Clock, title: 'eservices.feature3', desc: 'eservices.feature3Desc' },
              { icon: Users, title: 'eservices.feature4', desc: 'eservices.feature4Desc' },
              { icon: Laptop, title: 'eservices.feature5', desc: 'eservices.feature5Desc' },
              { icon: Search, title: 'eservices.feature6', desc: 'eservices.feature6Desc' },
              { icon: Download, title: 'eservices.feature7', desc: 'eservices.feature7Desc' },
              { icon: Headphones, title: 'eservices.feature8', desc: 'eservices.feature8Desc' },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className="p-6 text-center group rounded-2xl bg-white/[0.04] border border-white/10 hover:border-gold/40 shadow-lg transition-all duration-300 backdrop-blur-md flex flex-col justify-between"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -6 }}
              >
                <div>
                  <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gold/15 text-gold flex items-center justify-center border border-gold/30 shadow-inner group-hover:scale-105 group-hover:bg-gold group-hover:text-primary transition-all duration-300">
                    <feature.icon className="w-7 h-7" />
                  </div>
                  <h4 className="font-heading text-heading-lg font-bold text-white mb-2">{t(feature.title)}</h4>
                  <p className="text-ivory/70 text-body-md font-normal leading-relaxed">{t(feature.desc)}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* CTA */}
        <motion.div className="mt-16 text-center" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }}>
          <div className="max-w-2xl mx-auto">
            <span className="section-eyebrow">{t('eservices.needHelp')}</span>
            <h3 className="section-title mb-4">{t('eservices.contactSupport')}</h3>
            <p className="text-ivory/70 text-body-lg mb-8 leading-relaxed font-normal">{t('eservices.supportDesc')}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn btn-primary btn-lg group inline-flex">
                <span className="flex items-center gap-2">
                  <Headphones className="w-5 h-5" />
                  {t('eservices.contactUs')}
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
              <Link href="/ai" className="px-6 py-3.5 rounded-xl bg-white/[0.06] hover:bg-gold hover:text-primary border border-white/15 text-white font-bold text-base transition-all duration-300 group inline-flex items-center gap-2">
                <Bot className="w-5 h-5" />
                {t('eservices.askAI')}
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}