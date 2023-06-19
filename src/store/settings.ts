import { ref } from 'vue'
import { defineStore } from 'pinia'
import router from '@/router'
import { Menu, mainMenu } from '@/api/menu'

const cacheKey = 'site_setting'
const storage = JSON.parse(localStorage.getItem(cacheKey) || '{}')
export const useSettingsStore = defineStore('settings', () => {
  const menuMini = ref<boolean>(storage.menuMini || false)
  const cacheMenus = ref<Menu[]>(storage.cacheMenus || [
    mainMenu
  ])
  const activeMenu = ref<Menu>(storage.activeMenu || mainMenu)
  const subMenuLink = ref<string[]>(storage.subMenuLink || [])

  const closeMenu = (menu: Menu) => {
    if (menu.name === activeMenu.value.name) {
      activeMenuChange(mainMenu)
    }
    const index = cacheMenus.value.indexOf(menu)
    cacheMenus.value.splice(index, 1)
    settingHandle('cacheMenus', cacheMenus.value)
  }

  const openMenu = (menu: Menu) => {
    const index = cacheMenus.value.findIndex((item) => item.name === menu.name)
    if (index === -1) {
      cacheMenus.value.push(menu)
    }
    settingHandle('cacheMenus', cacheMenus.value)
    activeMenuChange(menu)
  }

  const subMenuHandle = (menu: Menu) => {
    let arr: string[] = []
    if (subMenuLink.value.includes(menu.name)) {
      let i = subMenuLink.value.indexOf(menu.name)
      arr = subMenuLink.value.slice(0, i)
    } else {
      if (menu.alwaysShow) { arr.push(menu.name) }
      if (menu.parentNode) {
        arr = [
          ...menu.parentNode.map((item) => item.name),
          ...arr
        ]
      }
    }
    subMenuLink.value = arr
    settingHandle('subMenuLink', arr)
  }

  const activeMenuChange = (menu: Menu) => {
    activeMenu.value = menu
    settingHandle('activeMenu', menu)
    subMenuHandle(menu)
    router.push({
      name: menu.name,
    })
  }

  const changeSetting = (key: string, value: boolean) => {
    menuMini.value = value
    settingHandle(key, value)
  }

  const settingHandle = (key: string, value: any) => {
    storage[key] = value
    localStorage.setItem(cacheKey, JSON.stringify(storage))
  }

  return { menuMini, cacheMenus, activeMenu, subMenuLink, subMenuHandle, activeMenuChange, openMenu, closeMenu, changeSetting }
})
