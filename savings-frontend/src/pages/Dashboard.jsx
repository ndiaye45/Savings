import { statisticsApi } from '../api/endpoints.js'
import { ErrorBanner, money, useLoader } from '../components/ui.jsx'

export default function Dashboard() {
  const { data: s, error, loading } = useLoader(statisticsApi.get)

  return (
    <section>
      <h2>Tableau de bord</h2>
      <ErrorBanner error={error} />
      {loading && <p className="muted">Chargement…</p>}
      {s && (
        <div className="stats">
          <div className="card stat"><span>Total des dépenses</span><strong>{money(s.totalExpenses)}</strong></div>
          <div className="card stat"><span>Total épargné</span><strong>{money(s.totalSavings)}</strong></div>
          <div className="card stat"><span>Nombre de dépenses</span><strong>{s.numberOfExpenses}</strong></div>
          <div className="card stat"><span>Objectifs d'épargne</span><strong>{s.numberOfSavingsGoals}</strong></div>
        </div>
      )}
    </section>
  )
}
