'use client';

import { useState, useEffect } from 'react';
import type { WebsiteSectionContent } from '@/types';

export const defaultWebsiteContent: WebsiteSectionContent = {
  about: {
    eyebrow: 'About the Global Institution',
    title: 'Pioneering Excellence in Islamic Knowledge, Language & Governance',
    subtitle: 'GIFLRI is a premier international standards-setting body bridging sacred tradition with modern financial technologies and global academic rigor.',
    calligraphyText: 'إِقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ',
    calligraphyTranslation: 'He who treads a path in search of knowledge, Allah will make easy for him a path to Paradise.',
    quoteAuthor: 'Prophet Muhammad ﷺ',
    mission: 'To formulate universal quality standards, standardized academic curricula, and rigorous accreditation pathways for Islamic educational bodies worldwide.',
    vision: 'A unified global ecosystem where ethical Islamic finance and Arabic linguistic scholarship lead international sustainable development.',
    card1Title: 'Ethical Shariah Rigor',
    card1Desc: 'Deep immersion into classical Fiqh al-Muamalat paired with cutting-edge ESG auditing.',
    card2Title: 'Global Institutional Recognition',
    card2Desc: 'Over 200 accredited institutions across 59 countries trust our standardized quality benchmarks.',
    values: [
      { title: 'Iqra (Excellence in Knowledge)', desc: 'Knowledge rooted in sacred tradition and contemporary relevance.', iconName: 'BookOpen' },
      { title: 'Amanah (Trust & Integrity)', desc: 'Unwavering commitment to ethical governance and public trust.', iconName: 'Shield' },
      { title: 'Ihsan (Professional Quality)', desc: 'Highest international standards across all programs and audits.', iconName: 'Lightbulb' },
      { title: 'Adl (Justice & Equity)', desc: 'Fair, transparent, and inclusive institutional partnerships.', iconName: 'Heart' },
    ],
    missionPoints: [
      'Standardize academic curricula in Islamic banking, Takaful, and classical Arabic linguistics.',
      'Provide ISO-aligned auditing and cryptographic credential verification for partner institutions.',
      'Foster high-impact peer-reviewed research across Islamic FinTech, ESG, and sustainable finance.',
    ],
    visionPoints: [
      'An interconnected global network of over 500 accredited universities and research bodies by 2030.',
      'Universal recognition of GIFLRI diplomas and certifications across global regulators.',
      'Leading the digital frontier through ethical AI and open computational Arabic corpora.',
    ],
  },
  quality: {
    eyebrow: 'Auditing & Accreditation',
    title: 'Comprehensive 8-Domain Quality Assurance Framework',
    subtitle: 'Standardized institutional scorecards, peer-reviewed curriculum verification, and annual on-site audits.',
    auditBadge: 'ISO 9001 & AAOIFI Aligned Continuous Governance',
    framework: [
      { id: 'gov', title: 'Governance & Integrity', desc: 'Institutional mission alignment, ethics policies, and conflict-of-interest controls.', iconName: 'Network' },
      { id: 'fac', title: 'Faculty Qualifications', desc: 'Faculty credential verification, continuous CPD tracking, and research output.', iconName: 'Users' },
      { id: 'cur', title: 'Curriculum Standards', desc: 'Program structure, learning outcome mapping, and regular curriculum review cycles.', iconName: 'BookOpen' },
      { id: 'ass', title: 'Assessment & Grading', desc: 'Fair, transparent assessment rubrics, moderation protocols, and security audits.', iconName: 'ClipboardCheck' },
      { id: 'sup', title: 'Student Support Services', desc: 'Academic advising, language support desks, grievance channels, and career guidance.', iconName: 'Users' },
      { id: 'eth', title: 'Ethics & Compliance', desc: 'Shariah compliance audits, AAOIFI alignment, and anti-plagiarism verification.', iconName: 'Shield' },
      { id: 'rec', title: 'Institutional Records', desc: 'Data security protocols, verifiable cryptographic transcripts, and audit logs.', iconName: 'Award' },
      { id: 'res', title: 'Research & Innovation', desc: 'Scholarly paper publication, faculty research grants, and industry sandboxes.', iconName: 'Target' },
    ],
    scorecard: [
      { area: 'Governance & Leadership', score: 94, trend: 'up' },
      { area: 'Faculty Credentials & CPD', score: 88, trend: 'stable' },
      { area: 'Curriculum & Syllabi', score: 92, trend: 'up' },
      { area: 'Assessment & Examination', score: 86, trend: 'up' },
      { area: 'Student Learning Support', score: 82, trend: 'up' },
      { area: 'Shariah & AAOIFI Compliance', score: 97, trend: 'stable' },
    ],
    standards: [
      { title: 'GIFLRI Quality Manual', desc: 'Comprehensive operational manual outlining all 8 institutional audit domains.', version: 'v2.4', updated: '2026-03' },
      { title: 'Curriculum Standards Matrix', desc: 'Benchmarked credit hour requirements for diplomas and executive certifications.', version: 'v3.1', updated: '2026-02' },
      { title: 'Institutional Audit Templates', desc: 'Standardized self-evaluation reports (SER) and reviewer scoring sheets.', version: 'v1.8', updated: '2026-01' },
      { title: 'Cryptographic Credential Guide', desc: 'Technical specifications for blockchain-anchored QR diploma issuance.', version: 'v2.0', updated: '2026-02' },
    ],
    correctiveActions: [
      { id: 'CA-001', area: 'Student Support Desk', desc: 'Establish centralized multilingual online counseling portal.', deadline: '2026-11-30', status: 'In Progress', priority: 'high' },
      { id: 'CA-002', area: 'Assessment Verification', desc: 'Implement automated blind peer review for graduate thesis evaluations.', deadline: '2026-12-15', status: 'In Progress', priority: 'mandatory' },
      { id: 'CA-003', area: 'Faculty Research CPD', desc: 'Mandate minimum 40 CPD hours annually per affiliated faculty member.', deadline: '2027-01-31', status: 'Planned', priority: 'medium' },
    ],
  },
  affiliation: {
    eyebrow: 'Institutional Pathways',
    title: 'Empowering Educational Institutions Across 59 Nations',
    subtitle: 'Join an internationally certified network of universities, colleges, and training academies.',
    trustTitle: 'Trust-First Institutional Auditing',
    trustDesc: 'Every affiliated institution receives a unique cryptographic registry hash and continuous academic oversight.',
    journeySteps: [
      { id: 'why', number: '01', title: 'Institutional Value', desc: 'Global recognition, ISO-aligned certification, and joint research access.', color: 'primary' },
      { id: 'eligibility', number: '02', title: 'Eligibility Check', desc: 'Accredited higher-ed status, registered faculty, and ethical charter.', color: 'emerald' },
      { id: 'standards', number: '03', title: 'Quality Framework', desc: 'Adherence to the 8 GIFLRI governance & curriculum benchmarks.', color: 'gold' },
      { id: 'fees', number: '04', title: 'Transparent Fees', desc: 'Fixed application & annual quality auditing schedule with subsidy tiers.', color: 'blue' },
      { id: 'application', number: '05', title: 'Digital Submission', desc: 'Online portal submission with stage tracking and document vault.', color: 'purple' },
      { id: 'renewal', number: '06', title: 'Continuous Audit', desc: 'Annual review, faculty CPD validation, and re-certification issuance.', color: 'orange' },
    ],
    benefits: [
      { title: 'International Academic Standing', desc: 'Direct accreditation alignment with major international Islamic finance bodies.' },
      { title: 'Cryptographic Credential System', desc: 'Instant verifiable QR diplomas protecting against diploma fraud.' },
      { title: 'Standardized Master Curricula', desc: 'Access to ready-to-teach course modules with syllabi and case studies.' },
      { title: 'Global Faculty Exchange', desc: 'Collaborate with top scholars, guest lecturers, and Shariah advisors.' },
      { title: 'Research Journal Fast-Track', desc: 'Priority peer-review and publication in GIFLRI ISSN journals.' },
      { title: 'Annual Global Conferences', desc: 'Discounted delegate seats and speaker invitations at GIFC Dubai & Cairo.' },
    ],
    stats: {
      institutions: 200,
      countries: 59,
      programs: 400,
      renewalRate: 98,
    },
  },
  relations: {
    eyebrow: 'Global Network',
    title: 'International Cooperation & Strategic MoUs',
    subtitle: 'Collaborating with multilateral development banks, supranational academies, and state ministries.',
    partners: {
      organizations: [
        { name: 'Islamic Development Bank (IsDB)', desc: 'Research & Sustainable FinTech Capacity Building', status: 'Active', since: '2024' },
        { name: 'AAOIFI Standards Board', desc: 'Accounting & Governance Standards Harmonization', status: 'Active', since: '2024' },
        { name: 'International Islamic Financial Market (IIFM)', desc: 'Standardized Sukuk Documentation & Green Finance', status: 'Active', since: '2024' },
        { name: 'Islamic Financial Services Board (IFSB)', desc: 'Prudential & Supervisory Regulatory Guidelines', status: 'Active', since: '2023' },
        { name: 'World Bank Global Islamic Finance Center', desc: 'Multilateral Financial Inclusion Initiatives', status: 'Active', since: '2025' },
        { name: 'UNESCO Arabic Language Unit', desc: 'Classical & Computational Linguistic Corpus Preservation', status: 'Active', since: '2024' },
      ],
      universities: [
        { name: 'Al-Azhar University (Cairo)', desc: 'Faculty Exchange & Shariah Methodology Research', status: 'Active', since: '2024' },
        { name: 'INCEIF University (Malaysia)', desc: 'Joint Dual-Diploma & Executive Islamic Finance Programs', status: 'Active', since: '2025' },
        { name: 'Hamad Bin Khalifa University (Qatar)', desc: 'Islamic Economics & Sustainable FinTech Lab', status: 'Active', since: '2024' },
        { name: 'International Islamic University Malaysia (IIUM)', desc: 'Fiqh al-Muamalat & Digital Contracts Research', status: 'Active', since: '2023' },
        { name: 'Zaytuna College (USA)', desc: 'Liberal Arts, Arabic Pedagogy & Ethical Studies', status: 'Active', since: '2025' },
        { name: 'King Abdulaziz University (Saudi Arabia)', desc: 'Islamic Economics Institute Research Partnership', status: 'Active', since: '2024' },
      ],
      finance: [
        { name: 'Dubai Islamic Bank', desc: 'Industry Sandbox & FinTech Student Internships', status: 'Active', since: '2024' },
        { name: 'Al Rajhi Bank', desc: 'Executive CPD & Shariah Board Audit Training', status: 'Active', since: '2024' },
        { name: 'Bank Islam Malaysia', desc: 'Value-Based Intermediation Research Consortium', status: 'Active', since: '2024' },
        { name: 'Kuwait Finance House', desc: 'Digital Takaful & Actuarial Governance Frameworks', status: 'Active', since: '2023' },
      ],
      academies: [
        { name: 'Academy of Arabic Language (Cairo)', desc: 'Standardized Classical Arabic Curriculum Standards', status: 'Active', since: '2024' },
        { name: 'King Abdullah Academy for Arabic', desc: 'Computational Linguistics & NLP Corpus Development', status: 'Active', since: '2024' },
        { name: 'Dubai Arabic Language Centre', desc: 'Teaching Arabic as a Second Language Standards', status: 'Active', since: '2025' },
      ],
    },
    mous: [
      { partner: 'Islamic Development Bank (IsDB)', date: 'Mar 2025', scope: 'Sustainable Sukuk & Climate Finance Training', status: 'Active', outcomes: ['Joint Research Briefs', 'Capacity Workshops in 12 Nations', 'Full Student Scholarships'] },
      { partner: 'INCEIF University Malaysia', date: 'Jan 2025', scope: 'Executive Dual-Diploma in Islamic FinTech', status: 'Active', outcomes: ['Dual Recognized Degrees', 'Joint Faculty Exchanges', 'Shared AI Research Sandboxes'] },
      { partner: 'AAOIFI Standards Board', date: 'Nov 2024', scope: 'Accounting & Auditing Curriculum Alignment', status: 'Active', outcomes: ['Standardized Syllabi', 'AAOIFI Certified Exams', 'Annual Audit Seminars'] },
      { partner: 'Al-Azhar University Cairo', date: 'Sep 2024', scope: 'Arabic Linguistics & Shariah Text Digitization', status: 'Active', outcomes: ['Manuscript Digital Archives', 'Linguistic Proficiency Framework', 'Scholar Summer Fellowships'] },
    ],
    jointProjects: [
      { title: 'Green Sukuk for Climate Transition Framework', partners: ['IsDB', 'World Bank Group'], status: 'Active', outputs: ['Policy Whitepaper', 'Issuance Standard v1.2', 'Pilot Green Sovereign Bond in UAE'] },
      { title: 'Global Computational Arabic Corpus & LLM Benchmarks', partners: ['Al-Azhar', 'HBKU Qatar', 'Cairo Academy'], status: 'Active', outputs: ['100M Word Cleaned Corpus', 'Shariah NLP Benchmark Suite', 'Open-Source HuggingFace Model'] },
      { title: 'Islamic FinTech & Smart Contracts Regulatory Sandbox', partners: ['Dubai Islamic Bank', 'Central Bank Taskforce'], status: 'Active', outputs: ['Fiqh-Compliant Solidity Smart Contracts', 'Sandbox Operating Guidelines', '3 FinTech Pilots'] },
    ],
  },
  observatory: {
    eyebrow: 'Global Intelligence',
    title: 'Islamic Finance & Economic Observatory 2026',
    subtitle: 'Real-time aggregated indicators across sovereign Sukuk issuances, Takaful penetration, and Islamic FinTech sandboxes.',
    growthStat: '+14.8% Global Shariah Asset Growth YoY',
    financeThemes: [
      { id: 'banking', title: 'Islamic Banking Assets', desc: 'Aggregate balance sheets across full-fledged Islamic banks and windows.', metrics: ['Total Assets: $3.8T', 'Financing Growth: +11.4%', 'Capital Adequacy: 16.8%', 'NPL Ratio: 3.2%'], iconName: 'Building2' },
      { id: 'sukuk', title: 'Sovereign & ESG Sukuk', desc: 'Global issuance volumes, yield spreads, and green certificate shares.', metrics: ['Global Issuance: $230B', 'Green Sukuk Share: 18.5%', 'Avg Duration: 7.2 Yrs', 'Oversubscription: 3.4x'], iconName: 'FileText' },
      { id: 'takaful', title: 'Takaful & Mutual Insurance', desc: 'Gross contributions, retention metrics, and surplus distribution.', metrics: ['Gross Premium: $38B', 'Annual Growth: +9.6%', 'Combined Ratio: 91.2%', 'Solvency Margin: 220%'], iconName: 'Shield' },
      { id: 'fintech', title: 'Islamic FinTech & Crypto', desc: 'Active startups, funding rounds, and regulatory sandbox deployments.', metrics: ['Active Startups: 420+', 'Venture Capital: $1.2B', 'Sandboxes Active: 19', 'Digital Adoption: 64%'], iconName: 'Zap' },
    ],
    languageThemes: [
      { id: 'education', title: 'Global Arabic Pedagogy', desc: 'Enrollment figures across non-native and native linguistic academies.', metrics: ['Enrolled Learners: 2.1M', 'Certified Centers: 480', 'Teacher Student Ratio: 1:18', 'Digital Platforms: 88%'], iconName: 'GraduationCap' },
      { id: 'research', title: 'Linguistic & NLP Research', desc: 'Scholarly papers on classical syntax, morphology, and computational models.', metrics: ['Annual Papers: 1,450+', 'Corpus Tokens: 4.8B', 'Dialect Coverage: 24', 'AI Benchmark Rank: #1'], iconName: 'Microscope' },
      { id: 'translation', title: 'Academic Translation Flow', desc: 'Translation of contemporary financial and legal treatises into Arabic.', metrics: ['Volumes Translated: 320', 'Terminology Lexicons: 14', 'Peer Review Score: 96%', 'Open Access: 100%'], iconName: 'Languages' },
      { id: 'digital', title: 'Digital Heritage Preservation', desc: 'Digitization and high-resolution OCR scanning of historical manuscripts.', metrics: ['Digitized Folios: 85,000+', 'OCR Accuracy: 98.4%', 'Institutional Repos: 42', 'Public API Queries: 5M/mo'], iconName: 'Database' },
    ],
  },
  globalPresence: {
    eyebrow: 'International Footprint',
    title: 'A Global Network of Accredited Institutions',
    subtitle: 'Connecting 200+ partner universities, regulatory boards, and research centers across 59 countries.',
    countries: [
      { country: 'UAE', code: 'AE', lat: 23.4241, lng: 53.8478, institutions: 12, programs: 45, experts: 28, students: 3200, focusArea: 'Islamic FinTech Hub, Digital Sukuk frameworks, Shariah governance models, and sovereign wealth optimization.', partners: ['Dubai Islamic Economy Development Centre', 'Zayed University Research Wing', 'GIFLRI UAE Innovation Lab'], projects: ['Blockchain Smart Contracts for Sukuks', 'Ethical AI Chatbots for Islamic Banking', 'Shariah Crowdfunding Platforms'], milestone: 'Accredited 12 new Shariah Fintech programs; trained 3,200+ practitioners in 2026.', lead: 'Dr. Ahmed Al-Mansoori (Regional Shariah Board Chairman)' },
      { country: 'Saudi Arabia', code: 'SA', lat: 23.8859, lng: 45.0792, institutions: 18, programs: 67, experts: 42, students: 5100, focusArea: 'Mega Shariah-compliant funds, Sovereign Sukuk frameworks, Arabic linguistic corpus research, and historical manuscript OCR models.', partners: ['Islamic University of Madinah', 'King Abdulaziz University Islamic Economics Department', 'GIFLRI Riyadh Centre'], projects: ['Ancient Shariah Manuscript Digital Archivist', 'Global Sukuk Liquidity Indexing', 'Saudi Vision 2030 Ethical Economy Integration'], milestone: 'Co-published 67 research papers on Islamic capital markets and standardized 18 academic curricula.', lead: 'Prof. Khalid Al-Faisal (Shariah & Jurisprudence Lead)' },
      { country: 'Malaysia', code: 'MY', lat: 4.2105, lng: 101.9758, institutions: 22, programs: 78, experts: 48, students: 6200, focusArea: 'Global Halal standard compliance registry, Green Sukuk initiatives, and digital Islamic banking policies.', partners: ['International Islamic University Malaysia (IIUM)', 'INCEIF University', 'Islamic Banking & Finance Institute Malaysia'], projects: ['Global Halal Supply Chain Verification Ledger', 'Green Sukuk Sustainable Investment Standard', 'Digital Takaful Solvency Sandbox'], milestone: 'Evaluated and approved 78 language and finance programs, coordinating with 48 senior Malaysian advisors.', lead: "Dato' Dr. Mohd Daud Bakar (Senior Academic Coordinator)" },
      { country: 'Indonesia', code: 'ID', lat: -0.7893, lng: 113.9213, institutions: 28, programs: 95, experts: 55, students: 8500, focusArea: 'Islamic microfinance networks, Waqf digitalization, and community Islamic banking education.', partners: ['Universitas Indonesia', 'UIN Syarif Hidayatullah Jakarta', 'Bank Indonesia Institute'], projects: ['Cash Waqf Linked Sukuk Framework', 'Community Halal Microfinance Sandbox', 'Digital Islamic Economy Training'], milestone: 'Expanded affiliation network to 28 campuses with over 8,500 active certified students.', lead: 'Prof. Dr. Dian Masyita (Islamic Microfinance Specialist)' },
      { country: 'Egypt', code: 'EG', lat: 26.8206, lng: 30.8025, institutions: 14, programs: 55, experts: 36, students: 4100, focusArea: 'Classical Fiqh al-Muamalat jurisprudence, Arabic linguistic corpora, and historical manuscript authentication.', partners: ['Al-Azhar University', 'Cairo University Faculty of Dar El-Ulum', 'Academy of the Arabic Language in Cairo'], projects: ['Classical Arabic Grammar Digital Corpus', 'Historical Shariah Legal Codes Digitization', 'Master Arabic Pedagogy Curriculum'], milestone: 'Graduated 4,100 certified Arabic language educators and accredited 14 institutional faculties.', lead: 'Dr. Mahmoud Al-Tayyib (Arabic Language Directorate Chair)' },
      { country: 'Türkiye', code: 'TR', lat: 38.9637, lng: 35.2433, institutions: 15, programs: 52, experts: 35, students: 4300, focusArea: 'Participation banking standards, Ottoman financial records digitization, and regional trade finance Sukuk.', partners: ['Istanbul Sabahattin Zaim University', 'Marmara University Islamic Economics Institute', 'TKBB Participation Banks Association'], projects: ['Participation Banking Risk Management Matrix', 'Ottoman Waqf Archives Digital Registry', 'Bosphorus Ethical Finance Forum'], milestone: 'Standardized participation banking curricula across 15 Turkish higher education institutes.', lead: 'Prof. Dr. Mehmet Asutay (Regional Academic Advisor)' },
      { country: 'United Kingdom', code: 'GB', lat: 55.3781, lng: -3.4360, institutions: 6, programs: 20, experts: 18, students: 1400, focusArea: 'European Islamic finance compliance, alternative investments, and ethical ESG fund certification.', partners: ['Durham University Islamic Finance Centre', 'SOAS University of London', 'UK Islamic Finance Council (UKIFC)'], projects: ['London Green Sukuk Governance Standard', 'European Shariah Fintech Sandbox', 'Islamic Wealth Management Syllabus'], milestone: 'Established continuous accreditation for 6 leading UK academic and professional institutions.', lead: 'Prof. Habib Ahmed (European Academic Liaison)' },
    ],
  },
  latestUpdates: {
    eyebrow: 'News & Announcements',
    title: 'Latest Updates & Research Releases',
    subtitle: 'Stay informed on standard releases, upcoming conferences, research calls, and institutional updates.',
    updates: [
      { id: 1, type: 'research', label: 'Research', title: 'New Study on Sovereign Sukuk Risk Management Published', desc: 'GIFLRI Journal of Islamic Finance releases a comprehensive analysis of Sukuk structures in volatile global capital markets.', date: '2026-03-01', author: 'Dr. Tariq Al-Mansoor', readTime: '8 min read' },
      { id: 2, type: 'event', label: 'Flagship Event', title: 'Global Islamic Finance Conference (GIFC 2027) Dubai', desc: 'Join 500+ international scholars, regulators, and financial executives in Dubai for the premier global gathering.', date: '2027-02-20', location: 'Dubai International Financial Centre, UAE' },
      { id: 3, type: 'announcement', label: 'Standards Update', title: '2026 Affiliation Standards & Quality Matrix Released', desc: 'Updated quality assurance framework with enhanced digital governance and automated student support criteria.', date: '2026-02-15', author: 'Quality Assurance Division' },
      { id: 4, type: 'research', label: 'Linguistics', title: 'Arabic Computational Pedagogy in the Era of AI & LLMs', desc: 'Groundbreaking research explores AI-assisted Arabic language acquisition and morphology processing methodologies.', date: '2026-02-01', author: 'Prof. Dr. Mahmoud Al-Tayyib', readTime: '12 min read' },
      { id: 5, type: 'event', label: 'Hackathon', title: 'Islamic FinTech & Smart Contracts Hackathon 2026', desc: 'A 48-hour global developer innovation challenge building Shariah-compliant smart contracts and decentralized solutions.', date: '2026-04-18', location: 'Kuala Lumpur, Malaysia' },
      { id: 6, type: 'announcement', label: 'Call for Papers', title: 'Call for Papers: Green Sukuk & Sustainable ESG Frameworks', desc: 'Special volume of GIFLRI Journal inviting scholarly submissions on sustainable Islamic instruments for climate action.', date: '2026-06-30', deadline: 'Submission Deadline: June 30, 2026' },
    ],
  },
  quickActions: {
    eyebrow: 'Navigation Pathways',
    title: 'Quick Access Portal Desks',
    actions: [
      { label: 'Apply for Institutional Affiliation', desc: 'Start your university or academy accreditation journey with GIFLRI.', href: '/affiliation/apply', color: 'gold', iconName: 'Building2' },
      { label: 'Affiliated Institutions Directory', desc: 'Search and browse over 200 verified partner institutions globally.', href: '/directory', color: 'primary', iconName: 'Search' },
      { label: 'Verify Certificates & Credentials', desc: 'Instantly verify QR-backed verifiable diplomas and student credentials.', href: '/verify', color: 'emerald', iconName: 'ShieldCheck' },
      { label: 'Find Approved Curricula & Programs', desc: 'Discover certified diplomas, executive masterclasses, and degrees.', href: '/programs', color: 'blue', iconName: 'BookOpen' },
      { label: 'Submit Research Paper or Journal DOI', desc: 'Submit working papers and dissertations to GIFLRI peer-reviewed journals.', href: '/research', color: 'purple', iconName: 'FlaskConical' },
      { label: 'Ask GIFLRI Ethical AI Advisor', desc: 'Get immediate AI-guided answers on Shariah curricula and standards.', href: '/ai', color: 'orange', iconName: 'Bot' },
    ],
  },
  footer: {
    aboutText: 'The Global Islamic Finance & Language Research Institution (GIFLRI) is the premier international body for Islamic educational standards, research journals, cryptographic credential verification, and institutional accreditation.',
    secretariatInfo: 'Executive Secretariat: Dubai International Academic City, Block 12, P.O. Box 50021, Dubai, United Arab Emirates',
    phone: '+971 4 800 GIFLRI / +91 22 2456 7890',
    email: 'secretariat@giflri.org / registry@giflri.org',
    address: 'Dubai International Academic City, Dubai, United Arab Emirates',
    operatingHours: 'Monday – Friday, 08:30 – 17:30 (GST)',
    copyright: '© 2026 GIFLRI. Global Islamic Finance & Language Research Institution. All Rights Reserved.',
    trustBadges: [
      { title: 'Cryptographic Registry', subtitle: 'Immutable QR & SHA-256 digital certificate verification', iconName: 'ShieldCheck' },
      { title: 'ISO 9001:2015 Quality', subtitle: 'International benchmark for academic accreditation & audits', iconName: 'Award' },
      { title: '59 Member Nations', subtitle: 'Worldwide network of recognized partner universities', iconName: 'Building2' },
      { title: 'Shariah Board Governance', subtitle: 'Strict alignment with global Islamic ethical standards & AAOIFI', iconName: 'BookOpen' },
    ],
    socialLinks: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      youtube: 'https://youtube.com',
      facebook: 'https://facebook.com',
      instagram: 'https://instagram.com',
    },
  },
};

export function useWebsiteContent() {
  const [content, setContent] = useState<WebsiteSectionContent>(defaultWebsiteContent);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadContent() {
      try {
        const res = await fetch('/api/admin/content');
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data && isMounted) {
            setContent({
              ...defaultWebsiteContent,
              ...json.data,
              about: { ...defaultWebsiteContent.about, ...(json.data.about || {}) },
              quality: { ...defaultWebsiteContent.quality, ...(json.data.quality || {}) },
              affiliation: { ...defaultWebsiteContent.affiliation, ...(json.data.affiliation || {}) },
              relations: { ...defaultWebsiteContent.relations, ...(json.data.relations || {}) },
              observatory: { ...defaultWebsiteContent.observatory, ...(json.data.observatory || {}) },
              globalPresence: { ...defaultWebsiteContent.globalPresence, ...(json.data.globalPresence || {}) },
              latestUpdates: { ...defaultWebsiteContent.latestUpdates, ...(json.data.latestUpdates || {}) },
              quickActions: { ...defaultWebsiteContent.quickActions, ...(json.data.quickActions || {}) },
              footer: { ...defaultWebsiteContent.footer, ...(json.data.footer || {}) },
            });
          }
        }
      } catch (err) {
        // Fallback to default
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadContent();

    // Listen for custom admin update event
    const handleStorageOrCustom = () => {
      loadContent();
    };

    window.addEventListener('website-content-updated', handleStorageOrCustom);
    return () => {
      isMounted = false;
      window.removeEventListener('website-content-updated', handleStorageOrCustom);
    };
  }, []);

  return { content, isLoading };
}
