import { useEffect, useState } from 'react'
import { getTeams } from '../data/storage'

export default function Leaderboard() {
  const [teams, setTeams] = useState([])

  useEffect(() => {
    const data = getTeams().map((t) => {
      const played = t.wins + t.losses
      const winRate = played > 0 ? Math.round((t.wins / played) * 100) : 0
      const points = t.wins * 3
      return { ...t, played, winRate, points }
    })
    data.sort((a, b) => b.points - a.points || b.winRate - a.winRate)
    setTeams(data)
  }, [])

  return (
    <div className="page">
      <div className="page-header fade-up">
        <h1>Leaderboard</h1>
        <p>Standings across all teams — 3 points per win.</p>
      </div>

      <div className="glass card fade-up" style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 560 }}>
          <thead>
            <tr style={{ textAlign: 'left', color: 'var(--text-muted)', fontSize: '0.78rem', textTransform: 'uppercase' }}>
              <th style={{ padding: '0.7rem' }}>Rank</th>
              <th style={{ padding: '0.7rem' }}>Team</th>
              <th style={{ padding: '0.7rem' }}>Played</th>
              <th style={{ padding: '0.7rem' }}>Wins</th>
              <th style={{ padding: '0.7rem' }}>Losses</th>
              <th style={{ padding: '0.7rem' }}>Win Rate</th>
              <th style={{ padding: '0.7rem' }}>Points</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((t, i) => (
              <tr key={t.id} style={{ borderTop: '1px solid var(--glass-border)' }}>
                <td style={{ padding: '0.8rem 0.7rem', fontFamily: 'var(--font-display)', color: i < 3 ? 'var(--cyan)' : undefined }}>#{i + 1}</td>
                <td style={{ padding: '0.8rem 0.7rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <img src={t.logo} alt={t.name} style={{ width: 30, height: 30, borderRadius: 8 }} />
                  {t.name}
                </td>
                <td style={{ padding: '0.8rem 0.7rem' }}>{t.played}</td>
                <td style={{ padding: '0.8rem 0.7rem', color: 'var(--success)' }}>{t.wins}</td>
                <td style={{ padding: '0.8rem 0.7rem', color: 'var(--danger)' }}>{t.losses}</td>
                <td style={{ padding: '0.8rem 0.7rem' }}>{t.winRate}%</td>
                <td style={{ padding: '0.8rem 0.7rem', fontWeight: 700 }}>{t.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
