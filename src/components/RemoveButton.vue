<template>
  <el-popconfirm title="确定要删除吗?" :icon="InfoFilled" @confirm="emit('confirm')" @cancel="emit('cancel')">
    <template #reference>
      <slot></slot>
    </template>
  </el-popconfirm>
</template>

<script lang="ts" setup>
import { InfoFilled } from '@element-plus/icons-vue'

const emit = defineEmits(['confirm', 'cancel'])
</script>
