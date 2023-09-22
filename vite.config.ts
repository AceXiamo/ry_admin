import { fileURLToPath, URL } from 'node:url'

import UnoCSS from 'unocss/vite'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'

// https://vitejs.dev/config/
export default defineConfig((mode) => {
  const env = loadEnv(mode.mode, process.cwd(), '')
  return {
    define: {
      __APP_ENV__: env.APP_ENV,
    },
    plugins: [
      vue(),
      vueJsx(),
      UnoCSS(),
      VueSetupExtend(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          math: "always",
          globalVars: {},
        },
      },
    },
    server: {
      proxy: {
        '/dev-api': {
          target: 'http://localhost:8080',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/dev-api/, ''),
        },
      },
    },
  }
})
