export interface SearchItem {
  id: string;
  title: string;
  titleAr?: string;
  description: string;
  category: 'Pages' | 'Programs' | 'Research' | 'Affiliation' | 'Experts' | 'Countries' | 'Verification';
  href: string;
  keywords: string[];
  badge?: string;
}

export const searchableData: SearchItem[] = [
  // Core Pages
  {
    id: 'page-home',
    title: 'GIFLRI Home Portal',
    titleAr: 'الرئيسية - بوابة GIFLRI',
    description: 'Global Islamic Finance & Language Research Institution official homepage.',
    category: 'Pages',
    href: '/',
    keywords: ['home', 'main', 'portal', 'giflri', 'welcome', 'start', 'landing'],
    badge: 'Core',
  },
  {
    id: 'page-opening',
    title: '59 Nations Opening & Inaugural Convergence',
    titleAr: 'حفل الافتتاح والتقارب لـ 59 دولة',
    description: 'Inaugural convergence ceremony uniting 59 sovereign member states under the sacred mandate of IQRA.',
    category: 'Pages',
    href: '/opening',
    keywords: ['opening', 'ceremony', 'iqra', 'inaugural', '59 countries', 'member states', 'convergence', 'flags', 'launch'],
    badge: 'Ceremony',
  },
  {
    id: 'page-about',
    title: 'About GIFLRI Directorate & Mission',
    titleAr: 'عن معهد GIFLRI والرسالة',
    description: 'Institutional governance, global mission, ethics, and strategic horizon.',
    category: 'Pages',
    href: '/about',
    keywords: ['about', 'mission', 'vision', 'governance', 'board', 'who we are', 'history', 'leadership'],
    badge: 'About',
  },
  {
    id: 'page-pillars',
    title: 'Strategic Horizon & Institutional Pillars',
    titleAr: 'الأركان الاستراتيجية',
    description: 'The four core pillars: Ethical Finance, Arabic Mastery, Quality Assurance, and Sovereign Affiliation.',
    category: 'Pages',
    href: '/pillars',
    keywords: ['pillars', 'strategy', 'ethical finance', 'arabic mastery', 'principles', 'standards'],
    badge: 'Strategic',
  },
  {
    id: 'page-affiliation',
    title: 'Institutional Affiliation Hub & Matrix',
    titleAr: 'مركز الانتماء الأكاديمي والمصفوفة',
    description: 'Accreditation pathways, university affiliation criteria, and membership application.',
    category: 'Affiliation',
    href: '/affiliation',
    keywords: ['affiliation', 'accreditation', 'join', 'partner', 'university', 'college', 'institute', 'matrix'],
    badge: 'Accreditation',
  },
  {
    id: 'page-affiliation-apply',
    title: 'Apply for Official Institutional Affiliation',
    titleAr: 'تقديم طلب الانتماء المؤسسي الرسمي',
    description: 'Submit an application for institutional evaluation and formal academic recognition.',
    category: 'Affiliation',
    href: '/affiliation/apply',
    keywords: ['apply', 'application', 'enroll institution', 'affiliation form', 'submit application'],
    badge: 'Portal',
  },
  {
    id: 'page-quality',
    title: 'Global Quality Assurance Framework',
    titleAr: 'إطار ضمان الجودة العالمي',
    description: 'ISO-aligned audit standards, Shariah compliance governance, and syllabus benchmarking.',
    category: 'Affiliation',
    href: '/quality',
    keywords: ['quality', 'qa', 'audit', 'iso', 'benchmarking', 'compliance', 'standards', 'governance'],
    badge: 'Standards',
  },
  {
    id: 'page-verify',
    title: 'Public Credential & Certificate Verification',
    titleAr: 'التحقق من الشهادات والوثائق الرسمية',
    description: 'Verify diplomas, affiliations, and institutional certificates with immutable QR & SHA-256 verification.',
    category: 'Verification',
    href: '/verify',
    keywords: ['verify', 'verification', 'certificate', 'credential', 'check', 'qr', 'authenticity', 'lookup', 'id'],
    badge: 'Official',
  },
  {
    id: 'page-observatory',
    title: 'Global Intelligence & Research Observatory',
    titleAr: 'المرصد العالمي للمعلومات والبحوث',
    description: 'Real-time metrics, global research analytics, and member state performance indicators.',
    category: 'Research',
    href: '/observatory',
    keywords: ['observatory', 'intelligence', 'metrics', 'analytics', 'data', 'indicators', 'insights'],
    badge: 'Analytics',
  },
  {
    id: 'page-directory',
    title: 'Global Presence & Affiliated University Directory',
    titleAr: 'دليل الجامعات والمؤسسات التابعة حول العالم',
    description: 'Interactive map and database of accredited institutions across 59 member nations.',
    category: 'Affiliation',
    href: '/directory',
    keywords: ['directory', 'institutions', 'universities', 'members', 'map', 'global network', 'countries'],
    badge: 'Network',
  },
  {
    id: 'page-ai',
    title: 'GIFLRI AI Academic Assistant',
    titleAr: 'المساعد الأكاديمي الذكي GIFLRI AI',
    description: 'Interactive intelligence assistant for Islamic jurisprudence, Arabic semantics, and institutional queries.',
    category: 'Pages',
    href: '/ai',
    keywords: ['ai', 'assistant', 'ask ai', 'chatbot', 'intelligence', 'gpt', 'shariah ai', 'guidance'],
    badge: 'AI Tech',
  },

  // Academic Programs
  {
    id: 'prog-1',
    title: 'Executive Master in Islamic Finance & Shariah Governance',
    titleAr: 'الماجستير التنفيذي في التمويل الإسلامي والحوكمة الشرعية',
    description: 'Advanced postgraduate curriculum covering Sukuk structuring, Takaful insurance, and Islamic asset management.',
    category: 'Programs',
    href: '/programs',
    keywords: ['master', 'islamic finance', 'shariah', 'sukuk', 'takaful', 'banking', 'governance', 'curriculum'],
    badge: 'Master',
  },
  {
    id: 'prog-2',
    title: 'Advanced Arabic Computational Linguistics & NLP Diploma',
    titleAr: 'دبلوم اللسانيات الحاسوبية العربية المتقدمة',
    description: 'State-of-the-art computational analysis of classical and contemporary Arabic semantic structures.',
    category: 'Programs',
    href: '/programs',
    keywords: ['arabic', 'linguistics', 'nlp', 'language', 'computational', 'grammar', 'semantics', 'diploma'],
    badge: 'Diploma',
  },
  {
    id: 'prog-3',
    title: 'Islamic Fintech, Blockchain & Smart Contracts Certification',
    titleAr: 'شهادة التكنولوجيا المالية الإسلامية والبلوكشين',
    description: 'Decentralized ethical finance, smart contracts in Shariah compliance, and digital banking frameworks.',
    category: 'Programs',
    href: '/programs',
    keywords: ['fintech', 'blockchain', 'crypto', 'smart contracts', 'digital banking', 'technology', 'innovation'],
    badge: 'Certificate',
  },
  {
    id: 'prog-4',
    title: 'Halal Economy, Trade Auditing & Global Standards',
    titleAr: 'معايير وتدقيق الاقتصاد والتجارة الحلال العالمية',
    description: 'Global food, pharmaceutical, and logistics auditing in accordance with international Halal compliance.',
    category: 'Programs',
    href: '/programs',
    keywords: ['halal', 'trade', 'auditing', 'supply chain', 'standards', 'certification', 'economy'],
    badge: 'Audit',
  },

  // Research Publications
  {
    id: 'res-1',
    title: 'Global Islamic Finance Stability Report 2026',
    titleAr: 'تقرير استقرار التمويل الإسلامي العالمي 2026',
    description: 'Peer-reviewed institutional report on cross-border liquidity and resilient Islamic banking systems.',
    category: 'Research',
    href: '/research',
    keywords: ['stability report', 'liquidity', 'research paper', 'doi', 'journal', 'banking report', 'publications'],
    badge: 'Report',
  },
  {
    id: 'res-2',
    title: 'Cross-Border Sukuk Structuring & Risk Mitigation Frameworks',
    titleAr: 'أطر هيكلة الصكوك العابرة للحدود وإدارة المخاطر',
    description: 'Methodology for Sovereign and Green Sukuk issuances in emerging and developed markets.',
    category: 'Research',
    href: '/research',
    keywords: ['sukuk', 'bonds', 'green sukuk', 'structuring', 'risk', 'capital markets', 'research'],
    badge: 'Whitepaper',
  },
  {
    id: 'res-3',
    title: 'Arabic Semantic Parsing in Modern Machine Learning Models',
    titleAr: 'الإعراب الدلالي العربي في نماذج التعلم الآلي الحديثة',
    description: 'Breakthrough research in contextual NLP understanding for classical Arabic Quranic texts.',
    category: 'Research',
    href: '/research',
    keywords: ['semantic parsing', 'nlp research', 'quranic arabic', 'machine learning', 'linguistic paper'],
    badge: 'Journal',
  },

  // Experts & Scholars
  {
    id: 'exp-1',
    title: 'Prof. Dr. Tariq Al-Mansoor - Chair of Islamic Economics',
    titleAr: 'أ.د. طارق المنصور - رئيس كرسي الاقتصاد الإسلامي',
    description: 'Senior advisor on sovereign wealth funds and Shariah governance boards.',
    category: 'Experts',
    href: '/experts',
    keywords: ['tariq', 'al-mansoor', 'scholar', 'professor', 'economics', 'shariah advisor', 'expert'],
    badge: 'Faculty Chair',
  },
  {
    id: 'exp-2',
    title: 'Dr. Amina Al-Zahra - Dean of Arabic Linguistics',
    titleAr: 'د. أمينة الزهراء - عميدة اللسانيات العربية',
    description: 'Leading authority in classical rhetoric, lexicography, and digital Arabic corpus analysis.',
    category: 'Experts',
    href: '/experts',
    keywords: ['amina', 'al-zahra', 'linguistics', 'dean', 'arabic scholar', 'lexicography', 'expert'],
    badge: 'Dean',
  },
  {
    id: 'exp-3',
    title: 'Dr. Farhan Siddiqui - Director of Islamic Fintech',
    titleAr: 'د. فرحان صديقي - مدير التكنولوجيا المالية الإسلامية',
    description: 'Specialist in tokenized assets, decentralized finance, and Islamic banking algorithms.',
    category: 'Experts',
    href: '/experts',
    keywords: ['farhan', 'siddiqui', 'fintech', 'blockchain expert', 'director', 'tokenization'],
    badge: 'Director',
  },

  // Sovereign Nations
  {
    id: 'cntry-ae',
    title: 'United Arab Emirates (UAE) - Member State Directorate',
    titleAr: 'دولة الإمارات العربية المتحدة',
    description: '12 affiliated university campuses, Dubai & Abu Dhabi Islamic finance research hubs.',
    category: 'Countries',
    href: '/directory',
    keywords: ['uae', 'emirates', 'dubai', 'abu dhabi', 'middle east', 'arab', 'institutions'],
    badge: '12 Affiliates',
  },
  {
    id: 'cntry-sa',
    title: 'Kingdom of Saudi Arabia (KSA) - Member State Directorate',
    titleAr: 'المملكة العربية السعودية',
    description: '28 affiliated academic centers across Riyadh, Makkah, and Madinah.',
    category: 'Countries',
    href: '/directory',
    keywords: ['saudi', 'ksa', 'saudi arabia', 'riyadh', 'makkah', 'madinah', 'islamic banking'],
    badge: '28 Affiliates',
  },
  {
    id: 'cntry-my',
    title: 'Malaysia - Southeast Asian Regional Directorate',
    titleAr: 'ماليزيا - الإدارة الإقليمية لجنوب شرق آسيا',
    description: '19 affiliated university departments, Kuala Lumpur Islamic Capital Market hub.',
    category: 'Countries',
    href: '/directory',
    keywords: ['malaysia', 'kuala lumpur', 'southeast asia', 'islamic finance hub', 'affiliates'],
    badge: '19 Affiliates',
  },
  {
    id: 'cntry-tr',
    title: 'Türkiye (Turkey) - Eurasian Academic Directorate',
    titleAr: 'الجمهورية التركية',
    description: '15 affiliated institutes across Istanbul and Ankara specializing in participation banking.',
    category: 'Countries',
    href: '/directory',
    keywords: ['turkey', 'turkiye', 'istanbul', 'ankara', 'participation banking', 'eurasia'],
    badge: '15 Affiliates',
  },
  {
    id: 'cntry-id',
    title: 'Indonesia - Archipelago Academic Directorate',
    titleAr: 'جمهورية إندونيسيا',
    description: '24 affiliated Islamic state universities and Shariah microfinance centers.',
    category: 'Countries',
    href: '/directory',
    keywords: ['indonesia', 'jakarta', 'shariah microfinance', 'uin', 'southeast asia'],
    badge: '24 Affiliates',
  },
  {
    id: 'cntry-eg',
    title: 'Egypt - North African Academic Directorate',
    titleAr: 'جمهورية مصر العربية',
    description: '18 affiliated historical faculties and linguistic research centers.',
    category: 'Countries',
    href: '/directory',
    keywords: ['egypt', 'cairo', 'al-azhar', 'arabic language', 'north africa'],
    badge: '18 Affiliates',
  },
];

export function performSearch(query: string, categoryFilter: string = 'All'): SearchItem[] {
  const cleanQuery = query.trim().toLowerCase();
  if (!cleanQuery) return [];

  const terms = cleanQuery.split(/\s+/).filter(Boolean);

  return searchableData.filter((item) => {
    if (categoryFilter !== 'All' && item.category !== categoryFilter) {
      return false;
    }

    const titleLower = item.title.toLowerCase();
    const titleArLower = (item.titleAr || '').toLowerCase();
    const descLower = item.description.toLowerCase();
    const keywordsJoined = item.keywords.join(' ').toLowerCase();
    const categoryLower = item.category.toLowerCase();

    return terms.every((term) =>
      titleLower.includes(term) ||
      titleArLower.includes(term) ||
      descLower.includes(term) ||
      keywordsJoined.includes(term) ||
      categoryLower.includes(term)
    );
  });
}
