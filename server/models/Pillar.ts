import mongoose, { Schema, Document } from 'mongoose';

export interface IPillar extends Document {
  id: string;
  title: string;
  titleAr: string;
  subtitle: string;
  description: string;
  iconName: string;
  color: string;
  accentBg: string;
  stats: string;
  statLabel: string;
  highlights: string[];
  link: string;
  order: number;
}

const PillarSchema = new Schema<IPillar>(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    titleAr: { type: String, default: '' },
    subtitle: { type: String, default: '' },
    description: { type: String, default: '' },
    iconName: { type: String, default: 'Award' },
    color: { type: String, default: '#C9A227' },
    accentBg: { type: String, default: 'rgba(201, 162, 39, 0.1)' },
    stats: { type: String, default: '' },
    statLabel: { type: String, default: '' },
    highlights: { type: [String], default: [] },
    link: { type: String, default: '/quality' },
    order: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export const Pillar =
  mongoose.models.Pillar || mongoose.model<IPillar>('Pillar', PillarSchema);

export default Pillar;
