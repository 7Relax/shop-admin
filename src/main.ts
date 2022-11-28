import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store, key } from './store'
import elementPlus from './plugins/element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import PageContainer from '@/components/PageContainer.vue'
import AppCard from '@/components/AppCard.vue'
// 加载全局样式
import './styles/index.scss'

const app = createApp(App)

// 注册全局图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
// 注册 PageContainer
app.component('PageContainer', PageContainer)
app.component('AppCard', AppCard)

app
  .use(router)
  .use(store, key) // 传入 injection key
  .use(elementPlus) // 注册到根实例上
  .mount('#app')
