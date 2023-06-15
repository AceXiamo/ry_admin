<template>
  <div class="flex flex-col h-80px shadow-md">
    <div class="flex h-45px items-center shadow px-10px">
      <div
        class="inline-flex px-10px text-12px cursor-pointer bg-blue-500 text-white rounded-4px py-5px"
        @click="menuChange"
      >
        <font-awesome-icon
          :icon="['fas', 'sliders']"
          :class="[
            'opacity-100 transition-all duration-100',
            store.menuMini ? 'hide-icon' : '',
          ]"
        />
        <font-awesome-icon
          :icon="['fas', 'bars']"
          :class="[
            'absolute transition-all opacity-0 duration-100',
            store.menuMini ? 'show-icon' : '',
          ]"
        />
      </div>
    </div>
    <div
      class="flex flex-auto h-0 px-10px items-center gap-10px overflow-auto hide-scroll"
    >
      <cache-menu></cache-menu>
    </div>
  </div>
</template>

<script lang="ts" setup>
import CacheMenu from "./CacheMenu.vue";
import { useSettingsStore } from "@/store/settings";
const store = useSettingsStore();

const menuChange = () => {
  store.changeSetting("menuMini", !store.menuMini);
};
</script>

<style lang="less" scoped>
.hide-scroll {
  &::-webkit-scrollbar {
    width: 0;
  }
}
</style>
