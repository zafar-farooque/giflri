import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Application from '../models/Application';
import { DB } from '../db/db';

export async function getApplications(req: Request, res: Response) {
  try {
    const { status, country } = req.query;
    if (mongoose.connection.readyState === 1) {
      const filter: any = {};
      if (status) filter.status = status;
      if (country) filter.country = country;
      const list = await Application.find(filter).lean();
      if (list.length > 0) return res.status(200).json({ success: true, data: list });
    }

    let applications = DB.getApplications();
    if (status) applications = applications.filter((a) => a.status.toLowerCase() === String(status).toLowerCase());
    if (country) applications = applications.filter((a) => a.country.toLowerCase() === String(country).toLowerCase());
    return res.status(200).json({ success: true, data: applications });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Failed to fetch applications' });
  }
}

export async function getApplicationById(req: Request, res: Response) {
  try {
    const id = String(req.params.id);
    if (mongoose.connection.readyState === 1) {
      const app = await Application.findOne({ id }).lean();
      if (app) return res.status(200).json({ success: true, data: app });
    }
    const app = DB.getApplicationById(id);
    if (!app) return res.status(404).json({ success: false, error: 'Application not found' });
    return res.status(200).json({ success: true, data: app });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Failed to fetch application' });
  }
}

export async function createApplication(req: Request, res: Response) {
  try {
    const data = req.body;
    const newApp = DB.addApplication({
      id: data.id || `app-${Date.now()}`,
      institutionName: data.institutionName || 'New Institution',
      country: data.country || 'International',
      contactEmail: data.contactEmail || '',
      contactPerson: data.contactPerson || '',
      status: data.status || 'Submitted',
      currentStageIndex: data.currentStageIndex || 0,
      currentStage: data.currentStage || 'Initial Application Submission',
      progress: data.progress || 20,
      health: data.health || 100,
      submittedDate: data.submittedDate || new Date().toISOString().split('T')[0],
      assignedReviewer: data.assignedReviewer || 'Unassigned',
      programRequested: data.programRequested || 'Institutional Accreditation',
      deliveryMode: data.deliveryMode || 'Blended',
      learningHours: data.learningHours || '120 Credit Hours',
      documents: data.documents || [],
      stages: data.stages || [],
      messages: data.messages || [],
      ...data,
    });
    if (mongoose.connection.readyState === 1) {
      await Application.create(newApp);
    }
    return res.status(201).json({ success: true, data: newApp });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Failed to create application' });
  }
}

export async function updateApplication(req: Request, res: Response) {
  try {
    const id = String(req.params.id);
    const data = req.body;
    const updated = DB.updateApplication(id, data);
    if (!updated) return res.status(404).json({ success: false, error: 'Application not found' });

    if (mongoose.connection.readyState === 1) {
      await Application.findOneAndUpdate({ id }, { $set: data }, { new: true });
    }
    return res.status(200).json({ success: true, data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Failed to update application' });
  }
}
