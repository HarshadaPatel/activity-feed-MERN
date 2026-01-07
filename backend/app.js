import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import tenantMiddleware from './middleware/tenant.js';
import activityRoutes from './routes/activities.js';

const app = express();

// Allow requests from your frontend (http://localhost:5173)
app.use(cors({
  origin: ['http://localhost:5173','http://localhost:5173'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'x-tenant-id']
}));
app.use(express.json());

// Tenant middleware
app.use(tenantMiddleware);

// Activity routes
app.use('/activities', activityRoutes);

export default app;
