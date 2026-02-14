import type { Response } from 'express';
import type { AuthRequest } from '../middlewares/auth.js';
import { Samiti } from '../models/Samiti.js';
import { Task } from '../models/Task.js';
import { Attendance } from '../models/Attendance.js';
import { User } from '../models/User.js';

export const summaryReport = async (_req: AuthRequest, res: Response) => {
  const [samitis, volunteers, tasks, completedTasks, attendancePresent] = await Promise.all([
    Samiti.countDocuments(),
    User.countDocuments({ role: { $in: ['SAMITI_HEAD', 'TEAM_MEMBER'] } }),
    Task.countDocuments(),
    Task.countDocuments({ status: 'COMPLETED' }),
    Attendance.countDocuments({ status: 'PRESENT' })
  ]);

  return res.json({ samitis, volunteers, tasks, completedTasks, pendingTasks: tasks - completedTasks, attendancePresent });
};
