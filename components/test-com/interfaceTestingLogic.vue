<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid'

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

const { fetchUsers, addUser, updateUser, deleteUser, userTestData } = useUserTest()

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
</script>

<template>
  <div>
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
  </div>
</template>

<style scoped>

</style>
