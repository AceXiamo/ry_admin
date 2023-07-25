<template>
  <div class="flex flex-col h-80px shadow-md">
    <div class="flex h-45px items-center shadow px-10px gap-[10px]">
      <div
        class="inline-flex px-10px text-12px cursor-pointer bg-blue-500 text-white rounded-2px py-5px"
        @click="menuChange"
      >
        <font-awesome-icon
          :icon="['fas', 'sliders']"
          :class="[
            'transition-all duration-100',
            store.menuMini ? 'opacity-0' : 'opacity-100',
          ]"
        />
        <font-awesome-icon
          :icon="['fas', 'bars']"
          :class="[
            'absolute transition-all duration-200',
            store.menuMini ? 'opacity-[1]' : 'opacity-0',
          ]"
        />
      </div>
      <div class="text-sm text-gray-600 flex gap-[10px]">
        <div class="px-10px bg-blue-500 text-white rounded-2px cursor-default" v-for="(item, index) in menuLink" :key="index">
          <span>{{ item }}</span>
        </div>
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
import { computed } from "vue";
const store = useSettingsStore();

const menuChange = () => {
  store.changeSetting("menuMini", !store.menuMini);
};

const menuLink = computed(() => [...store.activeMenu.parentNode?.map((item) => item.title) || [], store.activeMenu.meta.title])
</script>

<style lang="less" scoped>
.hide-scroll {
  &::-webkit-scrollbar {
    width: 0;
  }
}
</style>
