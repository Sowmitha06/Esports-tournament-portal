import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="page" style={{ textAlign: 'center', paddingTop: '5rem' }}>
      <h1 style={{ fontSize: '3rem' }}>404</h1>
      <p style={{ color: 'var(--text-muted)', margin: '1rem 0 2rem' }}>This page doesn't exist in the arena.</p>
      <Link to="/" className="btn btn-primary">Back to Home</Link>
    </div>
  )
}
