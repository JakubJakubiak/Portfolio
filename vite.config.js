import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Inline PostCSS so Vite never walks up to the parent
  // portfolio folder's Tailwind v3 postcss.config.js.
  css: {
    postcss: {
      plugins: [],
    },
  },
})
