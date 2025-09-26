import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@css': '/src/assets/css',
      '@img': '/src/assets/images',
      '@components': '/src/components',
      '@pages': '/src/pages',
      '@func': '/src/func',
    }
  }
})
