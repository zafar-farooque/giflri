'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollTop / docHeight;
      setProgress(scrollPercent);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 z-50 bg-primary/10 dark:bg-primary/20"
      style={{ transformOrigin: 'left center' }}
      animate={{ scaleX: progress }}
      transition={{ duration: 0.1, ease: 'linear' }}
      aria-hidden="true"
    />
  );
}