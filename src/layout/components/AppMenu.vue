<template>
  <el-menu
    active-text-color="#ffd04b"
    background-color="#545c64"
    class="el-menu-vertical-demo"
    default-active="2"
    text-color="#fff"
    router
  >
    <el-menu-item index="/">
      <el-icon><icon-menu /></el-icon>
      <span>首页</span>
    </el-menu-item>

    <el-sub-menu index="/product">
      <template #title>
        <el-icon><location /></el-icon>
        <span>商品</span>
      </template>
      <el-menu-item index="/product/list">
        <el-icon><icon-menu /></el-icon>
        <span>商品列表</span>
      </el-menu-item>
      <el-menu-item index="/product/classify">
        <el-icon><icon-menu /></el-icon>
        <span>商品分类</span>
      </el-menu-item>
      <el-menu-item index="/product/attr">
        <el-icon><icon-menu /></el-icon>
        <span>商品规格</span>
      </el-menu-item>
      <el-menu-item index="/product/reply">
        <el-icon><icon-menu /></el-icon>
        <span>商品评论</span>
      </el-menu-item>
    </el-sub-menu>

    <el-sub-menu index="/order">
      <template #title>
        <el-icon><location /></el-icon>
        <span>订单</span>
      </template>
      <el-menu-item index="/order/list">
        <el-icon><icon-menu /></el-icon>
        <span>订单列表</span>
      </el-menu-item>
      <el-menu-item index="/order/offline">
        <el-icon><icon-menu /></el-icon>
        <span>线下订单</span>
      </el-menu-item>
    </el-sub-menu>

    <el-menu-item index="/media">
      <el-icon><Document /></el-icon>
      <span>媒体</span>
    </el-menu-item>

    <el-sub-menu index="/permission">
      <template #title>
        <el-icon><Setting /></el-icon>
        <span>权限</span>
      </template>
      <el-menu-item index="/permission/admin">
        <el-icon><icon-menu /></el-icon>
        <span>管理员</span>
      </el-menu-item>
      <el-menu-item index="/permission/role">
        <el-icon><icon-menu /></el-icon>
        <span>角色</span>
      </el-menu-item>
      <el-menu-item index="/permission/rule">
        <el-icon><icon-menu /></el-icon>
        <span>权限规则</span>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script lang="ts" setup>
import { Document, Menu as IconMenu, Location, Setting } from '@element-plus/icons-vue'
</script>

<style lang="scss" scoped>
.el-menu { border-right: none; }
</style>
