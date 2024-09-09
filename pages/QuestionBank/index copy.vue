<script setup>
import { ref } from 'vue'

const { width: screenWidth } = useWindowSize()
const isPanelOpen = ref(false)
const count = ref(0)
const lastEditTime = ref(new Date().toLocaleString())

const mainContent = ref(null)

const rightPanelWidth = computed(() => {
  console.log(`screenWidth.value`, screenWidth.value - 1280)
  const mainContentWidth = mainContent.value ? mainContent.value.offsetWidth : 0

  const a = screenWidth.value - mainContentWidth - (screenWidth.value - 1280) - 40
  console.log(`a`, a)
  return a
})

const rightPanelLeftPosition = computed(() => {
  const width = screenWidth.value > 1280 ? 1280 : screenWidth.value
  const a = (screenWidth.value - width) / 2
  console.log(`a`, a)
  return a
})

function togglePanel() {
  isPanelOpen.value = !isPanelOpen.value
}

function incrementCounter() {
  count.value++
  updateLastEditTime()
}

function decrementCounter() {
  count.value--
  updateLastEditTime()
}

function resetCounter() {
  count.value = 0
  updateLastEditTime()
}

function updateLastEditTime() {
  lastEditTime.value = new Date().toLocaleString()
}
</script>

<template>
  <div class="min-h-screen flex justify-center items-start">
    <div class="w-full max-w-[1440px] relative">
      <div class="flex h-[calc(100vh-4rem)] overflow-hidden justify-center">
        <!-- Main content area -->
        <div
          ref="mainContent"
          class="transition-all duration-300 ease-in-out rounded-lg bg-white shadow flex-shrink-0 max-w-3xl" :style="{
            transform: isPanelOpen ? 'translateX(calc(-33.333333% - 10px))' : 'translateX(0)',
          }"
        >
          <div class="p-6 overflow-auto h-full">
            <h1 class="text-3xl font-bold mb-4">
              主要内容区域
            </h1>
            <p class="mb-4">
              这里是主要内容。点击右上角的按钮来打开/关闭右侧内容。现在，无论右侧面板是否打开，您都能看到左侧的全部内容。
            </p>
            <div class="counter-component">
              <h2 class="text-2xl font-bold mb-4">
                简单的JavaScript计数器
              </h2>
              <div class="text-xl mb-4">
                当前计数: {{ count }}
              </div>
              <div class="flex space-x-4">
                <button
                  class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                  @click="incrementCounter"
                >
                  增加
                </button>
                <button
                  class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                  @click="decrementCounter"
                >
                  减少
                </button>
                <button
                  class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                  @click="resetCounter"
                >
                  重置
                </button>
              </div>
              <div class="mt-4 text-sm text-gray-600">
                上次编辑: {{ lastEditTime }}
              </div>
            </div>
          </div>
        </div>

        <!-- Right side content -->
        <div
          class="max-w-3xl absolute top-0  h-full bg-gray-50 transition-all duration-300 ease-in-out overflow-hidden rounded-lg shadow"
          :style="{
            width: isPanelOpen ? `${rightPanelWidth}px` : '0',
            right: isPanelOpen ? `${rightPanelLeftPosition}px` : '0',
          }"
        >
          <div class="p-6">
            <h2 class="text-2xl font-bold mb-4">
              右侧内容
            </h2>
            <p>这里是右侧的内容。您可以在这里添加额外的信息或功能。</p>
          </div>
        </div>

        <!-- Toggle button for panel -->
        <button
          class="fixed top-8 right-8 z-50 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors"
          @click="togglePanel"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
