<script setup lang="ts">
interface QuestionType {
  id: number
  name: string
  description?: string
}

interface Category {
  id: number
  name: string
  description?: string
}

interface Tag {
  id: number
  name: string
}

interface Question {
  id: number
  content: string
  answer: string
  difficulty: number
  category: Category
  questionType: QuestionType
  tags: { tag: Tag }[]
  tips: string[]
}

const questions = ref<Question[]>([])
const currentQuestion = ref(null as Question | null)
const currentTips = ref([] as string[])
const qIndex = ref(0)

const error = ref(null)
async function fetchQuestions() {
  try {
    const data = await $fetch<Question[]>('/api/questions')
    // 随机打乱
    questions.value = data.sort(() => Math.random() - 0.5)
    console.log('获取的题目:', toRaw(questions.value))
    setCurrentQuestion()
    error.value = null
  }
  catch (e) {
    console.log(`获取题目失败`, e)
  }
}

function setCurrentQuestion() {
  currentQuestion.value = questions.value[qIndex.value]
  currentTips.value = currentQuestion.value.tips
  console.log(`currentQuestion.value`, currentQuestion.value)
}

const tipIndex = ref(-1)
function nextQuestion() {
  tipIndex.value = -1
  qIndex.value++
  setCurrentQuestion()
}

const show = ref(true)

function tips() {
  if (currentQuestion.value && tipIndex.value >= currentQuestion.value.tips.length - 1)
    return
  tipIndex.value++
}

function toggleShow() {
  show.value = !show.value
}

onMounted(() => {
  fetchQuestions()
})
</script>

<template>
  <div>
    <TCard v-if="currentQuestion" :title="`${qIndex + 1}. ${currentQuestion.content}`">
      <template #actions>
        <TButton @click="toggleShow">
          {{ show ? '隐藏答案' : '显示答案' }}
        </TButton>
        <TButton @click="tips">
          提示
          {{ currentTips.length - 1 - tipIndex }}
        </TButton>
      </template>
      <div class="space-y-2 flex flex-col justify-center">
        <div class="space-x-2">
          <TBadges v-for=" (tag) in currentQuestion.tags" :key="tag.tag.id" :text="tag.tag.name" />
        </div>
        <div>
          <template v-for=" (tip, _tipIndex) in currentTips" :key="_tipIndex">
            <p v-if="_tipIndex <= tipIndex">
              提示: {{ _tipIndex + 1 }}. {{ tip }}
            </p>
          </template>
        </div>
        <ShikiViewerMd v-model="show" :code="currentQuestion.answer" lang="markdown" />
      </div>
      <div class="space-x-2 mt-4">
        <TButton @click="nextQuestion">
          下一题
        </TButton>
        <TButton @click="nextQuestion">
          收藏
        </TButton>
        <TButton @click="nextQuestion">
          点赞
        </TButton>
      </div>
    </TCard>
  </div>
</template>
