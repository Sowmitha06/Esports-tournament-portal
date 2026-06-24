import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login, register } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({ username: '', password: '', name: '', role: 'Player' })
  const [error, setError] = useState('')

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (mode === 'login') {
      const res = login(form.username.trim(), form.password)
      if (!res.success) return setError(res.message)
    } else {
      if (!form.username.trim() || !form.password || !form.name.trim()) {
        return setError('All fields are required.')
      }
      const res = register(form.username.trim(), form.password, form.role, form.name.trim())
      if (!res.success) return setError(res.message)
    }
    const dest = location.state?.from || '/dashboard'
    navigate(dest, { replace: true })
  }

  return (
    <div className="page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '85vh' }}>
      <div className="glass-strong fade-up" style={{ padding: '2.4rem', width: '100%', maxWidth: 420 }}>
        <div style={{ textAlign: 'center', marginBottom: '1.6rem' }}>
          <div style={{
            width: 56, height: 56, borderRadius: 14, margin: '0 auto 0.9rem',
            background: 'linear-gradient(135deg, var(--purple), var(--cyan))',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem',
            boxShadow: 'var(--shadow-glow)',
          }}>⚡</div>
          <h1 style={{ fontSize: '1.5rem' }}>NexArena</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.3rem' }}>
            {mode === 'login' ? 'Sign in to your esports portal' : 'Create a new account'}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {mode === 'register' && (
            <div className="field">
              <label>Full Name</label>
              <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Arun Kumar" />
            </div>
          )}
          <div className="field">
            <label>Username</label>
            <input name="username" value={form.username} onChange={handleChange} placeholder="Enter username" autoComplete="username" />
          </div>
          <div className="field">
            <label>Password</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Enter password" autoComplete="current-password" />
          </div>
          {mode === 'register' && (
            <div className="field">
              <label>Role</label>
              <select name="role" value={form.role} onChange={handleChange}>
                <option>Player</option>
                <option>Team Manager</option>
                <option>Admin</option>
              </select>
            </div>
          )}

          {error && <p className="error-text" style={{ marginBottom: '1rem' }}>{error}</p>}

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.4rem' }}>
            {mode === 'login' ? 'Login' : 'Create Account'}
          </button>
        </form>

        <p style={{ textAlign: 'center', fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '1.2rem' }}>
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <span
            style={{ color: 'var(--cyan)', cursor: 'pointer', fontWeight: 600 }}
            onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError('') }}
          >
            {mode === 'login' ? 'Register' : 'Login'}
          </span>
        </p>

        {mode === 'login' && (
          <div className="glass" style={{ marginTop: '1.4rem', padding: '0.9rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            <strong style={{ color: 'var(--text-primary)' }}>Demo accounts:</strong><br />
            Admin → admin / admin123<br />
            Team Manager → manager / manager123<br />
            Player → player / player123
          </div>
        )}
      </div>
    </div>
  )
}
