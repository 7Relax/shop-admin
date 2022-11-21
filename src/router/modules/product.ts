import { RouteRecordRaw, RouterView } from 'vue-router'

// 这种结构便于面包屑的实现：商品(product)是没有路由的，商品下是有子路由的
// 商品层直接做为RouterView组件，RouterView相当于直接是个路由出口，渲染自己的子组件
const routes: RouteRecordRaw = {
  path: 'product', // product 前不建议加 / 因为 product 前面是什么取绝于其父路由，如果这里加了 / 则其父路由就影响不到子路由了
  name: 'product',
  component: RouterView, // 直接渲染其子组件（路由出口）
  meta: { // 自定义路由信息（元数据）
    title: '商品'
  },
  children: [
    {
      path: 'list', // list 前不加 / 也是同理，加了 / 就是绝对路径了，product 就不能影响到 list 了
      name: 'product_list',
      component: () => import('@/views/product/list/index.vue'),
      meta: {
        title: '商品列表'
      }
    },
    {
      path: 'classify',
      name: 'product_classify',
      component: () => import('@/views/product/classify/index.vue'),
      meta: {
        title: '商品分类'
      }
    },
    {
      path: 'attr',
      name: 'product_attr',
      component: () => import('@/views/product/attr/index.vue'),
      meta: {
        title: '商品属性'
      }
    },
    {
      path: 'reply',
      name: 'product_reply',
      component: () => import('@/views/product/reply/index.vue'),
      meta: {
        title: '商品评论'
      }
    }
  ]
}

export default routes
