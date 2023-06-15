<template>
  <template v-for="item in props.items">
    <template v-if="item.children && item.children.length > 0">
      <el-sub-menu :index="item.name">
        <template #title>
          <font-awesome-icon :icon="item.meta.icon" />
          <span class="ml-10px">{{ item.meta.title }}</span>
        </template>
        <MenuItem :items="item.children"> </MenuItem>
      </el-sub-menu>
    </template>
    <template v-else>
      <el-menu-item :index="item.name">
        <font-awesome-icon :icon="item.meta.icon" />
        <span class="ml-10px" :data="item.name">{{ item.meta.title }}</span>
        <MenuItem :items="item.children"> </MenuItem>
      </el-menu-item>
    </template>
  </template>
</template>

<script lang="ts" setup>
import type { Menu } from "@/api/menu";
import type { PropType } from "vue";
import { useSettingsStore } from "@/store/settings";
import type { CacheMenu } from "@/store/settings";

const store = useSettingsStore();
const props = defineProps({
  items: {
    type: Array as PropType<Menu[]>,
    default: () => [],
  },
});

const clickHandle = (item: Menu) => {
  let cacheItem: CacheMenu = {
    name: item.name,
    path: item.path,
    noClose: false,
    title: item.meta.title,
    pNames: item.pNames
  };
  store.openMenu(cacheItem);
};
</script>
