import { Request, Response } from 'express';
import mongoose from 'mongoose';
import ResearchPaper from '../models/Research';
import { DB } from '../db/db';

export async function getResearchPapers(req: Request, res: Response) {
  try {
    const { category, theme, q } = req.query;
    if (mongoose.connection.readyState === 1) {
      const filter: any = {};
      if (category) filter.category = category;
      if (theme) filter.theme = theme;
      if (q) {
        filter.$or = [
          { title: { $regex: String(q), $options: 'i' } },
          { authors: { $regex: String(q), $options: 'i' } },
          { abstract: { $regex: String(q), $options: 'i' } },
        ];
      }
      const list = await ResearchPaper.find(filter).lean();
      if (list.length > 0) return res.status(200).json({ success: true, data: list });
    }

    let papers = DB.getResearchPapers();
    if (category) papers = papers.filter((p) => p.category?.toLowerCase() === String(category).toLowerCase());
    if (theme) papers = papers.filter((p) => p.theme?.toLowerCase() === String(theme).toLowerCase());
    if (q) {
      const query = String(q).toLowerCase();
      papers = papers.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.authors.toLowerCase().includes(query) ||
          p.abstract.toLowerCase().includes(query)
      );
    }
    return res.status(200).json({ success: true, data: papers });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Failed to fetch research papers' });
  }
}

export async function createResearchPaper(req: Request, res: Response) {
  try {
    const data = req.body;
    const newPaper = DB.addResearchPaper({
      id: data.id || `paper-${Date.now()}`,
      title: data.title || 'Untitled Working Paper',
      authors: data.authors || 'GIFLRI Research Group',
      journal: data.journal || 'Global Islamic Finance Review',
      year: data.year || new Date().getFullYear(),
      theme: data.theme || 'Islamic Finance & FinTech',
      abstract: data.abstract || '',
      doi: data.doi || `10.5555/giflri.${Date.now()}`,
      downloads: data.downloads || 0,
      citations: data.citations || 0,
      category: data.category || 'Islamic Finance',
      ...data,
    });
    if (mongoose.connection.readyState === 1) {
      await ResearchPaper.create(newPaper);
    }
    return res.status(201).json({ success: true, data: newPaper });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Failed to create research paper' });
  }
}
