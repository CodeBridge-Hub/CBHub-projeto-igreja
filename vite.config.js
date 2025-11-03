import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    // Permite o host que você está usando
    allowedHosts: ['portaligreja.siaeserver.com', 'localhost'],
    port: 5173, // ou a porta que você estiver usando
  }
})
