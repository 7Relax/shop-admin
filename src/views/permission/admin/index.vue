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
          <el-select v-model="listParams.status" placeholder="请选择" clearable :disabled="listLoading">
            <el-option label="全部" value="" />
            <el-option label="显示" :value="1" />
            <el-option label="不显示" :value="0" />
          </el-select>
        </el-form-item>

        <el-form-item label="管理员名称">
          <el-input v-model="listParams.name" placeholder="请输入身份昵称" clearable :disabled="listLoading" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" native-type="submit" :disabled="listLoading">查询</el-button>
        </el-form-item>
      </el-form>
    </app-card>

    <app-card>
      <template #header>
        <el-button type="primary" @click="addAddmin" :disabled="listLoading">添加管理员</el-button>
      </template>

      <el-table
        :data="list"
        stripe
        v-loading="listLoading"
        style="width: 100%"
      >
        <el-table-column prop="id" label="Id" width="80" />
        <el-table-column prop="real_name" label="姓名" width="100" />
        <el-table-column prop="account" label="账号" width="100" />
        <el-table-column prop="last_time" label="最后一次登录时间" />
        <el-table-column prop="last_ip" label="最后一次登录IP" />
        <el-table-column prop="status" label="状态">
          <template #default="scope">
            <el-switch
              v-model="scope.row.status"
              :active-value="1"
              :inactive-value="0"
              :loading="scope.row.statusLoading"
              @change="switchChange(scope.row)" />
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="text" @click="editAdmin(scope.row.id)">编辑</el-button>
            <el-popconfirm title="确定删除吗？" @confirm="doDelete(scope.row.id)">
              <template #reference>
                <el-button type="text">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <app-pagination
        class="mt-15 flex-j-end"
        :disabled="listLoading"
        v-model:page="listParams.page"
        v-model:limit="listParams.limit"
        :list-total="listTotal"
        :load-list="loadList" />

    </app-card>
  </page-container>

  <!-- 这里的 v-model 或者 相关自定义事件 会作用到子组件的根节点上 -->
  <admin-form
    v-model="formVisible"
    v-model:admin-id="adminId"
    @success="doSuccess" />
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted} from 'vue'
import { IAdmin, IListParams } from '@/api/types/admin'
import { getAdminList, deleteAdmin, updateAdminStatus } from '@/api/admin'
import { ElMessage } from 'element-plus'
import AdminForm from './AdminForm.vue'

onMounted(() => {
  loadList()
})

// 列表查询参数
const listParams = reactive({
  page: 1, // 当前页码
  limit: 10, // 每页大小
  name: '',
  roles: '',
  status: '' as IListParams['status']
})

// 加载列表数据
const list = ref<IAdmin[]>([])
const listTotal = ref(0) // 列表总数
const listLoading = ref(false) // 列表loading状态
const loadList = async () => {
  listLoading.value = true
  const data = await getAdminList(listParams).finally(() => {
    listLoading.value = false
  })
  // 修改后端返回的数据，添加loading字段
  data.list.forEach(x => {
    x.statusLoading = false // 控制切换状态的loading效果
  })
  list.value = data.list
  listTotal.value = data.count
}

// 查询列表
const handleQuery = () => {
  console.log('handleQuery...')
  loadList()
}

// 添加管理员
const addAddmin = () => {
  console.log('addAddmin...')
  formVisible.value = true
}

// admin-form-dialog
const formVisible = ref(false)

// 编辑管理员
const adminId = ref<number | null>(null)
const editAdmin = (id: number) => {
  adminId.value = id
  formVisible.value = true
}

// 添加 或 编辑管理员 - 操作成功
const doSuccess = () => {
  // 关闭dialog
  formVisible.value = false
  // 刷新列表数据
  loadList()
}

// 删除管理员
const doDelete = async (id: number) => {
  await deleteAdmin(id)
  ElMessage.success('删除成功')
}

// 切换启用状态
const switchChange = async (item: IAdmin) => {
  item.statusLoading = true
  await updateAdminStatus(item.id, item.status).then(() => {
    ElMessage.success(`${item.status === 1 ? '启用成功' : '禁用成功'}`)
  }).catch(() => {
    // 异常则恢复数据
    item.status = item.status === 0 ? 1 : 0
  }).finally(() => {
    item.statusLoading = false
  })
}
</script>

<style lang="scss" scoped>
:deep {
  .el-table__row .el-button--text { padding-left: 0; }
  .el-pagination__classifier { margin-left: 8px; }
}
</style>
