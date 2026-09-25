import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { contactApiPlugin } from './server/vite-contact.mjs'

export default defineConfig(({ mode, command }) => {
  const env = { ...loadEnv(mode, process.cwd(), ''), ...process.env }
  if (command === 'build' && env.NETLIFY === 'true') {
    const value = env.VITE_API_URL?.trim()
    if (!value) throw new Error('Set VITE_API_URL to the deployed backend HTTPS origin in Netlify build environment variables.')
    const url = new URL(value)
    if (url.protocol !== 'https:' || url.username || url.password || url.pathname !== '/' || url.search || url.hash || ['localhost', '127.0.0.1', 'oxforduniversityhubli.netlify.app'].includes(url.hostname)) {
      throw new Error('VITE_API_URL must be the deployed backend HTTPS origin, without /api/contact; it cannot be localhost or the Netlify frontend.')
    }
  }
  return { plugins: [react(), tailwindcss(), contactApiPlugin()] }
})
