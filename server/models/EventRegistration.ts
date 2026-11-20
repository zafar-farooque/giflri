import mongoose, { Schema, Document } from 'mongoose';

export interface IEventRegistration extends Document {
  id: string;
  eventId: string | number;
  eventTitle: string;
  name: string;
  email: string;
  phone: string;
  organization: string;
  role: string;
  country: string;
  attendanceType: 'In-Person' | 'Virtual';
  specialRequests?: string;
  registrationCode: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  createdAt: Date;
}

const EventRegistrationSchema = new Schema<IEventRegistration>(
  {
    id: { type: String, required: true, unique: true },
    eventId: { type: Schema.Types.Mixed, required: true },
    eventTitle: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: '' },
    organization: { type: String, default: '' },
    role: { type: String, default: 'Attendee' },
    country: { type: String, default: '' },
    attendanceType: { type: String, enum: ['In-Person', 'Virtual'], default: 'In-Person' },
    specialRequests: { type: String, default: '' },
    registrationCode: { type: String, required: true },
    status: { type: String, default: 'confirmed' },
  },
  {
    timestamps: true,
  }
);

export const EventRegistration =
  mongoose.models.EventRegistration ||
  mongoose.model<IEventRegistration>('EventRegistration', EventRegistrationSchema);

export default EventRegistration;
