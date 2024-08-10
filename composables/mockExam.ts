import { acceptHMRUpdate, defineStore } from 'pinia'

export const useMockExamStore = defineStore('mockExam', () => {
  const savedId = ref('')

  function setExamId(id: string) {
    savedId.value = id
  }

  return {
    setExamId,
    savedId,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
