import React from 'react'
import { User } from '../db/seed'

interface HeaderProps {
  user: User | null
  onLogout: () => void
}

export default function Header({ user, onLogout }: HeaderProps) {
  if (!user) return null

  return (
    <div className="header">
      <div className="header-content">
        <div>
          <div className="header-title">SmartProcurement</div>
          <div className="header-subtitle">Halo, {user.fullName}</div>
        </div>
        <button
          onClick={onLogout}
          className="btn btn-secondary btn-sm"
        >
          Keluar
        </button>
      </div>
    </div>
  )
}