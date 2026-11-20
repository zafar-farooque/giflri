import { Request, Response } from 'express';
import mongoose from 'mongoose';
import WebsiteContent from '../models/WebsiteContent';
import { DB } from '../db/db';

export async function getContent(req: Request, res: Response) {
  try {
    if (mongoose.connection.readyState === 1) {
      let content = await WebsiteContent.findOne().lean();
      if (!content) {
        // Seed from local file DB if empty in MongoDB
        const localContent = DB.getWebsiteContent();
        const created = await WebsiteContent.create(localContent);
        return res.status(200).json({ success: true, data: created, ...created });
      }
      return res.status(200).json({ success: true, data: content, ...content });
    }
    // Fallback to local DB store
    const content = DB.getWebsiteContent();
    return res.status(200).json({ success: true, data: content, ...content });
  } catch (error) {
    console.error('Error fetching website content:', error);
    const content = DB.getWebsiteContent();
    return res.status(200).json({ success: true, data: content, ...content });
  }
}

export async function updateContent(req: Request, res: Response) {
  try {
    const updates = req.body;
    if (!updates || typeof updates !== 'object') {
      return res.status(400).json({ success: false, error: 'Invalid content payload' });
    }

    // Always update local file as well to ensure parity
    const updatedLocal = DB.updateWebsiteContent(updates);

    if (mongoose.connection.readyState === 1) {
      let contentDoc = await WebsiteContent.findOne();
      if (!contentDoc) {
        contentDoc = await WebsiteContent.create(updatedLocal);
      } else {
        Object.keys(updates).forEach((key) => {
          if (typeof updates[key] === 'object' && !Array.isArray(updates[key])) {
            contentDoc[key] = { ...(contentDoc[key] || {}), ...updates[key] };
          } else {
            contentDoc[key] = updates[key];
          }
        });
        contentDoc.markModified('about');
        contentDoc.markModified('quality');
        contentDoc.markModified('affiliation');
        contentDoc.markModified('relations');
        contentDoc.markModified('observatory');
        contentDoc.markModified('globalPresence');
        contentDoc.markModified('latestUpdates');
        contentDoc.markModified('quickActions');
        contentDoc.markModified('footer');
        await contentDoc.save();
      }
      return res.status(200).json({ success: true, data: contentDoc });
    }

    return res.status(200).json({ success: true, data: updatedLocal });
  } catch (error) {
    console.error('Error updating website content:', error);
    return res.status(500).json({ success: false, error: 'Failed to update website content' });
  }
}

export async function resetContent(req: Request, res: Response) {
  try {
    const initialContent = DB.getWebsiteContent();
    if (mongoose.connection.readyState === 1) {
      await WebsiteContent.deleteMany({});
      await WebsiteContent.create(initialContent);
    }
    return res.status(200).json({ success: true, message: 'Content reset to default values', data: initialContent });
  } catch (error) {
    console.error('Error resetting website content:', error);
    return res.status(500).json({ success: false, error: 'Failed to reset website content' });
  }
}
