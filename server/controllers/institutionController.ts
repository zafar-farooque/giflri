import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Institution from '../models/Institution';
import { DB } from '../db/db';

export async function getInstitutions(req: Request, res: Response) {
  try {
    const { country, type, status, q } = req.query;

    if (mongoose.connection.readyState === 1) {
      const filter: any = {};
      if (country) filter.country = country;
      if (type) filter.type = type;
      if (status) filter.status = status;
      if (q) {
        filter.$or = [
          { name: { $regex: String(q), $options: 'i' } },
          { country: { $regex: String(q), $options: 'i' } },
          { city: { $regex: String(q), $options: 'i' } },
        ];
      }
      const list = await Institution.find(filter).lean();
      if (list.length > 0) return res.status(200).json({ success: true, data: list });
    }

    let institutions = DB.getInstitutions();
    if (country) institutions = institutions.filter((i) => i.country.toLowerCase() === String(country).toLowerCase());
    if (type) institutions = institutions.filter((i) => i.type.toLowerCase() === String(type).toLowerCase());
    if (status) institutions = institutions.filter((i) => i.status.toLowerCase() === String(status).toLowerCase());
    if (q) {
      const query = String(q).toLowerCase();
      institutions = institutions.filter(
        (i) =>
          i.name.toLowerCase().includes(query) ||
          i.country.toLowerCase().includes(query) ||
          (i.city && i.city.toLowerCase().includes(query))
      );
    }

    return res.status(200).json({ success: true, data: institutions });
  } catch (error) {
    console.error('Error fetching institutions:', error);
    return res.status(500).json({ success: false, error: 'Failed to fetch institutions' });
  }
}

export async function getInstitutionById(req: Request, res: Response) {
  try {
    const id = String(req.params.id);
    if (mongoose.connection.readyState === 1) {
      const inst = await Institution.findOne({ id }).lean();
      if (inst) return res.status(200).json({ success: true, data: inst, ...inst });
    }
    const inst = DB.getInstitutionById(id);
    if (!inst) return res.status(404).json({ success: false, error: 'Institution not found' });
    return res.status(200).json({ success: true, data: inst, ...inst });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Failed to fetch institution' });
  }
}

export async function createInstitution(req: Request, res: Response) {
  try {
    const data = req.body;
    if (!data.name || !data.country) {
      return res.status(400).json({ success: false, error: 'Name and country are required' });
    }
    const newInst = DB.addInstitution({
      id: data.id || `inst-${Date.now()}`,
      name: data.name,
      type: data.type || 'University',
      country: data.country,
      city: data.city || '',
      established: data.established || 2000,
      status: data.status || 'Active',
      affiliationType: data.affiliationType || 'Institutional Full Accreditation',
      affiliationDate: data.affiliationDate || new Date().toISOString().split('T')[0],
      giflriId: data.giflriId || `GIFLRI-${Math.floor(1000 + Math.random() * 9000)}`,
      programsCount: data.programsCount || 0,
      students: data.students || 0,
      approvedPrograms: data.approvedPrograms || [],
      qualityStatus: data.qualityStatus || 'A+ Compliant',
      ...data,
    });
    if (mongoose.connection.readyState === 1) {
      await Institution.create(newInst);
    }
    return res.status(201).json({ success: true, data: newInst });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Failed to create institution' });
  }
}

export async function updateInstitution(req: Request, res: Response) {
  try {
    const id = String(req.params.id);
    const data = req.body;
    const updated = DB.updateInstitution(id, data);
    if (!updated) return res.status(404).json({ success: false, error: 'Institution not found' });

    if (mongoose.connection.readyState === 1) {
      await Institution.findOneAndUpdate({ id }, { $set: data }, { new: true });
    }
    return res.status(200).json({ success: true, data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Failed to update institution' });
  }
}
