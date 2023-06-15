<template>
  <div class="flex justify-center items-center h-screen w-screen">
    <el-result :icon="props.icon || 'warning'" :title="props.title || '提示'" :sub-title="props.message || '当前页面未找到'">
      <template #extra>
        <el-button type="primary" @click="">返回上一页</el-button>
      </template>
    </el-result>
  </div>
</template>

<script lang="ts" setup>
import router from '@/router/index'

const props = defineProps(['title', 'message', 'icon'])

const back = () => {
  router.back()
}
</script>

<style lang="less" scoped>
</style>
