import { Schema, model } from 'mongoose';
import type { Role } from '../types/common.js';

const userSchema = new Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, index: true },
    mobileNumber: { type: String, required: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['SAYOJAK', 'SAMITI_HEAD', 'TEAM_MEMBER'] as Role[], required: true },
    samitiId: { type: Schema.Types.ObjectId, ref: 'Samiti' },
    address: String,
    city: String,
    skills: [{ type: String }],
    availability: String,
    emergencyContact: String,
    idProofUrl: String,
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const User = model('User', userSchema);
