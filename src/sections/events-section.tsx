import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from '@/components/ui/link';
import { cn } from '@/lib/utils';
import {
  Calendar,
  MapPin,
  UserCheck,
  Tag,
  Video,
  FileText,
  ChevronRight,
  Star,
  Award,
  RefreshCw,
  CheckCircle,
} from 'lucide-react';
import { EventItem } from '@/types';
import { initialEvents } from '@/data/seedData';
import { EventRegistrationModal } from '@/components/event-registration-modal';

export function EventsSection() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'speakers' | 'archive'>('upcoming');
  const [events, setEvents] = useState<EventItem[]>(() => initialEvents);
  const [loading, setLoading] = useState(false);
  const [registeredId, setRegisteredId] = useState<string | number | null>(null);
  const [selectedEventForModal, setSelectedEventForModal] = useState<EventItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchEvents = async () => {
    try {
      const res = await fetch('/api/events');
      const data = await res.json();
      if (data.success && data.data?.length) {
        setEvents(data.data);
      }
    } catch (err) {
      console.error('Failed to load events:', err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const openRegistrationModal = (event: EventItem) => {
    setSelectedEventForModal(event);
    setIsModalOpen(true);
  };

  const upcomingEvents = events.filter((e) => e.status !== 'Completed');
  const pastEvents = events.filter((e) => e.status === 'Completed');
  const allSpeakers = events
    .flatMap((e) => e.speakersList || [])
    .filter((s, i, arr) => arr.findIndex((x) => x.name === s.name) === i);

  return (
    <section className="section bg-gradient-to-b from-[#0A3D36] via-[#08332E] to-[#062622] text-ivory relative overflow-hidden border-b border-primary/20" aria-labelledby="events-title">
      {/* Background Decorative Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" aria-hidden="true">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="events-islamic-pattern" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 80 40 L 40 80 L 0 40 Z" fill="none" stroke="currentColor" strokeWidth="1" />
              <circle cx="40" cy="40" r="16" fill="none" stroke="currentColor" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#events-islamic-pattern)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <span className="section-eyebrow">{t('events.engagement')}</span>
          <h2 id="events-title" className="section-title">{t('events.title')}</h2>
          <p className="section-subtitle">{t('events.subtitle')}</p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          className="flex flex-wrap gap-3 justify-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {[
            { id: 'upcoming', label: 'events.upcoming', icon: Calendar, count: upcomingEvents.length },
            { id: 'speakers', label: 'events.speakers', icon: UserCheck, count: allSpeakers.length },
            { id: 'archive', label: 'events.archive', icon: FileText, count: pastEvents.length },
          ].map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                'px-6 py-3 rounded-xl font-bold transition-all duration-300 flex items-center gap-2 text-sm',
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-[#B48A1B] via-[#CF9E20] to-[#B48A1B] text-[#062622] shadow-lg shadow-gold/20'
                  : 'bg-white/[0.05] text-ivory/80 hover:bg-white/[0.1] border border-white/10'
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <tab.icon className="w-5 h-5" />
              {t(tab.label)}
              <span className={cn(
                'px-2 py-0.5 text-xs rounded-full font-bold',
                activeTab === tab.id ? 'bg-[#062622]/20 text-[#062622]' : 'bg-gold/15 text-gold'
              )}>{tab.count}</span>
            </motion.button>
          ))}
        </motion.div>

        {loading && (
          <div className="flex justify-center py-12">
            <RefreshCw className="w-8 h-8 text-gold animate-spin" />
          </div>
        )}

        {/* Tab Content */}
        {!loading && (
          <AnimatePresence mode="wait">
            {activeTab === 'upcoming' && (
              <motion.div
                key="upcoming"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {upcomingEvents.map((event, index) => (
                    <motion.article
                      key={event.id}
                      className="group relative overflow-hidden rounded-2xl bg-white/[0.04] border border-white/10 hover:border-gold/40 shadow-lg transition-all duration-300 backdrop-blur-md flex flex-col justify-between"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.08 }}
                      whileHover={{ y: -6 }}
                    >
                      <div className="relative h-44 overflow-hidden bg-[#062622]">
                        {event.image && (
                          <img
                            src={event.image}
                            alt={event.title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/40 pointer-events-none" />

                        <div className="absolute top-4 left-4 z-10">
                          <span className="px-3 py-1 rounded-full bg-[#062622]/90 backdrop-blur-sm text-gold text-xs font-bold uppercase shadow-sm border border-gold/30">
                            {event.type}
                          </span>
                        </div>
                        <div className="absolute top-4 right-4 z-10">
                          <span
                            className={cn(
                              'px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm border shadow-sm',
                              event.status === 'Upcoming'
                                ? 'bg-primary/90 text-white border-white/20'
                                : event.status === 'Open for Registration'
                                ? 'bg-emerald-700/90 text-white border-emerald-500/30'
                                : 'bg-amber-600/90 text-white border-amber-500/30'
                            )}
                          >
                            {event.status}
                          </span>
                        </div>
                      </div>

                      <div className="p-6 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <Tag className="w-3.5 h-3.5 text-gold" />
                            <time className="text-xs text-gold/90 font-semibold" dateTime={event.date}>
                              {new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                              {event.endDate && ` – ${new Date(event.endDate).toLocaleDateString('en-US', { day: 'numeric' })}`}
                            </time>
                          </div>

                          <h3 className="font-heading text-heading-md font-bold text-white group-hover:text-gold transition-colors mb-2 line-clamp-2">
                            {event.title}
                          </h3>

                          <p className="text-ivory/70 text-xs mb-4 line-clamp-3 leading-relaxed font-normal">
                            {event.desc}
                          </p>

                          <div className="flex flex-wrap items-center gap-4 text-xs text-ivory/60 mb-4">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-gold" /> {event.city}, {event.country}
                            </span>
                            <span className="flex items-center gap-1">
                              <UserCheck className="w-3 h-3 text-gold" /> {event.speakers} Speakers
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-white/10">
                          <span className="text-xs font-semibold text-ivory/60">
                            {event.attendeesCount || 0} Registered
                          </span>

                          <button
                            onClick={() => openRegistrationModal(event)}
                            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#B48A1B] via-[#CF9E20] to-[#B48A1B] text-[#062622] font-bold text-xs shadow-md hover:brightness-110 transition-all flex items-center gap-1.5"
                          >
                            {registeredId === event.id ? (
                              <><CheckCircle className="w-3.5 h-3.5 text-[#062622]" /> Registered!</>
                            ) : (
                              'Register Seat'
                            )}
                          </button>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'speakers' && (
              <motion.div key="speakers" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {allSpeakers.map((speaker) => (
                    <div key={speaker.name} className="p-6 text-center group rounded-2xl bg-white/[0.04] border border-white/10 hover:border-gold/40 backdrop-blur-md shadow-lg transition-all duration-300">
                      <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-[#B48A1B] to-[#CF9E20] text-[#062622] flex items-center justify-center font-heading text-xl font-bold shadow-md">
                        {speaker.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}
                      </div>
                      <h4 className="font-heading text-heading-sm font-bold text-white">{speaker.name}</h4>
                      <p className="text-gold text-xs font-semibold mt-1">{speaker.role}</p>
                      <p className="text-ivory/60 text-xs mt-1"><MapPin className="w-3 h-3 inline text-gold" /> {speaker.country}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'archive' && (
              <motion.div key="archive" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pastEvents.map((event) => (
                    <div key={event.id} className="p-6 space-y-3 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-gold/40 backdrop-blur-md shadow-lg transition-all duration-300">
                      <span className="px-2.5 py-0.5 rounded-full bg-gold/15 text-gold border border-gold/30 text-xs font-bold">
                        Completed Conference
                      </span>
                      <h4 className="font-heading text-base font-bold text-white">{event.title}</h4>
                      <p className="text-xs text-ivory/60"><MapPin className="w-3 h-3 inline text-gold" /> {event.city}, {event.country} • {event.date}</p>
                      <div className="flex items-center gap-3 pt-3 border-t border-white/10 text-xs text-gold font-semibold">
                        <span className="flex items-center gap-1"><Video className="w-3.5 h-3.5" /> Recording</span>
                        <span>•</span>
                        <span className="flex items-center gap-1"><FileText className="w-3.5 h-3.5" /> Proceedings</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}

        {/* Interactive Event Registration Modal with Database Persistence */}
        <EventRegistrationModal
          isOpen={isModalOpen}
          event={selectedEventForModal}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedEventForModal(null);
          }}
          onSuccess={(eventId) => {
            setRegisteredId(eventId);
            setEvents(events.map((e) => (e.id === eventId ? { ...e, attendeesCount: (e.attendeesCount || 0) + 1 } : e)));
          }}
        />
      </div>
    </section>
  );
}