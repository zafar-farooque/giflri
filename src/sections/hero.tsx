import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from '@/components/ui/link';
import { ArrowRight, Globe, Award, Users, BookOpen, FlaskConical, Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SiteSettings } from '@/types';
import { initialSiteSettings } from '@/data/seedData';

export function Hero() {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const [settings, setSettings] = useState<SiteSettings>(initialSiteSettings);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setMounted(true);
    async function loadLiveSettings() {
      try {
        const res = await fetch('/api/admin/settings');
        const data = await res.json();
        if (data.success && data.data) {
          setSettings(data.data);
        }
      } catch (err) {
        // silent fallback
      }
    }
    loadLiveSettings();
  }, []);

  useEffect(() => {
    if (mounted && videoRef.current) {
      // Force reload and play programmatically to override browser autoplay blockers
      videoRef.current.load();
      videoRef.current.play().catch(err => {
        console.log("Autoplay retrying on interaction");
      });
    }
  }, [mounted]);

  const liveStats = [
    { value: settings.heroStats?.countries || 59, label: 'hero.countries', icon: Globe, suffix: '+' },
    { value: settings.heroStats?.institutions || 200, label: 'hero.institutions', icon: Building2, suffix: '+' },
    { value: settings.heroStats?.programs || 400, label: 'hero.programs', icon: BookOpen, suffix: '+' },
    { value: settings.heroStats?.experts || 150, label: 'hero.experts', icon: Award, suffix: '+' },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" aria-labelledby="hero-title">
      {/* Crisp Full-Visibility Video Background */}
      <div className="absolute inset-0 overflow-hidden bg-black" aria-hidden="true">
        {mounted && (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/124062-729835809.mp4" type="video/mp4" />
          </video>
        )}
        {/* Minimal subtle dark scrim solely to ensure pristine text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/20 to-black/65 pointer-events-none" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-32 pb-20 md:pt-40 md:pb-24">
        <motion.div
          className="max-w-5xl mx-auto text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Eyebrow */}
          <motion.span
            className="section-eyebrow inline-block bg-black/50 border border-gold/30 backdrop-blur-md shadow-lg text-gold"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              {settings.siteTagline || t('hero.subtitle')}
            </span>
          </motion.span>

          {/* Title */}
          <motion.h1
            id="hero-title"
            className="font-heading text-display-md md:text-display-lg lg:text-display-xl font-bold leading-tight mb-6 drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            {settings.heroHeadline ? (
              <span className="text-ivory">{settings.heroHeadline}</span>
            ) : (
              <>
                <span className="text-ivory">Advancing </span>
                <span className="text-gold">Ethical Finance</span>
                <span className="text-ivory">,<br className="hidden md:inline" /> Languages & </span>
                <span className="text-gold">Global Knowledge</span>
              </>
            )}
          </motion.h1>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Link href={settings.heroCtaPrimaryLink || "/affiliation/apply"} className="btn btn-gold btn-lg group shadow-lg shadow-gold/10">
              <span className="flex items-center gap-2">
                {settings.heroCtaPrimaryText || t('hero.ctaPrimary')}
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
            <Link href={settings.heroCtaSecondaryLink || "/verify"} className="btn btn-outline btn-lg border-ivory/30 text-ivory hover:bg-white/10 group backdrop-blur-sm shadow-lg">
              <span className="flex items-center gap-2">
                {settings.heroCtaSecondaryText || t('hero.ctaSecondary')}
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {liveStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center p-4 md:p-6 rounded-2xl bg-black/40 border border-white/15 backdrop-blur-md shadow-2xl hover:bg-black/50 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ y: -4, scale: 1.02 }}
              >
                <stat.icon className="w-7 h-7 mx-auto mb-3 text-gold" aria-hidden="true" />
                <div className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-ivory">
                  <span className="counter" data-target={stat.value}>{stat.value}</span>{stat.suffix}
                </div>
                <p className="text-ivory/70 text-body-sm mt-1">{t(stat.label)}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-ivory/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{
            opacity: { delay: 1.2, duration: 0.5 },
            y: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
          }}
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <motion.div
            className="w-6 h-10 border-2 border-ivory/30 rounded-full flex justify-center pt-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-ivory/50" />
          </motion.div>
        </motion.div>
      </div>

      {/* Smooth Ambient Gradient Fade at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-ivory dark:from-primary-dark via-ivory/20 to-transparent pointer-events-none z-[5]" />
    </section>
  );
}