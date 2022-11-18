<template>
  <div>登录页</div>
</template>

<script lang="ts" setup>
import { getLoginInfo } from '@/api/common'
import { ILoginInfo } from '@/api/types/common'
import { onMounted, ref } from 'vue'

// eslint-disable-next-line space-infix-ops
const list = ref<ILoginInfo['slide']>([])

onMounted(() => {
  getLoginInfo().then(data => {
    list.value = data.slide
  })
})
</script>

<style lang="scss" scoped></style>
