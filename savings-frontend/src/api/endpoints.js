// Une fonction par endpoint du back Spring Boot.
import { request } from './client.js'

export const authApi = {
  // POST /auth/login  { email, password }  ->  JWT en texte brut
  login: (email, password) => request('/auth/login', { method: 'POST', body: { email, password } }),
}

export const usersApi = {
  // POST /users  { firstname, lastname, email, password }  (public)
  create: (user) => request('/users', { method: 'POST', body: user }),
  // GET /users  (ADMIN)
  list: () => request('/users'),
  // GET /users/{id}  (ADMIN)
  get: (id) => request(`/users/${id}`),
  // PUT /users/{id}  { firstname, lastname, email }
  update: (id, user) => request(`/users/${id}`, { method: 'PUT', body: user }),
  // DELETE /users/{id}
  remove: (id) => request(`/users/${id}`, { method: 'DELETE' }),
  // PUT /users/{id}/password  { currentPassword, newPassword }
  changePassword: (id, currentPassword, newPassword) =>
    request(`/users/${id}/password`, { method: 'PUT', body: { currentPassword, newPassword } }),
  // PUT /users/{id}/reset-password  { newPassword }
  resetPassword: (id, newPassword) =>
    request(`/users/${id}/reset-password`, { method: 'PUT', body: { newPassword } }),
}

export const expensesApi = {
  // Expense : { id, amount, description, date: "YYYY-MM-DD", user }
  list: () => request('/expenses'),
  get: (id) => request(`/expenses/${id}`),
  create: (e) => request('/expenses', { method: 'POST', body: e }),
  update: (id, e) => request(`/expenses/${id}`, { method: 'PUT', body: e }),
  remove: (id) => request(`/expenses/${id}`, { method: 'DELETE' }),
}

export const goalsApi = {
  // SavingsGoal : { id, name, targetAmount, currentAmount, deadline: "YYYY-MM-DD", user }
  list: () => request('/savings-goals'),
  get: (id) => request(`/savings-goals/${id}`),
  create: (g) => request('/savings-goals', { method: 'POST', body: g }),
  update: (id, g) => request(`/savings-goals/${id}`, { method: 'PUT', body: g }),
  remove: (id) => request(`/savings-goals/${id}`, { method: 'DELETE' }),
  // POST /savings-goals/{id}/deposit?amount=...  (paramètre d'URL, pas de body JSON)
  deposit: (id, amount) => request(`/savings-goals/${id}/deposit`, { method: 'POST', params: { amount } }),
  // GET -> { goalId, name, targetAmount, currentAmount, remainingAmount, progressPercentage }
  progress: (id) => request(`/savings-goals/${id}/progress`),
}

export const statisticsApi = {
  // GET -> { totalExpenses, totalSavings, numberOfExpenses, numberOfSavingsGoals }
  get: () => request('/statistics'),
}

export const adminApi = {
  // GET /admin/hello (ADMIN) -> "Bonjour ADMIN" (texte brut)
  hello: () => request('/admin/hello'),
}
