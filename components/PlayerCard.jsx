import { Link } from 'react-router-dom'

export default function PlayerCard({ player }) {
  return (
    <Link to={`/player/${player.id}`} className="glass card fade-up" style={{ display: 'block', textAlign: 'center' }}>
      <img
        src={player.image}
        alt={player.name}
        style={{
          width: 88, height: 88, borderRadius: '50%',
          objectFit: 'cover', margin: '0 auto 0.9rem',
          border: '3px solid rgba(124,58,237,0.5)',
        }}
      />
      <h3 style={{ fontSize: '1.05rem', fontFamily: 'var(--font-body)', fontWeight: 600 }}>{player.name}</h3>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', margin: '0.3rem 0 0.7rem' }}>{player.role} · {player.game}</p>
      <span className={`badge ${player.team ? 'badge-cyan' : 'badge-amber'}`}>
        {player.team ? player.team : 'Free Agent'}
      </span>
    </Link>
  )
}
