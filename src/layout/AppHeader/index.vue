<template>
  <div class="header flex-a-center w-100 flex-j-sb">
    <div class="left flex-a-center">
      <toggle-sidebar class="mr-15" />
      <bread-crumb />
    </div>
    <div class="right flex-a-center">
      <menu-search class="mr-15" />
      <full-screen class="mr-15" />
      <notification class="mr-15" />
      <user-info />
    </div>
  </div>
</template>

<script lang="ts" setup>
import BreadCrumb from './BreadCrumb.vue'
import ToggleSidebar from './ToggleSidebar.vue'
import FullScreen from './FullScreen.vue'
import MenuSearch from './MenuSearch.vue'
import Notification from './Notification.vue'
import UserInfo from './UserInfo.vue'
</script>

<style lang="scss" scoped>
.header {
  .el-icon:hover { cursor: pointer; }
}
</style>
