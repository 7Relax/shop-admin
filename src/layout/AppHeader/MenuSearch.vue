<template>
  <el-input
    v-model="searchContent"
    placeholder="请输入内容"
    prefix-icon="Search"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const searchContent = ref('')
</script>

<style lang="scss" scoped></style>
