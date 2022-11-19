<template>
  <el-container>
    <el-aside width="200px">
      <app-menu />
    </el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import AppMenu from './components/AppMenu.vue'

</script>

<style lang="scss" scoped>
.el-header {
  background-color: #B3C0D1;
}
.el-aside {
  background-color: #545c64;
  overflow-x: hidden;
}
.el-main {
  background-color: #E9EEF3;
}
.el-container {
  height: 100vh;
}
</style>
