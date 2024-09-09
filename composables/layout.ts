import { defineStore } from 'pinia'

export const useLayoutStore = defineStore('layout', () => {
  // 填充满全屏或仅占设定宽度
  type ContentStatus = 'full' | 'width'
  const contentStatus = ref<ContentStatus>('full')
  // const contentWidth = ref(0)

  return {
    contentStatus,
  }
})
