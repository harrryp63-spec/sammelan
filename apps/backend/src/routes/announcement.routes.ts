import { Router } from 'express';
import { announcementSchema, createAnnouncement, listAnnouncements } from '../controllers/announcement.controller.js';
import { requireRole } from '../middlewares/auth.js';
import { validateBody } from '../middlewares/validate.js';

const router = Router();
router.get('/', listAnnouncements);
router.post('/', requireRole('SAYOJAK', 'SAMITI_HEAD'), validateBody(announcementSchema), createAnnouncement);

export default router;
