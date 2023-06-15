<template>
  <div
    :class="[
      'bg-gray-600 h-full menu-container flex flex-col transition-all duration-200 shadow',
      store.$state.menuMini ? 'w-64px' : 'w-200px',
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
      <el-menu class="" ref="menu" :collapse="store.$state.menuMini" :router="true">
        <MenuItem :items="menuStore.menuItems"> </MenuItem>
      </el-menu>
    </div>
  </div>
</template>

<script lang="ts" setup>
import MenuItem from "./MenuItem.vue";
import { useSettingsStore } from "@/store/settings";
import { useMenuStore } from "@/store/menu";
import { ref, onMounted, watch } from "vue";
import type { Menu } from "@/api/menu";
import router from "@/router";

const menu = ref();
const store = useSettingsStore();
const menuStore = useMenuStore();

onMounted(() => {
  // watch(
  //   () => store.activeMenu,
  //   (val: string) => {
  //     let item = menuStore.getMenuByName(val);
  //     if (item) {
  //       // 展开二级菜单
  //       item.parentNode?.forEach((item: Menu) => {
  //         menu.value.open(item.name);
  //       });

  //       // 设置菜单选中
  //       setTimeout(() => {
  //         let subMenus = document.querySelector(".el-menu .is-opened .el-menu--inline")
  //           ?.children;
  //         if (subMenus) {
  //           for (let i = 0; i < subMenus.length; i++) {
  //             let subMenu = subMenus[i];
  //             let key = subMenu.querySelector("span")?.getAttribute("data");
  //             if (key === val) {
  //               subMenu.classList.add("is-active");
  //             } else {
  //               subMenu.classList.remove("is-active");
  //             }
  //           }
  //         }
  //       }, 10);
  //     }
  //   },
  //   { immediate: true }
  // );
});
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
