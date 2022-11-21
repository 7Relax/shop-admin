<template>
  <div class="toggle flex-a-center">
    <el-icon @click="doCollapse">
      <Expand v-show="store.state.isCollapse" />
      <Fold v-show="!store.state.isCollapse" />
    </el-icon>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from '@/store/index'
const store = useStore()
// 折叠面板
const doCollapse = () => {
  store.commit('setIsCollapse')
}
</script>

<style lang="scss" scoped>
.toggle {
  .el-icon:hover { cursor: pointer; }
}
</style>
