import { useState } from 'react'
import { useAuth } from './auth/AuthContext.jsx'
import LoginPage from './pages/LoginPage.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Expenses from './pages/Expenses.jsx'
import SavingsGoals from './pages/SavingsGoals.jsx'
import Profile from './pages/Profile.jsx'
import Admin from './pages/Admin.jsx'

export default function App() {
  const { user, isAdmin, logout } = useAuth()
  const [tab, setTab] = useState('dashboard')

  if (!user) return <LoginPage />

  const tabs = [
    ['dashboard', 'Tableau de bord'],
    ['expenses', 'Dépenses'],
    ['goals', "Objectifs d'épargne"],
    ['profile', 'Profil'],
    ...(isAdmin ? [['admin', 'Admin']] : []),
  ]

  return (
    <div className="app">
      <header className="topbar">
        <strong>Mes finances</strong>
        <nav>
          {tabs.map(([key, label]) => (
            <button key={key} className={tab === key ? 'active' : ''} onClick={() => setTab(key)}>
              {label}
            </button>
          ))}
        </nav>
        <div className="who">
          <span>{user.email} ({user.role})</span>
          <button onClick={logout}>Déconnexion</button>
        </div>
      </header>
      <main>
        {tab === 'dashboard' && <Dashboard />}
        {tab === 'expenses' && <Expenses />}
        {tab === 'goals' && <SavingsGoals />}
        {tab === 'profile' && <Profile />}
        {tab === 'admin' && isAdmin && <Admin />}
      </main>
    </div>
  )
}
