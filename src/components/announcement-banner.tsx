'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, X } from 'lucide-react';
import { AnnouncementBanner } from '@/types';

export function GlobalAnnouncementBanner() {
  const [announcement, setAnnouncement] = useState<AnnouncementBanner | null>(null);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch('/api/admin/settings');
        const data = await res.json();
        if (data.success && data.data?.announcement?.enabled) {
          setAnnouncement(data.data.announcement);
        }
      } catch (err) {
        // silent fallback
      }
    }
    loadSettings();
  }, []);

  if (!announcement || !announcement.enabled || closed) {
    return null;
  }

  return (
    <div className="w-full bg-gradient-to-r from-[#062622] via-[#0D443E] to-[#062622] text-ivory text-xs sm:text-[13px] py-2 px-3 sm:px-6 border-b border-gold/30 shadow-md">
      <div className="container mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 sm:gap-3 mx-auto text-center flex-wrap justify-center py-0.5">
          {announcement.badge && (
            <span className="bg-gradient-to-r from-gold to-gold-light text-primary-dark font-extrabold uppercase text-[10px] tracking-wider px-2.5 py-0.5 rounded-full shadow-sm shrink-0 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              {announcement.badge}
            </span>
          )}
          <span className="font-medium text-white/95 leading-normal">
            {announcement.text}
          </span>
          {announcement.link && (
            <Link
              href={announcement.link}
              className="inline-flex items-center gap-1 font-bold text-gold hover:text-gold-light hover:underline ml-1 shrink-0 group transition-colors"
            >
              <span>Learn More</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          )}
        </div>
        <button
          onClick={() => setClosed(true)}
          className="p-1 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors shrink-0"
          aria-label="Dismiss banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
