import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Helper function to check if certificate files exist
const getCertificates = () => {
  const keyPath = path.resolve(__dirname, './localhost-key.pem')
  const certPath = path.resolve(__dirname, './localhost.pem')
  
  if (fs.existsSync(keyPath) && fs.existsSync(certPath)) {
    return {
      key: fs.readFileSync(keyPath),
      cert: fs.readFileSync(certPath),
    }
  }
  // Return true to use Vite's automatic certificate generation
  return true
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
    https: getCertificates(),
    open: true,
    strictPort: true,
  },
  preview: {
    port: 3000,
    https: getCertificates(),
    open: true,
    strictPort: true,
  }
})


