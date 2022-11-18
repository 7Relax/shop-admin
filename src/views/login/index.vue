<template>
  <div>登录页</div>
</template>

<script lang="ts" setup>
import { getLoginInfo } from '@/api/common'
import { onMounted } from 'vue'

onMounted(() => {
  getLoginInfo().then(res => {
    console.log('res = ', res)
  })
})
</script>

<style lang="scss" scoped></style>
