import { Schema, model } from 'mongoose';

const announcementSchema = new Schema(
  {
    title: { type: String, required: true },
    message: { type: String, required: true },
    scope: { type: String, enum: ['GLOBAL', 'SAMITI'], default: 'GLOBAL' },
    samitiId: { type: Schema.Types.ObjectId, ref: 'Samiti' },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true }
);

export const Announcement = model('Announcement', announcementSchema);
