<template>
  <page-container>
    <app-card>
      <template #header>数据筛选</template>
      <el-form
        ref="form"
        :inline="true"
        :model="listParams"
        @submit.prevent="handleQuery"
      >
        <el-form-item label="状态">
          <el-select v-model="listParams.status" placeholder="请选择" clearable>
            <el-option label="全部" value="" />
            <el-option label="显示" :value="1" />
            <el-option label="不显示" :value="0" />
          </el-select>
        </el-form-item>

        <el-form-item label="管理员名称">
          <el-input v-model="listParams.name" placeholder="请输入身份昵称" clearable />
        </el-form-item>

        <el-form-item>
          <el-button native-type="submit">查询</el-button>
        </el-form-item>
      </el-form>
    </app-card>
  </page-container>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted} from 'vue'
import { IAdmin, IListParams } from '@/api/types/admin'
import { getAdmins } from '@/api/admin'

const list = ref<IAdmin[]>([]) // 列表数据

const listParams = reactive({ // 列表查询参数
  page: 1,
  limit: 10,
  name: '',
  roles: '',
  status: '' as IListParams['status']
})

onMounted(() => {
  loadList()
})

const loadList = async () => {
  const data = await getAdmins(listParams)
  list.value = data.list
}

const handleQuery = () => {
  loadList()
}
</script>

<style lang="scss" scoped></style>
