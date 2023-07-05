import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/views/login/index.vue'
import Result from '@/views/result/index.vue'
import Main from '@/views/main/index.vue'
import Layout from '@/framework/Layout.vue'
import type { RouteRecordRaw } from 'vue-router'


const routerArr: RouteRecordRaw[] = [
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

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routerArr
})

export default router
