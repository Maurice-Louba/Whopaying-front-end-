import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss(),
  ],
    server: {
    host: true,  // <-- ça permet d'écouter sur toutes les IP
    port: 5175,  // ou un port fixe que tu veux
  }
})
