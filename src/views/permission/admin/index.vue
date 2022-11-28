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
          <el-button type="primary" native-type="submit">查询</el-button>
        </el-form-item>
      </el-form>
    </app-card>

    <app-card>
      <template #header>
        <el-button type="primary" @click="addAddmin">添加管理员</el-button>
      </template>

      <el-table
        :data="list"
        stripe
        style="width: 100%"
      >
        <el-table-column prop="id" label="Id" width="80" />
        <el-table-column prop="real_name" label="姓名" width="100" />
        <el-table-column prop="account" label="账号" width="100" />
        <el-table-column prop="last_time" label="最后一次登录时间" />
        <el-table-column prop="last_ip" label="最后一次登录IP" />
        <el-table-column prop="status" label="状态">
          <template #default="scope">
            <el-switch v-model="scope.row.status" />
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template #default>
            <el-button type="text">编辑</el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        class="mt-15 flex-j-end"
        small="false"
        v-model:current-page="listParams.page"
        v-model:page-size="listParams.limit"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes, prev, pager, next, jumper"
        :total="listCount"
        background />
    </app-card>
  </page-container>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted} from 'vue'
import { IAdmin, IListParams } from '@/api/types/admin'
import { getAdmins } from '@/api/admin'

const list = ref<IAdmin[]>([]) // 列表数据
const listCount = ref(0)
const listParams = reactive({ // 列表查询参数
  page: 1, // 当前页码
  limit: 10, // 每页大小
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
  listCount.value = data.count
}

const handleQuery = () => {
  console.log('handleQuery...')
  loadList()
}

const addAddmin = () => {
  console.log('addAddmin...')
}

const handleCurrentChange = (page: number) => {
  listParams.page = page
  loadList()
}

const handleSizeChange = (size: number) => {
  listParams.limit = size
  listParams.page = 1
  loadList()
}
</script>

<style lang="scss" scoped>
::v-deep {
  .el-table__row .el-button--text { padding-left: 0; }
  .el-pagination__classifier { margin-left: 8px; }
}
</style>
