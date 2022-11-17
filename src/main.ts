import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store, key } from './store'

createApp(App)
  .use(router)
  .use(store, key) // 传入 injection key
  .mount('#app')
