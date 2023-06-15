import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useLoginStore = defineStore('login', () => {
  const isLogin = ref(false)
  const user = ref({})

  const setIsLogin = (v: boolean) => {
    isLogin.value = v
  }

  const setUser = (v: any) => {
    user.value = v
  }

  return { isLogin, user, setIsLogin, setUser }
})
