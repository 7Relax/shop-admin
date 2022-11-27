import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import AppLayout from '@/layout/AppLayout.vue'
import productRoutes from './modules/product'
import orderRoutes from './modules/order'
import permissionRoutes from './modules/permission'
import mediaRoutes from './modules/media'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import { store } from '@/store'

// 路由规则
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: AppLayout,
    meta: {
      requiresAuth: true // 父路由加上权限控制，子路由就不需要加了
    },
    children: [
      {
        path: '', // 默认子路由
        name: 'home',
        // 用异步组件的方式引入
        component: async () => await import('../views/home/index.vue'),
        meta: {
          title: '首页'
        }
      },
      productRoutes,
      orderRoutes,
      permissionRoutes,
      mediaRoutes
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: async () => await import('../views/login/index.vue')
  }
]

const router = createRouter({
  // 路由模式
  history: createWebHashHistory(),
  // 路由规则
  routes
})

// 全局前置守卫：所有页面的导航都会经过这里
router.beforeEach((to, from, next) => {
  // 开始加载进度条
  nprogress.start()

  // 判断是否需要检查登录
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const token = store.state.userInfo?.token
    if (!token) {
      // 未登录
      next({
        path: '/login',
        // 保存所在的位置，以便以后再访问
        query: { redirect: to.fullPath }
      })
    } else {
      // 已登录
      next()
    }
  } else {
    next()
  }
})

// 全局后置钩子
router.afterEach(() => {
  nprogress.done() // 结束进度条
})

export default router
