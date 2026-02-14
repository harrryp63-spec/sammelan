import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import authRoutes from './routes/auth.routes.js';
import router from './routes/index.js';
import { requireAuth } from './middlewares/auth.js';
import { errorHandler } from './middlewares/error.js';
import { env } from './config/env.js';

export const app = express();
app.use(helmet());
app.use(cors({ origin: env.FRONTEND_ORIGIN }));
app.use(express.json({ limit: '5mb' }));
app.use(morgan('dev'));
app.use(rateLimit({ windowMs: 60_000, max: 120 }));

app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api/auth', authRoutes);
app.use('/api', requireAuth, router);

app.use(errorHandler);
