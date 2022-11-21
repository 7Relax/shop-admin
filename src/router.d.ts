import 'vue-router'

// 为 vue-router 模块中的 RouteMeta 作类型补充说明
declare module 'vue-router' {
  interface RouteMeta {
    title: string
  }
}
