import { createContext, useContext, useState, useCallback } from 'react'
import { authApi, usersApi } from '../api/endpoints.js'
import { tokenStore } from '../api/client.js'

const AuthContext = createContext(null)

// Le JWT du back contient : sub (email), userId, role. On le décode (sans le vérifier :
// la vérification est faite par le serveur) pour connaître l'utilisateur courant,
// car l'API n'a pas d'endpoint "/me" et GET /users/{id} est réservé aux ADMIN.
function decodeToken(token) {
  try {
    const payload = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
    const json = decodeURIComponent(
      atob(payload).split('').map((c) => '%' + c.charCodeAt(0).toString(16).padStart(2, '0')).join(''),
    )
    const p = JSON.parse(json)
    return { id: p.userId, email: p.sub, role: p.role }
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const t = tokenStore.get()
    return t ? decodeToken(t) : null
  })

  const login = useCallback(async (email, password) => {
    const token = await authApi.login(email, password)
    tokenStore.set(token)
    setUser(decodeToken(token))
  }, [])

  const register = useCallback(async (data) => {
    await usersApi.create(data)
    await login(data.email, data.password)
  }, [login])

  const logout = useCallback(() => {
    tokenStore.clear()
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, isAdmin: user?.role === 'ADMIN', login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
