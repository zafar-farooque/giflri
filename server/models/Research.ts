import mongoose, { Schema, Document } from 'mongoose';

export interface IResearchPaper extends Document {
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
}

const ResearchPaperSchema = new Schema<IResearchPaper>(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    authors: { type: String, required: true },
    journal: { type: String, default: 'Global Islamic Finance Review' },
    year: { type: Number, default: 2026 },
    theme: { type: String, default: 'FinTech & Ethical Banking' },
    abstract: { type: String, default: '' },
    doi: { type: String, default: '' },
    downloads: { type: Number, default: 0 },
    citations: { type: Number, default: 0 },
    pdfUrl: { type: String },
    category: { type: String, default: 'Islamic Finance' },
  },
  {
    timestamps: true,
  }
);

export const ResearchPaper =
  mongoose.models.ResearchPaper ||
  mongoose.model<IResearchPaper>('ResearchPaper', ResearchPaperSchema);

export default ResearchPaper;
