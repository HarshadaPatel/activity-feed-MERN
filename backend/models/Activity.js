import mongoose from 'mongoose';

const ActivitySchema = new mongoose.Schema(
  {
    tenantId: { type: String, required: true, index: true },
    actorId: { type: String, required: true },
    actorName: { type: String, required: true },
    type: { type: String, required: true }, // e.g., 'COMMENT_ADDED'
    entityId: { type: String, required: true },
    metadata: { type: mongoose.Schema.Types.Mixed, default: {} },
    createdAt: { type: Date, default: () => new Date(), index: true },
  },
  { versionKey: false }
);

// Compound index for tenant + createdAt (descending for recent-first scans)
ActivitySchema.index({ tenantId: 1, createdAt: -1 });

export default mongoose.model('Activity', ActivitySchema);
