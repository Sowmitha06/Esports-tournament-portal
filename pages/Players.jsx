import { useEffect, useState } from 'react'
import { getPlayers } from '../data/storage'
import PlayerCard from '../components/PlayerCard'

export default function Players() {
  const [players, setPlayers] = useState([])
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  useEffect(() => {
    setPlayers(getPlayers())
  }, [])

  const filtered = players.filter((p) => {
    const matchesFilter = filter === 'all' || (filter === 'free' ? !p.team : p.team)
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <div className="page">
      <div className="page-header fade-up">
        <h1>Players</h1>
        <p>Browse every registered player across the league.</p>
      </div>

      <div className="glass card fade-up" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.6rem' }}>
        <input
          placeholder="Search players..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1, minWidth: 200, background: 'rgba(255,255,255,0.05)',
            border: '1px solid var(--glass-border)', borderRadius: 10, padding: '0.7rem 1rem',
            color: 'var(--text-primary)', outline: 'none',
          }}
        />
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {['all', 'team', 'free'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={f === filter ? 'btn btn-primary' : 'btn btn-outline'}
              style={{ padding: '0.6rem 1.1rem', fontSize: '0.7rem' }}
            >
              {f === 'all' ? 'All' : f === 'team' ? 'On Team' : 'Free Agents'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-4">
        {filtered.map((p) => <PlayerCard key={p.id} player={p} />)}
      </div>
      {filtered.length === 0 && <p style={{ color: 'var(--text-muted)', marginTop: '2rem' }}>No players match your search.</p>}
    </div>
  )
}
