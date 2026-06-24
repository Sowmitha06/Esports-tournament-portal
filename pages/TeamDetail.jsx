import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getTeams, getPlayers } from '../data/storage'

export default function TeamDetail() {
  const { id } = useParams()
  const [team, setTeam] = useState(null)
  const [roster, setRoster] = useState([])

  useEffect(() => {
    const teams = getTeams()
    const found = teams.find((t) => t.id === id)
    setTeam(found || null)
    if (found) {
      const players = getPlayers()
      setRoster(players.filter((p) => p.team === found.name))
    }
  }, [id])

  if (!team) {
    return (
      <div className="page">
        <p>Team not found. <Link to="/teams" style={{ color: 'var(--cyan)' }}>Back to teams</Link></p>
      </div>
    )
  }

  const winRate = team.wins + team.losses > 0 ? Math.round((team.wins / (team.wins + team.losses)) * 100) : 0

  return (
    <div className="page">
      <div className="glass-strong card fade-up" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '1.4rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <img src={team.logo} alt={team.name} style={{ width: 90, height: 90, borderRadius: 16 }} />
          <div>
            <h1 style={{ fontSize: '1.7rem' }}>{team.name}</h1>
            <p style={{ color: 'var(--text-muted)', margin: '0.4rem 0' }}>Captain: {team.captain} · {team.game}</p>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span className="badge badge-green">{team.wins}W</span>
              <span className="badge badge-amber">{team.losses}L</span>
              <span className="badge badge-cyan">{winRate}% Win Rate</span>
            </div>
          </div>
        </div>
      </div>

      <h3 style={{ marginBottom: '1.2rem' }}>Roster</h3>
      <div className="grid grid-4">
        {roster.map((p) => (
          <div key={p.id} className="glass card" style={{ textAlign: 'center' }}>
            <img src={p.image} alt={p.name} style={{ width: 70, height: 70, borderRadius: '50%', objectFit: 'cover', margin: '0 auto 0.7rem' }} />
            <p style={{ fontWeight: 600 }}>{p.name}</p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{p.role}</p>
          </div>
        ))}
        {roster.length === 0 && <p style={{ color: 'var(--text-muted)' }}>No roster data available.</p>}
      </div>

      <div style={{ marginTop: '2rem' }}>
        <Link to="/teams" className="btn btn-outline" style={{ fontSize: '0.7rem' }}>← Back to Teams</Link>
      </div>
    </div>
  )
}
