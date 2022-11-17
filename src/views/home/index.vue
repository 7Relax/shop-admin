<template>
  <div v-for="(item, index) of arrData" :key="index" class="item">
    {{ item.name }}
  </div>
</template>

<script lang="ts" setup>
const arrData = [
  { name: '英语' },
  { name: '数学' },
  { name: '体育' }
]
</script>

<style lang="scss" scoped>
.item {
  color: $injectedColor;
  font-size: $fontSize;
}
</style>
