// Client HTTP de bas niveau : ajoute le JWT, gère les formats de réponse/erreur du back.

const BASE_URL = '/api' // réécrit vers Spring par le proxy Vite (voir vite.config.js)
const TOKEN_KEY = 'jwt'

export const tokenStore = {
  get: () => localStorage.getItem(TOKEN_KEY),
  set: (t) => localStorage.setItem(TOKEN_KEY, t),
  clear: () => localStorage.removeItem(TOKEN_KEY),
}

export class ApiError extends Error {
  constructor(message, status) {
    super(message)
    this.status = status
  }
}

// Le back renvoie des erreurs sous 3 formes :
//  - texte brut (404 / 403 de GlobalExceptionHandler)
//  - JSON { champ: "message" } (400 de validation @Valid)
//  - JSON Spring par défaut { timestamp, status, error, path } (500 pour les RuntimeException)
function extractMessage(status, raw) {
  if (!raw) {
    if (status === 403) return 'Accès refusé (non connecté ou droits insuffisants).'
    return `Erreur ${status}`
  }
  try {
    const data = JSON.parse(raw)
    if (data && typeof data === 'object') {
      if (data.error && data.status) return `${data.error} (${data.status})`
      return Object.entries(data).map(([k, v]) => `${k} : ${v}`).join(' — ')
    }
  } catch {
    /* texte brut */
  }
  return raw
}

export async function request(path, { method = 'GET', body, params } = {}) {
  let url = BASE_URL + path
  if (params) url += '?' + new URLSearchParams(params).toString()

  const headers = {}
  const token = tokenStore.get()
  if (token) headers.Authorization = `Bearer ${token}`
  if (body !== undefined) headers['Content-Type'] = 'application/json'

  let res
  try {
    res = await fetch(url, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    })
  } catch {
    throw new ApiError("Impossible de joindre l'API (Spring Boot est-il démarré sur le port 8080 ?)", 0)
  }

  // Corps lu en texte : /auth/login renvoie un JWT brut, et les DELETE/PUT renvoient parfois un corps vide.
  const raw = await res.text()
  if (!res.ok) throw new ApiError(extractMessage(res.status, raw), res.status)

  if (!raw) return null
  const contentType = res.headers.get('content-type') || ''
  return contentType.includes('application/json') ? JSON.parse(raw) : raw
}
