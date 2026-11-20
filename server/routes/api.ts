import { Router, Request, Response } from 'express';
import { getContent, updateContent, resetContent } from '../controllers/contentController';
import { login, logout, getCurrentUser, updatePassword } from '../controllers/authController';
import {
  getInstitutions,
  getInstitutionById,
  createInstitution,
  updateInstitution,
} from '../controllers/institutionController';
import {
  getApplications,
  getApplicationById,
  createApplication,
  updateApplication,
} from '../controllers/applicationController';
import {
  getCertificates,
  verifyCertificate,
  createCertificate,
} from '../controllers/certificateController';
import { getResearchPapers, createResearchPaper } from '../controllers/researchController';
import { getEvents, createEvent, registerForEvent, getEventRegistrations } from '../controllers/eventController';
import { getPillars, updatePillars } from '../controllers/pillarController';
import { handleAIChat } from '../controllers/aiController';
import { DB } from '../db/db';

const router = Router();

// ==========================================
// 1. System & Health Check
// ==========================================
router.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', stack: 'MERN', timestamp: new Date().toISOString() });
});

// ==========================================
// 2. Authentication
// ==========================================
router.post('/auth/login', login);
router.post('/auth/logout', logout);
router.get('/auth/me', getCurrentUser);
router.put('/auth/password', updatePassword);
router.post('/auth/password', updatePassword);

// ==========================================
// 3. Website Content CMS Routes
// ==========================================
router.get('/content', getContent);
router.post('/content', updateContent);
router.put('/content', updateContent);
router.post('/content/reset', resetContent);
router.get('/admin/content', getContent);
router.post('/admin/content', updateContent);
router.put('/admin/content', updateContent);

// ==========================================
// 4. Site Settings Routes
// ==========================================
router.get('/settings', (_req: Request, res: Response) => {
  const settings = DB.getSiteSettings();
  res.status(200).json({ success: true, data: settings, ...settings });
});

router.get('/admin/settings', (_req: Request, res: Response) => {
  const settings = DB.getSiteSettings();
  res.status(200).json({ success: true, data: settings, ...settings });
});

router.post('/admin/settings', (req: Request, res: Response) => {
  const updated = DB.updateSiteSettings(req.body);
  res.status(200).json({ success: true, data: updated, ...updated });
});

// ==========================================
// 5. Media & Assets Manager
// ==========================================
router.get('/admin/media', (_req: Request, res: Response) => {
  const media = DB.getMediaAssets();
  res.status(200).json({ success: true, data: media });
});

router.post('/admin/media', (req: Request, res: Response) => {
  const item = req.body;
  const newAsset = DB.addMediaAsset({
    id: item.id || `media-${Date.now()}`,
    key: item.key || `asset-${Date.now()}`,
    name: item.name || 'Untitled Media Asset',
    category: item.category || 'banner',
    url: item.url || '',
    description: item.description || '',
    updatedAt: new Date().toISOString().split('T')[0],
    ...item,
  });
  res.status(201).json({ success: true, data: newAsset });
});

router.put('/admin/media', (req: Request, res: Response) => {
  const item = req.body;
  const id = item.id || item.key;
  const updated = DB.updateMediaAsset(id, item);
  if (!updated) {
    return res.status(404).json({ success: false, error: 'Media asset not found' });
  }
  res.status(200).json({ success: true, data: updated });
});

router.delete('/admin/media', (req: Request, res: Response) => {
  const id = String(req.query.id || '');
  const deleted = DB.deleteMediaAsset(id);
  res.status(200).json({ success: deleted, message: deleted ? 'Media asset removed' : 'Media asset not found' });
});

// ==========================================
// ==========================================
// 6. Programs Routes
// ==========================================
router.get('/programs', (req: Request, res: Response) => {
  const { category, level, mode, search } = req.query;
  let programs = DB.getPrograms();

  if (category && category !== 'all' && category !== 'All' && category !== 'All Categories') {
    const catStr = String(category).toLowerCase().trim();
    programs = programs.filter((p) => {
      const pCat = (p.category || '').toLowerCase();
      if (pCat === catStr) return true;
      if (catStr === 'finance' || catStr === 'islamic finance') {
        return pCat.includes('finance') || pCat.includes('fintech') || pCat.includes('banking');
      }
      if (catStr === 'languages' || catStr === 'arabic' || catStr === 'arabic & languages') {
        return pCat.includes('language') || pCat.includes('arabic');
      }
      if (catStr === 'research') {
        return pCat.includes('research');
      }
      if (catStr === 'fintech' || catStr === 'shariah fintech') {
        return pCat.includes('fintech') || pCat.includes('tech');
      }
      return pCat.includes(catStr) || catStr.includes(pCat);
    });
  }

  if (level && level !== 'all' && level !== 'All' && level !== 'All Levels') {
    const lvlStr = String(level).toLowerCase().trim();
    programs = programs.filter((p) => (p.level || '').toLowerCase() === lvlStr);
  }

  if (mode && mode !== 'all' && mode !== 'All' && mode !== 'All Modes') {
    const modeStr = String(mode).toLowerCase().trim();
    programs = programs.filter((p) => {
      if (Array.isArray((p as any).mode)) {
        return (p as any).mode.some((m: string) => m.toLowerCase() === modeStr);
      }
      return ((p as any).mode || '').toLowerCase() === modeStr;
    });
  }

  if (search) {
    const q = String(search).toLowerCase().trim();
    programs = programs.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.level.toLowerCase().includes(q) ||
        (p.language && p.language.toLowerCase().includes(q))
    );
  }

  res.status(200).json({ success: true, count: programs.length, data: programs });
});

router.get('/programs/:id', (req: Request, res: Response) => {
  const id = String(req.params.id);
  const prog = DB.getProgramById(id);
  if (!prog) return res.status(404).json({ success: false, error: 'Program not found' });
  res.status(200).json({ success: true, data: prog });
});

router.post('/programs', (req: Request, res: Response) => {
  const data = req.body;
  const newProgram = DB.addProgram({
    id: data.id || `prog-${Date.now()}`,
    title: data.title || 'New Program Curriculum',
    category: data.category || 'Islamic Finance',
    level: data.level || 'Diploma',
    hours: data.hours || '60 Hours',
    duration: data.duration || '1 Year',
    mode: data.mode || 'Blended',
    language: data.language || 'English & Arabic',
    students: Number(data.students) || 25,
    description: data.description || '',
    outcomes: data.outcomes || data.learningOutcomes || [],
    syllabus: data.syllabus || data.modules || [],
    status: data.status || 'Active',
    ...data,
  });
  res.status(201).json({ success: true, data: newProgram });
});

router.put('/programs/:id', (req: Request, res: Response) => {
  const id = String(req.params.id);
  const updated = DB.updateProgram(id, req.body);
  if (!updated) return res.status(404).json({ success: false, error: 'Program not found' });
  res.status(200).json({ success: true, data: updated });
});

router.delete('/programs/:id', (req: Request, res: Response) => {
  const id = String(req.params.id);
  const deleted = DB.deleteProgram(id);
  res.status(200).json({ success: deleted });
});

router.get('/admin/programs', (req: Request, res: Response) => {
  const programs = DB.getPrograms();
  res.status(200).json({ success: true, data: programs });
});

router.post('/admin/programs', (req: Request, res: Response) => {
  const data = req.body;
  const newProgram = DB.addProgram({
    id: data.id || `prog-${Date.now()}`,
    title: data.title || 'New Program Curriculum',
    category: data.category || 'Islamic Finance',
    level: data.level || 'Diploma',
    hours: data.hours || '60 Hours',
    duration: data.duration || '1 Year',
    mode: data.mode || 'Blended',
    language: data.language || 'English & Arabic',
    students: Number(data.students) || 25,
    description: data.description || '',
    outcomes: data.outcomes || data.learningOutcomes || [],
    syllabus: data.syllabus || data.modules || [],
    status: data.status || 'Active',
    ...data,
  });
  res.status(201).json({ success: true, data: newProgram });
});

router.put('/admin/programs', (req: Request, res: Response) => {
  const { id, ...updates } = req.body;
  const updated = DB.updateProgram(id, updates);
  if (!updated) return res.status(404).json({ success: false, error: 'Program not found' });
  res.status(200).json({ success: true, data: updated });
});

router.delete('/admin/programs', (req: Request, res: Response) => {
  const id = String(req.query.id || '');
  const deleted = DB.deleteProgram(id);
  res.status(200).json({ success: deleted });
});

// ==========================================
// 7. Experts Network Routes
// ==========================================
router.get('/experts', (req: Request, res: Response) => {
  const { field, country, search } = req.query;
  let experts = DB.getExperts();

  if (field && field !== 'All Fields') {
    experts = experts.filter((e) => e.fields?.some((f) => f.toLowerCase() === String(field).toLowerCase()));
  }
  if (country && country !== 'All Countries') {
    experts = experts.filter((e) => e.country?.toLowerCase() === String(country).toLowerCase());
  }
  if (search) {
    const q = String(search).toLowerCase();
    experts = experts.filter(
      (e) =>
        e.name.toLowerCase().includes(q) ||
        e.role?.toLowerCase().includes(q) ||
        e.country?.toLowerCase().includes(q)
    );
  }

  res.status(200).json({ success: true, data: experts });
});

router.post('/experts', (req: Request, res: Response) => {
  const data = req.body;
  const fields = typeof data.fields === 'string' ? data.fields.split(',').map((s: string) => s.trim()) : (data.fields || []);
  const newExpert = DB.addExpert({
    id: data.id || `exp-${Date.now()}`,
    name: data.name || 'Scholar Profile',
    role: data.role || 'Senior Shariah Fellow',
    affiliation: data.affiliation || 'GIFLRI Research Council',
    country: data.country || 'Global',
    fields: fields.length > 0 ? fields : ['Islamic Finance'],
    publications: data.publications || 0,
    giflriRole: data.giflriRole || 'Council Fellow',
    biography: data.biography || '',
    ...data,
  });
  res.status(201).json({ success: true, data: newExpert });
});

router.put('/experts/:id', (req: Request, res: Response) => {
  const id = String(req.params.id);
  const updated = DB.updateExpert(id, req.body);
  if (!updated) return res.status(404).json({ success: false, error: 'Expert not found' });
  res.status(200).json({ success: true, data: updated });
});

router.delete('/experts/:id', (req: Request, res: Response) => {
  const id = String(req.params.id);
  const deleted = DB.deleteExpert(id);
  res.status(200).json({ success: deleted });
});

// ==========================================
// 8. Academic Events & Registrations
// ==========================================
router.get('/events', getEvents);
router.post('/events', createEvent);
router.post('/events/:id/register', registerForEvent);
router.get('/events/:id/registrations', getEventRegistrations);
router.get('/admin/event-registrations', getEventRegistrations);

// ==========================================
// 9. Institutions Routes
// ==========================================
router.get('/institutions', getInstitutions);
router.get('/institutions/:id', getInstitutionById);
router.post('/institutions', createInstitution);
router.put('/institutions/:id', updateInstitution);
router.delete('/institutions/:id', (req: Request, res: Response) => {
  const id = String(req.params.id);
  const deleted = DB.deleteInstitution(id);
  res.status(200).json({ success: deleted });
});

// ==========================================
// 9. Applications Routes
// ==========================================
router.get('/applications', getApplications);
router.get('/applications/:id', getApplicationById);
router.post('/applications', createApplication);
router.put('/applications/:id', updateApplication);
router.put('/applications/:id/status', updateApplication);
router.patch('/applications/:id', updateApplication);
router.patch('/applications/:id/status', updateApplication);
router.delete('/applications/:id', (req: Request, res: Response) => {
  const id = String(req.params.id);
  const deleted = DB.deleteApplication(id);
  res.status(200).json({ success: deleted });
});

// ==========================================
// 10. Certificates & Verification Routes
// ==========================================
router.get('/certificates', getCertificates);
router.get('/certificates/verify/:certId', verifyCertificate);
router.get('/verify/:certId', verifyCertificate);
router.post('/certificates', createCertificate);
router.put('/certificates/:id', (req: Request, res: Response) => {
  const id = String(req.params.id);
  const updated = DB.updateCertificate(id, req.body);
  if (!updated) return res.status(404).json({ success: false, error: 'Certificate not found' });
  res.status(200).json({ success: true, data: updated });
});
router.patch('/certificates/:id', (req: Request, res: Response) => {
  const id = String(req.params.id);
  const updated = DB.updateCertificate(id, req.body);
  if (!updated) return res.status(404).json({ success: false, error: 'Certificate not found' });
  res.status(200).json({ success: true, data: updated });
});
router.patch('/certificates/:id/revoke', (req: Request, res: Response) => {
  const id = String(req.params.id);
  const updated = DB.updateCertificate(id, { status: 'Revoked', validity: 'Revoked' });
  if (!updated) return res.status(404).json({ success: false, error: 'Certificate not found' });
  res.status(200).json({ success: true, data: updated });
});
router.post('/certificates/:id/revoke', (req: Request, res: Response) => {
  const id = String(req.params.id);
  const updated = DB.updateCertificate(id, { status: 'Revoked', validity: 'Revoked' });
  if (!updated) return res.status(404).json({ success: false, error: 'Certificate not found' });
  res.status(200).json({ success: true, data: updated });
});
router.delete('/certificates/:id', (req: Request, res: Response) => {
  const id = String(req.params.id);
  const deleted = DB.deleteCertificate(id);
  res.status(200).json({ success: deleted });
});

// ==========================================
// 11. Research Papers Routes
// ==========================================
router.get('/research', getResearchPapers);
router.post('/research', createResearchPaper);
router.put('/research/:id', (req: Request, res: Response) => {
  const id = String(req.params.id);
  const updated = DB.updateResearchPaper(id, req.body);
  if (!updated) return res.status(404).json({ success: false, error: 'Research paper not found' });
  res.status(200).json({ success: true, data: updated });
});
router.delete('/research/:id', (req: Request, res: Response) => {
  const id = String(req.params.id);
  const deleted = DB.deleteResearchPaper(id);
  res.status(200).json({ success: deleted });
});

// ==========================================
// 12. Events Routes
// ==========================================
router.get('/events', getEvents);
router.post('/events', createEvent);
router.post('/events/:id/register', registerForEvent);
router.put('/events/:id', (req: Request, res: Response) => {
  const id = String(req.params.id);
  const updated = DB.updateEvent(id, req.body);
  if (!updated) return res.status(404).json({ success: false, error: 'Event not found' });
  res.status(200).json({ success: true, data: updated });
});
router.delete('/events/:id', (req: Request, res: Response) => {
  const id = String(req.params.id);
  const deleted = DB.deleteEvent(id);
  res.status(200).json({ success: deleted });
});

// ==========================================
// 13. Pillars Routes
// ==========================================
router.get('/pillars', getPillars);
router.get('/admin/pillars', getPillars);
router.put('/admin/pillars', updatePillars);
router.post('/admin/pillars', updatePillars);

// ==========================================
// 14. Overview / Stats Routes
// ==========================================
router.get('/admin/stats', (_req: Request, res: Response) => {
  const state = DB.getState();
  const stats = {
    totalInstitutions: state.institutions.length,
    activeApplications: state.applications.filter((a) => a.status !== 'Approved' && a.status !== 'Rejected').length,
    verifiedCertificates: state.certificates.filter((c) => c.status === 'Verified').length,
    researchPapers: state.researchPapers.length,
    upcomingEvents: state.events.filter((e) => e.status === 'Upcoming').length,
    recentActivity: state.activityLogs.slice(0, 10),
  };
  res.status(200).json({ success: true, data: stats, ...stats });
});

// ==========================================
// 15. Complaints / Grievance Tickets Routes
// ==========================================
router.get('/complaints', (_req: Request, res: Response) => {
  const complaints = DB.getComplaints();
  res.status(200).json({ success: true, data: complaints });
});

router.post('/complaints', (req: Request, res: Response) => {
  const data = req.body;
  const newComplaint = DB.addComplaint({
    id: data.id || `ticket-${Date.now()}`,
    type: data.type || 'General Inquiry',
    complainantName: data.name || data.complainantName || 'Anonymous',
    complainantEmail: data.email || data.complainantEmail || '',
    institutionName: data.institution || data.institutionName || 'N/A',
    subject: data.subject || 'Inquiry',
    description: data.description || '',
    priority: data.priority || 'Medium',
    status: data.status || 'Received',
    submittedDate: new Date().toISOString().split('T')[0],
    ...data,
  });
  res.status(201).json({ success: true, data: newComplaint });
});

router.put('/complaints/:id', (req: Request, res: Response) => {
  const id = String(req.params.id);
  const updated = DB.updateComplaint(id, req.body);
  if (!updated) return res.status(404).json({ success: false, error: 'Complaint ticket not found' });
  res.status(200).json({ success: true, data: updated });
});

router.delete('/complaints/:id', (req: Request, res: Response) => {
  const id = String(req.params.id);
  const deleted = DB.deleteComplaint(id);
  res.status(200).json({ success: deleted });
});

// ==========================================
// 16. Observatory Data Routes
// ==========================================
router.get('/admin/observatory', (_req: Request, res: Response) => {
  const obs = DB.getObservatoryData();
  res.status(200).json({ success: true, data: obs });
});

router.post('/admin/observatory', (req: Request, res: Response) => {
  const updated = DB.updateObservatoryData(req.body);
  res.status(200).json({ success: true, data: updated });
});

router.put('/admin/observatory', (req: Request, res: Response) => {
  const updated = DB.updateObservatoryData(req.body);
  res.status(200).json({ success: true, data: updated });
});

// ==========================================
// 17. E-Services Routes
// ==========================================
router.get('/admin/eservices', (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    data: {
      studentRequests: DB.getStudentRequests() || [],
      facultyRegistrations: DB.getFacultyRegistrations() || [],
      payments: DB.getPayments() || [],
    },
  });
});

router.post('/admin/eservices', (req: Request, res: Response) => {
  const { type, ...data } = req.body;
  if (type === 'student') {
    const newReq = DB.addStudentRequest({
      id: data.id || `srv-${Date.now()}`,
      studentName: data.studentName || 'Student Name',
      studentEmail: data.studentEmail || '',
      serviceType: data.serviceType || 'Transcript Request',
      program: data.program || 'Diploma in Islamic Finance',
      status: data.status || 'Pending',
      submittedAt: data.submittedAt || new Date().toISOString().split('T')[0],
      ...data,
    });
    return res.status(201).json({ success: true, data: newReq });
  } else if (type === 'faculty') {
    const newFac = DB.addFacultyRegistration({
      id: data.id || `fac-${Date.now()}`,
      name: data.name || 'Faculty Member',
      email: data.email || '',
      institution: data.institution || 'Affiliated Institution',
      department: data.department || 'Islamic Economics',
      specialization: data.specialization || 'Islamic Finance',
      status: data.status || 'Pending Review',
      registeredAt: data.registeredAt || new Date().toISOString().split('T')[0],
      ...data,
    });
    return res.status(201).json({ success: true, data: newFac });
  }
  return res.status(400).json({ success: false, error: 'Invalid service type' });
});

router.put('/admin/eservices', (req: Request, res: Response) => {
  const { type, id, status, ...rest } = req.body;
  if (type === 'student') {
    const updated = DB.updateStudentRequest(id, { status, ...rest });
    return res.status(200).json({ success: true, data: updated });
  } else if (type === 'faculty') {
    const updated = DB.updateFacultyRegistration(id, { status, ...rest });
    return res.status(200).json({ success: true, data: updated });
  }
  return res.status(400).json({ success: false, error: 'Invalid service type' });
});

router.delete('/admin/eservices', (req: Request, res: Response) => {
  const type = String(req.query.type || '');
  const id = String(req.query.id || '');
  if (type === 'student') {
    const deleted = DB.deleteStudentRequest(id);
    return res.status(200).json({ success: deleted });
  } else if (type === 'faculty') {
    const deleted = DB.deleteFacultyRegistration(id);
    return res.status(200).json({ success: deleted });
  }
  return res.status(400).json({ success: false, error: 'Invalid service type' });
});

// ==========================================
// 18. Payments & Billing Routes
// ==========================================
router.get('/admin/payments', (_req: Request, res: Response) => {
  const payments = DB.getPayments();
  res.status(200).json({ success: true, data: payments });
});

router.post('/admin/payments', (req: Request, res: Response) => {
  const data = req.body;
  const newPayment = DB.addPayment({
    id: data.id || `inv-${Date.now()}`,
    payerName: data.payerName || 'Institutional Member',
    payerEmail: data.payerEmail || '',
    institution: data.institution || 'Affiliated University',
    amount: data.amount || 2500,
    currency: data.currency || 'USD',
    purpose: data.purpose || 'Affiliation Application Fee',
    status: data.status || 'Paid',
    invoiceNumber: data.invoiceNumber || `INV-GIFLRI-${Date.now().toString().slice(-6)}`,
    date: data.date || new Date().toISOString().split('T')[0],
    ...data,
  });
  res.status(201).json({ success: true, data: newPayment });
});

router.put('/admin/payments/:id', (req: Request, res: Response) => {
  const id = String(req.params.id);
  const updated = DB.updatePayment(id, req.body);
  if (!updated) return res.status(404).json({ success: false, error: 'Payment record not found' });
  res.status(200).json({ success: true, data: updated });
});

router.put('/admin/payments', (req: Request, res: Response) => {
  const { id, ...updates } = req.body;
  const updated = DB.updatePayment(id, updates);
  if (!updated) return res.status(404).json({ success: false, error: 'Payment record not found' });
  res.status(200).json({ success: true, data: updated });
});

router.delete('/admin/payments/:id', (req: Request, res: Response) => {
  const id = String(req.params.id);
  const deleted = DB.deletePayment(id);
  res.status(200).json({ success: deleted });
});

router.delete('/admin/payments', (req: Request, res: Response) => {
  const id = String(req.query.id || '');
  const deleted = DB.deletePayment(id);
  res.status(200).json({ success: deleted });
});

// ==========================================
// 19. User Management Routes
// ==========================================
router.get('/admin/users', (_req: Request, res: Response) => {
  const users = DB.getUsers().map((u) => {
    const { password, ...safeUser } = u as any;
    return safeUser;
  });
  res.status(200).json({ success: true, data: users });
});

router.post('/admin/users', (req: Request, res: Response) => {
  const data = req.body;
  const newUser = DB.addUser({
    id: data.id || `user-${Date.now()}`,
    name: data.name || 'Portal User',
    email: data.email || `user${Date.now()}@giflri.org`,
    role: data.role || 'institution',
    password: data.password || 'password123',
    title: data.title || 'Institutional Director',
    status: data.status || 'Active',
    joinedDate: new Date().toISOString().split('T')[0],
    ...data,
  });
  const { password, ...safeUser } = newUser as any;
  res.status(201).json({ success: true, data: safeUser });
});

router.put(['/admin/users', '/admin/users/:id'], (req: Request, res: Response) => {
  const id = req.params.id || req.body.id;
  if (!id) {
    return res.status(400).json({ success: false, error: 'User ID is required' });
  }
  const updates = { ...req.body };
  delete updates.id;

  // If password is blank, do not overwrite existing password
  if (updates.password === '' || updates.password === undefined) {
    delete updates.password;
  } else {
    updates.password = String(updates.password).trim();
  }

  if (updates.email) {
    updates.email = String(updates.email).trim().toLowerCase();
  }

  const updated = DB.updateUser(id, updates);
  if (!updated) return res.status(404).json({ success: false, error: 'User not found' });
  const { password, ...safeUser } = updated as any;
  res.status(200).json({ success: true, data: safeUser });
});

router.delete(['/admin/users', '/admin/users/:id'], (req: Request, res: Response) => {
  const id = String(req.params.id || req.query.id || req.body?.id || '');
  if (!id) {
    return res.status(400).json({ success: false, error: 'User ID is required' });
  }
  const deleted = DB.deleteUser(id);
  res.status(200).json({ success: deleted, message: deleted ? 'User deleted' : 'User not found' });
});

// ==========================================
// 20. Audit Logs
// ==========================================
router.get(['/logs', '/admin/logs'], (_req: Request, res: Response) => {
  const logs = DB.getLogs();
  res.status(200).json({ success: true, data: logs });
});

// ==========================================
// 21. Intelligent AI Islamic Knowledge Assistant
// ==========================================
router.post('/chat', handleAIChat);

export default router;
