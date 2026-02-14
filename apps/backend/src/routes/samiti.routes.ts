import { Router } from 'express';
import { createSamiti, listSamitis, samitiSchema } from '../controllers/samiti.controller.js';
import { requireRole } from '../middlewares/auth.js';
import { validateBody } from '../middlewares/validate.js';

const router = Router();
router.get('/', listSamitis);
router.post('/', requireRole('SAYOJAK'), validateBody(samitiSchema), createSamiti);

export default router;
