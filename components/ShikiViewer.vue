<script lang="ts" setup>
import { ShikiMagicMove } from 'shiki-magic-move/vue'
import { createHighlighter } from 'shiki'
import 'shiki-magic-move/dist/style.css'

// 定义 props 和 emits
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  code: {
    type: String,
    default: '',
  },
})

// 高亮器的创建
const highlighter = await createHighlighter({
  themes: ['nord'],
  langs: ['javascript', 'typescript', 'markdown'],
})

// 用于保存代码内容的响应式数据
const codeData = ref('')
// 用于控制透明度的状态变量
const show = ref(props.modelValue)
// 用于延迟控制透明度动画的状态变量
const fade = ref(props.modelValue)

// 监听 `modelValue` 的变化
watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue) {
      show.value = true // 立即显示内容
      fade.value = true // 立即显示透明度动画
      codeData.value = props.code
    }
    else {
      codeData.value = ''
      setTimeout(() => {
        show.value = false // 延迟800毫秒后隐藏内容
      }, 600)
    }
  },
  { immediate: true },
)

// 监听 `code` 的变化
watch(
  () => props.code,
  (newValue) => {
    if (props.modelValue) {
      codeData.value = newValue
    }
  },
  { immediate: true },
)
onUnmounted(() => {
  highlighter.dispose()
})
</script>

<template>
  <div
    class="w-full h-full"
    :class="[show ? 'opacity-100 transition-opacity duration-500 ease-in-out' : 'opacity-0 transition-opacity duration-500 ease-in-out']"
  >
    <ShikiMagicMove
      lang="markdown" theme="nord" :highlighter="highlighter" :code="codeData"
      :options="{ duration: 800, stagger: 0.3, lineNumbers: true }"
      class="max-h-80 p-4 border border-gray-200 rounded-lg overflow-auto"
    />
  </div>
</template>
