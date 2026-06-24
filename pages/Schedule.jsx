import { useEffect, useState } from 'react'
import { getSchedule, getTeams } from '../data/storage'

export default function Schedule() {
  const [matches, setMatches] = useState([])
  const [teams, setTeams] = useState([])

  useEffect(() => {
    setMatches(getSchedule())
    setTeams(getTeams())
  }, [])

  function logoFor(name) {
    return teams.find((t) => t.name === name)?.logo
  }

  return (
    <div className="page">
      <div className="page-header fade-up">
        <h1>Schedule</h1>
        <p>Upcoming matches across all tournaments.</p>
      </div>

      <div className="grid grid-2">
        {matches.map((m) => (
          <div key={m.id} className="glass card fade-up">
            <span className="badge badge-purple">{m.tournament}</span>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '1.1rem 0' }}>
              <div style={{ textAlign: 'center', flex: 1 }}>
                <img src={logoFor(m.teamA)} alt={m.teamA} style={{ width: 50, height: 50, borderRadius: 10, margin: '0 auto 0.5rem' }} />
                <p style={{ fontSize: '0.85rem', fontWeight: 600 }}>{m.teamA}</p>
              </div>
              <span style={{ fontFamily: 'var(--font-display)', color: 'var(--text-muted)', padding: '0 0.8rem' }}>VS</span>
              <div style={{ textAlign: 'center', flex: 1 }}>
                <img src={logoFor(m.teamB)} alt={m.teamB} style={{ width: 50, height: 50, borderRadius: 10, margin: '0 auto 0.5rem' }} />
                <p style={{ fontSize: '0.85rem', fontWeight: 600 }}>{m.teamB}</p>
              </div>
            </div>
            <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>📅 {m.date} · ⏰ {m.time}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
