import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'reviewer' | 'staff' | 'student';
  avatar?: string;
  department?: string;
  institution?: string;
  password?: string;
  createdAt?: Date;
}

const UserSchema = new Schema<IUser>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: {
      type: String,
      enum: ['admin', 'reviewer', 'staff', 'student'],
      default: 'student',
    },
    avatar: { type: String },
    department: { type: String },
    institution: { type: String },
    password: { type: String },
  },
  {
    timestamps: true,
  }
);

export const User =
  mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
