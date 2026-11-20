import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from '@/components/ui/link';
import { cn } from '@/lib/utils';
import {
  FileText,
  Building2,
  BookOpen,
  Search,
  Award,
  Users,
  Microscope,
  Calendar,
  AlertCircle,
  BarChart2,
  Shield,
  Settings,
  Plus,
  Trash2,
  Edit,
  CheckCircle,
  XCircle,
  RefreshCw,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Clock,
  Send,
  Sliders,
  Check,
  RotateCcw,
  Sparkles,
  ShieldAlert,
  Globe,
  CreditCard,
  GraduationCap,
  MessageSquare,
  Mail,
  TrendingUp,
  LayoutDashboard,
  Eye,
  Megaphone,
  Image as ImageIcon,
  Copy,
  MapPin,
  Phone,
  Tag,
  Layers,
  X,
  Filter,
  Download,
  Lock,
  EyeOff,
  UserCheck,
  LogOut,
  Activity,
  Zap,
  Menu,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/auth-context';
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import { QRCodeSVG } from 'qrcode.react';
import { CertificateModal } from '@/components/certificate-modal';
import {
  Institution,
  Program,
  Application,
  EventItem,
  Certificate,
  ResearchPaper,
  Expert,
  Complaint,
  ActivityLog,
  DashboardStats,
  SiteSettings,
  PillarContent,
  StudentServiceRequest,
  FacultyRegistration,
  PaymentRecord,
  ObservatoryData,
  User,
  MediaAssetItem,
  WebsiteSectionContent,
} from '@/types';

export function AdminSection() {
  const { t } = useTranslation();
  const { user, isAuthenticated, login, logout } = useAuth();
  const navigate = useNavigate();

  // Admin Login States for unauthenticated visits
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authSubmitting, setAuthSubmitting] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail.trim()) {
      setAuthError('Please enter your administrator email address.');
      return;
    }
    if (!loginPassword) {
      setAuthError('Please enter your administrator password.');
      return;
    }

    setAuthSubmitting(true);
    setAuthError(null);

    try {
      const res = await login({ email: loginEmail.trim(), password: loginPassword });
      if (res.success && res.user) {
        if (res.user.role !== 'admin') {
          await logout();
          setAuthError('Access Denied: This account does not possess Executive Admin privileges.');
        } else {
          showToast(`Welcome to Executive Command Center, ${res.user.name}`);
        }
      } else {
        setAuthError(res.error || 'Authentication failed. Please verify your admin credentials.');
      }
    } catch (err: any) {
      setAuthError(err.message || 'Network error during admin authentication.');
    } finally {
      setAuthSubmitting(false);
    }
  };

  const handleAdminLogout = async () => {
    await logout();
    setLoginEmail('');
    setLoginPassword('');
    setAuthError(null);
    showToast('Signed out of Executive Console successfully');
  };

  const [activeTab, setActiveTab] = useState<
    | 'overview'
    | 'content'
    | 'media'
    | 'institutions'
    | 'programs'
    | 'applications'
    | 'certificates'
    | 'research'
    | 'experts'
    | 'events'
    | 'observatory'
    | 'eservices'
    | 'payments'
    | 'complaints'
    | 'pillars'
    | 'settings'
    | 'users'
    | 'logs'
  >('overview');

  // Loading & toast states
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Core Data States
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);
  const [websiteContent, setWebsiteContent] = useState<WebsiteSectionContent | null>(null);
  const [mediaAssets, setMediaAssets] = useState<MediaAssetItem[]>([]);
  const [pillars, setPillars] = useState<PillarContent[]>([]);
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [researchPapers, setResearchPapers] = useState<ResearchPaper[]>([]);
  const [experts, setExperts] = useState<Expert[]>([]);
  const [observatoryData, setObservatoryData] = useState<ObservatoryData | null>(null);
  const [studentRequests, setStudentRequests] = useState<StudentServiceRequest[]>([]);
  const [facultyRegs, setFacultyRegs] = useState<FacultyRegistration[]>([]);
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [usersList, setUsersList] = useState<User[]>([]);
  const [logs, setLogs] = useState<ActivityLog[]>([]);

  // Responsive mobile drawer state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [mediaSearchTerm, setMediaSearchTerm] = useState('');
  const [selectedMediaCategory, setSelectedMediaCategory] = useState<string>('all');
  const [researchCategory, setResearchCategory] = useState<string>('all');
  const [researchSearchTerm, setResearchSearchTerm] = useState('');
  const [eservicesSubTab, setEservicesSubTab] = useState<'students' | 'faculty'>('students');
  const [cmsSubTab, setCmsSubTab] = useState<
    | 'about'
    | 'quality'
    | 'affiliation'
    | 'relations'
    | 'observatory'
    | 'presence'
    | 'updates_actions'
    | 'footer'
  >('about');

  // Modals state
  const [showAddInstModal, setShowAddInstModal] = useState(false);
  const [showAddProgModal, setShowAddProgModal] = useState(false);
  const [showAddCertModal, setShowAddCertModal] = useState(false);
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [showAddPaperModal, setShowAddPaperModal] = useState(false);
  const [showAddExpertModal, setShowAddExpertModal] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showAddPaymentModal, setShowAddPaymentModal] = useState(false);
  const [showAddMediaModal, setShowAddMediaModal] = useState(false);
  const [showAddStudentReqModal, setShowAddStudentReqModal] = useState(false);
  const [showAddFacultyModal, setShowAddFacultyModal] = useState(false);
  const [showAddComplaintModal, setShowAddComplaintModal] = useState(false);

  // Edit / View Modals
  const [editingInst, setEditingInst] = useState<Institution | null>(null);
  const [editingProg, setEditingProg] = useState<Program | null>(null);
  const [editingPillar, setEditingPillar] = useState<PillarContent | null>(null);
  const [editingMedia, setEditingMedia] = useState<MediaAssetItem | null>(null);
  const [editingPaper, setEditingPaper] = useState<ResearchPaper | null>(null);
  const [editingExpert, setEditingExpert] = useState<Expert | null>(null);
  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);
  const [editingCert, setEditingCert] = useState<Certificate | null>(null);
  const [editingPayment, setEditingPayment] = useState<PaymentRecord | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [viewingApp, setViewingApp] = useState<Application | null>(null);
  const [viewingCert, setViewingCert] = useState<Certificate | null>(null);
  const [viewingStudentReq, setViewingStudentReq] = useState<StudentServiceRequest | null>(null);
  const [viewingFacultyReg, setViewingFacultyReg] = useState<FacultyRegistration | null>(null);
  const [viewingComplaint, setViewingComplaint] = useState<Complaint | null>(null);

  // Search & Filter state variables across all tabs
  const [appSearchTerm, setAppSearchTerm] = useState('');
  const [certSearchTerm, setCertSearchTerm] = useState('');
  const [expertSearchTerm, setExpertSearchTerm] = useState('');
  const [eventSearchTerm, setEventSearchTerm] = useState('');
  const [eservicesSearchTerm, setEservicesSearchTerm] = useState('');
  const [paymentSearchTerm, setPaymentSearchTerm] = useState('');
  const [complaintSearchTerm, setComplaintSearchTerm] = useState('');
  const [userSearchTerm, setUserSearchTerm] = useState('');
  const [logSearchTerm, setLogSearchTerm] = useState('');

  const [newMedia, setNewMedia] = useState<{
    name: string;
    key: string;
    category: 'banner' | 'logo' | 'video' | 'visual' | 'avatar' | 'document';
    url: string;
    description: string;
  }>({
    name: '',
    key: '',
    category: 'banner',
    url: '',
    description: '',
  });

  const [newInst, setNewInst] = useState({
    name: '',
    country: 'UAE',
    city: 'Dubai',
    type: 'University',
    status: 'Active',
    programs: 'Diploma in Islamic Finance',
    website: '',
  });

  const [newProg, setNewProg] = useState({
    title: '',
    category: 'Islamic Finance' as 'Islamic Finance' | 'Arabic & Languages' | 'Research' | 'Shariah FinTech',
    level: 'Diploma' as any,
    hours: '240 Hours',
    duration: '1 Year',
    mode: 'Blended' as any,
    language: 'English & Arabic',
    students: 25,
    description: '',
    outcomes: '',
  });

  const [newCert, setNewCert] = useState({
    studentName: '',
    studentEmail: '',
    program: 'Diploma in Islamic Finance',
    institution: 'Al Noor Institute of Islamic Finance',
    grade: 'High Distinction',
  });

  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '2027-05-15',
    city: 'Dubai',
    country: 'UAE',
    theme: 'Global Islamic Finance & FinTech',
    type: 'Conference',
    desc: '',
  });

  const [newPaper, setNewPaper] = useState({
    title: '',
    authors: '',
    journal: 'GIFLRI Journal of Islamic FinTech & Law',
    category: 'FinTech',
    abstract: '',
  });

  const [newExpert, setNewExpert] = useState({
    name: '',
    role: 'Senior Shariah Advisor',
    country: 'UAE',
    giflriRole: 'Advisory Panel Member',
    fields: 'Islamic Finance, FinTech',
    biography: '',
  });

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'institution' as const,
    password: 'password123',
    title: 'Institutional Director',
  });

  const [newPayment, setNewPayment] = useState({
    payerName: '',
    payerEmail: '',
    institution: '',
    amount: 2500,
    currency: 'USD',
    purpose: 'Affiliation Application Fee' as const,
    status: 'Paid' as const,
    invoiceNumber: '',
  });

  const [newStudentReq, setNewStudentReq] = useState({
    studentName: '',
    studentEmail: '',
    serviceType: 'Transcript Request',
    program: 'Diploma in Islamic Finance',
    status: 'Pending' as const,
  });

  const [newFacultyReg, setNewFacultyReg] = useState({
    name: '',
    email: '',
    institution: 'Al Noor Institute',
    department: 'Islamic Economics',
    specialization: 'Islamic Banking & Shariah Law',
    status: 'Pending Review' as const,
  });

  const [newComplaint, setNewComplaint] = useState({
    complainantName: '',
    complainantEmail: '',
    institutionName: '',
    subject: '',
    description: '',
    priority: 'medium' as any,
    status: 'Pending' as const,
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Fetch all initial data
  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [
        statsRes,
        settingsRes,
        contentRes,
        mediaRes,
        pillarsRes,
        instRes,
        progRes,
        appRes,
        evtRes,
        certRes,
        resRes,
        expRes,
        compRes,
        obsRes,
        eservRes,
        payRes,
        userRes,
        logsRes,
      ] = await Promise.all([
        fetch('/api/admin/stats').then((r) => r.json()).catch(() => ({})),
        fetch('/api/admin/settings').then((r) => r.json()).catch(() => ({})),
        fetch('/api/admin/content').then((r) => r.json()).catch(() => ({})),
        fetch('/api/admin/media').then((r) => r.json()).catch(() => ({})),
        fetch('/api/admin/pillars').then((r) => r.json()).catch(() => ({})),
        fetch('/api/institutions').then((r) => r.json()).catch(() => ({})),
        fetch('/api/programs').then((r) => r.json()).catch(() => ({})),
        fetch('/api/applications').then((r) => r.json()).catch(() => ({})),
        fetch('/api/events').then((r) => r.json()).catch(() => ({})),
        fetch('/api/certificates').then((r) => r.json()).catch(() => ({})),
        fetch('/api/research').then((r) => r.json()).catch(() => ({})),
        fetch('/api/experts').then((r) => r.json()).catch(() => ({})),
        fetch('/api/complaints').then((r) => r.json()).catch(() => ({})),
        fetch('/api/admin/observatory').then((r) => r.json()).catch(() => ({})),
        fetch('/api/admin/eservices').then((r) => r.json()).catch(() => ({})),
        fetch('/api/admin/payments').then((r) => r.json()).catch(() => ({})),
        fetch('/api/admin/users').then((r) => r.json()).catch(() => ({})),
        fetch('/api/logs').then((r) => r.json()).catch(() => ({})),
      ]);

      if (statsRes.success) setStats(statsRes.data);
      if (settingsRes.success) setSiteSettings(settingsRes.data);
      if (contentRes.success) setWebsiteContent(contentRes.data);
      if (mediaRes.success) setMediaAssets(mediaRes.data);
      if (pillarsRes.success) setPillars(pillarsRes.data);
      if (instRes.success) setInstitutions(instRes.data);
      if (progRes.success) setPrograms(progRes.data);
      if (appRes.success) setApplications(appRes.data);
      if (evtRes.success) setEvents(evtRes.data);
      if (certRes.success) setCertificates(certRes.data);
      if (resRes.success) setResearchPapers(resRes.data);
      if (expRes.success) setExperts(expRes.data);
      if (compRes.success) setComplaints(compRes.data);
      if (obsRes.success) setObservatoryData(obsRes.data);
      if (eservRes.success) {
        setStudentRequests(eservRes.data.studentRequests || []);
        setFacultyRegs(eservRes.data.facultyRegistrations || []);
      }
      if (payRes.success) setPayments(payRes.data);
      if (userRes.success) setUsersList(userRes.data);
      if (logsRes.success) setLogs(logsRes.data);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && user?.role === 'admin') {
      fetchAllData();
    }
  }, [isAuthenticated, user?.role]);

  // Save Site Settings
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!siteSettings) return;
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(siteSettings),
      });
      const data = await res.json();
      if (data.success) {
        setSiteSettings(data.data);
        showToast('Site Settings & Global Announcement updated successfully!');
      }
    } catch (err) {
      showToast('Failed to update settings');
    }
  };

  // Save Website Section Content CMS
  const handleSaveWebsiteContent = async () => {
    if (!websiteContent) return;
    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(websiteContent),
      });
      const data = await res.json();
      if (data.success) {
        setWebsiteContent(data.data);
        showToast('Website Section Content saved and published across portal!');
        window.dispatchEvent(new Event('website-content-updated'));
      }
    } catch (err) {
      showToast('Failed to save website content');
    }
  };

  // Reset Website Content
  const handleResetWebsiteContent = async () => {
    if (!confirm('Are you sure you want to reset all website content to default values?')) return;
    try {
      const res = await fetch('/api/content/reset', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setWebsiteContent(data.data);
        showToast('Website content restored to standard defaults!');
        window.dispatchEvent(new Event('website-content-updated'));
      }
    } catch (err) {
      showToast('Failed to reset content');
    }
  };

  // Media Handlers
  const handleAddMedia = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/media', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMedia),
      });
      const data = await res.json();
      if (data.success) {
        setMediaAssets([data.data, ...mediaAssets]);
        setShowAddMediaModal(false);
        setNewMedia({ name: '', key: '', category: 'banner', url: '', description: '' });
        showToast('New media asset created and saved!');
      }
    } catch (err) {
      showToast('Failed to create media asset');
    }
  };

  const handleUpdateMedia = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMedia) return;
    try {
      const res = await fetch('/api/admin/media', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingMedia),
      });
      const data = await res.json();
      if (data.success) {
        setMediaAssets(mediaAssets.map((m) => (m.id === editingMedia.id ? data.data : m)));
        setEditingMedia(null);
        showToast('Media image asset updated successfully!');
      }
    } catch (err) {
      showToast('Failed to update media asset');
    }
  };

  const handleDeleteMedia = async (id: string) => {
    if (!confirm('Are you sure you want to delete this media asset?')) return;
    try {
      const res = await fetch(`/api/admin/media?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setMediaAssets(mediaAssets.filter((m) => m.id !== id));
        showToast('Media asset removed');
      }
    } catch (err) {
      showToast('Failed to delete media asset');
    }
  };

  // Save Pillar
  const handleSavePillar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPillar) return;
    try {
      const res = await fetch('/api/admin/pillars', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingPillar),
      });
      const data = await res.json();
      if (data.success) {
        setPillars(pillars.map((p) => (p.id === editingPillar.id ? data.data : p)));
        setEditingPillar(null);
        showToast('Pillar content framework saved successfully!');
      }
    } catch (err) {
      showToast('Failed to save pillar');
    }
  };

  // Institutions Handlers
  const handleAddInstitution = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...newInst,
        programs: newInst.programs.split(',').map((s) => s.trim()),
      };
      const res = await fetch('/api/institutions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setInstitutions([data.data, ...institutions]);
        setShowAddInstModal(false);
        setNewInst({
          name: '',
          country: 'UAE',
          city: 'Dubai',
          type: 'University',
          status: 'Active',
          programs: 'Diploma in Islamic Finance',
          website: '',
        });
        showToast('Institution registered successfully!');
      }
    } catch (err) {
      showToast('Failed to add institution');
    }
  };

  const handleEditInstitution = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingInst) return;
    try {
      const res = await fetch(`/api/institutions/${editingInst.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingInst),
      });
      const data = await res.json();
      if (data.success) {
        setInstitutions(institutions.map((inst) => (inst.id === editingInst.id ? data.data : inst)));
        setEditingInst(null);
        showToast('Institution profile updated!');
      }
    } catch (err) {
      showToast('Failed to update institution');
    }
  };

  const handleDeleteInstitution = async (id: string) => {
    if (!confirm('Are you sure you want to remove this institution?')) return;
    try {
      const res = await fetch(`/api/institutions/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setInstitutions(institutions.filter((inst) => inst.id !== id));
        showToast('Institution removed');
      }
    } catch (err) {
      showToast('Failed to delete institution');
    }
  };

  // Programs Handlers
  const handleAddProgram = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProg.title.trim()) {
      showToast('Please enter program title');
      return;
    }
    try {
      const outcomesList = typeof newProg.outcomes === 'string'
        ? newProg.outcomes.split('\n').map((s) => s.trim()).filter(Boolean)
        : Array.isArray(newProg.outcomes) ? newProg.outcomes : [];

      const payload = {
        ...newProg,
        students: Number(newProg.students) || 25,
        outcomes: outcomesList.length > 0 ? outcomesList : [
          'Comprehensive mastery of Shariah governance frameworks',
          'Applied competencies in regulatory compliance & transaction modeling',
          'Global ethical leadership in modern Islamic institutions',
        ],
      };

      const res = await fetch('/api/programs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setPrograms([data.data, ...programs]);
        setShowAddProgModal(false);
        setNewProg({
          title: '',
          category: 'Islamic Finance',
          level: 'Diploma',
          hours: '240 Hours',
          duration: '1 Year',
          mode: 'Blended',
          language: 'English & Arabic',
          students: 25,
          description: '',
          outcomes: '',
        });
        showToast('Master Curriculum program added successfully!');
      } else {
        showToast(data.error || 'Failed to add program');
      }
    } catch (err) {
      showToast('Failed to add program');
    }
  };

  const handleEditProgram = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProg) return;
    try {
      const outcomesList = typeof editingProg.outcomes === 'string'
        ? (editingProg.outcomes as string).split('\n').map((s) => s.trim()).filter(Boolean)
        : Array.isArray(editingProg.outcomes) ? editingProg.outcomes : [];

      const payload = {
        ...editingProg,
        outcomes: outcomesList,
        students: Number(editingProg.students) || 0,
      };

      const res = await fetch(`/api/programs/${editingProg.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setPrograms(programs.map((p) => (p.id === editingProg.id ? data.data : p)));
        setEditingProg(null);
        showToast('Program updated successfully!');
      } else {
        showToast(data.error || 'Failed to update program');
      }
    } catch (err) {
      showToast('Failed to update program');
    }
  };

  const handleDeleteProgram = async (id: string) => {
    if (!confirm('Are you sure you want to delete this program?')) return;
    try {
      const res = await fetch(`/api/programs/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setPrograms(programs.filter((p) => p.id !== id));
        showToast('Program deleted');
      }
    } catch (err) {
      showToast('Failed to delete program');
    }
  };

  // Applications Handlers
  const handleUpdateAppStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/applications/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (data.success) {
        setApplications(applications.map((a) => (a.id === id ? data.data : a)));
        if (viewingApp && viewingApp.id === id) setViewingApp(data.data);
        showToast(`Application marked as ${status}`);
      }
    } catch (err) {
      showToast('Failed to update application');
    }
  };

  const handleDeleteApplication = async (id: string) => {
    if (!confirm('Are you sure you want to delete this affiliation dossier?')) return;
    try {
      const res = await fetch(`/api/applications/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setApplications(applications.filter((a) => a.id !== id));
        if (viewingApp && viewingApp.id === id) setViewingApp(null);
        showToast('Application dossier removed');
      }
    } catch (err) {
      showToast('Failed to delete application');
    }
  };

  // Certificates Handlers
  const handleIssueCertificate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/certificates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCert),
      });
      const data = await res.json();
      if (data.success) {
        setCertificates([data.data, ...certificates]);
        setShowAddCertModal(false);
        setNewCert({
          studentName: '',
          studentEmail: '',
          program: 'Diploma in Islamic Finance',
          institution: 'Al Noor Institute of Islamic Finance',
          grade: 'High Distinction',
        });
        showToast('Certificate cryptographically issued & verified!');
      }
    } catch (err) {
      showToast('Failed to issue certificate');
    }
  };

  const handleEditCertificate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCert) return;
    try {
      const targetId = editingCert.id || editingCert.certId;
      const res = await fetch(`/api/certificates/${targetId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingCert),
      });
      const data = await res.json();
      if (data.success) {
        setCertificates(certificates.map((c) => (c.certId === editingCert.certId || c.id === editingCert.id ? data.data : c)));
        setEditingCert(null);
        showToast('Certificate record updated!');
      }
    } catch (err) {
      showToast('Failed to update certificate');
    }
  };

  const handleRevokeCertificate = async (certId: string) => {
    if (!confirm('Are you sure you want to revoke this verified credential?')) return;
    try {
      const res = await fetch(`/api/certificates/${certId}/revoke`, { method: 'PATCH' });
      const data = await res.json();
      if (data.success) {
        setCertificates(certificates.map((c) => (c.certId === certId ? data.data : c)));
        if (viewingCert && viewingCert.certId === certId) setViewingCert(data.data);
        showToast('Certificate revoked');
      }
    } catch (err) {
      showToast('Failed to revoke certificate');
    }
  };

  const handleDeleteCertificate = async (id: string) => {
    if (!confirm('Are you sure you want to delete this certificate from the cryptographic registry?')) return;
    try {
      const res = await fetch(`/api/certificates/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setCertificates(certificates.filter((c) => c.id !== id && c.certId !== id));
        if (viewingCert && (viewingCert.id === id || viewingCert.certId === id)) setViewingCert(null);
        showToast('Certificate removed from registry');
      }
    } catch (err) {
      showToast('Failed to delete certificate');
    }
  };

  // Events Handlers
  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEvent),
      });
      const data = await res.json();
      if (data.success) {
        setEvents([data.data, ...events]);
        setShowAddEventModal(false);
        setNewEvent({
          title: '',
          date: '2027-05-15',
          city: 'Dubai',
          country: 'UAE',
          theme: 'Global Islamic Finance & FinTech',
          type: 'Conference',
          desc: '',
        });
        showToast('Conference / Event scheduled!');
      }
    } catch (err) {
      showToast('Failed to schedule event');
    }
  };

  const handleEditEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEvent) return;
    try {
      const res = await fetch(`/api/events/${editingEvent.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingEvent),
      });
      const data = await res.json();
      if (data.success) {
        setEvents(events.map((evt) => (String(evt.id) === String(editingEvent.id) ? data.data : evt)));
        setEditingEvent(null);
        showToast('Event details updated!');
      }
    } catch (err) {
      showToast('Failed to update event');
    }
  };

  const handleDeleteEvent = async (id: string | number) => {
    if (!confirm('Are you sure you want to delete this event?')) return;
    try {
      const res = await fetch(`/api/events/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setEvents(events.filter((e) => String(e.id) !== String(id)));
        showToast('Event removed');
      }
    } catch (err) {
      showToast('Failed to delete event');
    }
  };

  // Research Handlers
  const handleAddPaper = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...newPaper,
        authors: newPaper.authors.split(',').map((s) => s.trim()),
      };
      const res = await fetch('/api/research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setResearchPapers([data.data, ...researchPapers]);
        setShowAddPaperModal(false);
        setNewPaper({
          title: '',
          authors: '',
          journal: 'GIFLRI Journal of Islamic FinTech & Law',
          category: 'FinTech',
          abstract: '',
        });
        showToast('Research publication published with DOI!');
      }
    } catch (err) {
      showToast('Failed to publish paper');
    }
  };

  const handleEditPaper = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPaper) return;
    try {
      const authorsList = typeof editingPaper.authors === 'string'
        ? (editingPaper.authors as string).split(',').map((s) => s.trim())
        : editingPaper.authors;
      const res = await fetch(`/api/research/${editingPaper.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...editingPaper, authors: authorsList }),
      });
      const data = await res.json();
      if (data.success) {
        setResearchPapers(researchPapers.map((p) => (p.id === editingPaper.id ? data.data : p)));
        setEditingPaper(null);
        showToast('Research publication updated!');
      }
    } catch (err) {
      showToast('Failed to update paper');
    }
  };

  const handleDeletePaper = async (id: string) => {
    if (!confirm('Are you sure you want to delete this research paper?')) return;
    try {
      const res = await fetch(`/api/research/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setResearchPapers(researchPapers.filter((p) => p.id !== id));
        showToast('Research publication removed');
      }
    } catch (err) {
      showToast('Failed to delete research paper');
    }
  };

  // Experts Handlers
  const handleAddExpert = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...newExpert,
        fields: newExpert.fields.split(',').map((s) => s.trim()),
      };
      const res = await fetch('/api/experts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setExperts([data.data, ...experts]);
        setShowAddExpertModal(false);
        setNewExpert({
          name: '',
          role: 'Senior Shariah Advisor',
          country: 'UAE',
          giflriRole: 'Advisory Panel Member',
          fields: 'Islamic Finance, FinTech',
          biography: '',
        });
        showToast('Scholar added to Global Expert Network!');
      }
    } catch (err) {
      showToast('Failed to register expert');
    }
  };

  const handleEditExpert = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExpert) return;
    try {
      const fieldsList = typeof editingExpert.fields === 'string'
        ? (editingExpert.fields as string).split(',').map((s) => s.trim())
        : editingExpert.fields;
      const res = await fetch(`/api/experts/${editingExpert.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...editingExpert, fields: fieldsList }),
      });
      const data = await res.json();
      if (data.success) {
        setExperts(experts.map((exp) => (exp.id === editingExpert.id ? data.data : exp)));
        setEditingExpert(null);
        showToast('Scholar profile updated!');
      }
    } catch (err) {
      showToast('Failed to update scholar');
    }
  };

  const handleDeleteExpert = async (id: string) => {
    if (!confirm('Are you sure you want to remove this scholar profile?')) return;
    try {
      const res = await fetch(`/api/experts/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setExperts(experts.filter((exp) => exp.id !== id));
        showToast('Scholar removed');
      }
    } catch (err) {
      showToast('Failed to delete scholar');
    }
  };

  // Users Handlers
  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });
      const data = await res.json();
      if (data.success) {
        setUsersList([data.data, ...usersList]);
        setShowAddUserModal(false);
        setNewUser({
          name: '',
          email: '',
          role: 'institution',
          password: 'password123',
          title: 'Institutional Director',
        });
        showToast('New user account provisioned!');
      }
    } catch (err) {
      showToast('Failed to add user');
    }
  };

  const handleEditUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    try {
      const res = await fetch('/api/admin/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingUser),
      });
      const data = await res.json();
      if (data.success) {
        setUsersList(usersList.map((u) => (u.id === editingUser.id ? data.data : u)));
        setEditingUser(null);
        showToast('User account updated!');
      }
    } catch (err) {
      showToast('Failed to update user');
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    try {
      await fetch(`/api/admin/users?id=${id}`, { method: 'DELETE' });
      setUsersList(usersList.filter((u) => u.id !== id));
      showToast('User account deleted');
    } catch (err) {
      showToast('Failed to delete user');
    }
  };

  // Payments Handlers
  const handleAddPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPayment),
      });
      const data = await res.json();
      if (data.success) {
        setPayments([data.data, ...payments]);
        setShowAddPaymentModal(false);
        setNewPayment({
          payerName: '',
          payerEmail: '',
          institution: '',
          amount: 2500,
          currency: 'USD',
          purpose: 'Affiliation Application Fee',
          status: 'Paid',
          invoiceNumber: '',
        });
        showToast('Payment record logged!');
      }
    } catch (err) {
      showToast('Failed to record payment');
    }
  };

  const handleEditPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPayment) return;
    try {
      const res = await fetch(`/api/admin/payments/${editingPayment.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingPayment),
      });
      const data = await res.json();
      if (data.success) {
        setPayments(payments.map((p) => (p.id === editingPayment.id ? data.data : p)));
        setEditingPayment(null);
        showToast('Payment record updated!');
      }
    } catch (err) {
      showToast('Failed to update payment record');
    }
  };

  const handleDeletePayment = async (id: string) => {
    if (!confirm('Are you sure you want to delete this payment record?')) return;
    try {
      const res = await fetch(`/api/admin/payments/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setPayments(payments.filter((p) => p.id !== id));
        showToast('Payment record removed');
      }
    } catch (err) {
      showToast('Failed to delete payment');
    }
  };

  // Student Service Requests Handlers
  const handleAddStudentRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/eservices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'student', ...newStudentReq }),
      });
      const data = await res.json();
      if (data.success) {
        setStudentRequests([data.data, ...studentRequests]);
        setShowAddStudentReqModal(false);
        setNewStudentReq({
          studentName: '',
          studentEmail: '',
          serviceType: 'Transcript Request',
          program: 'Diploma in Islamic Finance',
          status: 'Pending',
        });
        showToast('Student service request logged!');
      }
    } catch (err) {
      showToast('Failed to log student request');
    }
  };

  const handleUpdateServiceRequest = async (id: string, status: 'Pending' | 'Processing' | 'Completed' | 'Rejected') => {
    try {
      const res = await fetch('/api/admin/eservices', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'student', id, status }),
      });
      const data = await res.json();
      if (data.success) {
        setStudentRequests(studentRequests.map((r) => (r.id === id ? data.data : r)));
        showToast(`Request marked as ${status}`);
      }
    } catch (err) {
      showToast('Failed to update service request');
    }
  };

  const handleDeleteStudentRequest = async (id: string) => {
    if (!confirm('Are you sure you want to delete this student request?')) return;
    try {
      const res = await fetch(`/api/admin/eservices?type=student&id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setStudentRequests(studentRequests.filter((r) => r.id !== id));
        showToast('Student request deleted');
      }
    } catch (err) {
      showToast('Failed to delete student request');
    }
  };

  // Faculty Registrations Handlers
  const handleAddFacultyReg = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/eservices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'faculty', ...newFacultyReg }),
      });
      const data = await res.json();
      if (data.success) {
        setFacultyRegs([data.data, ...facultyRegs]);
        setShowAddFacultyModal(false);
        setNewFacultyReg({
          name: '',
          email: '',
          institution: 'Al Noor Institute',
          department: 'Islamic Economics',
          specialization: 'Islamic Banking & Shariah Law',
          status: 'Pending Review',
        });
        showToast('Faculty member registered on roster!');
      }
    } catch (err) {
      showToast('Failed to register faculty member');
    }
  };

  const handleUpdateFacultyReg = async (id: string, status: 'Pending Review' | 'Registered' | 'Accredited') => {
    try {
      const res = await fetch('/api/admin/eservices', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'faculty', id, status }),
      });
      const data = await res.json();
      if (data.success) {
        setFacultyRegs(facultyRegs.map((f) => (f.id === id ? data.data : f)));
        showToast(`Faculty marked as ${status}`);
      }
    } catch (err) {
      showToast('Failed to update faculty status');
    }
  };

  const handleDeleteFacultyReg = async (id: string) => {
    if (!confirm('Are you sure you want to remove this faculty record?')) return;
    try {
      const res = await fetch(`/api/admin/eservices?type=faculty&id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setFacultyRegs(facultyRegs.filter((f) => f.id !== id));
        showToast('Faculty member removed');
      }
    } catch (err) {
      showToast('Failed to delete faculty member');
    }
  };

  // Observatory Handlers
  const handleSaveObservatory = async () => {
    if (!observatoryData) return;
    try {
      const res = await fetch('/api/admin/observatory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(observatoryData),
      });
      const data = await res.json();
      if (data.success) {
        setObservatoryData(data.data);
        showToast('Observatory Indices & Macro Telemetry synchronized!');
      }
    } catch (err) {
      showToast('Failed to save observatory data');
    }
  };

  // Complaints Handlers
  const handleAddComplaint = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/complaints', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newComplaint),
      });
      const data = await res.json();
      if (data.success) {
        setComplaints([data.data, ...complaints]);
        setShowAddComplaintModal(false);
        setNewComplaint({
          complainantName: '',
          complainantEmail: '',
          institutionName: '',
          subject: '',
          description: '',
          priority: 'medium' as any,
          status: 'Pending' as const,
        });
        showToast('Grievance appeal ticket registered!');
      }
    } catch (err) {
      showToast('Failed to log grievance ticket');
    }
  };

  const handleUpdateComplaintStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/complaints/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (data.success) {
        setComplaints(complaints.map((c) => (c.id === id ? data.data : c)));
        showToast(`Complaint marked as ${status}`);
      }
    } catch (err) {
      showToast('Failed to update complaint status');
    }
  };

  const handleDeleteComplaint = async (id: string) => {
    if (!confirm('Are you sure you want to remove this grievance record?')) return;
    try {
      const res = await fetch(`/api/complaints/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setComplaints(complaints.filter((c) => c.id !== id));
        showToast('Grievance record removed');
      }
    } catch (err) {
      showToast('Failed to delete complaint');
    }
  };

  // Logs Export & Clear
  const handleExportLogs = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(logs, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `giflri-audit-logs-${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Audit trail exported as JSON!');
  };

  const handleClearLogs = () => {
    if (confirm('Clear logs from current administrative session view?')) {
      setLogs([]);
      showToast('Session logs cleared from view');
    }
  };

  // Copy helper
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    showToast('Copied to clipboard!');
  };

  // Navigation Sidebar Groups
  const navigationGroups = [
    {
      title: 'Core Management',
      items: [
        { id: 'overview', label: 'Executive Dashboard', icon: LayoutDashboard, count: null },
        { id: 'content', label: 'Website Content CMS', icon: FileText, count: '8 Sections' },
        { id: 'media', label: 'Media & Assets Library', icon: ImageIcon, count: mediaAssets.length },
      ],
    },
    {
      title: 'Academic Registry',
      items: [
        { id: 'institutions', label: 'Institutions Directory', icon: Building2, count: institutions.length },
        { id: 'programs', label: 'Programs & Curricula', icon: BookOpen, count: programs.length },
        { id: 'applications', label: 'Affiliation Applications', icon: FileText, count: applications.length },
        { id: 'certificates', label: 'Verified Certificates', icon: Award, count: certificates.length },
      ],
    },
    {
      title: 'Research & Intelligence',
      items: [
        { id: 'research', label: 'Research Publications', icon: Microscope, count: researchPapers.length },
        { id: 'experts', label: 'Scholars Council', icon: Users, count: experts.length },
        { id: 'events', label: 'Conferences & Events', icon: Calendar, count: events.length },
        { id: 'observatory', label: 'Observatory & Indices', icon: BarChart2, count: 'Live' },
      ],
    },
    {
      title: 'Operations & Services',
      items: [
        { id: 'eservices', label: 'Student & Faculty Desks', icon: GraduationCap, count: studentRequests.length + facultyRegs.length },
        { id: 'payments', label: 'Fee Billing & Settlements', icon: CreditCard, count: payments.length },
        { id: 'complaints', label: 'Complaints & Appeals', icon: AlertCircle, count: complaints.length },
      ],
    },
    {
      title: 'Governance & Security',
      items: [
        { id: 'pillars', label: 'Strategic Pillars', icon: Shield, count: '4 Pillars' },
        { id: 'settings', label: 'Site Settings & Alert Bar', icon: Settings, count: null },
        { id: 'users', label: 'User Roles & Access', icon: UserCheck, count: usersList.length },
        { id: 'logs', label: 'Audit Trail & Activity', icon: Clock, count: logs.length },
      ],
    },
  ];

  // Chart telemetry mock data
  const growthData = [
    { month: 'Jan', institutions: 120, certificates: 450, research: 80 },
    { month: 'Feb', institutions: 135, certificates: 580, research: 95 },
    { month: 'Mar', institutions: 150, certificates: 710, research: 110 },
    { month: 'Apr', institutions: 168, certificates: 890, research: 130 },
    { month: 'May', institutions: 185, certificates: 1100, research: 160 },
    { month: 'Jun', institutions: 200, certificates: 1280, research: 195 },
  ];

  const distributionData = [
    { name: 'GCC & Middle East', value: 45, color: '#D4AF37' },
    { name: 'Southeast Asia', value: 25, color: '#10B981' },
    { name: 'North & West Africa', value: 18, color: '#3B82F6' },
    { name: 'Europe & UK', value: 12, color: '#8B5CF6' },
  ];

  if (!isAuthenticated || user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#02100E] via-[#041A17] to-[#010908] text-white flex flex-col justify-center py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans selection:bg-gold/30 selection:text-white">
        {/* Background Decorative Patterns */}
        <div className="fixed inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:28px_28px]" />
        <div className="fixed top-0 right-1/4 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="fixed bottom-0 left-10 w-[600px] h-[600px] bg-gold/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
          {/* Back to Homepage */}
          <div className="text-left mb-6">
            <Link
              href="/home"
              className="inline-flex items-center gap-2 text-xs text-gold/80 hover:text-gold font-bold px-3.5 py-2 rounded-xl bg-white/[0.05] border border-white/10 hover:border-gold/40 transition-all backdrop-blur-md"
            >
              <Globe className="w-3.5 h-3.5 text-gold" />
              <span>Return to Public Website</span>
            </Link>
          </div>

          {/* Admin Header Branding */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-18 h-18 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-tr from-amber-400 via-amber-500 to-amber-600 p-0.5 mx-auto mb-4 shadow-2xl shadow-amber-500/20"
            >
              <div className="w-full h-full bg-[#041A17] rounded-[22px] flex items-center justify-center">
                <ShieldAlert className="w-9 h-9 text-gold" />
              </div>
            </motion.div>

            <span className="inline-block px-3.5 py-1 rounded-full bg-amber-500/15 text-gold border border-amber-500/30 text-[10px] font-extrabold uppercase tracking-widest mb-2 font-mono">
              Restricted Directorate Area
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-heading tracking-tight">
              Executive Admin Console
            </h1>
            <p className="text-xs sm:text-sm text-emerald-200/70 mt-2 max-w-sm mx-auto">
              Please enter your authorized Secretariat credentials to access the central management directorate.
            </p>
          </div>

          {/* Login Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-3xl bg-[#062420]/85 border border-gold/30 backdrop-blur-2xl p-6 sm:p-8 shadow-2xl space-y-5"
          >
            {/* Error Banner */}
            {authError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3.5 rounded-2xl bg-red-500/20 border border-red-500/40 text-red-200 text-xs flex items-center gap-2.5"
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400" />
                <span>{authError}</span>
              </motion.div>
            )}

            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-gold uppercase tracking-wider mb-2">
                  Admin Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/70" />
                  <input
                    type="email"
                    required
                    autoFocus
                    placeholder="e.g. admin@giflri.org"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full bg-[#031714] border border-white/15 text-white pl-10 pr-4 py-3 rounded-xl text-sm focus:border-gold focus:outline-none placeholder:text-white/30 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gold uppercase tracking-wider mb-2">
                  Security Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/70" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Enter security password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full bg-[#031714] border border-white/15 text-white pl-10 pr-10 py-3 rounded-xl text-sm focus:border-gold focus:outline-none placeholder:text-white/30 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/50 hover:text-gold transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={authSubmitting}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-emerald-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 hover:brightness-110 active:scale-[0.99] transition-all disabled:opacity-50 cursor-pointer"
              >
                {authSubmitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Authenticating Console...
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    Sign In to Admin Console
                  </>
                )}
              </button>
            </form>

            <div className="pt-4 border-t border-white/10 text-center text-[11px] text-emerald-200/50 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Cryptographic Session Integrity • ISO 9001:2026</span>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#02100E] via-[#041A17] to-[#010908] text-white font-sans selection:bg-gold/30 selection:text-white w-full max-w-full overflow-x-hidden relative">
      {/* Background Decorative Patterns */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:28px_28px]" />
      <div className="fixed top-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="fixed bottom-0 left-10 w-[400px] h-[400px] bg-gold/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Floating Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 0.9 }}
            className="fixed top-6 right-6 z-50 bg-[#062924]/95 text-gold px-6 py-3.5 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.7)] flex items-center gap-3 border border-gold/40 text-sm font-semibold backdrop-blur-2xl"
          >
            <CheckCircle className="w-5 h-5 text-gold shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* TOP COMMAND BAR */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-40 bg-[#031714]/95 backdrop-blur-2xl border-b border-emerald-500/20 shadow-xl w-full">
        <div className="max-w-[1720px] mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
          {/* Left: Mobile Drawer Trigger + Secretariat Brand Identification */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 min-w-0">
            {/* Mobile Hamburger Drawer Trigger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-gold hover:text-white transition-all cursor-pointer shadow-sm shrink-0"
              aria-label="Open Admin Menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-amber-400 via-amber-500 to-amber-600 p-0.5 shadow-lg shadow-amber-500/20 flex items-center justify-center shrink-0">
              <div className="w-full h-full bg-[#041A17] rounded-[14px] flex items-center justify-center">
                <ShieldAlert className="w-4 h-4 sm:w-5 sm:h-5 text-gold" />
              </div>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-heading font-extrabold text-sm sm:text-base text-white tracking-tight leading-none">
                  GIFLRI
                </span>
                <span className="text-[9px] uppercase font-mono font-bold px-1.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 whitespace-nowrap">
                  Admin
                </span>
              </div>
              <span className="text-[8px] sm:text-[9px] tracking-wider uppercase font-bold text-gold/90 mt-0.5 block truncate max-w-[120px] sm:max-w-none">
                Executive Console
              </span>
            </div>
          </div>

          {/* Quick System Status Pills (Visible on 2xl) */}
          <div className="hidden 2xl:flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white/80">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>MongoDB Engine: <strong className="text-emerald-300 font-mono font-medium">Online</strong></span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white/80">
              <Activity className="w-3.5 h-3.5 text-gold" />
              <span>Security Latency: <strong className="text-gold font-mono font-medium">18ms</strong></span>
            </div>
          </div>

          {/* Header Action Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <Link
              href="/home"
              className="hidden sm:flex p-2 sm:px-3 sm:py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-white text-xs font-bold transition-all items-center gap-1.5 shadow-sm hover:border-gold/40"
              title="Return to Public Website"
            >
              <Globe className="w-3.5 h-3.5 text-gold" />
              <span>Website</span>
            </Link>

            <button
              onClick={fetchAllData}
              disabled={loading}
              className="p-2 sm:px-3 sm:py-2 rounded-xl bg-emerald-900/50 hover:bg-emerald-800/70 border border-emerald-500/30 text-emerald-200 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm cursor-pointer disabled:opacity-50"
              title="Sync Data"
            >
              <RefreshCw className={cn('w-3.5 h-3.5 text-amber-300', loading && 'animate-spin')} />
              <span className="hidden md:inline">{loading ? 'Syncing...' : 'Sync'}</span>
            </button>

            <Link
              href="/verify"
              className="hidden md:flex p-2 sm:px-3.5 sm:py-2 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-emerald-950 text-xs font-extrabold shadow-md hover:brightness-110 transition-all items-center gap-1.5"
              title="Verification Portal"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">Verification</span>
            </Link>

            <button
              onClick={handleAdminLogout}
              className="p-2 sm:px-3 sm:py-2 rounded-xl bg-red-900/40 hover:bg-red-800/60 border border-red-500/40 text-red-200 hover:text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5 text-red-400" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* MOBILE QUICK-TABS HORIZONTAL STRIP (lg:hidden) */}
      {/* ========================================================================= */}
      <div className="lg:hidden sticky top-16 z-30 bg-[#031714]/98 backdrop-blur-2xl border-b border-emerald-500/20 px-3 py-2 w-full max-w-full overflow-x-auto scrollbar-none flex items-center gap-2">
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="px-3 py-1.5 rounded-xl bg-amber-400/20 text-gold border border-gold/40 text-xs font-bold shrink-0 flex items-center gap-1.5 shadow-sm cursor-pointer"
        >
          <Menu className="w-3.5 h-3.5" />
          <span>Sections ({navigationGroups.reduce((acc, g) => acc + g.items.length, 0)})</span>
        </button>
        {navigationGroups.flatMap((g) => g.items).map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                setSearchTerm('');
              }}
              className={cn(
                'px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer',
                isActive
                  ? 'bg-gradient-to-r from-amber-400 to-amber-600 text-emerald-950 shadow-md font-extrabold'
                  : 'bg-white/5 text-white/75 hover:bg-white/10 hover:text-white border border-white/5'
              )}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span>{tab.label}</span>
              {tab.count !== null && (
                <span
                  className={cn(
                    'text-[9px] px-1.5 py-0.2 rounded-full font-mono font-bold',
                    isActive ? 'bg-emerald-950/30 text-emerald-950' : 'bg-white/10 text-white/60'
                  )}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* MOBILE NAVIGATION DRAWER / SHEET (lg:hidden) */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Drawer Sheet */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="relative z-10 w-[85%] max-w-sm h-full bg-[#041A17] border-r border-gold/30 shadow-2xl flex flex-col justify-between overflow-hidden"
            >
              {/* Drawer Header */}
              <div className="p-4 sm:p-5 border-b border-emerald-500/20 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-400 to-amber-600 p-0.5 flex items-center justify-center shrink-0">
                    <div className="w-full h-full bg-[#041A17] rounded-[10px] flex items-center justify-center">
                      <ShieldAlert className="w-4 h-4 text-gold" />
                    </div>
                  </div>
                  <div>
                    <div className="font-heading font-extrabold text-sm text-white leading-tight">GIFLRI Admin</div>
                    <div className="text-[9px] uppercase tracking-wider text-gold font-bold">Executive Console</div>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white hover:text-gold transition-colors border border-white/10 cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Menu Items */}
              <div className="flex-1 p-4 space-y-5 overflow-y-auto custom-scrollbar">
                {navigationGroups.map((group, gIdx) => (
                  <div key={gIdx} className="space-y-1">
                    <div className="text-[10px] uppercase font-extrabold tracking-widest text-gold/80 px-3 py-1">
                      {group.title}
                    </div>
                    {group.items.map((tab) => {
                      const Icon = tab.icon;
                      const isActive = activeTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => {
                            setActiveTab(tab.id as any);
                            setSearchTerm('');
                            setMobileMenuOpen(false);
                          }}
                          className={cn(
                            'w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-medium transition-all text-left cursor-pointer',
                            isActive
                              ? 'bg-gradient-to-r from-amber-400/25 via-amber-400/15 to-transparent text-gold font-bold border-l-4 border-amber-400 shadow-md'
                              : 'text-emerald-100/75 hover:bg-white/[0.05] hover:text-white border-l-4 border-transparent'
                          )}
                        >
                          <div className="flex items-center gap-3 truncate">
                            <Icon className={cn('w-4 h-4 shrink-0', isActive ? 'text-gold' : 'text-emerald-300/60')} />
                            <span className="truncate">{tab.label}</span>
                          </div>
                          {tab.count !== null && (
                            <span
                              className={cn(
                                'text-[10px] px-2 py-0.5 rounded-full font-bold ml-2 shrink-0 font-mono',
                                isActive
                                  ? 'bg-amber-400 text-emerald-950'
                                  : 'bg-emerald-900/50 text-emerald-300 border border-emerald-700/30'
                              )}
                            >
                              {tab.count}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>

              {/* Drawer Footer Profile & Sign Out */}
              <div className="p-4 border-t border-emerald-500/20 bg-[#031512] space-y-3 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 via-amber-500 to-amber-600 text-emerald-950 font-extrabold flex items-center justify-center text-sm shadow-md shrink-0">
                    {user?.name ? user.name.charAt(0) : 'A'}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-bold text-white truncate">{user?.name || 'Dr. Tariq Al-Mansoor'}</div>
                    <div className="text-[10px] text-emerald-300/70 font-mono truncate">{user?.email || 'admin@giflri.org'}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/home"
                    className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Globe className="w-3.5 h-3.5 text-gold" />
                    <span>Website</span>
                  </Link>
                  <button
                    onClick={handleAdminLogout}
                    className="px-3 py-2 rounded-xl bg-red-950/40 hover:bg-red-900/60 border border-red-500/30 text-red-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5 text-red-400" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* MAIN CONSOLE LAYOUT (SIDEBAR + CONTENT) */}
      {/* ========================================================================= */}
      <div className="max-w-[1720px] mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* ===================================================================== */}
          {/* SIDEBAR NAVIGATION (Desktop only: hidden lg:block) */}
          {/* ===================================================================== */}
          <aside className="hidden lg:block lg:col-span-3 space-y-6 sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto pr-1 custom-scrollbar">
            <div className="p-4 rounded-3xl bg-[#062420]/80 border border-emerald-500/20 backdrop-blur-2xl shadow-2xl space-y-6">
              {navigationGroups.map((group, gIdx) => (
                <div key={gIdx} className="space-y-1">
                  <div className="text-[10px] uppercase font-extrabold tracking-widest text-gold/80 px-3 py-1 flex items-center justify-between">
                    <span>{group.title}</span>
                  </div>
                  {group.items.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => {
                          setActiveTab(tab.id as any);
                          setSearchTerm('');
                        }}
                        className={cn(
                          'w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-medium transition-all text-left cursor-pointer group',
                          isActive
                            ? 'bg-gradient-to-r from-amber-400/25 via-amber-400/15 to-transparent text-gold font-bold border-l-4 border-amber-400 shadow-md'
                            : 'text-emerald-100/75 hover:bg-white/[0.05] hover:text-white border-l-4 border-transparent'
                        )}
                      >
                        <div className="flex items-center gap-3 truncate">
                          <Icon className={cn('w-4 h-4 shrink-0 transition-transform group-hover:scale-110', isActive ? 'text-gold' : 'text-emerald-300/60')} />
                          <span className="truncate">{tab.label}</span>
                        </div>
                        {tab.count !== null && (
                          <span
                            className={cn(
                              'text-[10px] px-2 py-0.5 rounded-full font-bold ml-2 shrink-0 font-mono',
                              isActive
                                ? 'bg-amber-400 text-emerald-950 shadow-sm'
                                : 'bg-emerald-900/50 text-emerald-300 border border-emerald-700/30'
                            )}
                          >
                            {tab.count}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              ))}

              {/* Sidebar Identity Footer */}
              <div className="pt-4 border-t border-emerald-500/20 space-y-3">
                <div className="flex items-center gap-3 px-2">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 via-amber-500 to-amber-600 text-emerald-950 font-extrabold flex items-center justify-center text-sm shadow-md shrink-0">
                    {user?.name ? user.name.charAt(0) : 'A'}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-bold text-white truncate">{user?.name || 'Dr. Tariq Al-Mansoor'}</div>
                    <div className="text-[10px] text-emerald-300/70 font-mono truncate">{user?.email || 'admin@giflri.org'}</div>
                    <span className="inline-block mt-0.5 text-[9px] uppercase font-extrabold px-1.5 py-0.2 rounded bg-gold/15 text-gold border border-gold/30">
                      Directorate Admin
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleAdminLogout}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-red-950/40 hover:bg-red-900/60 border border-red-500/30 text-red-200 text-xs font-bold transition-all hover:text-white shadow-md cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5 text-red-400" />
                  <span>Sign Out / Logout</span>
                </button>
              </div>
            </div>
          </aside>

          {/* ===================================================================== */}
          {/* MAIN CONTENT WORKSPACE */}
          {/* ===================================================================== */}
          <main className="w-full lg:col-span-9 space-y-6 min-w-0">

            {/* =================================================================== */}
            {/* TAB: OVERVIEW / EXECUTIVE DASHBOARD */}
            {/* =================================================================== */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* 4 Hero KPI Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    {
                      label: 'Accredited Institutions',
                      value: institutions.length,
                      icon: Building2,
                      trend: '+14% YoY',
                      color: 'emerald',
                      gradient: 'from-emerald-500/20 via-emerald-500/5 to-transparent border-emerald-500/30',
                      iconBg: 'bg-emerald-500/20 text-emerald-300',
                    },
                    {
                      label: 'Standard Curricula & Modules',
                      value: programs.length,
                      icon: BookOpen,
                      trend: '8 Academic Fields',
                      color: 'gold',
                      gradient: 'from-amber-500/20 via-amber-500/5 to-transparent border-amber-500/30',
                      iconBg: 'bg-amber-500/20 text-gold',
                    },
                    {
                      label: 'Affiliation Applications',
                      value: applications.length,
                      icon: FileText,
                      trend: `${applications.filter((a) => a.status === 'Submitted' || a.status === 'Under Review').length} Pending Audits`,
                      color: 'cyan',
                      gradient: 'from-cyan-500/20 via-cyan-500/5 to-transparent border-cyan-500/30',
                      iconBg: 'bg-cyan-500/20 text-cyan-300',
                    },
                    {
                      label: 'Issued Credentials',
                      value: certificates.length,
                      icon: Award,
                      trend: '100% Cryptographic',
                      color: 'purple',
                      gradient: 'from-purple-500/20 via-purple-500/5 to-transparent border-purple-500/30',
                      iconBg: 'bg-purple-500/20 text-purple-300',
                    },
                  ].map((kpi, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className={cn(
                        'p-5 rounded-3xl bg-gradient-to-b border backdrop-blur-xl shadow-xl hover:scale-[1.02] transition-all relative overflow-hidden group',
                        kpi.gradient
                      )}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className={cn('p-2.5 rounded-2xl border border-white/10 shadow-inner', kpi.iconBg)}>
                          <kpi.icon className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/[0.08] text-white/90 border border-white/15 font-mono">
                          {kpi.trend}
                        </span>
                      </div>
                      <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-heading">
                        {kpi.value}
                      </div>
                      <div className="text-xs font-semibold text-emerald-200/80 mt-1">{kpi.label}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Interactive Visual Analytics (Charts) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full min-w-0 max-w-full">
                  {/* Monthly Growth Telemetry Chart */}
                  <div className="lg:col-span-8 p-4 sm:p-6 rounded-3xl bg-[#062420]/80 border border-emerald-500/20 backdrop-blur-2xl shadow-xl w-full min-w-0 max-w-full overflow-hidden">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-6">
                      <div>
                        <h3 className="font-heading text-base sm:text-lg font-bold text-white flex items-center gap-2">
                          <TrendingUp className="w-5 h-5 text-gold" />
                          Accreditation & Registry Growth Telemetry
                        </h3>
                        <p className="text-xs text-emerald-200/60 mt-0.5">
                          Monthly progression of partner universities, verified diplomas, and papers
                        </p>
                      </div>
                      <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 shrink-0">
                        Live 2026-2027
                      </span>
                    </div>

                    <div className="h-64 w-full min-w-0 max-w-full overflow-hidden">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={growthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                          <defs>
                            <linearGradient id="gradCert" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.4} />
                              <stop offset="95%" stopColor="#D4AF37" stopOpacity={0.0} />
                            </linearGradient>
                            <linearGradient id="gradInst" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                              <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                          <XAxis dataKey="month" stroke="#ffffff60" fontSize={11} />
                          <YAxis stroke="#ffffff60" fontSize={11} />
                          <Tooltip
                            contentStyle={{ backgroundColor: '#062924', borderColor: '#D4AF3740', borderRadius: 12, color: '#fff' }}
                          />
                          <Area type="monotone" dataKey="certificates" stroke="#D4AF37" fillOpacity={1} fill="url(#gradCert)" name="Verified Diplomas" strokeWidth={2} />
                          <Area type="monotone" dataKey="institutions" stroke="#10B981" fillOpacity={1} fill="url(#gradInst)" name="Institutions" strokeWidth={2} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Regional Distribution Pie Chart */}
                  <div className="lg:col-span-4 p-4 sm:p-6 rounded-3xl bg-[#062420]/80 border border-emerald-500/20 backdrop-blur-2xl shadow-xl flex flex-col justify-between w-full min-w-0 max-w-full overflow-hidden">
                    <div>
                      <h3 className="font-heading text-base sm:text-lg font-bold text-white flex items-center gap-2">
                        <Globe className="w-5 h-5 text-gold" />
                        Regional Footprint Share
                      </h3>
                      <p className="text-xs text-emerald-200/60 mt-0.5">Distribution across key jurisdictions</p>
                    </div>

                    <div className="h-44 w-full min-w-0 max-w-full overflow-hidden my-2">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={distributionData}
                            cx="50%"
                            cy="50%"
                            innerRadius={45}
                            outerRadius={68}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {distributionData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip
                            contentStyle={{ backgroundColor: '#062924', borderColor: '#D4AF3740', borderRadius: 12, color: '#fff' }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="space-y-1.5 text-xs">
                      {distributionData.map((d, i) => (
                        <div key={i} className="flex items-center justify-between text-ivory/80">
                          <span className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                            <span>{d.name}</span>
                          </span>
                          <span className="font-mono font-bold text-white">{d.value}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Fast Action Launch Hub */}
                <div className="p-6 rounded-3xl bg-[#062420]/80 border border-emerald-500/20 backdrop-blur-2xl shadow-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-heading text-base sm:text-lg font-bold text-white flex items-center gap-2">
                      <Zap className="w-5 h-5 text-amber-400" />
                      Executive Fast Actions
                    </h3>
                    <span className="text-xs text-emerald-200/60">One-click creation workflows</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                    <button
                      onClick={() => setShowAddInstModal(true)}
                      className="p-3.5 rounded-2xl bg-white/[0.04] hover:bg-gold/15 border border-white/10 hover:border-gold/40 text-center transition-all group cursor-pointer"
                    >
                      <Building2 className="w-6 h-6 text-gold mx-auto mb-2 group-hover:scale-110 transition-transform" />
                      <span className="text-xs font-bold text-white block truncate">+ Institution</span>
                    </button>

                    <button
                      onClick={() => setShowAddCertModal(true)}
                      className="p-3.5 rounded-2xl bg-white/[0.04] hover:bg-gold/15 border border-white/10 hover:border-gold/40 text-center transition-all group cursor-pointer"
                    >
                      <Award className="w-6 h-6 text-gold mx-auto mb-2 group-hover:scale-110 transition-transform" />
                      <span className="text-xs font-bold text-white block truncate">+ Certificate</span>
                    </button>

                    <button
                      onClick={() => setShowAddProgModal(true)}
                      className="p-3.5 rounded-2xl bg-white/[0.04] hover:bg-gold/15 border border-white/10 hover:border-gold/40 text-center transition-all group cursor-pointer"
                    >
                      <BookOpen className="w-6 h-6 text-gold mx-auto mb-2 group-hover:scale-110 transition-transform" />
                      <span className="text-xs font-bold text-white block truncate">+ Program</span>
                    </button>

                    <button
                      onClick={() => setShowAddPaperModal(true)}
                      className="p-3.5 rounded-2xl bg-white/[0.04] hover:bg-gold/15 border border-white/10 hover:border-gold/40 text-center transition-all group cursor-pointer"
                    >
                      <Microscope className="w-6 h-6 text-gold mx-auto mb-2 group-hover:scale-110 transition-transform" />
                      <span className="text-xs font-bold text-white block truncate">+ Publication</span>
                    </button>

                    <button
                      onClick={() => setShowAddEventModal(true)}
                      className="p-3.5 rounded-2xl bg-white/[0.04] hover:bg-gold/15 border border-white/10 hover:border-gold/40 text-center transition-all group cursor-pointer"
                    >
                      <Calendar className="w-6 h-6 text-gold mx-auto mb-2 group-hover:scale-110 transition-transform" />
                      <span className="text-xs font-bold text-white block truncate">+ Event</span>
                    </button>

                    <button
                      onClick={() => setShowAddMediaModal(true)}
                      className="p-3.5 rounded-2xl bg-white/[0.04] hover:bg-gold/15 border border-white/10 hover:border-gold/40 text-center transition-all group cursor-pointer"
                    >
                      <ImageIcon className="w-6 h-6 text-gold mx-auto mb-2 group-hover:scale-110 transition-transform" />
                      <span className="text-xs font-bold text-white block truncate">+ Media Asset</span>
                    </button>
                  </div>
                </div>

                {/* Recent Audit Trail Stream */}
                <div className="p-6 rounded-3xl bg-[#062420]/80 border border-emerald-500/20 backdrop-blur-2xl shadow-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-heading text-base sm:text-lg font-bold text-white flex items-center gap-2">
                      <Clock className="w-5 h-5 text-gold" />
                      Live Audit Log Stream
                    </h3>
                    <button
                      onClick={() => setActiveTab('logs')}
                      className="text-xs font-bold text-gold hover:underline cursor-pointer"
                    >
                      View All Logs →
                    </button>
                  </div>

                  <div className="space-y-2">
                    {logs.slice(0, 5).map((log) => (
                      <div
                        key={log.id}
                        className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-2 h-2 rounded-full bg-emerald-400" />
                          <span className="font-bold text-white">{log.action}</span>
                          <span className="text-white/60">• {log.details}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-emerald-300/60 text-[11px]">{log.user}</span>
                          <span className="text-white/40 text-[10px]">{log.timestamp}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* =================================================================== */}
            {/* TAB: INSTITUTIONS DIRECTORY */}
            {/* =================================================================== */}
            {activeTab === 'institutions' && (
              <div className="space-y-6">
                <div className="p-6 rounded-3xl bg-[#062420]/80 border border-emerald-500/20 backdrop-blur-2xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="font-heading text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
                      <Building2 className="w-6 h-6 text-gold" />
                      Institutions Directory ({institutions.length})
                    </h2>
                    <p className="text-xs text-emerald-200/70 mt-1">
                      Manage accredited universities, colleges, and affiliated Islamic finance centers
                    </p>
                  </div>
                  <button
                    onClick={() => setShowAddInstModal(true)}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-emerald-950 text-xs font-bold shadow-lg hover:brightness-110 transition-all flex items-center gap-2 cursor-pointer shrink-0"
                  >
                    <Plus className="w-4 h-4" /> Add Institution
                  </button>
                </div>

                {/* Filter Search */}
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by institution name, country, city, or ID..."
                    className="w-full px-4 py-3 pl-11 rounded-2xl bg-[#062420]/80 border border-emerald-500/20 text-white placeholder:text-white/40 text-sm outline-none focus:border-gold"
                  />
                  <Search className="w-4 h-4 text-gold absolute left-4 top-1/2 -translate-y-1/2" />
                </div>

                {/* Data Table */}
                <div className="rounded-3xl bg-[#062420]/80 border border-emerald-500/20 backdrop-blur-2xl shadow-xl overflow-hidden">
                  <div className="overflow-x-auto scrollbar-thin">
                    <table className="w-full text-left text-xs min-w-[640px]">
                      <thead className="bg-white/[0.04] text-gold uppercase tracking-wider font-extrabold text-[10px] border-b border-white/10">
                        <tr>
                          <th className="py-3.5 px-4">Institution Name</th>
                          <th className="py-3.5 px-4">Country / City</th>
                          <th className="py-3.5 px-4">Type</th>
                          <th className="py-3.5 px-4">Status</th>
                          <th className="py-3.5 px-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {institutions
                          .filter((inst) =>
                            inst.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            inst.country.toLowerCase().includes(searchTerm.toLowerCase())
                          )
                          .map((inst) => (
                            <tr key={inst.id} className="hover:bg-white/[0.03] transition-colors">
                              <td className="py-3.5 px-4 font-bold text-white">
                                <div>{inst.name}</div>
                                <div className="text-[10px] text-white/50 font-mono font-normal">{inst.id}</div>
                              </td>
                              <td className="py-3.5 px-4 text-ivory/80">
                                {inst.country}, {inst.city}
                              </td>
                              <td className="py-3.5 px-4 text-ivory/80">{inst.type}</td>
                              <td className="py-3.5 px-4">
                                <span
                                  className={cn(
                                    'px-2.5 py-0.5 rounded-full text-[10px] font-bold border',
                                    inst.status === 'Active'
                                      ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                                      : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                                  )}
                                >
                                  {inst.status}
                                </span>
                              </td>
                              <td className="py-3.5 px-4">
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => setEditingInst(inst)}
                                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gold transition-colors cursor-pointer"
                                    title="Edit"
                                  >
                                    <Edit className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteInstitution(inst.id)}
                                    className="p-1.5 rounded-lg bg-red-900/30 hover:bg-red-800/50 text-red-300 transition-colors cursor-pointer"
                                    title="Delete"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* =================================================================== */}
            {/* TAB: PROGRAMS & CURRICULA */}
            {/* =================================================================== */}
            {activeTab === 'programs' && (
              <div className="space-y-6">
                <div className="p-6 rounded-3xl bg-[#062420]/80 border border-emerald-500/20 backdrop-blur-2xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="font-heading text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
                      <BookOpen className="w-6 h-6 text-gold" />
                      Programs & Master Curricula ({programs.length})
                    </h2>
                    <p className="text-xs text-emerald-200/70 mt-1">
                      Standardized curriculum modules, learning hours, and certification frameworks
                    </p>
                  </div>
                  <button
                    onClick={() => setShowAddProgModal(true)}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-emerald-950 text-xs font-bold shadow-lg hover:brightness-110 transition-all flex items-center gap-2 cursor-pointer shrink-0"
                  >
                    <Plus className="w-4 h-4" /> Add Program
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {programs.map((prog) => (
                    <div
                      key={prog.id}
                      className="p-5 rounded-3xl bg-[#062420]/80 border border-emerald-500/20 backdrop-blur-2xl shadow-xl flex flex-col justify-between hover:border-gold/40 transition-all"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                          <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-gold/15 text-gold border border-gold/30">
                            {prog.level}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono">
                            {prog.category}
                          </span>
                        </div>
                        <h3 className="font-heading font-bold text-base text-white mb-2">{prog.title}</h3>
                        <p className="text-xs text-emerald-100/70 leading-relaxed mb-3 line-clamp-3">
                          {prog.description}
                        </p>
                        <div className="flex items-center gap-3 text-[11px] text-emerald-200/60 mb-3">
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-gold" /> {prog.duration || '1 Year'}</span>
                          <span className="flex items-center gap-1"><Layers className="w-3 h-3 text-gold" /> {prog.mode || 'Blended'}</span>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                        <span className="text-white/60 font-mono">{prog.hours}</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setEditingProg(prog)}
                            className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold text-xs transition-colors cursor-pointer"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteProgram(prog.id)}
                            className="px-2.5 py-1 rounded-lg bg-red-900/30 hover:bg-red-800/50 text-red-300 font-bold text-xs transition-colors cursor-pointer"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* =================================================================== */}
            {/* TAB: AFFILIATION APPLICATIONS */}
            {/* =================================================================== */}
            {activeTab === 'applications' && (
              <div className="space-y-6">
                <div className="p-6 rounded-3xl bg-[#062420]/80 border border-emerald-500/20 backdrop-blur-2xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="font-heading text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
                      <FileText className="w-6 h-6 text-gold" />
                      Affiliation Applications ({applications.length})
                    </h2>
                    <p className="text-xs text-emerald-200/70 mt-1">
                      Multi-stage audit review & institutional accreditation workflows
                    </p>
                  </div>
                </div>

                {/* Application Search */}
                <div className="relative">
                  <input
                    type="text"
                    value={appSearchTerm}
                    onChange={(e) => setAppSearchTerm(e.target.value)}
                    placeholder="Search applications by institution, contact person, country, or stage..."
                    className="w-full px-4 py-3 pl-11 rounded-2xl bg-[#062420]/80 border border-emerald-500/20 text-white placeholder:text-white/40 text-sm outline-none focus:border-gold"
                  />
                  <Search className="w-4 h-4 text-gold absolute left-4 top-1/2 -translate-y-1/2" />
                </div>

                <div className="space-y-4">
                  {applications
                    .filter((app) =>
                      !appSearchTerm ||
                      app.institutionName.toLowerCase().includes(appSearchTerm.toLowerCase()) ||
                      app.country.toLowerCase().includes(appSearchTerm.toLowerCase()) ||
                      app.contactPerson.toLowerCase().includes(appSearchTerm.toLowerCase()) ||
                      (app.currentStage && app.currentStage.toLowerCase().includes(appSearchTerm.toLowerCase()))
                    )
                    .map((app) => (
                    <div
                      key={app.id}
                      className="p-5 rounded-3xl bg-[#062420]/80 border border-emerald-500/20 backdrop-blur-2xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-gold/30 transition-all"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
                          <h3 className="font-heading font-bold text-base text-white">{app.institutionName}</h3>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-lg bg-white/5 text-white/70 border border-white/10">
                            {app.country}
                          </span>
                          <span className={cn(
                            'text-[10px] font-bold px-2 py-0.5 rounded-full border',
                            app.status === 'Approved' ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30' :
                            app.status === 'Rejected' ? 'bg-red-500/15 text-red-300 border-red-500/30' :
                            'bg-amber-500/15 text-amber-300 border-amber-500/30'
                          )}>
                            Status: {app.status || 'Under Review'}
                          </span>
                        </div>
                        <div className="text-xs text-emerald-200/70 flex items-center gap-4 flex-wrap">
                          <span>Contact: <strong className="text-white">{app.contactPerson}</strong> ({app.contactEmail})</span>
                          <span>Stage: <strong className="text-gold">{app.currentStage}</strong></span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 flex-wrap">
                        <button
                          onClick={() => setViewingApp(app)}
                          className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-gold text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                        >
                          <Eye className="w-3.5 h-3.5" /> View Dossier
                        </button>
                        <button
                          onClick={() => handleUpdateAppStatus(app.id, 'Approved')}
                          className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold hover:bg-emerald-500/30 cursor-pointer"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleUpdateAppStatus(app.id, 'Under Review')}
                          className="px-3 py-1.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold hover:bg-amber-500/30 cursor-pointer"
                        >
                          Review
                        </button>
                        <button
                          onClick={() => handleUpdateAppStatus(app.id, 'Rejected')}
                          className="px-3 py-1.5 rounded-xl bg-red-500/20 text-red-300 border border-red-500/40 text-xs font-bold hover:bg-red-500/30 cursor-pointer"
                        >
                          Reject
                        </button>
                        <button
                          onClick={() => handleDeleteApplication(app.id)}
                          className="p-1.5 rounded-xl bg-red-900/30 hover:bg-red-800/50 text-red-300 transition-colors cursor-pointer"
                          title="Delete Application"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* =================================================================== */}
            {/* TAB: VERIFIED CERTIFICATES */}
            {/* =================================================================== */}
            {activeTab === 'certificates' && (
              <div className="space-y-6">
                <div className="p-6 rounded-3xl bg-[#062420]/80 border border-emerald-500/20 backdrop-blur-2xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="font-heading text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
                      <Award className="w-6 h-6 text-gold" />
                      Verified Certificates Registry ({certificates.length})
                    </h2>
                    <p className="text-xs text-emerald-200/70 mt-1">
                      Cryptographically signed diplomas, credentials, and QR verification
                    </p>
                  </div>
                  <button
                    onClick={() => setShowAddCertModal(true)}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-emerald-950 text-xs font-bold shadow-lg hover:brightness-110 transition-all flex items-center gap-2 cursor-pointer shrink-0"
                  >
                    <Plus className="w-4 h-4" /> Issue Certificate
                  </button>
                </div>

                {/* Certificate Search */}
                <div className="relative">
                  <input
                    type="text"
                    value={certSearchTerm}
                    onChange={(e) => setCertSearchTerm(e.target.value)}
                    placeholder="Search certificates by scholar name, certificate ID, program, or institution..."
                    className="w-full px-4 py-3 pl-11 rounded-2xl bg-[#062420]/80 border border-emerald-500/20 text-white placeholder:text-white/40 text-sm outline-none focus:border-gold"
                  />
                  <Search className="w-4 h-4 text-gold absolute left-4 top-1/2 -translate-y-1/2" />
                </div>

                <div className="rounded-3xl bg-[#062420]/80 border border-emerald-500/20 backdrop-blur-2xl shadow-xl overflow-hidden">
                  <div className="overflow-x-auto scrollbar-thin">
                    <table className="w-full text-left text-xs min-w-[640px]">
                      <thead className="bg-white/[0.04] text-gold uppercase tracking-wider font-extrabold text-[10px] border-b border-white/10">
                        <tr>
                          <th className="py-3.5 px-4">Certificate ID</th>
                          <th className="py-3.5 px-4">Scholar Name</th>
                          <th className="py-3.5 px-4">Program & Institution</th>
                          <th className="py-3.5 px-4">Grade</th>
                          <th className="py-3.5 px-4">Status</th>
                          <th className="py-3.5 px-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {certificates
                          .filter((cert) =>
                            !certSearchTerm ||
                            cert.studentName.toLowerCase().includes(certSearchTerm.toLowerCase()) ||
                            cert.certId.toLowerCase().includes(certSearchTerm.toLowerCase()) ||
                            cert.program.toLowerCase().includes(certSearchTerm.toLowerCase()) ||
                            cert.institution.toLowerCase().includes(certSearchTerm.toLowerCase())
                          )
                          .map((cert) => (
                          <tr key={cert.id || cert.certId} className="hover:bg-white/[0.03] transition-colors">
                            <td className="py-3.5 px-4 font-mono font-bold text-gold">
                              {cert.certId}
                            </td>
                            <td className="py-3.5 px-4 font-bold text-white">{cert.studentName}</td>
                            <td className="py-3.5 px-4 text-ivory/80">
                              <div>{cert.program}</div>
                              <div className="text-[10px] text-white/50">{cert.institution}</div>
                            </td>
                            <td className="py-3.5 px-4 font-semibold text-emerald-300">{cert.grade}</td>
                            <td className="py-3.5 px-4">
                              <span
                                className={cn(
                                  'px-2 py-0.5 rounded-full text-[10px] font-bold',
                                  cert.status === 'Verified'
                                    ? 'bg-emerald-500/20 text-emerald-300'
                                    : 'bg-red-500/20 text-red-300'
                                )}
                              >
                                {cert.status}
                              </span>
                            </td>
                            <td className="py-3.5 px-4">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => setViewingCert(cert)}
                                  className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-gold text-xs font-bold cursor-pointer"
                                  title="View Certificate Diploma Modal"
                                >
                                  Diploma
                                </button>
                                <button
                                  onClick={() => setEditingCert(cert)}
                                  className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-gold cursor-pointer"
                                  title="Edit Certificate Details"
                                >
                                  <Edit className="w-3.5 h-3.5" />
                                </button>
                                {cert.status === 'Verified' ? (
                                  <button
                                    onClick={() => handleRevokeCertificate(cert.certId)}
                                    className="text-amber-400 hover:text-amber-300 text-xs font-bold cursor-pointer px-2 py-1 rounded-lg bg-amber-500/10"
                                  >
                                    Revoke
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => handleEditCertificate({ preventDefault: () => {} } as any)}
                                    className="text-emerald-400 hover:text-emerald-300 text-xs font-bold cursor-pointer px-2 py-1 rounded-lg bg-emerald-500/10"
                                  >
                                    Verify
                                  </button>
                                )}
                                <button
                                  onClick={() => handleDeleteCertificate(cert.id || cert.certId)}
                                  className="p-1 rounded-lg bg-red-900/30 hover:bg-red-800/50 text-red-300 cursor-pointer"
                                  title="Delete Certificate"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* =================================================================== */}
            {/* TAB: WEBSITE CONTENT CMS */}
            {/* =================================================================== */}
            {activeTab === 'content' && (
              <div className="space-y-6">
                <div className="p-6 rounded-3xl bg-[#062420]/80 border border-emerald-500/20 backdrop-blur-2xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="font-heading text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
                      <FileText className="w-6 h-6 text-gold" />
                      Website Content CMS
                    </h2>
                    <p className="text-xs text-emerald-200/70 mt-1">
                      Live content management for headings, values, and institutional copy across all public sections
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleResetWebsiteContent}
                      className="px-3.5 py-2 rounded-xl bg-red-900/30 hover:bg-red-800/50 border border-red-500/30 text-red-200 text-xs font-bold transition-all cursor-pointer"
                    >
                      Reset Defaults
                    </button>
                    <button
                      onClick={handleSaveWebsiteContent}
                      className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-emerald-950 text-xs font-bold shadow-lg hover:brightness-110 transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <Check className="w-4 h-4" /> Save & Publish
                    </button>
                  </div>
                </div>

                {/* Subtabs for CMS */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
                  {[
                    { id: 'about', label: 'About Section' },
                    { id: 'quality', label: 'Quality Framework' },
                    { id: 'affiliation', label: 'Affiliation Hub' },
                    { id: 'relations', label: 'Global Relations' },
                    { id: 'observatory', label: 'Observatory Data' },
                    { id: 'presence', label: 'Global Presence' },
                    { id: 'updates_actions', label: 'Updates & Actions' },
                    { id: 'footer', label: 'Footer & Secretariat' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setCmsSubTab(tab.id as any)}
                      className={cn(
                        'px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all whitespace-nowrap cursor-pointer',
                        cmsSubTab === tab.id
                          ? 'bg-amber-400 text-emerald-950 shadow-md shadow-amber-400/20'
                          : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                      )}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* CMS Form Editor */}
                {websiteContent && (
                  <div className="space-y-6">
                    {/* ========================================================= */}
                    {/* 1. ABOUT CMS SUBTAB */}
                    {/* ========================================================= */}
                    {cmsSubTab === 'about' && (
                      <div className="space-y-5">
                        {/* Section Headers */}
                        <div className="p-6 rounded-3xl bg-[#062420]/80 border border-emerald-500/20 backdrop-blur-2xl shadow-xl space-y-4">
                          <h3 className="font-heading font-bold text-base text-gold flex items-center gap-2">
                            <Sliders className="w-4 h-4" /> Section Headers & Subtitle
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-bold uppercase tracking-wider text-gold mb-1">
                                Section Eyebrow
                              </label>
                              <input
                                type="text"
                                value={websiteContent.about?.eyebrow || ''}
                                onChange={(e) =>
                                  setWebsiteContent({
                                    ...websiteContent,
                                    about: { ...websiteContent.about, eyebrow: e.target.value },
                                  })
                                }
                                className="w-full px-4 py-2.5 rounded-xl bg-[#031714] border border-white/15 text-white text-xs outline-none focus:border-gold"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-bold uppercase tracking-wider text-gold mb-1">
                                Section Main Title
                              </label>
                              <input
                                type="text"
                                value={websiteContent.about?.title || ''}
                                onChange={(e) =>
                                  setWebsiteContent({
                                    ...websiteContent,
                                    about: { ...websiteContent.about, title: e.target.value },
                                  })
                                }
                                className="w-full px-4 py-2.5 rounded-xl bg-[#031714] border border-white/15 text-white text-xs outline-none focus:border-gold"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-gold mb-1">
                              Section Subtitle / Brief Description
                            </label>
                            <textarea
                              rows={2}
                              value={websiteContent.about?.subtitle || ''}
                              onChange={(e) =>
                                setWebsiteContent({
                                  ...websiteContent,
                                  about: { ...websiteContent.about, subtitle: e.target.value },
                                })
                              }
                              className="w-full px-4 py-2.5 rounded-xl bg-[#031714] border border-white/15 text-white text-xs outline-none focus:border-gold"
                            />
                          </div>
                        </div>

                        {/* Sacred Verse / Calligraphy */}
                        <div className="p-6 rounded-3xl bg-[#062420]/80 border border-emerald-500/20 backdrop-blur-2xl shadow-xl space-y-4">
                          <h3 className="font-heading font-bold text-base text-gold flex items-center gap-2">
                            <Sparkles className="w-4 h-4" /> Sacred Calligraphy & Quote Banner
                          </h3>
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-gold mb-1">
                              Arabic Calligraphy Text
                            </label>
                            <input
                              type="text"
                              dir="rtl"
                              value={websiteContent.about?.calligraphyText || ''}
                              onChange={(e) =>
                                setWebsiteContent({
                                  ...websiteContent,
                                  about: { ...websiteContent.about, calligraphyText: e.target.value },
                                })
                              }
                              className="w-full px-4 py-2.5 rounded-xl bg-[#031714] border border-white/15 text-white text-lg font-arabic outline-none focus:border-gold"
                              placeholder="إِقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ"
                            />
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-bold uppercase tracking-wider text-gold mb-1">
                                Verse / Hadith English Translation
                              </label>
                              <textarea
                                rows={2}
                                value={websiteContent.about?.calligraphyTranslation || ''}
                                onChange={(e) =>
                                  setWebsiteContent({
                                    ...websiteContent,
                                    about: { ...websiteContent.about, calligraphyTranslation: e.target.value },
                                  })
                                }
                                className="w-full px-4 py-2.5 rounded-xl bg-[#031714] border border-white/15 text-white text-xs outline-none focus:border-gold"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-bold uppercase tracking-wider text-gold mb-1">
                                Quote Attribution / Author
                              </label>
                              <input
                                type="text"
                                value={websiteContent.about?.quoteAuthor || 'Prophet Muhammad ﷺ'}
                                onChange={(e) =>
                                  setWebsiteContent({
                                    ...websiteContent,
                                    about: { ...websiteContent.about, quoteAuthor: e.target.value },
                                  })
                                }
                                className="w-full px-4 py-2.5 rounded-xl bg-[#031714] border border-white/15 text-white text-xs outline-none focus:border-gold"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Mission & Vision Statements */}
                        <div className="p-6 rounded-3xl bg-[#062420]/80 border border-emerald-500/20 backdrop-blur-2xl shadow-xl space-y-4">
                          <h3 className="font-heading font-bold text-base text-gold flex items-center gap-2">
                            <BookOpen className="w-4 h-4" /> Institutional Mission & Vision
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-bold uppercase tracking-wider text-gold mb-1">
                                Mission Statement
                              </label>
                              <textarea
                                rows={3}
                                value={websiteContent.about?.mission || ''}
                                onChange={(e) =>
                                  setWebsiteContent({
                                    ...websiteContent,
                                    about: { ...websiteContent.about, mission: e.target.value },
                                  })
                                }
                                className="w-full px-4 py-2.5 rounded-xl bg-[#031714] border border-white/15 text-white text-xs outline-none focus:border-gold"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-bold uppercase tracking-wider text-gold mb-1">
                                Vision Statement
                              </label>
                              <textarea
                                rows={3}
                                value={websiteContent.about?.vision || ''}
                                onChange={(e) =>
                                  setWebsiteContent({
                                    ...websiteContent,
                                    about: { ...websiteContent.about, vision: e.target.value },
                                  })
                                }
                                className="w-full px-4 py-2.5 rounded-xl bg-[#031714] border border-white/15 text-white text-xs outline-none focus:border-gold"
                              />
                            </div>
                          </div>

                          {/* Mission & Vision Bullet Points */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                            <div>
                              <label className="block text-xs font-bold uppercase tracking-wider text-gold mb-1">
                                Mission Focus Points (one per line)
                              </label>
                              <textarea
                                rows={3}
                                value={(websiteContent.about?.missionPoints || []).join('\n')}
                                onChange={(e) =>
                                  setWebsiteContent({
                                    ...websiteContent,
                                    about: {
                                      ...websiteContent.about,
                                      missionPoints: e.target.value.split('\n').filter(Boolean),
                                    },
                                  })
                                }
                                className="w-full px-4 py-2.5 rounded-xl bg-[#031714] border border-white/15 text-white text-xs outline-none focus:border-gold font-mono"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-bold uppercase tracking-wider text-gold mb-1">
                                Vision Strategic Goals (one per line)
                              </label>
                              <textarea
                                rows={3}
                                value={(websiteContent.about?.visionPoints || []).join('\n')}
                                onChange={(e) =>
                                  setWebsiteContent({
                                    ...websiteContent,
                                    about: {
                                      ...websiteContent.about,
                                      visionPoints: e.target.value.split('\n').filter(Boolean),
                                    },
                                  })
                                }
                                className="w-full px-4 py-2.5 rounded-xl bg-[#031714] border border-white/15 text-white text-xs outline-none focus:border-gold font-mono"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Core Values (Iqra, Amanah, Ihsan, Adl) */}
                        <div className="p-6 rounded-3xl bg-[#062420]/80 border border-emerald-500/20 backdrop-blur-2xl shadow-xl space-y-4">
                          <h3 className="font-heading font-bold text-base text-gold flex items-center gap-2">
                            <Award className="w-4 h-4" /> 4 Core Values Framework
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {(websiteContent.about?.values || [
                              { title: 'Iqra (Excellence in Knowledge)', desc: 'Knowledge rooted in sacred tradition and contemporary relevance.', iconName: 'BookOpen' },
                              { title: 'Amanah (Trust & Integrity)', desc: 'Unwavering commitment to ethical governance and public trust.', iconName: 'Shield' },
                              { title: 'Ihsan (Professional Quality)', desc: 'Highest international standards across all programs and audits.', iconName: 'Lightbulb' },
                              { title: 'Adl (Justice & Equity)', desc: 'Fair, transparent, and inclusive institutional partnerships.', iconName: 'Heart' },
                            ]).map((val, idx) => (
                              <div key={idx} className="p-3.5 rounded-2xl bg-black/40 border border-white/10 space-y-2">
                                <label className="block text-[11px] font-bold uppercase text-gold">Value {idx + 1} Title</label>
                                <input
                                  type="text"
                                  value={val.title}
                                  onChange={(e) => {
                                    const nextVals = [...(websiteContent.about?.values || [])];
                                    if (nextVals[idx]) {
                                      nextVals[idx] = { ...nextVals[idx], title: e.target.value };
                                    }
                                    setWebsiteContent({
                                      ...websiteContent,
                                      about: { ...websiteContent.about, values: nextVals },
                                    });
                                  }}
                                  className="w-full p-2 rounded-xl bg-[#031714] border border-white/15 text-white text-xs outline-none focus:border-gold"
                                />
                                <label className="block text-[11px] font-bold uppercase text-gold">Value {idx + 1} Description</label>
                                <input
                                  type="text"
                                  value={val.desc}
                                  onChange={(e) => {
                                    const nextVals = [...(websiteContent.about?.values || [])];
                                    if (nextVals[idx]) {
                                      nextVals[idx] = { ...nextVals[idx], desc: e.target.value };
                                    }
                                    setWebsiteContent({
                                      ...websiteContent,
                                      about: { ...websiteContent.about, values: nextVals },
                                    });
                                  }}
                                  className="w-full p-2 rounded-xl bg-[#031714] border border-white/15 text-white text-xs outline-none focus:border-gold"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ========================================================= */}
                    {/* 2. QUALITY CMS SUBTAB */}
                    {/* ========================================================= */}
                    {cmsSubTab === 'quality' && (
                      <div className="space-y-5">
                        <div className="p-6 rounded-3xl bg-[#062420]/80 border border-emerald-500/20 backdrop-blur-2xl shadow-xl space-y-4">
                          <h3 className="font-heading font-bold text-base text-gold flex items-center gap-2">
                            <Shield className="w-4 h-4" /> Quality Section Headers & Compliance Stamp
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-bold uppercase tracking-wider text-gold mb-1">Section Eyebrow</label>
                              <input
                                type="text"
                                value={websiteContent.quality?.eyebrow || ''}
                                onChange={(e) => setWebsiteContent({ ...websiteContent, quality: { ...websiteContent.quality, eyebrow: e.target.value } })}
                                className="w-full px-4 py-2.5 rounded-xl bg-[#031714] border border-white/15 text-white text-xs outline-none focus:border-gold"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-bold uppercase tracking-wider text-gold mb-1">Section Title</label>
                              <input
                                type="text"
                                value={websiteContent.quality?.title || ''}
                                onChange={(e) => setWebsiteContent({ ...websiteContent, quality: { ...websiteContent.quality, title: e.target.value } })}
                                className="w-full px-4 py-2.5 rounded-xl bg-[#031714] border border-white/15 text-white text-xs outline-none focus:border-gold"
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-bold uppercase tracking-wider text-gold mb-1">Section Subtitle</label>
                              <textarea
                                rows={2}
                                value={websiteContent.quality?.subtitle || ''}
                                onChange={(e) => setWebsiteContent({ ...websiteContent, quality: { ...websiteContent.quality, subtitle: e.target.value } })}
                                className="w-full px-4 py-2.5 rounded-xl bg-[#031714] border border-white/15 text-white text-xs outline-none focus:border-gold"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-bold uppercase tracking-wider text-gold mb-1">Audit Compliance Badge Stamp</label>
                              <input
                                type="text"
                                value={websiteContent.quality?.auditBadge || ''}
                                onChange={(e) => setWebsiteContent({ ...websiteContent, quality: { ...websiteContent.quality, auditBadge: e.target.value } })}
                                className="w-full px-4 py-2.5 rounded-xl bg-[#031714] border border-white/15 text-white text-xs outline-none focus:border-gold"
                              />
                            </div>
                          </div>
                        </div>

                        {/* 8-Domain Quality Assurance Framework */}
                        <div className="p-6 rounded-3xl bg-[#062420]/80 border border-emerald-500/20 backdrop-blur-2xl shadow-xl space-y-4">
                          <h3 className="font-heading font-bold text-base text-gold flex items-center gap-2">
                            <Layers className="w-4 h-4" /> 8-Domain Quality Audit Framework
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            {(websiteContent.quality?.framework || []).map((domain, idx) => (
                              <div key={domain.id || idx} className="p-3.5 rounded-2xl bg-black/40 border border-white/10 space-y-1.5">
                                <label className="block text-[11px] font-bold text-gold">Domain {idx + 1}: {domain.title}</label>
                                <input
                                  type="text"
                                  value={domain.title}
                                  onChange={(e) => {
                                    const next = [...(websiteContent.quality?.framework || [])];
                                    if (next[idx]) next[idx] = { ...next[idx], title: e.target.value };
                                    setWebsiteContent({ ...websiteContent, quality: { ...websiteContent.quality, framework: next } });
                                  }}
                                  className="w-full p-2 rounded-xl bg-[#031714] border border-white/15 text-white text-xs outline-none focus:border-gold"
                                />
                                <textarea
                                  rows={2}
                                  value={domain.desc}
                                  onChange={(e) => {
                                    const next = [...(websiteContent.quality?.framework || [])];
                                    if (next[idx]) next[idx] = { ...next[idx], desc: e.target.value };
                                    setWebsiteContent({ ...websiteContent, quality: { ...websiteContent.quality, framework: next } });
                                  }}
                                  className="w-full p-2 rounded-xl bg-[#031714] border border-white/15 text-white text-xs outline-none focus:border-gold"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ========================================================= */}
                    {/* 3. AFFILIATION CMS SUBTAB */}
                    {/* ========================================================= */}
                    {cmsSubTab === 'affiliation' && (
                      <div className="space-y-5">
                        <div className="p-6 rounded-3xl bg-[#062420]/80 border border-emerald-500/20 backdrop-blur-2xl shadow-xl space-y-4">
                          <h3 className="font-heading font-bold text-base text-gold flex items-center gap-2">
                            <Building2 className="w-4 h-4" /> Affiliation Hub Headers & Trust Banner
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-bold uppercase tracking-wider text-gold mb-1">Section Eyebrow</label>
                              <input
                                type="text"
                                value={websiteContent.affiliation?.eyebrow || ''}
                                onChange={(e) => setWebsiteContent({ ...websiteContent, affiliation: { ...websiteContent.affiliation, eyebrow: e.target.value } })}
                                className="w-full px-4 py-2.5 rounded-xl bg-[#031714] border border-white/15 text-white text-xs outline-none focus:border-gold"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-bold uppercase tracking-wider text-gold mb-1">Section Title</label>
                              <input
                                type="text"
                                value={websiteContent.affiliation?.title || ''}
                                onChange={(e) => setWebsiteContent({ ...websiteContent, affiliation: { ...websiteContent.affiliation, title: e.target.value } })}
                                className="w-full px-4 py-2.5 rounded-xl bg-[#031714] border border-white/15 text-white text-xs outline-none focus:border-gold"
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-bold uppercase tracking-wider text-gold mb-1">Trust Banner Title</label>
                              <input
                                type="text"
                                value={websiteContent.affiliation?.trustTitle || ''}
                                onChange={(e) => setWebsiteContent({ ...websiteContent, affiliation: { ...websiteContent.affiliation, trustTitle: e.target.value } })}
                                className="w-full px-4 py-2.5 rounded-xl bg-[#031714] border border-white/15 text-white text-xs outline-none focus:border-gold"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-bold uppercase tracking-wider text-gold mb-1">Trust Banner Description</label>
                              <textarea
                                rows={2}
                                value={websiteContent.affiliation?.trustDesc || ''}
                                onChange={(e) => setWebsiteContent({ ...websiteContent, affiliation: { ...websiteContent.affiliation, trustDesc: e.target.value } })}
                                className="w-full px-4 py-2.5 rounded-xl bg-[#031714] border border-white/15 text-white text-xs outline-none focus:border-gold"
                              />
                            </div>
                          </div>

                          {/* Stats */}
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                            <div>
                              <label className="block text-[11px] font-bold text-gold mb-1">Institutions</label>
                              <input
                                type="number"
                                value={websiteContent.affiliation?.stats?.institutions || 200}
                                onChange={(e) => setWebsiteContent({
                                  ...websiteContent,
                                  affiliation: {
                                    ...websiteContent.affiliation,
                                    stats: { ...(websiteContent.affiliation?.stats || { institutions: 200, countries: 59, programs: 400, renewalRate: 98 }), institutions: Number(e.target.value) }
                                  }
                                })}
                                className="w-full p-2 rounded-xl bg-[#031714] border border-white/15 text-white text-xs outline-none focus:border-gold"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-bold text-gold mb-1">Member Countries</label>
                              <input
                                type="number"
                                value={websiteContent.affiliation?.stats?.countries || 59}
                                onChange={(e) => setWebsiteContent({
                                  ...websiteContent,
                                  affiliation: {
                                    ...websiteContent.affiliation,
                                    stats: { ...(websiteContent.affiliation?.stats || { institutions: 200, countries: 59, programs: 400, renewalRate: 98 }), countries: Number(e.target.value) }
                                  }
                                })}
                                className="w-full p-2 rounded-xl bg-[#031714] border border-white/15 text-white text-xs outline-none focus:border-gold"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-bold text-gold mb-1">Programs</label>
                              <input
                                type="number"
                                value={websiteContent.affiliation?.stats?.programs || 400}
                                onChange={(e) => setWebsiteContent({
                                  ...websiteContent,
                                  affiliation: {
                                    ...websiteContent.affiliation,
                                    stats: { ...(websiteContent.affiliation?.stats || { institutions: 200, countries: 59, programs: 400, renewalRate: 98 }), programs: Number(e.target.value) }
                                  }
                                })}
                                className="w-full p-2 rounded-xl bg-[#031714] border border-white/15 text-white text-xs outline-none focus:border-gold"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-bold text-gold mb-1">Renewal Rate %</label>
                              <input
                                type="number"
                                value={websiteContent.affiliation?.stats?.renewalRate || 98}
                                onChange={(e) => setWebsiteContent({
                                  ...websiteContent,
                                  affiliation: {
                                    ...websiteContent.affiliation,
                                    stats: { ...(websiteContent.affiliation?.stats || { institutions: 200, countries: 59, programs: 400, renewalRate: 98 }), renewalRate: Number(e.target.value) }
                                  }
                                })}
                                className="w-full p-2 rounded-xl bg-[#031714] border border-white/15 text-white text-xs outline-none focus:border-gold"
                              />
                            </div>
                          </div>
                        </div>

                        {/* 6-Step Journey */}
                        <div className="p-6 rounded-3xl bg-[#062420]/80 border border-emerald-500/20 backdrop-blur-2xl shadow-xl space-y-4">
                          <h3 className="font-heading font-bold text-base text-gold flex items-center gap-2">
                            <Clock className="w-4 h-4" /> 6-Step Affiliation Journey
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {(websiteContent.affiliation?.journeySteps || []).map((step, idx) => (
                              <div key={step.id || idx} className="p-3.5 rounded-2xl bg-black/40 border border-white/10 space-y-1.5">
                                <span className="text-[10px] font-mono text-gold font-bold uppercase">Step {step.number || `0${idx + 1}`}</span>
                                <input
                                  type="text"
                                  value={step.title}
                                  onChange={(e) => {
                                    const next = [...(websiteContent.affiliation?.journeySteps || [])];
                                    if (next[idx]) next[idx] = { ...next[idx], title: e.target.value };
                                    setWebsiteContent({ ...websiteContent, affiliation: { ...websiteContent.affiliation, journeySteps: next } });
                                  }}
                                  className="w-full p-2 rounded-xl bg-[#031714] border border-white/15 text-white text-xs outline-none focus:border-gold font-bold"
                                />
                                <textarea
                                  rows={2}
                                  value={step.desc}
                                  onChange={(e) => {
                                    const next = [...(websiteContent.affiliation?.journeySteps || [])];
                                    if (next[idx]) next[idx] = { ...next[idx], desc: e.target.value };
                                    setWebsiteContent({ ...websiteContent, affiliation: { ...websiteContent.affiliation, journeySteps: next } });
                                  }}
                                  className="w-full p-2 rounded-xl bg-[#031714] border border-white/15 text-white text-xs outline-none focus:border-gold"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ========================================================= */}
                    {/* 4. RELATIONS CMS SUBTAB */}
                    {/* ========================================================= */}
                    {cmsSubTab === 'relations' && (
                      <div className="space-y-5">
                        <div className="p-6 rounded-3xl bg-[#062420]/80 border border-emerald-500/20 backdrop-blur-2xl shadow-xl space-y-4">
                          <h3 className="font-heading font-bold text-base text-gold flex items-center gap-2">
                            <Globe className="w-4 h-4" /> Global Relations & Treaties
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-bold uppercase tracking-wider text-gold mb-1">Section Eyebrow</label>
                              <input
                                type="text"
                                value={websiteContent.relations?.eyebrow || ''}
                                onChange={(e) => setWebsiteContent({ ...websiteContent, relations: { ...websiteContent.relations, eyebrow: e.target.value } })}
                                className="w-full px-4 py-2.5 rounded-xl bg-[#031714] border border-white/15 text-white text-xs outline-none focus:border-gold"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-bold uppercase tracking-wider text-gold mb-1">Section Title</label>
                              <input
                                type="text"
                                value={websiteContent.relations?.title || ''}
                                onChange={(e) => setWebsiteContent({ ...websiteContent, relations: { ...websiteContent.relations, title: e.target.value } })}
                                className="w-full px-4 py-2.5 rounded-xl bg-[#031714] border border-white/15 text-white text-xs outline-none focus:border-gold"
                              />
                            </div>
                          </div>
                        </div>

                        {/* MoUs */}
                        <div className="p-6 rounded-3xl bg-[#062420]/80 border border-emerald-500/20 backdrop-blur-2xl shadow-xl space-y-4">
                          <h3 className="font-heading font-bold text-base text-gold flex items-center gap-2">
                            <FileText className="w-4 h-4" /> Strategic Memoranda of Understanding (MoUs)
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            {(websiteContent.relations?.mous || []).map((mou, idx) => (
                              <div key={idx} className="p-3.5 rounded-2xl bg-black/40 border border-white/10 space-y-2">
                                <div className="flex items-center justify-between">
                                  <label className="text-[11px] font-bold text-gold uppercase">{mou.partner}</label>
                                  <span className="text-[10px] font-mono text-emerald-300">{mou.date}</span>
                                </div>
                                <input
                                  type="text"
                                  value={mou.scope}
                                  onChange={(e) => {
                                    const next = [...(websiteContent.relations?.mous || [])];
                                    if (next[idx]) next[idx] = { ...next[idx], scope: e.target.value };
                                    setWebsiteContent({ ...websiteContent, relations: { ...websiteContent.relations, mous: next } });
                                  }}
                                  className="w-full p-2 rounded-xl bg-[#031714] border border-white/15 text-white text-xs outline-none focus:border-gold"
                                  placeholder="MoU Scope & Focus"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ========================================================= */}
                    {/* 5. OBSERVATORY CMS SUBTAB */}
                    {/* ========================================================= */}
                    {cmsSubTab === 'observatory' && (
                      <div className="space-y-5">
                        <div className="p-6 rounded-3xl bg-[#062420]/80 border border-emerald-500/20 backdrop-blur-2xl shadow-xl space-y-4">
                          <h3 className="font-heading font-bold text-base text-gold flex items-center gap-2">
                            <TrendingUp className="w-4 h-4" /> Global Observatory Intelligence & Growth Headline
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                              <label className="block text-xs font-bold uppercase tracking-wider text-gold mb-1">Section Eyebrow</label>
                              <input
                                type="text"
                                value={websiteContent.observatory?.eyebrow || ''}
                                onChange={(e) => setWebsiteContent({ ...websiteContent, observatory: { ...websiteContent.observatory, eyebrow: e.target.value } })}
                                className="w-full px-4 py-2.5 rounded-xl bg-[#031714] border border-white/15 text-white text-xs outline-none focus:border-gold"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-bold uppercase tracking-wider text-gold mb-1">Section Title</label>
                              <input
                                type="text"
                                value={websiteContent.observatory?.title || ''}
                                onChange={(e) => setWebsiteContent({ ...websiteContent, observatory: { ...websiteContent.observatory, title: e.target.value } })}
                                className="w-full px-4 py-2.5 rounded-xl bg-[#031714] border border-white/15 text-white text-xs outline-none focus:border-gold"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-bold uppercase tracking-wider text-gold mb-1">Flagship Growth Index Stat</label>
                              <input
                                type="text"
                                value={websiteContent.observatory?.growthStat || ''}
                                onChange={(e) => setWebsiteContent({ ...websiteContent, observatory: { ...websiteContent.observatory, growthStat: e.target.value } })}
                                className="w-full px-4 py-2.5 rounded-xl bg-[#031714] border border-white/15 text-white text-xs outline-none focus:border-gold font-bold text-emerald-300"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Finance Indicators */}
                        <div className="p-6 rounded-3xl bg-[#062420]/80 border border-emerald-500/20 backdrop-blur-2xl shadow-xl space-y-4">
                          <h3 className="font-heading font-bold text-base text-gold flex items-center gap-2">
                            <CreditCard className="w-4 h-4" /> Islamic Finance Economic Indicators
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            {(websiteContent.observatory?.financeThemes || []).map((theme, idx) => (
                              <div key={theme.id || idx} className="p-3.5 rounded-2xl bg-black/40 border border-white/10 space-y-1.5">
                                <label className="block text-[11px] font-bold text-gold">{theme.title}</label>
                                <input
                                  type="text"
                                  value={theme.title}
                                  onChange={(e) => {
                                    const next = [...(websiteContent.observatory?.financeThemes || [])];
                                    if (next[idx]) next[idx] = { ...next[idx], title: e.target.value };
                                    setWebsiteContent({ ...websiteContent, observatory: { ...websiteContent.observatory, financeThemes: next } });
                                  }}
                                  className="w-full p-2 rounded-xl bg-[#031714] border border-white/15 text-white text-xs outline-none focus:border-gold"
                                />
                                <input
                                  type="text"
                                  value={(theme.metrics || []).join(' • ')}
                                  onChange={(e) => {
                                    const next = [...(websiteContent.observatory?.financeThemes || [])];
                                    if (next[idx]) next[idx] = { ...next[idx], metrics: e.target.value.split('•').map(s => s.trim()).filter(Boolean) };
                                    setWebsiteContent({ ...websiteContent, observatory: { ...websiteContent.observatory, financeThemes: next } });
                                  }}
                                  className="w-full p-2 rounded-xl bg-[#031714] border border-white/15 text-emerald-200 text-xs font-mono outline-none focus:border-gold"
                                  placeholder="Metrics: Asset: $3.8T • Growth: 11%"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ========================================================= */}
                    {/* 6. GLOBAL PRESENCE CMS SUBTAB */}
                    {/* ========================================================= */}
                    {cmsSubTab === 'presence' && (
                      <div className="space-y-5">
                        <div className="p-6 rounded-3xl bg-[#062420]/80 border border-emerald-500/20 backdrop-blur-2xl shadow-xl space-y-4">
                          <h3 className="font-heading font-bold text-base text-gold flex items-center gap-2">
                            <Globe className="w-4 h-4" /> Global Presence & Member Nations
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-bold uppercase tracking-wider text-gold mb-1">Section Eyebrow</label>
                              <input
                                type="text"
                                value={websiteContent.globalPresence?.eyebrow || ''}
                                onChange={(e) => setWebsiteContent({
                                  ...websiteContent,
                                  globalPresence: { ...(websiteContent.globalPresence || { eyebrow: '', title: '', subtitle: '', countries: [] }), eyebrow: e.target.value }
                                })}
                                className="w-full px-4 py-2.5 rounded-xl bg-[#031714] border border-white/15 text-white text-xs outline-none focus:border-gold"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-bold uppercase tracking-wider text-gold mb-1">Section Title</label>
                              <input
                                type="text"
                                value={websiteContent.globalPresence?.title || ''}
                                onChange={(e) => setWebsiteContent({
                                  ...websiteContent,
                                  globalPresence: { ...(websiteContent.globalPresence || { eyebrow: '', title: '', subtitle: '', countries: [] }), title: e.target.value }
                                })}
                                className="w-full px-4 py-2.5 rounded-xl bg-[#031714] border border-white/15 text-white text-xs outline-none focus:border-gold"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Country Hubs */}
                        <div className="p-6 rounded-3xl bg-[#062420]/80 border border-emerald-500/20 backdrop-blur-2xl shadow-xl space-y-4">
                          <h3 className="font-heading font-bold text-base text-gold flex items-center gap-2">
                            <MapPin className="w-4 h-4" /> Regional Delegations & Member Hubs
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                            {(websiteContent.globalPresence?.countries || []).map((country, idx) => (
                              <div key={country.code || idx} className="p-3.5 rounded-2xl bg-black/40 border border-white/10 space-y-2">
                                <div className="flex items-center justify-between">
                                  <span className="font-bold text-white text-sm">{country.country} ({country.code})</span>
                                  <span className="text-[10px] font-mono text-gold">{country.institutions} Inst • {country.students} Students</span>
                                </div>
                                <input
                                  type="text"
                                  value={country.lead || ''}
                                  onChange={(e) => {
                                    const next = [...(websiteContent.globalPresence?.countries || [])];
                                    if (next[idx]) next[idx] = { ...next[idx], lead: e.target.value };
                                    setWebsiteContent({ ...websiteContent, globalPresence: { ...(websiteContent.globalPresence || { eyebrow: '', title: '', subtitle: '', countries: [] }), countries: next } });
                                  }}
                                  className="w-full p-2 rounded-xl bg-[#031714] border border-white/15 text-white text-xs outline-none focus:border-gold"
                                  placeholder="Regional Lead Scholar"
                                />
                                <textarea
                                  rows={2}
                                  value={country.focusArea}
                                  onChange={(e) => {
                                    const next = [...(websiteContent.globalPresence?.countries || [])];
                                    if (next[idx]) next[idx] = { ...next[idx], focusArea: e.target.value };
                                    setWebsiteContent({ ...websiteContent, globalPresence: { ...(websiteContent.globalPresence || { eyebrow: '', title: '', subtitle: '', countries: [] }), countries: next } });
                                  }}
                                  className="w-full p-2 rounded-xl bg-[#031714] border border-white/15 text-white text-xs outline-none focus:border-gold"
                                  placeholder="Focus area descriptor"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ========================================================= */}
                    {/* 7. UPDATES & ACTIONS CMS SUBTAB */}
                    {/* ========================================================= */}
                    {cmsSubTab === 'updates_actions' && (
                      <div className="space-y-5">
                        <div className="p-6 rounded-3xl bg-[#062420]/80 border border-emerald-500/20 backdrop-blur-2xl shadow-xl space-y-4">
                          <h3 className="font-heading font-bold text-base text-gold flex items-center gap-2">
                            <Megaphone className="w-4 h-4" /> Latest Updates & News Section
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-bold uppercase tracking-wider text-gold mb-1">Section Eyebrow</label>
                              <input
                                type="text"
                                value={websiteContent.latestUpdates?.eyebrow || ''}
                                onChange={(e) => setWebsiteContent({
                                  ...websiteContent,
                                  latestUpdates: { ...(websiteContent.latestUpdates || { eyebrow: '', title: '', subtitle: '', updates: [] }), eyebrow: e.target.value }
                                })}
                                className="w-full px-4 py-2.5 rounded-xl bg-[#031714] border border-white/15 text-white text-xs outline-none focus:border-gold"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-bold uppercase tracking-wider text-gold mb-1">Section Title</label>
                              <input
                                type="text"
                                value={websiteContent.latestUpdates?.title || ''}
                                onChange={(e) => setWebsiteContent({
                                  ...websiteContent,
                                  latestUpdates: { ...(websiteContent.latestUpdates || { eyebrow: '', title: '', subtitle: '', updates: [] }), title: e.target.value }
                                })}
                                className="w-full px-4 py-2.5 rounded-xl bg-[#031714] border border-white/15 text-white text-xs outline-none focus:border-gold"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Quick Action Pathways */}
                        <div className="p-6 rounded-3xl bg-[#062420]/80 border border-emerald-500/20 backdrop-blur-2xl shadow-xl space-y-4">
                          <h3 className="font-heading font-bold text-base text-gold flex items-center gap-2">
                            <Zap className="w-4 h-4" /> Quick Access Navigation Pathways
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                            {(websiteContent.quickActions?.actions || []).map((action, idx) => (
                              <div key={idx} className="p-3.5 rounded-2xl bg-black/40 border border-white/10 space-y-2">
                                <label className="block text-[11px] font-bold text-gold">Action {idx + 1}</label>
                                <input
                                  type="text"
                                  value={action.label}
                                  onChange={(e) => {
                                    const next = [...(websiteContent.quickActions?.actions || [])];
                                    if (next[idx]) next[idx] = { ...next[idx], label: e.target.value };
                                    setWebsiteContent({ ...websiteContent, quickActions: { ...(websiteContent.quickActions || { eyebrow: '', title: '', actions: [] }), actions: next } });
                                  }}
                                  className="w-full p-2 rounded-xl bg-[#031714] border border-white/15 text-white text-xs outline-none focus:border-gold font-bold"
                                />
                                <input
                                  type="text"
                                  value={action.desc}
                                  onChange={(e) => {
                                    const next = [...(websiteContent.quickActions?.actions || [])];
                                    if (next[idx]) next[idx] = { ...next[idx], desc: e.target.value };
                                    setWebsiteContent({ ...websiteContent, quickActions: { ...(websiteContent.quickActions || { eyebrow: '', title: '', actions: [] }), actions: next } });
                                  }}
                                  className="w-full p-2 rounded-xl bg-[#031714] border border-white/15 text-white text-xs outline-none focus:border-gold"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ========================================================= */}
                    {/* 8. FOOTER CMS SUBTAB */}
                    {/* ========================================================= */}
                    {cmsSubTab === 'footer' && (
                      <div className="space-y-5">
                        <div className="p-6 rounded-3xl bg-[#062420]/80 border border-emerald-500/20 backdrop-blur-2xl shadow-xl space-y-4">
                          <h3 className="font-heading font-bold text-base text-gold flex items-center gap-2">
                            <Building2 className="w-4 h-4" /> Footer Secretariat & Global Contact Details
                          </h3>
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-gold mb-1">
                              Institutional Overview (About GIFLRI text)
                            </label>
                            <textarea
                              rows={3}
                              value={websiteContent.footer?.aboutText || ''}
                              onChange={(e) => setWebsiteContent({
                                ...websiteContent,
                                footer: { ...websiteContent.footer, aboutText: e.target.value }
                              })}
                              className="w-full px-4 py-2.5 rounded-xl bg-[#031714] border border-white/15 text-white text-xs outline-none focus:border-gold"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-gold mb-1">
                              Secretariat Head Office Address
                            </label>
                            <input
                              type="text"
                              value={websiteContent.footer?.secretariatInfo || ''}
                              onChange={(e) => setWebsiteContent({
                                ...websiteContent,
                                footer: { ...websiteContent.footer, secretariatInfo: e.target.value }
                              })}
                              className="w-full px-4 py-2.5 rounded-xl bg-[#031714] border border-white/15 text-white text-xs outline-none focus:border-gold"
                            />
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-bold uppercase tracking-wider text-gold mb-1">Official Telephone</label>
                              <input
                                type="text"
                                value={websiteContent.footer?.phone || ''}
                                onChange={(e) => setWebsiteContent({
                                  ...websiteContent,
                                  footer: { ...websiteContent.footer, phone: e.target.value }
                                })}
                                className="w-full px-4 py-2.5 rounded-xl bg-[#031714] border border-white/15 text-white text-xs outline-none focus:border-gold font-mono"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-bold uppercase tracking-wider text-gold mb-1">Official Email</label>
                              <input
                                type="text"
                                value={websiteContent.footer?.email || ''}
                                onChange={(e) => setWebsiteContent({
                                  ...websiteContent,
                                  footer: { ...websiteContent.footer, email: e.target.value }
                                })}
                                className="w-full px-4 py-2.5 rounded-xl bg-[#031714] border border-white/15 text-white text-xs outline-none focus:border-gold font-mono"
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-bold uppercase tracking-wider text-gold mb-1">Operating Hours</label>
                              <input
                                type="text"
                                value={websiteContent.footer?.operatingHours || ''}
                                onChange={(e) => setWebsiteContent({
                                  ...websiteContent,
                                  footer: { ...websiteContent.footer, operatingHours: e.target.value }
                                })}
                                className="w-full px-4 py-2.5 rounded-xl bg-[#031714] border border-white/15 text-white text-xs outline-none focus:border-gold"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-bold uppercase tracking-wider text-gold mb-1">Copyright Notice</label>
                              <input
                                type="text"
                                value={websiteContent.footer?.copyright || ''}
                                onChange={(e) => setWebsiteContent({
                                  ...websiteContent,
                                  footer: { ...websiteContent.footer, copyright: e.target.value }
                                })}
                                className="w-full px-4 py-2.5 rounded-xl bg-[#031714] border border-white/15 text-white text-xs outline-none focus:border-gold"
                              />
                            </div>
                          </div>

                          {/* Social Links */}
                          <div className="pt-2">
                            <label className="block text-xs font-bold uppercase tracking-wider text-gold mb-2">
                              Official Social Channel Links
                            </label>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                              <div>
                                <label className="block text-[10px] text-white/60 mb-0.5">LinkedIn</label>
                                <input
                                  type="text"
                                  value={websiteContent.footer?.socialLinks?.linkedin || ''}
                                  onChange={(e) => setWebsiteContent({
                                    ...websiteContent,
                                    footer: {
                                      ...websiteContent.footer,
                                      socialLinks: { ...(websiteContent.footer?.socialLinks || {}), linkedin: e.target.value }
                                    }
                                  })}
                                  className="w-full p-2 rounded-xl bg-[#031714] border border-white/15 text-white text-xs outline-none focus:border-gold font-mono"
                                />
                              </div>
                              <div>
                                <label className="block text-[10px] text-white/60 mb-0.5">Twitter / X</label>
                                <input
                                  type="text"
                                  value={websiteContent.footer?.socialLinks?.twitter || ''}
                                  onChange={(e) => setWebsiteContent({
                                    ...websiteContent,
                                    footer: {
                                      ...websiteContent.footer,
                                      socialLinks: { ...(websiteContent.footer?.socialLinks || {}), twitter: e.target.value }
                                    }
                                  })}
                                  className="w-full p-2 rounded-xl bg-[#031714] border border-white/15 text-white text-xs outline-none focus:border-gold font-mono"
                                />
                              </div>
                              <div>
                                <label className="block text-[10px] text-white/60 mb-0.5">YouTube</label>
                                <input
                                  type="text"
                                  value={websiteContent.footer?.socialLinks?.youtube || ''}
                                  onChange={(e) => setWebsiteContent({
                                    ...websiteContent,
                                    footer: {
                                      ...websiteContent.footer,
                                      socialLinks: { ...(websiteContent.footer?.socialLinks || {}), youtube: e.target.value }
                                    }
                                  })}
                                  className="w-full p-2 rounded-xl bg-[#031714] border border-white/15 text-white text-xs outline-none focus:border-gold font-mono"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
            {/* =================================================================== */}
            {/* TAB: MEDIA ASSETS */}
            {/* =================================================================== */}
            {activeTab === 'media' && (
              <div className="space-y-6">
                <div className="p-6 rounded-3xl bg-[#062420]/80 border border-emerald-500/20 backdrop-blur-2xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="font-heading text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
                      <ImageIcon className="w-6 h-6 text-gold" />
                      Media Assets Library ({mediaAssets.length})
                    </h2>
                    <p className="text-xs text-emerald-200/70 mt-1">
                      Manage banner visuals, hero photography, logos, and digital asset URLs
                    </p>
                  </div>
                  <button
                    onClick={() => setShowAddMediaModal(true)}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-emerald-950 text-xs font-bold shadow-lg hover:brightness-110 transition-all flex items-center gap-2 cursor-pointer shrink-0"
                  >
                    <Plus className="w-4 h-4" /> Add Media Asset
                  </button>
                </div>

                {/* Search & Category Filter Controls */}
                <div className="p-4 rounded-2xl bg-[#062420]/60 border border-emerald-500/15 backdrop-blur-xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
                  {/* Category Pills */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none text-xs">
                    {['all', 'banner', 'logo', 'visual', 'video', 'avatar', 'document'].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedMediaCategory(cat)}
                        className={cn(
                          'px-3 py-1.5 rounded-xl font-bold capitalize transition-all cursor-pointer whitespace-nowrap',
                          selectedMediaCategory === cat
                            ? 'bg-gold text-emerald-950 shadow-md shadow-gold/20'
                            : 'bg-white/5 text-emerald-100/70 hover:bg-white/10 hover:text-white'
                        )}
                      >
                        {cat === 'all' ? 'All Assets' : cat}
                      </button>
                    ))}
                  </div>

                  {/* Search Input */}
                  <div className="relative w-full md:w-72">
                    <Search className="w-4 h-4 text-emerald-300/50 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={mediaSearchTerm}
                      onChange={(e) => setMediaSearchTerm(e.target.value)}
                      placeholder="Search assets by name, key, url..."
                      className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#031714] border border-white/15 text-xs text-white outline-none focus:border-gold placeholder:text-white/30"
                    />
                    {mediaSearchTerm && (
                      <button
                        onClick={() => setMediaSearchTerm('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Media Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mediaAssets
                    .filter((asset) => {
                      if (selectedMediaCategory !== 'all' && asset.category !== selectedMediaCategory) return false;
                      if (mediaSearchTerm.trim()) {
                        const q = mediaSearchTerm.toLowerCase();
                        return (
                          asset.name.toLowerCase().includes(q) ||
                          asset.key.toLowerCase().includes(q) ||
                          asset.url.toLowerCase().includes(q) ||
                          (asset.description && asset.description.toLowerCase().includes(q))
                        );
                      }
                      return true;
                    })
                    .map((asset) => (
                      <div
                        key={asset.id}
                        className="p-4 rounded-3xl bg-[#062420]/80 border border-emerald-500/20 backdrop-blur-2xl shadow-xl space-y-3 overflow-hidden flex flex-col justify-between hover:border-gold/40 transition-all"
                      >
                        <div>
                          <div className="h-40 rounded-2xl overflow-hidden bg-black/40 border border-white/10 relative group mb-3">
                            {asset.category === 'video' ? (
                              <div className="w-full h-full flex flex-col items-center justify-center bg-emerald-950/60 text-gold p-4 text-center">
                                <Zap className="w-8 h-8 mb-1 animate-pulse" />
                                <span className="text-[11px] font-mono truncate max-w-full text-white/80">{asset.name}</span>
                              </div>
                            ) : (
                              <img
                                src={asset.url}
                                alt={asset.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                onError={(e) => {
                                  (e.target as HTMLElement).style.display = 'none';
                                }}
                              />
                            )}
                            <span className="absolute top-2 right-2 text-[9px] uppercase font-bold px-2.5 py-0.5 rounded-full bg-black/80 text-gold border border-gold/30 shadow-md">
                              {asset.category}
                            </span>
                          </div>

                          <h4 className="font-heading font-bold text-sm text-white truncate" title={asset.name}>
                            {asset.name}
                          </h4>
                          <p className="text-[11px] text-gold/80 font-mono truncate mb-1">key: {asset.key}</p>
                          <p className="text-xs text-white/50 truncate font-mono mb-2" title={asset.url}>
                            {asset.url}
                          </p>
                          {asset.description && (
                            <p className="text-xs text-emerald-100/60 line-clamp-2 leading-relaxed">
                              {asset.description}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs">
                          <button
                            onClick={() => copyToClipboard(asset.url)}
                            className="text-gold hover:underline flex items-center gap-1 font-bold cursor-pointer"
                            title="Copy link to clipboard"
                          >
                            <Copy className="w-3.5 h-3.5" /> Copy Link
                          </button>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setEditingMedia(asset)}
                              className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold text-xs transition-colors cursor-pointer flex items-center gap-1"
                              title="Edit Media Asset"
                            >
                              <Edit className="w-3.5 h-3.5" /> Edit
                            </button>
                            <button
                              onClick={() => handleDeleteMedia(asset.id)}
                              className="px-2.5 py-1 rounded-lg bg-red-900/30 hover:bg-red-800/50 text-red-300 font-bold text-xs transition-colors cursor-pointer"
                              title="Delete Media Asset"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* =================================================================== */}
            {/* TAB: RESEARCH PUBLICATIONS */}
            {/* =================================================================== */}
            {activeTab === 'research' && (
              <div className="space-y-6">
                <div className="p-6 rounded-3xl bg-[#062420]/80 border border-emerald-500/20 backdrop-blur-2xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="font-heading text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
                      <Microscope className="w-6 h-6 text-gold" />
                      Research Publications & Policy Papers ({researchPapers.length})
                    </h2>
                    <p className="text-xs text-emerald-200/70 mt-1">
                      Peer-reviewed literature, journal editions, and registered DOIs
                    </p>
                  </div>
                  <button
                    onClick={() => setShowAddPaperModal(true)}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-emerald-950 text-xs font-bold shadow-lg hover:brightness-110 transition-all flex items-center gap-2 cursor-pointer shrink-0"
                  >
                    <Plus className="w-4 h-4" /> Add Paper
                  </button>
                </div>

                {/* Research Search & Category Filters */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={researchSearchTerm}
                      onChange={(e) => setResearchSearchTerm(e.target.value)}
                      placeholder="Search publications by title, author, journal, or DOI..."
                      className="w-full px-4 py-3 pl-11 rounded-2xl bg-[#062420]/80 border border-emerald-500/20 text-white placeholder:text-white/40 text-sm outline-none focus:border-gold"
                    />
                    <Search className="w-4 h-4 text-gold absolute left-4 top-1/2 -translate-y-1/2" />
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    {['all', 'FinTech', 'Shariah', 'Economics', 'Linguistics'].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setResearchCategory(cat)}
                        className={cn(
                          'px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer capitalize',
                          researchCategory === cat
                            ? 'bg-amber-400 text-emerald-950 shadow-md'
                            : 'bg-white/5 text-white/70 hover:bg-white/10'
                        )}
                      >
                        {cat === 'all' ? 'All Disciplines' : cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  {researchPapers
                    .filter((paper) => {
                      const matchesCategory = researchCategory === 'all' || paper.category?.toLowerCase() === researchCategory.toLowerCase();
                      const authorsStr = Array.isArray(paper.authors) ? paper.authors.join(' ') : paper.authors;
                      const matchesSearch = !researchSearchTerm ||
                        paper.title.toLowerCase().includes(researchSearchTerm.toLowerCase()) ||
                        authorsStr.toLowerCase().includes(researchSearchTerm.toLowerCase()) ||
                        (paper.journal && paper.journal.toLowerCase().includes(researchSearchTerm.toLowerCase())) ||
                        (paper.doi && paper.doi.toLowerCase().includes(researchSearchTerm.toLowerCase()));
                      return matchesCategory && matchesSearch;
                    })
                    .map((paper) => (
                    <div
                      key={paper.id}
                      className="p-5 rounded-3xl bg-[#062420]/80 border border-emerald-500/20 backdrop-blur-2xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-gold/30 transition-all"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                          <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-gold/15 text-gold border border-gold/30 font-mono">
                            {paper.category}
                          </span>
                          <span className="text-xs text-white/60 font-mono">DOI: {paper.doi || '10.59200/giflri.2026.01'}</span>
                        </div>
                        <h4 className="font-heading font-bold text-base text-white">{paper.title}</h4>
                        <p className="text-xs text-emerald-200/70 mt-1">
                          Authors: <strong className="text-white">{Array.isArray(paper.authors) ? paper.authors.join(', ') : paper.authors}</strong> • {paper.journal}
                        </p>
                        {paper.abstract && (
                          <p className="text-xs text-white/60 mt-1 line-clamp-2 italic">{paper.abstract}</p>
                        )}
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => setEditingPaper(paper)}
                          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gold transition-colors cursor-pointer"
                          title="Edit Research Paper"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeletePaper(paper.id)}
                          className="p-2 rounded-xl bg-red-900/30 hover:bg-red-800/50 text-red-300 transition-colors cursor-pointer"
                          title="Delete Research Paper"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* =================================================================== */}
            {/* TAB: SCHOLARS & EXPERTS */}
            {/* =================================================================== */}
            {activeTab === 'experts' && (
              <div className="space-y-6">
                <div className="p-6 rounded-3xl bg-[#062420]/80 border border-emerald-500/20 backdrop-blur-2xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="font-heading text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
                      <Users className="w-6 h-6 text-gold" />
                      Scholars & Advisory Council ({experts.length})
                    </h2>
                    <p className="text-xs text-emerald-200/70 mt-1">
                      International Shariah jurists, university fellows, and peer-reviewers
                    </p>
                  </div>
                  <button
                    onClick={() => setShowAddExpertModal(true)}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-emerald-950 text-xs font-bold shadow-lg hover:brightness-110 transition-all flex items-center gap-2 cursor-pointer shrink-0"
                  >
                    <Plus className="w-4 h-4" /> Add Scholar
                  </button>
                </div>

                {/* Expert Search */}
                <div className="relative">
                  <input
                    type="text"
                    value={expertSearchTerm}
                    onChange={(e) => setExpertSearchTerm(e.target.value)}
                    placeholder="Search scholars by name, country, role, or specialization..."
                    className="w-full px-4 py-3 pl-11 rounded-2xl bg-[#062420]/80 border border-emerald-500/20 text-white placeholder:text-white/40 text-sm outline-none focus:border-gold"
                  />
                  <Search className="w-4 h-4 text-gold absolute left-4 top-1/2 -translate-y-1/2" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {experts
                    .filter((exp) =>
                      !expertSearchTerm ||
                      exp.name.toLowerCase().includes(expertSearchTerm.toLowerCase()) ||
                      exp.country?.toLowerCase().includes(expertSearchTerm.toLowerCase()) ||
                      exp.role?.toLowerCase().includes(expertSearchTerm.toLowerCase()) ||
                      (Array.isArray(exp.fields) && exp.fields.some((f) => f.toLowerCase().includes(expertSearchTerm.toLowerCase())))
                    )
                    .map((exp) => (
                    <div
                      key={exp.id}
                      className="p-5 rounded-3xl bg-[#062420]/80 border border-emerald-500/20 backdrop-blur-2xl shadow-xl space-y-3 flex flex-col justify-between hover:border-gold/30 transition-all"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-600 text-emerald-950 font-bold text-base flex items-center justify-center shadow-md shrink-0">
                            {exp.name.charAt(0)}
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-heading font-bold text-sm text-white truncate">{exp.name}</h4>
                            <p className="text-xs text-gold truncate">{exp.role}</p>
                            <span className="text-[10px] text-white/50">{exp.country} • {exp.giflriRole}</span>
                          </div>
                        </div>
                        <p className="text-xs text-emerald-100/70 line-clamp-3">{exp.biography || 'Senior academic advisor to GIFLRI research council.'}</p>
                        {Array.isArray(exp.fields) && exp.fields.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {exp.fields.map((f, i) => (
                              <span key={i} className="text-[9px] px-2 py-0.5 rounded-full bg-white/5 text-white/70 border border-white/10">
                                {f}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-2">
                        <button
                          onClick={() => setEditingExpert(exp)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gold transition-colors cursor-pointer"
                          title="Edit Scholar Profile"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteExpert(exp.id)}
                          className="p-1.5 rounded-lg bg-red-900/30 hover:bg-red-800/50 text-red-300 transition-colors cursor-pointer"
                          title="Delete Scholar Profile"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* =================================================================== */}
            {/* TAB: CONFERENCES & EVENTS */}
            {/* =================================================================== */}
            {activeTab === 'events' && (
              <div className="space-y-6">
                <div className="p-6 rounded-3xl bg-[#062420]/80 border border-emerald-500/20 backdrop-blur-2xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="font-heading text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
                      <Calendar className="w-6 h-6 text-gold" />
                      Conferences & Academic Events ({events.length})
                    </h2>
                    <p className="text-xs text-emerald-200/70 mt-1">
                      International summits, symposia, hackathons, and roundtables
                    </p>
                  </div>
                  <button
                    onClick={() => setShowAddEventModal(true)}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-emerald-950 text-xs font-bold shadow-lg hover:brightness-110 transition-all flex items-center gap-2 cursor-pointer shrink-0"
                  >
                    <Plus className="w-4 h-4" /> Schedule Event
                  </button>
                </div>

                {/* Event Search */}
                <div className="relative">
                  <input
                    type="text"
                    value={eventSearchTerm}
                    onChange={(e) => setEventSearchTerm(e.target.value)}
                    placeholder="Search events by title, theme, city, country, or type..."
                    className="w-full px-4 py-3 pl-11 rounded-2xl bg-[#062420]/80 border border-emerald-500/20 text-white placeholder:text-white/40 text-sm outline-none focus:border-gold"
                  />
                  <Search className="w-4 h-4 text-gold absolute left-4 top-1/2 -translate-y-1/2" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {events
                    .filter((evt) =>
                      !eventSearchTerm ||
                      evt.title.toLowerCase().includes(eventSearchTerm.toLowerCase()) ||
                      evt.theme?.toLowerCase().includes(eventSearchTerm.toLowerCase()) ||
                      evt.city?.toLowerCase().includes(eventSearchTerm.toLowerCase()) ||
                      evt.country?.toLowerCase().includes(eventSearchTerm.toLowerCase()) ||
                      evt.type?.toLowerCase().includes(eventSearchTerm.toLowerCase())
                    )
                    .map((evt) => (
                    <div
                      key={evt.id}
                      className="p-5 rounded-3xl bg-[#062420]/80 border border-emerald-500/20 backdrop-blur-2xl shadow-xl space-y-3 flex flex-col justify-between hover:border-gold/30 transition-all"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-gold/15 text-gold border border-gold/30 font-mono">
                            {evt.type}
                          </span>
                          <span className="text-xs font-mono text-emerald-300 font-bold">{evt.date}</span>
                        </div>
                        <h4 className="font-heading font-bold text-base text-white">{evt.title}</h4>
                        <p className="text-xs text-gold/90 font-medium mt-1">{evt.theme}</p>
                        <p className="text-xs text-white/60 mt-0.5">{evt.city}, {evt.country}</p>
                        {evt.desc && <p className="text-xs text-emerald-200/70 mt-2 line-clamp-2">{evt.desc}</p>}
                      </div>

                      <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-2">
                        <button
                          onClick={() => setEditingEvent(evt)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gold transition-colors cursor-pointer"
                          title="Edit Event"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteEvent(evt.id)}
                          className="p-1.5 rounded-lg bg-red-900/30 hover:bg-red-800/50 text-red-300 transition-colors cursor-pointer"
                          title="Delete Event"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* =================================================================== */}
            {/* TAB: OBSERVATORY & TELEMETRY */}
            {/* =================================================================== */}
            {activeTab === 'observatory' && (
              <div className="space-y-6">
                <div className="p-6 rounded-3xl bg-[#062420]/80 border border-emerald-500/20 backdrop-blur-2xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="font-heading text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
                      <BarChart2 className="w-6 h-6 text-gold" />
                      Global Observatory & Indices Management
                    </h2>
                    <p className="text-xs text-emerald-200/70 mt-1">
                      Live macroeconomic data feeds, asset bases, research corpora, and sync controls
                    </p>
                  </div>
                  <button
                    onClick={handleSaveObservatory}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-emerald-950 text-xs font-bold shadow-lg hover:brightness-110 transition-all flex items-center gap-2 cursor-pointer shrink-0"
                  >
                    <RefreshCw className="w-4 h-4" /> Save & Synchronize Observatory
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-5 rounded-3xl bg-[#062420]/80 border border-emerald-500/20 backdrop-blur-2xl shadow-xl space-y-2">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-gold block">Islamic Finance Global Index</span>
                    <input
                      type="text"
                      value={observatoryData?.financeMarketCap || '$3.85 Trillion'}
                      onChange={(e) =>
                        setObservatoryData(observatoryData ? { ...observatoryData, financeMarketCap: e.target.value } : null)
                      }
                      className="w-full p-2 rounded-xl bg-[#031714] border border-white/15 text-white font-heading font-extrabold text-lg outline-none focus:border-gold"
                    />
                    <p className="text-xs text-emerald-200/60">Estimated global asset base tracking across 59 nations</p>
                  </div>

                  <div className="p-5 rounded-3xl bg-[#062420]/80 border border-emerald-500/20 backdrop-blur-2xl shadow-xl space-y-2">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-gold block">Arabic Linguistic Research Index</span>
                    <input
                      type="text"
                      value={observatoryData?.arabicPapersCount || '4,280 Papers'}
                      onChange={(e) =>
                        setObservatoryData(observatoryData ? { ...observatoryData, arabicPapersCount: e.target.value } : null)
                      }
                      className="w-full p-2 rounded-xl bg-[#031714] border border-white/15 text-white font-heading font-extrabold text-lg outline-none focus:border-gold"
                    />
                    <p className="text-xs text-emerald-200/60">Indexed computational linguistic & terminology corpora</p>
                  </div>

                  <div className="p-5 rounded-3xl bg-[#062420]/80 border border-emerald-500/20 backdrop-blur-2xl shadow-xl space-y-2">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-gold block">Telemetry Refresh Status</span>
                    <div className="text-2xl font-extrabold text-emerald-400 font-heading">Synchronized</div>
                    <p className="text-xs text-emerald-200/60">Live telemetry background cycle active</p>
                  </div>
                </div>
              </div>
            )}

            {/* =================================================================== */}
            {/* TAB: E-SERVICES DESKS */}
            {/* =================================================================== */}
            {activeTab === 'eservices' && (
              <div className="space-y-6">
                <div className="p-6 rounded-3xl bg-[#062420]/80 border border-emerald-500/20 backdrop-blur-2xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="font-heading text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
                      <GraduationCap className="w-6 h-6 text-gold" />
                      Student & Faculty Service Requests
                    </h2>
                    <p className="text-xs text-emerald-200/70 mt-1">
                      Transcript requests, diploma verification, and scholar registrations
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      onClick={() => setEservicesSubTab('students')}
                      className={cn(
                        'px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer',
                        eservicesSubTab === 'students'
                          ? 'bg-amber-400 text-emerald-950 font-bold'
                          : 'bg-white/5 text-white/70 hover:bg-white/10'
                      )}
                    >
                      Student Requests ({studentRequests.length})
                    </button>
                    <button
                      onClick={() => setEservicesSubTab('faculty')}
                      className={cn(
                        'px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer',
                        eservicesSubTab === 'faculty'
                          ? 'bg-amber-400 text-emerald-950 font-bold'
                          : 'bg-white/5 text-white/70 hover:bg-white/10'
                      )}
                    >
                      Faculty Roster ({facultyRegs.length})
                    </button>
                    {eservicesSubTab === 'students' ? (
                      <button
                        onClick={() => setShowAddStudentReqModal(true)}
                        className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-emerald-950 text-xs font-bold hover:brightness-110 transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
                      >
                        <Plus className="w-3.5 h-3.5" /> Log Request
                      </button>
                    ) : (
                      <button
                        onClick={() => setShowAddFacultyModal(true)}
                        className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-emerald-950 text-xs font-bold hover:brightness-110 transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
                      >
                        <Plus className="w-3.5 h-3.5" /> Register Faculty
                      </button>
                    )}
                  </div>
                </div>

                {/* Eservices Search */}
                <div className="relative">
                  <input
                    type="text"
                    value={eservicesSearchTerm}
                    onChange={(e) => setEservicesSearchTerm(e.target.value)}
                    placeholder={
                      eservicesSubTab === 'students'
                        ? 'Search requests by student name, email, program, or service type...'
                        : 'Search faculty by name, email, institution, department, or specialization...'
                    }
                    className="w-full px-4 py-3 pl-11 rounded-2xl bg-[#062420]/80 border border-emerald-500/20 text-white placeholder:text-white/40 text-sm outline-none focus:border-gold"
                  />
                  <Search className="w-4 h-4 text-gold absolute left-4 top-1/2 -translate-y-1/2" />
                </div>

                {eservicesSubTab === 'students' ? (
                  <div className="space-y-3">
                    {studentRequests
                      .filter((req) =>
                        !eservicesSearchTerm ||
                        req.studentName.toLowerCase().includes(eservicesSearchTerm.toLowerCase()) ||
                        req.studentEmail.toLowerCase().includes(eservicesSearchTerm.toLowerCase()) ||
                        req.program?.toLowerCase().includes(eservicesSearchTerm.toLowerCase()) ||
                        req.serviceType?.toLowerCase().includes(eservicesSearchTerm.toLowerCase())
                      )
                      .map((req) => (
                      <div
                        key={req.id}
                        className="p-4 rounded-3xl bg-[#062420]/80 border border-emerald-500/20 backdrop-blur-2xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-gold/30 transition-all"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className="font-bold text-white text-sm">{req.studentName}</span>
                            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-gold/15 text-gold border border-gold/30">
                              {req.serviceType}
                            </span>
                            <span className={cn(
                              'text-[10px] font-bold px-2 py-0.5 rounded-full border',
                              req.status === 'Completed' ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30' :
                              req.status === 'Processing' ? 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30' :
                              req.status === 'Rejected' ? 'bg-red-500/15 text-red-300 border-red-500/30' :
                              'bg-amber-500/15 text-amber-300 border-amber-500/30'
                            )}>
                              {req.status}
                            </span>
                          </div>
                          <p className="text-xs text-emerald-200/70">
                            Program: <strong className="text-white">{req.program}</strong> • Email: {req.studentEmail} • Submitted: {req.submittedAt}
                          </p>
                        </div>

                        <div className="flex items-center gap-1.5 flex-wrap shrink-0">
                          <button
                            onClick={() => handleUpdateServiceRequest(req.id, 'Processing')}
                            className="px-2.5 py-1 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold hover:bg-cyan-500/30 cursor-pointer"
                          >
                            Processing
                          </button>
                          <button
                            onClick={() => handleUpdateServiceRequest(req.id, 'Completed')}
                            className="px-2.5 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold hover:bg-emerald-500/30 cursor-pointer"
                          >
                            Complete
                          </button>
                          <button
                            onClick={() => handleUpdateServiceRequest(req.id, 'Rejected')}
                            className="px-2.5 py-1 rounded-xl bg-red-500/20 text-red-300 border border-red-500/30 text-xs font-bold hover:bg-red-500/30 cursor-pointer"
                          >
                            Reject
                          </button>
                          <button
                            onClick={() => handleDeleteStudentRequest(req.id)}
                            className="p-1.5 rounded-xl bg-red-900/30 hover:bg-red-800/50 text-red-300 cursor-pointer"
                            title="Delete Request"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {facultyRegs
                      .filter((fac) =>
                        !eservicesSearchTerm ||
                        fac.name.toLowerCase().includes(eservicesSearchTerm.toLowerCase()) ||
                        fac.email?.toLowerCase().includes(eservicesSearchTerm.toLowerCase()) ||
                        fac.institution?.toLowerCase().includes(eservicesSearchTerm.toLowerCase()) ||
                        fac.specialization?.toLowerCase().includes(eservicesSearchTerm.toLowerCase())
                      )
                      .map((fac) => (
                      <div
                        key={fac.id}
                        className="p-4 rounded-3xl bg-[#062420]/80 border border-emerald-500/20 backdrop-blur-2xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-gold/30 transition-all"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className="font-bold text-white text-sm">{fac.name}</span>
                            <span className="text-[10px] text-white/60 bg-white/5 px-2 py-0.5 rounded-lg border border-white/10">{fac.institution}</span>
                            <span className={cn(
                              'text-[10px] font-bold px-2 py-0.5 rounded-full border',
                              fac.status === 'Accredited' ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30' :
                              fac.status === 'Registered' ? 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30' :
                              'bg-amber-500/15 text-amber-300 border-amber-500/30'
                            )}>
                              {fac.status}
                            </span>
                          </div>
                          <p className="text-xs text-emerald-200/70">
                            Department: <strong className="text-white">{fac.department}</strong> • Specialization: {fac.specialization}
                          </p>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0 flex-wrap">
                          <button
                            onClick={() => handleUpdateFacultyReg(fac.id, 'Registered')}
                            className="px-2.5 py-1 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold hover:bg-cyan-500/30 cursor-pointer"
                          >
                            Register
                          </button>
                          <button
                            onClick={() => handleUpdateFacultyReg(fac.id, 'Accredited')}
                            className="px-2.5 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold hover:bg-emerald-500/30 cursor-pointer"
                          >
                            Accredit
                          </button>
                          <button
                            onClick={() => handleDeleteFacultyReg(fac.id)}
                            className="p-1.5 rounded-xl bg-red-900/30 hover:bg-red-800/50 text-red-300 cursor-pointer"
                            title="Delete Faculty Registration"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* =================================================================== */}
            {/* TAB: PAYMENTS & SETTLEMENTS */}
            {/* =================================================================== */}
            {activeTab === 'payments' && (
              <div className="space-y-6">
                <div className="p-6 rounded-3xl bg-[#062420]/80 border border-emerald-500/20 backdrop-blur-2xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="font-heading text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
                      <CreditCard className="w-6 h-6 text-gold" />
                      Fee Billing & Invoices ({payments.length})
                    </h2>
                    <p className="text-xs text-emerald-200/70 mt-1">
                      Track affiliation fees, audit retainers, and settlement receipts
                    </p>
                  </div>
                  <button
                    onClick={() => setShowAddPaymentModal(true)}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-emerald-950 text-xs font-bold shadow-lg hover:brightness-110 transition-all flex items-center gap-2 cursor-pointer shrink-0"
                  >
                    <Plus className="w-4 h-4" /> Log Payment
                  </button>
                </div>

                {/* Payment Search */}
                <div className="relative">
                  <input
                    type="text"
                    value={paymentSearchTerm}
                    onChange={(e) => setPaymentSearchTerm(e.target.value)}
                    placeholder="Search invoices by payer, institution, invoice #, or purpose..."
                    className="w-full px-4 py-3 pl-11 rounded-2xl bg-[#062420]/80 border border-emerald-500/20 text-white placeholder:text-white/40 text-sm outline-none focus:border-gold"
                  />
                  <Search className="w-4 h-4 text-gold absolute left-4 top-1/2 -translate-y-1/2" />
                </div>

                <div className="rounded-3xl bg-[#062420]/80 border border-emerald-500/20 backdrop-blur-2xl shadow-xl overflow-hidden">
                  <div className="overflow-x-auto scrollbar-thin">
                    <table className="w-full text-left text-xs min-w-[640px]">
                      <thead className="bg-white/[0.04] text-gold uppercase tracking-wider font-extrabold text-[10px] border-b border-white/10">
                        <tr>
                          <th className="py-3.5 px-4">Invoice #</th>
                          <th className="py-3.5 px-4">Payer / Institution</th>
                          <th className="py-3.5 px-4">Purpose</th>
                          <th className="py-3.5 px-4">Amount</th>
                          <th className="py-3.5 px-4">Status</th>
                          <th className="py-3.5 px-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {payments
                          .filter((pay) =>
                            !paymentSearchTerm ||
                            pay.payerName.toLowerCase().includes(paymentSearchTerm.toLowerCase()) ||
                            pay.institution?.toLowerCase().includes(paymentSearchTerm.toLowerCase()) ||
                            (pay.invoiceNumber && pay.invoiceNumber.toLowerCase().includes(paymentSearchTerm.toLowerCase())) ||
                            pay.purpose?.toLowerCase().includes(paymentSearchTerm.toLowerCase())
                          )
                          .map((pay) => (
                          <tr key={pay.id} className="hover:bg-white/[0.03] transition-colors">
                            <td className="py-3.5 px-4 font-mono font-bold text-gold">{pay.invoiceNumber || pay.id}</td>
                            <td className="py-3.5 px-4 font-bold text-white">
                              <div>{pay.payerName}</div>
                              <div className="text-[10px] text-white/50">{pay.institution}</div>
                            </td>
                            <td className="py-3.5 px-4 text-ivory/80">{pay.purpose}</td>
                            <td className="py-3.5 px-4 font-mono font-bold text-emerald-300">
                              ${pay.amount.toLocaleString()} {pay.currency}
                            </td>
                            <td className="py-3.5 px-4">
                              <span className={cn(
                                'px-2 py-0.5 rounded-full text-[10px] font-bold border',
                                pay.status === 'Paid' ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30' :
                                pay.status === 'Pending' ? 'bg-amber-500/15 text-amber-300 border-amber-500/30' :
                                'bg-red-500/15 text-red-300 border-red-500/30'
                              )}>
                                {pay.status}
                              </span>
                            </td>
                            <td className="py-3.5 px-4">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => setEditingPayment(pay)}
                                  className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-gold cursor-pointer"
                                  title="Edit Payment Record"
                                >
                                  <Edit className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleDeletePayment(pay.id)}
                                  className="p-1 rounded-lg bg-red-900/30 hover:bg-red-800/50 text-red-300 cursor-pointer"
                                  title="Delete Payment Record"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* =================================================================== */}
            {/* TAB: COMPLAINTS & APPEALS */}
            {/* =================================================================== */}
            {activeTab === 'complaints' && (
              <div className="space-y-6">
                <div className="p-6 rounded-3xl bg-[#062420]/80 border border-emerald-500/20 backdrop-blur-2xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="font-heading text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
                      <AlertCircle className="w-6 h-6 text-gold" />
                      Complaints & Grievance Appeals ({complaints.length})
                    </h2>
                    <p className="text-xs text-emerald-200/70 mt-1">
                      Formal escalation desk, ethics appeals, and ombudsman resolutions
                    </p>
                  </div>
                  <button
                    onClick={() => setShowAddComplaintModal(true)}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-emerald-950 text-xs font-bold shadow-lg hover:brightness-110 transition-all flex items-center gap-2 cursor-pointer shrink-0"
                  >
                    <Plus className="w-4 h-4" /> Log Grievance Ticket
                  </button>
                </div>

                {/* Complaint Search */}
                <div className="relative">
                  <input
                    type="text"
                    value={complaintSearchTerm}
                    onChange={(e) => setComplaintSearchTerm(e.target.value)}
                    placeholder="Search grievances by complainant, subject, institution, or description..."
                    className="w-full px-4 py-3 pl-11 rounded-2xl bg-[#062420]/80 border border-emerald-500/20 text-white placeholder:text-white/40 text-sm outline-none focus:border-gold"
                  />
                  <Search className="w-4 h-4 text-gold absolute left-4 top-1/2 -translate-y-1/2" />
                </div>

                <div className="space-y-3">
                  {complaints
                    .filter((comp) =>
                      !complaintSearchTerm ||
                      comp.complainantName.toLowerCase().includes(complaintSearchTerm.toLowerCase()) ||
                      comp.subject?.toLowerCase().includes(complaintSearchTerm.toLowerCase()) ||
                      comp.description?.toLowerCase().includes(complaintSearchTerm.toLowerCase()) ||
                      comp.email?.toLowerCase().includes(complaintSearchTerm.toLowerCase())
                    )
                    .map((comp) => (
                    <div
                      key={comp.id}
                      className="p-5 rounded-3xl bg-[#062420]/80 border border-emerald-500/20 backdrop-blur-2xl shadow-xl space-y-3 hover:border-gold/30 transition-all"
                    >
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <span className="text-xs font-bold text-white">{comp.complainantName} ({comp.email})</span>
                        <span className={cn(
                          'text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border',
                          comp.status === 'Resolved' ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30' :
                          comp.status === 'Under Review' ? 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30' :
                          'bg-amber-500/15 text-amber-300 border-amber-500/30'
                        )}>
                          {comp.status}
                        </span>
                      </div>
                      <h4 className="font-bold text-sm text-gold">{comp.subject}</h4>
                      <p className="text-xs text-white/70 leading-relaxed">{comp.description}</p>

                      <div className="pt-2 border-t border-white/10 flex items-center justify-end gap-2 flex-wrap">
                        <button
                          onClick={() => handleUpdateComplaintStatus(comp.id, 'Under Review')}
                          className="px-3 py-1 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold hover:bg-cyan-500/30 cursor-pointer"
                        >
                          Under Review
                        </button>
                        <button
                          onClick={() => handleUpdateComplaintStatus(comp.id, 'Resolved')}
                          className="px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold hover:bg-emerald-500/30 cursor-pointer"
                        >
                          Mark Resolved
                        </button>
                        <button
                          onClick={() => handleDeleteComplaint(comp.id)}
                          className="p-1 rounded-xl bg-red-900/30 hover:bg-red-800/50 text-red-300 cursor-pointer"
                          title="Delete Grievance"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* =================================================================== */}
            {/* TAB: STRATEGIC PILLARS */}
            {/* =================================================================== */}
            {activeTab === 'pillars' && (
              <div className="space-y-6">
                <div className="p-6 rounded-3xl bg-[#062420]/80 border border-emerald-500/20 backdrop-blur-2xl shadow-xl">
                  <h2 className="font-heading text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
                    <Shield className="w-6 h-6 text-gold" />
                    Strategic Pillars & Governance Frameworks
                  </h2>
                  <p className="text-xs text-emerald-200/70 mt-1">
                    Edit institutional pillar definitions, sub-clauses, and public descriptors
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pillars.map((pillar) => (
                    <div
                      key={pillar.id}
                      className="p-5 rounded-3xl bg-[#062420]/80 border border-emerald-500/20 backdrop-blur-2xl shadow-xl space-y-3 hover:border-gold/30 transition-all"
                    >
                      <h3 className="font-heading font-bold text-base text-white">{pillar.customTitle || pillar.titleKey}</h3>
                      <p className="text-xs text-emerald-200/70 leading-relaxed">{pillar.customDesc || pillar.descKey || pillar.objective}</p>
                      <button
                        onClick={() => setEditingPillar(pillar)}
                        className="px-3 py-1.5 rounded-xl bg-gold/15 text-gold border border-gold/30 text-xs font-bold hover:bg-gold/25 cursor-pointer"
                      >
                        Edit Pillar Content
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* =================================================================== */}
            {/* TAB: SITE SETTINGS & ANNOUNCEMENT */}
            {/* =================================================================== */}
            {activeTab === 'settings' && siteSettings && (
              <div className="space-y-6">
                <div className="p-6 rounded-3xl bg-[#062420]/80 border border-emerald-500/20 backdrop-blur-2xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="font-heading text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
                      <Settings className="w-6 h-6 text-gold" />
                      Site Settings & Global Announcement Bar
                    </h2>
                    <p className="text-xs text-emerald-200/70 mt-1">
                      Configure site tagline, hero headlines, and the top banner announcement
                    </p>
                  </div>
                  <button
                    onClick={handleSaveSettings}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-emerald-950 text-xs font-bold shadow-lg hover:brightness-110 transition-all cursor-pointer"
                  >
                    Save Settings
                  </button>
                </div>

                <form onSubmit={handleSaveSettings} className="p-6 rounded-3xl bg-[#062420]/80 border border-emerald-500/20 backdrop-blur-2xl shadow-xl space-y-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gold mb-1">
                      Global Announcement Banner Text
                    </label>
                    <input
                      type="text"
                      value={siteSettings.announcement?.text || ''}
                      onChange={(e) =>
                        setSiteSettings({
                          ...siteSettings,
                          announcement: {
                            ...siteSettings.announcement,
                            text: e.target.value,
                          },
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[#031714] border border-white/15 text-white text-sm outline-none focus:border-gold"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gold mb-1">
                        Announcement Badge
                      </label>
                      <input
                        type="text"
                        value={siteSettings.announcement?.badge || ''}
                        onChange={(e) =>
                          setSiteSettings({
                            ...siteSettings,
                            announcement: {
                              ...siteSettings.announcement,
                              badge: e.target.value,
                            },
                          })
                        }
                        className="w-full px-4 py-2.5 rounded-xl bg-[#031714] border border-white/15 text-white text-sm outline-none focus:border-gold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gold mb-1">
                        Announcement Link Target
                      </label>
                      <input
                        type="text"
                        value={siteSettings.announcement?.link || ''}
                        onChange={(e) =>
                          setSiteSettings({
                            ...siteSettings,
                            announcement: {
                              ...siteSettings.announcement,
                              link: e.target.value,
                            },
                          })
                        }
                        className="w-full px-4 py-2.5 rounded-xl bg-[#031714] border border-white/15 text-white text-sm outline-none focus:border-gold"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <input
                      type="checkbox"
                      id="announcement-enabled"
                      checked={siteSettings.announcement?.enabled ?? true}
                      onChange={(e) =>
                        setSiteSettings({
                          ...siteSettings,
                          announcement: {
                            ...siteSettings.announcement,
                            enabled: e.target.checked,
                          },
                        })
                      }
                      className="w-4 h-4 accent-gold cursor-pointer"
                    />
                    <label htmlFor="announcement-enabled" className="text-xs font-bold text-white cursor-pointer">
                      Enable Announcement Banner across all public pages
                    </label>
                  </div>
                </form>
              </div>
            )}

            {/* =================================================================== */}
            {/* TAB: USERS & ACCESS CONTROL */}
            {/* =================================================================== */}
            {activeTab === 'users' && (
              <div className="space-y-6">
                <div className="p-6 rounded-3xl bg-[#062420]/80 border border-emerald-500/20 backdrop-blur-2xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="font-heading text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
                      <UserCheck className="w-6 h-6 text-gold" />
                      User Accounts & Role Management ({usersList.length})
                    </h2>
                    <p className="text-xs text-emerald-200/70 mt-1">
                      Manage administrator, institution, faculty, and student user credentials
                    </p>
                  </div>
                  <button
                    onClick={() => setShowAddUserModal(true)}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-emerald-950 text-xs font-bold shadow-lg hover:brightness-110 transition-all flex items-center gap-2 cursor-pointer shrink-0"
                  >
                    <Plus className="w-4 h-4" /> Add User
                  </button>
                </div>

                {/* User Search */}
                <div className="relative">
                  <input
                    type="text"
                    value={userSearchTerm}
                    onChange={(e) => setUserSearchTerm(e.target.value)}
                    placeholder="Search users by name, email, role, or department..."
                    className="w-full px-4 py-3 pl-11 rounded-2xl bg-[#062420]/80 border border-emerald-500/20 text-white placeholder:text-white/40 text-sm outline-none focus:border-gold"
                  />
                  <Search className="w-4 h-4 text-gold absolute left-4 top-1/2 -translate-y-1/2" />
                </div>

                <div className="rounded-3xl bg-[#062420]/80 border border-emerald-500/20 backdrop-blur-2xl shadow-xl overflow-hidden">
                  <div className="overflow-x-auto scrollbar-thin">
                    <table className="w-full text-left text-xs min-w-[640px]">
                      <thead className="bg-white/[0.04] text-gold uppercase tracking-wider font-extrabold text-[10px] border-b border-white/10">
                        <tr>
                          <th className="py-3.5 px-4">Name</th>
                          <th className="py-3.5 px-4">Email</th>
                          <th className="py-3.5 px-4">Role</th>
                          <th className="py-3.5 px-4">Title / Department</th>
                          <th className="py-3.5 px-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {usersList
                          .filter((u) =>
                            !userSearchTerm ||
                            u.name.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
                            u.email.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
                            u.role?.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
                            (u.title && u.title.toLowerCase().includes(userSearchTerm.toLowerCase()))
                          )
                          .map((u) => (
                          <tr key={u.id} className="hover:bg-white/[0.03] transition-colors">
                            <td className="py-3.5 px-4 font-bold text-white">{u.name}</td>
                            <td className="py-3.5 px-4 text-emerald-300 font-mono">{u.email}</td>
                            <td className="py-3.5 px-4">
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-gold/15 text-gold border border-gold/30">
                                {u.role}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-white/60">{u.title || 'Institutional Member'}</td>
                            <td className="py-3.5 px-4">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => setEditingUser(u)}
                                  className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-gold cursor-pointer"
                                  title="Edit User"
                                >
                                  <Edit className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleDeleteUser(u.id)}
                                  className="p-1 rounded-lg bg-red-900/30 hover:bg-red-800/50 text-red-300 cursor-pointer"
                                  title="Delete User"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* =================================================================== */}
            {/* TAB: AUDIT LOGS */}
            {/* =================================================================== */}
            {activeTab === 'logs' && (
              <div className="space-y-6">
                <div className="p-6 rounded-3xl bg-[#062420]/80 border border-emerald-500/20 backdrop-blur-2xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="font-heading text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
                      <Clock className="w-6 h-6 text-gold" />
                      Security Audit Trail & Telemetry Logs ({logs.length})
                    </h2>
                    <p className="text-xs text-emerald-200/70 mt-1">
                      Immutable activity records of administrative approvals, logins, and data edits
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleExportLogs}
                      className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-gold text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" /> Export JSON
                    </button>
                    <button
                      onClick={handleClearLogs}
                      className="px-3.5 py-2 rounded-xl bg-red-900/30 hover:bg-red-800/50 text-red-300 text-xs font-bold transition-all cursor-pointer"
                    >
                      Clear View
                    </button>
                  </div>
                </div>

                {/* Logs Search */}
                <div className="relative">
                  <input
                    type="text"
                    value={logSearchTerm}
                    onChange={(e) => setLogSearchTerm(e.target.value)}
                    placeholder="Search logs by action, details, operator, or timestamp..."
                    className="w-full px-4 py-3 pl-11 rounded-2xl bg-[#062420]/80 border border-emerald-500/20 text-white placeholder:text-white/40 text-sm outline-none focus:border-gold"
                  />
                  <Search className="w-4 h-4 text-gold absolute left-4 top-1/2 -translate-y-1/2" />
                </div>

                <div className="rounded-3xl bg-[#062420]/80 border border-emerald-500/20 backdrop-blur-2xl shadow-xl overflow-hidden">
                  <div className="overflow-x-auto scrollbar-thin">
                    <table className="w-full text-left text-xs min-w-[640px]">
                      <thead className="bg-white/[0.04] text-gold uppercase tracking-wider font-extrabold text-[10px] border-b border-white/10">
                        <tr>
                          <th className="py-3.5 px-4">Action</th>
                          <th className="py-3.5 px-4">Details</th>
                          <th className="py-3.5 px-4">Operator</th>
                          <th className="py-3.5 px-4">Timestamp</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {logs
                          .filter((log) =>
                            !logSearchTerm ||
                            log.action.toLowerCase().includes(logSearchTerm.toLowerCase()) ||
                            (log.details && log.details.toLowerCase().includes(logSearchTerm.toLowerCase())) ||
                            log.user.toLowerCase().includes(logSearchTerm.toLowerCase()) ||
                            log.timestamp.toLowerCase().includes(logSearchTerm.toLowerCase())
                          )
                          .map((log) => (
                          <tr key={log.id} className="hover:bg-white/[0.03] transition-colors">
                            <td className="py-3.5 px-4 font-bold text-white flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                              <span>{log.action}</span>
                            </td>
                            <td className="py-3.5 px-4 text-ivory/80">{log.details}</td>
                            <td className="py-3.5 px-4 font-mono text-emerald-300/80 text-[11px]">{log.user}</td>
                            <td className="py-3.5 px-4 text-white/50 text-[11px]">{log.timestamp}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

          </main>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODALS */}
      {/* ========================================================================= */}

      {/* 1. ADD PROGRAM MODAL */}
      <AnimatePresence>
        {showAddProgModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl bg-[#062622] rounded-3xl border border-gold/30 p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto scrollbar-thin"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-gold/15 text-gold border border-gold/30">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-white">Add Master Curriculum Program</h3>
                    <p className="text-[11px] text-emerald-200/70">Create a standardized academic curriculum framework</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAddProgModal(false)}
                  className="text-white/60 hover:text-white cursor-pointer p-1 rounded-lg hover:bg-white/5 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddProgram} className="space-y-4 text-xs">
                <div>
                  <label className="block text-gold font-bold mb-1">Program Title *</label>
                  <input
                    type="text"
                    required
                    value={newProg.title}
                    onChange={(e) => setNewProg({ ...newProg, title: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold placeholder:text-white/30"
                    placeholder="e.g. Master Diploma in Islamic Banking & FinTech"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gold font-bold mb-1">Academic Category</label>
                    <select
                      value={newProg.category}
                      onChange={(e) => setNewProg({ ...newProg, category: e.target.value as any })}
                      className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold cursor-pointer"
                    >
                      <option value="Islamic Finance">Islamic Finance</option>
                      <option value="Arabic & Languages">Arabic & Languages</option>
                      <option value="Research">Research & Policy</option>
                      <option value="Shariah FinTech">Shariah FinTech</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gold font-bold mb-1">Curriculum Level</label>
                    <select
                      value={newProg.level}
                      onChange={(e) => setNewProg({ ...newProg, level: e.target.value as any })}
                      className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold cursor-pointer"
                    >
                      <option value="Diploma">Diploma</option>
                      <option value="Executive Program">Executive Program</option>
                      <option value="Professional Certificate">Professional Certificate</option>
                      <option value="Advanced Diploma">Advanced Diploma</option>
                      <option value="Doctorate">Doctorate</option>
                      <option value="Master of Science">Master of Science</option>
                      <option value="Fellowship">Fellowship</option>
                      <option value="Micro-Credential">Micro-Credential</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-gold font-bold mb-1">Learning Mode</label>
                    <select
                      value={newProg.mode}
                      onChange={(e) => setNewProg({ ...newProg, mode: e.target.value as any })}
                      className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold cursor-pointer"
                    >
                      <option value="Blended">Blended</option>
                      <option value="Online">Online</option>
                      <option value="On-Campus">On-Campus</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gold font-bold mb-1">Duration</label>
                    <input
                      type="text"
                      value={newProg.duration}
                      onChange={(e) => setNewProg({ ...newProg, duration: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                      placeholder="e.g. 1 Year / 6 Months"
                    />
                  </div>

                  <div>
                    <label className="block text-gold font-bold mb-1">Credit / Hours</label>
                    <input
                      type="text"
                      value={newProg.hours}
                      onChange={(e) => setNewProg({ ...newProg, hours: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                      placeholder="e.g. 240 Hours"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gold font-bold mb-1">Language of Instruction</label>
                    <input
                      type="text"
                      value={newProg.language}
                      onChange={(e) => setNewProg({ ...newProg, language: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                      placeholder="e.g. English & Arabic"
                    />
                  </div>

                  <div>
                    <label className="block text-gold font-bold mb-1">Capacity / Enrolled</label>
                    <input
                      type="number"
                      value={newProg.students}
                      onChange={(e) => setNewProg({ ...newProg, students: Number(e.target.value) })}
                      className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                      placeholder="25"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gold font-bold mb-1">Program Overview & Description</label>
                  <textarea
                    rows={3}
                    value={newProg.description}
                    onChange={(e) => setNewProg({ ...newProg, description: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold placeholder:text-white/30"
                    placeholder="Provide a comprehensive syllabus overview, course scope, and target scholar audience..."
                  />
                </div>

                <div>
                  <label className="block text-gold font-bold mb-1">
                    Learning Outcomes <span className="text-white/40 font-normal">(one per line)</span>
                  </label>
                  <textarea
                    rows={3}
                    value={newProg.outcomes}
                    onChange={(e) => setNewProg({ ...newProg, outcomes: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold placeholder:text-white/30"
                    placeholder="e.g.&#10;Mastery of AAOIFI Shariah & Auditing standards&#10;Structuring Sukuk and Islamic FinTech contracts&#10;Regulatory risk modeling and compliance"
                  />
                </div>

                <div className="pt-3 flex justify-end gap-2 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setShowAddProgModal(false)}
                    className="px-4 py-2 rounded-xl bg-white/10 text-white font-bold hover:bg-white/15 cursor-pointer transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-emerald-950 font-bold hover:brightness-110 cursor-pointer shadow-lg transition-all"
                  >
                    Create Program
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. EDIT PROGRAM MODAL */}
      <AnimatePresence>
        {editingProg && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl bg-[#062622] rounded-3xl border border-gold/30 p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto scrollbar-thin"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-gold/15 text-gold border border-gold/30">
                    <Edit className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-white">Edit Program Curriculum</h3>
                    <p className="text-[11px] text-emerald-200/70">Update parameters for {editingProg.title}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setEditingProg(null)}
                  className="text-white/60 hover:text-white cursor-pointer p-1 rounded-lg hover:bg-white/5 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleEditProgram} className="space-y-4 text-xs">
                <div>
                  <label className="block text-gold font-bold mb-1">Program Title *</label>
                  <input
                    type="text"
                    required
                    value={editingProg.title}
                    onChange={(e) => setEditingProg({ ...editingProg, title: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gold font-bold mb-1">Category</label>
                    <select
                      value={editingProg.category}
                      onChange={(e) => setEditingProg({ ...editingProg, category: e.target.value as any })}
                      className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold cursor-pointer"
                    >
                      <option value="Islamic Finance">Islamic Finance</option>
                      <option value="Arabic & Languages">Arabic & Languages</option>
                      <option value="Research">Research & Policy</option>
                      <option value="Shariah FinTech">Shariah FinTech</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gold font-bold mb-1">Level</label>
                    <select
                      value={editingProg.level}
                      onChange={(e) => setEditingProg({ ...editingProg, level: e.target.value as any })}
                      className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold cursor-pointer"
                    >
                      <option value="Diploma">Diploma</option>
                      <option value="Executive Program">Executive Program</option>
                      <option value="Professional Certificate">Professional Certificate</option>
                      <option value="Advanced Diploma">Advanced Diploma</option>
                      <option value="Doctorate">Doctorate</option>
                      <option value="Master of Science">Master of Science</option>
                      <option value="Fellowship">Fellowship</option>
                      <option value="Micro-Credential">Micro-Credential</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-gold font-bold mb-1">Learning Mode</label>
                    <select
                      value={typeof editingProg.mode === 'string' ? editingProg.mode : 'Blended'}
                      onChange={(e) => setEditingProg({ ...editingProg, mode: e.target.value as any })}
                      className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold cursor-pointer"
                    >
                      <option value="Blended">Blended</option>
                      <option value="Online">Online</option>
                      <option value="On-Campus">On-Campus</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gold font-bold mb-1">Duration</label>
                    <input
                      type="text"
                      value={editingProg.duration || ''}
                      onChange={(e) => setEditingProg({ ...editingProg, duration: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-gold font-bold mb-1">Hours</label>
                    <input
                      type="text"
                      value={editingProg.hours || ''}
                      onChange={(e) => setEditingProg({ ...editingProg, hours: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gold font-bold mb-1">Language</label>
                    <input
                      type="text"
                      value={editingProg.language || ''}
                      onChange={(e) => setEditingProg({ ...editingProg, language: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-gold font-bold mb-1">Enrolled / Capacity</label>
                    <input
                      type="number"
                      value={editingProg.students || 0}
                      onChange={(e) => setEditingProg({ ...editingProg, students: Number(e.target.value) })}
                      className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gold font-bold mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={editingProg.description || ''}
                    onChange={(e) => setEditingProg({ ...editingProg, description: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                  />
                </div>

                <div className="pt-3 flex justify-end gap-2 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setEditingProg(null)}
                    className="px-4 py-2 rounded-xl bg-white/10 text-white font-bold hover:bg-white/15 cursor-pointer transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-emerald-950 font-bold hover:brightness-110 cursor-pointer shadow-lg transition-all"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. ADD INSTITUTION MODAL */}
      <AnimatePresence>
        {showAddInstModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-[#062622] rounded-3xl border border-gold/30 p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <h3 className="font-heading font-bold text-lg text-white">Add New Institution</h3>
                <button onClick={() => setShowAddInstModal(false)} className="text-white/60 hover:text-white cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddInstitution} className="space-y-3 text-xs">
                <div>
                  <label className="block text-gold font-bold mb-1">Institution Name</label>
                  <input
                    type="text"
                    required
                    value={newInst.name}
                    onChange={(e) => setNewInst({ ...newInst, name: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                    placeholder="e.g. Al Noor Islamic Finance Academy"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gold font-bold mb-1">Country</label>
                    <input
                      type="text"
                      required
                      value={newInst.country}
                      onChange={(e) => setNewInst({ ...newInst, country: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-gold font-bold mb-1">City</label>
                    <input
                      type="text"
                      required
                      value={newInst.city}
                      onChange={(e) => setNewInst({ ...newInst, city: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gold font-bold mb-1">Institution Type</label>
                  <select
                    value={newInst.type}
                    onChange={(e) => setNewInst({ ...newInst, type: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                  >
                    <option value="University">University</option>
                    <option value="Institute">Institute</option>
                    <option value="Academy">Academy</option>
                    <option value="Center">Research Center</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gold font-bold mb-1">Programs (comma separated)</label>
                  <input
                    type="text"
                    value={newInst.programs}
                    onChange={(e) => setNewInst({ ...newInst, programs: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                  />
                </div>

                <div className="pt-3 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddInstModal(false)}
                    className="px-4 py-2 rounded-xl bg-white/10 text-white font-bold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-emerald-950 font-bold cursor-pointer"
                  >
                    Save Institution
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 4. EDIT INSTITUTION MODAL */}
      <AnimatePresence>
        {editingInst && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-[#062622] rounded-3xl border border-gold/30 p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <h3 className="font-heading font-bold text-lg text-white">Edit Institution Profile</h3>
                <button onClick={() => setEditingInst(null)} className="text-white/60 hover:text-white cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleEditInstitution} className="space-y-3 text-xs">
                <div>
                  <label className="block text-gold font-bold mb-1">Institution Name</label>
                  <input
                    type="text"
                    required
                    value={editingInst.name}
                    onChange={(e) => setEditingInst({ ...editingInst, name: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gold font-bold mb-1">Country</label>
                    <input
                      type="text"
                      required
                      value={editingInst.country}
                      onChange={(e) => setEditingInst({ ...editingInst, country: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-gold font-bold mb-1">City</label>
                    <input
                      type="text"
                      required
                      value={editingInst.city}
                      onChange={(e) => setEditingInst({ ...editingInst, city: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gold font-bold mb-1">Type</label>
                    <input
                      type="text"
                      value={editingInst.type}
                      onChange={(e) => setEditingInst({ ...editingInst, type: e.target.value as any })}
                      className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-gold font-bold mb-1">Status</label>
                    <select
                      value={editingInst.status}
                      onChange={(e) => setEditingInst({ ...editingInst, status: e.target.value as any })}
                      className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                    >
                      <option value="Active">Active</option>
                      <option value="Pending">Pending</option>
                      <option value="Suspended">Suspended</option>
                    </select>
                  </div>
                </div>

                <div className="pt-3 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingInst(null)}
                    className="px-4 py-2 rounded-xl bg-white/10 text-white font-bold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-emerald-950 font-bold cursor-pointer"
                  >
                    Update Profile
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 5. ISSUE CERTIFICATE MODAL */}
      <AnimatePresence>
        {showAddCertModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-[#062622] rounded-3xl border border-gold/30 p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <h3 className="font-heading font-bold text-lg text-white">Issue Verifiable Certificate</h3>
                <button onClick={() => setShowAddCertModal(false)} className="text-white/60 hover:text-white cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleIssueCertificate} className="space-y-3 text-xs">
                <div>
                  <label className="block text-gold font-bold mb-1">Scholar Full Name</label>
                  <input
                    type="text"
                    required
                    value={newCert.studentName}
                    onChange={(e) => setNewCert({ ...newCert, studentName: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                    placeholder="e.g. Zayd Ibrahim Al-Khatib"
                  />
                </div>
                <div>
                  <label className="block text-gold font-bold mb-1">Scholar Email</label>
                  <input
                    type="email"
                    required
                    value={newCert.studentEmail}
                    onChange={(e) => setNewCert({ ...newCert, studentEmail: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                    placeholder="scholar@example.edu"
                  />
                </div>
                <div>
                  <label className="block text-gold font-bold mb-1">Program</label>
                  <input
                    type="text"
                    required
                    value={newCert.program}
                    onChange={(e) => setNewCert({ ...newCert, program: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block text-gold font-bold mb-1">Awarding Institution</label>
                  <input
                    type="text"
                    required
                    value={newCert.institution}
                    onChange={(e) => setNewCert({ ...newCert, institution: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                  />
                </div>

                <div className="pt-3 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddCertModal(false)}
                    className="px-4 py-2 rounded-xl bg-white/10 text-white font-bold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-emerald-950 font-bold cursor-pointer"
                  >
                    Issue Credential
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 6. ADD EVENT MODAL */}
      <AnimatePresence>
        {showAddEventModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-[#062622] rounded-3xl border border-gold/30 p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <h3 className="font-heading font-bold text-lg text-white">Schedule New Event / Summit</h3>
                <button onClick={() => setShowAddEventModal(false)} className="text-white/60 hover:text-white cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddEvent} className="space-y-3 text-xs">
                <div>
                  <label className="block text-gold font-bold mb-1">Event Title</label>
                  <input
                    type="text"
                    required
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                    placeholder="e.g. Annual Global Islamic FinTech Summit 2027"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gold font-bold mb-1">Date</label>
                    <input
                      type="date"
                      required
                      value={newEvent.date}
                      onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-gold font-bold mb-1">Event Type</label>
                    <select
                      value={newEvent.type}
                      onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                    >
                      <option value="Conference">Conference</option>
                      <option value="Symposium">Symposium</option>
                      <option value="Summit">Summit</option>
                      <option value="Workshop">Workshop</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gold font-bold mb-1">City</label>
                    <input
                      type="text"
                      value={newEvent.city}
                      onChange={(e) => setNewEvent({ ...newEvent, city: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-gold font-bold mb-1">Country</label>
                    <input
                      type="text"
                      value={newEvent.country}
                      onChange={(e) => setNewEvent({ ...newEvent, country: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gold font-bold mb-1">Theme / Focus</label>
                  <input
                    type="text"
                    value={newEvent.theme}
                    onChange={(e) => setNewEvent({ ...newEvent, theme: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                  />
                </div>

                <div className="pt-3 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddEventModal(false)}
                    className="px-4 py-2 rounded-xl bg-white/10 text-white font-bold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-emerald-950 font-bold cursor-pointer"
                  >
                    Publish Event
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 7. ADD RESEARCH PAPER MODAL */}
      <AnimatePresence>
        {showAddPaperModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-[#062622] rounded-3xl border border-gold/30 p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <h3 className="font-heading font-bold text-lg text-white">Publish Research Paper</h3>
                <button onClick={() => setShowAddPaperModal(false)} className="text-white/60 hover:text-white cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddPaper} className="space-y-3 text-xs">
                <div>
                  <label className="block text-gold font-bold mb-1">Paper Title</label>
                  <input
                    type="text"
                    required
                    value={newPaper.title}
                    onChange={(e) => setNewPaper({ ...newPaper, title: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block text-gold font-bold mb-1">Authors (comma separated)</label>
                  <input
                    type="text"
                    required
                    value={newPaper.authors}
                    onChange={(e) => setNewPaper({ ...newPaper, authors: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                    placeholder="Dr. Tariq Al-Mansoor, Prof. Sarah Johnson"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gold font-bold mb-1">Journal</label>
                    <input
                      type="text"
                      value={newPaper.journal}
                      onChange={(e) => setNewPaper({ ...newPaper, journal: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-gold font-bold mb-1">Category</label>
                    <select
                      value={newPaper.category}
                      onChange={(e) => setNewPaper({ ...newPaper, category: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                    >
                      <option value="FinTech">FinTech</option>
                      <option value="Shariah">Shariah Law</option>
                      <option value="Economics">Economics</option>
                      <option value="Linguistics">Linguistics</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-gold font-bold mb-1">Abstract</label>
                  <textarea
                    rows={3}
                    value={newPaper.abstract}
                    onChange={(e) => setNewPaper({ ...newPaper, abstract: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                  />
                </div>

                <div className="pt-3 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddPaperModal(false)}
                    className="px-4 py-2 rounded-xl bg-white/10 text-white font-bold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-emerald-950 font-bold cursor-pointer"
                  >
                    Publish DOI Paper
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 8. ADD EXPERT MODAL */}
      <AnimatePresence>
        {showAddExpertModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-[#062622] rounded-3xl border border-gold/30 p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <h3 className="font-heading font-bold text-lg text-white">Add Expert Scholar</h3>
                <button onClick={() => setShowAddExpertModal(false)} className="text-white/60 hover:text-white cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddExpert} className="space-y-3 text-xs">
                <div>
                  <label className="block text-gold font-bold mb-1">Scholar Full Name</label>
                  <input
                    type="text"
                    required
                    value={newExpert.name}
                    onChange={(e) => setNewExpert({ ...newExpert, name: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gold font-bold mb-1">Academic Title / Role</label>
                    <input
                      type="text"
                      value={newExpert.role}
                      onChange={(e) => setNewExpert({ ...newExpert, role: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-gold font-bold mb-1">Country</label>
                    <input
                      type="text"
                      value={newExpert.country}
                      onChange={(e) => setNewExpert({ ...newExpert, country: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gold font-bold mb-1">Specializations (comma separated)</label>
                  <input
                    type="text"
                    value={newExpert.fields}
                    onChange={(e) => setNewExpert({ ...newExpert, fields: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                  />
                </div>

                <div className="pt-3 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddExpertModal(false)}
                    className="px-4 py-2 rounded-xl bg-white/10 text-white font-bold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-emerald-950 font-bold cursor-pointer"
                  >
                    Register Scholar
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 9. ADD USER MODAL */}
      <AnimatePresence>
        {showAddUserModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-[#062622] rounded-3xl border border-gold/30 p-6 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <h3 className="font-heading font-bold text-lg text-white">Create User Account</h3>
                <button onClick={() => setShowAddUserModal(false)} className="text-white/60 hover:text-white cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddUser} className="space-y-3 text-xs">
                <div>
                  <label className="block text-gold font-bold mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block text-gold font-bold mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gold font-bold mb-1">Role</label>
                    <select
                      value={newUser.role}
                      onChange={(e) => setNewUser({ ...newUser, role: e.target.value as any })}
                      className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                    >
                      <option value="admin">Administrator</option>
                      <option value="institution">Institution Admin</option>
                      <option value="faculty">Faculty Member</option>
                      <option value="student">Student / Scholar</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gold font-bold mb-1">Initial Password</label>
                    <input
                      type="password"
                      required
                      value={newUser.password}
                      onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                    />
                  </div>
                </div>

                <div className="pt-3 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddUserModal(false)}
                    className="px-4 py-2 rounded-xl bg-white/10 text-white font-bold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-emerald-950 font-bold cursor-pointer"
                  >
                    Provision Account
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 10. ADD PAYMENT MODAL */}
      <AnimatePresence>
        {showAddPaymentModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-[#062622] rounded-3xl border border-gold/30 p-6 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <h3 className="font-heading font-bold text-lg text-white">Record Payment</h3>
                <button onClick={() => setShowAddPaymentModal(false)} className="text-white/60 hover:text-white cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddPayment} className="space-y-3 text-xs">
                <div>
                  <label className="block text-gold font-bold mb-1">Payer Name</label>
                  <input
                    type="text"
                    required
                    value={newPayment.payerName}
                    onChange={(e) => setNewPayment({ ...newPayment, payerName: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block text-gold font-bold mb-1">Payer Email</label>
                  <input
                    type="email"
                    required
                    value={newPayment.payerEmail}
                    onChange={(e) => setNewPayment({ ...newPayment, payerEmail: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gold font-bold mb-1">Amount ($ USD)</label>
                    <input
                      type="number"
                      required
                      value={newPayment.amount}
                      onChange={(e) => setNewPayment({ ...newPayment, amount: Number(e.target.value) })}
                      className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-gold font-bold mb-1">Status</label>
                    <select
                      value={newPayment.status}
                      onChange={(e) => setNewPayment({ ...newPayment, status: e.target.value as any })}
                      className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                    >
                      <option value="Paid">Paid</option>
                      <option value="Pending">Pending</option>
                      <option value="Refunded">Refunded</option>
                    </select>
                  </div>
                </div>

                <div className="pt-3 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddPaymentModal(false)}
                    className="px-4 py-2 rounded-xl bg-white/10 text-white font-bold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-emerald-950 font-bold cursor-pointer"
                  >
                    Log Payment
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 11. ADD MEDIA MODAL */}
      <AnimatePresence>
        {showAddMediaModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-[#062622] rounded-3xl border border-gold/30 p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto scrollbar-thin"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-gold/15 text-gold border border-gold/30">
                    <ImageIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-white">Add New Media Asset</h3>
                    <p className="text-[11px] text-emerald-200/70">Register a new image, banner, or video loop asset</p>
                  </div>
                </div>
                <button onClick={() => setShowAddMediaModal(false)} className="text-white/60 hover:text-white cursor-pointer p-1 rounded-lg hover:bg-white/5 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddMedia} className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-gold font-bold mb-1">Asset Name *</label>
                  <input
                    type="text"
                    required
                    value={newMedia.name}
                    onChange={(e) => setNewMedia({ ...newMedia, name: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold placeholder:text-white/30"
                    placeholder="e.g. Hero Section Ambient Video Loop"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gold font-bold mb-1">Asset Key (unique identifier) *</label>
                    <input
                      type="text"
                      required
                      value={newMedia.key}
                      onChange={(e) => setNewMedia({ ...newMedia, key: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold placeholder:text-white/30 font-mono text-[11px]"
                      placeholder="e.g. hero-banner-2026"
                    />
                  </div>
                  <div>
                    <label className="block text-gold font-bold mb-1">Category</label>
                    <select
                      value={newMedia.category}
                      onChange={(e) => setNewMedia({ ...newMedia, category: e.target.value as any })}
                      className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold cursor-pointer"
                    >
                      <option value="banner">Banner (Hero & Section Headers)</option>
                      <option value="logo">Logo (Emblem & Branding)</option>
                      <option value="video">Video (MP4 Ambient Loops)</option>
                      <option value="visual">Visual (Journals & Publications)</option>
                      <option value="avatar">Avatar (Scholar & Faculty)</option>
                      <option value="document">Document (PDF / Forms)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-gold font-bold mb-1">Media URL or Path *</label>
                  <input
                    type="text"
                    required
                    value={newMedia.url}
                    onChange={(e) => setNewMedia({ ...newMedia, url: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold placeholder:text-white/30 font-mono text-[11px]"
                    placeholder="e.g. /logo.jpg or https://images.unsplash.com/..."
                  />
                </div>

                {/* Live Preview Box */}
                {newMedia.url && (
                  <div className="p-3 rounded-2xl bg-black/40 border border-white/10 space-y-1.5">
                    <span className="text-[10px] uppercase font-bold text-emerald-300 block">Live Media Preview</span>
                    <div className="h-32 rounded-xl overflow-hidden bg-black/60 flex items-center justify-center border border-white/5">
                      {newMedia.category === 'video' ? (
                        <div className="text-center text-gold text-xs flex flex-col items-center">
                          <Zap className="w-6 h-6 mb-1" />
                          <span>Video Asset URL: {newMedia.url}</span>
                        </div>
                      ) : (
                        <img
                          src={newMedia.url}
                          alt="Preview"
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                      )}
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-gold font-bold mb-1">Description / Portal Placement</label>
                  <textarea
                    rows={2}
                    value={newMedia.description}
                    onChange={(e) => setNewMedia({ ...newMedia, description: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold placeholder:text-white/30"
                    placeholder="Where is this media asset utilized across the website?"
                  />
                </div>

                <div className="pt-3 flex justify-end gap-2 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setShowAddMediaModal(false)}
                    className="px-4 py-2 rounded-xl bg-white/10 text-white font-bold hover:bg-white/15 cursor-pointer transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-emerald-950 font-bold hover:brightness-110 cursor-pointer shadow-lg transition-all"
                  >
                    Save Asset
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 12. EDIT MEDIA MODAL */}
      <AnimatePresence>
        {editingMedia && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-[#062622] rounded-3xl border border-gold/30 p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto scrollbar-thin"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-gold/15 text-gold border border-gold/30">
                    <Edit className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-white">Edit Media Asset</h3>
                    <p className="text-[11px] text-emerald-200/70">Update URL, category, or description for {editingMedia.name}</p>
                  </div>
                </div>
                <button onClick={() => setEditingMedia(null)} className="text-white/60 hover:text-white cursor-pointer p-1 rounded-lg hover:bg-white/5 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleUpdateMedia} className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-gold font-bold mb-1">Asset Name *</label>
                  <input
                    type="text"
                    required
                    value={editingMedia.name}
                    onChange={(e) => setEditingMedia({ ...editingMedia, name: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gold font-bold mb-1">Asset Key</label>
                    <input
                      type="text"
                      disabled
                      value={editingMedia.key}
                      className="w-full p-2.5 rounded-xl bg-black/40 border border-white/10 text-white/60 font-mono text-[11px] cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-gold font-bold mb-1">Category</label>
                    <select
                      value={editingMedia.category}
                      onChange={(e) => setEditingMedia({ ...editingMedia, category: e.target.value as any })}
                      className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold cursor-pointer"
                    >
                      <option value="banner">Banner (Hero & Section Headers)</option>
                      <option value="logo">Logo (Emblem & Branding)</option>
                      <option value="video">Video (MP4 Ambient Loops)</option>
                      <option value="visual">Visual (Journals & Publications)</option>
                      <option value="avatar">Avatar (Scholar & Faculty)</option>
                      <option value="document">Document (PDF / Forms)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-gold font-bold mb-1">Media URL or Path *</label>
                  <input
                    type="text"
                    required
                    value={editingMedia.url}
                    onChange={(e) => setEditingMedia({ ...editingMedia, url: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold font-mono text-[11px]"
                  />
                </div>

                {/* Live Preview Box */}
                {editingMedia.url && (
                  <div className="p-3 rounded-2xl bg-black/40 border border-white/10 space-y-1.5">
                    <span className="text-[10px] uppercase font-bold text-emerald-300 block">Live Media Preview</span>
                    <div className="h-32 rounded-xl overflow-hidden bg-black/60 flex items-center justify-center border border-white/5">
                      {editingMedia.category === 'video' ? (
                        <div className="text-center text-gold text-xs flex flex-col items-center">
                          <Zap className="w-6 h-6 mb-1" />
                          <span>Video Asset URL: {editingMedia.url}</span>
                        </div>
                      ) : (
                        <img
                          src={editingMedia.url}
                          alt="Preview"
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                      )}
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-gold font-bold mb-1">Description / Portal Placement</label>
                  <textarea
                    rows={2}
                    value={editingMedia.description || ''}
                    onChange={(e) => setEditingMedia({ ...editingMedia, description: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                    placeholder="Where is this media asset utilized across the website?"
                  />
                </div>

                <div className="pt-3 flex justify-end gap-2 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setEditingMedia(null)}
                    className="px-4 py-2 rounded-xl bg-white/10 text-white font-bold hover:bg-white/15 cursor-pointer transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-emerald-950 font-bold hover:brightness-110 cursor-pointer shadow-lg transition-all"
                  >
                    Update Media Asset
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 13. EDIT PILLAR MODAL */}
      <AnimatePresence>
        {editingPillar && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-[#062622] rounded-3xl border border-gold/30 p-6 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <h3 className="font-heading font-bold text-lg text-white">Edit Governance Pillar</h3>
                <button onClick={() => setEditingPillar(null)} className="text-white/60 hover:text-white cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSavePillar} className="space-y-3 text-xs">
                <div>
                  <label className="block text-gold font-bold mb-1">Custom Pillar Title</label>
                  <input
                    type="text"
                    value={editingPillar.customTitle || ''}
                    onChange={(e) => setEditingPillar({ ...editingPillar, customTitle: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                    placeholder={editingPillar.titleKey}
                  />
                </div>
                <div>
                  <label className="block text-gold font-bold mb-1">Custom Description & Objectives</label>
                  <textarea
                    rows={4}
                    value={editingPillar.customDesc || ''}
                    onChange={(e) => setEditingPillar({ ...editingPillar, customDesc: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                  />
                </div>

                <div className="pt-3 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingPillar(null)}
                    className="px-4 py-2 rounded-xl bg-white/10 text-white font-bold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-emerald-950 font-bold cursor-pointer"
                  >
                    Save Pillar
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 14. VIEW / REVIEW APPLICATION MODAL */}
      <AnimatePresence>
        {viewingApp && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-xl bg-[#062622] rounded-3xl border border-gold/30 p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div>
                  <h3 className="font-heading font-bold text-lg text-white">{viewingApp.institutionName}</h3>
                  <p className="text-xs text-emerald-200/70">Application Ref: {viewingApp.id}</p>
                </div>
                <button onClick={() => setViewingApp(null)} className="text-white/60 hover:text-white cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-3 p-3 rounded-2xl bg-white/5 border border-white/10">
                  <div>
                    <span className="text-white/50 block">Country:</span>
                    <span className="text-white font-bold">{viewingApp.country}</span>
                  </div>
                  <div>
                    <span className="text-white/50 block">Current Stage:</span>
                    <span className="text-gold font-bold">{viewingApp.currentStage}</span>
                  </div>
                  <div>
                    <span className="text-white/50 block">Contact Person:</span>
                    <span className="text-white font-bold">{viewingApp.contactPerson}</span>
                  </div>
                  <div>
                    <span className="text-white/50 block">Contact Email:</span>
                    <span className="text-emerald-300 font-mono">{viewingApp.contactEmail}</span>
                  </div>
                </div>

                <div className="pt-3 flex justify-end gap-2 border-t border-white/10">
                  <button
                    onClick={() => handleUpdateAppStatus(viewingApp.id, 'Approved')}
                    className="px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold hover:bg-emerald-500/30 cursor-pointer"
                  >
                    Approve Application
                  </button>
                  <button
                    onClick={() => handleUpdateAppStatus(viewingApp.id, 'Under Review')}
                    className="px-4 py-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold hover:bg-amber-500/30 cursor-pointer"
                  >
                    Mark Under Review
                  </button>
                  <button
                    onClick={() => handleUpdateAppStatus(viewingApp.id, 'Rejected')}
                    className="px-4 py-2 rounded-xl bg-red-500/20 text-red-300 border border-red-500/40 text-xs font-bold hover:bg-red-500/30 cursor-pointer"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 16. EDIT RESEARCH PAPER MODAL */}
      <AnimatePresence>
        {editingPaper && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-[#062622] rounded-3xl border border-gold/30 p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-gold/15 text-gold border border-gold/30">
                    <Microscope className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-white">Edit Research Paper</h3>
                    <p className="text-[11px] text-emerald-200/70">Update publication details & metadata</p>
                  </div>
                </div>
                <button onClick={() => setEditingPaper(null)} className="text-white/60 hover:text-white cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleEditPaper} className="space-y-3 text-xs">
                <div>
                  <label className="block text-gold font-bold mb-1">Paper Title</label>
                  <input
                    type="text"
                    required
                    value={editingPaper.title}
                    onChange={(e) => setEditingPaper({ ...editingPaper, title: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block text-gold font-bold mb-1">Authors (comma separated)</label>
                  <input
                    type="text"
                    required
                    value={Array.isArray(editingPaper.authors) ? editingPaper.authors.join(', ') : editingPaper.authors}
                    onChange={(e) => setEditingPaper({ ...editingPaper, authors: e.target.value as any })}
                    className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gold font-bold mb-1">Journal</label>
                    <input
                      type="text"
                      value={editingPaper.journal || ''}
                      onChange={(e) => setEditingPaper({ ...editingPaper, journal: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-gold font-bold mb-1">Category</label>
                    <select
                      value={editingPaper.category || 'FinTech'}
                      onChange={(e) => setEditingPaper({ ...editingPaper, category: e.target.value as any })}
                      className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                    >
                      <option value="FinTech">FinTech</option>
                      <option value="Shariah">Shariah Law</option>
                      <option value="Economics">Economics</option>
                      <option value="Linguistics">Linguistics</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-gold font-bold mb-1">DOI Ref</label>
                  <input
                    type="text"
                    value={editingPaper.doi || ''}
                    onChange={(e) => setEditingPaper({ ...editingPaper, doi: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold font-mono text-[11px]"
                  />
                </div>
                <div>
                  <label className="block text-gold font-bold mb-1">Abstract</label>
                  <textarea
                    rows={3}
                    value={editingPaper.abstract || ''}
                    onChange={(e) => setEditingPaper({ ...editingPaper, abstract: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                  />
                </div>

                <div className="pt-3 flex justify-end gap-2 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setEditingPaper(null)}
                    className="px-4 py-2 rounded-xl bg-white/10 text-white font-bold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-emerald-950 font-bold cursor-pointer"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 17. EDIT SCHOLAR / EXPERT MODAL */}
      <AnimatePresence>
        {editingExpert && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-[#062622] rounded-3xl border border-gold/30 p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-gold/15 text-gold border border-gold/30">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-white">Edit Scholar Profile</h3>
                    <p className="text-[11px] text-emerald-200/70">Update credentials for {editingExpert.name}</p>
                  </div>
                </div>
                <button onClick={() => setEditingExpert(null)} className="text-white/60 hover:text-white cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleEditExpert} className="space-y-3 text-xs">
                <div>
                  <label className="block text-gold font-bold mb-1">Scholar Full Name</label>
                  <input
                    type="text"
                    required
                    value={editingExpert.name}
                    onChange={(e) => setEditingExpert({ ...editingExpert, name: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gold font-bold mb-1">Academic Title / Role</label>
                    <input
                      type="text"
                      value={editingExpert.role}
                      onChange={(e) => setEditingExpert({ ...editingExpert, role: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-gold font-bold mb-1">Country</label>
                    <input
                      type="text"
                      value={editingExpert.country}
                      onChange={(e) => setEditingExpert({ ...editingExpert, country: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gold font-bold mb-1">GIFLRI Council Position</label>
                  <input
                    type="text"
                    value={editingExpert.giflriRole || ''}
                    onChange={(e) => setEditingExpert({ ...editingExpert, giflriRole: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block text-gold font-bold mb-1">Specializations (comma separated)</label>
                  <input
                    type="text"
                    value={Array.isArray(editingExpert.fields) ? editingExpert.fields.join(', ') : editingExpert.fields || ''}
                    onChange={(e) => setEditingExpert({ ...editingExpert, fields: e.target.value as any })}
                    className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block text-gold font-bold mb-1">Biography</label>
                  <textarea
                    rows={3}
                    value={editingExpert.biography || ''}
                    onChange={(e) => setEditingExpert({ ...editingExpert, biography: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                  />
                </div>

                <div className="pt-3 flex justify-end gap-2 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setEditingExpert(null)}
                    className="px-4 py-2 rounded-xl bg-white/10 text-white font-bold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-emerald-950 font-bold cursor-pointer"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 18. EDIT EVENT MODAL */}
      <AnimatePresence>
        {editingEvent && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-[#062622] rounded-3xl border border-gold/30 p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-gold/15 text-gold border border-gold/30">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-white">Edit Conference / Summit</h3>
                    <p className="text-[11px] text-emerald-200/70">Update event parameters & venue</p>
                  </div>
                </div>
                <button onClick={() => setEditingEvent(null)} className="text-white/60 hover:text-white cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleEditEvent} className="space-y-3 text-xs">
                <div>
                  <label className="block text-gold font-bold mb-1">Event Title</label>
                  <input
                    type="text"
                    required
                    value={editingEvent.title}
                    onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gold font-bold mb-1">Date</label>
                    <input
                      type="date"
                      required
                      value={editingEvent.date}
                      onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-gold font-bold mb-1">Event Type</label>
                    <select
                      value={editingEvent.type}
                      onChange={(e) => setEditingEvent({ ...editingEvent, type: e.target.value as any })}
                      className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                    >
                      <option value="Conference">Conference</option>
                      <option value="Symposium">Symposium</option>
                      <option value="Summit">Summit</option>
                      <option value="Workshop">Workshop</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gold font-bold mb-1">City</label>
                    <input
                      type="text"
                      value={editingEvent.city}
                      onChange={(e) => setEditingEvent({ ...editingEvent, city: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-gold font-bold mb-1">Country</label>
                    <input
                      type="text"
                      value={editingEvent.country}
                      onChange={(e) => setEditingEvent({ ...editingEvent, country: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gold font-bold mb-1">Theme / Focus</label>
                  <input
                    type="text"
                    value={editingEvent.theme}
                    onChange={(e) => setEditingEvent({ ...editingEvent, theme: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block text-gold font-bold mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={editingEvent.desc || ''}
                    onChange={(e) => setEditingEvent({ ...editingEvent, desc: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                  />
                </div>

                <div className="pt-3 flex justify-end gap-2 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setEditingEvent(null)}
                    className="px-4 py-2 rounded-xl bg-white/10 text-white font-bold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-emerald-950 font-bold cursor-pointer"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 19. EDIT CERTIFICATE MODAL */}
      <AnimatePresence>
        {editingCert && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-[#062622] rounded-3xl border border-gold/30 p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-gold/15 text-gold border border-gold/30">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-white">Edit Certificate Details</h3>
                    <p className="text-[11px] text-emerald-200/70">ID: {editingCert.certId || editingCert.id}</p>
                  </div>
                </div>
                <button onClick={() => setEditingCert(null)} className="text-white/60 hover:text-white cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleEditCertificate} className="space-y-3 text-xs">
                <div>
                  <label className="block text-gold font-bold mb-1">Scholar Full Name</label>
                  <input
                    type="text"
                    required
                    value={editingCert.studentName}
                    onChange={(e) => setEditingCert({ ...editingCert, studentName: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block text-gold font-bold mb-1">Program</label>
                  <input
                    type="text"
                    required
                    value={editingCert.program}
                    onChange={(e) => setEditingCert({ ...editingCert, program: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gold font-bold mb-1">Institution</label>
                    <input
                      type="text"
                      required
                      value={editingCert.institution}
                      onChange={(e) => setEditingCert({ ...editingCert, institution: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-gold font-bold mb-1">Grade / Distinction</label>
                    <input
                      type="text"
                      value={editingCert.grade}
                      onChange={(e) => setEditingCert({ ...editingCert, grade: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gold font-bold mb-1">Status</label>
                  <select
                    value={editingCert.status}
                    onChange={(e) => setEditingCert({ ...editingCert, status: e.target.value as any })}
                    className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                  >
                    <option value="Verified">Verified</option>
                    <option value="Revoked">Revoked</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>

                <div className="pt-3 flex justify-end gap-2 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setEditingCert(null)}
                    className="px-4 py-2 rounded-xl bg-white/10 text-white font-bold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-emerald-950 font-bold cursor-pointer"
                  >
                    Save Credential
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 20. EDIT PAYMENT MODAL */}
      <AnimatePresence>
        {editingPayment && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-[#062622] rounded-3xl border border-gold/30 p-6 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-gold/15 text-gold border border-gold/30">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-white">Edit Payment Record</h3>
                    <p className="text-[11px] text-emerald-200/70">{editingPayment.invoiceNumber || editingPayment.id}</p>
                  </div>
                </div>
                <button onClick={() => setEditingPayment(null)} className="text-white/60 hover:text-white cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleEditPayment} className="space-y-3 text-xs">
                <div>
                  <label className="block text-gold font-bold mb-1">Payer Name</label>
                  <input
                    type="text"
                    required
                    value={editingPayment.payerName}
                    onChange={(e) => setEditingPayment({ ...editingPayment, payerName: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block text-gold font-bold mb-1">Institution</label>
                  <input
                    type="text"
                    value={editingPayment.institution || ''}
                    onChange={(e) => setEditingPayment({ ...editingPayment, institution: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gold font-bold mb-1">Amount ($ USD)</label>
                    <input
                      type="number"
                      required
                      value={editingPayment.amount}
                      onChange={(e) => setEditingPayment({ ...editingPayment, amount: Number(e.target.value) })}
                      className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-gold font-bold mb-1">Status</label>
                    <select
                      value={editingPayment.status}
                      onChange={(e) => setEditingPayment({ ...editingPayment, status: e.target.value as any })}
                      className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                    >
                      <option value="Paid">Paid</option>
                      <option value="Pending">Pending</option>
                      <option value="Refunded">Refunded</option>
                    </select>
                  </div>
                </div>

                <div className="pt-3 flex justify-end gap-2 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setEditingPayment(null)}
                    className="px-4 py-2 rounded-xl bg-white/10 text-white font-bold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-emerald-950 font-bold cursor-pointer"
                  >
                    Update Payment
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 21. EDIT USER MODAL */}
      <AnimatePresence>
        {editingUser && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-[#062622] rounded-3xl border border-gold/30 p-6 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-gold/15 text-gold border border-gold/30">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-white">Edit User Account</h3>
                    <p className="text-[11px] text-emerald-200/70">{editingUser.email}</p>
                  </div>
                </div>
                <button onClick={() => setEditingUser(null)} className="text-white/60 hover:text-white cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleEditUser} className="space-y-3 text-xs">
                <div>
                  <label className="block text-gold font-bold mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={editingUser.name}
                    onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block text-gold font-bold mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={editingUser.email}
                    onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gold font-bold mb-1">Role</label>
                    <select
                      value={editingUser.role}
                      onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value as any })}
                      className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                    >
                      <option value="admin">Administrator</option>
                      <option value="institution">Institution Admin</option>
                      <option value="faculty">Faculty Member</option>
                      <option value="student">Student / Scholar</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gold font-bold mb-1">Title / Department</label>
                    <input
                      type="text"
                      value={editingUser.title || ''}
                      onChange={(e) => setEditingUser({ ...editingUser, title: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gold font-bold mb-1">
                    Security Password <span className="text-white/40 font-normal">(Leave blank to keep existing password)</span>
                  </label>
                  <input
                    type="password"
                    placeholder="Enter new password to update"
                    value={editingUser.password || ''}
                    onChange={(e) => setEditingUser({ ...editingUser, password: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold placeholder:text-white/30"
                  />
                </div>

                <div className="pt-3 flex justify-end gap-2 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setEditingUser(null)}
                    className="px-4 py-2 rounded-xl bg-white/10 text-white font-bold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-emerald-950 font-bold cursor-pointer"
                  >
                    Save User
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 22. ADD STUDENT REQUEST MODAL */}
      <AnimatePresence>
        {showAddStudentReqModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-[#062622] rounded-3xl border border-gold/30 p-6 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-gold/15 text-gold border border-gold/30">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-white">Log Student Request</h3>
                    <p className="text-[11px] text-emerald-200/70">Create a student desk service ticket</p>
                  </div>
                </div>
                <button onClick={() => setShowAddStudentReqModal(false)} className="text-white/60 hover:text-white cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddStudentRequest} className="space-y-3 text-xs">
                <div>
                  <label className="block text-gold font-bold mb-1">Student Full Name</label>
                  <input
                    type="text"
                    required
                    value={newStudentReq.studentName}
                    onChange={(e) => setNewStudentReq({ ...newStudentReq, studentName: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                    placeholder="e.g. Fatima Zahra"
                  />
                </div>
                <div>
                  <label className="block text-gold font-bold mb-1">Student Email</label>
                  <input
                    type="email"
                    required
                    value={newStudentReq.studentEmail}
                    onChange={(e) => setNewStudentReq({ ...newStudentReq, studentEmail: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                    placeholder="student@example.com"
                  />
                </div>
                <div>
                  <label className="block text-gold font-bold mb-1">Service Type</label>
                  <select
                    value={newStudentReq.serviceType}
                    onChange={(e) => setNewStudentReq({ ...newStudentReq, serviceType: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                  >
                    <option value="Transcript Request">Official Transcript Request</option>
                    <option value="Diploma Verification">Diploma Verification</option>
                    <option value="Enrollment Certificate">Enrollment Certificate</option>
                    <option value="Equivalency Attestation">Equivalency Attestation</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gold font-bold mb-1">Program</label>
                  <input
                    type="text"
                    required
                    value={newStudentReq.program}
                    onChange={(e) => setNewStudentReq({ ...newStudentReq, program: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                    placeholder="e.g. Diploma in Islamic Finance"
                  />
                </div>

                <div className="pt-3 flex justify-end gap-2 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setShowAddStudentReqModal(false)}
                    className="px-4 py-2 rounded-xl bg-white/10 text-white font-bold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-emerald-950 font-bold cursor-pointer"
                  >
                    Log Request
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 23. ADD FACULTY MODAL */}
      <AnimatePresence>
        {showAddFacultyModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-[#062622] rounded-3xl border border-gold/30 p-6 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-gold/15 text-gold border border-gold/30">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-white">Register Faculty Member</h3>
                    <p className="text-[11px] text-emerald-200/70">Add a verified educator or instructor to roster</p>
                  </div>
                </div>
                <button onClick={() => setShowAddFacultyModal(false)} className="text-white/60 hover:text-white cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddFacultyReg} className="space-y-3 text-xs">
                <div>
                  <label className="block text-gold font-bold mb-1">Faculty Name</label>
                  <input
                    type="text"
                    required
                    value={newFacultyReg.name}
                    onChange={(e) => setNewFacultyReg({ ...newFacultyReg, name: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                    placeholder="e.g. Dr. Omar Al-Qasimi"
                  />
                </div>
                <div>
                  <label className="block text-gold font-bold mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={newFacultyReg.email}
                    onChange={(e) => setNewFacultyReg({ ...newFacultyReg, email: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                    placeholder="faculty@university.edu"
                  />
                </div>
                <div>
                  <label className="block text-gold font-bold mb-1">Affiliated Institution</label>
                  <input
                    type="text"
                    required
                    value={newFacultyReg.institution}
                    onChange={(e) => setNewFacultyReg({ ...newFacultyReg, institution: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                    placeholder="e.g. Al Noor Institute"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gold font-bold mb-1">Department</label>
                    <input
                      type="text"
                      value={newFacultyReg.department}
                      onChange={(e) => setNewFacultyReg({ ...newFacultyReg, department: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-gold font-bold mb-1">Specialization</label>
                    <input
                      type="text"
                      value={newFacultyReg.specialization}
                      onChange={(e) => setNewFacultyReg({ ...newFacultyReg, specialization: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                    />
                  </div>
                </div>

                <div className="pt-3 flex justify-end gap-2 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setShowAddFacultyModal(false)}
                    className="px-4 py-2 rounded-xl bg-white/10 text-white font-bold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-emerald-950 font-bold cursor-pointer"
                  >
                    Register Faculty
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 24. ADD GRIEVANCE MODAL */}
      <AnimatePresence>
        {showAddComplaintModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-[#062622] rounded-3xl border border-gold/30 p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-gold/15 text-gold border border-gold/30">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-white">Log Grievance Ticket</h3>
                    <p className="text-[11px] text-emerald-200/70">Register a formal appeal, dispute, or complaint</p>
                  </div>
                </div>
                <button onClick={() => setShowAddComplaintModal(false)} className="text-white/60 hover:text-white cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddComplaint} className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gold font-bold mb-1">Complainant Name</label>
                    <input
                      type="text"
                      required
                      value={newComplaint.complainantName}
                      onChange={(e) => setNewComplaint({ ...newComplaint, complainantName: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-gold font-bold mb-1">Email</label>
                    <input
                      type="email"
                      required
                      value={newComplaint.complainantEmail}
                      onChange={(e) => setNewComplaint({ ...newComplaint, complainantEmail: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gold font-bold mb-1">Institution</label>
                    <input
                      type="text"
                      value={newComplaint.institutionName}
                      onChange={(e) => setNewComplaint({ ...newComplaint, institutionName: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-gold font-bold mb-1">Priority</label>
                    <select
                      value={newComplaint.priority}
                      onChange={(e) => setNewComplaint({ ...newComplaint, priority: e.target.value as any })}
                      className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                      <option value="Urgent">Urgent</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-gold font-bold mb-1">Subject</label>
                  <input
                    type="text"
                    required
                    value={newComplaint.subject}
                    onChange={(e) => setNewComplaint({ ...newComplaint, subject: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                    placeholder="Brief summary of issue"
                  />
                </div>
                <div>
                  <label className="block text-gold font-bold mb-1">Description / Details</label>
                  <textarea
                    rows={3}
                    required
                    value={newComplaint.description}
                    onChange={(e) => setNewComplaint({ ...newComplaint, description: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-[#031714] border border-white/15 text-white outline-none focus:border-gold"
                  />
                </div>

                <div className="pt-3 flex justify-end gap-2 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setShowAddComplaintModal(false)}
                    className="px-4 py-2 rounded-xl bg-white/10 text-white font-bold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-emerald-950 font-bold cursor-pointer"
                  >
                    Register Ticket
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 15. VIEW CERTIFICATE MODAL */}
      {viewingCert && (
        <CertificateModal
          certificate={viewingCert}
          isOpen={!!viewingCert}
          onClose={() => setViewingCert(null)}
        />
      )}
    </div>
  );
}

export default AdminSection;