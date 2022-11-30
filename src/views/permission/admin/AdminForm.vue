<template>
  <el-dialog
    ref="dialog"
    :title="props.adminId !== null ? '编辑管理员' : '添加管理员'"
    width="30%"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @closed="emit('update:admin-id', null)"
  >
    <span>This is a message</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="doCancel">取消</el-button>
        <el-button type="primary">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { PropType, ref } from 'vue'
import { IElDialog } from '@/types/element-plus'

const props = defineProps({
  // 编辑时的管理员Id
  adminId: {
    type: Number as PropType<number | null>,
    default: null
  }
})

// 拿到 el-dialog 实例
const dialog = ref < IElDialog | null > (null)

// 取消按钮
const doCancel = () => {
  if (dialog.value) {
    // 调用dialog实例的visible属性，这样也会触发 closed 事件
    // 并且会与父级的v-modal中的formVisible同步
    dialog.value.visible = false
  }
}

// emit
interface EmitsType {
  (e: 'update:admin-id', value: number | null): void
}
const emit = defineEmits<EmitsType>()
</script>

<style lang="scss" scoped></style>
