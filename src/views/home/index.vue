<template>
  <div>首页</div>
  <p>{{ $store.state.count }}</p>
  <p>{{ store.state.count }}</p>
</template>

<script lang="ts" setup>
import { useStore } from '../../store'

// 通过useStore()方式拿到的 store 中的 state 是没有类型的
// 所以需要单独配置类型声明，官网有方法
// 本质上，Vuex 将 store 安装到 Vue 应用中使用了 Vue 的 Provide/Inject 特性
const store = useStore()

console.log(store.state.count)

</script>

<style lang="scss" scoped></style>
