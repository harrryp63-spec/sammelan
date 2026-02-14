import type { Response } from 'express';
import { z } from 'zod';
import type { AuthRequest } from '../middlewares/auth.js';
import { Attendance } from '../models/Attendance.js';

export const attendanceSchema = z.object({
  userId: z.string(),
  samitiId: z.string(),
  date: z.string(),
  status: z.enum(['PRESENT', 'ABSENT'])
});

export const markAttendance = async (req: AuthRequest, res: Response) => {
  const payload = req.body as z.infer<typeof attendanceSchema>;
  const attendance = await Attendance.findOneAndUpdate(
    { userId: payload.userId, date: new Date(payload.date) },
    { ...payload, date: new Date(payload.date), markedBy: req.user?.id },
    { upsert: true, new: true }
  );
  return res.json(attendance);
};

export const attendanceReport = async (req: AuthRequest, res: Response) => {
  const filter = req.user?.role === 'SAYOJAK' ? {} : { samitiId: req.user?.samitiId };
  const rows = await Attendance.aggregate([
    { $match: filter },
    { $group: { _id: '$userId', present: { $sum: { $cond: [{ $eq: ['$status', 'PRESENT'] }, 1, 0] } }, total: { $sum: 1 } } },
    { $project: { percentage: { $multiply: [{ $divide: ['$present', '$total'] }, 100] }, present: 1, total: 1 } }
  ]);

  return res.json(rows);
};
