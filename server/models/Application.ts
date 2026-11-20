import mongoose, { Schema, Document } from 'mongoose';

export interface IApplication extends Document {
  id: string;
  institutionName: string;
  country: string;
  city?: string;
  contactEmail: string;
  email?: string;
  contactPerson: string;
  status: string;
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
  documents: any[];
  stages: any[];
  messages: any[];
  reviewerNotes?: string;
}

const ApplicationSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    institutionName: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, default: '' },
    contactEmail: { type: String, default: '' },
    email: { type: String, default: '' },
    contactPerson: { type: String, default: '' },
    status: { type: String, default: 'Submitted' },
    currentStageIndex: { type: Number, default: 0 },
    currentStage: { type: String, default: 'Initial Application Submission' },
    progress: { type: Number, default: 20 },
    health: { type: Number, default: 100 },
    submittedDate: { type: String, default: new Date().toISOString().split('T')[0] },
    inspectionDate: { type: String },
    assignedReviewer: { type: String, default: 'Unassigned' },
    programRequested: { type: String, default: 'Institutional Accreditation' },
    appliedPrograms: { type: [String], default: [] },
    deliveryMode: { type: String, default: 'Blended' },
    learningHours: { type: String, default: '120 Credit Hours' },
    documents: { type: Schema.Types.Mixed, default: [] },
    stages: { type: Schema.Types.Mixed, default: [] },
    messages: { type: Schema.Types.Mixed, default: [] },
    reviewerNotes: { type: String, default: '' },
  },
  {
    timestamps: true,
    strict: false,
  }
);

export const Application =
  mongoose.models.Application ||
  mongoose.model<IApplication>('Application', ApplicationSchema);

export default Application;
