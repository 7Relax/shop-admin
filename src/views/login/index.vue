<template>
  <div class="login_area flex-center flex-d-column">
    <div class="wrap">
      <div class="title flex-center font-33 font-weight-bold mb-20">
        <span class="text1">拉勾</span>
        <el-divider class="mx-5 font-20" direction="vertical" />
        <span class="text2">心选</span>
      </div>

      <el-form
        ref="formRef"
        :model="user"
        :rules="rules"
        status-icon
        class="login"
        size="medium"
        @submit.prevent="handleSubmit"
      >
        <el-form-item class="item mb-20" prop="account">
          <el-input v-model="user.account" prefix-icon="User" clearable placeholder="请输入用户名" />
        </el-form-item>

        <el-form-item class="item mb-20" prop="pwd">
          <el-input
            v-model="user.pwd" prefix-icon="Lock" clearable type="password"
            placeholder="请输入密码"
          />
        </el-form-item>

        <el-form-item class="item mb-20" prop="imgcode">
          <el-input v-model="user.imgcode" prefix-icon="Key" placeholder="请输入验证码" />
        </el-form-item>

        <el-form-item>
          <el-button class="submit_btn w-100" :loading="loading" type="primary" native-type="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getLoginInfo, login } from '@/api/common'
import { ILoginInfo } from '@/api/types/common'
import { onMounted, ref, reactive } from 'vue'
import { FormRules, ElForm } from 'element-plus'
import { useRouter } from 'vue-router'

// 拿到路由
const router = useRouter()

// 登录页面相关信息
const list = ref<ILoginInfo['slide']>([])

// 用户信息
const user = reactive({ account: '', pwd: '', imgcode: '' })

const loading = ref(false)

// form 规则
const rules = reactive < FormRules > ({
  account: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  pwd: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ],
  imgcode: [
    { required: true, message: '请输入验证码', trigger: 'blur' }
  ]
})

// 拿到 el-form 对象，要通过工具类型InstanceType去运算出来
const formRef = ref<InstanceType<typeof ElForm> | null>(null)

onMounted(() => {
  getLoginInfo().then(data => {
    list.value = data.slide
  })
})

// 提交表单
const handleSubmit = async () => {

  // 表单验证
  const valid = await formRef.value?.validate()
  if (!valid) {
    return false
  }

  // 验证通过，展示 loading
  loading.value = true

  // 请求提交
  const loginData = await login(user)
  router.replace({ name: 'home' }) // replace 到 name 为 home 的页面
}

</script>

<style lang="scss" scoped>
.login_area { height: 100vh; background-color: #364152; }
.wrap {
  width: 280px; background-color: #FFF; border-radius: 5px; padding: 20px;
  .title {
    .text1 { color: #b09a7a; }
    .text2 { color: #3e3e3e; }
  }
}
</style>
