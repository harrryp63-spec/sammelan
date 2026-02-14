import { Schema, model } from 'mongoose';

const samitiSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    headId: { type: Schema.Types.ObjectId, ref: 'User' },
    budgetAllocation: Number,
    progress: { type: Number, default: 0, min: 0, max: 100 }
  },
  { timestamps: true }
);

export const Samiti = model('Samiti', samitiSchema);
