<template>
  <div class="flex h-screen">
    <left-bar></left-bar>
    <div class="flex flex-col flex-auto overflow-hidden">
      <head-bar></head-bar>
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts" setup>
import HeadBar from './Head/HeadBar.vue'
import LeftBar from './Left/LeftBar.vue'
</script>

<style lang="less" scoped>
</style>
