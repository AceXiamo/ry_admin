import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import type { Menu } from '@/api/menu';

const useMenuStore = defineStore('menu', () => {

  let menuItems = ref<Menu[]>([])

  return { menuItems }
})

export { useMenuStore }
