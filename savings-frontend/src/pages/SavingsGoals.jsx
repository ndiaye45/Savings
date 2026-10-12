import { useState } from 'react'
import { goalsApi } from '../api/endpoints.js'
import { ErrorBanner, Field, dateFr, money, useLoader } from '../components/ui.jsx'

const empty = { name: '', targetAmount: '', deadline: '' }

export default function SavingsGoals() {
  const { data: goals, error: loadError, loading, reload } = useLoader(goalsApi.list)
  const [form, setForm] = useState(empty)
  const [editingId, setEditingId] = useState(null)
  const [error, setError] = useState('')
  const [deposits, setDeposits] = useState({}) // id -> montant saisi
  const [progress, setProgress] = useState({}) // id -> réponse /progress

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  async function submit(e) {
    e.preventDefault()
    setError('')
    // Le back valide aussi currentAmount (@NotNull) ; sa valeur est ignorée à la mise à jour.
    const payload = { name: form.name, targetAmount: Number(form.targetAmount), currentAmount: 0, deadline: form.deadline }
    try {
      if (editingId) await goalsApi.update(editingId, payload)
      else await goalsApi.create(payload)
      setForm(empty)
      setEditingId(null)
      reload()
    } catch (err) { setError(err.message) }
  }

  async function deposit(id) {
    setError('')
    try {
      await goalsApi.deposit(id, deposits[id])
      setDeposits({ ...deposits, [id]: '' })
      setProgress((p) => { const { [id]: _, ...rest } = p; return rest })
      reload()
    } catch (err) { setError(err.message) }
  }

  async function showProgress(id) {
    setError('')
    try { setProgress({ ...progress, [id]: await goalsApi.progress(id) }) } catch (err) { setError(err.message) }
  }

  async function remove(id) {
    if (!confirm('Supprimer cet objectif ?')) return
    setError('')
    try { await goalsApi.remove(id); reload() } catch (err) { setError(err.message) }
  }

  return (
    <section>
      <h2>Objectifs d'épargne</h2>
      <form className="card form-row" onSubmit={submit}>
        <Field label="Nom" value={form.name} onChange={set('name')} required />
        <Field label="Montant cible" type="number" step="0.01" min="0.01" value={form.targetAmount} onChange={set('targetAmount')} required />
        <Field label="Échéance" type="date" value={form.deadline} onChange={set('deadline')} required />
        <div className="actions">
          <button className="primary">{editingId ? 'Enregistrer' : 'Créer'}</button>
          {editingId && <button type="button" onClick={() => { setEditingId(null); setForm(empty) }}>Annuler</button>}
        </div>
      </form>
      <ErrorBanner error={error || loadError} />
      {loading && <p className="muted">Chargement…</p>}
      {goals?.length === 0 && <p className="muted">Aucun objectif.</p>}
      <div className="goals">
        {goals?.map((g) => {
          const p = progress[g.id]
          const pct = Math.min(100, (Number(g.currentAmount) / Number(g.targetAmount)) * 100 || 0)
          return (
            <div className="card goal" key={g.id}>
              <div className="goal-head">
                <strong>{g.name}</strong>
                <span className="muted">avant le {dateFr(g.deadline)}</span>
              </div>
              <div className="bar"><div style={{ width: `${pct}%` }} /></div>
              <div>{money(g.currentAmount)} / {money(g.targetAmount)} ({pct.toFixed(0)} %)</div>
              {p && (
                <div className="muted">
                  Reste {money(p.remainingAmount)} — progression serveur : {p.progressPercentage} %
                </div>
              )}
              <div className="actions">
                <input type="number" step="0.01" min="0.01" placeholder="Montant"
                  value={deposits[g.id] ?? ''} onChange={(e) => setDeposits({ ...deposits, [g.id]: e.target.value })} />
                <button className="primary" disabled={!deposits[g.id]} onClick={() => deposit(g.id)}>Verser</button>
                <button onClick={() => showProgress(g.id)}>Progression</button>
                <button onClick={() => { setEditingId(g.id); setForm({ name: g.name, targetAmount: g.targetAmount, deadline: g.deadline }) }}>Modifier</button>
                <button className="danger" onClick={() => remove(g.id)}>Supprimer</button>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
