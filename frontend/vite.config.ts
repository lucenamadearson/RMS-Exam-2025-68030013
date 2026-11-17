import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '..', 'BACKEND_PORT')
  const backendPort = env.BACKEND_PORT ?? '3001'

  return {
    plugins: [react()],
    server: {
      port: 5173,
      proxy: { '/api': { target: `http://localhost:${backendPort}`, changeOrigin: true } },
    },
  }
})
