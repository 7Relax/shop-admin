import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store, key } from './store'
import elementPlus from './plugins/element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import PageContainer from '@/components/PageContainer/index.vue'
import AppCard from '@/components/Card/index.vue'
import AppPagination from '@/components/pagination/index.vue'
// 加载全局样式
import './styles/index.scss'

const app = createApp(App)

// 注册全局图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
// 注册全局组件
app.component('PageContainer', PageContainer)
app.component('AppCard', AppCard)
app.component('AppPagination', AppPagination)

app
  .use(router)
  .use(store, key) // 传入 injection key
  .use(elementPlus) // 注册到根实例上
  .mount('#app')
