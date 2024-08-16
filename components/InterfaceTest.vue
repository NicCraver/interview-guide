<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid'
import { CheckCircleIcon, XMarkIcon } from '@heroicons/vue/24/outline'
// import TNotification from '~/components/ui/TNotificationsManager'

// #region 接口测试逻辑
function useUserTest() {
  const userTestData = ref<any>('')
  async function fetchUsers() {
    const res = await $fetch('/api/users')
    console.log(res)
    userTestData.value = res
  }

  async function addUser() {
    const res = await $fetch('/api/users', {
      method: 'POST',
      body: { name: `New Us12er${uuidv4()}`, email: `${uuidv4()}ne21w@example.com` },
    })
    userTestData.value = res
  }

  async function updateUser() {
    await $fetch('/api/users', {
      method: 'PUT',
      body: { id: 3, name: 'Updated User111', email: 'updated@example.com' },
    })
  }

  async function deleteUser() {
    await $fetch('/api/users', {
      method: 'DELETE',
      body: { id: 200 },
    })
  }

  return { fetchUsers, addUser, updateUser, deleteUser, userTestData }
}
// #endregion

// #region 分页逻辑
function useUserPagination() {
  interface User {
    id: string
    name: string
    email: string
    // 添加其他用户属性
  }

  interface PaginationInfo {
    page: number
    limit: number
    total: number
    totalPages: number
  }

  interface ApiResponse {
    data: User[]
    pagination: PaginationInfo
  }

  const paginationParams = ref({
    page: 1,
    limit: 10,
  })

  const { data, error, refresh, status, clear } = useFetch<ApiResponse>('/api/users', {
    params: paginationParams,
  })

  const users = computed(() => data.value?.data ?? [])
  const pagination = computed(() => data.value?.pagination ?? {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  })

  const currentPage = computed({
    get: () => pagination.value.page,
    set: (value) => {
      paginationParams.value.page = value
      refresh()
    },
  })

  const totalPages = computed(() => pagination.value.totalPages)

  const paginationText = computed(() => {
    const { page, limit, total } = pagination.value
    const start = (page - 1) * limit + 1
    const end = Math.min(start + limit - 1, total)
    return `显示 ${start}-${end} 条，共 ${total} 条`
  })

  function updateLimit(newLimit: number) {
    paginationParams.value.limit = newLimit
    paginationParams.value.page = 1 // 重置到第一页
    refresh()
  }

  function goToFirstPage() {
    if (currentPage.value !== 1) {
      currentPage.value = 1
    }
  }

  function goToLastPage() {
    if (currentPage.value !== totalPages.value) {
      currentPage.value = totalPages.value
    }
  }

  function nextPage() {
    if (currentPage.value < totalPages.value) {
      currentPage.value++
    }
  }

  function prevPage() {
    if (currentPage.value > 1) {
      currentPage.value--
    }
  }

  function handleLimitChange(event: Event) {
    const target = event.target as HTMLSelectElement
    const newLimit = Number.parseInt(target.value, 10)
    if (!Number.isNaN(newLimit)) {
      updateLimit(newLimit)
    }
  }

  return {
    users,
    pagination,
    loading: computed(() => status.value === 'pending'),
    error,
    currentPage,
    totalPages,
    paginationText,
    handleLimitChange,
    goToFirstPage,
    goToLastPage,
    nextPage,
    prevPage,
    refresh,
    clear,
    status,
  }
}
// #endregion

// #region 通知、消息逻辑

const show = ref(false)
const num = ref(0)

function showNotification() {
  num.value++
  TNotification({
    title: `Prompt${num.value}`,
    message: 'This is a message that does not automatically close',
    duration: 0,
  })
}
function showMessage() {
  num.value++
  TMessage({
    message: `Prompt${num.value}`,
    type: 'success',
  })
}
// #endregion

// #region 创建题目
function useCreateQuestion() {
  function createQuestion() {
    const { data, error } = useFetch('/api/questionApi/create', {
      method: 'POST',
      body: {
        title: '测试题目',
        type: '选择题',
        options: [
          { label: '选项1', value: '1' },
          { label: '选项2', value: '2' },
          { label: '选项3', value: '3' },
          { label: '选项4', value: '4' },
        ],
        content: '这是题目内容',
        correctAnswer: '1',
      },
    })
    console.log(data.value, error.value)
  }

  return { createQuestion }
}
// #endregion

const {
  users,
  pagination,
  loading,
  error,
  currentPage,
  totalPages,
  paginationText,
  handleLimitChange,
  goToFirstPage,
  goToLastPage,
  nextPage,
  prevPage,
  refresh,
  clear,
  status,
} = useUserPagination()

const { fetchUsers, addUser, updateUser, deleteUser, userTestData } = useUserTest()

const { createQuestion } = useCreateQuestion()
</script>

<template>
  <TCard title="创建题目">
    <div class="space-x-2">
      <TButton @click="createQuestion">
        createQuestion
      </TButton>
    </div>
  </TCard>

  <TDividers />

  <TCard title="User接口测试">
    <div class="space-x-2">
      <TButton @click="fetchUsers">
        Fetch Users
      </TButton>
      <TButton @click="addUser">
        Add User
      </TButton>
      <TButton @click="updateUser">
        Update User
      </TButton>
      <TButton @click="deleteUser">
        Delete User
      </TButton>
      <TButton @click="fetchUsers">
        Fetch Users
      </TButton>
      <PreCode :code-data="userTestData" />
    </div>

    <div>----------</div>
    <!-- 分页逻辑 -->
    <div>
      <div v-if="loading">
        Loading...
      </div>
      <div v-else-if="error">
        Error: {{ error.message }}
      </div>
      <div v-else>
        <ul>
          <li v-for="user in users" :key="user.id">
            {{ user.name }}
          </li>
        </ul>
        <div class="pagination-controls">
          <TButton :disabled="currentPage <= 1" @click="goToFirstPage">
            First
          </TButton>
          <TButton :disabled="currentPage <= 1" @click="prevPage">
            Previous
          </TButton>
          <span>{{ paginationText }}</span>
          <TButton :disabled="currentPage >= totalPages" @click="nextPage">
            Next
          </TButton>
          <TButton :disabled="currentPage >= totalPages" @click="goToLastPage">
            Last
          </TButton>
        </div>
        <div>
          <select :value="pagination.limit" @change="handleLimitChange">
            <option value="10">
              10 per page
            </option>
            <option value="20">
              20 per page
            </option>
            <option value="50">
              50 per page
            </option>
          </select>
          <TButton @click="refresh">
            Refresh
          </TButton>
          <TButton @click="clear">
            Clear
          </TButton>
        </div>
        <div>Status: {{ status }}</div>
      </div>
    </div>
  </TCard>

  <TButton @click="showNotification">
    Show Notification
  </TButton>
  <TButton @click="show = true">
    tailwindcss
  </TButton>
  <TButton @click="showMessage">
    showMessage
  </TButton>

  <div aria-live="assertive" class="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6">
    <div class="flex w-full flex-col items-center space-y-4 sm:items-end mt-[100px]">
      <transition
        enter-active-class="transform ease-out duration-300 transition"
        enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enter-to-class="translate-y-0 opacity-100 sm:translate-x-0" leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100" leave-to-class="opacity-0"
      >
        <div
          v-if="show"
          class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5"
        >
          <div class="p-4">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <CheckCircleIcon class="h-6 w-6 text-green-400" aria-hidden="true" />
              </div>
              <div class="ml-3 w-0 flex-1 pt-0.5">
                <p class="text-sm font-medium text-gray-900">
                  Successfully saved!
                </p>
                <p class="mt-1 text-sm text-gray-500">
                  Anyone with a link can now view this file.
                </p>
              </div>
              <div class="ml-4 flex flex-shrink-0">
                <button
                  type="button"
                  class="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  @click="show = false"
                >
                  <span class="sr-only">Close</span>
                  <XMarkIcon class="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped>
.pagination-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 20px 0;
}
</style>
