# 🎨 Activity Feed Frontend

This is the React frontend for the **tenant‑isolated activity feed** service.  
Built with **React (Vite), Hooks, and Cypress**.

---

## 🚀 Features
- 🔄 Infinite scroll with `IntersectionObserver`
- 🟠 Optimistic UI updates with rollback on failure
- 🔍 Filtering by activity type (All, Comments, Status, Files)
- ⏳ Loading and empty states
- 📡 Mock real‑time updates (polling every 10s)
- 🎨 Color‑coded cards:
  - Blue → Comments
  - Green → Status changes
  - Yellow → File uploads
  - Orange → Pending optimistic items

---

## ⚙️ Prerequisites
- Node.js (>= 18.x recommended)
- npm or yarn
- Backend service running at `http://localhost:3000`

---

## ⚙️ Setup & Run

1. **Clone the repo**
   ```bash
   git clone https://github.com/your-username/activity-feed.git
   cd activity-feed/frontend
2. ** Install dependencies**

npm install

3.** Start development server**

npm run dev

4. **Open in browser **
http://localhost:5173


🔗 Backend Integration
1.The frontend expects the backend running at http://localhost:3000.

2.Tenant ID is passed via prop:

🧪 Testing
1.End‑to‑End Tests with Cypress
-->Install Cypress (already in devDependencies):

bash
-->npm install

2.Run Cypress:
npx cypress open
3.cypress/e2e/feed.cy.js):

describe('Activity Feed', () => {
  it('renders feed and adds optimistic activity', () => {
    cy.visit('http://localhost:5173');
    cy.contains('➕ Add Activity').click();
    cy.get('li.optimistic').should('exist');
    cy.get('li.optimistic .feed-meta').should('contain', '(pending)');
  });

  it('filters by Comments', () => {
    cy.contains('Comments').click();
    cy.get('li.comment').should('exist');
  });
});


✅ Summary
Run frontend with:
-->npm run dev
Backend must be running at http://localhost:3000

Test with:
-->npx cypress open
