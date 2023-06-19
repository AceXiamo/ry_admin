<template>
  <div
    :class="[
      'bg-gray-600 h-full menu-container flex flex-col transition-all duration-200 shadow',
      store.$state.menuMini ? 'w-55px' : 'w-200px',
    ]"
  >
    <div class="bg-white flex justify-center items-center h-80px">
      <img
        :class="[
          'transition-all duration-200',
          store.$state.menuMini ? 'h-30px' : 'h-50px',
        ]"
        src="https://mrd.oss-cn-shenzhen.aliyuncs.com/wxapp/639292cfd9d50231ecd2e5c4.png"
      />
    </div>
    <div class="flex-auto overflow-auto scroll-style h-0">
      <menu-bar :items="menuStore.menuItems"></menu-bar>
    </div>
  </div>
</template>

<script lang="ts" setup>
import MenuBar from "./MenuBar.vue";
import { useSettingsStore } from "@/store/settings";
import { useMenuStore } from "@/store/menu";

const store = useSettingsStore();
const menuStore = useMenuStore();
</script>

<style lang="less" scoped>
.menu-container {
  & :deep(.el-menu) {
    background-color: unset;
    border-right: unset;
  }

  & :deep(.is-active) {
    color: rgb(64, 158, 255) !important;
  }

  & :deep(.el-menu-item),
  & :deep(.el-sub-menu .el-sub-menu__title) {
    color: rgb(191, 203, 217);
  }

  & :deep(.el-menu-item:hover),
  & :deep(.el-sub-menu__title:hover) {
    background-color: #1f2937;
  }
}

.scroll-style {
  &::-webkit-scrollbar {
    width: 0;
  }
}
</style>
