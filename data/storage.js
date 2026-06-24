import { seedPlayers } from '../data/players'
import { seedTeams } from '../data/teams'
import { seedTournaments, seedSchedule } from '../data/tournaments'

const KEYS = {
  players: 'na_players',
  teams: 'na_teams',
  tournaments: 'na_tournaments',
  schedule: 'na_schedule',
  users: 'na_users',
  currentUser: 'na_current_user',
}

export function initStorage() {
  // Force update latest seed data
  localStorage.setItem(KEYS.players, JSON.stringify(seedPlayers))
  localStorage.setItem(KEYS.teams, JSON.stringify(seedTeams))
  localStorage.setItem(KEYS.tournaments, JSON.stringify(seedTournaments))
  localStorage.setItem(KEYS.schedule, JSON.stringify(seedSchedule))

  if (!localStorage.getItem(KEYS.users)) {
    const defaultUsers = [
      {
        username: 'admin',
        password: 'admin123',
        role: 'Admin',
        name: 'Admin User',
      },
      {
        username: 'manager',
        password: 'manager123',
        role: 'Team Manager',
        name: 'Karthick',
      },
      {
        username: 'player',
        password: 'player123',
        role: 'Player',
        name: 'Arun Kumar',
      },
    ]

    localStorage.setItem(KEYS.users, JSON.stringify(defaultUsers))
  }
}

export function getPlayers() {
  return JSON.parse(localStorage.getItem(KEYS.players) || '[]')
}

export function savePlayers(players) {
  localStorage.setItem(KEYS.players, JSON.stringify(players))
}

export function getTeams() {
  return JSON.parse(localStorage.getItem(KEYS.teams) || '[]')
}

export function saveTeams(teams) {
  localStorage.setItem(KEYS.teams, JSON.stringify(teams))
}

export function getTournaments() {
  return JSON.parse(localStorage.getItem(KEYS.tournaments) || '[]')
}

export function saveTournaments(tournaments) {
  localStorage.setItem(KEYS.tournaments, JSON.stringify(tournaments))
}

export function getSchedule() {
  return JSON.parse(localStorage.getItem(KEYS.schedule) || '[]')
}

export function getUsers() {
  return JSON.parse(localStorage.getItem(KEYS.users) || '[]')
}

export function saveUsers(users) {
  localStorage.setItem(KEYS.users, JSON.stringify(users))
}

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem(KEYS.currentUser) || 'null')
}

export function setCurrentUser(user) {
  localStorage.setItem(KEYS.currentUser, JSON.stringify(user))
}

export function clearCurrentUser() {
  localStorage.removeItem(KEYS.currentUser)
}

export { KEYS }