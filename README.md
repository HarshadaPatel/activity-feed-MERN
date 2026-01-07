# 📌 Activity Feed Project

A full‑stack **Activity Feed** application with tenant isolation.  
Built as part of an assignment to demonstrate **backend API design** and **frontend UI integration**.

---

## 📖 Assignment Overview
The goal of this project was to build a **multi‑tenant activity feed system** where:
- Each tenant’s data is isolated via `x-tenant-id` header.
- Activities can be created and fetched with cursor‑based pagination.
- Frontend displays activities with infinite scroll, filtering, optimistic updates, and mock real‑time polling.
- Backend ensures efficient queries with proper indexing and schema design.

---

## 🛠️ Tech Stack

### Backend
- **Node.js + Express** → REST API
- **MongoDB + Mongoose** → Database
- **Jest + Supertest** → Unit testing

### Frontend
- **React (Vite)** → UI framework
- **Hooks (useState, useEffect, useCallback, useRef)** → State management
- **IntersectionObserver** → Infinite scroll
- **Cypress** → End‑to‑end testing
- **CSS Modules** → Styling

---

## 📂 Project Structure

```plaintext
activity-feed/
 ├── backend/
 │    ├── app.js
 │    ├── server.js
 │    ├── models/activity.js
 │    ├── tests/activities.test.js
 │    ├── cypress/e2e/support 
 │    └── README.md
 ├── frontend/
 │    ├── src/
 │    │    ├── api/createActivity.js
 │    │    ├── components
                  └──|ActivityFeed.css
                  └──|ActivityFeed.js
 │    │    ├── App.jsx
 │    │    └── main.jsx
           └── index.html
 │    ├── public/
 │    ├── cypress/
 │    ├── vite.config.js
 │    └── README.md
 ├── README.md       # Root documentation (this file)
 └── .gitignore


⚙️ Setup & Run

1. Clone the repo
bash
git clone https://github.com/your-username/activity-feed.git
cd activity-feed

2. Backend
bash
cd backend
npm install
Create .env file:

env
MONGO_URI=mongodb://localhost:27017/activityfeed
PORT=3000
Run server:

bash
npm start
Backend runs at: http://localhost:3000

3. Frontend
bash
cd ../frontend
npm install
npm run dev
Frontend runs at: http://localhost:5173

🔗 API Endpoints
Create Activity
http
POST /activities
Headers:
  Content-Type: application/json
  x-tenant-id: tenantA
Get Activities
http
GET /activities?cursor=<ISO_DATE>&limit=20
Headers:
  x-tenant-id: tenantA
🧪 Testing
Backend Unit Tests
bash
cd backend
npm test
Frontend E2E Tests (Cypress)
bash
cd frontend
npx cypress open

🎨 UI Features
Infinite scroll
Filter buttons (All, Comments, Status, Files)
Empty state message
Optimistic updates (orange cards with (pending))
Mock real‑time updates via polling



✅ Summary
Backend → Node.js  + Express + MongoDB, tested
Frontend → React + Vite, tested with Cypress
Assignment → Build a tenant‑isolated activity feed with pagination, optimistic UI, and filtering

Images attached into snapshots folder 




