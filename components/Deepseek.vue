<script setup>
import { ref } from 'vue'
import { marked } from 'marked'

import MarkdownIt from 'markdown-it'
import Shiki from '@shikijs/markdown-it'
import TTextarea from './ui/TTextarea.vue'

// const q = '说说你对 fetch 的理解，它有哪些优点和不足?'
const q = 'JavaScript 中 Object.keys 的返回值是无序的吗？'
const longText = ref(`根据${q}这个问题，提炼出面试官想问的重点是什么，列举说明。生成的内容，段落之间用两个换行，提高阅读体验。用这个格式生成内容：## 回答重点`)
const longText2 = ref(`根据${q}根据问题，使用对话的形式，以被面试者的角度回答问题。使用数组存储对话，数组每一项是{
  interviewer:'',
  interviewee:''
 }`)
const longText3 = ref(`根据${q}根据问题，提炼一个知识点，话题上稍微展开一下，提一下与 知识点 相关的一些内容。`)

const response = ref('')
const response2 = ref('')
const response3 = ref('')

// const show = ref(true)
async function callOpenAI(prompt, type) {
  try {
    const res = await $fetch('/api/deepseek', {
      method: 'POST',
      body: {
        prompt, // 将用户输入的长文本作为请求内容
      },
    })
    if (type === 1) {
      response.value = res // 保存返回的响应
      // 缓存
      localStorage.setItem('Response', response.value)
    }
    if (type === 2) {
      response2.value = res // 保存返回的响应
      // 缓存
      localStorage.setItem('Response2', response2.value)
    }
    if (type === 3) {
      response3.value = res // 保存返回的响应
      // 缓存
      localStorage.setItem('Response3', response3.value)
    }
  }
  catch (error) {
    console.error('Error:', error)
    response.value = 'An error occurred. Please check the console for more details.'
  }
}

const renderedMarkdown = ref('')
const renderedMarkdown2 = ref('')
const renderedMarkdown3 = ref('')

// const code = 'const a = 1' // 输入代码片段
onMounted(async () => {
  const md = MarkdownIt()

  md.use(await Shiki({
    // langs: ['markdown', 'javascript'],
    themes: {
      light: 'vitesse-light',
      dark: 'vitesse-dark',
    },
  }))

  response.value = localStorage.getItem('Response')
  response2.value = localStorage.getItem('Response2')
  response3.value = localStorage.getItem('Response3')

  renderedMarkdown.value = marked(response.value)
  // // renderedMarkdown2.value = marked(response2.value)
  // // renderedMarkdown3.value = marked(response3.value)

  renderedMarkdown.value = md.render(response.value)
  renderedMarkdown2.value = md.render(response2.value)
  renderedMarkdown3.value = md.render(response3.value)
})
</script>

<template>
  <div class="space-y-4 code">
    <h1>Test OpenAI API with Long Text</h1>
    <TTextarea v-model="longText" />
    <div class="space-x-4">
      <TButton @click="callOpenAI(longText, 1)">
        AI 1
      </TButton>
      <TButton @click="callOpenAI(longText2, 2)">
        AI 2
      </TButton>
      <TButton @click="callOpenAI(longText3, 3)">
        AI 3
      </TButton>
    </div>
    <div v-if="response">
      <div class="space-y-2" v-html="renderedMarkdown" />
    </div>
    <div v-if="response2">
      <div v-html="renderedMarkdown2" />
    </div>
    <div v-if="response3">
      <div v-html="renderedMarkdown3" />
    </div>
  </div>
</template>

<style scoped>
h2 {
  font-size: 50px;
  font-weight: 700;
  margin-bottom: 1rem;
}
</style>
