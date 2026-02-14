import { Schema, model } from 'mongoose';

const activityLogSchema = new Schema(
  {
    actorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    action: { type: String, required: true },
    resourceType: { type: String, required: true },
    resourceId: String,
    metadata: Schema.Types.Mixed
  },
  { timestamps: true }
);

export const ActivityLog = model('ActivityLog', activityLogSchema);
