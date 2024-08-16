import { acceptHMRUpdate, defineStore } from 'pinia'

export const useMenuStore = defineStore('user', () => {
  const menuList = ref([
    {
      name: 'Home',
      path: '/',
      current: true,
      title: 'Home',
    },
    {
      name: 'PracticeQuestions',
      path: '/PracticeQuestions',
      title: 'PracticeQuestions',
      current: false,
    },
    // {
    //   name: 'Exams',
    //   path: '/exams',
    //   current: false,
    // },
    {
      name: 'About',
      path: '/about',
      title: 'About',
      current: false,
    },
    {
      name: 'Data',
      path: '/data',
      title: 'Data',
      current: false,
    },
  ])

  return {
    menuList,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
