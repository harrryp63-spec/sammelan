import { Router } from 'express';
import { summaryReport } from '../controllers/report.controller.js';
import { requireRole } from '../middlewares/auth.js';

const router = Router();
router.get('/summary', requireRole('SAYOJAK', 'SAMITI_HEAD'), summaryReport);

export default router;
