import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// L'API Spring n'a pas de configuration CORS. En dev, on passe donc par un proxy :
// le navigateur appelle http://localhost:5173/api/... et Vite relaie vers Spring.
// Pas de CORS à gérer, et l'API n'est pas modifiée.
const API_TARGET = process.env.VITE_API_TARGET || 'http://localhost:8080'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: API_TARGET,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
