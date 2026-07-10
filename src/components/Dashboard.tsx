import React, { useState, useEffect } from 'react'
import db, { User, Role, Division } from '../db/seed'
import '../styles.css'

interface DashboardProps {
  user: User
}

export default function Dashboard({ user }: DashboardProps) {
  const [role, setRole] = useState<Role | null>(null)
  const [division, setDivision] = useState<Division | null>(null)
  const [activeTab, setActiveTab] = useState<'overview' | 'requests' | 'profile'>('overview')

  useEffect(() => {
    const loadUserData = async () => {
      const userRole = await db.table<Role>('roles').get(user.roleId)
      if (user.divisionId) {
        const userDivision = await db.table<Division>('divisions').get(user.divisionId)
        setDivision(userDivision || null)
      }
      setRole(userRole || null)
    }
    loadUserData()
  }, [user])

  return (
    <div style={styles.container}>
      {/* Navigation Tabs */}
      <div style={styles.tabNav}>
        <button
          onClick={() => setActiveTab('overview')}
          style={{
            ...styles.tabButton,
            ...(activeTab === 'overview' ? styles.tabButtonActive : {}),
          }}
        >
          📊 Overview
        </button>
        <button
          onClick={() => setActiveTab('requests')}
          style={{
            ...styles.tabButton,
            ...(activeTab === 'requests' ? styles.tabButtonActive : {}),
          }}
        >
          📋 Request
        </button>
        <button
          onClick={() => setActiveTab('profile')}
          style={{
            ...styles.tabButton,
            ...(activeTab === 'profile' ? styles.tabButtonActive : {}),
          }}
        >
          👤 Profil
        </button>
      </div>

      {/* Tab Content */}
      <div style={styles.content}>
        {activeTab === 'overview' && <OverviewTab user={user} role={role} division={division} />}
        {activeTab === 'requests' && <RequestsTab user={user} />}
        {activeTab === 'profile' && <ProfileTab user={user} role={role} division={division} />}
      </div>
    </div>
  )
}

function OverviewTab({ user, role, division }: { user: User; role: Role | null; division: Division | null }) {
  return (
    <div>
      <h2 style={styles.sectionTitle}>Dashboard</h2>
      
      <div style={styles.gridCards}>
        <div className="card">
          <div style={styles.statsLabel}>Peran Anda</div>
          <div style={styles.statsValue}>{role?.name || '-'}</div>
        </div>
        
        <div className="card">
          <div style={styles.statsLabel}>Divisi</div>
          <div style={styles.statsValue}>{division?.name || '-'}</div>
        </div>
      </div>

      {division && (
        <div className="card" style={{ marginTop: '16px' }}>
          <h3 style={styles.cardTitle}>Budget {division.name}</h3>
          <div style={styles.budgetItem}>
            <div style={styles.budgetLabel}>Budget Awal</div>
            <div style={styles.budgetValue}>Rp {(division.initialBudget || 0).toLocaleString('id-ID')}</div>
          </div>
          <div style={styles.budgetItem}>
            <div style={styles.budgetLabel}>Committed</div>
            <div style={styles.budgetValue} className="text-gray">Rp {(division.committed || 0).toLocaleString('id-ID')}</div>
          </div>
          <div style={styles.budgetItem}>
            <div style={styles.budgetLabel}>Sudah Dikeluarkan</div>
            <div style={styles.budgetValue} className="text-gray">Rp {(division.spent || 0).toLocaleString('id-ID')}</div>
          </div>
          <div style={{ ...styles.budgetItem, paddingTop: '12px', borderTop: '1px solid #e5e7eb', marginTop: '12px' }}>
            <div style={styles.budgetLabel}>Sisa Budget</div>
            <div style={{ ...styles.budgetValue, color: '#059669', fontWeight: '700' }}>
              Rp {((division.initialBudget || 0) - (division.spent || 0) - (division.committed || 0)).toLocaleString('id-ID')}
            </div>
          </div>
        </div>
      )}

      <div style={{ marginTop: '32px', padding: '16px', background: '#dbeafe', borderRadius: '8px', borderLeft: '4px solid #2563eb' }}>
        <p style={{ margin: '0', fontSize: '13px', color: '#1e40af' }}>
          💡 Ini adalah prototype demo. Semua data tersimpan lokal di IndexedDB browser Anda.
        </p>
      </div>
    </div>
  )
}

function RequestsTab({ user }: { user: User }) {
  return (
    <div>
      <h2 style={styles.sectionTitle}>Request Pengadaan</h2>
      
      <div style={styles.emptyState}>
        <div style={styles.emptyIcon}>📋</div>
        <div style={styles.emptyTitle}>Belum ada request</div>
        <p style={styles.emptyDesc}>Fitur membuat request sedang dalam pengembangan</p>
        <button className="btn btn-primary" style={{ marginTop: '16px' }}>
          Buat Request
        </button>
      </div>
    </div>
  )
}

function ProfileTab({ user, role, division }: { user: User; role: Role | null; division: Division | null }) {
  return (
    <div>
      <h2 style={styles.sectionTitle}>Profil Pengguna</h2>
      
      <div className="card">
        <div style={styles.profileItem}>
          <div style={styles.profileLabel}>Nama Lengkap</div>
          <div style={styles.profileValue}>{user.fullName}</div>
        </div>
        
        <div style={styles.profileItem}>
          <div style={styles.profileLabel}>Email</div>
          <div style={styles.profileValue}>{user.email}</div>
        </div>
        
        <div style={styles.profileItem}>
          <div style={styles.profileLabel}>Peran</div>
          <div style={styles.profileValue}>{role?.name || '-'}</div>
        </div>
        
        <div style={styles.profileItem}>
          <div style={styles.profileLabel}>Divisi</div>
          <div style={styles.profileValue}>{division?.name || '-'}</div>
        </div>
        
        <div style={styles.profileItem}>
          <div style={styles.profileLabel}>User ID</div>
          <div style={{ ...styles.profileValue, fontFamily: 'monospace', fontSize: '12px' }}>{user.id}</div>
        </div>
        
        <div style={styles.profileItem}>
          <div style={styles.profileLabel}>Bergabung Sejak</div>
          <div style={styles.profileValue}>{new Date(user.createdAt).toLocaleDateString('id-ID')}</div>
        </div>
      </div>

      <div style={{ marginTop: '24px', padding: '16px', background: '#fee2e2', borderRadius: '8px', borderLeft: '4px solid #ef4444' }}>
        <p style={{ margin: '0', fontSize: '13px', color: '#991b1b' }}>
          ⚠️ Password Anda tidak boleh dibagikan kepada siapa pun.
        </p>
      </div>
    </div>
  )
}

const styles = {
  container: {
    padding: '16px 12px 100px 12px',
    maxWidth: '1200px',
    margin: '0 auto',
  } as React.CSSProperties,
  tabNav: {
    display: 'flex',
    gap: '8px',
    marginBottom: '16px',
    borderBottom: '1px solid #e5e7eb',
    overflowX: 'auto',
    paddingBottom: '8px',
  } as React.CSSProperties,
  tabButton: {
    padding: '10px 16px',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    color: '#6b7280',
    borderBottom: '2px solid transparent',
    whiteSpace: 'nowrap',
    transition: 'all 0.2s',
  } as React.CSSProperties,
  tabButtonActive: {
    color: '#2563eb',
    borderBottomColor: '#2563eb',
  } as React.CSSProperties,
  content: {
    paddingBottom: '24px',
  } as React.CSSProperties,
  sectionTitle: {
    fontSize: '20px',
    fontWeight: '700',
    marginBottom: '16px',
    color: '#1f2937',
  } as React.CSSProperties,
  gridCards: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '12px',
  } as React.CSSProperties,
  statsLabel: {
    fontSize: '12px',
    color: '#6b7280',
    marginBottom: '8px',
    fontWeight: '500',
  } as React.CSSProperties,
  statsValue: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#1f2937',
  } as React.CSSProperties,
  cardTitle: {
    fontSize: '16px',
    fontWeight: '600',
    marginBottom: '16px',
    color: '#1f2937',
  } as React.CSSProperties,
  budgetItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '12px',
    marginBottom: '12px',
  } as React.CSSProperties,
  budgetLabel: {
    fontSize: '13px',
    color: '#6b7280',
  } as React.CSSProperties,
  budgetValue: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#1f2937',
  } as React.CSSProperties,
  emptyState: {
    textAlign: 'center',
    padding: '40px 20px',
  } as React.CSSProperties,
  emptyIcon: {
    fontSize: '48px',
    marginBottom: '16px',
  } as React.CSSProperties,
  emptyTitle: {
    fontSize: '16px',
    fontWeight: '600',
    marginBottom: '8px',
    color: '#1f2937',
  } as React.CSSProperties,
  emptyDesc: {
    fontSize: '13px',
    color: '#6b7280',
    margin: '0',
  } as React.CSSProperties,
  profileItem: {
    paddingBottom: '16px',
    marginBottom: '16px',
    borderBottom: '1px solid #e5e7eb',
  } as React.CSSProperties,
  profileLabel: {
    fontSize: '12px',
    color: '#6b7280',
    marginBottom: '6px',
    fontWeight: '500',
  } as React.CSSProperties,
  profileValue: {
    fontSize: '15px',
    fontWeight: '500',
    color: '#1f2937',
  } as React.CSSProperties,
}
