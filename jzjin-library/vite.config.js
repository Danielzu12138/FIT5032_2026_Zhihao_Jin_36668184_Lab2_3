import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: process.env.NODE_ENV === 'production'
    ? '/FIT5032_2026_Zhihao_Jin_36668184_Lab2_3/'
    : '/',
  plugins: [vue()]
})
