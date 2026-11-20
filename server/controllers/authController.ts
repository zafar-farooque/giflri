import { Request, Response } from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { DB } from '../db/db';

const JWT_SECRET = process.env.JWT_SECRET || 'giflri_jwt_secret_key_2026';

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    
    if (!email || !String(email).trim()) {
      return res.status(400).json({ success: false, error: 'Email address is required.' });
    }
    if (!password || !String(password).trim()) {
      return res.status(400).json({ success: false, error: 'Password is required.' });
    }

    const cleanEmail = String(email).toLowerCase().trim();
    const cleanPass = String(password).trim();

    let user: any = null;

    // Search in MongoDB if connected
    if (mongoose.connection.readyState === 1) {
      user = await User.findOne({ email: { $regex: new RegExp(`^${cleanEmail}$`, 'i') } }).lean();
    }

    // Search in In-Memory / JSON DB
    if (!user) {
      const users = DB.getUsers();
      user = users.find((u) => u.email.toLowerCase() === cleanEmail);
    }

    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid credentials. User account not found.' });
    }

    // Strict Password verification against stored database password
    if (user.password !== cleanPass) {
      return res.status(401).json({ success: false, error: 'Incorrect password entered.' });
    }

    // Update last login
    user.lastLogin = 'Just now';
    DB.addLog({
      id: 'log-' + Date.now(),
      action: `User signed in: ${user.name} (${user.role.toUpperCase()})`,
      user: user.name,
      entity: 'Auth',
      entityId: user.id,
      type: 'security',
      timestamp: 'Just now',
    });
    DB.persist();

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role, name: user.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    const safeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      title: user.title || 'Institutional Scholar',
      avatar: user.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      department: user.department || 'Academic Affairs',
      institutionId: user.institutionId,
      institutionName: user.institutionName,
      studentId: user.studentId,
      program: user.program,
      permissions: user.permissions || ['all'],
      status: user.status || 'Active',
      lastLogin: 'Just now',
    };

    return res.status(200).json({
      success: true,
      token,
      data: safeUser,
      user: safeUser,
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ success: false, error: 'Internal server error during login' });
  }
}

export async function logout(_req: Request, res: Response) {
  try {
    return res.status(200).json({
      success: true,
      message: 'Successfully logged out of GIFLRI Portal session',
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Logout failed' });
  }
}

export async function getCurrentUser(req: Request, res: Response) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, error: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET) as any;

    let user: any = null;
    if (mongoose.connection.readyState === 1) {
      user = await User.findOne({ id: decoded.id }).lean();
    }
    if (!user) {
      user = DB.getUserById(decoded.id);
    }

    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    const { password, ...safeUser } = user;
    return res.status(200).json({ success: true, data: safeUser, user: safeUser });
  } catch (error) {
    return res.status(401).json({ success: false, error: 'Invalid or expired token' });
  }
}

export async function updatePassword(req: Request, res: Response) {
  try {
    const { email, currentPassword, newPassword } = req.body;
    if (!email || !newPassword) {
      return res.status(400).json({ success: false, error: 'Email and new password are required' });
    }

    const cleanEmail = String(email).toLowerCase().trim();
    let user: any = null;

    if (mongoose.connection.readyState === 1) {
      user = await User.findOne({ email: cleanEmail });
      if (user) {
        if (currentPassword && user.password && user.password !== currentPassword) {
          return res.status(400).json({ success: false, error: 'Current password does not match' });
        }
        user.password = String(newPassword).trim();
        await user.save();
      }
    }

    const memUser = DB.getUserByEmail(cleanEmail);
    if (!memUser && !user) {
      return res.status(404).json({ success: false, error: 'User account not found' });
    }

    if (memUser) {
      if (currentPassword && memUser.password && memUser.password !== currentPassword) {
        return res.status(400).json({ success: false, error: 'Current password does not match' });
      }
      DB.updateUser(memUser.id, { password: String(newPassword).trim() });
    }

    DB.addLog({
      id: 'log-' + Date.now(),
      action: `Password updated for user: ${cleanEmail}`,
      user: cleanEmail,
      entity: 'Auth',
      type: 'security',
      timestamp: 'Just now',
    });

    return res.status(200).json({ success: true, message: 'Password updated successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Failed to update password' });
  }
}


