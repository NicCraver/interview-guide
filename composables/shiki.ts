import type { Ref } from 'vue'
import { ref } from 'vue'

export async function useShiki(code: Ref<string>, hlOptions = {}) {
  const codeToHtml = ref(() => code.value)
  const init = async () => {
    const { getHighlighter } = await import('shiki-es')
    const highlighter = await getHighlighter(hlOptions)
    codeToHtml.value = () => highlighter.codeToHtml(code.value, hlOptions)
  }
  if (import.meta.server) {
    await init()
  }
  else {
    init()
  }
  return computed(() => codeToHtml.value())
}
