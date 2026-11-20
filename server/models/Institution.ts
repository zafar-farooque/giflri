import mongoose, { Schema, Document } from 'mongoose';

export interface IInstitution extends Document {
  id: string;
  name: string;
  type: string;
  country: string;
  city: string;
  established: number;
  status: string;
  affiliationType: string;
  affiliationDate: string;
  giflriId: string;
  programsCount?: number;
  students: number;
  approvedPrograms: string[];
  qualityStatus: string;
  quality?: Record<string, any>;
  contact?: Record<string, any>;
  website?: string;
  qrCode?: string;
}

const InstitutionSchema = new Schema<IInstitution>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    type: { type: String, default: 'University' },
    country: { type: String, required: true },
    city: { type: String, default: '' },
    established: { type: Number, default: 2000 },
    status: { type: String, default: 'Active' },
    affiliationType: { type: String, default: 'Institutional Full Accreditation' },
    affiliationDate: { type: String, default: '2026-01-01' },
    giflriId: { type: String, default: '' },
    programsCount: { type: Number, default: 0 },
    students: { type: Number, default: 0 },
    approvedPrograms: { type: [String], default: [] },
    qualityStatus: { type: String, default: 'A+ Compliant' },
    quality: { type: Schema.Types.Mixed, default: {} },
    contact: { type: Schema.Types.Mixed, default: {} },
    website: { type: String, default: '' },
    qrCode: { type: String, default: '' },
  },
  {
    timestamps: true,
    strict: false,
  }
);

export const Institution =
  mongoose.models.Institution ||
  mongoose.model<IInstitution>('Institution', InstitutionSchema);

export default Institution;
