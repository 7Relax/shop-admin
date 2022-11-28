<template>
  <el-container class="vh-100">
    <el-aside>
      <app-menu />
    </el-aside>
    <el-container>
      <el-header class="flex-a-center">
        <app-header />
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import AppMenu from './AppMenu/index.vue'
import AppHeader from './AppHeader/index.vue'

</script>

<style lang="scss" scoped>
.el-header {
  background-color: #FFF;
}
.el-aside {
  background-color: #304156;
  overflow-x: hidden;
  width: auto;
}
.el-main {
  background-color: #E9EEF3;
  padding: 15px;
}
</style>
