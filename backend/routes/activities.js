// routes/activities.js
import express from 'express';
import Activity from '../models/Activity.js';

const router = express.Router();

// POST /activities – Create activity
router.post('/', async (req, res) => {
  try {
    const { actorId, actorName, type, entityId, metadata } = req.body;
    if (!actorId || !actorName || !type || !entityId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const doc = await Activity.create({
      tenantId: req.tenantId,
      actorId,
      actorName,
      type,
      entityId,
      metadata,
      createdAt: new Date(),
    });

    const { _id, tenantId, ...rest } = doc.toObject();
    res.status(201).json({ id: _id.toString(), ...rest });
  } catch (e) {
    res.status(500).json({ error: 'Failed to create activity' });
  }
});

// GET /activities – Fetch activities with cursor pagination
router.get('/', async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit || '20', 10), 100);
    const cursorDate = req.query.cursor ? new Date(req.query.cursor) : new Date();

    const query = {
      tenantId: req.tenantId,
      createdAt: { $lt: cursorDate }
    };

    const docs = await Activity.find(query, {
      actorId: 1,
      actorName: 1,
      type: 1,
      entityId: 1,
      metadata: 1,
      createdAt: 1
    })
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    const nextCursor = docs.length
      ? docs[docs.length - 1].createdAt.toISOString()
      : null;

    res.json({
      items: docs.map(d => ({ id: d._id.toString(), ...d })),
      nextCursor,
      hasMore: !!nextCursor
    });
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch activities' });
  }
});

export default router;
