<template>
  <div
    v-for="(item, index) in store.cacheMenus"
    :key="index"
    :class="[
      `menu-item`,
      `pl-10px py-2px rounded-sm text-white text-12px cursor-pointer whitespace-nowrap flex items-center relative transition-all duration-200`,
      store.activeMenu.name === item.name ? `bg-blue-500` : `bg-blue-200`,
      store.activeMenu.name === item.name && !item.noClose ? `pr-20px` : `pr-10px`,
      !item.noClose ? 'hover:pr-20px' : '',
    ]"
    @click="active(item)"
  >
    <span>{{ item.meta.title }}</span>
    <font-awesome-icon
      v-if="!item.noClose"
      :icon="['fas', 'xmark']"
      @click.stop="store.closeMenu(item)"
      :class="[
        `text-11px absolute right-5px hover:opacity-100 transition-all duration-200`,
        store.activeMenu.name === item.name ? `opacity-100` : `opacity-0`,
      ]"
    />
  </div>
</template>

<script setup lang="ts">
import { useSettingsStore } from "@/store/settings";
import type { Menu } from "@/api/menu";
const store = useSettingsStore();

const active = (menu: Menu) => {
  store.activeMenuChange(menu);
};
</script>

<style lang="less">
.menu-item {
  &:hover {
    > *:nth-child(2) {
      opacity: 100;
    }
  }
}
</style>
