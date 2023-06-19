<template>
  <template v-for="item in props.items">
    <div
      :class="[
        `flex flex-col text-gray-200 text-[13px] font-light cursor-pointer justify-center transition-all duration-300`,
        `min-w-[200px]`,
      ]"
    >
      <!-- menu item -->
      <div @mouseenter="mouseInMenuItem(item, $event)" @mouseleave="mouseLeave">
        <menu-item :item="item" :level="level"></menu-item>
      </div>
      <!-- child -->
      <div
        v-if="item.children && item.children.length > 0"
        :class="[
          `overflow-hidden transition-all duration-200 h-0px`,
          store.subMenuLink.includes(item.name) ? `opacity-[1]` : 'opacity-0',
        ]"
        :style="{
          height:
            store.subMenuLink.includes(item.name) && !store.menuMini
              ? item.children.length * 55 + 'px'
              : '',
        }"
      >
        <menu-bar :items="item.children" :level="level + 1"></menu-bar>
      </div>
    </div>
  </template>
</template>

<script lang="ts" setup>
import MenuItem from "./components/MenuItem.vue";
import type { Menu } from "@/api/menu";
import { PropType, ref } from "vue";
import { useSettingsStore } from "@/store/settings";
import * as MenuTip from "./components/MenuTip";

const store = useSettingsStore();
const props = defineProps({
  items: {
    type: Array as PropType<Menu[]>,
    default: () => [],
  },
  level: {
    type: Number,
    default: () => 0,
  },
});

let vNodeCtx = ref();
const mouseInMenuItem = (menu: Menu, e: any) => {
  if (!store.menuMini) return;

  let { vNode, container } = MenuTip.show(menu, e.target.offsetTop, e.target, true);
  vNodeCtx.value = vNode;
};

const mouseLeave = () => {
  if (vNodeCtx.value) {
    vNodeCtx.value?.component?.setupState.leaveHandle();
    vNodeCtx.value = null;
  }
};
</script>
