import mongoose, { Schema, Document } from 'mongoose';

export interface IComplaint extends Document {
  id: string;
  ticketId: string;
  name: string;
  email: string;
  institution?: string;
  category: string;
  subject: string;
  description: string;
  status: string;
  priority: string;
  createdAt?: string;
}

const ComplaintSchema = new Schema<IComplaint>(
  {
    id: { type: String, required: true, unique: true },
    ticketId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    institution: { type: String, default: '' },
    category: { type: String, default: 'General Inquiry' },
    subject: { type: String, default: '' },
    description: { type: String, default: '' },
    status: { type: String, default: 'Open' },
    priority: { type: String, default: 'Medium' },
  },
  {
    timestamps: true,
  }
);

export const Complaint =
  mongoose.models.Complaint ||
  mongoose.model<IComplaint>('Complaint', ComplaintSchema);

export default Complaint;
