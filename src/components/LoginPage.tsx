import React, { useState } from 'react'
import db, { User } from '../db/seed'
import '../styles.css'

interface LoginPageProps {
  onLogin: (user: User) => void
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showDemoAccounts, setShowDemoAccounts] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const user = await db.table<User>('users').where('email').equals(email).first()
      
      if (user && user.password === password) {
        onLogin(user)
      } else {
        setError('Email atau password salah')
      }
    } catch (err) {
      setError('Terjadi kesalahan saat login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>SmartProcurement</h1>
          <p style={styles.subtitle}>Sistem Manajemen Pengadaan</p>
        </div>

        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={styles.form}>
          <div className="form-group">
            <label className="label">Email</label>
            <input
              type="email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="contoh@demo.com"
              required
            />
          </div>

          <div className="form-group">
            <label className="label">Password</label>
            <input
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block btn-lg"
            disabled={loading}
            style={{ marginTop: 24 }}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Memproses...
              </>
            ) : (
              'Masuk'
            )}
          </button>
        </form>

        <button
          type="button"
          onClick={() => setShowDemoAccounts(!showDemoAccounts)}
          className="btn btn-secondary btn-block"
          style={{ marginTop: 12 }}
        >
          {showDemoAccounts ? 'Sembunyikan Akun Demo' : 'Lihat Akun Demo'}
        </button>

        {showDemoAccounts && (
          <div style={styles.demoSection}>
            <p style={styles.demoTitle}>Akun Demo yang Tersedia:</p>
            <DemoAccountsList />
          </div>
        )}
      </div>
    </div>
  )
}

function DemoAccountsList() {
  const accounts = [
    { name: 'Andi Pratama', email: 'karyawan@demo.com', password: 'karyawan123', role: 'Karyawan' },
    { name: 'Sinta Maharani', email: 'supervisor@demo.com', password: 'supervisor123', role: 'Supervisor' },
    { name: 'Budi Santoso', email: 'kepala.divisi@demo.com', password: 'kepala123', role: 'Kepala Divisi' },
    { name: 'Maya Lestari', email: 'keuangan@demo.com', password: 'keuangan123', role: 'Keuangan' },
    { name: 'Raka Wijaya', email: 'procurement@demo.com', password: 'procurement123', role: 'Procurement' },
    { name: 'Nadia Putri', email: 'admin@demo.com', password: 'admin123', role: 'Admin' },
    { name: 'Rian Hidayat', email: 'rian.it@demo.com', password: 'rian123', role: 'Karyawan (IT)' },
  ]

  return (
    <div style={styles.accountsList}>
      {accounts.map((acc) => (
        <div key={acc.email} style={styles.accountItem}>
          <div style={styles.accountName}>{acc.name}</div>
          <div style={styles.accountEmail}>{acc.email}</div>
          <div style={styles.accountPassword}>Password: {acc.password}</div>
          <div style={styles.accountRole}>{acc.role}</div>
        </div>
      ))}
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: '16px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  } as React.CSSProperties,
  card: {
    background: 'white',
    borderRadius: '16px',
    padding: '24px',
    width: '100%',
    maxWidth: '400px',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  } as React.CSSProperties,
  header: {
    textAlign: 'center',
    marginBottom: '32px',
  } as React.CSSProperties,
  title: {
    fontSize: '28px',
    fontWeight: '700',
    margin: '0 0 8px 0',
    color: '#1f2937',
  } as React.CSSProperties,
  subtitle: {
    fontSize: '14px',
    color: '#6b7280',
    margin: '0',
  } as React.CSSProperties,
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  } as React.CSSProperties,
  demoSection: {
    marginTop: '24px',
    padding: '16px',
    background: '#f3f4f6',
    borderRadius: '8px',
  } as React.CSSProperties,
  demoTitle: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '12px',
    margin: '0 0 12px 0',
  } as React.CSSProperties,
  accountsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  } as React.CSSProperties,
  accountItem: {
    padding: '8px',
    background: 'white',
    borderRadius: '6px',
    fontSize: '11px',
    borderLeft: '3px solid #2563eb',
  } as React.CSSProperties,
  accountName: {
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '2px',
  } as React.CSSProperties,
  accountEmail: {
    color: '#6b7280',
    marginBottom: '2px',
  } as React.CSSProperties,
  accountPassword: {
    color: '#6b7280',
    marginBottom: '2px',
    fontFamily: 'monospace',
  } as React.CSSProperties,
  accountRole: {
    color: '#9ca3af',
    fontSize: '10px',
  } as React.CSSProperties,
}