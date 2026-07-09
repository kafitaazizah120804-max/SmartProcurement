import React, { useEffect, useState } from 'react'
import db from './db/seed'

export default function App() {
  const [users, setUsers] = useState<any[]>([])

  useEffect(() => {
    let mounted = true
    db.table('users').toArray().then(data => {
      if (mounted) setUsers(data)
    })
    return () => { mounted = false }
  }, [])

  return (
    <div style={{ fontFamily: 'Inter, system-ui, Arial', padding: 24 }}>
      <h1>SmartProcurement — Demo</h1>
      <p>This is a local-first prototype demo. Demo accounts are seeded into IndexedDB on first load.</p>

      <section style={{ marginTop: 16 }}>
        <h2>Demo users</h2>
        <table style={{ borderCollapse: 'collapse', width: '100%', maxWidth: 800 }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid #ddd' }}>Name</th>
              <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid #ddd' }}>Email</th>
              <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid #ddd' }}>Password (demo)</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td style={{ padding: 8, borderBottom: '1px solid #f2f2f2' }}>{u.fullName}</td>
                <td style={{ padding: 8, borderBottom: '1px solid #f2f2f2' }}>{u.email}</td>
                <td style={{ padding: 8, borderBottom: '1px solid #f2f2f2' }}>{u.password}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section style={{ marginTop: 24 }}>
        <h2>Next steps</h2>
        <ol>
          <li>Use the seeded accounts to build a simple login form (authenticate against db.users).</li>
          <li>Implement the UI flows: create request, review, approval, purchase recording, and reports.</li>
        </ol>
      </section>
    </div>
  )
}
