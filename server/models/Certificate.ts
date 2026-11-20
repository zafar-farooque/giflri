import mongoose, { Schema, Document } from 'mongoose';

export interface ICertificate extends Document {
  id: string;
  certId: string;
  studentName: string;
  studentEmail?: string;
  program: string;
  institution: string;
  institutionId?: string;
  issueDate: string;
  validity: string;
  grade?: string;
  status: string;
  qrCodeUrl?: string;
  verificationHash?: string;
}

const CertificateSchema = new Schema<ICertificate>(
  {
    id: { type: String, required: true, unique: true },
    certId: { type: String, required: true, unique: true },
    studentName: { type: String, required: true },
    studentEmail: { type: String },
    program: { type: String, required: true },
    institution: { type: String, required: true },
    institutionId: { type: String },
    issueDate: { type: String, required: true },
    validity: { type: String, default: 'Permanent / Verifiable' },
    grade: { type: String, default: 'Distinction (A+)' },
    status: { type: String, default: 'Verified' },
    qrCodeUrl: { type: String },
    verificationHash: { type: String },
  },
  {
    timestamps: true,
  }
);

export const Certificate =
  mongoose.models.Certificate ||
  mongoose.model<ICertificate>('Certificate', CertificateSchema);

export default Certificate;
