<script setup lang="ts">
import { codeToHtml } from 'shiki'

const html = ref('')

const route = useRoute<'MockExam-id'>()
const mockExam = useMockExamStore()

watchEffect(() => {
  mockExam.setExamId(route.params.id as string)
})

const { data } = await useFetch<any>('/api/question')
const lang = ref('plaintext')
const people = [
  { id: 0, name: 'plaintext' },
  { id: 1, name: 'markdown' },
  { id: 2, name: 'javascript' },
  { id: 3, name: 'css' },
  { id: 4, name: 'json' },
  { id: 5, name: 'yaml' },
  { id: 6, name: 'html' },
  { id: 7, name: 'typescript' },
  { id: 8, name: 'python' },
  { id: 9, name: 'java' },
  { id: 10, name: 'c++' },
]

const selectedPerson = ref(people[3])
const monacoRef = ref<any>()
onMounted(async () => {
  console.log(`monacoRef.value`, monacoRef.value)
  // html.value = await codeToHtml('console.log("Hello World")', {
  //   lang: 'javascript',
  //   theme: 'none',
  // })
  const code = 'const a = 1' // input code
  html.value = await codeToHtml(code, {
    lang: 'javascript',
    theme: 'vitesse-dark',
  })

  console.log(html) // highlighted html string
})
</script>

<template>
  <div>
    <ClientOnly>
      <div @click="lang = 'typescript'">
        {{ data }}
      </div>

      <h1>随机出题系统</h1>
      <div v-for="(v, index) in data?.data" :key="v.id">
        <div>{{ index + 1 }}. {{ v.question }}</div>
        <TTextarea v-model="v.answer" />
        <div>
          <TSelect v-model="selectedPerson" :options="people" label="Assigned to" />
        </div>
        <!-- <MonacoEditor ref="monacoRef" v-model="v.answer" class="h-80" :lang="selectedPerson" /> -->
      </div>
      <div class="mt-4">
        <!-- <div id="editor" class="h-100" /> -->
        <Shiki id="shiki" lang="js" :code="html" class="h-80" />
        <div v-html="html" />
        <TTextarea v-model="html" />
      </div>
    </ClientOnly>
  </div>
</template>

<style scoped></style>
