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
  }
})

const emit = defineEmits(['update:page', 'update:limit'])

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
