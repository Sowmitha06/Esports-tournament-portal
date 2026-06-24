import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Navbar.css'

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/players', label: 'Players' },
  { to: '/teams', label: 'Teams' },
  { to: '/tournaments', label: 'Tournaments' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/schedule', label: 'Schedule' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const { user, logout } = useAuth()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  const initials = user?.name
    ? user.name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()
    : '?'

  return (
    <nav className="navbar glass-strong">
      <NavLink to="/" className="nav-logo" onClick={() => setOpen(false)}>
        <span className="nav-logo-icon">⚡</span>
        NexArena
      </NavLink>

      <button className="nav-toggle" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
        ☰
      </button>

      <div className={`nav-links ${open ? 'open' : ''}`}>
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={() => setOpen(false)}
          >
            {item.label}
          </NavLink>
        ))}
        {user?.role === 'Team Manager' && (
          <NavLink
            to="/create-team"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={() => setOpen(false)}
          >
            Create Team
          </NavLink>
        )}
      </div>

      <div className="nav-right">
        {user && (
          <div className="nav-user">
            <span className="nav-avatar">{initials}</span>
            <span>{user.name}</span>
          </div>
        )}
        {user ? (
          <button className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.7rem' }} onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <button className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.7rem' }} onClick={() => navigate('/login')}>
            Login
          </button>
        )}
      </div>
    </nav>
  )
}
