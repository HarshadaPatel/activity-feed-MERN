import request from 'supertest';
import app from '../app.js';
import mongoose from 'mongoose';
import Activity from '../models/Activity.js';

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});
afterAll(async () => {
  await mongoose.connection.close();
});

describe('Activity API', () => {
  const tenant = 'tenant-A';

  beforeEach(async () => {
    await Activity.deleteMany({ tenantId: tenant });
  });

  test('POST /activities creates activity', async () => {
    const res = await request(app)
      .post('/activities')
      .set('x-tenant-id', tenant)
      .send({
        actorId: 'u1',
        actorName: 'User 1',
        type: 'COMMENT_ADDED',
        entityId: 'E1',
        metadata: { text: 'Hello' },
      })
      .expect(201);

    expect(res.body.id).toBeDefined();
    expect(res.body.type).toBe('COMMENT_ADDED');
  });

  test('GET /activities returns paginated items with nextCursor', async () => {
    const now = Date.now();
    await Activity.insertMany(
      Array.from({ length: 30 }).map((_, idx) => ({
        tenantId: tenant,
        actorId: 'u1',
        actorName: 'User 1',
        type: 'STATUS_CHANGED',
        entityId: `E${idx}`,
        metadata: {},
        createdAt: new Date(now - idx * 1000),
      }))
    );

    const res1 = await request(app)
      .get('/activities?limit=10')
      .set('x-tenant-id', tenant)
      .expect(200);

    expect(res1.body.items.length).toBe(10);
    expect(res1.body.nextCursor).toBeTruthy();

    const res2 = await request(app)
      .get(`/activities?limit=10&cursor=${encodeURIComponent(res1.body.nextCursor)}`)
      .set('x-tenant-id', tenant)
      .expect(200);

    expect(res2.body.items.length).toBe(10);
  });

  test('Tenant isolation: cannot fetch other tenant', async () => {
    await Activity.create({
      tenantId: 'tenant-B',
      actorId: 'u2',
      actorName: 'User 2',
      type: 'FILE_UPLOADED',
      entityId: 'E99',
      metadata: {},
      createdAt: new Date(),
    });

    const res = await request(app)
      .get('/activities?limit=10')
      .set('x-tenant-id', tenant)
      .expect(200);

    expect(res.body.items.length).toBe(0);
  });
});
