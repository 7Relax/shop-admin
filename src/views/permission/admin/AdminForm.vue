<template>
  <app-dialog-form
    :title="props.adminId === null ? '添加管理员' : '编辑管理员'"
    @closed="emit('update:admin-id', null)"
  >
    <span>这是内容</span>
  </app-dialog-form>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'

const props = defineProps({
  // 编辑时的管理员Id
  adminId: {
    type: Number as PropType<number | null>,
    default: null
  }
})

// emit
interface EmitsType {
  (e: 'update:admin-id', value: number | null): void
}
const emit = defineEmits<EmitsType>()
</script>

<style lang="scss" scoped></style>
