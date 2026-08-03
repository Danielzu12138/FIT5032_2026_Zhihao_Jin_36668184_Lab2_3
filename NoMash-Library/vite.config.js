import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

/* global process */
// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.CF_PAGES
    ? '/'
    : process.env.NODE_ENV === 'production'
      ? '/FIT5032_2026_Zhihao_Jin_36668184_Lab2_3/'
      : '/',
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
