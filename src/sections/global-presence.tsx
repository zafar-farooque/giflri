'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip, useMap } from 'react-leaflet';
import {
  X,
  Building2,
  BookOpen,
  Users,
  Globe,
  CheckCircle,
  ExternalLink,
  Shield,
  Search,
  RotateCcw,
  Sparkles,
  MapPin,
  Compass,
  Layers,
  GraduationCap,
} from 'lucide-react';
import { useWebsiteContent } from '@/hooks/use-website-content';
import 'leaflet/dist/leaflet.css';

interface CountryItem {
  country: string;
  code: string;
  region: 'GCC & Middle East' | 'Asia-Pacific' | 'Africa' | 'Europe & Americas';
  lat: number;
  lng: number;
  institutions: number;
  programs: number;
  experts: number;
  students: number;
}

const mapData: CountryItem[] = [
  { country: 'UAE', code: 'AE', region: 'GCC & Middle East', lat: 23.4241, lng: 53.8478, institutions: 12, programs: 45, experts: 28, students: 3200 },
  { country: 'Saudi Arabia', code: 'SA', region: 'GCC & Middle East', lat: 23.8859, lng: 45.0792, institutions: 18, programs: 67, experts: 42, students: 5100 },
  { country: 'Türkiye', code: 'TR', region: 'Europe & Americas', lat: 38.9637, lng: 35.2433, institutions: 15, programs: 52, experts: 35, students: 4300 },
  { country: 'Malaysia', code: 'MY', region: 'Asia-Pacific', lat: 4.2105, lng: 101.9758, institutions: 22, programs: 78, experts: 48, students: 6200 },
  { country: 'Indonesia', code: 'ID', region: 'Asia-Pacific', lat: -0.7893, lng: 113.9213, institutions: 28, programs: 95, experts: 55, students: 8500 },
  { country: 'Qatar', code: 'QA', region: 'GCC & Middle East', lat: 25.3548, lng: 51.1839, institutions: 8, programs: 32, experts: 22, students: 1800 },
  { country: 'Kuwait', code: 'KW', region: 'GCC & Middle East', lat: 29.3117, lng: 47.4818, institutions: 6, programs: 24, experts: 18, students: 1200 },
  { country: 'Bahrain', code: 'BH', region: 'GCC & Middle East', lat: 25.9304, lng: 50.6378, institutions: 5, programs: 18, experts: 14, students: 900 },
  { country: 'Bangladesh', code: 'BD', region: 'Asia-Pacific', lat: 23.6850, lng: 90.3563, institutions: 12, programs: 48, experts: 30, students: 3800 },
  { country: 'Pakistan', code: 'PK', region: 'Asia-Pacific', lat: 30.3753, lng: 69.3451, institutions: 15, programs: 58, experts: 38, students: 4500 },
  { country: 'Egypt', code: 'EG', region: 'GCC & Middle East', lat: 26.8206, lng: 30.8025, institutions: 14, programs: 55, experts: 36, students: 4100 },
  { country: 'Jordan', code: 'JO', region: 'GCC & Middle East', lat: 31.9454, lng: 35.9284, institutions: 8, programs: 28, experts: 20, students: 1600 },
  { country: 'Morocco', code: 'MA', region: 'Africa', lat: 31.7917, lng: -7.0926, institutions: 9, programs: 34, experts: 22, students: 1900 },
  { country: 'India', code: 'IN', region: 'Asia-Pacific', lat: 20.5937, lng: 78.9629, institutions: 25, programs: 85, experts: 52, students: 7200 },
  { country: 'Nigeria', code: 'NG', region: 'Africa', lat: 9.0820, lng: 8.6753, institutions: 11, programs: 38, experts: 25, students: 2800 },
  { country: 'South Africa', code: 'ZA', region: 'Africa', lat: -30.5595, lng: 22.9375, institutions: 7, programs: 22, experts: 16, students: 1100 },
  { country: 'UK', code: 'GB', region: 'Europe & Americas', lat: 55.3781, lng: -3.4360, institutions: 6, programs: 20, experts: 18, students: 1400 },
  { country: 'USA', code: 'US', region: 'Europe & Americas', lat: 37.0902, lng: -95.7129, institutions: 8, programs: 26, experts: 22, students: 1800 },
  { country: 'Canada', code: 'CA', region: 'Europe & Americas', lat: 56.1304, lng: -106.3468, institutions: 5, programs: 18, experts: 14, students: 1200 },
  { country: 'Australia', code: 'AU', region: 'Asia-Pacific', lat: -25.2744, lng: 133.7751, institutions: 4, programs: 14, experts: 10, students: 800 },
];

interface CountryRichDetails {
  focusArea: string;
  partners: string[];
  projects: string[];
  milestone: string;
  lead: string;
}

function getCountryRichDetails(code: string): CountryRichDetails {
  const c = code.toUpperCase();
  if (c === 'AE') {
    return {
      focusArea: 'Islamic Fintech Hub, Digital Sukuk tokenization protocols, sovereign wealth optimization, and Shariah AI governance models.',
      partners: ['Dubai Islamic Economy Development Centre', 'Zayed University Research Wing', 'GIFLRI UAE Innovation Hub'],
      projects: ['Blockchain Smart Contracts for Sukuks', 'Ethical AI Chatbots for Islamic Banking', 'Shariah-compliant Crowdfunding Standards'],
      milestone: 'Accredited 12 institutional centers; certified 3,200+ practitioners in 2026.',
      lead: 'Dr. Ahmed Al-Mansoori (Regional Shariah Board Chairman)',
    };
  }
  if (c === 'SA') {
    return {
      focusArea: 'Mega Shariah-compliant capital funds, Sovereign Sukuk indexation, classical Arabic lexicography, and digital manuscript preservation.',
      partners: ['Islamic University of Madinah', 'King Abdulaziz University Islamic Economics Department', 'GIFLRI Riyadh Centre'],
      projects: ['Ancient Shariah Manuscript Digital Archivist', 'Global Sukuk Liquidity Indexing', 'Saudi Vision 2030 Ethical Economy Alignment'],
      milestone: 'Co-published 67 research papers and standardized 18 postgraduate Islamic Finance curricula.',
      lead: 'Prof. Khalid Al-Faisal (Shariah & Jurisprudence Lead)',
    };
  }
  if (c === 'MY') {
    return {
      focusArea: 'Global Halal standard compliance registry, Green Sukuk sustainability taxonomy, and digital Islamic banking policies.',
      partners: ['International Islamic University Malaysia (IIUM)', 'INCEIF University', 'Islamic Banking & Finance Institute Malaysia'],
      projects: ['Global Halal Supply Chain Verification Ledger', 'Green Sukuk Sustainable Investment Standard', 'Digital Takaful Solvency Sandbox'],
      milestone: 'Evaluated and verified 78 master degree modules with 48 senior Malaysian fellows.',
      lead: "Dato' Dr. Mohd Daud Bakar (Senior Academic Coordinator)",
    };
  }
  if (c === 'EG') {
    return {
      focusArea: 'Arabic lexicography, Quranic linguistics, classical fiqh manuscripts, and ethical microfinance governance.',
      partners: ['Al-Azhar University Faculty of Languages', 'Cairo University Centre for Islamic Studies', 'Egypt Islamic Finance Association'],
      projects: ['Arabic Language Digital Corpus Project', 'Micro-Takaful for Rural Egyptian Farmers', 'Interactive Quranic NLP Semantics Graph'],
      milestone: 'Constructed an open-source Arabic NLP corpus containing 40M+ words and 5 collaborative symposiums.',
      lead: 'Sheikh Dr. Yusuf Al-Tayyib (Arabic & Shariah Advisory Chair)',
    };
  }
  if (c === 'TR') {
    return {
      focusArea: 'Alternative participation banking models, Ottoman Shariah archives translation, and Turkish-Arabic terminology standards.',
      partners: ['Istanbul Sabahattin Zaim University', 'Marmara University Faculty of Theology', 'GIFLRI Turkey Office'],
      projects: ['Participation Banking Risk Sharing Analytics', 'Bilingual Turkish-Arabic Terminology Standard', 'Ottoman Shariah Archives Digitization'],
      milestone: 'Integrated 15 partner universities; trained 4,300+ students in participation finance.',
      lead: 'Dr. Mehmet Selim (Regional Coordinator for Alternative Banking)',
    };
  }
  if (c === 'QA') {
    return {
      focusArea: 'Sovereign Sukuk market liquidity, Islamic ESG investment models, and bilingual Shariah finance journals.',
      partners: ['Hamad Bin Khalifa University', 'Qatar Islamic Finance Center', 'GIFLRI Doha Hub'],
      projects: ['Shariah-compliant ESG Screening Engines', 'Qatar National Sukuk Liquidity Analytics', 'Arabic-English Financial Lexicon'],
      milestone: 'Hosted the Global Islamic ESG Summit 2026, launching 32 certified programs.',
      lead: 'Dr. Fatima Ibrahim (Advisory Panel Lead)',
    };
  }
  if (c === 'ID') {
    return {
      focusArea: 'Community-based Waqf and Zakat digital management, SE Asia Arabic learning hubs, and halal tourism standards.',
      partners: ['Syarif Hidayatullah State Islamic University Jakarta', 'Universitas Islam Indonesia', 'National Committee for Islamic Economy and Finance (KNEKS)'],
      projects: ['Digital Waqf Asset Tokenization System', 'Indonesia Halal Tourism Certification Engine', 'Bilingual Arabic Pedagogy for SE Asia'],
      milestone: 'Enabled real-time Waqf digital audit for 28 institutions, serving 8,500+ students.',
      lead: 'Prof. Bambang Prasetyo (Regional Waqf & Advisory Lead)',
    };
  }
  if (c === 'PK') {
    return {
      focusArea: 'National interest-free banking conversion frameworks, Urdu-Arabic linguistic research, and agricultural Salam financing.',
      partners: ['International Islamic University Islamabad', 'State Bank of Pakistan Shariah Board', 'GIFLRI Karachi Center'],
      projects: ['Interest-Free Banking Conversion Toolkit', 'Urdu-Arabic NLP Translation Benchmark', 'Agricultural Salam Contracts Digital Ledger'],
      milestone: 'Assisted 15 universities in standardizing Islamic banking curricula with 38 scholars.',
      lead: 'Mufti Muhammad Rizwan (Shariah Conversion Lead)',
    };
  }
  if (c === 'IN') {
    return {
      focusArea: 'Non-banking financial company (NBFC) Shariah standards, classical Arabic academic heritage preservation, and distance learning.',
      partners: ['Aligarh Muslim University', 'Jamia Millia Islamia', 'GIFLRI India Research Network'],
      projects: ['Ethical NBFC Asset Allocation Software', 'Bilingual Sanskrit-Arabic Historical Linguistics Project', 'Digital Library for Indian Scholars'],
      milestone: 'Enrolled 7,200+ students across distance learning and bilingual program formats.',
      lead: 'Dr. Farhan Qureshi (Heritage & Finance Advisory)',
    };
  }
  return {
    focusArea: 'Cross-border educational standards, Shariah-compliant research collaborations, and Arabic cultural exchange.',
    partners: ['Regional Ministries of Higher Education', 'Local Shariah Advisory Boards', 'GIFLRI Global Network Partner Schools'],
    projects: ['International Student Credit Transfer Protocol', 'Bilingual Higher Education Standards Framework', 'Shariah-compliant Institutional Best Practices'],
    milestone: 'Established institutional presence supporting experts, active students, and standardized program structures.',
    lead: 'GIFLRI Global Academic Registry',
  };
}

// Controller component to reliably auto-resize and navigate Leaflet
function MapController({
  selectedCountry,
  mapCenter,
  mapZoom,
}: {
  selectedCountry: CountryItem | null;
  mapCenter: [number, number];
  mapZoom: number;
}) {
  const map = useMap();

  useEffect(() => {
    const handleResize = () => {
      try {
        map.invalidateSize();
      } catch (e) {
        // ignore
      }
    };

    // Staggered invalidateSize calls to ensure map tiles populate after CSS animations
    handleResize();
    const t1 = setTimeout(handleResize, 100);
    const t2 = setTimeout(handleResize, 400);
    const t3 = setTimeout(handleResize, 900);
    const t4 = setTimeout(handleResize, 1800);

    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      window.removeEventListener('resize', handleResize);
    };
  }, [map]);

  useEffect(() => {
    if (selectedCountry) {
      map.flyTo([selectedCountry.lat, selectedCountry.lng], 5, {
        duration: 1.2,
        easeLinearity: 0.25,
      });
    } else {
      map.flyTo(mapCenter, mapZoom, {
        duration: 1,
      });
    }
  }, [selectedCountry, mapCenter, mapZoom, map]);

  return null;
}

export function GlobalPresence() {
  const { t } = useTranslation();
  const { content } = useWebsiteContent();

  const [selectedCountry, setSelectedCountry] = useState<CountryItem | null>(null);
  const [hoveredCountry, setHoveredCountry] = useState<CountryItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [mapCenter, setMapCenter] = useState<[number, number]>([20, 20]);
  const [mapZoom, setMapZoom] = useState<number>(2);

  const rawCountries: CountryItem[] = useMemo(() => {
    if (content.globalPresence?.countries && content.globalPresence.countries.length > 0) {
      return content.globalPresence.countries.map((c: any, idx: number) => ({
        ...mapData[idx % mapData.length],
        ...c,
      }));
    }
    return mapData;
  }, [content.globalPresence?.countries]);

  const filteredCountries = useMemo(() => {
    return rawCountries.filter((c) => {
      const matchSearch =
        c.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.code.toLowerCase().includes(searchQuery.toLowerCase());
      const matchRegion = selectedRegion === 'all' || c.region === selectedRegion;
      return matchSearch && matchRegion;
    });
  }, [rawCountries, searchQuery, selectedRegion]);

  const totals = useMemo(() => {
    return rawCountries.reduce(
      (acc, c) => ({
        institutions: acc.institutions + (c.institutions || 0),
        programs: acc.programs + (c.programs || 0),
        experts: acc.experts + (c.experts || 0),
        students: acc.students + (c.students || 0),
      }),
      { institutions: 0, programs: 0, experts: 0, students: 0 }
    );
  }, [rawCountries]);

  const handleCountryClick = (country: CountryItem) => {
    setSelectedCountry(country);
  };

  const handleResetView = () => {
    setSelectedCountry(null);
    setSearchQuery('');
    setSelectedRegion('all');
    setMapCenter([20, 20]);
    setMapZoom(2);
  };

  return (
    <section
      className="section bg-gradient-to-b from-[#0A3D36] via-[#08332E] to-[#062622] text-ivory relative overflow-hidden border-b border-primary/20 py-16 md:py-24"
      aria-labelledby="map-title"
    >
      {/* Background Decorative Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" aria-hidden="true">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="global-presence-islamic-pattern" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 80 40 L 40 80 L 0 40 Z" fill="none" stroke="currentColor" strokeWidth="1" />
              <circle cx="40" cy="40" r="16" fill="none" stroke="currentColor" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#global-presence-islamic-pattern)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="section-header mb-10 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <span className="section-eyebrow inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/15 text-gold border border-gold/30 text-xs font-bold uppercase tracking-widest mb-3">
            <Globe className="w-3.5 h-3.5" />
            {t('homepage.globalPresence', 'Global Academic Presence')}
          </span>
          <h2 id="map-title" className="section-title text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-heading tracking-tight">
            International Network & Directorate Map
          </h2>
          <p className="section-subtitle text-sm sm:text-base text-emerald-100/70 max-w-2xl mx-auto mt-2">
            Explore GIFLRI accredited institutions, quality-certified programs, academic scholars, and student cohorts across 59+ nations worldwide.
          </p>
        </motion.div>

        {/* Global Statistics Cards */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          {[
            { label: 'Member Nations', value: '59', suffix: '+', icon: Globe, color: 'text-gold' },
            { label: 'Affiliated Institutions', value: totals.institutions.toLocaleString(), suffix: '+', icon: Building2, color: 'text-emerald-400' },
            { label: 'Standardized Curricula', value: totals.programs.toLocaleString(), suffix: '+', icon: BookOpen, color: 'text-amber-400' },
            { label: 'Senior Scholars & Experts', value: totals.experts.toLocaleString(), suffix: '+', icon: Users, color: 'text-blue-400' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="p-5 sm:p-6 rounded-3xl bg-[#062420]/80 border border-emerald-500/20 hover:border-gold/50 backdrop-blur-xl shadow-xl transition-all duration-300 group text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4 }}
            >
              <div className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center mx-auto mb-3 text-gold group-hover:scale-110 transition-transform shadow-inner">
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="font-heading text-3xl sm:text-4xl font-extrabold text-white">
                {stat.value}
                <span className={stat.color}>{stat.suffix}</span>
              </div>
              <p className="text-xs sm:text-sm font-medium text-emerald-100/70 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Map Interactive Command Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4 p-4 rounded-3xl bg-[#062420]/80 border border-emerald-500/20 backdrop-blur-xl">
          {/* Region Tabs */}
          <div className="flex items-center gap-1.5 flex-wrap w-full md:w-auto">
            {[
              { id: 'all', label: 'All Regions' },
              { id: 'GCC & Middle East', label: 'GCC & Middle East' },
              { id: 'Asia-Pacific', label: 'Asia-Pacific' },
              { id: 'Africa', label: 'Africa' },
              { id: 'Europe & Americas', label: 'Europe & Americas' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setSelectedRegion(tab.id);
                  setSelectedCountry(null);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedRegion === tab.id
                    ? 'bg-gold text-[#062622] shadow-md shadow-gold/20'
                    : 'bg-white/[0.05] text-white/80 hover:bg-white/[0.1] hover:text-white border border-white/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search & Reset */}
          <div className="flex items-center gap-2.5 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/70" />
              <input
                type="text"
                placeholder="Search country or code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-[#031714] border border-white/15 text-white text-xs outline-none focus:border-gold placeholder:text-white/40"
              />
            </div>
            <button
              onClick={handleResetView}
              className="px-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-gold text-xs font-bold flex items-center gap-1.5 transition-all shrink-0 cursor-pointer"
              title="Reset View"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
        </div>

        {/* Leaflet Map Frame */}
        <motion.div
          className="relative rounded-3xl overflow-hidden border border-gold/30 shadow-[0_20px_50px_rgba(0,0,0,0.6)] bg-[#062622]"
          initial={{ opacity: 0, scale: 0.99 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Map Top Indicator Badge */}
          <div className="absolute top-4 left-4 z-20 pointer-events-none hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#062622]/90 backdrop-blur-md border border-gold/30 text-xs text-white font-semibold shadow-lg">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 -ml-4" />
            <span>Interactive GIS Map • {filteredCountries.length} Active Regional Nodes</span>
          </div>

          <div className="h-[400px] sm:h-[500px] md:h-[620px] w-full relative">
            <MapContainer
              center={mapCenter}
              zoom={mapZoom}
              minZoom={2}
              maxZoom={12}
              scrollWheelZoom={true}
              zoomControl={true}
              className="w-full h-full"
            >
              {/* Ultra-Reliable CartoDB Dark Matter Base Layer */}
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                subdomains="abcd"
                maxZoom={19}
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
              />

              <MapController selectedCountry={selectedCountry} mapCenter={mapCenter} mapZoom={mapZoom} />

              {filteredCountries.map((country) => {
                const radius = Math.max(9, Math.min(24, (country.institutions || 1) * 0.9));
                const isSelected = selectedCountry?.code === country.code;

                return (
                  <CircleMarker
                    key={country.code}
                    center={[country.lat, country.lng]}
                    radius={isSelected ? radius * 1.4 : radius}
                    pathOptions={{
                      color: isSelected ? '#FFFFFF' : '#C9A227',
                      fillColor: isSelected ? '#FBBF24' : '#C9A227',
                      fillOpacity: isSelected ? 0.95 : 0.75,
                      weight: isSelected ? 3 : 2,
                      opacity: 1,
                    }}
                    eventHandlers={{
                      mouseover: () => setHoveredCountry(country),
                      mouseout: () => setHoveredCountry(null),
                      click: () => handleCountryClick(country),
                    }}
                  >
                    <Tooltip direction="top" offset={[0, -10]} opacity={1}>
                      <div className="bg-[#062622] text-white font-bold px-2.5 py-1 text-xs rounded border border-gold/40 flex items-center gap-1.5">
                        <img
                          src={`https://flagcdn.com/w20/${country.code.toLowerCase()}.png`}
                          alt={country.country}
                          className="w-4 h-3 rounded-sm object-cover"
                        />
                        <span>{country.country}</span>
                      </div>
                    </Tooltip>

                    <Popup offset={[0, -10]}>
                      <div className="p-3.5 min-w-[220px] bg-[#062622] text-white rounded-2xl border border-gold/40">
                        <div className="flex items-center gap-2 mb-2.5 pb-2 border-b border-white/10">
                          <img
                            src={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`}
                            alt={country.country}
                            className="w-6 h-4.5 rounded object-cover border border-gold/40"
                          />
                          <div>
                            <h4 className="font-heading font-extrabold text-gold text-sm leading-tight">{country.country}</h4>
                            <span className="text-[10px] text-emerald-200/60 uppercase">{country.region}</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                          <div className="text-white/70">Institutions:</div>
                          <div className="font-bold text-white text-right">{country.institutions}</div>
                          <div className="text-white/70">Programs:</div>
                          <div className="font-bold text-white text-right">{country.programs}</div>
                          <div className="text-white/70">Scholars:</div>
                          <div className="font-bold text-white text-right">{country.experts}</div>
                          <div className="text-white/70">Students:</div>
                          <div className="font-bold text-gold text-right">{(country.students || 0).toLocaleString()}</div>
                        </div>

                        <button
                          className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-emerald-950 font-extrabold text-xs shadow hover:brightness-110 transition-all cursor-pointer flex items-center justify-center gap-1"
                          onClick={() => handleCountryClick(country)}
                        >
                          <span>Explore Full Profile</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      </div>
                    </Popup>
                  </CircleMarker>
                );
              })}
            </MapContainer>
          </div>
        </motion.div>

        {/* Interactive Country Cards Directory Grid */}
        <div className="mt-12 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading text-xl md:text-2xl font-bold text-white flex items-center gap-2">
              <Compass className="w-5 h-5 text-gold" />
              Regional Member Directory ({filteredCountries.length} Countries)
            </h3>
            <span className="text-xs text-gold font-mono">
              Showing {filteredCountries.length} of {rawCountries.length} nodes
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredCountries.map((c) => (
              <motion.div
                key={c.code}
                onClick={() => handleCountryClick(c)}
                whileHover={{ y: -4, scale: 1.01 }}
                className="p-4 rounded-2xl bg-[#062420]/80 border border-white/10 hover:border-gold/50 backdrop-blur-xl shadow-lg cursor-pointer transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={`https://flagcdn.com/w40/${c.code.toLowerCase()}.png`}
                        alt={c.country}
                        className="w-7 h-5 rounded object-cover border border-gold/40 shadow-sm"
                      />
                      <div>
                        <h4 className="font-heading font-bold text-sm text-white group-hover:text-gold transition-colors">
                          {c.country}
                        </h4>
                        <span className="text-[10px] text-emerald-300/60 uppercase">{c.code}</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gold/15 text-gold border border-gold/30">
                      {c.region.split('&')[0]}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-white/10 text-ivory/80">
                    <div>
                      <span className="text-[10px] text-ivory/50 block">Institutions</span>
                      <strong className="text-white text-xs">{c.institutions}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-ivory/50 block">Programs</span>
                      <strong className="text-white text-xs">{c.programs}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-ivory/50 block">Experts</span>
                      <strong className="text-white text-xs">{c.experts}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-ivory/50 block">Students</span>
                      <strong className="text-gold text-xs">{c.students.toLocaleString()}</strong>
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-xs text-gold font-bold">
                  <span>View Regional Hub</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Hover Quick Card Popup */}
        <AnimatePresence>
          {!selectedCountry && hoveredCountry && (
            <motion.div
              key={hoveredCountry.code}
              className="fixed bottom-6 right-6 max-w-xs z-30 pointer-events-none"
              initial={{ opacity: 0, x: 20, y: 10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="p-4 rounded-2xl shadow-2xl border border-gold/50 bg-[#062622]/95 text-white backdrop-blur-xl">
                <div className="flex items-center gap-2.5 mb-2">
                  <img
                    src={`https://flagcdn.com/w40/${hoveredCountry.code.toLowerCase()}.png`}
                    alt={hoveredCountry.country}
                    className="w-7 h-5 object-cover rounded border border-gold/40 shadow-sm"
                  />
                  <div>
                    <h4 className="font-heading text-sm font-bold text-gold">{hoveredCountry.country}</h4>
                    <span className="text-[10px] text-emerald-200/60 uppercase">{hoveredCountry.region}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-white/10">
                  <div className="text-ivory/70">Institutions:</div>
                  <div className="font-bold text-white text-right">{hoveredCountry.institutions}</div>
                  <div className="text-ivory/70">Programs:</div>
                  <div className="font-bold text-white text-right">{hoveredCountry.programs}</div>
                  <div className="text-ivory/70">Students:</div>
                  <div className="font-bold text-gold text-right">{hoveredCountry.students.toLocaleString()}</div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Country Detailed Modal View */}
        <AnimatePresence>
          {selectedCountry && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCountry(null)}
            >
              <motion.div
                className="relative w-full max-w-2xl bg-[#062622] text-ivory rounded-3xl overflow-hidden shadow-2xl border border-gold/40 flex flex-col max-h-[90vh]"
                initial={{ scale: 0.95, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.95, y: 20, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 250 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header Gradient Top bar */}
                <div className="h-2 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600" />

                {/* Close Button */}
                <button
                  onClick={() => setSelectedCountry(null)}
                  className="absolute top-5 right-5 p-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-white transition-colors z-10 border border-white/10 cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Modal Header */}
                <div className="p-6 md:p-8 pb-4 border-b border-white/10 flex items-center gap-4">
                  <img
                    src={`https://flagcdn.com/w160/${selectedCountry.code.toLowerCase()}.png`}
                    alt={selectedCountry.country}
                    className="w-16 h-11 object-cover rounded-xl border border-gold/40 shadow-md"
                  />
                  <div>
                    <h3 className="font-heading text-2xl font-extrabold text-gold flex items-center gap-2">
                      {selectedCountry.country}
                    </h3>
                    <span className="text-xs uppercase tracking-wider text-emerald-200/70">
                      Regional Directorate Hub • {selectedCountry.region} • ISO/IEC Standardized
                    </span>
                  </div>
                </div>

                {/* Modal Body */}
                <div className="p-6 md:p-8 overflow-y-auto space-y-6 flex-1 text-ivory custom-scrollbar">
                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { icon: Building2, label: 'Institutions', value: selectedCountry.institutions },
                      { icon: BookOpen, label: 'Curricula', value: selectedCountry.programs },
                      { icon: Users, label: 'Scholars', value: selectedCountry.experts },
                      { icon: GraduationCap, label: 'Students', value: selectedCountry.students.toLocaleString() },
                    ].map((stat, i) => (
                      <div key={i} className="flex flex-col items-center justify-center p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 text-center">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-1.5 bg-gold/15 text-gold border border-gold/30">
                          <stat.icon className="w-4 h-4" />
                        </div>
                        <span className="font-heading text-lg font-bold text-white">{stat.value}</span>
                        <span className="text-[10px] uppercase font-semibold text-emerald-200/60 mt-0.5">{stat.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Focus Area Box */}
                  <div className="p-5 rounded-2xl bg-white/[0.04] border border-gold/30 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-gold" />
                    <h4 className="font-heading text-sm font-bold text-gold flex items-center gap-2 mb-2">
                      <Shield className="w-4 h-4 text-gold" />
                      Primary Regional Focus Area
                    </h4>
                    <p className="text-xs sm:text-sm leading-relaxed text-ivory/80">
                      {getCountryRichDetails(selectedCountry.code).focusArea}
                    </p>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Partners */}
                    <div className="space-y-2.5">
                      <h4 className="font-heading text-xs font-bold text-gold uppercase tracking-wider flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-gold" />
                        Affiliated University Partners
                      </h4>
                      <ul className="space-y-2">
                        {getCountryRichDetails(selectedCountry.code).partners.map((partner, idx) => (
                          <li key={idx} className="text-xs flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-ivory/90">
                            <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                            <span className="truncate">{partner}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Research Projects */}
                    <div className="space-y-2.5">
                      <h4 className="font-heading text-xs font-bold text-gold uppercase tracking-wider flex items-center gap-2">
                        <BookOpen className="w-3.5 h-3.5 text-gold" />
                        Active Research Initiatives
                      </h4>
                      <ul className="space-y-2">
                        {getCountryRichDetails(selectedCountry.code).projects.map((project, idx) => (
                          <li key={idx} className="text-xs flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-ivory/90">
                            <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                            <span className="truncate">{project}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Governance Lead & Milestone */}
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2 text-xs">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-ivory/50">Regional Shariah Governance Lead</span>
                      <p className="text-sm font-semibold text-gold mt-0.5">
                        {getCountryRichDetails(selectedCountry.code).lead}
                      </p>
                    </div>
                    <div className="pt-2 border-t border-white/10">
                      <span className="text-[10px] uppercase font-bold text-ivory/50">Key Milestones (2026)</span>
                      <p className="text-xs text-emerald-100/80 mt-0.5">
                        {getCountryRichDetails(selectedCountry.code).milestone}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="p-5 border-t border-white/10 bg-white/[0.02] flex items-center justify-end gap-3">
                  <button
                    onClick={() => setSelectedCountry(null)}
                    className="px-4 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-white border border-white/10 text-xs font-bold transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                  <a
                    href="/affiliation"
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-emerald-950 font-extrabold text-xs flex items-center gap-1.5 shadow hover:brightness-110 transition-all"
                  >
                    Apply for Affiliation
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

export default GlobalPresence;