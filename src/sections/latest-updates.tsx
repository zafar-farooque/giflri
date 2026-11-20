import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from '@/components/ui/link';
import { cn } from '@/lib/utils';
import { Calendar, MapPin, Tag, Clock, ArrowRight, FileText, Users, Award, Newspaper } from 'lucide-react';
import { useWebsiteContent } from '@/hooks/use-website-content';

const typeStyles = {
  news: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', badge: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30', icon: Newspaper },
  research: { bg: 'bg-cyan-500/10', text: 'text-cyan-400', badge: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30', icon: FileText },
  event: { bg: 'bg-amber-500/10', text: 'text-gold', badge: 'bg-gold/15 text-gold border-gold/30', icon: Users },
  announcement: { bg: 'bg-gold/10', text: 'text-gold', badge: 'bg-gold/15 text-gold border-gold/30', icon: Award },
};

export function LatestUpdates() {
  const { t } = useTranslation();
  const { content } = useWebsiteContent();

  const updates = content.latestUpdates?.updates || [];

  return (
    <section className="section bg-gradient-to-b from-[#0A3D36] via-[#08332E] to-[#062622] relative overflow-hidden" aria-labelledby="updates-title">
      {/* Background Islamic Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#C9A227_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="section-header flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <div>
            <span className="section-eyebrow text-gold font-bold tracking-widest uppercase text-xs">
              {content.latestUpdates?.eyebrow || t('homepage.latestUpdates')}
            </span>
            <h2 id="updates-title" className="section-title text-white font-heading text-3xl md:text-5xl font-bold mt-2">
              {content.latestUpdates?.title || t('homepage.latestUpdates')}
            </h2>
            {content.latestUpdates?.subtitle && (
              <p className="text-ivory/70 text-sm mt-2 max-w-xl">
                {content.latestUpdates.subtitle}
              </p>
            )}
          </div>
          <Link href="/updates" className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-white/[0.04] text-ivory border border-white/10 hover:border-gold/40 hover:text-gold transition-all duration-300 backdrop-blur-md self-end md:self-auto flex items-center gap-2">
            <span>{t('homepage.viewAll')}</span>
            <ArrowRight className="w-4 h-4 text-gold" />
          </Link>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          {updates.map((update, index) => {
            const style = typeStyles[update.type as keyof typeof typeStyles] || typeStyles.announcement;
            const Icon = style.icon;

            return (
              <motion.article
                key={update.id}
                className="group relative overflow-hidden rounded-2xl bg-white/[0.04] border border-white/10 hover:border-gold/40 shadow-xl backdrop-blur-md transition-all duration-500 ease-spring flex flex-col justify-between"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)' }}
              >
                <div>
                  {/* Image banner area */}
                  <div className="relative h-44 overflow-hidden bg-gradient-to-br from-[#0D4D44]/60 to-[#062622]/80 border-b border-white/10">
                    <div className="absolute inset-0 bg-[radial-gradient(#C9A227_1px,transparent_1px)] [background-size:16px_16px] opacity-10 group-hover:scale-105 transition-transform duration-700" />
                    
                    <div className="absolute top-4 left-4">
                      <span className={cn('px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-md', style.badge)}>
                        {t(update.label)}
                      </span>
                    </div>
                    {update.type === 'event' && update.location && (
                      <div className="absolute bottom-4 left-4 flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#062622]/80 border border-white/10 backdrop-blur-md text-xs font-medium text-ivory">
                        <MapPin className="w-3 h-3 text-gold" />
                        {update.location}
                      </div>
                    )}
                    {update.type === 'announcement' && update.deadline && (
                      <div className="absolute bottom-4 left-4 flex items-center gap-1 px-3 py-1.5 rounded-full bg-gold/15 border border-gold/30 text-gold text-xs font-medium backdrop-blur-md">
                        <Clock className="w-3 h-3" />
                        Deadline: {new Date(update.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Icon className={cn('w-4 h-4', style.text)} />
                      <time className="text-xs text-ivory/60" dateTime={update.date}>
                        {new Date(update.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </time>
                    </div>

                    <h3 className="font-heading text-lg md:text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-gold transition-colors">
                      {update.title}
                    </h3>

                    <p className="text-ivory/70 text-sm leading-relaxed mb-4 line-clamp-3">
                      {update.desc}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-ivory/50 mb-4">
                      {update.author && (
                        <span className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                          {update.author}
                        </span>
                      )}
                      {update.readTime && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-gold" />
                          {update.readTime} read
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-0">
                  <Link
                    href={`/updates/${update.id}`}
                    className="inline-flex items-center gap-2 font-bold text-sm text-gold hover:text-gold-light transition-all duration-300 group-hover:gap-3"
                  >
                    {t('common.readMore')}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}