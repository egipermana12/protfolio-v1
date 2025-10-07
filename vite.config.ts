import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(),  svgLoader()],
  resolve: {
    alias: {
      '@css': '/src/assets/css',
      '@icons': '/src/assets/icons',
      '@img': '/src/assets/images',
      '@components': '/src/components',
      '@pages': '/src/pages',
      '@func': '/src/func',
      '@utils': '/src/utils',
    }
  }
})
