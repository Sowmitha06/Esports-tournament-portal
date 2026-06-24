import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getTournaments, saveTournaments, getTeams } from '../data/storage'
import { useAuth } from '../context/AuthContext'

export default function TournamentDetail() {
  const { id } = useParams()
  const { user } = useAuth()
  const [tournament, setTournament] = useState(null)
  const [teams, setTeams] = useState([])
  const [selectedTeam, setSelectedTeam] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  function load() {
    const tournaments = getTournaments()
    const found = tournaments.find((t) => t.id === id)
    setTournament(found || null)
    setTeams(getTeams())
  }

  useEffect(() => { load() }, [id])

  function handleRegister(e) {
    e.preventDefault()
    setError('')
    setMessage('')
    if (!selectedTeam) return setError('Please select a team.')

    const tournaments = getTournaments()
    const idx = tournaments.findIndex((t) => t.id === id)
    if (idx === -1) return

    if (tournaments[idx].registeredTeams.includes(selectedTeam)) {
      return setError(`${selectedTeam} is already registered for this tournament.`)
    }

    tournaments[idx].registeredTeams = [...tournaments[idx].registeredTeams, selectedTeam]
    saveTournaments(tournaments)
    setMessage(`${selectedTeam} successfully registered!`)
    setSelectedTeam('')
    load()
  }

  if (!tournament) {
    return (
      <div className="page">
        <p>Tournament not found. <Link to="/tournaments" style={{ color: 'var(--cyan)' }}>Back to tournaments</Link></p>
      </div>
    )
  }

  const canRegister = user?.role === 'Team Manager' || user?.role === 'Admin'
  const availableTeams = teams.filter((t) => !tournament.registeredTeams.includes(t.name))

  return (
    <div className="page">
      <div className="glass-strong card fade-up" style={{ padding: 0, overflow: 'hidden', marginBottom: '2rem' }}>
        <img src={tournament.image} alt={tournament.name} style={{ width: '100%', height: 260, objectFit: 'cover' }} />
        <div style={{ padding: '1.8rem' }}>
          <span className="badge badge-cyan">{tournament.status}</span>
          <h1 style={{ margin: '0.8rem 0 0.5rem' }}>{tournament.name}</h1>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            <span>💰 Prize Pool: <strong style={{ color: 'var(--text-primary)' }}>{tournament.prizePool}</strong></span>
            <span>📅 {tournament.date}</span>
            <span>🎮 {tournament.game}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-2">
        <div className="glass card fade-up">
          <h3 style={{ marginBottom: '1rem' }}>Registered Teams</h3>
          {tournament.registeredTeams.length === 0 && <p style={{ color: 'var(--text-muted)' }}>No teams registered yet.</p>}
          {tournament.registeredTeams.map((name) => (
            <div key={name} style={{ padding: '0.6rem 0', borderBottom: '1px solid var(--glass-border)' }}>{name}</div>
          ))}
        </div>

        <div className="glass card fade-up">
          <h3 style={{ marginBottom: '1rem' }}>Register a Team</h3>
          {!canRegister && <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Only Team Managers or Admins can register a team.</p>}
          {canRegister && (
            <form onSubmit={handleRegister}>
              <div className="field">
                <label>Select Team</label>
                <select value={selectedTeam} onChange={(e) => setSelectedTeam(e.target.value)}>
                  <option value="">-- Choose a team --</option>
                  {availableTeams.map((t) => (
                    <option key={t.id} value={t.name}>{t.name}</option>
                  ))}
                </select>
              </div>
              {error && <p className="error-text" style={{ marginBottom: '1rem' }}>{error}</p>}
              {message && <p className="success-banner" style={{ marginBottom: '1rem' }}>{message}</p>}
              <button type="submit" className="btn btn-primary" disabled={availableTeams.length === 0}>Register</button>
              {availableTeams.length === 0 && <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.6rem' }}>All teams are already registered.</p>}
            </form>
          )}
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <Link to="/tournaments" className="btn btn-outline" style={{ fontSize: '0.7rem' }}>← Back to Tournaments</Link>
      </div>
    </div>
  )
}
