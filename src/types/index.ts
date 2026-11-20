export type InstitutionType = 'University' | 'College' | 'Training Center' | 'Research Institute' | 'Language Academy';
export type LearningMode = 'Online' | 'On-Campus' | 'Blended';
export type InstitutionStatus = 'Active' | 'Pending' | 'Suspended';
export type ProgramLevel = 'Certificate' | 'Diploma' | 'Advanced Diploma' | 'Executive Program' | 'Professional Certificate' | 'Doctorate' | 'Master of Science';

export interface ScorecardItem {
  id?: string;
  domain?: string;
  area?: string;
  title?: string;
  name?: string;
  score: number;
  benchmark?: number;
  target?: number;
  trend?: 'up' | 'down' | 'stable' | string;
  status?: string;
}

export interface CorrectiveAction {
  id?: string;
  institution?: string;
  domain?: string;
  area?: string;
  finding?: string;
  action?: string;
  remediation?: string;
  desc?: string;
  description?: string;
  timeline?: string;
  deadline?: string;
  status?: 'Planned' | 'In Progress' | 'Completed' | 'in-progress' | 'verified' | 'scheduled' | 'pending' | 'resolved' | string;
  priority?: 'low' | 'medium' | 'high' | 'mandatory' | string;
}

export interface QualityProfile {
  lastReview: string;
  score: number;
  compliance: 'Submitted' | 'Pending' | 'Overdue';
  observations: number;
  correctiveActions?: CorrectiveAction[];
  scorecard?: ScorecardItem[];
}

export interface ContactInfo {
  email: string;
  phone: string;
  website: string;
  address: string;
}

export interface SyllabusModule {
  code: string;
  title: string;
  credits: string;
  description?: string;
}

export interface Program {
  id: string;
  title: string;
  category: 'Islamic Finance' | 'Arabic & Languages' | 'Research' | 'Shariah FinTech';
  level: ProgramLevel;
  hours: string | number;
  duration?: string;
  mode: LearningMode;
  language: string;
  students: number;
  capacity?: number;
  description: string;
  outcomes: string[];
  prerequisites?: string;
  syllabus?: SyllabusModule[];
  assessment?: string;
  institutionId?: string;
  status?: 'Active' | 'Draft' | 'Archived';
  color?: string;
  createdAt?: string;
}

export interface Institution {
  id: string;
  name: string;
  country: string;
  city: string;
  type: InstitutionType;
  field: string[];
  mode: LearningMode[];
  status: InstitutionStatus;
  validity: string;
  affiliationDate: string;
  giflriId: string;
  programsCount?: number;
  students: number;
  approvedPrograms: string[];
  qualityStatus: string;
  quality?: QualityProfile;
  contact?: ContactInfo;
  website?: string;
  qrCode?: string;
  createdAt?: string;
}

export type ApplicationStatus = 'Draft' | 'Submitted' | 'Under Review' | 'Inspection' | 'Committee' | 'Approved' | 'Rejected';

export interface ApplicationDocument {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadedAt: string;
  status: 'Pending' | 'Verified' | 'Rejected';
}

export interface ApplicationStage {
  id: string;
  label: string;
  status: 'completed' | 'active' | 'pending';
  date?: string;
  notes?: string;
}

export interface ApplicationMessage {
  id: string;
  sender: string;
  role: 'Applicant' | 'Reviewer' | 'System';
  content: string;
  timestamp: string;
}

export interface Application {
  id: string;
  institutionName: string;
  country: string;
  city?: string;
  contactEmail: string;
  email?: string;
  contactPerson: string;
  status: ApplicationStatus;
  currentStageIndex: number;
  currentStage: string;
  progress: number;
  health: number;
  submittedDate: string;
  inspectionDate?: string;
  assignedReviewer: string;
  programRequested: string;
  appliedPrograms?: string[];
  deliveryMode: string;
  learningHours: string;
  documents: ApplicationDocument[];
  stages: ApplicationStage[];
  messages: ApplicationMessage[];
  reviewerNotes?: string;
  createdAt?: string;
}

export interface AgendaItem {
  time: string;
  title: string;
  speaker: string;
  type: 'Keynote' | 'Panel' | 'Workshop' | 'Break' | 'Networking';
}

export interface Speaker {
  name: string;
  role: string;
  country: string;
  bio?: string;
  photo?: string;
}

export interface EventItem {
  id: string | number;
  title: string;
  date: string;
  endDate?: string;
  city: string;
  country: string;
  theme: string;
  speakers: number;
  attendeesCount?: number;
  status: 'Upcoming' | 'Open for Registration' | 'Completed' | 'Call for Papers Open';
  type: 'Conference' | 'Summit' | 'Hackathon' | 'Forum' | 'Workshop';
  image?: string;
  desc: string;
  agenda?: AgendaItem[];
  speakersList?: Speaker[];
  registrationUrl?: string;
  createdAt?: string;
}

export interface EventRegistration {
  id: string;
  eventId: string | number;
  eventTitle: string;
  name: string;
  email: string;
  phone: string;
  organization: string;
  role: string;
  country: string;
  attendanceType: 'In-Person' | 'Virtual';
  specialRequests?: string;
  registrationCode: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  createdAt: string;
}

export interface Certificate {
  id: string;
  certId: string;
  studentName: string;
  studentEmail?: string;
  program: string;
  institution: string;
  institutionId?: string;
  issueDate: string;
  validity: 'Permanent / Verifiable' | 'Expired' | 'Revoked';
  grade?: string;
  status: 'Verified' | 'Pending' | 'Revoked';
  qrCodeUrl?: string;
  verificationHash?: string;
  createdAt?: string;
}

export interface ResearchPaper {
  id: string;
  title: string;
  authors: string;
  journal: string;
  year: number;
  theme: string;
  abstract: string;
  doi: string;
  downloads: number;
  citations: number;
  pdfUrl?: string;
  category: string;
  createdAt?: string;
}

export interface Journal {
  id: string;
  title: string;
  issn: string;
  frequency: string;
  editorInChief: string;
  currentIssue: string;
  articlesCount: number;
}

export interface Expert {
  id: string;
  name: string;
  role: string;
  country: string;
  city?: string;
  fields: string[];
  publications: number;
  avatar?: string;
  biography: string;
  qualifications: string[];
  courses?: string[];
  giflriRole: string;
  email?: string;
  createdAt?: string;
}

export interface Complaint {
  id: string;
  type: string;
  complainantName: string;
  email: string;
  institution?: string;
  subject: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'Pending' | 'Under Review' | 'Resolved' | 'Dismissed';
  resolutionNotes?: string;
  submittedAt: string;
  resolvedAt?: string;
}

export interface StudentServiceRequest {
  id: string;
  studentName: string;
  studentEmail: string;
  serviceType: 'Transcript Request' | 'Duplicate Certificate' | 'Degree Attestation' | 'Enrollment Verification';
  institution: string;
  program: string;
  status: 'Pending' | 'Processing' | 'Completed' | 'Rejected';
  submittedAt: string;
  completedAt?: string;
  notes?: string;
}

export interface FacultyRegistration {
  id: string;
  name: string;
  email: string;
  institution: string;
  department: string;
  specialization: string;
  cpdHours: number;
  status: 'Registered' | 'Pending Review' | 'Accredited';
  registeredAt: string;
}

export interface PaymentRecord {
  id: string;
  invoiceNumber: string;
  payerName: string;
  payerEmail: string;
  institution: string;
  amount: number;
  currency: string;
  purpose: 'Affiliation Application Fee' | 'Annual Quality Audit' | 'Conference Registration' | 'Certificate Issuance';
  status: 'Paid' | 'Pending' | 'Refunded';
  date: string;
  transactionRef: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  submittedAt: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribedAt: string;
  active: boolean;
}

export interface ObservatoryMetric {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  unit: string;
}

export interface CountryRank {
  rank: number;
  country: string;
  code: string;
  score: number;
  institutionsCount: number;
  studentsCount: number;
}

export interface ObservatoryData {
  fintechMetrics: ObservatoryMetric[];
  arabicMetrics: ObservatoryMetric[];
  countryRankings: CountryRank[];
  trends: { date: string; fintechIndex: number; researchIndex: number }[];
  financeMarketCap?: string;
  arabicPapersCount?: string;
}

export interface ActivityLog {
  id: string;
  action: string;
  user: string;
  entity: string;
  entityId?: string;
  type: 'approval' | 'payment' | 'inspection' | 'research' | 'certificate' | 'update' | 'security' | 'creation';
  timestamp: string;
  details?: string;
}

export interface DashboardStats {
  applications: number;
  institutions: number;
  programs: number;
  inspections: number;
  qualityActions: number;
  certificates: number;
  students: number;
  research: number;
  journals: number;
  experts: number;
  events: number;
  payments: number;
  complaints: number;
  chartData: {
    month: string;
    applications: number;
    approvals: number;
    revenue: number;
  }[];
  statusData: {
    name: string;
    value: number;
  }[];
}

export interface SearchResultItem {
  id: string;
  title: string;
  category: 'institution' | 'program' | 'paper' | 'event' | 'expert';
  categoryLabel: string;
  subtitle: string;
  url: string;
  badge?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  total?: number;
  error?: string;
}

export type UserRole = 'admin' | 'institution' | 'student' | 'faculty';

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  avatar?: string;
  title?: string;
  institutionId?: string;
  institutionName?: string;
  department?: string;
  program?: string;
  studentId?: string;
  permissions?: string[];
  status?: 'Active' | 'Pending' | 'Suspended' | string;
  joinedDate?: string;
  createdAt?: string;
  lastLogin?: string;
}

export interface AnnouncementBanner {
  enabled: boolean;
  text: string;
  link?: string;
  badge?: string;
  type: 'info' | 'alert' | 'success' | 'event';
}

export interface SiteSettings {
  siteTitle: string;
  siteTagline: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroCtaPrimaryText: string;
  heroCtaPrimaryLink: string;
  heroCtaSecondaryText: string;
  heroCtaSecondaryLink: string;
  heroStats: {
    countries: number;
    institutions: number;
    programs: number;
    experts: number;
  };
  announcement: AnnouncementBanner;
  contactEmail: string;
  contactPhone: string;
  headquartersAddress: string;
  copyrightText: string;
  socialLinks: {
    twitter?: string;
    linkedin?: string;
    youtube?: string;
    facebook?: string;
  };
}

export interface PillarContent {
  id: string;
  titleKey: string;
  customTitle: string;
  descKey: string;
  customDesc: string;
  color: string;
  gradient: string;
  bgGradient: string;
  objective: string;
  stats: { label: string; value: string }[];
  initiatives: { title: string; desc: string }[];
  projects: string[];
}

export interface MediaAssetItem {
  id: string;
  key: string;
  name: string;
  category: 'banner' | 'logo' | 'visual' | 'avatar' | 'template' | 'video' | 'other';
  url: string;
  description?: string;
  updatedAt?: string;
}

export interface AboutValueItem {
  title: string;
  desc?: string;
  description?: string;
  icon?: string;
  iconName?: string;
}


export interface AffiliationJourneyStep {
  id?: string;
  step?: number;
  number?: string;
  title: string;
  desc: string;
  duration?: string;
  color?: string;
  icon?: string;
  iconName?: string;
}

export interface AffiliationBenefitItem {
  title: string;
  desc?: string;
  description?: string;
  icon?: string;
  iconName?: string;
}

export interface QualityFrameworkDomain {
  id?: string;
  domain?: string;
  title: string;
  desc?: string;
  description?: string;
  criteriaCount?: number;
  icon?: string;
  iconName?: string;
}

export interface QualityStandardDoc {
  code?: string;
  title: string;
  desc?: string;
  pages?: number;
  version: string;
  category?: string;
  updated?: string;
}

export interface RelationPartnerItem {
  name: string;
  acronym?: string;
  country?: string;
  type?: string;
  focus?: string;
  desc?: string;
  status: string;
  since?: string;
}

export interface RelationMoUItem {
  partner?: string;
  signatory?: string;
  partnerCountry?: string;
  country?: string;
  date?: string;
  signedDate?: string;
  tenure?: string;
  scope: string;
  status: string;
  outcomes?: string[];
}

export interface RelationJointProject {
  title: string;
  partners: string[] | string;
  targetYear?: string;
  objective?: string;
  status: string;
  outputs?: string[];
}

export interface ObservatoryThemeItem {
  id: string;
  title: string;
  desc: string;
  metrics?: string[];
  growth?: string;
  status?: string;
  marketCap?: string;
  icon?: any;
  iconName?: string;
}

export interface GlobalPresenceCountry {
  country?: string;
  name?: string;
  code: string;
  lat?: number;
  lng?: number;
  coordinates?: [number, number];
  institutions: number;
  programs: number;
  experts?: number;
  students: number;
  focusArea?: string;
  partners?: string[];
  projects?: string[];
  milestone?: string;
  lead?: string;
  leadInstitution?: string;
  established?: string;
}

export interface LatestUpdateItem {
  id: number | string;
  type: 'research' | 'event' | 'announcement' | 'news';
  label: string;
  title: string;
  desc: string;
  date: string;
  author?: string;
  location?: string;
  readTime?: string;
  deadline?: string;
  image?: string;
}

export interface QuickActionItem {
  label: string;
  desc: string;
  href: string;
  color?: string;
  icon?: any;
  iconName?: string;
}

export interface FooterTrustBadge {
  title: string;
  subtitle: string;
  icon?: any;
  iconName?: string;
}

export interface WebsiteSectionContent {
  about: {
    eyebrow: string;
    title: string;
    subtitle: string;
    calligraphyText: string;
    calligraphyTranslation: string;
    quoteAuthor?: string;
    mission: string;
    vision: string;
    card1Title: string;
    card1Desc: string;
    card2Title: string;
    card2Desc: string;
    values?: AboutValueItem[];
    missionPoints?: string[];
    visionPoints?: string[];
  };
  quality: {
    eyebrow: string;
    title: string;
    subtitle: string;
    auditBadge: string;
    framework?: QualityFrameworkDomain[];
    scorecard?: ScorecardItem[];
    standards?: QualityStandardDoc[];
    correctiveActions?: CorrectiveAction[];
  };
  observatory: {
    eyebrow: string;
    title: string;
    subtitle: string;
    growthStat: string;
    financeThemes?: ObservatoryThemeItem[];
    languageThemes?: ObservatoryThemeItem[];
  };
  affiliation: {
    eyebrow: string;
    title: string;
    subtitle: string;
    trustTitle: string;
    trustDesc: string;
    journeySteps?: AffiliationJourneyStep[];
    benefits?: AffiliationBenefitItem[];
    stats?: {
      institutions: number;
      countries: number;
      programs: number;
      renewalRate: number;
    };
  };
  relations: {
    eyebrow: string;
    title: string;
    subtitle: string;
    partners?: {
      organizations: RelationPartnerItem[];
      universities: RelationPartnerItem[];
      finance: RelationPartnerItem[];
      academies: RelationPartnerItem[];
    };
    mous?: RelationMoUItem[];
    jointProjects?: RelationJointProject[];
  };
  globalPresence?: {
    eyebrow: string;
    title: string;
    subtitle: string;
    countries: GlobalPresenceCountry[];
  };
  latestUpdates?: {
    eyebrow: string;
    title: string;
    subtitle: string;
    updates: LatestUpdateItem[];
  };
  quickActions?: {
    eyebrow: string;
    title: string;
    actions: QuickActionItem[];
  };
  footer: {
    aboutText: string;
    secretariatInfo: string;
    phone: string;
    email: string;
    address: string;
    operatingHours?: string;
    copyright: string;
    trustBadges?: FooterTrustBadge[];
    socialLinks?: {
      linkedin?: string;
      twitter?: string;
      youtube?: string;
      facebook?: string;
      instagram?: string;
    };
  };
}


