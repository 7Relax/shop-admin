import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store, key } from './store'
import elementPlus from './plugins/element-plus'

// 加载全局样式
import './styles/index.scss'

createApp(App)
  .use(router)
  .use(store, key) // 传入 injection key
  .use(elementPlus) // 注册到根实例上
  .mount('#app')
