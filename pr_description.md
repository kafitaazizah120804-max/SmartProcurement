## Pull Request: Add Dexie IndexedDB seed script (initial data + demo accounts)

This PR adds a seed script for the local-first prototype using Dexie.js (IndexedDB) and includes initial demo data tailored for a corporate internal procurement app.

What I added
- src/db/seed.ts
  - Dexie DB definition
  - seedInitialData() to populate roles, divisions (with initial budgets), categories, settings, and 7 demo user accounts
  - Idempotent: will not re-seed if data already exists

How to run locally
1. Install Dexie:

   npm install dexie

2. Call seedInitialData() when the app first loads (example for React in src/main.tsx or src/index.tsx):

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { seedInitialData } from './db/seed';

seedInitialData().catch(err => console.error('Seed failed:', err));

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

Security notes
- Demo accounts store passwords in plain-text in IndexedDB for convenience of local prototype only. DO NOT use this in production.
- For production: implement server-side authentication, use hashed passwords (bcrypt/argon2), and secure storage.

Suggested next steps
- (Optional) Add automatic call to seedInitialData() in the app bootstrap or provide a 'Reset demo data' admin button.
- Integrate basic login flow that reads from db.users and sets an in-memory session for demo.
- Implement approval flows and budget calculation logic in the app using the schema in src/db/seed.ts.

Please review and merge into the main branch when ready.
