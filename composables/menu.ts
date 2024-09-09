import { acceptHMRUpdate, defineStore } from 'pinia'

export const useMenuStore = defineStore('menus', () => {
  const menuList = ref([
    {
      name: '考试',
      path: '/',
      current: true,
      title: 'Home',
    },
    {
      name: '题库',
      path: '/QuestionBank',
      current: false,
      title: 'QuestionBank',
    },
    // {
    //   name: 'PracticeQuestions',
    //   path: '/PracticeQuestions',
    //   title: 'PracticeQuestions',
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

  function setMenuList(path: string) {
    // console.log(`path`, path)
    menuList.value = menuList.value.map((item) => {
      if (item.path === path) {
        item.current = true
      }
      else {
        item.current = false
      }
      // console.log(`item`, item)
      return item
    })
  }

  return {
    menuList,
    setMenuList,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
