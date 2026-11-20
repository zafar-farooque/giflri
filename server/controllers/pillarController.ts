import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Pillar from '../models/Pillar';
import { DB } from '../db/db';

export async function getPillars(req: Request, res: Response) {
  try {
    if (mongoose.connection.readyState === 1) {
      const list = await Pillar.find().sort({ order: 1 }).lean();
      if (list.length > 0) return res.status(200).json({ success: true, data: list });
    }
    const pillars = DB.getPillars();
    return res.status(200).json({ success: true, data: pillars });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Failed to fetch pillars' });
  }
}

export async function updatePillars(req: Request, res: Response) {
  try {
    const pillars = req.body;
    if (!Array.isArray(pillars)) {
      return res.status(400).json({ success: false, error: 'Pillars array required' });
    }
    const state = DB.getState();
    state.pillars = pillars;
    DB.persist();

    if (mongoose.connection.readyState === 1) {
      await Pillar.deleteMany({});
      await Pillar.insertMany(pillars);
    }
    return res.status(200).json({ success: true, data: pillars, pillars });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Failed to update pillars' });
  }
}
