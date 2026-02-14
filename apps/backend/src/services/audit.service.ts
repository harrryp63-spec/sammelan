import { ActivityLog } from '../models/ActivityLog.js';

export const logActivity = async (actorId: string, action: string, resourceType: string, resourceId?: string, metadata?: unknown) => {
  await ActivityLog.create({ actorId, action, resourceType, resourceId, metadata });
};
