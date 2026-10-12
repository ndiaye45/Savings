import { useState } from 'react'
import { adminApi, usersApi } from '../api/endpoints.js'
import { ErrorBanner, useLoader } from '../components/ui.jsx'

export default function Admin() {
  const { data: users, error: loadError, loading, reload } = useLoader(usersApi.list)
  const [error, setError] = useState('')
  const [msg, setMsg] = useState('')

  async function hello() {
    setError(''); setMsg('')
    try { setMsg(await adminApi.hello()) } catch (err) { setError(err.message) }
  }

  async function resetPassword(u) {
    const pwd = prompt(`Nouveau mot de passe pour ${u.email} :`)
    if (!pwd) return
    setError(''); setMsg('')
    try { await usersApi.resetPassword(u.id, pwd); setMsg(`Mot de passe de ${u.email} réinitialisé.`) } catch (err) { setError(err.message) }
  }

  async function remove(u) {
    if (!confirm(`Supprimer ${u.email} ?`)) return
    setError(''); setMsg('')
    try { await usersApi.remove(u.id); reload() } catch (err) { setError(err.message) }
  }

  return (
    <section>
      <h2>Administration</h2>
      <p><button onClick={hello}>Tester /admin/hello</button></p>
      {msg && <div className="banner ok">{msg}</div>}
      <ErrorBanner error={error || loadError} />
      {loading && <p className="muted">Chargement…</p>}
      {users && (
        <table className="card">
          <thead><tr><th>ID</th><th>Prénom</th><th>Nom</th><th>Email</th><th>Rôle</th><th /></tr></thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td><td>{u.firstname}</td><td>{u.lastname}</td><td>{u.email}</td><td>{u.role}</td>
                <td className="actions">
                  <button onClick={() => resetPassword(u)}>Réinitialiser MDP</button>
                  <button className="danger" onClick={() => remove(u)}>Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  )
}
