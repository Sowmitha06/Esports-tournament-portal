import { useEffect, useState } from 'react'
import { getPlayers, getTeams, getTournaments, getSchedule } from '../data/storage'
import { useAuth } from '../context/AuthContext'
import StatCard from '../components/StatCard'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  const { user } = useAuth()
  const [stats, setStats] = useState(null)
  const [upcoming, setUpcoming] = useState([])

  useEffect(() => {
    const players = getPlayers()
    const teams = getTeams()
    const tournaments = getTournaments()
    const schedule = getSchedule()
    const registeredTeams = new Set(tournaments.flatMap((t) => t.registeredTeams)).size

    setStats({
      players: players.length,
      teams: teams.length,
      tournaments: tournaments.length,
      registeredTeams,
      matches: schedule.length,
    })
    setUpcoming(schedule.slice(0, 3))
  }, [])

  if (!stats) return <div className="loader-wrap"><div className="spinner" /></div>

  return (
    <div className="page">
      <div className="page-header fade-up">
        <h1>Welcome back, {user?.name}</h1>
        <p>Role: {user?.role} · Here's what's happening across the league.</p>
      </div>

      <div className="grid grid-5">
        <StatCard icon="🎮" label="Total Players" value={stats.players} accent="purple" />
        <StatCard icon="🛡️" label="Total Teams" value={stats.teams} accent="cyan" />
        <StatCard icon="🏆" label="Total Tournaments" value={stats.tournaments} accent="green" />
        <StatCard icon="📋" label="Registered Teams" value={stats.registeredTeams} accent="amber" />
        <StatCard icon="📅" label="Upcoming Matches" value={stats.matches} accent="purple" />
      </div>

      <div className="glass card fade-up" style={{ marginTop: '2rem' }}>
        <h3 style={{ marginBottom: '1.2rem' }}>Next Up</h3>
        {upcoming.map((m) => (
          <div key={m.id} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '0.8rem 0', borderBottom: '1px solid var(--glass-border)',
          }}>
            <span>{m.teamA} <span style={{ color: 'var(--text-muted)' }}>vs</span> {m.teamB}</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{m.date} · {m.time}</span>
          </div>
        ))}
        <Link to="/schedule" className="btn btn-outline" style={{ marginTop: '1.2rem', fontSize: '0.7rem' }}>View Full Schedule</Link>
      </div>
    </div>
  )
}
