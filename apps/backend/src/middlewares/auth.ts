import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import type { Role } from '../types/common.js';

export interface AuthRequest extends Request {
  user?: { id: string; role: Role; samitiId?: string };
}

export const requireAuth = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as { sub: string; role: Role; samitiId?: string };
    req.user = { id: payload.sub, role: payload.role, samitiId: payload.samitiId };
    return next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export const requireRole = (...roles: Role[]) => (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  return next();
};
