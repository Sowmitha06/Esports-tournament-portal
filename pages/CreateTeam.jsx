import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getPlayers, savePlayers, getTeams, saveTeams } from '../data/storage'
import { useAuth } from '../context/AuthContext'

export default function CreateTeam() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [freeAgents, setFreeAgents] = useState([])
  const [selected, setSelected] = useState([])
  const [teamName, setTeamName] = useState('')
  const [game, setGame] = useState('Valorant')
  const [logoPreview, setLogoPreview] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    setFreeAgents(getPlayers().filter((p) => !p.team))
  }, [])

  function toggleSelect(id) {
    setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])
  }

  function handleLogoUpload(e) {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setLogoPreview(reader.result)
    reader.readAsDataURL(file)
  }

  function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!teamName.trim()) return setError('Team name is required.')
    if (selected.length === 0) return setError('Select at least one player.')

    const teams = getTeams()
    if (teams.find((t) => t.name.toLowerCase() === teamName.trim().toLowerCase())) {
      return setError('A team with this name already exists.')
    }

    const players = getPlayers()
    const chosenPlayers = players.filter((p) => selected.includes(p.id))
    const captain = chosenPlayers[0]?.name || ''

    const newTeam = {
      id: 't' + Date.now(),
      name: teamName.trim(),
      captain,
      players: chosenPlayers.map((p) => p.name),
      wins: 0,
      losses: 0,
      game,
      logo: logoPreview || `https://api.dicebear.com/7.x/shapes/svg?seed=${encodeURIComponent(teamName)}&backgroundColor=7c3aed,06b6d4`,
    }

    saveTeams([...teams, newTeam])

    const updatedPlayers = players.map((p) =>
      selected.includes(p.id) ? { ...p, team: newTeam.name } : p
    )
    savePlayers(updatedPlayers)

    setSuccess(`Team "${newTeam.name}" created successfully!`)
    setTimeout(() => navigate('/teams'), 900)
  }

  return (
    <div className="page">
      <div className="page-header fade-up">
        <h1>Create Team</h1>
        <p>Build a new roster from available free agents, {user?.name}.</p>
      </div>

      <form onSubmit={handleSubmit} className="glass-strong card fade-up" style={{ maxWidth: 760, margin: '0 auto' }}>
        <div className="grid grid-2">
          <div className="field">
            <label>Team Name</label>
            <input value={teamName} onChange={(e) => setTeamName(e.target.value)} placeholder="e.g. Vellore Vipers" />
          </div>
          <div className="field">
            <label>Game</label>
            <select value={game} onChange={(e) => setGame(e.target.value)}>
              <option>Valorant</option>
              <option>BGMI</option>
            </select>
          </div>
        </div>

        <div className="field">
          <label>Team Logo</label>
          <input type="file" accept="image/*" onChange={handleLogoUpload} />
          {logoPreview && (
            <img src={logoPreview} alt="logo preview" style={{ width: 70, height: 70, borderRadius: 12, marginTop: '0.6rem', objectFit: 'cover' }} />
          )}
        </div>

        <div className="field">
          <label>Select Players (free agents only)</label>
          <div className="grid grid-3" style={{ marginTop: '0.4rem' }}>
            {freeAgents.map((p) => {
              const isSelected = selected.includes(p.id)
              return (
                <div
                  key={p.id}
                  onClick={() => toggleSelect(p.id)}
                  className="glass card"
                  style={{
                    cursor: 'pointer', textAlign: 'center', padding: '1rem',
                    borderColor: isSelected ? 'var(--cyan)' : undefined,
                    background: isSelected ? 'rgba(6,182,212,0.1)' : undefined,
                  }}
                >
                  <img src={p.image} alt={p.name} style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover', margin: '0 auto 0.5rem' }} />
                  <p style={{ fontSize: '0.88rem', fontWeight: 600 }}>{p.name}</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{p.role}</p>
                  {isSelected && <span className="badge badge-cyan" style={{ marginTop: '0.5rem' }}>Selected</span>}
                </div>
              )
            })}
          </div>
          {freeAgents.length === 0 && <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>No free agents available right now.</p>}
        </div>

        {error && <p className="error-text" style={{ marginBottom: '1rem' }}>{error}</p>}
        {success && <p className="success-banner" style={{ marginBottom: '1rem' }}>{success}</p>}

        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Create Team</button>
      </form>
    </div>
  )
}
