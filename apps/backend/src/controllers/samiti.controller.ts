import type { Request, Response } from 'express';
import { z } from 'zod';
import { Samiti } from '../models/Samiti.js';
import { User } from '../models/User.js';
import type { AuthRequest } from '../middlewares/auth.js';
import { logActivity } from '../services/audit.service.js';

export const samitiSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(5),
  headId: z.string().optional(),
  budgetAllocation: z.number().optional()
});

export const createSamiti = async (req: AuthRequest, res: Response) => {
  const samiti = await Samiti.create(req.body);
  if (samiti.headId) {
    await User.findByIdAndUpdate(samiti.headId, { samitiId: samiti.id, role: 'SAMITI_HEAD' });
  }
  if (req.user) await logActivity(req.user.id, 'CREATE_SAMITI', 'Samiti', samiti.id);
  return res.status(201).json(samiti);
};

export const listSamitis = async (_req: Request, res: Response) => {
  const samitis = await Samiti.find().populate('headId', 'fullName email mobileNumber');
  return res.json(samitis);
};
