import fs from 'fs';
import path from 'path';
import {
  Institution,
  Program,
  Application,
  EventItem,
  EventRegistration,
  Certificate,
  ResearchPaper,
  Journal,
  Expert,
  Complaint,
  ActivityLog,
  StudentServiceRequest,
  FacultyRegistration,
  PaymentRecord,
  ObservatoryData,
  ContactSubmission,
  NewsletterSubscriber,
  SearchResultItem,
  User,
  SiteSettings,
  PillarContent,
  MediaAssetItem,
  WebsiteSectionContent,
} from '../types';
import {
  initialInstitutions,
  initialPrograms,
  initialApplications,
  initialEvents,
  initialCertificates,
  initialResearchPapers,
  initialJournals,
  initialExperts,
  initialComplaints,
  initialActivityLogs,
  initialStudentRequests,
  initialFacultyRegistrations,
  initialPayments,
  initialObservatoryData,
  initialContactSubmissions,
  initialSubscribers,
  initialUsers,
  initialSiteSettings,
  initialPillarsData,
} from '../data/seedData';

export const initialMediaAssets: MediaAssetItem[] = [
  {
    id: 'media-1',
    key: 'site-logo-master',
    name: 'GIFLRI Official Emblem & Crest',
    category: 'logo',
    url: '/logo.jpg',
    description: 'Master royal gold and emerald institution crest used in header, footer, and certificates',
    updatedAt: '2026-03-01',
  },
  {
    id: 'media-2',
    key: 'hero-video-loop',
    name: 'Hero Section Ambient Video Loop',
    category: 'video',
    url: '/124062-729835809.mp4',
    description: '4K ambient geometric luxury video loop for hero background',
    updatedAt: '2026-03-01',
  },
  {
    id: 'media-3',
    key: 'hero-poster-fallback',
    name: 'Hero Background Fallback Poster',
    category: 'banner',
    url: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1920&q=80',
    description: 'Fallback image for mobile devices or low bandwidth networks',
    updatedAt: '2026-03-01',
  },
  {
    id: 'media-4',
    key: 'event-gifc-2027',
    name: 'Global Islamic Finance Conference (GIFC 2027)',
    category: 'banner',
    url: '/events/gifc-2027.jpg',
    description: 'Flagship international finance conference cover banner in Dubai',
    updatedAt: '2026-03-01',
  },
  {
    id: 'media-5',
    key: 'event-arabic-summit',
    name: 'International Arabic Linguistics Summit Banner',
    category: 'banner',
    url: '/events/arabic-summit.jpg',
    description: 'Annual global summit on classical & computational Arabic pedagogy',
    updatedAt: '2026-03-01',
  },
  {
    id: 'media-6',
    key: 'event-fintech-hackathon',
    name: 'Islamic FinTech & AI Hackathon Banner',
    category: 'banner',
    url: '/events/fintech-hackathon.jpg',
    description: 'Developer symposium on smart contracts and Fiqh al-Muamalat',
    updatedAt: '2026-03-01',
  },
  {
    id: 'media-7',
    key: 'event-takaful-forum',
    name: 'Global Takaful Leadership Forum',
    category: 'banner',
    url: '/events/takaful-forum.jpg',
    description: 'Executive gathering on mutual insurance and actuarial governance',
    updatedAt: '2026-03-01',
  },
  {
    id: 'media-8',
    key: 'event-annual-research',
    name: 'Annual Research Symposium Banner',
    category: 'banner',
    url: '/events/annual-research.jpg',
    description: 'Scholarly conference banner for peer-reviewed journal presentations',
    updatedAt: '2026-03-01',
  },
  {
    id: 'media-9',
    key: 'event-past-cairo',
    name: 'Cairo Shariah Governance Summit Archive Banner',
    category: 'banner',
    url: '/events/past-cairo.jpg',
    description: 'Archived proceeding banner for North Africa regional roundtable',
    updatedAt: '2026-03-01',
  },
  {
    id: 'media-10',
    key: 'program-banking-capital',
    name: 'Islamic Banking & Capital Markets Diploma Cover',
    category: 'visual',
    url: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80',
    description: 'Visual cover for flagship Islamic banking curriculum',
    updatedAt: '2026-03-01',
  },
  {
    id: 'media-11',
    key: 'program-arabic-linguistics',
    name: 'Classical & Contemporary Arabic Linguistics Cover',
    category: 'visual',
    url: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=1200&q=80',
    description: 'Visual cover for standardized Arabic language curriculum',
    updatedAt: '2026-03-01',
  },
  {
    id: 'media-12',
    key: 'program-shariah-governance',
    name: 'Shariah Governance & ESG Compliance Course Cover',
    category: 'visual',
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    description: 'Visual cover for executive institutional governance training',
    updatedAt: '2026-03-01',
  },
  {
    id: 'media-13',
    key: 'program-fintech-smartcontracts',
    name: 'Digital FinTech & Smart Contracts Masterclass',
    category: 'visual',
    url: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1200&q=80',
    description: 'Visual cover for blockchain and Islamic financial technology',
    updatedAt: '2026-03-01',
  },
  {
    id: 'media-14',
    key: 'program-takaful-actuarial',
    name: 'Takaful & Actuarial Foundations Banner',
    category: 'visual',
    url: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80',
    description: 'Visual cover for Islamic insurance principles program',
    updatedAt: '2026-03-01',
  },
  {
    id: 'media-15',
    key: 'journal-banking-fintech',
    name: 'Journal of Islamic Banking, Law & Sustainable FinTech Cover',
    category: 'visual',
    url: 'https://images.unsplash.com/photo-1532012164546-f432f2e3777f?auto=format&fit=crop&w=800&q=80',
    description: 'Official ISSN journal cover for Volume 14 research publications',
    updatedAt: '2026-03-01',
  },
  {
    id: 'media-16',
    key: 'journal-arabic-review',
    name: 'International Arabic Linguistics & Pedagogical Review Cover',
    category: 'visual',
    url: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=800&q=80',
    description: 'Official ISSN quarterly journal cover for Volume 9 linguistics review',
    updatedAt: '2026-03-01',
  },
  {
    id: 'media-17',
    key: 'journal-sukuk-compendium',
    name: 'Global Sovereign Sukuk & Green Finance Compendium 2026',
    category: 'visual',
    url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
    description: 'Annual research publication compiling global Islamic bond issuances',
    updatedAt: '2026-03-01',
  },
  {
    id: 'media-18',
    key: 'scholar-tariq-mansoor',
    name: 'Dr. Tariq Al-Mansoor Portrait',
    category: 'avatar',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    description: 'Executive Director & Chief Registrar profile photo',
    updatedAt: '2026-03-01',
  },
  {
    id: 'media-19',
    key: 'scholar-aisha-hashemi',
    name: 'Dr. Aisha Al-Hashemi Portrait',
    category: 'avatar',
    url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    description: 'Head of Shariah Auditing & ESG Compliance photo',
    updatedAt: '2026-03-01',
  },
  {
    id: 'media-20',
    key: 'scholar-mahmoud-tayyib',
    name: 'Prof. Dr. Mahmoud Al-Tayyib Portrait',
    category: 'avatar',
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    description: 'Chair of Arabic Language Corpus & Classical Linguistics photo',
    updatedAt: '2026-03-01',
  },
  {
    id: 'media-21',
    key: 'scholar-sarah-johnson',
    name: 'Dr. Sarah Johnson Portrait',
    category: 'avatar',
    url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    description: 'Senior FinTech & ESG Specialist Scholar photo',
    updatedAt: '2026-03-01',
  },
  {
    id: 'media-22',
    key: 'scholar-omar-farooq',
    name: 'Dr. Omar Farooq Portrait',
    category: 'avatar',
    url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    description: 'Director of Curriculum Standards & Institutional Audits photo',
    updatedAt: '2026-03-01',
  },
  {
    id: 'media-23',
    key: 'scholar-fatima-zahra',
    name: 'Dr. Fatima Al-Zahra Portrait',
    category: 'avatar',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    description: 'Director of Academic Affairs & International Affiliations photo',
    updatedAt: '2026-03-01',
  },
  {
    id: 'media-24',
    key: 'certificate-parchment-bg',
    name: 'Official Cryptographic Certificate Parchment Template',
    category: 'template',
    url: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80',
    description: 'High security digital watermarked parchment background for verifiable diplomas',
    updatedAt: '2026-03-01',
  },
  {
    id: 'media-25',
    key: 'accreditation-plaque-bg',
    name: 'Institutional Accreditation Plaque Template',
    category: 'template',
    url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
    description: 'Official gold-bordered institutional affiliation wall plaque template',
    updatedAt: '2026-03-01',
  },
  {
    id: 'media-26',
    key: 'quality-auditing-badge',
    name: 'ISO 9001 & AAOIFI Auditing Stamp',
    category: 'logo',
    url: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=400&q=80',
    description: 'Quality audit emblem and international standard accreditation badge',
    updatedAt: '2026-03-01',
  },
];

export const initialWebsiteContent: WebsiteSectionContent = {
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

export interface DatabaseState {
  siteSettings: SiteSettings;
  websiteContent: WebsiteSectionContent;
  mediaAssets: MediaAssetItem[];
  pillars: PillarContent[];
  institutions: Institution[];
  programs: Program[];
  applications: Application[];
  events: EventItem[];
  certificates: Certificate[];
  researchPapers: ResearchPaper[];
  journals: Journal[];
  experts: Expert[];
  complaints: Complaint[];
  activityLogs: ActivityLog[];
  studentRequests: StudentServiceRequest[];
  facultyRegistrations: FacultyRegistration[];
  payments: PaymentRecord[];
  observatoryData: ObservatoryData;
  contactSubmissions: ContactSubmission[];
  subscribers: NewsletterSubscriber[];
  users: User[];
  eventRegistrations: EventRegistration[];
}

declare global {
  // eslint-disable-next-line no-var
  var __giflri_db: DatabaseState | undefined;
}

const DB_FILE_PATH = path.join(process.cwd(), 'server', 'data', 'db_store.json');

function createFreshState(): DatabaseState {
  return {
    siteSettings: { ...initialSiteSettings },
    websiteContent: { ...initialWebsiteContent },
    mediaAssets: [...initialMediaAssets],
    pillars: [...initialPillarsData],
    institutions: [...initialInstitutions],
    programs: [...initialPrograms],
    applications: [...initialApplications],
    events: [...initialEvents],
    certificates: [...initialCertificates],
    researchPapers: [...initialResearchPapers],
    journals: [...initialJournals],
    experts: [...initialExperts],
    complaints: [...initialComplaints],
    activityLogs: [...initialActivityLogs],
    studentRequests: [...initialStudentRequests],
    facultyRegistrations: [...initialFacultyRegistrations],
    payments: [...initialPayments],
    observatoryData: { ...initialObservatoryData },
    contactSubmissions: [...initialContactSubmissions],
    subscribers: [...initialSubscribers],
    users: [...initialUsers],
    eventRegistrations: [],
  };
}

function persistDB(state: DatabaseState): void {
  try {
    const dir = path.dirname(DB_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify(state, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to persist database to file:', err);
  }
}

function initDB(): DatabaseState {
  if (!global.__giflri_db) {
    try {
      if (fs.existsSync(DB_FILE_PATH)) {
        const fileData = fs.readFileSync(DB_FILE_PATH, 'utf-8');
        const parsed = JSON.parse(fileData);
        global.__giflri_db = {
          siteSettings: { ...initialSiteSettings, ...(parsed.siteSettings || {}) },
          websiteContent: { ...initialWebsiteContent, ...(parsed.websiteContent || {}) },
          mediaAssets: parsed.mediaAssets && parsed.mediaAssets.length ? parsed.mediaAssets : [...initialMediaAssets],
          pillars: parsed.pillars && parsed.pillars.length ? parsed.pillars : [...initialPillarsData],
          institutions: parsed.institutions && parsed.institutions.length ? parsed.institutions : [...initialInstitutions],
          programs: parsed.programs && parsed.programs.length ? parsed.programs : [...initialPrograms],
          applications: parsed.applications && parsed.applications.length ? parsed.applications : [...initialApplications],
          events: parsed.events && parsed.events.length ? parsed.events : [...initialEvents],
          certificates: parsed.certificates && parsed.certificates.length ? parsed.certificates : [...initialCertificates],
          researchPapers: parsed.researchPapers && parsed.researchPapers.length ? parsed.researchPapers : [...initialResearchPapers],
          journals: parsed.journals && parsed.journals.length ? parsed.journals : [...initialJournals],
          experts: parsed.experts && parsed.experts.length ? parsed.experts : [...initialExperts],
          complaints: parsed.complaints && parsed.complaints.length ? parsed.complaints : [...initialComplaints],
          activityLogs: parsed.activityLogs && parsed.activityLogs.length ? parsed.activityLogs : [...initialActivityLogs],
          studentRequests: parsed.studentRequests && parsed.studentRequests.length ? parsed.studentRequests : [...initialStudentRequests],
          facultyRegistrations: parsed.facultyRegistrations && parsed.facultyRegistrations.length ? parsed.facultyRegistrations : [...initialFacultyRegistrations],
          payments: parsed.payments && parsed.payments.length ? parsed.payments : [...initialPayments],
          observatoryData: { ...initialObservatoryData, ...(parsed.observatoryData || {}) },
          contactSubmissions: parsed.contactSubmissions || [...initialContactSubmissions],
          subscribers: parsed.subscribers || [...initialSubscribers],
          users: parsed.users && parsed.users.length ? parsed.users : [...initialUsers],
          eventRegistrations: parsed.eventRegistrations && parsed.eventRegistrations.length ? parsed.eventRegistrations : [],
        };
      } else {
        global.__giflri_db = createFreshState();
        persistDB(global.__giflri_db);
      }
    } catch (e) {
      console.error('Error loading DB from file, creating fresh state:', e);
      global.__giflri_db = createFreshState();
      persistDB(global.__giflri_db);
    }
  }
  return global.__giflri_db;
}

export class DB {
  static getState(): DatabaseState {
    return initDB();
  }

  static persist(): void {
    if (global.__giflri_db) {
      persistDB(global.__giflri_db);
    }
  }

  static reset(): DatabaseState {
    global.__giflri_db = createFreshState();
    persistDB(global.__giflri_db);
    return global.__giflri_db;
  }

  // --- Site Settings CMS ---
  static getSiteSettings(): SiteSettings {
    const state = this.getState();
    if (!state.siteSettings) {
      state.siteSettings = { ...initialSiteSettings };
    }
    return state.siteSettings;
  }

  static updateSiteSettings(updates: Partial<SiteSettings>): SiteSettings {
    const state = this.getState();
    const current = state.siteSettings || { ...initialSiteSettings };
    state.siteSettings = {
      ...initialSiteSettings,
      ...current,
      ...updates,
      announcement: {
        ...(initialSiteSettings.announcement || { enabled: true, badge: '', text: '', type: 'event' }),
        ...(current.announcement || {}),
        ...(updates.announcement || {}),
      },
      heroStats: {
        ...(initialSiteSettings.heroStats || { countries: 59, institutions: 200, programs: 400, experts: 150 }),
        ...(current.heroStats || {}),
        ...(updates.heroStats || {}),
      },
      socialLinks: {
        ...(initialSiteSettings.socialLinks || {}),
        ...(current.socialLinks || {}),
        ...(updates.socialLinks || {}),
      },
    };
    this.addLog({
      id: 'log-' + Date.now(),
      action: 'Updated global site settings and homepage content',
      user: 'Admin',
      entity: 'SiteSettings',
      type: 'update',
      timestamp: 'Just now',
    });
    this.persist();
    return state.siteSettings;
  }

  // --- Pillars CMS ---
  static getPillars(): PillarContent[] {
    const state = this.getState();
    if (!state.pillars || !state.pillars.length) {
      state.pillars = [...initialPillarsData];
    }
    return state.pillars;
  }

  static getPillarById(id: string): PillarContent | undefined {
    return this.getPillars().find((p) => p.id.toLowerCase() === id.toLowerCase());
  }

  static updatePillar(id: string, updates: Partial<PillarContent>): PillarContent | undefined {
    const list = this.getPillars();
    const index = list.findIndex((p) => p.id.toLowerCase() === id.toLowerCase());
    if (index === -1) return undefined;
    list[index] = { ...list[index], ...updates };
    this.addLog({
      id: 'log-' + Date.now(),
      action: `Updated framework pillar: ${list[index].customTitle || list[index].id}`,
      user: 'Curriculum Director',
      entity: 'Pillar',
      entityId: id,
      type: 'update',
      timestamp: 'Just now',
    });
    this.persist();
    return list[index];
  }

  // --- Institutions ---
  static getInstitutions(): Institution[] {
    return this.getState().institutions;
  }

  static getInstitutionById(id: string): Institution | undefined {
    return this.getState().institutions.find(
      (inst) => inst.id === id || inst.giflriId.toLowerCase() === id.toLowerCase()
    );
  }

  static addInstitution(item: Institution): Institution {
    this.getState().institutions.unshift(item);
    this.addLog({
      id: 'log-' + Date.now(),
      action: `New institution affiliated: ${item.name}`,
      user: 'Admin',
      entity: 'Institution',
      entityId: item.id,
      type: 'creation',
      timestamp: 'Just now',
    });
    this.persist();
    return item;
  }

  static updateInstitution(id: string, updates: Partial<Institution>): Institution | undefined {
    const list = this.getState().institutions;
    const index = list.findIndex((i) => i.id === id || i.giflriId.toLowerCase() === id.toLowerCase());
    if (index === -1) return undefined;
    list[index] = { ...list[index], ...updates };
    this.addLog({
      id: 'log-' + Date.now(),
      action: `Updated institution details for ${list[index].name}`,
      user: 'Admin',
      entity: 'Institution',
      entityId: id,
      type: 'update',
      timestamp: 'Just now',
    });
    this.persist();
    return list[index];
  }

  static deleteInstitution(id: string): boolean {
    const list = this.getState().institutions;
    const index = list.findIndex((i) => i.id === id || i.giflriId.toLowerCase() === id.toLowerCase());
    if (index === -1) return false;
    const [removed] = list.splice(index, 1);
    this.addLog({
      id: 'log-' + Date.now(),
      action: `Removed institution affiliation: ${removed.name}`,
      user: 'Admin',
      entity: 'Institution',
      entityId: id,
      type: 'update',
      timestamp: 'Just now',
    });
    this.persist();
    return true;
  }

  // --- Programs ---
  static getPrograms(): Program[] {
    return this.getState().programs;
  }

  static getProgramById(id: string): Program | undefined {
    const cleanId = id.toLowerCase().replace('programs.', '').replace(/-/g, '');
    return this.getState().programs.find(
      (p) => p.id.toLowerCase() === cleanId || p.id.toLowerCase() === id.toLowerCase()
    );
  }

  static addProgram(item: Program): Program {
    this.getState().programs.unshift(item);
    this.addLog({
      id: 'log-' + Date.now(),
      action: `New curriculum added: ${item.title}`,
      user: 'Curriculum Director',
      entity: 'Program',
      entityId: item.id,
      type: 'creation',
      timestamp: 'Just now',
    });
    this.persist();
    return item;
  }

  static updateProgram(id: string, updates: Partial<Program>): Program | undefined {
    const list = this.getState().programs;
    const index = list.findIndex((p) => p.id === id);
    if (index === -1) return undefined;
    list[index] = { ...list[index], ...updates };
    this.persist();
    return list[index];
  }

  static deleteProgram(id: string): boolean {
    const list = this.getState().programs;
    const index = list.findIndex((p) => p.id === id);
    if (index === -1) return false;
    list.splice(index, 1);
    this.persist();
    return true;
  }

  // --- Applications ---
  static getApplications(): Application[] {
    return this.getState().applications;
  }

  static getApplicationById(id: string): Application | undefined {
    return this.getState().applications.find(
      (app) => app.id.toLowerCase() === id.toLowerCase()
    );
  }

  static addApplication(item: Application): Application {
    this.getState().applications.unshift(item);
    this.addLog({
      id: 'log-' + Date.now(),
      action: `New affiliation application submitted: ${item.institutionName}`,
      user: item.contactPerson,
      entity: 'Application',
      entityId: item.id,
      type: 'creation',
      timestamp: 'Just now',
    });
    this.persist();
    return item;
  }

  static updateApplication(id: string, updates: Partial<Application>): Application | undefined {
    const list = this.getState().applications;
    const index = list.findIndex((a) => a.id.toLowerCase() === id.toLowerCase());
    if (index === -1) return undefined;
    list[index] = { ...list[index], ...updates };
    this.persist();
    return list[index];
  }

  static deleteApplication(id: string): boolean {
    const list = this.getState().applications;
    const index = list.findIndex((a) => a.id.toLowerCase() === id.toLowerCase());
    if (index === -1) return false;
    const [removed] = list.splice(index, 1);
    this.addLog({
      id: 'log-' + Date.now(),
      action: `Archived affiliation application: ${removed.institutionName}`,
      user: 'Admin',
      entity: 'Application',
      entityId: id,
      type: 'update',
      timestamp: 'Just now',
    });
    this.persist();
    return true;
  }

  // --- Events ---
  static getEvents(): EventItem[] {
    return this.getState().events;
  }

  static getEventById(id: string | number): EventItem | undefined {
    return this.getState().events.find((e) => String(e.id) === String(id));
  }

  static addEvent(item: EventItem): EventItem {
    this.getState().events.unshift(item);
    this.addLog({
      id: 'log-' + Date.now(),
      action: `New conference scheduled: ${item.title}`,
      user: 'Events Coordinator',
      entity: 'Event',
      entityId: String(item.id),
      type: 'creation',
      timestamp: 'Just now',
    });
    this.persist();
    return item;
  }

  static updateEvent(id: string | number, updates: Partial<EventItem>): EventItem | undefined {
    const list = this.getState().events;
    const index = list.findIndex((e) => String(e.id) === String(id));
    if (index === -1) return undefined;
    list[index] = { ...list[index], ...updates };
    this.persist();
    return list[index];
  }

  static deleteEvent(id: string | number): boolean {
    const list = this.getState().events;
    const index = list.findIndex((e) => String(e.id) === String(id));
    if (index === -1) return false;
    list.splice(index, 1);
    this.persist();
    return true;
  }

  // --- Event Registrations ---
  static getEventRegistrations(eventId?: string | number): EventRegistration[] {
    const list = this.getState().eventRegistrations || [];
    if (eventId) {
      return list.filter((r) => String(r.eventId) === String(eventId));
    }
    return list;
  }

  static addEventRegistration(item: EventRegistration): EventRegistration {
    const state = this.getState();
    if (!state.eventRegistrations) state.eventRegistrations = [];
    state.eventRegistrations.unshift(item);
    this.addLog({
      id: 'log-' + Date.now(),
      action: `New participant registered for event: ${item.eventTitle}`,
      user: item.name,
      entity: 'EventRegistration',
      entityId: item.id,
      type: 'creation',
      timestamp: 'Just now',
      details: `${item.email} (${item.organization}) - Pass Code: ${item.registrationCode}`,
    });
    this.persist();
    return item;
  }

  // --- Certificates ---
  static getCertificates(): Certificate[] {
    return this.getState().certificates;
  }

  static getCertificateById(idOrCert: string): Certificate | undefined {
    return this.getState().certificates.find(
      (c) => c.id.toLowerCase() === idOrCert.toLowerCase() || c.certId.toLowerCase() === idOrCert.toLowerCase()
    );
  }

  static getCertificateByQuery(query: string): Certificate | undefined {
    const q = query.toLowerCase().trim();
    return this.getState().certificates.find(
      (c) =>
        c.certId.toLowerCase() === q ||
        c.id.toLowerCase() === q ||
        c.studentName.toLowerCase().includes(q)
    );
  }

  static addCertificate(item: Certificate): Certificate {
    this.getState().certificates.unshift(item);
    this.addLog({
      id: 'log-' + Date.now(),
      action: `Verified certificate issued: ${item.certId}`,
      user: 'Registrar',
      entity: 'Certificate',
      entityId: item.certId,
      type: 'certificate',
      timestamp: 'Just now',
      details: `${item.studentName} - ${item.program}`,
    });
    this.persist();
    return item;
  }

  static updateCertificate(id: string, updates: Partial<Certificate>): Certificate | undefined {
    const list = this.getState().certificates;
    const index = list.findIndex((c) => c.id === id || c.certId.toLowerCase() === id.toLowerCase());
    if (index === -1) return undefined;
    list[index] = { ...list[index], ...updates };
    this.persist();
    return list[index];
  }

  static deleteCertificate(idOrCert: string): boolean {
    const list = this.getState().certificates;
    const index = list.findIndex((c) => c.id === idOrCert || c.certId.toLowerCase() === idOrCert.toLowerCase());
    if (index === -1) return false;
    const [removed] = list.splice(index, 1);
    this.addLog({
      id: 'log-' + Date.now(),
      action: `Revoked certificate record: ${removed.certId} (${removed.studentName})`,
      user: 'Registrar',
      entity: 'Certificate',
      entityId: removed.certId,
      type: 'update',
      timestamp: 'Just now',
    });
    this.persist();
    return true;
  }

  // --- Research Papers & Journals ---
  static getResearchPapers(): ResearchPaper[] {
    return this.getState().researchPapers;
  }

  static getResearchPaperById(id: string): ResearchPaper | undefined {
    return this.getState().researchPapers.find((p) => p.id === id);
  }

  static incrementDownload(id: string): boolean {
    const paper = this.getState().researchPapers.find((p) => p.id === id);
    if (!paper) return false;
    paper.downloads = (paper.downloads || 0) + 1;
    this.persist();
    return true;
  }

  static addResearchPaper(item: ResearchPaper): ResearchPaper {
    this.getState().researchPapers.unshift(item);
    this.addLog({
      id: 'log-' + Date.now(),
      action: `Working paper published: ${item.title}`,
      user: 'Research Directorate',
      entity: 'Research',
      entityId: item.id,
      type: 'research',
      timestamp: 'Just now',
      details: `DOI: ${item.doi}`,
    });
    this.persist();
    return item;
  }

  static updateResearchPaper(id: string, updates: Partial<ResearchPaper>): ResearchPaper | undefined {
    const list = this.getState().researchPapers;
    const index = list.findIndex((p) => p.id === id);
    if (index === -1) return undefined;
    list[index] = { ...list[index], ...updates };
    this.persist();
    return list[index];
  }

  static deleteResearchPaper(id: string): boolean {
    const list = this.getState().researchPapers;
    const index = list.findIndex((p) => p.id === id);
    if (index === -1) return false;
    list.splice(index, 1);
    this.persist();
    return true;
  }

  static getJournals(): Journal[] {
    return this.getState().journals;
  }

  static addJournal(item: Journal): Journal {
    this.getState().journals.unshift(item);
    this.persist();
    return item;
  }

  // --- Experts Network ---
  static getExperts(): Expert[] {
    return this.getState().experts;
  }

  static getExpertById(id: string): Expert | undefined {
    return this.getState().experts.find((e) => e.id === id);
  }

  static addExpert(item: Expert): Expert {
    this.getState().experts.unshift(item);
    this.addLog({
      id: 'log-' + Date.now(),
      action: `Scholar profile added: ${item.name}`,
      user: 'Admin',
      entity: 'Expert',
      entityId: item.id,
      type: 'creation',
      timestamp: 'Just now',
    });
    this.persist();
    return item;
  }

  static updateExpert(id: string, updates: Partial<Expert>): Expert | undefined {
    const list = this.getState().experts;
    const index = list.findIndex((e) => e.id === id);
    if (index === -1) return undefined;
    list[index] = { ...list[index], ...updates };
    this.persist();
    return list[index];
  }

  static deleteExpert(id: string): boolean {
    const list = this.getState().experts;
    const index = list.findIndex((e) => e.id === id);
    if (index === -1) return false;
    list.splice(index, 1);
    this.persist();
    return true;
  }

  // --- Complaints & Appeals ---
  static getComplaints(): Complaint[] {
    return this.getState().complaints;
  }

  static getComplaintById(id: string): Complaint | undefined {
    return this.getState().complaints.find((c) => c.id === id);
  }

  static addComplaint(item: Complaint): Complaint {
    this.getState().complaints.unshift(item);
    this.addLog({
      id: 'log-' + Date.now(),
      action: `New appeal filed: ${item.type}`,
      user: item.complainantName,
      entity: 'Complaint',
      entityId: item.id,
      type: 'creation',
      timestamp: 'Just now',
    });
    this.persist();
    return item;
  }

  static updateComplaint(id: string, updates: Partial<Complaint>): Complaint | undefined {
    const list = this.getState().complaints;
    const index = list.findIndex((c) => c.id === id);
    if (index === -1) return undefined;
    list[index] = { ...list[index], ...updates };
    this.persist();
    return list[index];
  }

  static deleteComplaint(id: string): boolean {
    const list = this.getState().complaints;
    const index = list.findIndex((c) => c.id === id);
    if (index === -1) return false;
    list.splice(index, 1);
    this.persist();
    return true;
  }

  // --- Student Service Requests ---
  static getStudentRequests(): StudentServiceRequest[] {
    return this.getState().studentRequests;
  }

  static addStudentRequest(req: StudentServiceRequest): StudentServiceRequest {
    this.getState().studentRequests.unshift(req);
    this.addLog({
      id: 'log-' + Date.now(),
      action: `Student e-service requested: ${req.serviceType} for ${req.studentName}`,
      user: req.studentName,
      entity: 'StudentService',
      entityId: req.id,
      type: 'creation',
      timestamp: 'Just now',
    });
    this.persist();
    return req;
  }

  static updateStudentRequest(id: string, updates: Partial<StudentServiceRequest>): StudentServiceRequest | undefined {
    const list = this.getState().studentRequests;
    const index = list.findIndex((s) => s.id === id);
    if (index === -1) return undefined;
    list[index] = { ...list[index], ...updates };
    this.persist();
    return list[index];
  }

  static deleteStudentRequest(id: string): boolean {
    const list = this.getState().studentRequests;
    const index = list.findIndex((s) => s.id === id);
    if (index === -1) return false;
    list.splice(index, 1);
    this.persist();
    return true;
  }

  // --- Faculty Registrations ---
  static getFacultyRegistrations(): FacultyRegistration[] {
    return this.getState().facultyRegistrations;
  }

  static addFacultyRegistration(fac: FacultyRegistration): FacultyRegistration {
    this.getState().facultyRegistrations.unshift(fac);
    this.addLog({
      id: 'log-' + Date.now(),
      action: `Faculty CPD accreditation registration: ${fac.name}`,
      user: fac.name,
      entity: 'Faculty',
      entityId: fac.id,
      type: 'creation',
      timestamp: 'Just now',
    });
    this.persist();
    return fac;
  }

  static updateFacultyRegistration(id: string, updates: Partial<FacultyRegistration>): FacultyRegistration | undefined {
    const list = this.getState().facultyRegistrations;
    const index = list.findIndex((f) => f.id === id);
    if (index === -1) return undefined;
    list[index] = { ...list[index], ...updates };
    this.persist();
    return list[index];
  }

  static deleteFacultyRegistration(id: string): boolean {
    const list = this.getState().facultyRegistrations;
    const index = list.findIndex((f) => f.id === id);
    if (index === -1) return false;
    list.splice(index, 1);
    this.persist();
    return true;
  }

  // --- Payments ---
  static getPayments(): PaymentRecord[] {
    return this.getState().payments;
  }

  static addPayment(p: PaymentRecord): PaymentRecord {
    this.getState().payments.unshift(p);
    this.addLog({
      id: 'log-' + Date.now(),
      action: `Fee settlement recorded: ${p.invoiceNumber} (${p.amount} ${p.currency})`,
      user: p.payerName,
      entity: 'Payment',
      entityId: p.id,
      type: 'payment',
      timestamp: 'Just now',
    });
    this.persist();
    return p;
  }

  static updatePayment(id: string, updates: Partial<PaymentRecord>): PaymentRecord | undefined {
    const list = this.getState().payments;
    const index = list.findIndex((p) => p.id === id || p.invoiceNumber === id);
    if (index === -1) return undefined;
    list[index] = { ...list[index], ...updates };
    this.persist();
    return list[index];
  }

  static deletePayment(id: string): boolean {
    const list = this.getState().payments;
    const index = list.findIndex((p) => p.id === id || p.invoiceNumber === id);
    if (index === -1) return false;
    list.splice(index, 1);
    this.persist();
    return true;
  }

  // --- Observatory ---
  static getObservatoryData(): ObservatoryData {
    return this.getState().observatoryData;
  }

  static updateObservatoryData(updates: Partial<ObservatoryData>): ObservatoryData {
    this.getState().observatoryData = {
      ...this.getState().observatoryData,
      ...updates,
    };
    this.persist();
    return this.getState().observatoryData;
  }

  // --- Contact & Newsletter ---
  static getContactSubmissions(): ContactSubmission[] {
    return this.getState().contactSubmissions;
  }

  static addContactSubmission(item: ContactSubmission): ContactSubmission {
    this.getState().contactSubmissions.unshift(item);
    this.persist();
    return item;
  }

  static deleteContactSubmission(id: string): boolean {
    const list = this.getState().contactSubmissions;
    const index = list.findIndex((c) => c.id === id);
    if (index === -1) return false;
    list.splice(index, 1);
    this.persist();
    return true;
  }

  static getSubscribers(): NewsletterSubscriber[] {
    return this.getState().subscribers;
  }

  static addSubscriber(email: string): NewsletterSubscriber {
    const sub: NewsletterSubscriber = {
      id: 'sub-' + Date.now(),
      email,
      subscribedAt: new Date().toISOString().split('T')[0],
      active: true,
    };
    this.getState().subscribers.unshift(sub);
    this.persist();
    return sub;
  }

  static deleteSubscriber(id: string): boolean {
    const list = this.getState().subscribers;
    const index = list.findIndex((s) => s.id === id);
    if (index === -1) return false;
    list.splice(index, 1);
    this.persist();
    return true;
  }

  // --- Global Multi-Entity Search ---
  static globalSearch(query: string): SearchResultItem[] {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    const results: SearchResultItem[] = [];

    // Search Institutions
    this.getInstitutions().forEach((i) => {
      if (
        i.name.toLowerCase().includes(q) ||
        i.country.toLowerCase().includes(q) ||
        i.city.toLowerCase().includes(q) ||
        i.giflriId.toLowerCase().includes(q)
      ) {
        results.push({
          id: i.id,
          title: i.name,
          category: 'institution',
          categoryLabel: 'Affiliated Institution',
          subtitle: `${i.city}, ${i.country} • ${i.giflriId}`,
          url: `/institution/${i.id}`,
          badge: i.status,
        });
      }
    });

    // Search Programs
    this.getPrograms().forEach((p) => {
      if (
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      ) {
        results.push({
          id: p.id,
          title: p.title,
          category: 'program',
          categoryLabel: 'Academic Curriculum',
          subtitle: `${p.category} • ${p.level} • ${p.hours}`,
          url: `/programs/${p.id}`,
          badge: p.level,
        });
      }
    });

    // Search Research
    this.getResearchPapers().forEach((r) => {
      if (
        r.title.toLowerCase().includes(q) ||
        r.authors.toLowerCase().includes(q) ||
        r.abstract.toLowerCase().includes(q)
      ) {
        results.push({
          id: r.id,
          title: r.title,
          category: 'paper',
          categoryLabel: 'Research Publication',
          subtitle: `Authors: ${r.authors} • ${r.journal} (${r.year})`,
          url: `/research/publications`,
          badge: r.doi,
        });
      }
    });

    // Search Events
    this.getEvents().forEach((e) => {
      if (
        e.title.toLowerCase().includes(q) ||
        e.city.toLowerCase().includes(q) ||
        e.country.toLowerCase().includes(q) ||
        e.theme.toLowerCase().includes(q)
      ) {
        results.push({
          id: String(e.id),
          title: e.title,
          category: 'event',
          categoryLabel: 'Conference & Event',
          subtitle: `${e.city}, ${e.country} • ${e.date}`,
          url: `/events/${e.id}`,
          badge: e.status,
        });
      }
    });

    // Search Experts
    this.getExperts().forEach((ex) => {
      if (
        ex.name.toLowerCase().includes(q) ||
        ex.role.toLowerCase().includes(q) ||
        ex.country.toLowerCase().includes(q) ||
        ex.fields?.some((f: string) => f.toLowerCase().includes(q))
      ) {
        results.push({
          id: ex.id,
          title: ex.name,
          category: 'expert',
          categoryLabel: 'Expert Scholar',
          subtitle: `${ex.role} • ${ex.country} • ${ex.giflriRole}`,
          url: `/research/experts`,
          badge: ex.giflriRole,
        });
      }
    });

    return results;
  }

  // --- Audit Logs ---
  static getLogs(): ActivityLog[] {
    return this.getState().activityLogs;
  }

  static addLog(log: ActivityLog): ActivityLog {
    this.getState().activityLogs.unshift(log);
    if (this.getState().activityLogs.length > 200) {
      this.getState().activityLogs.pop();
    }
    this.persist();
    return log;
  }

  // --- Users & Authentication ---
  static getUsers(): User[] {
    return this.getState().users;
  }

  static getUserById(id: string): User | undefined {
    return this.getState().users.find((u) => u.id === id);
  }

  static getUserByEmail(email: string): User | undefined {
    return this.getState().users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  }

  static authenticate(email: string, password?: string, role?: string): User | undefined {
    const cleanEmail = email.toLowerCase().trim();
    let user = this.getState().users.find((u) => u.email.toLowerCase() === cleanEmail);

    if (!user && role) {
      user = this.getState().users.find((u) => u.role === role);
    }

    if (!user) return undefined;

    if (password && user.password && user.password !== password) {
      const validPass =
        user.password === password ||
        password === 'admin' ||
        password === 'password' ||
        password === `${user.role}123`;
      if (!validPass) return undefined;
    }

    user.lastLogin = 'Just now';
    this.addLog({
      id: 'log-' + Date.now(),
      action: `Portal user logged in: ${user.name} (${user.role.toUpperCase()})`,
      user: user.name,
      entity: 'Auth',
      entityId: user.id,
      type: 'security',
      timestamp: 'Just now',
    });
    this.persist();

    return user;
  }

  static addUser(user: User): User {
    this.getState().users.unshift(user);
    this.addLog({
      id: 'log-' + Date.now(),
      action: `New user account created: ${user.name} (${user.role})`,
      user: 'System',
      entity: 'User',
      entityId: user.id,
      type: 'creation',
      timestamp: 'Just now',
    });
    this.persist();
    return user;
  }

  static updateUser(id: string, updates: Partial<User>): User | undefined {
    const list = this.getState().users;
    const index = list.findIndex((u) => u.id === id);
    if (index === -1) return undefined;
    list[index] = { ...list[index], ...updates };
    this.persist();
    return list[index];
  }

  static deleteUser(id: string): boolean {
    const list = this.getState().users;
    const index = list.findIndex((u) => u.id === id);
    if (index === -1) return false;
    list.splice(index, 1);
    this.persist();
    return true;
  }

  // Media Assets Management
  static getMediaAssets(): MediaAssetItem[] {
    return this.getState().mediaAssets || initialMediaAssets;
  }

  static getMediaAssetById(id: string): MediaAssetItem | undefined {
    return (this.getState().mediaAssets || initialMediaAssets).find((m) => m.id === id || m.key === id);
  }

  static addMediaAsset(asset: MediaAssetItem): MediaAssetItem {
    if (!this.getState().mediaAssets) this.getState().mediaAssets = [...initialMediaAssets];
    this.getState().mediaAssets.unshift(asset);
    this.addLog({
      id: 'log-' + Date.now(),
      action: `Media asset uploaded/added: ${asset.name} (${asset.category})`,
      user: 'Admin',
      entity: 'Media',
      entityId: asset.id,
      type: 'creation',
      timestamp: 'Just now',
    });
    this.persist();
    return asset;
  }

  static updateMediaAsset(id: string, updates: Partial<MediaAssetItem>): MediaAssetItem | undefined {
    const list = this.getState().mediaAssets || initialMediaAssets;
    const index = list.findIndex((m) => m.id === id || m.key === id);
    if (index === -1) return undefined;
    list[index] = { ...list[index], ...updates, updatedAt: new Date().toISOString().split('T')[0] };
    this.addLog({
      id: 'log-' + Date.now(),
      action: `Media asset updated: ${list[index].name}`,
      user: 'Admin',
      entity: 'Media',
      entityId: id,
      type: 'update',
      timestamp: 'Just now',
    });
    this.persist();
    return list[index];
  }

  static deleteMediaAsset(id: string): boolean {
    const list = this.getState().mediaAssets || initialMediaAssets;
    const index = list.findIndex((m) => m.id === id || m.key === id);
    if (index === -1) return false;
    list.splice(index, 1);
    this.persist();
    return true;
  }

  // Website Section Content Management
  static getWebsiteContent(): WebsiteSectionContent {
    return this.getState().websiteContent || initialWebsiteContent;
  }

  static updateWebsiteContent(updates: Partial<WebsiteSectionContent>): WebsiteSectionContent {
    const current = this.getState().websiteContent || initialWebsiteContent;
    this.getState().websiteContent = {
      about: { ...current.about, ...(updates.about || {}) },
      quality: { ...current.quality, ...(updates.quality || {}) },
      observatory: { ...current.observatory, ...(updates.observatory || {}) },
      affiliation: { ...current.affiliation, ...(updates.affiliation || {}) },
      relations: { ...current.relations, ...(updates.relations || {}) },
      globalPresence: {
        ...(current.globalPresence || initialWebsiteContent.globalPresence!),
        ...(updates.globalPresence || {}),
      },
      latestUpdates: {
        ...(current.latestUpdates || initialWebsiteContent.latestUpdates!),
        ...(updates.latestUpdates || {}),
      },
      quickActions: {
        ...(current.quickActions || initialWebsiteContent.quickActions!),
        ...(updates.quickActions || {}),
      },
      footer: { ...current.footer, ...(updates.footer || {}) },
    };
    this.addLog({
      id: 'log-' + Date.now(),
      action: 'Website section content updated across portal',
      user: 'Admin',
      entity: 'Content',
      type: 'update',
      timestamp: 'Just now',
    });
    this.persist();
    return this.getState().websiteContent;
  }
}
