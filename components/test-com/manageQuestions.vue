<!-- pages/manage-questions.vue -->
<script setup lang="ts">
import type { Ref } from 'vue'

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

const questionTypes: Ref<QuestionType[]> = ref([])
const categories: Ref<Category[]> = ref([])
const tags: Ref<Tag[]> = ref([])
const questions: Ref<Question[]> = ref([])
const error: Ref<string | null> = ref(null)

function handleError(e: any, message: string) {
  console.error(message, e)
  error.value = `${message}: ${e.message || '未知错误'}`
}

// 题目类型
async function fetchQuestionTypes() {
  try {
    questionTypes.value = await $fetch<QuestionType[]>('/api/question-types')
    console.log('获取的题目类型:', questionTypes.value)
    error.value = null
  }
  catch (e) {
    handleError(e, '获取题目类型失败')
  }
}

async function createQuestionType() {
  try {
    const newType = await $fetch<QuestionType>('/api/question-types/create', {
      method: 'POST',
      body: { name: '新题目类型', description: '这是一个新的题目类型' },
    })
    questionTypes.value.push(newType)
    console.log('创建的题目类型:', newType)
    error.value = null
  }
  catch (e) {
    handleError(e, '创建题目类型失败')
  }
}

// 分类
async function fetchCategories() {
  try {
    categories.value = await $fetch<Category[]>('/api/categories')
    console.log('获取的分类:', categories.value)
    error.value = null
  }
  catch (e) {
    handleError(e, '获取分类失败')
  }
}

async function createCategory() {
  try {
    const newCategory = await $fetch<Category>('/api/categories/create', {
      method: 'POST',
      body: { name: '新分类', description: '这是一个新的分类' },
    })
    categories.value.push(newCategory)
    console.log('创建的分类:', newCategory)
    error.value = null
  }
  catch (e) {
    handleError(e, '创建分类失败')
  }
}

// 标签
async function fetchTags() {
  try {
    tags.value = await $fetch<Tag[]>('/api/tags')
    console.log('获取的标签:', tags.value)
    error.value = null
  }
  catch (e) {
    handleError(e, '获取标签失败')
  }
}

async function createTag() {
  try {
    const newTag = await $fetch<Tag>('/api/tags/create', {
      method: 'POST',
      body: { name: '新标签' },
    })
    tags.value.push(newTag)
    console.log('创建的标签:', newTag)
    error.value = null
  }
  catch (e) {
    handleError(e, '创建标签失败')
  }
}

// 题目
async function fetchQuestions() {
  try {
    questions.value = await $fetch<Question[]>('/api/questions')
    console.log('获取的题目:', questions.value)
    error.value = null
  }
  catch (e) {
    handleError(e, '获取题目失败')
  }
}

// 新增：用于创建面试题的辅助函数
async function findOrCreateCategory(name: string): Promise<number> {
  let category = categories.value.find(c => c.name === name)
  if (!category) {
    category = await $fetch<Category>('/api/categories/create', {
      method: 'POST',
      body: { name, description: `Category for ${name}` },
    })
    categories.value.push(category)
  }
  return category.id
}

async function findOrCreateQuestionType(name: string): Promise<number> {
  let questionType = questionTypes.value.find(qt => qt.name === name)
  if (!questionType) {
    questionType = await $fetch<QuestionType>('/api/question-types/create', {
      method: 'POST',
      body: { name, description: `Question type for ${name}` },
    })
    questionTypes.value.push(questionType)
  }
  return questionType.id
}

async function findOrCreateTags(names: string[]): Promise<number[]> {
  const tagIds: number[] = []
  for (const name of names) {
    let tag = tags.value.find(t => t.name === name)
    if (!tag) {
      tag = await $fetch<Tag>('/api/tags/create', {
        method: 'POST',
        body: { name },
      })
      tags.value.push(tag)
    }
    tagIds.push(tag.id)
  }
  return tagIds
}

// 创建面试题的主函数
async function createInterviewQuestion(questionData: {
  content: string
  answer: string
  difficulty: number
  categoryName: string
  questionTypeName: string
  tagNames: string[]
  tips: string[]
}) {
  try {
    // 确保所有必要的数据都已加载
    if (categories.value.length === 0)
      await fetchCategories()
    if (questionTypes.value.length === 0)
      await fetchQuestionTypes()
    if (tags.value.length === 0)
      await fetchTags()

    const categoryId = await findOrCreateCategory(questionData.categoryName)
    const questionTypeId = await findOrCreateQuestionType(questionData.questionTypeName)
    const tagIds = await findOrCreateTags(questionData.tagNames)

    const newQuestionData = {
      content: questionData.content,
      answer: questionData.answer,
      difficulty: questionData.difficulty,
      categoryId,
      questionTypeId,
      tagIds,
      tips: questionData.tips,
    }

    console.log('准备创建的面试题数据:', newQuestionData)

    const newQuestion = await $fetch<Question>('/api/questions/create', {
      method: 'POST',
      body: newQuestionData,
    })

    questions.value.push(newQuestion)
    console.log('成功创建的面试题:', newQuestion)
    error.value = null

    // 重新获取所有数据以确保同步
    await fetchCategories()
    await fetchQuestionTypes()
    await fetchTags()
    await fetchQuestions()
  }
  catch (e: any) {
    console.error('创建面试题失败:', e)
    error.value = `创建面试题失败: ${e.message || '未知错误'}`
    if (e.data) {
      console.error('错误详情:', e.data)
    }
  }
}

// 示例使用
function handleCreateInterviewQuestion() {
  createInterviewQuestion({
    content: '操作数组的方法有哪些？哪些方法会改变原数组？',
    answer: `- 操作数组的方法有:`,
    difficulty: 5,
    categoryName: 'JavaScript',
    questionTypeName: '数组操作',
    tagNames: ['JavaScript', '数组', '方法', '原数组'],
    tips: [
      '熟悉数组常用方法及其功能，尤其是如何操作原数组和不操作原数组的方法。',
      '注意区分哪些方法会改变原数组的内容，哪些方法会返回新数组。',
      '理解每个数组方法的作用和它们对数组的影响，例如 push() 和 pop() 会改变原数组，而 slice() 和 map() 不会。',
    ],
  })
}

const show = ref(true)

onMounted(() => {
  fetchQuestions()
})
</script>

<template>
  <div>
    <h1>管理题目</h1>

    <!-- 题目 -->
    <div>
      <h2>题目</h2>
      <TButton @click="fetchQuestions">
        获取题目
      </TButton>
      <!-- 新增：创建面试题按钮 -->
      <div>
        <h2>创建面试题</h2>
        <TButton @click="handleCreateInterviewQuestion">
          创建示例面试题
        </TButton>
      </div>
      <div v-if="questions.length" class="mt-4">
        <div v-for="(question, index) in questions" :key="question.id" class="question-card">
          <h3>{{ question.content }}</h3>
          <p v-if="index !== 0">
            <strong>答案：</strong>{{ question.answer }}
          </p>
          <ShikiViewer v-else v-model="show" :code="question.answer" />
          <p><strong>难度：</strong> {{ question.difficulty }}</p>
          <p><strong>分类：</strong> {{ question.category.name }}</p>
          <p><strong>题目类型：</strong> {{ question.questionType.name }}</p>
          <p><strong>标签：</strong> {{ question.tags.map(t => t.tag.name).join(', ') }}</p>
          <p><strong>提示：</strong> {{ question.tips.map(t => t).join('') }}</p>
        </div>
      </div>
    </div>
    <!-- 题目类型 -->
    <div>
      <h2>题目类型</h2>
      <TButton @click="fetchQuestionTypes">
        获取题目类型
      </TButton>
      <TButton @click="createQuestionType">
        创建题目类型
      </TButton>
      <ul v-if="questionTypes.length">
        <li v-for="type in questionTypes" :key="type.id">
          {{ type.name }}
        </li>
      </ul>
    </div>

    <!-- 分类 -->
    <div>
      <h2>分类</h2>
      <TButton @click="fetchCategories">
        获取分类
      </TButton>
      <TButton @click="createCategory">
        创建分类
      </TButton>
      <ul v-if="categories.length">
        <li v-for="category in categories" :key="category.id">
          {{ category.name }}
        </li>
      </ul>
    </div>

    <!-- 标签 -->
    <div>
      <h2>标签</h2>
      <TButton @click="fetchTags">
        获取标签
      </TButton>
      <TButton @click="createTag">
        创建标签
      </TButton>
      <ul v-if="tags.length">
        <li v-for="tag in tags" :key="tag.id">
          {{ tag.name }}
        </li>
      </ul>
    </div>
    <!-- 错误信息 -->
    <div v-if="error" class="error">
      {{ error }}
    </div>
  </div>
</template>

<style scoped>
.error {
  color: red;
  margin-top: 20px;
}

.question-card {
  border: 1px solid #ddd;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 5px;
}

.question-card h3 {
  margin-top: 0;
}
</style>
