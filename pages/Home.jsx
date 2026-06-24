import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Home() {
  const { user } = useAuth()

  return (
    <div className="page" style={{ textAlign: 'center', paddingTop: '4rem' }}>
      <div className="fade-up">
        <span className="badge badge-cyan" style={{ marginBottom: '1.2rem' }}>Tamil Nadu's Premier Esports League</span>
        <h1 style={{
          fontSize: 'clamp(2.2rem, 6vw, 4rem)',
          margin: '1rem 0',
          background: 'linear-gradient(90deg, #c4b5fd, #67e8f9)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
        }}>
          NEXARENA
        </h1>
        <p style={{ color: 'var(--text-muted)', maxWidth: 560, margin: '0 auto 2rem', fontSize: '1.05rem' }}>
          Compete, manage, and rise through the ranks of South India's most competitive Valorant and BGMI tournaments.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to={user ? '/dashboard' : '/login'} className="btn btn-primary">
            {user ? 'Go to Dashboard' : 'Enter Portal'}
          </Link>
          <Link to="/tournaments" className="btn btn-outline">View Tournaments</Link>
        </div>
      </div>

      <div className="grid grid-3" style={{ marginTop: '4rem', textAlign: 'left' }}>
        <div className="glass card fade-up">
          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>🏆 Compete</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Register your team for Valorant and BGMI tournaments across Tamil Nadu.</p>
        </div>
        <div className="glass card fade-up">
          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>🛡️ Manage</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Team managers can build rosters from free-agent players in real time.</p>
        </div>
        <div className="glass card fade-up">
          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>📊 Track</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Leaderboards, schedules, and stats updated live for every team.</p>
        </div>
      </div>
    </div>
  )
}
