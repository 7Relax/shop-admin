<template>
  <div class="card mb-15 bg-white rounded-5">
    <div class="border-bottom p-15">
      <slot name="header"></slot>
    </div>
    <div class="p-15">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped></style>
