import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { App } from 'vue'

// 包装成一个Vue插件
export default {
  // Vue注册组件的时候，会把Vue根实例传入并调用install
  install (app: App) {
    // 会把所有组件都注册成全局组件
    app.use(ElementPlus, { size: 'small', zIndex: 2000 })
  }
}
