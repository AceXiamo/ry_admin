import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Menu } from '@/api/menu';

export const useMenuStore = defineStore('menu', () => {
  let menuItems = ref<Menu[]>([])
  let activeMenuName = ref<string>('')

  const setMenus = (menus: Menu[]) => {
    menuItems.value = [{
      name: 'Main',
      path: '/',
      meta: {
        title: '首页',
        icon: 'el-icon-s-home',
        noCache: false,
        link: '',
      },
      hidden: false,
    }, ...menus]
  }

  const setActiveMenuName = (name: string) => {
    activeMenuName.value = name
  }

  const getMenuByName = (name: string, menus: Menu[] = menuItems.value) : Menu | null => {
    for (let v of menus) {
      if (v.name === name) {
        return v
      }
      if (v.children) {
        let menu = getMenuByName(name, v.children)
        if (menu) {
          return menu
        }
      }
    }
    return null;
  }

  return { menuItems, activeMenuName, setMenus, setActiveMenuName, getMenuByName }
})
