# Activity Feed Backend

This is the backend service for a tenant‑isolated activity feed.  
Built with **Node.js, Express, MongoDB**.

---

## 🚀 Features
- Tenant isolation via `x-tenant-id` header
- Activity schema: `{ _id, tenantId, actorId, actorName, type, entityId, metadata, createdAt }`
- Endpoints:
  - `POST /activities` → Create activity
  - `GET /activities?cursor=<ISO_DATE>&limit=20` → Cursor‑based pagination
- Compound index `{ tenantId: 1, createdAt: -1 }` for fast queries
- Projection to return only required fields
- Optimistic UI support (frontend)

---

## ⚙️ Setup

1. Install dependencies:
   ```bash
   npm install

2.Start MongoDB locally or connect to Atlas.

3.Create .env file (if using connection string):

MONGO_URI=mongodb://localhost:27017/activityfeed
PORT=3000

4.Run the Server

npm start


🔗 API Endpoints

POST /activities
Headers:
  Content-Type: application/json
  x-tenant-id: tenantA

Body:
{
  "actorId": "u1",
  "actorName": "User 1",
  "type": "COMMENT_ADDED",
  "entityId": "E1",
  "metadata": { "text": "Hello world" }
}


Response 

{
  "id": "64f123abc...",
  "actorId": "u1",
  "actorName": "User 1",
  "type": "COMMENT_ADDED",
  "entityId": "E1",
  "metadata": { "text": "Hello world" },
  "createdAt": "2025-12-26T06:08:00.123Z"
}


## Get Activities (cursor pagination)

Add to postman -->

GET /activities?cursor=<ISO_DATE>&limit=20
Headers:
  x-tenant-id: tenantA


Response -->

{
  "items": [
    { "id": "...", "actorId": "u1", "actorName": "User 1", ... }
  ],
  "nextCursor": "2025-12-26T06:07:00.456Z",
  "hasMore": true
}


🧪 Unit Tests
Unit tests are written with Jest + Supertest.

Example test (tests/activity.test.js)

Run tests

npm test

🧪 API Testing with Postman
Open Postman.

Create a POST request to http://localhost:3000/activities with headers:

Content-Type: application/json

x-tenant-id: tenantA

Body JSON as shown above.

Create a GET request to http://localhost:3000/activities?limit=2 with header x-tenant-id: tenantA.

Copy nextCursor from the response and test pagination:

Code
GET /activities?cursor=<nextCursor>&limit=2