<template>
  <div
    :class="[
      `flex h-[55px] pr-[20px] gap-[5px] items-center hover:bg-light-200 hover:bg-opacity-10 transition-all duration-100`,
      store.activeMenu.name === item.name ? 'text-blue-400' : '',
      store.subMenuLink.includes(item.name) ? 'text-gray-400' : '',
      store.menuMini && level > 0 ? 'opacity-[0]' : 'opacity-[1]',
    ]"
    :style="{ paddingLeft: level * 20 + 20 + 'px' }"
    @click="clickHandle(item)"
  >
    <font-awesome-icon
    v-if="item.meta.icon.indexOf('#') !== -1"
      class="text-[13px] -translate-y-[1px]"
      :icon="[item.meta.icon?.split('#')[0], item.meta.icon?.split('#')[1]]"
    />
    <span
      :class="[
        store.menuMini ? 'opacity-[0]' : '',
        `ml-10px select-none transition-[opacity] duration-100 opacity-[1]`,
      ]"
      >{{ item.meta.title }}</span
    >
    <font-awesome-icon
      v-if="item.children"
      :class="[
        `ml-auto text-gray-400 transition-all duration-300`,
        store.subMenuLink.includes(item.name) ? 'rotate-[180deg]' : '',
      ]"
      :icon="['fas', 'caret-down']"
    />
  </div>
</template>

<script setup lang="ts">
import type { Menu } from "@/api/menu";
import { useSettingsStore } from "@/store/settings";

const store = useSettingsStore();
const props = withDefaults(defineProps<{
  item: Menu;
  level: number;
}>(), {
  level: 0,
});

/**
 * 点击分两种情况
 * 1.存在下级，需要展开当前点击对菜单
 * 2.不存在下级，跳转路由
 *
 * alwaysShow == true => 二级菜单
 * @param item
 */
const clickHandle = (item: Menu) => {
  if (!item.alwaysShow) {
    store.openMenu(item);
  }
  store.subMenuHandle(item);
};
</script>
