# NexArena — Esports Tournament Portal

A React + Vite esports tournament portal with glassmorphism UI, role-based auth (Player / Team Manager / Admin), team creation, tournament registration, leaderboards, and schedules — all persisted in LocalStorage.

## Setup

```bash
npm install
npm run dev
```

Then open the printed local URL (usually http://localhost:5173).

## Demo accounts

| Role          | Username  | Password    |
|---------------|-----------|-------------|
| Admin         | admin     | admin123    |
| Team Manager  | manager   | manager123  |
| Player        | player    | player123   |

You can also register a new account from the Login page and choose any role.

## Key features

- **Auth** — LocalStorage-backed login/register with role selection, persisted session, logout.
- **Dashboard** — Live stat cards (players, teams, tournaments, registered teams, upcoming matches).
- **Players** — Searchable/filterable grid, player detail page, free-agent badge.
- **Teams** — Team grid + detail page with roster, win/loss record, win rate.
- **Create Team** *(Team Manager only)* — Pick free-agent players, name the team, upload a logo (stored as base64 in LocalStorage), instantly appears on Teams page and removes chosen players from the free-agent pool.
- **Tournaments** — Tournament grid with images, prize pool, date, status; detail page lets Team Managers/Admins register a team (duplicate registrations blocked).
- **Leaderboard** — Computed standings (3 pts/win) sorted by points then win rate.
- **Schedule** — Upcoming match cards with team logos.
- **Contact** — Validated contact form, saved to LocalStorage.

## Project structure

```
src/
  components/   Navbar, Layout, Footer, ProtectedRoute, StatCard, PlayerCard, TeamCard
  pages/        Home, Login, Dashboard, Players, PlayerDetail, Teams, TeamDetail,
                CreateTeam, Tournaments, TournamentDetail, Leaderboard, Schedule,
                Contact, NotFound
  data/         players.js, teams.js, tournaments.js (seed data), storage.js (LocalStorage helpers)
  context/      AuthContext.jsx
  App.jsx, main.jsx, index.css
```

## Notes

- All data seeds into LocalStorage on first load (`initStorage()` in `App.jsx`). Clear your browser's LocalStorage to reset to defaults.
- Player photos are real portraits from `randomuser.me`. Team logos are generated via DiceBear (shapes) so each team gets a unique, consistent mark; uploaded logos in Create Team are stored as base64 data URLs.
- Tournament cover images are from Unsplash.
