import { Router } from 'express';
import authRoutes from './auth.routes.js';
import samitiRoutes from './samiti.routes.js';
import taskRoutes from './task.routes.js';
import attendanceRoutes from './attendance.routes.js';
import announcementRoutes from './announcement.routes.js';
import reportRoutes from './report.routes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/samitis', samitiRoutes);
router.use('/tasks', taskRoutes);
router.use('/attendance', attendanceRoutes);
router.use('/announcements', announcementRoutes);
router.use('/reports', reportRoutes);

export default router;
