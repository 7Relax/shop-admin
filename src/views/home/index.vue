<template>
  <h1>首页</h1>
  <el-button type="primary">测试按钮</el-button>
  <el-date-picker
    v-model="value1"
    type="date"
    placeholder="选择日期"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const value1 = ref('')
</script>

<style lang="scss" scoped>
</style>
