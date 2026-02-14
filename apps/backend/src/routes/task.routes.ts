import { Router } from 'express';
import { createTask, listTasks, taskSchema, updateTaskStatus } from '../controllers/task.controller.js';
import { requireRole } from '../middlewares/auth.js';
import { validateBody } from '../middlewares/validate.js';
import { z } from 'zod';

const router = Router();
router.get('/', listTasks);
router.post('/', requireRole('SAYOJAK', 'SAMITI_HEAD'), validateBody(taskSchema), createTask);
router.patch('/:id/status', validateBody(z.object({ status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED']), comment: z.string().optional() })), updateTaskStatus);

export default router;
