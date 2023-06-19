import { ref } from 'vue'
import { defineStore } from 'pinia'
import { Menu, mainMenu } from '@/api/menu';

export const useMenuStore = defineStore('menu', () => {

  let menuItems = ref<Menu[]>([])

  const setMenus = (menus: Menu[]) => {
    menuItems.value = [mainMenu, ...menus]
  }

  return { menuItems, setMenus }
})
