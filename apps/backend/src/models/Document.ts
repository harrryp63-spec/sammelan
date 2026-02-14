import { Schema, model } from 'mongoose';

const documentSchema = new Schema(
  {
    name: { type: String, required: true },
    url: { type: String, required: true },
    samitiId: { type: Schema.Types.ObjectId, ref: 'Samiti', required: true },
    uploadedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    accessRoles: [{ type: String, enum: ['SAYOJAK', 'SAMITI_HEAD', 'TEAM_MEMBER'] }]
  },
  { timestamps: true }
);

export const Document = model('Document', documentSchema);
