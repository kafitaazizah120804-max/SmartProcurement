# SmartProcurement — Local-first Prototype

This repository contains a small demo scaffold (Vite + React) and a Dexie (IndexedDB) seed script to run a local-first prototype of the SmartProcurement app.

What I added
- src/db/seed.ts — Dexie DB definition and `seedInitialData()` to populate roles, divisions (with budgets), categories, settings, and demo users.
- Minimal Vite + React scaffold (index.html, src/main.tsx, src/App.tsx) to run the demo locally.
- package.json + vite.config.ts + tsconfig.json

Run locally
1. Install dependencies:

   npm install

2. Run dev server:

   npm run dev

3. Open http://localhost:5173/ (Vite default)

Notes
- The seeding runs automatically on app load (idempotent). The demo accounts are stored in IndexedDB and contain plain-text passwords for convenience.
- DO NOT use plain-text passwords or client-only auth in production. For production, implement server-side authentication and password hashing.

Demo accounts (seeded)
- Andi Pratama — karyawan@demo.com / karyawan123
- Sinta Maharani — supervisor@demo.com / supervisor123
- Budi Santoso — kepala.divisi@demo.com / kepala123
- Maya Lestari — keuangan@demo.com / keuangan123
- Raka Wijaya — procurement@demo.com / procurement123
- Nadia Putri — admin@demo.com / admin123
- Rian Hidayat — rian.it@demo.com / rian123

Next improvements
- Add a demo login page and session handling (reads from IndexedDB users table).
- Implement request creation UI and approval workflows.
- Add Admin UI to reset demo data or change settings.

