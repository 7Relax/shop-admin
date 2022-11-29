<template>
  <el-pagination
    :current-page="props.page"
    :page-size="props.limit"
    background
    small="false"
    layout="total, sizes, prev, pager, next, jumper"
    :total="listTotal"
    @current-change="handleCurrentChange"
    @size-change="handleSizeChange"
  />
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
// JS 的方式
const props = defineProps({
  page: { // 页码
    type: Number,
    default: 1
  },
  limit: { // 每页大小
    type: Number,
    default: 10
  },
  listTotal: { // 总数据量
    type: Number,
    default: 0
  },
  loadList: { // 刷新列表数据
    type: Function,
    default: () => {}
  },
  testObj: {
    type: Object as PropType<{ a: string, b: number}>,
    required: true
  }
})

// TS 的方式
interface PropsType {
  page: number
  limit: number
  listTotal: number
  // loadList: (...args: any[]) => void
  loadList: () => void
}
// 不需要指定默认值
// const props = defineProps<PropsType>()

// 需指定默认值
// const props = withDefaults(defineProps<PropsType>(), {
//   page: 1,
//   limit: 10,
//   listTotal: 0,
//   loadList: () => {}
// })

// const emit = defineEmits(['update:page', 'update:limit'])

interface EmitsType {
  (e: 'update:page', page: number): void
  (e: 'update:limit', list: number): void
}
const emit = defineEmits<EmitsType>()

const handleCurrentChange = (page: number) => {
  emit('update:page', page)
  props.loadList()
}

const handleSizeChange = (size: number) => {
  emit('update:limit', size)
  emit('update:page', 1)
  props.loadList()
}
</script>

<style lang="scss" scoped></style>
