import { Link } from 'react-router-dom'

export default function TeamCard({ team }) {
  const winRate = team.wins + team.losses > 0
    ? Math.round((team.wins / (team.wins + team.losses)) * 100)
    : 0

  return (
    <Link to={`/team/${team.id}`} className="glass card fade-up" style={{ display: 'block' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
        <img src={team.logo} alt={team.name} style={{ width: 58, height: 58, borderRadius: 12, background: 'rgba(255,255,255,0.05)' }} />
        <div>
          <h3 style={{ fontSize: '1.05rem' }}>{team.name}</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Captain: {team.captain}</p>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <span className="badge badge-purple">{team.game}</span>
        <span className="badge badge-green">{team.wins}W</span>
        <span className="badge badge-amber">{team.losses}L</span>
        <span className="badge badge-cyan">{winRate}% WR</span>
      </div>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginTop: '0.9rem' }}>
        {team.players?.length || 0} player{team.players?.length === 1 ? '' : 's'} on roster
      </p>
    </Link>
  )
}
