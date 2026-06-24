import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getPlayers, getTeams } from '../data/storage'

export default function PlayerDetail() {
  const { id } = useParams()
  const [player, setPlayer] = useState(null)
  const [team, setTeam] = useState(null)

  useEffect(() => {
    const players = getPlayers()
    const found = players.find((p) => p.id === id)
    setPlayer(found || null)
    if (found?.team) {
      const teams = getTeams()
      setTeam(teams.find((t) => t.name === found.team) || null)
    }
  }, [id])

  if (!player) {
    return (
      <div className="page">
        <p>Player not found. <Link to="/players" style={{ color: 'var(--cyan)' }}>Back to players</Link></p>
      </div>
    )
  }

  return (
    <div className="page">
      <div className="glass-strong card fade-up" style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center' }}>
        <img src={player.image} alt={player.name} style={{ width: 130, height: 130, borderRadius: '50%', objectFit: 'cover', margin: '0 auto 1.2rem', border: '4px solid rgba(124,58,237,0.5)' }} />
        <h1 style={{ fontSize: '1.6rem' }}>{player.name}</h1>
        <p style={{ color: 'var(--text-muted)', margin: '0.5rem 0 1rem' }}>{player.role} · {player.game}</p>
        <span className={`badge ${player.team ? 'badge-cyan' : 'badge-amber'}`}>{player.team || 'Free Agent'}</span>

        {team && (
          <div className="glass" style={{ marginTop: '1.6rem', padding: '1.2rem', textAlign: 'left' }}>
            <h3 style={{ fontSize: '1rem', marginBottom: '0.6rem' }}>Team Info</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Captain: {team.captain}</p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Record: {team.wins}W - {team.losses}L</p>
            <Link to={`/team/${team.id}`} className="btn btn-outline" style={{ marginTop: '1rem', fontSize: '0.7rem' }}>View Team</Link>
          </div>
        )}

        <div style={{ marginTop: '1.6rem' }}>
          <Link to="/players" className="btn btn-outline" style={{ fontSize: '0.7rem' }}>← Back to Players</Link>
        </div>
      </div>
    </div>
  )
}
