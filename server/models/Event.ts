import mongoose, { Schema, Document } from 'mongoose';

export interface IEvent extends Document {
  id: string | number;
  title: string;
  date: string;
  endDate?: string;
  city: string;
  country: string;
  theme: string;
  speakers: number;
  attendeesCount?: number;
  status: string;
  type: string;
  image?: string;
  desc: string;
  agenda?: Array<Record<string, any>>;
  speakersList?: Array<Record<string, any>>;
  registrationUrl?: string;
}

const EventSchema = new Schema<IEvent>(
  {
    id: { type: Schema.Types.Mixed, required: true, unique: true },
    title: { type: String, required: true },
    date: { type: String, required: true },
    endDate: { type: String },
    city: { type: String, required: true },
    country: { type: String, required: true },
    theme: { type: String, default: '' },
    speakers: { type: Number, default: 0 },
    attendeesCount: { type: Number, default: 0 },
    status: { type: String, default: 'Upcoming' },
    type: { type: String, default: 'Conference' },
    image: { type: String },
    desc: { type: String, default: '' },
    agenda: { type: [Schema.Types.Mixed], default: [] },
    speakersList: { type: [Schema.Types.Mixed], default: [] },
    registrationUrl: { type: String },
  },
  {
    timestamps: true,
    strict: false,
  }
);

export const Event =
  mongoose.models.Event || mongoose.model<IEvent>('Event', EventSchema);

export default Event;
