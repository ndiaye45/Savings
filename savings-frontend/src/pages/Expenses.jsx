import { useState } from 'react'
import { expensesApi } from '../api/endpoints.js'
import { ErrorBanner, Field, dateFr, money, useLoader } from '../components/ui.jsx'

const empty = { description: '', amount: '', date: new Date().toISOString().slice(0, 10) }

export default function Expenses() {
  const { data: expenses, error: loadError, loading, reload } = useLoader(expensesApi.list)
  const [form, setForm] = useState(empty)
  const [editingId, setEditingId] = useState(null)
  const [error, setError] = useState('')

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  async function submit(e) {
    e.preventDefault()
    setError('')
    const payload = { description: form.description, amount: Number(form.amount), date: form.date }
    try {
      if (editingId) await expensesApi.update(editingId, payload)
      else await expensesApi.create(payload)
      setForm(empty)
      setEditingId(null)
      reload()
    } catch (err) { setError(err.message) }
  }

  function startEdit(x) {
    setEditingId(x.id)
    setForm({ description: x.description, amount: x.amount, date: x.date })
  }

  async function remove(id) {
    if (!confirm('Supprimer cette dépense ?')) return
    setError('')
    try { await expensesApi.remove(id); reload() } catch (err) { setError(err.message) }
  }

  return (
    <section>
      <h2>Dépenses</h2>
      <form className="card form-row" onSubmit={submit}>
        <Field label="Description" value={form.description} onChange={set('description')} required />
        <Field label="Montant" type="number" step="0.01" min="0.01" value={form.amount} onChange={set('amount')} required />
        <Field label="Date" type="date" value={form.date} onChange={set('date')} required />
        <div className="actions">
          <button className="primary">{editingId ? 'Enregistrer' : 'Ajouter'}</button>
          {editingId && <button type="button" onClick={() => { setEditingId(null); setForm(empty) }}>Annuler</button>}
        </div>
      </form>
      <ErrorBanner error={error || loadError} />
      {loading && <p className="muted">Chargement…</p>}
      {expenses && (
        <table className="card">
          <thead><tr><th>Date</th><th>Description</th><th className="num">Montant</th><th /></tr></thead>
          <tbody>
            {expenses.length === 0 && <tr><td colSpan="4" className="muted">Aucune dépense.</td></tr>}
            {expenses.map((x) => (
              <tr key={x.id}>
                <td>{dateFr(x.date)}</td>
                <td>{x.description}</td>
                <td className="num">{money(x.amount)}</td>
                <td className="actions">
                  <button onClick={() => startEdit(x)}>Modifier</button>
                  <button className="danger" onClick={() => remove(x.id)}>Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  )
}
