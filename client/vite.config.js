import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite"
import path from 'path'
import "dotenv/config"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server:{
    port: process.env.PORT ||3000,
  },
  resolve: {
    alias: {
      '@':"./src",
    },
  },
})
