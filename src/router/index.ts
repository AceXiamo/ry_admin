import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/views/login/index.vue'
import Result from '@/views/result/index.vue'
import Main from '@/views/main/index.vue'
import Layout from '@/framework/Layout.vue'
import { getRouters, Menu, MenuParentNode } from "@/api/menu";
import type { RouteRecordRaw } from 'vue-router'
import { useMenuStore } from '@/store/menu';
import { getToken } from '../utils/auth';
import { commit } from '../utils/initialize';

export const routerArr: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '',
    component: Layout,
    redirect: {
      name: 'Main'
    },
    children: [
      {
        path: '/',
        name: 'Main',
        component: Main
      },
    ]
  },
  {
    path: '/result',
    name: 'Result',
    component: Result
  },
]

let modules = import.meta.glob('@/views/**/*.vue')
const routerHandle = (items: Menu[]): RouteRecordRaw[] => {
  let routerArr: RouteRecordRaw[] = []

  const routeRecordRawTemplate = (item: Menu, parent?: RouteRecordRaw): RouteRecordRaw => {
    let routerItem: RouteRecordRaw
    let path = item.path.startsWith('/') ? item.path : '/' + item.path;
    if (item.children) {
      routerItem = {
        path: parent ? parent.path + path : path,
        name: item.name,
        component: item.component === 'Layout' ? () => import('@/framework/Layout.vue') : modules[`/src/views/${item.component}.vue`],
        children: [],
      }
    } else {
      routerItem = {
        path: parent ? parent.path + path : path,
        name: item.name,
        component: item.component === 'Layout' ? () => import('@/framework/Layout.vue') : modules[`/src/views/${item.component}.vue`],
      }
    }
    return routerItem
  }

  const childHandle = (items: Menu[], parent: RouteRecordRaw): any => {
    items.forEach(item => {
      if ((!item.hidden || !item.path) && !item.meta.link) {
        let routerItem: RouteRecordRaw = routeRecordRawTemplate(item, parent)
        parent.children?.push(routerItem)

        if (item.children) {
          childHandle(item.children, routerItem)
        }
      }
    })
  }

  items.forEach((item: Menu) => {
    let routerItem: RouteRecordRaw = routeRecordRawTemplate(item)
    if (item.children) {
      childHandle(item?.children, routerItem)
    }

    routerArr.push(routerItem)
  })

  return routerArr
}

const routerDataParentHandle = (menus: Menu[], parent: MenuParentNode[] = []) => {
  for (let menu of menus) {
    if (menu.children) {
      let pNode = {
        name: menu.name,
        title: menu.meta.title
      }
      routerDataParentHandle(menu.children, [...parent, pNode])
    }
    menu.parentNode = [...parent]
  }
}

// 已登陆用户的路由处理
if (getToken()) {
  let res = await getRouters()
  routerDataParentHandle(res.data)

  let menuItems = res.data
  routerArr.push(...routerHandle(menuItems))
  commit(() => {
    const menuStore = useMenuStore()
    menuStore.setMenus(menuItems)
  })
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

// 登录成功加载路由
export const reloadRouter = () => {
  getRouters().then(res => {
    routerDataParentHandle(res.data)
    
    let menuItems = res.data
    asyncRouterHanlde(menuItems)
    const menuStore = useMenuStore()
    menuStore.setMenus(menuItems)
  })
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routerArr
})

export default router
