import React, { createContext, useState, useEffect, useContext } from 'react'
import api from '../../infra/services/http/api'

interface User {
  id: number
  name: string
  email: string
  avatar_url: string | null
}
interface Authentication {
  user: User
  token: string
}

interface AuthContextData {
  signed: boolean
  user: User | null
  signIn(url: string, params: unknown): Promise<void>
  signOut(): void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    async function loadStorageData () {
      const user = localStorage.getItem('@RAuth:user')
      const token = localStorage.getItem('@RAuth:token')

      if (user && token) {
        api.defaults.headers.Authorization = `token ${token}`

        setUser(JSON.parse(user))
      }
    }
    loadStorageData()
  }, [])

  async function signIn (url: string, params: unknown) {
    const { data } = await api.get<Authentication>(url, { params })

    setTimeout(() => {
      setUser(data.user)
    }, 3000)

    // Set toke for all request
    api.defaults.headers.Authorization = `Token ${data.token}`

    localStorage.setItem('@RAuth:user', JSON.stringify(data.user))
    localStorage.setItem('@RAuth:token', data.token)
  }

  function signOut () {
    localStorage.clear()
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook próprio
export function useAuth () {
  const context = useContext(AuthContext)

  return context
}