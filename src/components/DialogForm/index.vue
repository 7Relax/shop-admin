<template>
  <el-dialog
    title="标题"
    ref="dialog"
    width="50%"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <slot></slot>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="doCancel">取消</el-button>
        <el-button type="primary" @click="emit('confirm')">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { IElDialog } from '@/types/element-plus'

// 拿到 el-dialog 实例
const dialog = ref < IElDialog | null > (null)

// 取消按钮
const doCancel = () => {
  if (dialog.value) {
    dialog.value.visible = false
  }
}

// emit
interface EmitsType {
  (e: 'confirm'): void
}
const emit = defineEmits<EmitsType>()
</script>

<style lang="scss" scoped></style>
