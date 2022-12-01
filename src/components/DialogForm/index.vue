<template>
  <el-dialog
    ref="dialog"
    title="标题"
    width="50%"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <slot></slot>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="doCancel">取消</el-button>
        <el-button type="primary" :loading="confirmLoading" @click="doConfirm">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { IElDialog } from '@/types/element-plus'

const props = defineProps({
  confirm: {
    // type: Function as PropType<() => Promise<void>>,
    type: Function,
    default: () => Promise.resolve()
  }
})

// 拿到 el-dialog 实例
const dialog = ref < IElDialog | null > (null)

// 确认按钮
const confirmLoading = ref(false)
const doConfirm = async () => {
  confirmLoading.value = true
  // emit('confirm')
  // 因为需要异步，所以这里不使用emit的方式
  await props.confirm()
  confirmLoading.value = false
}

// 取消按钮
const doCancel = () => {
  if (dialog.value) {
    dialog.value.visible = false
  }
}

// emit
// interface EmitsType {
//   (e: 'confirm'): void
// }
// const emit = defineEmits<EmitsType>()
</script>

<style lang="scss" scoped></style>
