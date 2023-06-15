import { ref } from 'vue'
import { defineStore } from 'pinia'
import router from '@/router'

export type CacheMenu = {
  name: string
  title: string
  path: string
  noClose: boolean
  pNames?: string[]
}

const cacheKey = 'site_setting'
const storage = JSON.parse(localStorage.getItem(cacheKey) || '{}')
export const useSettingsStore = defineStore('settings', () => {
  const menuMini = ref<boolean>(storage.menuMini || false)

  // 缓存中的已打开菜单
  const cacheMenus = ref<CacheMenu[]>(storage.cacheMenus || [
    {
      name: 'Main',
      title: '首页',
      path: '/',
      noClose: true
    }
  ])
  const activeMenu = ref<string>(storage.activeMenu || 'Main')

  const setMenus = (menus: CacheMenu[]) => {
    cacheMenus.value = menus
  }

  const closeMenu = (name: string) => {
    if (name === activeMenu.value) {
      activeMenuChange('Main')
    }
    const index = cacheMenus.value.findIndex((item) => item.name === name)
    cacheMenus.value.splice(index, 1)
    settingHandle('cacheMenus', cacheMenus.value)
  }

  const openMenu = (menu: CacheMenu) => {
    const index = cacheMenus.value.findIndex((item) => item.name === menu.name)
    if (index === -1) {
      cacheMenus.value.push(menu)
    }
    settingHandle('cacheMenus', cacheMenus.value)
    activeMenuChange(menu.name)
  }

  const activeMenuChange = (name: string) => {
    activeMenu.value = name

    settingHandle('activeMenu', name)
    let menu = cacheMenus.value.find((item) => item.name === name)
    if (menu) {
      router.push({
        name: menu.name,
      })
    }
  }

  const changeActiveMenu = (name: string) => {
    activeMenuChange(name)
  }

  const changeSetting = (key: string, value: boolean) => {
    menuMini.value = value
    settingHandle(key, value)
  }

  const settingHandle = (key: string, value: any) => {
    storage[key] = value
    localStorage.setItem(cacheKey, JSON.stringify(storage))
  }

  return { menuMini, cacheMenus, activeMenu, changeActiveMenu, openMenu, setMenus, closeMenu, changeSetting }
})
