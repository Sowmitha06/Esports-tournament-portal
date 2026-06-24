import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getTeams } from '../data/storage'
import { useAuth } from '../context/AuthContext'
import TeamCard from '../components/TeamCard'

export default function Teams() {
  const [teams, setTeams] = useState([])
  const { user } = useAuth()

  useEffect(() => {
    setTeams(getTeams())
  }, [])

  return (
    <div className="page">
      <div className="page-header fade-up" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1>Teams</h1>
          <p>Tamil Nadu's competing esports rosters.</p>
        </div>
        {user?.role === 'Team Manager' && (
          <Link to="/create-team" className="btn btn-primary">+ Create Team</Link>
        )}
      </div>

      <div className="grid grid-3">
        {teams.map((t) => <TeamCard key={t.id} team={t} />)}
      </div>
    </div>
  )
}
