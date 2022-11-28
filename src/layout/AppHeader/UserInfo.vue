<template>
  <el-dropdown class="">
    <span class="el-dropdown-link flex-a-center">
      {{ $store.state.userInfo?.account }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu class="dropdown">
        <el-dropdown-item>个人中心</el-dropdown-item>
        <el-dropdown-item @click="doLogout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import { logout } from '@/api/common'
import { useRouter } from 'vue-router'
import { store } from '@/store'

const router = useRouter()
const doLogout = () => {
  // 退出提示
  ElMessageBox.confirm('确认退出吗？', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    // 确认发出退出请求
    await logout()

    // 清除用户登录信息
    store.commit('removeUserInfo')

    // 跳转到登录页
    router.replace({ name: 'login' })
  }).catch(() => {
    ElMessage({
      type: 'info', message: '取消退出'
    })
  })
}
</script>

<style lang="scss" scoped>
.dropdown {
  padding: 10px 0;
  deep {
    li { padding: 8px 12px; }
  }
}
</style>
