import { Schema, model } from 'mongoose';

const taskSchema = new Schema(
  {
    title: { type: String, required: true },
    description: String,
    samitiId: { type: Schema.Types.ObjectId, ref: 'Samiti', required: true, index: true },
    assignedTo: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    deadline: Date,
    priority: { type: String, enum: ['LOW', 'MEDIUM', 'HIGH'], default: 'MEDIUM' },
    status: { type: String, enum: ['PENDING', 'IN_PROGRESS', 'COMPLETED'], default: 'PENDING' },
    attachments: [{ type: String }],
    comments: [
      {
        by: { type: Schema.Types.ObjectId, ref: 'User' },
        message: String,
        createdAt: { type: Date, default: Date.now }
      }
    ]
  },
  { timestamps: true }
);

export const Task = model('Task', taskSchema);
