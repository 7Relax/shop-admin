<template>
  <app-dialog-form
    :title="props.adminId === null ? '添加管理员' : '编辑管理员'"
    @closed="doClosed"
    @open="doOpen"
    width="75%"
  >
    <el-form
      ref="form"
      :model="admin"
      :rules="rules"
      class="form"
      size="medium"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item label="管理员账号" prop="account">
        <el-input v-model="admin.account" clearable placeholder="请输入管理员账号" />
      </el-form-item>

      <el-form-item label="管理员密码" prop="pwd">
        <el-input v-model="admin.pwd" clearable placeholder="请输入管理员密码" />
      </el-form-item>

      <el-form-item label="确认密码" prop="pwd">
        <el-input v-model="admin.conf_pwd" clearable placeholder="请输入确认密码" />
      </el-form-item>

      <el-form-item label="管理员姓名" prop="real_name">
        <el-input v-model="admin.real_name" clearable placeholder="请输入管理员姓名" />
      </el-form-item>

      <!-- 异步的数据 -->
      <el-form-item label="管理员角色" prop="pwd">
        <el-select v-model="admin.roles" multiple placeholder="请选择管理员角色" clearable>
            <el-option :label="item.label" :value="item.value" v-for="item of rolesOptions" :key="item.value" />
          </el-select>
      </el-form-item>

      <el-form-item label="状态">
        <el-radio-group v-model="admin.status">
          <el-radio :label="1">开启</el-radio>
          <el-radio :label="0">关闭</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </app-dialog-form>
</template>

<script lang="ts" setup>
import { PropType, reactive, ref } from 'vue'
import { IRolesOptions, IAdmin } from '@/api/types/admin'
import { FormRules } from 'element-plus'
import { IElForm } from '@/types/element-plus'
import { getRolesOptions, getAdmin } from '@/api/admin'

const props = defineProps({
  // 编辑时的管理员Id
  adminId: {
    type: Number as PropType<number | null>,
    default: null
  }
})

// el-form 实例
const form = ref<IElForm | null>(null)

// 表单数据
const admin = ref({
  account: '',
  pwd: '',
  conf_pwd: '',
  roles: [] as number[],
  status: 0 as 0 | 1,
  real_name: ''
})

// 打开dialog
const doOpen = () => {
  const resquest = [ loadRoles(), loadAdmin() ]
  formLoading.value = true
  Promise.all(resquest).finally(() => {
    formLoading.value = false
  })
}

// 关闭dialog
const doClosed = () => {
  emit('update:admin-id', null)
  // 清除表单验证
  form.value?.clearValidate()
  // 清空表单数据
  form.value?.resetFields()
}

// 加载角色
const formLoading = ref(false)
const rolesOptions = ref<IRolesOptions[]>([])
const loadRoles = async () => {
  const data = await getRolesOptions()
  rolesOptions.value = data
}

// 编辑管理员
const loadAdmin = async () => {
  if (props.adminId === null) {
    return
  }
  const data = await getAdmin(props.adminId)
  admin.value = Object.assign({}, data)
}

// 表单页面规则
const rules = reactive<FormRules>({
  account: [
    { required: true, message: '请输入管理员账号', trigger: 'blur' }
  ],
  pwd: [
    { required: true, message: '请输入管理员密码', trigger: 'blur' }
  ],
  conf_pwd: [
    { required: true, message: '请输入确认密码', trigger: 'blur' }
  ],
  roles: [
    { required: true, message: '请选择管理员角色', trigger: 'blur' }
  ],
  real_name: [
    { required: true, message: '请输入管理员姓名', trigger: 'blur' }
  ],
})

// emit
interface EmitsType {
  (e: 'update:admin-id', value: number | null): void
}
const emit = defineEmits<EmitsType>()
</script>

<style lang="scss" scoped></style>
