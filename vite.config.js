import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";
import vueJsx from '@vitejs/plugin-vue-jsx'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // ['transform-vue-jsx', { /* options */ }]
    vueJsx()

  ],
  resolve: {
    alias: {
      // '@': fileURLToPath(new URL('./src', import.meta.url))
      "@": path.resolve(__dirname, "src"),
    }
  },


  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          hack: `true; @import (reference) "${path.resolve("src/assets/css/base.less")}";`,
        },
        javascriptEnabled: true,
      },
    },
  },
  server: {
    // port: '3000',
    proxy: {
      '/proxy': {
        target: 'https://s4.s100.vip:7147',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/proxy/, '') // 不可以省略rewrite
      }
    }
  },
})
