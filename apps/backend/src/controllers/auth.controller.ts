import type { Request, Response } from 'express';
import { z } from 'zod';
import { User } from '../models/User.js';
import { hashPassword, signToken, verifyPassword } from '../utils/auth.js';

export const registerSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  mobileNumber: z.string().min(8),
  password: z.string().min(8),
  role: z.enum(['SAYOJAK', 'SAMITI_HEAD', 'TEAM_MEMBER']),
  samitiId: z.string().optional()
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export const register = async (req: Request, res: Response) => {
  const payload = req.body as z.infer<typeof registerSchema>;
  const exists = await User.findOne({ email: payload.email });
  if (exists) return res.status(409).json({ message: 'Email already exists' });

  const user = await User.create({ ...payload, passwordHash: await hashPassword(payload.password) });
  return res.status(201).json({ id: user.id });
};

export const login = async (req: Request, res: Response) => {
  const payload = req.body as z.infer<typeof loginSchema>;
  const user = await User.findOne({ email: payload.email });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const valid = await verifyPassword(payload.password, user.passwordHash);
  if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

  const token = signToken(user.id, user.role, user.samitiId?.toString());
  return res.json({ token, user: { id: user.id, fullName: user.fullName, role: user.role, samitiId: user.samitiId } });
};
