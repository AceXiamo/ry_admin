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

const loadSyncRouter = async () => {
  if (menuStore.menus.value.length === 0) {
    let res = await getRouters();
    if (res.code === 200) {
      Logger.setting('menu & router', 'menu & router loaded ✅')
      let menuItems = res.data
      routerDataHandle(menuItems)
      asyncRouterHanlde(menuItems)
      menuStore.menus.value = [mainMenu, ...menuItems]
    }
  }
}

await loadSyncRouter()

router.beforeEach(async (to, from, next) => {
  await loadSyncRouter()

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
