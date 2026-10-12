import { useEffect, useState, useCallback } from 'react'

export const money = (n) =>
  new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(Number(n ?? 0))

export const dateFr = (iso) => (iso ? new Date(iso + 'T00:00:00').toLocaleDateString('fr-FR') : '')

export function ErrorBanner({ error }) {
  return error ? <div className="banner error">{error}</div> : null
}

export function Field({ label, ...props }) {
  return (
    <label className="field">
      <span>{label}</span>
      <input {...props} />
    </label>
  )
}

// Charge des données au montage ; expose { data, error, loading, reload }.
export function useLoader(fn) {
  const [state, setState] = useState({ data: null, error: '', loading: true })
  const load = useCallback(async () => {
    setState((s) => ({ ...s, loading: true, error: '' }))
    try {
      setState({ data: await fn(), error: '', loading: false })
    } catch (e) {
      setState({ data: null, error: e.message, loading: false })
    }
  }, [fn])
  useEffect(() => { load() }, [load])
  return { ...state, reload: load }
}
