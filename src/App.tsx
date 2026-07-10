import React, { useEffect, useState } from 'react'
import { seedInitialData } from './db/seed'
import LoginPage from './components/LoginPage'
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import { User } from './db/seed'
import './styles.css'

export default function App() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Initialize data on app load
    seedInitialData()
      .catch(err => console.error('Seed failed:', err))
      .finally(() => setLoading(false))
  }, [])

  const handleLogout = () => {
    setUser(null)
  }

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: '#f3f4f6',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div className="spinner" style={{ margin: '0 auto 16px' }}></div>
          <p style={{ color: '#6b7280' }}>Memuat aplikasi...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Header user={user} onLogout={handleLogout} />
      {user ? (
        <Dashboard user={user} />
      ) : (
        <LoginPage onLogin={setUser} />
      )}
    </>
  )
}