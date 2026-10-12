import { useEffect, useState } from 'react'
import { usersApi } from '../api/endpoints.js'
import { useAuth } from '../auth/AuthContext.jsx'
import { ErrorBanner, Field } from '../components/ui.jsx'

export default function Profile() {
  const { user, logout } = useAuth()
  const [info, setInfo] = useState({ firstname: '', lastname: '', email: user.email })
  const [pwd, setPwd] = useState({ currentPassword: '', newPassword: '' })
  const [msg, setMsg] = useState('')
  const [error, setError] = useState('')

  // GET /users/{id} est réservé aux ADMIN : pour un USER on garde juste l'email du JWT.
  useEffect(() => {
    usersApi.get(user.id).then((u) => setInfo({ firstname: u.firstname ?? '', lastname: u.lastname ?? '', email: u.email })).catch(() => {})
  }, [user.id])

  async function saveInfo(e) {
    e.preventDefault()
    setMsg(''); setError('')
    try {
      await usersApi.update(user.id, info)
      if (info.email !== user.email) {
        // Le JWT contient l'ancien email : il n'est plus valable, on se reconnecte.
        alert('Email modifié : reconnecte-toi avec le nouvel email.')
        logout()
      } else setMsg('Profil mis à jour.')
    } catch (err) { setError(err.message) }
  }

  async function savePwd(e) {
    e.preventDefault()
    setMsg(''); setError('')
    try {
      await usersApi.changePassword(user.id, pwd.currentPassword, pwd.newPassword)
      setPwd({ currentPassword: '', newPassword: '' })
      setMsg('Mot de passe modifié.')
    } catch (err) {
      setError(err.status === 500 ? 'Mot de passe actuel incorrect.' : err.message)
    }
  }

  async function deleteAccount() {
    if (!confirm('Supprimer définitivement ton compte ?')) return
    try { await usersApi.remove(user.id); logout() } catch (err) { setError(err.message) }
  }

  return (
    <section>
      <h2>Profil</h2>
      {msg && <div className="banner ok">{msg}</div>}
      <ErrorBanner error={error} />
      <div className="two-col">
        <form className="card stack" onSubmit={saveInfo}>
          <h3>Informations</h3>
          <Field label="Prénom" value={info.firstname} onChange={(e) => setInfo({ ...info, firstname: e.target.value })} required />
          <Field label="Nom" value={info.lastname} onChange={(e) => setInfo({ ...info, lastname: e.target.value })} required />
          <Field label="Email" type="email" value={info.email} onChange={(e) => setInfo({ ...info, email: e.target.value })} required />
          <button className="primary">Enregistrer</button>
        </form>
        <form className="card stack" onSubmit={savePwd}>
          <h3>Changer le mot de passe</h3>
          <Field label="Mot de passe actuel" type="password" value={pwd.currentPassword} onChange={(e) => setPwd({ ...pwd, currentPassword: e.target.value })} required />
          <Field label="Nouveau mot de passe" type="password" value={pwd.newPassword} onChange={(e) => setPwd({ ...pwd, newPassword: e.target.value })} required />
          <button className="primary">Changer</button>
          <hr />
          <button type="button" className="danger" onClick={deleteAccount}>Supprimer mon compte</button>
        </form>
      </div>
    </section>
  )
}
