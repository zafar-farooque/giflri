'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const COUNTRIES = [
  { code: 'AE', name: 'UAE', flag: '🇦🇪' },
  { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦' },
  { code: 'TR', name: 'Türkiye', flag: '🇹🇷' },
  { code: 'MY', name: 'Malaysia', flag: '🇲🇾' },
  { code: 'ID', name: 'Indonesia', flag: '🇮🇩' },
  { code: 'QA', name: 'Qatar', flag: '🇶🇦' },
  { code: 'KW', name: 'Kuwait', flag: '🇰🇼' },
  { code: 'BH', name: 'Bahrain', flag: '🇧🇭' },
  { code: 'BD', name: 'Bangladesh', flag: '🇧🇩' },
  { code: 'PK', name: 'Pakistan', flag: '🇵🇰' },
  { code: 'EG', name: 'Egypt', flag: '🇪🇬' },
  { code: 'JO', name: 'Jordan', flag: '🇯🇴' },
  { code: 'LB', name: 'Lebanon', flag: '🇱🇧' },
  { code: 'OM', name: 'Oman', flag: '🇴🇲' },
  { code: 'MA', name: 'Morocco', flag: '🇲🇦' },
  { code: 'DZ', name: 'Algeria', flag: '🇩🇿' },
  { code: 'TN', name: 'Tunisia', flag: '🇹🇳' },
  { code: 'SD', name: 'Sudan', flag: '🇸🇩' },
  { code: 'SO', name: 'Somalia', flag: '🇸🇴' },
  { code: 'DJ', name: 'Djibouti', flag: '🇩🇯' },
  { code: 'KM', name: 'Comoros', flag: '🇰🇲' },
  { code: 'YE', name: 'Yemen', flag: '🇾🇪' },
  { code: 'IQ', name: 'Iraq', flag: '🇮🇶' },
  { code: 'SY', name: 'Syria', flag: '🇸🇾' },
  { code: 'PS', name: 'Palestine', flag: '🇵🇸' },
  { code: 'AF', name: 'Afghanistan', flag: '🇦🇫' },
  { code: 'IR', name: 'Iran', flag: '🇮🇷' },
  { code: 'AZ', name: 'Azerbaijan', flag: '🇦🇿' },
  { code: 'UZ', name: 'Uzbekistan', flag: '🇺🇿' },
  { code: 'KZ', name: 'Kazakhstan', flag: '🇰🇿' },
  { code: 'KG', name: 'Kyrgyzstan', flag: '🇰🇬' },
  { code: 'TJ', name: 'Tajikistan', flag: '🇹🇯' },
  { code: 'TM', name: 'Turkmenistan', flag: '🇹🇲' },
  { code: 'BN', name: 'Brunei', flag: '🇧🇳' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬' },
  { code: 'MV', name: 'Maldives', flag: '🇲🇻' },
  { code: 'LK', name: 'Sri Lanka', flag: '🇱🇰' },
  { code: 'IN', name: 'India', flag: '🇮🇳' },
  { code: 'NG', name: 'Nigeria', flag: '🇳🇬' },
  { code: 'SN', name: 'Senegal', flag: '🇸🇳' },
  { code: 'ML', name: 'Mali', flag: '🇲🇱' },
  { code: 'GN', name: 'Guinea', flag: '🇬🇳' },
  { code: 'GW', name: 'Guinea-Bissau', flag: '🇬🇼' },
  { code: 'SL', name: 'Sierra Leone', flag: '🇸🇱' },
  { code: 'LR', name: 'Liberia', flag: '🇱🇷' },
  { code: 'CI', name: "Côte d'Ivoire", flag: '🇨🇮' },
  { code: 'BF', name: 'Burkina Faso', flag: '🇧🇫' },
  { code: 'NE', name: 'Niger', flag: '🇳🇪' },
  { code: 'TD', name: 'Chad', flag: '🇹🇩' },
  { code: 'CM', name: 'Cameroon', flag: '🇨🇲' },
  { code: 'GA', name: 'Gabon', flag: '🇬🇦' },
  { code: 'UG', name: 'Uganda', flag: '🇺🇬' },
  { code: 'KE', name: 'Kenya', flag: '🇰🇪' },
  { code: 'TZ', name: 'Tanzania', flag: '🇹🇿' },
  { code: 'MU', name: 'Mauritius', flag: '🇲🇺' },
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦' },
  { code: 'GM', name: 'Gambia', flag: '🇬🇲' },
  { code: 'MR', name: 'Mauritania', flag: '🇲🇷' },
  { code: 'AL', name: 'Albania', flag: '🇦🇱' },
];

interface Particle {
  x: number;
  y: number;
  country: typeof COUNTRIES[0];
  ring: 1 | 2;
  delay: number;
  scale: number;
  alpha: number;
  rotation: number;
  rotationSpeed: number;
  corner: number;
  orbitAngle: number;
}

interface Star {
  x: number;
  y: number;
  size: number;
  alpha: number;
  blinkSpeed: number;
}

export interface OpeningExperienceProps {
  onComplete?: () => void;
  onSkip?: () => void;
  forcePlay?: boolean;
  disableStorage?: boolean;
}

export function OpeningExperience({
  onComplete,
  forcePlay = false,
  disableStorage = false,
}: OpeningExperienceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<'loading' | 'emerging' | 'orbiting' | 'fadeout' | 'complete'>(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('intro') === 'true' || urlParams.get('opening') === 'true' || forcePlay) {
        return 'loading';
      }
      if (!disableStorage && sessionStorage.getItem('giflri_intro_seen') === 'true') {
        return 'complete';
      }
    }
    return 'loading';
  });

  const [progressPercent, setProgressPercent] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mounted, setMounted] = useState(false);
  const particlesRef = useRef<Particle[]>([]);
  const starsRef = useRef<Star[]>([]);
  const animationRef = useRef<number>();
  const startTimeRef = useRef<number>(0);
  const flagImagesRef = useRef<{ [code: string]: HTMLImageElement }>({});

  const phaseRef = useRef(phase);
  phaseRef.current = phase;

  useEffect(() => {
    setMounted(true);
    const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
    const isForce = forcePlay || urlParams?.get('intro') === 'true' || urlParams?.get('opening') === 'true';

    if (!isForce && !disableStorage && typeof window !== 'undefined' && sessionStorage.getItem('giflri_intro_seen') === 'true') {
      setPhase('complete');
      if (onComplete) onComplete();
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [onComplete, forcePlay, disableStorage]);

  useEffect(() => {
    if (reducedMotion || phaseRef.current === 'complete') {
      setPhase('complete');
      if (onComplete) onComplete();
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    const centerX = width / 2;
    const centerY = height / 2;

    // Background stardust generator
    starsRef.current = Array.from({ length: 75 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 0.6,
      alpha: Math.random() * 0.75 + 0.25,
      blinkSpeed: Math.random() * 0.003 + 0.001,
    }));

    // Split 59 Sovereign Nations into 2 concentric rings:
    // Inner Ring: 26 nations, Outer Ring: 33 nations
    const createParticles = () => {
      const activeCountries = COUNTRIES.slice(0, 59);
      const innerCount = 26;

      particlesRef.current = activeCountries.map((country, i) => {
        const isInner = i < innerCount;
        const ring = (isInner ? 1 : 2) as 1 | 2;
        const ringIndex = isInner ? i : i - innerCount;
        const totalInRing = isInner ? innerCount : 59 - innerCount;
        const orbitAngle = (ringIndex / totalInRing) * 2 * Math.PI;

        const corner = Math.floor(i / 15);
        const indexInCorner = i % 15;

        return {
          x: 0,
          y: 0,
          country,
          ring,
          delay: indexInCorner * 40,
          scale: 1,
          alpha: 0,
          rotation: 0,
          rotationSpeed: (Math.random() - 0.5) * 0.4,
          corner,
          orbitAngle,
        };
      });
    };

    createParticles();
    startTimeRef.current = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTimeRef.current;
      ctx.clearRect(0, 0, width, height);

      // Base radius calculation with responsive scaling
      const isMobile = width < 640;
      const isTablet = width < 1024 && width >= 640;

      // Inner and Outer Orbit Radii (well clear of the central medallion!)
      const R1 = isMobile
        ? Math.max(150, Math.min(width * 0.38, 175))
        : isTablet
          ? Math.max(200, Math.min(height * 0.32, 240))
          : Math.max(230, Math.min(Math.min(width, height) * 0.32, 280));

      const R2 = isMobile
        ? Math.max(195, Math.min(width * 0.47, 225))
        : isTablet
          ? Math.max(265, Math.min(height * 0.42, 320))
          : Math.max(310, Math.min(Math.min(width, height) * 0.44, 385));

      const speed1 = 0.00035; // Inner ring clockwise
      const speed2 = -0.00028; // Outer ring counter-clockwise for celestial counter-rotation

      const emergenceDuration = 1300;
      const maxDelay = 14 * 40; // 560ms
      const orbitingStart = maxDelay + emergenceDuration; // ~1860ms
      const orbitingDuration = 2700;
      const fadeoutStart = orbitingStart + orbitingDuration; // ~4560ms
      const fadeoutDuration = 800;
      const totalDuration = fadeoutStart + fadeoutDuration; // ~5360ms total

      // Update progress bar
      const currentProgress = Math.min(Math.round((elapsed / totalDuration) * 100), 100);
      setProgressPercent(currentProgress);

      // Draw starry ambient universe
      starsRef.current.forEach((star) => {
        const flicker = Math.sin(now * star.blinkSpeed) * 0.35 + 0.65;
        ctx.fillStyle = `rgba(212, 175, 55, ${star.alpha * flicker * 0.45})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Update State Machine
      if (phaseRef.current === 'loading') {
        setPhase('emerging');
      } else if (phaseRef.current === 'emerging' && elapsed >= orbitingStart) {
        setPhase('orbiting');
      } else if (phaseRef.current === 'orbiting' && elapsed >= fadeoutStart) {
        setPhase('fadeout');
      } else if (phaseRef.current === 'fadeout' && elapsed >= totalDuration) {
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('giflri_intro_seen', 'true');
        }
        setPhase('complete');
        if (onComplete) {
          onComplete();
        }
        return;
      }

      // Draw Orbit Trajectory Rings with Sacred Gold Shimmer
      if (elapsed > 300 && phaseRef.current !== 'fadeout') {
        ctx.save();
        // Inner Orbit Ring
        ctx.beginPath();
        ctx.arc(centerX, centerY, R1, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(212, 175, 55, 0.22)';
        ctx.lineWidth = 1.2;
        ctx.setLineDash([6, 8]);
        ctx.stroke();

        // Outer Orbit Ring
        ctx.beginPath();
        ctx.arc(centerX, centerY, R2, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(212, 175, 55, 0.16)';
        ctx.lineWidth = 1.2;
        ctx.setLineDash([4, 10]);
        ctx.stroke();
        ctx.restore();
      }

      particlesRef.current.forEach((p) => {
        if (elapsed < p.delay) return;

        const localTime = elapsed - p.delay;
        const R = p.ring === 1 ? R1 : R2;
        const orbitSpeed = p.ring === 1 ? speed1 : speed2;

        let startX = -80, startY = -80;
        if (p.corner === 1) { startX = width + 80; startY = -80; }
        else if (p.corner === 2) { startX = -80; startY = height + 80; }
        else if (p.corner === 3) { startX = width + 80; startY = height + 80; }

        if (elapsed < orbitingStart) {
          const progress = Math.min(localTime / emergenceDuration, 1);
          const ease = 1 - Math.pow(1 - progress, 4);

          const angleOffset = (1 - ease) * Math.PI * 0.65;
          const currentAngle = p.orbitAngle + angleOffset;

          const targetX = centerX + Math.cos(currentAngle) * R;
          const targetY = centerY + Math.sin(currentAngle) * R;

          p.x = startX + (targetX - startX) * ease;
          p.y = startY + (targetY - startY) * ease;
          p.alpha = ease;
          p.scale = (0.4 + 0.6 * ease) * (isMobile ? 0.8 : 1);
          p.rotation = (1 - ease) * 120 + Math.sin(elapsed * 0.002) * 4;
        } else if (elapsed < fadeoutStart) {
          const orbitTime = elapsed - orbitingStart;
          const currentAngle = p.orbitAngle + orbitTime * orbitSpeed;

          p.x = centerX + Math.cos(currentAngle) * R;
          p.y = centerY + Math.sin(currentAngle) * R;
          p.alpha = 1;
          p.scale = 1 * (isMobile ? 0.82 : 1);
          p.rotation = Math.sin(elapsed * 0.002 + p.orbitAngle) * 6;
        } else {
          const fadeoutTime = elapsed - fadeoutStart;
          const progress = Math.min(fadeoutTime / fadeoutDuration, 1);
          const ease = progress * progress;

          const spinOffset = ease * 1.2;
          const orbitTime = elapsed - orbitingStart;
          const currentAngle = p.orbitAngle + orbitTime * orbitSpeed + spinOffset;
          const expandedR = R * (1 + ease * 0.45);

          p.x = centerX + Math.cos(currentAngle) * expandedR;
          p.y = centerY + Math.sin(currentAngle) * expandedR;
          p.alpha = 1 - progress;
          p.scale = (1 - progress) * (isMobile ? 0.82 : 1);
          p.rotation = Math.sin(elapsed * 0.002) * 6 + ease * 90;
        }

        // Draw crisp, beautiful country flag badge
        if (p.alpha > 0) {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.scale(p.scale, p.scale);
          ctx.globalAlpha = p.alpha;

          const flagW = isMobile ? 32 : 42;
          const flagH = isMobile ? 22 : 28;
          const radius = 4;

          // Flag Image loading
          let img = flagImagesRef.current[p.country.code];
          if (!img) {
            img = new Image();
            img.src = `https://flagcdn.com/w80/${p.country.code.toLowerCase()}.png`;
            flagImagesRef.current[p.country.code] = img;
          }

          // Draw Glowing Gold Card / Badge Background
          ctx.shadowColor = 'rgba(212, 175, 55, 0.55)';
          ctx.shadowBlur = 10;
          ctx.shadowOffsetY = 2;
          ctx.shadowOffsetX = 0;

          // Clip flag to rounded rectangle
          ctx.beginPath();
          ctx.roundRect(-flagW / 2, -flagH / 2, flagW, flagH, radius);
          ctx.fillStyle = '#062622';
          ctx.fill();

          if (img.complete && img.naturalWidth !== 0) {
            ctx.save();
            ctx.clip();
            ctx.drawImage(img, -flagW / 2, -flagH / 2, flagW, flagH);
            ctx.restore();
          } else {
            ctx.font = `700 ${isMobile ? 18 : 22}px "Noto Color Emoji", "Apple Color Emoji", sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(p.country.flag, 0, 0);
          }

          // Gold Border Stroke around flag
          ctx.shadowBlur = 0;
          ctx.strokeStyle = 'rgba(212, 175, 55, 0.75)';
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.roundRect(-flagW / 2, -flagH / 2, flagW, flagH, radius);
          ctx.stroke();

          ctx.restore();
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current !== undefined) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', resize);
    };
  }, [reducedMotion, mounted, onComplete, forcePlay, disableStorage]);

  if (!mounted || reducedMotion) {
    return null;
  }

  return (
    <AnimatePresence>
      {phase !== 'complete' && (
        <motion.div
          key="opening-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(16px)', scale: 1.03 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-b from-[#02100E] via-[#041A17] to-[#010908] overflow-hidden"
          role="presentation"
          aria-hidden="true"
        >
          {/* Subtle Islamic Sacred Geometry Radial Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.12)_0%,transparent_70%)] pointer-events-none" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold/10 rounded-full blur-[140px] pointer-events-none" />

          {/* Interactive Canvas for 59 Nations Orbit */}
          <canvas ref={canvasRef} className="w-full h-full relative z-10" aria-hidden="true" />

          {/* Central Sacred Revelatory Rosette (Compact & Perfectly Proportioned) */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 pointer-events-none z-20">
            <AnimatePresence mode="wait">
              {phase === 'orbiting' && (
                <motion.div
                  key="iqra"
                  className="relative flex flex-col items-center justify-center text-center rounded-full aspect-square p-5 sm:p-7 md:p-8 w-[210px] h-[210px] sm:w-[250px] sm:h-[250px] md:w-[290px] md:h-[290px]"
                  initial={{ opacity: 0, scale: 0.3, rotate: -180, filter: 'blur(20px)' }}
                  animate={{ opacity: 1, scale: 1, rotate: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 1.35, rotate: 30, filter: 'blur(20px)' }}
                  transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    background: 'radial-gradient(circle, rgba(6, 38, 34, 0.92) 0%, rgba(2, 16, 14, 0.98) 80%)',
                    boxShadow: '0 0 50px rgba(212, 175, 55, 0.3), inset 0 0 30px rgba(212, 175, 55, 0.15)',
                    border: '1.5px solid rgba(212, 175, 55, 0.45)',
                    backdropFilter: 'blur(24px)',
                  }}
                >
                  {/* Concentric Rotating Sacred Star & Geometric Rings */}
                  <motion.div
                    className="absolute inset-0 rounded-full border border-dashed border-gold/35"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                  />
                  <motion.div
                    className="absolute inset-2.5 sm:inset-3 rounded-full border border-gold/20 border-t-transparent border-b-transparent"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                  />

                  {/* Text Content */}
                  <div className="relative z-10 flex flex-col items-center gap-1 sm:gap-2 px-1">
                    {/* Sacred Quranic Bismillah Ribbon */}
                    <span className="text-[9px] sm:text-[10px] font-arabic text-gold/85 tracking-widest leading-none select-none">
                      بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                    </span>

                    {/* Divine Arabic Word: IQRA */}
                    <div
                      className="font-arabic text-4xl sm:text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-gold to-yellow-400 tracking-widest leading-none select-none my-0.5"
                      style={{
                        filter: 'drop-shadow(0 0 20px rgba(212, 175, 55, 0.75))',
                      }}
                    >
                      إِقْرَأْ
                    </div>

                    {/* Latin Typography */}
                    <div
                      className="font-heading text-sm sm:text-lg md:text-xl font-extrabold text-white tracking-[0.35em] uppercase select-none leading-none"
                      style={{ textShadow: '0 0 15px rgba(255, 255, 255, 0.35)' }}
                    >
                      IQRA
                    </div>

                    {/* Core Heritage Pillars Flags Strip */}
                    <div className="flex items-center justify-center gap-1 sm:gap-1.5 my-0.5 opacity-95 scale-85 sm:scale-95">
                      <img src="https://flagcdn.com/w40/ae.png" alt="UAE" className="w-3.5 sm:w-4 h-2.5 object-cover rounded shadow-sm border border-white/20" />
                      <span className="w-1.5 sm:w-2 h-[1px] bg-gold/40" />
                      <img src="https://flagcdn.com/w40/sa.png" alt="Saudi Arabia" className="w-3.5 sm:w-4 h-2.5 object-cover rounded shadow-sm border border-white/20" />
                      <span className="w-1.5 sm:w-2 h-[1px] bg-gold/40" />
                      <img src="https://flagcdn.com/w40/my.png" alt="Malaysia" className="w-3.5 sm:w-4 h-2.5 object-cover rounded shadow-sm border border-white/20" />
                      <span className="w-1.5 sm:w-2 h-[1px] bg-gold/40" />
                      <img src="https://flagcdn.com/w40/tr.png" alt="Turkey" className="w-3.5 sm:w-4 h-2.5 object-cover rounded shadow-sm border border-white/20" />
                      <span className="w-1.5 sm:w-2 h-[1px] bg-gold/40" />
                      <img src="https://flagcdn.com/w40/id.png" alt="Indonesia" className="w-3.5 sm:w-4 h-2.5 object-cover rounded shadow-sm border border-white/20" />
                    </div>

                    {/* Subtitle / Tenet */}
                    <div className="text-[8px] sm:text-[9px] md:text-[10px] text-emerald-200/80 tracking-[0.2em] uppercase font-bold max-w-[200px] sm:max-w-xs mx-auto leading-tight">
                      59 Sovereign Member States
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Luxury Automatic Light-Beam Progress Indicator (Bottom) */}
          <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 pointer-events-none w-60 sm:w-72">
            <div className="flex items-center justify-between w-full text-[9px] sm:text-[10px] font-mono tracking-widest text-gold/85 font-bold uppercase">
              <span>Entering Global Portal</span>
              <span>{progressPercent}%</span>
            </div>
            {/* Progress Track */}
            <div className="w-full h-1 sm:h-1.5 rounded-full bg-white/10 overflow-hidden backdrop-blur-md p-0.5 border border-gold/25">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-amber-400 via-gold to-yellow-300 shadow-[0_0_12px_rgba(212,175,55,0.85)]"
                style={{ width: `${progressPercent}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default OpeningExperience;
