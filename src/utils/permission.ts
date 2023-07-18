import router from '@/router/index'
import { getToken } from './auth'
import { useMenuStore } from '@/store/menu'
import { getRouters, Menu, MenuParentNode } from '@/api/menu'
import type { RouteRecordRaw } from 'vue-router'
import Logger from '@/core/logger'
import { mainMenu } from '@/api/menu';
import FullLoading from '@/components/FullLoading'

if (getToken()) {
  FullLoading.show(1000)
}

const whiteList = ['/login', '/auth-redirect', '/bind', '/register']
const modules = import.meta.glob('@/views/**/*.vue')

const routerDataHandle = (menus: Menu[], parent: MenuParentNode[] = []) => {
  for (const menu of menus) {
    if (menu.children) {
      const pNode = {
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
    const path = v.path.startsWith('/') ? v.path : '/' + v.path;
    const routerItem: RouteRecordRaw = {
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

router.beforeEach(async (to, from, next) => {
  if (getToken()) {
    if (useMenuStore().menuItems.length === 0) {
      const res = await getRouters();
      if (res.code === 200) {
        Logger.setting('menu & router', 'menu & router loaded ✅')
        const menuItems = res.data
        routerDataHandle(menuItems)
        asyncRouterHanlde(menuItems)
        useMenuStore().menuItems = [mainMenu, ...menuItems]
      }
      next({ ...to, replace: true })
    } else {
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
    }
  }
})
