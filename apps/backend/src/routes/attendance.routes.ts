import { Router } from 'express';
import { attendanceReport, attendanceSchema, markAttendance } from '../controllers/attendance.controller.js';
import { validateBody } from '../middlewares/validate.js';

const router = Router();
router.post('/', validateBody(attendanceSchema), markAttendance);
router.get('/report', attendanceReport);

export default router;
