import { useState } from 'react';
import { Link } from '@/components/ui/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Clock,
  ArrowUp,
  Globe,
  ShieldCheck,
  Award,
  CheckCircle,
  Sparkles,
  ExternalLink,
  ChevronRight,
  BookOpen,
  Building2,
  Lock,
  Send,
  LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useWebsiteContent } from '@/hooks/use-website-content';

const MotionLink = motion(Link);

const iconMap: Record<string, LucideIcon> = {
  ShieldCheck,
  Award,
  Building2,
  BookOpen,
  Globe,
  Lock,
  Sparkles,
};

const defaultTrustBadges = [
  {
    icon: 'ShieldCheck',
    title: 'Cryptographic Registry',
    subtitle: 'Immutable QR & SHA-256 digital certificate verification',
  },
  {
    icon: 'Award',
    title: 'ISO 9001:2015 Quality',
    subtitle: 'International benchmark for academic accreditation',
  },
  {
    icon: 'Building2',
    title: '40+ Member Nations',
    subtitle: 'Worldwide network of recognized partner universities',
  },
  {
    icon: 'BookOpen',
    title: 'Shariah Board Governance',
    subtitle: 'Strict alignment with global Islamic ethical standards',
  },
];

const navigationSections = [
  {
    title: 'Academics & Research',
    links: [
      { label: 'All Curricula & Programs', href: '/programs' },
      { label: 'Islamic Finance Diplomas', href: '/programs/islamic-finance' },
      { label: 'Arabic & Languages Faculty', href: '/programs/languages' },
      { label: 'Research Publications & DOIs', href: '/research/publications' },
      { label: 'Global Observatory Analytics', href: '/observatory' },
      { label: 'Academic Journals', href: '/research/journals' },
    ],
  },
  {
    title: 'Institutional Affiliation',
    links: [
      { label: 'Apply for Affiliation', href: '/affiliation/apply' },
      { label: 'Affiliation Standards & Matrix', href: '/affiliation/standards' },
      { label: 'Track Application Status', href: '/affiliation/track' },
      { label: 'Affiliated Global Directory', href: '/directory' },
      { label: 'Quality Assurance Framework', href: '/quality' },
      { label: 'Renewal & Audit Procedures', href: '/affiliation/renew' },
    ],
  },
  {
    title: 'Governance & Registry',
    links: [
      { label: 'Inaugural Opening & 59 Nations', href: '/opening' },
      { label: 'Public Credential Verification', href: '/verify' },
      { label: 'Global Intelligence Observatory', href: '/observatory' },
      { label: 'Research Directorate & Papers', href: '/research' },
      { label: 'Strategic Pillars', href: '/pillars' },
      { label: 'Scholars & Experts Network', href: '/experts' },
    ],
  },
];

export function Footer() {
  const { t, i18n } = useTranslation();
  const { content } = useWebsiteContent();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setSubmitting(true);
    try {
      await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail }),
      });
      setSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    } catch (err) {
      // fallback success feedback
      setSubscribed(true);
      setNewsletterEmail('');
    } finally {
      setSubmitting(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const trustBadgesList = (content.footer?.trustBadges && content.footer.trustBadges.length > 0)
    ? content.footer.trustBadges
    : defaultTrustBadges;

  const socialList = [
    { platform: 'LinkedIn', icon: Linkedin, href: content.footer?.socialLinks?.linkedin || 'https://linkedin.com' },
    { platform: 'Twitter', icon: Twitter, href: content.footer?.socialLinks?.twitter || 'https://twitter.com' },
    { platform: 'YouTube', icon: Youtube, href: content.footer?.socialLinks?.youtube || 'https://youtube.com' },
    { platform: 'Facebook', icon: Facebook, href: content.footer?.socialLinks?.facebook || 'https://facebook.com' },
    { platform: 'Instagram', icon: Instagram, href: content.footer?.socialLinks?.instagram || 'https://instagram.com' },
  ];

  return (
    <footer className="bg-gradient-to-b from-primary via-primary-dark to-[#05201c] text-ivory relative overflow-hidden pt-16 border-t border-primary/20" role="contentinfo">
      {/* Background Decorative Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" aria-hidden="true">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="footer-islamic-pattern" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 80 40 L 40 80 L 0 40 Z" fill="none" stroke="currentColor" strokeWidth="1" />
              <circle cx="40" cy="40" r="16" fill="none" stroke="currentColor" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footer-islamic-pattern)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Trust Features Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pb-12 border-b border-white/10">
          {trustBadgesList.map((badge, idx) => {
            const Icon = (typeof badge.icon === 'string' ? iconMap[badge.icon] : null) || ShieldCheck;
            return (
              <motion.div
                key={badge.title + idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="flex items-start gap-3.5 p-4 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-gold/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-gold/15 text-gold flex items-center justify-center shrink-0 border border-gold/30 shadow-inner">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm text-ivory tracking-wide">
                    {badge.title}
                  </h4>
                  <p className="text-xs text-ivory/60 mt-0.5 leading-relaxed">
                    {badge.subtitle}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 py-14">
          {/* Column 1: Brand & Headquarters (4 cols on lg) */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/home" className="inline-flex items-center gap-3 group" aria-label="GIFLRI Home">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-gold/40 flex items-center justify-center bg-white shadow-md group-hover:scale-105 transition-transform ring-2 ring-gold/20">
                <img
                  src="/logo.jpg"
                  alt="GIFLRI Logo"
                  className="w-full h-full object-cover scale-[1.05]"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-2xl font-bold text-ivory tracking-wider leading-none">
                  GIFLRI
                </span>
                <span className="text-[10px] tracking-widest uppercase font-semibold text-gold/90 mt-1">
                  Global Islamic Finance & Language Research
                </span>
              </div>
            </Link>

            <p className="text-sm text-ivory/70 leading-relaxed pr-2">
              {content.footer?.aboutText || 'The premier global accreditation, standards authority, and research registry empowering institutions, scholars, and learners across ethical finance and languages worldwide.'}
            </p>

            {/* Direct Contact Points */}
            <div className="space-y-2.5 text-xs text-ivory/80 pt-2">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-gold shrink-0" />
                <span>{content.footer?.secretariatInfo || 'Executive Headquarters: Dubai International Financial Centre (DIFC), UAE'}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gold shrink-0" />
                <a href={`mailto:${content.footer?.email || 'info@giflri.org'}`} className="hover:text-gold transition-colors font-mono">
                  {content.footer?.email || 'info@giflri.org / registry@giflri.org'}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <a href={`tel:${content.footer?.phone || '+97141234567'}`} className="hover:text-gold transition-colors font-mono">
                  {content.footer?.phone || '+971 4 123 4567 (International Registrar)'}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-gold shrink-0" />
                <span>{content.footer?.operatingHours || 'Operating Hours: Monday – Friday, 08:30 – 17:30 (GST)'}</span>
              </div>
            </div>

            {/* Social Icons Strip */}
            <div className="pt-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-ivory/50 block mb-2.5">
                Connect Globally
              </span>
              <div className="flex items-center gap-2.5">
                {socialList.map((social) => (
                  <motion.a
                    key={social.platform}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-ivory/80 hover:text-primary hover:bg-gold hover:border-gold transition-all duration-300"
                    aria-label={social.platform}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Columns 2, 3, 4: Nav Links (2 cols each, total 6 cols) */}
          {navigationSections.map((sec, secIdx) => (
            <div key={sec.title} className="lg:col-span-2 space-y-4">
              <h4 className="font-heading text-sm font-bold text-gold tracking-wide uppercase">
                {sec.title}
              </h4>
              <ul className="space-y-2.5 text-xs">
                {sec.links.map((link) => (
                  <li key={link.href}>
                    <MotionLink
                      href={link.href}
                      className="text-ivory/70 hover:text-gold transition-colors flex items-center gap-1.5 group"
                      whileHover={{ x: 3 }}
                    >
                      <ChevronRight className="w-3 h-3 text-gold/40 group-hover:text-gold transition-colors" />
                      <span>{link.label}</span>
                    </MotionLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Column 5: Newsletter & Global Language (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-heading text-sm font-bold text-gold tracking-wide uppercase">
              Global Dispatch
            </h4>
            <p className="text-xs text-ivory/65 leading-relaxed">
              Subscribe to official academic circulars, research releases, and symposium announcements.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="name@institution.edu"
                  className="w-full bg-white/[0.06] border border-white/15 rounded-xl py-2.5 pl-3 pr-8 text-xs text-ivory placeholder-ivory/40 focus:outline-none focus:border-gold transition-colors"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  aria-label="Subscribe"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-gold text-primary hover:bg-gold-light transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              <AnimatePresence>
                {subscribed && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-[11px] text-emerald-400 flex items-center gap-1 font-semibold pt-1"
                  >
                    <CheckCircle className="w-3 h-3" /> Subscribed to GIFLRI circulars!
                  </motion.div>
                )}
              </AnimatePresence>
            </form>

            {/* Language Selection */}
            <div className="pt-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-ivory/50 block mb-1.5">
                Official Language
              </label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => i18n.changeLanguage('en')}
                  className={cn(
                    'px-2.5 py-1 rounded-lg text-xs font-bold transition-colors border',
                    i18n.language === 'en'
                      ? 'bg-gold text-primary border-gold'
                      : 'bg-white/5 border-white/10 text-ivory/70 hover:bg-white/10'
                  )}
                >
                  English (EN)
                </button>
                <button
                  onClick={() => i18n.changeLanguage('ar')}
                  className={cn(
                    'px-2.5 py-1 rounded-lg text-xs font-bold transition-colors border',
                    i18n.language === 'ar'
                      ? 'bg-gold text-primary border-gold'
                      : 'bg-white/5 border-white/10 text-ivory/70 hover:bg-white/10'
                  )}
                >
                  العربية (AR)
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="border-t border-white/10 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-ivory/60">
          <div className="flex items-center gap-2 flex-wrap text-center md:text-left">
            <span>{content.footer?.copyright || `© ${currentYear} GIFLRI — Global Islamic Finance & Language Research Institution. All Rights Reserved.`}</span>
            <span className="hidden md:inline">•</span>
            <span>Chartered International Accreditation Registry.</span>
          </div>

          <div className="flex items-center gap-5 flex-wrap">
            <Link href="/trust/policies" className="hover:text-gold transition-colors">
              Privacy Charter
            </Link>
            <span>•</span>
            <Link href="/trust/policies" className="hover:text-gold transition-colors">
              Terms of Institutional Affiliation
            </Link>
            <span>•</span>
            <Link href="/verify" className="hover:text-gold transition-colors flex items-center gap-1 text-gold font-bold">
              <ShieldCheck className="w-3.5 h-3.5" /> Registry Verification
            </Link>
          </div>
        </div>
      </div>

      {/* Floating Back-to-Top Button */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-30 w-11 h-11 rounded-full bg-gold text-primary shadow-xl flex items-center justify-center hover:bg-gold-light hover:scale-110 transition-all duration-300 border-2 border-primary ring-2 ring-gold/40"
        aria-label="Back to top"
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowUp className="w-5 h-5" />
      </motion.button>
    </footer>
  );
}