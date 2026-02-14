import type { Response } from 'express';
import { z } from 'zod';
import { Announcement } from '../models/Announcement.js';
import type { AuthRequest } from '../middlewares/auth.js';

export const announcementSchema = z.object({
  title: z.string().min(2),
  message: z.string().min(5),
  scope: z.enum(['GLOBAL', 'SAMITI']).default('GLOBAL'),
  samitiId: z.string().optional()
});

export const createAnnouncement = async (req: AuthRequest, res: Response) => {
  const announcement = await Announcement.create({ ...req.body, createdBy: req.user?.id });
  return res.status(201).json(announcement);
};

export const listAnnouncements = async (req: AuthRequest, res: Response) => {
  const query = req.user?.role === 'SAYOJAK' ? {} : { $or: [{ scope: 'GLOBAL' }, { samitiId: req.user?.samitiId }] };
  const items = await Announcement.find(query).sort({ createdAt: -1 });
  return res.json(items);
};
