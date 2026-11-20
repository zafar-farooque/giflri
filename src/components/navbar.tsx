import { useState, useEffect, useMemo } from 'react';
import { Link } from '@/components/ui/link';
import { usePathname, useRouter } from '@/lib/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  Menu,
  X,
  Globe,
  Search,
  Home as HomeIcon,
  BookOpen,
  GraduationCap,
  Building2,
  FlaskConical,
  Network,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { GlobalAnnouncementBanner } from './announcement-banner';
import { performSearch, SearchItem } from '@/data/searchData';

const navItems = [
  { label: 'nav.home', href: '/', icon: HomeIcon },
  { label: 'nav.about', href: '/about', icon: Building2 },
  { label: 'nav.pillars', href: '/pillars', icon: BookOpen },
  { label: 'nav.affiliation', href: '/affiliation', icon: GraduationCap },
  { label: 'nav.programs', href: '/programs', icon: BookOpen },
  { label: 'nav.research', href: '/research', icon: FlaskConical },
  { label: 'nav.globalNetwork', href: '/directory', icon: Network },
  { label: 'nav.verify', href: '/verify', icon: ShieldCheck },
];

const MotionLink = motion(Link);

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { t, i18n } = useTranslation();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Listen for Escape key and Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' || event.key === 'Esc') {
        setSearchOpen(false);
        setMobileOpen(false);
      }
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const liveSearchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return performSearch(searchQuery).slice(0, 5);
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
    }
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 pointer-events-none"
    >
      <div className="pointer-events-auto">
        <GlobalAnnouncementBanner />
      </div>

      <nav
        className={cn(
          'w-full transition-all duration-300 pointer-events-auto',
          scrolled
            ? 'bg-[#062622]/95 backdrop-blur-md border-b border-gold/20 shadow-2xl'
            : 'bg-[#051F1C]/85 backdrop-blur-md border-b border-white/10 shadow-lg'
        )}
        aria-label="Main navigation"
      >
        <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20 gap-4">
            {/* Logo */}
            <Link
              href="/home"
              className="flex items-center gap-3 z-10 shrink-0 group mr-2 xl:mr-6"
              aria-label="GIFLRI Home"
            >
              <motion.div
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border border-gold/50 flex items-center justify-center bg-white shadow-md ring-2 ring-gold/30 shrink-0"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.08, rotate: 8 }}
              >
                <img
                  src="/logo.jpg"
                  alt="GIFLRI Logo"
                  className="w-full h-full object-cover scale-[1.05]"
                />
              </motion.div>
              <div className="hidden sm:flex flex-col">
                <span className="font-heading text-xl md:text-2xl font-bold text-white leading-none tracking-tight group-hover:text-gold transition-colors">
                  GIFLRI
                </span>
                <span className="text-[9px] tracking-widest uppercase font-bold text-gold/90 mt-0.5">
                  Global Quality
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden xl:flex items-center gap-1 2xl:gap-2 flex-1 justify-center max-w-4xl">
              {navItems.map((item, index) => {
                const isActive = item.href === '/' 
                  ? (pathname === '/' || pathname === '/home')
                  : pathname === item.href;
                return (
                  <MotionLink
                    key={item.href}
                    href={item.href}
                    prefetch={true}
                    className={cn(
                      'flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[13px] 2xl:text-[14px] font-medium transition-all duration-200 whitespace-nowrap',
                      isActive
                        ? 'bg-gold/15 text-gold border border-gold/40 font-semibold shadow-[0_0_12px_rgba(212,175,55,0.15)]'
                        : 'text-ivory/80 hover:bg-white/8 hover:text-gold border border-transparent'
                    )}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 + index * 0.03, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <item.icon className={cn('w-3.5 h-3.5 shrink-0', isActive ? 'text-gold' : 'text-ivory/60')} aria-hidden="true" />
                    <span>{t(item.label)}</span>
                  </MotionLink>
                );
              })}
            </div>

            {/* Desktop Actions */}
            <div className="hidden xl:flex items-center gap-2.5 2xl:gap-3 shrink-0">
              {/* Search Button */}
              <motion.button
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-xl text-ivory/80 hover:text-gold hover:bg-white/5 transition-colors"
                aria-label="Search"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
              >
                <Search className="w-4 h-4 2xl:w-5 2xl:h-5" />
              </motion.button>

              {/* Language Switcher */}
              <div className="relative">
                <button
                  onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'ar' : 'en')}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-gold text-xs font-bold transition-colors hover:bg-white/10"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span className="uppercase">{i18n.language === 'en' ? 'EN' : 'AR'}</span>
                </button>
              </div>
            </div>

            {/* Mobile Actions (Visible under xl) */}
            <div className="flex xl:hidden items-center gap-2 pointer-events-auto">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-xl text-white/80 hover:text-gold hover:bg-white/10 transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setMobileOpen(true)}
                className="p-2 rounded-xl text-white hover:text-gold hover:bg-white/10 transition-colors"
                aria-label="Open menu"
                aria-expanded={mobileOpen}
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
        </div>
      </div>
    </nav>

      {/* Search Modal */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-20 px-4 bg-black/75 backdrop-blur-md pointer-events-auto"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-2xl bg-[#062622] rounded-3xl shadow-2xl p-5 sm:p-6 border border-gold/30 text-white overflow-hidden max-h-[85vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gold/15 text-gold flex items-center justify-center border border-gold/30">
                    <Search className="w-4 h-4" />
                  </div>
                  <span className="font-heading font-bold text-sm text-white">Global Institutional Search</span>
                </div>
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-gold transition-colors border border-white/10"
                  aria-label="Close search"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Search Input Box */}
              <form onSubmit={handleSearch} className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t('common.search') + ' programs, research, 59 nations, affiliations...'}
                    className="w-full px-4 py-3 rounded-2xl bg-[#0B2E29] border border-emerald-500/30 text-white text-sm outline-none focus:border-gold placeholder:text-white/40 pr-10"
                    autoFocus
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <button
                  type="submit"
                  className="px-5 py-3 rounded-2xl bg-gradient-to-r from-gold to-amber-500 text-emerald-950 font-bold hover:brightness-110 transition-all shadow flex items-center gap-1.5 shrink-0"
                >
                  <Search className="w-4 h-4" />
                  <span className="hidden sm:inline">Search</span>
                </button>
              </form>

              {/* Quick Tags when input is empty */}
              {!searchQuery.trim() && (
                <div className="mt-4 pt-3 border-t border-white/5">
                  <span className="text-xs font-semibold text-emerald-300/60 block mb-2">Quick Shortcuts:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {['Opening', 'Affiliation', 'Verify', 'Islamic Finance', 'Saudi Arabia', 'UAE', 'Programs', 'NLP', 'Observatory'].map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => {
                          setSearchQuery(tag);
                        }}
                        className="px-3 py-1 rounded-full text-xs bg-white/5 hover:bg-gold/20 text-emerald-100 hover:text-gold border border-white/10 hover:border-gold/30 transition-all"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Live Instant Search Results */}
              {searchQuery.trim() && (
                <div className="mt-4 overflow-y-auto flex-1 space-y-2 pr-1 max-h-60 scrollbar-thin">
                  {liveSearchResults.length > 0 ? (
                    <>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-gold block mb-1">
                        Instant Matches ({liveSearchResults.length})
                      </span>
                      {liveSearchResults.map((item) => (
                        <Link
                          key={item.id}
                          href={item.href}
                          onClick={() => setSearchOpen(false)}
                          className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-gold/30 transition-all group"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-gold/15 text-gold border border-gold/30 shrink-0">
                              {item.category}
                            </span>
                            <div className="min-w-0">
                              <h4 className="font-bold text-xs sm:text-sm text-white group-hover:text-gold truncate">
                                {item.title}
                              </h4>
                              <p className="text-[11px] text-emerald-200/60 truncate">
                                {item.description}
                              </p>
                            </div>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-gold shrink-0 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                        </Link>
                      ))}

                      {/* Full Results Link */}
                      <button
                        type="button"
                        onClick={handleSearch}
                        className="w-full mt-2 py-2 px-3 rounded-xl bg-gold/15 hover:bg-gold/25 text-gold border border-gold/30 text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                      >
                        <span>View all matching results in Full Search Explorer</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </>
                  ) : (
                    <div className="text-center py-6 text-emerald-200/60 text-xs">
                      <p>No instant matches for "{searchQuery}".</p>
                      <button
                        type="button"
                        onClick={handleSearch}
                        className="mt-2 text-gold font-bold hover:underline"
                      >
                        Press Enter or click here to search entire database →
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Modal Footer Hotkeys */}
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-emerald-200/60">
                <div className="flex items-center gap-3">
                  <span>
                    Press <kbd className="px-1.5 py-0.5 bg-emerald-900/80 rounded text-gold font-mono text-[10px] border border-emerald-500/30">Esc</kbd> to close
                  </span>
                  <span>
                    <kbd className="px-1.5 py-0.5 bg-emerald-900/80 rounded text-gold font-mono text-[10px] border border-emerald-500/30">↵ Enter</kbd> to search
                  </span>
                </div>
                <span className="hidden sm:inline">
                  <kbd className="px-1.5 py-0.5 bg-emerald-900/80 rounded text-gold font-mono text-[10px] border border-emerald-500/30">Ctrl + K</kbd> to toggle
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 bg-[#062622]/98 backdrop-blur-2xl overflow-y-auto pointer-events-auto flex flex-col justify-between"
          >
            {/* Mobile Header Bar */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gold/20 shrink-0">
              <Link
                href="/home"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2.5"
              >
                <div className="w-9 h-9 rounded-full overflow-hidden border border-gold/50 bg-white flex items-center justify-center shadow">
                  <img src="/logo.jpg" alt="GIFLRI" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col">
                  <span className="font-heading text-lg font-bold text-white leading-none">GIFLRI</span>
                  <span className="text-[9px] tracking-widest uppercase font-bold text-gold mt-0.5">Global Quality</span>
                </div>
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-xl bg-white/5 border border-white/10 text-white hover:text-gold hover:bg-white/10 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile Nav Content */}
            <div className="flex-1 px-6 py-6 space-y-5 overflow-y-auto">
              {/* Mobile Search Input */}
              <form onSubmit={handleSearch} className="w-full">
                <div className="relative">
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t('common.search') + '...'}
                    className="w-full pl-4 pr-11 py-3 rounded-2xl bg-[#0B2E29] border border-emerald-500/30 text-white text-sm outline-none focus:border-gold placeholder:text-white/40"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-xl text-gold hover:bg-white/5"
                    aria-label="Search"
                  >
                    <Search className="w-5 h-5" />
                  </button>
                </div>
              </form>

              {/* Mobile Navigation Links */}
              <nav className="flex flex-col gap-1.5 w-full">
                {navItems.map((item) => {
                  const isActive = item.href === '/'
                    ? (pathname === '/' || pathname === '/home')
                    : pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        'flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-semibold transition-all w-full border',
                        isActive
                          ? 'bg-gold/20 text-gold border-gold/40 font-bold shadow-md'
                          : 'text-white/90 bg-white/5 hover:bg-white/10 hover:text-gold border-transparent'
                      )}
                    >
                      <div className={cn(
                        'w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors',
                        isActive ? 'bg-gold text-[#062622]' : 'bg-white/5 text-gold'
                      )}>
                        <item.icon className="w-4 h-4" />
                      </div>
                      <span className="flex-1 text-left">{t(item.label)}</span>
                    </Link>
                  );
                })}
              </nav>

              {/* Language Switcher Button */}
              <div className="pt-2">
                <button
                  onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'ar' : 'en')}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-white/5 text-gold font-bold border border-gold/30 hover:bg-white/10 transition-all text-sm"
                >
                  <Globe className="w-4 h-4" />
                  <span>{i18n.language === 'en' ? 'Switch to العربية (AR)' : 'Switch to English (EN)'}</span>
                </button>
              </div>
            </div>

            {/* Mobile Footer info */}
            <div className="px-6 py-4 border-t border-gold/15 text-center text-[11px] text-emerald-300/60 shrink-0">
              © {new Date().getFullYear()} GIFLRI • Global Islamic Finance & Language Research Institution
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}