import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// 注意：在 ts 模块中加载 node 核心模块
// 需要安装 node 的类型补充模块：npm i -D @types/node
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx({
      // 配置选项
    })
  ],
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src') // src 目录的绝对路径
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData: '$injectedColor: orange;'
        // 不要漏了最后的分号，因为scss语法需要有末尾分号
        additionalData: '@import "@/styles/variables.scss"; @import "@/styles/common.scss";'
      }
    }
  }
})
