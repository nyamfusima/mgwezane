import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    assetsInlineLimit: 2048,
    // Two documents, one bundle: each entry carries its own <head> so crawlers
    // read the right title and share card per route. Paths resolve against the
    // project root; vercel.json maps /rates onto rates.html.
    rollupOptions: {
      input: { main: 'index.html', rates: 'rates.html' },
    },
  },
})
