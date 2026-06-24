import { createContext, useContext, useState, useEffect } from 'react'
import { getUsers, saveUsers, getCurrentUser, setCurrentUser, clearCurrentUser } from '../data/storage'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const existing = getCurrentUser()
    if (existing) setUser(existing)
    setLoading(false)
  }, [])

  function login(username, password) {
    const users = getUsers()
    const found = users.find(
      (u) => u.username === username && u.password === password
    )
    if (!found) return { success: false, message: 'Invalid username or password.' }
    setUser(found)
    setCurrentUser(found)
    return { success: true }
  }

  function register(username, password, role, name) {
    const users = getUsers()
    if (users.find((u) => u.username === username)) {
      return { success: false, message: 'Username already exists.' }
    }
    const newUser = { username, password, role, name }
    users.push(newUser)
    saveUsers(users)
    setUser(newUser)
    setCurrentUser(newUser)
    return { success: true }
  }

  function logout() {
    setUser(null)
    clearCurrentUser()
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
