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


<img width="1786" height="903" alt="image8" src="https://github.com/user-attachments/assets/41c58829-92b9-46bd-8d73-942a5f0a83e4" />
<img width="1455" height="941" alt="image7" src="https://github.com/user-attachments/assets/9107e699-dd85-40bc-bc8e-5566d72ff5f6" />
<img width="1708" height="832" alt="image6" src="https://github.com/user-attachments/assets/8b04d0e5-b88c-41fa-b66a-1ac7617346e9" />
<img width="1095" height="949" alt="Image1" src="https://github.com/user-attachments/assets/b4814440-ae88-4b5c-ab95-ff31bc3cd803" />
<img width="1058" height="876" alt="image2" src="https://github.com/user-attachments/assets/4d416053-4ffb-4334-b2bb-1531ac624dff" />
<img width="1005" height="785" alt="image3" src="https://github.com/user-attachments/assets/59d70410-3437-4501-9978-811112b64303" />
<img width="1193" height="873" alt="image4" src="https://github.com/user-attachments/assets/392b9bc0-0a49-4c0a-beb5-0a6f32c48b75" />






