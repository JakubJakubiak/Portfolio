import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import wgslVitePlugin from '@vgpu/wgsl/loader-vite'

export default defineConfig({
  plugins: [wgslVitePlugin(), react(), tailwindcss()],
  // Inline PostCSS so Vite never walks up to the parent
  // portfolio folder's Tailwind v3 postcss.config.js.
  css: {
    postcss: {
      plugins: [],
    },
  },
})
