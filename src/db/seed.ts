/*
  src/db/seed.ts
  Seed script for SmartProcurement (local-first prototype using Dexie.js / IndexedDB)

  Notes:
  - This seed creates roles, divisions (with initial budgets), categories, settings, and mock user accounts
  - Passwords are stored in plain-text ON PURPOSE for demo/testing only. Do NOT use in production.
  - Usage: install dexie (npm install dexie) and call seedInitialData() on app first load (e.g., root useEffect)
*/

import Dexie from 'dexie';

export interface User {
  id?: number;
  fullName: string;
  email: string;
  password: string;
  roleId: number;
  divisionId?: number;
  createdAt: string;
}

export interface Role { id?: number; name: string; }
export interface Division { id?: number; name: string; initialBudget: number; committed: number; spent: number; }
export interface Category { id?: number; name: string; }
export interface Setting { key: string; value: string; }

export interface RequestItem { id?: number; requestId?: number; name: string; categoryId?: number; qty: number; unitPrice: number; subtotal: number; specNote?: string; }
export interface Request {
  id?: number;
  requesterId: number;
  divisionId: number;
  status: string;
  totalEstimate: number;
  priority?: string;
  neededDate?: string;
  notes?: string;
  createdAt: string;
  updatedAt?: string;
}
export interface Approval { id?: number; requestId: number; approverId: number; roleAtApproval: string; action: string; comment?: string; createdAt: string; }
export interface Purchase { id?: number; requestId: number; vendor?: string; finalPrice?: number; purchaseDate?: string; status?: string; }

const db = new Dexie('SmartProcurementDB');

db.version(1).stores({
  users: '++id, email, roleId, divisionId',
  roles: '++id, name',
  divisions: '++id, name',
  categories: '++id, name',
  settings: 'key',
  requests: '++id, requesterId, divisionId, status, createdAt',
  request_items: '++id, requestId, name',
  approvals: '++id, requestId, approverId, createdAt',
  purchases: '++id, requestId, status'
});

export default db;

export async function seedInitialData() {
  // simple idempotency check
  const rolesCount = await db.table<Role>('roles').count();
  if (rolesCount > 0) {
    // already seeded
    return;
  }

  // Roles
  const roles: Role[] = [
    { name: 'Karyawan' },
    { name: 'Supervisor' },
    { name: 'KepalaDivisi' },
    { name: 'Keuangan' },
    { name: 'Procurement' },
    { name: 'Admin' }
  ];
  // bulkAdd returns the generated keys in modern Dexie
  const roleKeys = await db.table<Role>('roles').bulkAdd(roles);

  // Divisions & budgets
  const divisions: Division[] = [
    { name: 'Operasional', initialBudget: 75000000, committed: 0, spent: 0 },
    { name: 'IT', initialBudget: 60000000, committed: 0, spent: 0 },
    { name: 'R&D', initialBudget: 55000000, committed: 0, spent: 0 },
    { name: 'Marketing', initialBudget: 50000000, committed: 0, spent: 0 },
    { name: 'Sales', initialBudget: 45000000, committed: 0, spent: 0 },
    { name: 'Procurement', initialBudget: 40000000, committed: 0, spent: 0 },
    { name: 'Keuangan', initialBudget: 30000000, committed: 0, spent: 0 },
    { name: 'SDM', initialBudget: 30000000, committed: 0, spent: 0 },
    { name: 'Customer Service', initialBudget: 25000000, committed: 0, spent: 0 },
    { name: 'Legal', initialBudget: 20000000, committed: 0, spent: 0 }
  ];
  await db.table<Division>('divisions').bulkAdd(divisions);

  // Categories
  const categories: Category[] = [
    { name: 'ATK' }, { name: 'Elektronik' }, { name: 'Perlengkapan Operasional' },
    { name: 'Furniture Kantor' }, { name: 'Software / Langganan Digital' },
    { name: 'Marketing & Promosi' }, { name: 'Konsumsi / Rapat' }, { name: 'Jasa Vendor' },
    { name: 'Lainnya' }
  ];
  await db.table<Category>('categories').bulkAdd(categories);

  // Settings
  const settings: Setting[] = [
    { key: 'supervisorApprovalLimit', value: String(1000000) }, // Rp 1.000.000
    { key: 'initialSeedAt', value: new Date().toISOString() }
  ];
  for (const s of settings) await db.table<Setting>('settings').put(s);

  // Users (mock accounts)
  // Role indices in the roles array above (1..6) map to roleId values here
  const users: User[] = [
    { fullName: 'Andi Pratama', email: 'karyawan@demo.com', password: 'karyawan123', roleId: 1, divisionId: 1, createdAt: new Date().toISOString() },
    { fullName: 'Sinta Maharani', email: 'supervisor@demo.com', password: 'supervisor123', roleId: 2, divisionId: 1, createdAt: new Date().toISOString() },
    { fullName: 'Budi Santoso', email: 'kepala.divisi@demo.com', password: 'kepala123', roleId: 3, divisionId: 1, createdAt: new Date().toISOString() },
    { fullName: 'Maya Lestari', email: 'keuangan@demo.com', password: 'keuangan123', roleId: 4, divisionId: 7, createdAt: new Date().toISOString() },
    { fullName: 'Raka Wijaya', email: 'procurement@demo.com', password: 'procurement123', roleId: 5, divisionId: 6, createdAt: new Date().toISOString() },
    { fullName: 'Nadia Putri', email: 'admin@demo.com', password: 'admin123', roleId: 6, divisionId: 2, createdAt: new Date().toISOString() },
    { fullName: 'Rian Hidayat', email: 'rian.it@demo.com', password: 'rian123', roleId: 1, divisionId: 2, createdAt: new Date().toISOString() }
  ];
  await db.table<User>('users').bulkAdd(users);

  console.log('SmartProcurement initial seed completed. (Demo credentials stored in IndexedDB)');
}
