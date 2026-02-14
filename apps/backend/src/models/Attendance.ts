import { Schema, model } from 'mongoose';

const attendanceSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    samitiId: { type: Schema.Types.ObjectId, ref: 'Samiti', required: true, index: true },
    date: { type: Date, required: true, index: true },
    status: { type: String, enum: ['PRESENT', 'ABSENT'], required: true },
    markedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true }
);

attendanceSchema.index({ userId: 1, date: 1 }, { unique: true });

export const Attendance = model('Attendance', attendanceSchema);
