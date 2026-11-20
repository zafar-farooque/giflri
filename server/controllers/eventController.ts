import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Event from '../models/Event';
import EventRegistrationModel from '../models/EventRegistration';
import { DB } from '../db/db';
import { EventRegistration } from '../types';

export async function getEvents(req: Request, res: Response) {
  try {
    const { status, type } = req.query;
    if (mongoose.connection.readyState === 1) {
      const filter: any = {};
      if (status) filter.status = status;
      if (type) filter.type = type;
      const list = await Event.find(filter).lean();
      if (list.length > 0) return res.status(200).json({ success: true, data: list });
    }

    let events = DB.getEvents();
    if (status) events = events.filter((e) => e.status.toLowerCase() === String(status).toLowerCase());
    if (type) events = events.filter((e) => e.type.toLowerCase() === String(type).toLowerCase());
    return res.status(200).json({ success: true, data: events });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Failed to fetch events' });
  }
}

export async function createEvent(req: Request, res: Response) {
  try {
    const data = req.body;
    const newEvent = DB.addEvent({
      id: data.id || `event-${Date.now()}`,
      title: data.title || 'New Academic Event',
      date: data.date || new Date().toISOString().split('T')[0],
      city: data.city || 'Dubai',
      country: data.country || 'UAE',
      theme: data.theme || 'Islamic Finance & Pedagogy',
      speakers: data.speakers || 0,
      attendeesCount: data.attendeesCount || 0,
      status: data.status || 'Upcoming',
      type: data.type || 'Conference',
      desc: data.desc || '',
      ...data,
    });
    if (mongoose.connection.readyState === 1) {
      await Event.create(newEvent);
    }
    return res.status(201).json({ success: true, data: newEvent });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Failed to create event' });
  }
}

export async function registerForEvent(req: Request, res: Response) {
  try {
    const eventId = String(req.params.id);
    const {
      name,
      email,
      phone,
      organization,
      role,
      country,
      attendanceType,
      specialRequests,
    } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        error: 'Name and Email are required for event registration.',
      });
    }

    const event = DB.getEvents().find((e) => String(e.id) === eventId);
    const eventTitle = event?.title || 'GIFLRI Academic Event';

    const registrationCode = `GIFLRI-REG-${Math.floor(1000 + Math.random() * 9000)}`;

    const newRegistration: EventRegistration = {
      id: `reg-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      eventId,
      eventTitle,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : '',
      organization: organization ? organization.trim() : '',
      role: role || 'Academic Participant',
      country: country || (event ? event.country : 'UAE'),
      attendanceType: attendanceType === 'Virtual' ? 'Virtual' : 'In-Person',
      specialRequests: specialRequests ? specialRequests.trim() : '',
      registrationCode,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };

    // 1. Save to JSON / In-Memory DB
    DB.addEventRegistration(newRegistration);
    if (event) {
      event.attendeesCount = (event.attendeesCount || 0) + 1;
      DB.persist();
    }

    // 2. Save to MongoDB if connected
    if (mongoose.connection.readyState === 1) {
      try {
        await EventRegistrationModel.create(newRegistration);
        await Event.findOneAndUpdate(
          { id: eventId },
          { $inc: { attendeesCount: 1 } },
          { upsert: false }
        );
      } catch (mongoErr) {
        console.warn('[MongoDB EventRegistration Warning]:', mongoErr);
      }
    }

    return res.status(201).json({
      success: true,
      message: 'Participant registered successfully and saved in database.',
      data: newRegistration,
    });
  } catch (error: any) {
    console.error('Registration failed:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Registration failed due to server error.',
    });
  }
}

export async function getEventRegistrations(req: Request, res: Response) {
  try {
    const eventId = req.params.eventId ? String(req.params.eventId) : undefined;
    if (mongoose.connection.readyState === 1) {
      const filter = eventId ? { eventId } : {};
      const list = await EventRegistrationModel.find(filter).sort({ createdAt: -1 }).lean();
      if (list.length > 0) {
        return res.status(200).json({ success: true, data: list });
      }
    }

    const registrations = DB.getEventRegistrations(eventId);
    return res.status(200).json({ success: true, data: registrations });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Failed to fetch event registrations' });
  }
}
