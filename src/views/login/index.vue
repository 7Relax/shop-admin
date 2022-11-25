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
import { getLoginInfo } from '@/api/common'
import { ILoginInfo } from '@/api/types/common'
import { onMounted, ref, reactive } from 'vue'
import { FormRules } from 'element-plus'

// eslint-disable-next-line space-infix-ops
const list = ref<ILoginInfo['slide']>([])

onMounted(() => {
  getLoginInfo().then(data => {
    list.value = data.slide
  })
})

// const formSize = ref('default')
const user = reactive({
  account: '',
  pwd: '',
  imgcode: ''
})

const loading = ref(false)

const rules = reactive < FormRules > ({
  account: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  pwd: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ]
})

const handleSubmit = async () => {
  console.log('handleSubmit')
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
