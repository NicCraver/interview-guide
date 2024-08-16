<script setup lang="ts">
const route = useRoute<'MockExam-id'>()
const mockExam = useMockExamStore()

watchEffect(() => {
  mockExam.setExamId(route.params.id as string)
})

const { data } = await useFetch<any>('/api/question')
const lang = ref('plaintext')
const people = [
  { id: 0, name: 'plaintext' },
  { id: 1, name: 'javascript' },
  { id: 2, name: 'typescript' },
  { id: 3, name: 'python' },
  { id: 4, name: 'java' },
  { id: 5, name: 'c++' },
  { id: 6, name: 'c#' },
  { id: 7, name: 'go' },
  { id: 8, name: 'php' },
  { id: 9, name: 'ruby' },
  { id: 10, name: 'swift' },
  { id: 11, name: 'kotlin' },
  { id: 12, name: 'rust' },
  { id: 13, name: 'scala' },
  { id: 14, name: 'groovy' },
  { id: 15, name: 'dart' },
]

const selectedPerson = ref(people[3])
const monacoRef = ref<any>()
onMounted(() => {
  console.log(`monacoRef.value`, monacoRef.value)
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
        <MonacoEditor ref="monacoRef" v-model="v.answer" class="h-80" :lang="lang" />
      </div>
    </ClientOnly>
  </div>
</template>

<style scoped></style>
