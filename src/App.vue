<template>
  <el-config-provider :locale="locale">
    <!-- 路由的渲染出口 -->
    <router-view />
  </el-config-provider>
</template>

<script lang="ts" setup>
import locale from 'element-plus/dist/locale/zh-cn.mjs'
</script>
