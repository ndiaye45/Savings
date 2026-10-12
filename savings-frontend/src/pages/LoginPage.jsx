import { useState } from 'react'
import { useAuth } from '../auth/AuthContext.jsx'
import { ErrorBanner, Field } from '../components/ui.jsx'

export default function LoginPage() {
  const { login, register } = useAuth()
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({ firstname: '', lastname: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  async function submit(e) {
    e.preventDefault()
    setError('')
    setBusy(true)
    try {
      if (mode === 'login') await login(form.email, form.password)
      else await register(form)
    } catch (err) {
      // Le back lève des RuntimeException non gérées -> 500 sans message exploitable.
      if (err.status === 500) {
        setError(mode === 'login' ? 'Email ou mot de passe incorrect.' : 'Inscription impossible (email déjà utilisé ?).')
      } else setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="auth-wrap">
      <form className="card auth" onSubmit={submit}>
        <h1>{mode === 'login' ? 'Connexion' : 'Créer un compte'}</h1>
        <ErrorBanner error={error} />
        {mode === 'register' && (
          <>
            <Field label="Prénom" value={form.firstname} onChange={set('firstname')} required />
            <Field label="Nom" value={form.lastname} onChange={set('lastname')} required />
          </>
        )}
        <Field label="Email" type="email" value={form.email} onChange={set('email')} required />
        <Field label="Mot de passe" type="password" value={form.password} onChange={set('password')} required />
        <button className="primary" disabled={busy}>{mode === 'login' ? 'Se connecter' : "S'inscrire"}</button>
        <p className="muted">
          {mode === 'login' ? 'Pas de compte ? ' : 'Déjà inscrit ? '}
          <a href="#" onClick={(e) => { e.preventDefault(); setError(''); setMode(mode === 'login' ? 'register' : 'login') }}>
            {mode === 'login' ? "S'inscrire" : 'Se connecter'}
          </a>
        </p>
      </form>
    </div>
  )
}
