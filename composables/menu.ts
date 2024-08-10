import { acceptHMRUpdate, defineStore } from 'pinia'

export const useMenuStore = defineStore('user', () => {
  const menuList = ref([
    {
      name: 'Home',
      path: '/',
      icon: 'home',
      current: true,
    },
    // {
    //   name: 'Exams',
    //   path: '/exams',
    //   icon: 'book',
    //   current: false,
    // },
    {
      name: 'About',
      path: '/about',
      icon: 'info',
      current: false,
    },
    {
      name: 'Data',
      path: '/data',
      icon: 'info',
      current: false,
    },
  ])

  return {
    menuList,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
