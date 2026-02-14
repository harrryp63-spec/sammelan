import type { Response } from 'express';
import { z } from 'zod';
import { Task } from '../models/Task.js';
import type { AuthRequest } from '../middlewares/auth.js';
import { logActivity } from '../services/audit.service.js';

export const taskSchema = z.object({
  title: z.string().min(2),
  description: z.string().optional(),
  samitiId: z.string(),
  assignedTo: z.string(),
  deadline: z.string().optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).default('MEDIUM')
});

export const createTask = async (req: AuthRequest, res: Response) => {
  const data = req.body as z.infer<typeof taskSchema>;
  const task = await Task.create({ ...data, deadline: data.deadline ? new Date(data.deadline) : undefined, createdBy: req.user?.id });
  if (req.user) await logActivity(req.user.id, 'CREATE_TASK', 'Task', task.id);
  return res.status(201).json(task);
};

export const listTasks = async (req: AuthRequest, res: Response) => {
  const query = req.user?.role === 'TEAM_MEMBER' ? { assignedTo: req.user.id } : req.user?.role === 'SAMITI_HEAD' ? { samitiId: req.user.samitiId } : {};
  const tasks = await Task.find(query).sort({ createdAt: -1 });
  return res.json(tasks);
};

export const updateTaskStatus = async (req: AuthRequest, res: Response) => {
  const { status, comment } = req.body as { status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED'; comment?: string };
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: 'Task not found' });

  task.status = status;
  if (comment && req.user) task.comments.push({ by: req.user.id, message: comment });
  await task.save();

  if (req.user) await logActivity(req.user.id, 'UPDATE_TASK_STATUS', 'Task', task.id, { status });
  return res.json(task);
};
