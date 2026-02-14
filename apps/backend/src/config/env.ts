import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().default(4000),
  MONGODB_URI: z.string().default('mongodb://localhost:27017/sammelan'),
  JWT_SECRET: z.string().min(12).default('replace-this-secret-key'),
  JWT_EXPIRY: z.string().default('1d'),
  FRONTEND_ORIGIN: z.string().default('http://localhost:5173')
});

export const env = envSchema.parse(process.env);
