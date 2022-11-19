import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// 注意：在 ts 模块中加载 node 核心模块
// 需要安装 node 的类型补充模块：npm i -D @types/node
import path from 'path'

export default ({ mode }) => defineConfig({
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
  },
  server: {
    proxy: {
      // 字符串简写写法 /foo/123 => http://localhost:4567/foo/123
      // '/foo': 'http://localhost:4567',

      // 选项写法 - 解释说明
      '/admin': {
        target: 'https://shop.fed.lagou.com/api', // 代理的目标地址（真正的地址）
        // changeOrigin: true 兼容基于名字的虚拟主机
        // 一个服务器里面可能跑了多个网站服务，多个网站服务可能有多个域名，
        // 一般是通过虚拟主机的方式将域名和网站服务一一对应起来
        // 虚拟主机的配置：当访问 a.com 的时候则会映射到某个具体的端口服务：localhost:xxx
        // a.com localhost:xxx
        // b.com localhost:yyy
        // 走代理就会有个问题，默认情况下 http 请求头中 origin 字段是真实的 origin：http://localhost:3000/
        // 而虚拟主机配置中并没有这个真实的 origin 的域名配置，所以代理转发就会失败，访问就失败
        // changeOrigin: true, 代理服务会把 origin 修改为目标地址：https://shop.fed.lagou.com/api
        // 否则代理服务器就会携带原始的 origin 去请求目标地址了
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/admin/, '')
      },

      // 选项写法
      [loadEnv(mode, process.cwd()).VITE_BASE_API]: {
        target: loadEnv(mode, process.cwd()).VITE_SERVICE_URL,
        changeOrigin: true,
      }
    }
  }
})
