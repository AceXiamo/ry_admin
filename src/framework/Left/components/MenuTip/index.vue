<template>
  <div
    :class="[`w-[200px] bg-gray-600 origin-top-left transition-all duration-200 ${ani}`]"
    @mouseleave="leaveHandle"
  >
    <item :menus="menu.children" :parent="parent"></item>
  </div>
</template>

<script lang="ts" setup>
import Item from "./components/Item.vue";
import { PropType, ref } from "vue";
import type { Menu } from "@/api/menu";
import type { Link } from './index'

let ani = ref<string>("animate-[showAni_.15s_forwards_linear]");

const prop = defineProps({
  menu: {
    type: Object as PropType<Menu>,
    default: () => {},
  },
  closeSubMenu: {
    type: Function as PropType<() => void>,
    default: () => {},
  },
  parent: {
    type: Object as PropType<Link>,
    default: () => {},
  },
});

const leaveHandle = () => {
  ani.value = "animate-[hideAni_.15s_forwards_linear]";
  setTimeout(() => {
    prop.closeSubMenu();
  }, 150);
};
</script>
<style lang="less">
@keyframes showAni {
  0% {
    opacity: 0;
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes hideAni {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0.9);
  }
}
</style>
