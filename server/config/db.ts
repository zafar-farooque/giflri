import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/giflri';

export async function connectDB(): Promise<typeof mongoose | null> {
  if (mongoose.connection.readyState >= 1) {
    return mongoose;
  }

  try {
    const conn = await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`[MongoDB] Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.warn(`[MongoDB Warning]: ${(error as Error).message}`);
    console.warn('[Backend] Running in hybrid mode with fallback to local store if MongoDB is offline.');
    return null;
  }
}

export default connectDB;
