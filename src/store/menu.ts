import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import type { Menu } from '@/api/menu';

let menus = ref<Menu[]>([])
const useMenuStore = defineStore('menu', () => {

  let menuItems = reactive<Menu[]>(menus.value)

  return { menuItems }
})

export { useMenuStore, menus }
