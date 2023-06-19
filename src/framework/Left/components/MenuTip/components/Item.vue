<template>
  <div @mouseenter="mouseInMenuItem(item, $event)" @mouseleave="mouseLeave" v-for="(item, index) in menus" :key="index">
    <div :class="[
      `flex h-[55px] pr-[20px] gap-[5px] items-center hover:bg-light-200 hover:bg-opacity-10 transition-all duration-100`,
      `text-[13px] font-light pl-[20px]`,
      store.activeMenu.name === item.name ? 'text-blue-400' : 'text-gray-200',
    ]" @click="clickHandle(item)">
      <font-awesome-icon class="text-[13px] -translate-y-[1px]" :icon="`fa-solid fa-house`" />
      <span :class="[`ml-10px select-none transition-[opacity] duration-100 opacity-[1]`]">{{ item.meta.title }}</span>
      <font-awesome-icon v-if="item.children" :class="[`ml-auto text-gray-400 transition-all duration-300`]"
        :icon="['fas', 'caret-right']" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Menu } from "@/api/menu";
import { PropType, ref } from "vue";
import { useSettingsStore } from "@/store/settings";
import * as MenuTip from "../index";
import type { Link } from "../index";

const prop = defineProps({
  menus: {
    type: Array as PropType<Menu[]>,
    default: () => { },
  },
  parent: {
    type: Object as PropType<Link>,
    default: () => { },
  },
});

const store = useSettingsStore();
const clickHandle = (item: Menu) => {
  if (!item.alwaysShow) {
    store.openMenu(item);
  }
  store.subMenuHandle(item);
};

let vNodeCtx = ref();
const mouseInMenuItem = (menu: Menu, e: any) => {
  if (!menu.children) return;
  const { vNode, container } = MenuTip.show(
    menu,
    prop.menus.indexOf(menu) * 55,
    e.target
  );
  vNodeCtx.value = vNode;
};

const mouseLeave = () => {
  if (vNodeCtx.value) {
    vNodeCtx.value?.component?.setupState.leaveHandle();
    vNodeCtx.value = null;
  }
};
</script>
