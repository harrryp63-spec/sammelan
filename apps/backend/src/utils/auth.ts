import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import type { Role } from '../types/common.js';

export const hashPassword = (raw: string) => bcrypt.hash(raw, 12);
export const verifyPassword = (raw: string, hash: string) => bcrypt.compare(raw, hash);

export const signToken = (sub: string, role: Role, samitiId?: string) =>
  jwt.sign({ sub, role, samitiId }, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRY });
