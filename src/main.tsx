import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { seedInitialData } from './db/seed'

// Seed demo data on first load (idempotent)
seedInitialData().catch(err => console.error('Seed failed:', err))

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
