import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getTournaments } from '../data/storage'

const statusBadge = (status) => {
  if (status === 'Registration Open') return 'badge-green'
  if (status === 'Upcoming') return 'badge-cyan'
  return 'badge-amber'
}

export default function Tournaments() {
  const [tournaments, setTournaments] = useState([])

  useEffect(() => {
    setTournaments(getTournaments())
  }, [])

  return (
    <div className="page">
      <div className="page-header fade-up">
        <h1>Tournaments</h1>
        <p>Compete in Tamil Nadu's top esports championships.</p>
      </div>

      <div className="grid grid-3">
        {tournaments.map((t) => (
          <Link to={`/tournament/${t.id}`} key={t.id} className="glass card fade-up" style={{ padding: 0, overflow: 'hidden', display: 'block' }}>
            <img src={t.image} alt={t.name} style={{ width: '100%', height: 160, objectFit: 'cover' }} />
            <div style={{ padding: '1.4rem' }}>
              <span className={`badge ${statusBadge(t.status)}`}>{t.status}</span>
              <h3 style={{ margin: '0.7rem 0 0.4rem', fontSize: '1.05rem' }}>{t.name}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Prize Pool: <strong style={{ color: 'var(--text-primary)' }}>{t.prizePool}</strong></p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{t.date} · {t.game}</p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.4rem' }}>{t.registeredTeams.length} team(s) registered</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
