import router from '@/router/index'
import { getToken } from './auth'
import * as menuStore from '@/store/menu'
import { getRouters, Menu, MenuParentNode } from '@/api/menu'
import type { RouteRecordRaw } from 'vue-router'
import Logger from '@/utils/logger'
import { mainMenu } from '@/api/menu';

const whiteList = ['/login', '/auth-redirect', '/bind', '/register']
const modules = import.meta.glob('@/views/**/*.vue')

const routerDataHandle = (menus: Menu[], parent: MenuParentNode[] = []) => {
  for (let menu of menus) {
    if (menu.children) {
      let pNode = {
        name: menu.name,
        title: menu.meta.title
      }
      routerDataHandle(menu.children, [...parent, pNode])
    }
    menu.parentNode = [...parent]
  }
}

const asyncRouterHanlde = (items: Menu[], parent?: RouteRecordRaw) => {
  items.forEach(v => {
    let path = v.path.startsWith('/') ? v.path : '/' + v.path;
    let routerItem: RouteRecordRaw = {
      path: parent ? parent.path + path : path,
      name: v.name,
      component: v.component === 'Layout' ? () => import('@/framework/Layout.vue') : modules[`/src/views/${v.component}.vue`],
    }

    if (parent) {
      router.addRoute(parent.name?.toString() || '', routerItem)
    } else {
      router.addRoute(routerItem)
    }

    if (v.children) {
      asyncRouterHanlde(v.children, routerItem)
    }
  })
}

const loadSyncRouter = () => {
  return new Promise((resolve, reject) => {
    if (menuStore.menus.value.length === 0) {
      getRouters().then(res => {
        if (res.code === 200) {
          Logger.setting('menu & router', 'menu & router loaded ✅')
          let menuItems = res.data
          routerDataHandle(menuItems)
          asyncRouterHanlde(menuItems)
          menuStore.menus.value = [mainMenu, ...menuItems]
          resolve('')
        } else {
          Logger.setting('menu & router', 'menu & router loaded, because is not login ❌')
          reject('')
        }
      })
    }
  })
}

await loadSyncRouter()

// let menuStore: any = null
router.beforeEach(async (to, from, next) => {

  // menuStore = useMenuStore()
  // Logger.setting('before jump', 'begin')
  // Logger.setting('before jump', `pinia status: ${menuStore == null ? 'off' : 'on'}`)

  // Logger.setting('before jump', `menu & router status: ${menuStore.menuItems.length === 0 ? 'off' : 'on'}`)
  // if (menuStore.menuItems.length === 0) {
  //   Logger.setting('before jump', 'menu & router loading...')

  //   let res = await getRouters()
  //   if (res.code === 200) {
  //     Logger.setting('before jump', 'menu & router loaded ✅')

  //     let menuItems = res.data
  //     routerDataHandle(menuItems)
  //     asyncRouterHanlde(menuItems)
  //     menuStore.setMenus(menuItems)
  //   } else {
  //     Logger.setting('before jump', 'menu & router loaded, because is not login ❌')
  //   }
  // }

  if (whiteList.indexOf(to.path) !== -1) {
    if (getToken()) {
      next('/')
    } else {
      next()
    }
  } else {
    if (getToken()) {
      next()
    } else {
      next('/login')
    }
  }
})
