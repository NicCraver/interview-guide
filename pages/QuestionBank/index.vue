<script setup>
// 创建两个可复用的模板组件
const [AiAnalysisDefineTemplate, AiAnalysisReuseTemplate] = createReusableTemplate()

// 窗口大小变化的自定义 Hook
function useWindowResize() {
  const { width } = useWindowSize() // 获取窗口宽度
  const isMobileView = ref(false) // 判断是否为移动视图

  // 检查是否为移动视图
  const checkMobileView = () => {
    isMobileView.value = width.value < 768 // 如果窗口宽度小于 768，则为移动视图
  }

  // 组件挂载时添加事件监听
  onMounted(() => {
    checkMobileView()
    window.addEventListener('resize', checkMobileView) // 监听窗口大小变化
  })

  // 组件卸载时移除事件监听
  onUnmounted(() => {
    window.removeEventListener('resize', checkMobileView)
  })

  return {
    width,
    isMobileView,
    checkMobileView,
  }
}

// 代码切换逻辑的自定义 Hook
function useCodeToggle(isMobileView) {
  const isCodeOpen = ref(false) // 控制代码面板是否打开
  const drawer2 = ref(false) // 控制抽屉式代码面板

  // 切换代码显示状态
  const toggleCode = () => {
    isCodeOpen.value = !isCodeOpen.value
    if (isMobileView.value) {
      drawer2.value = isCodeOpen.value // 移动视图下使用抽屉式面板
      document.body.classList.toggle('overflow-hidden-mobile', isCodeOpen.value) // 控制页面滚动
    }
  }

  // 监听视图类型变化，调整抽屉面板状态
  watch(isMobileView, (newValue) => {
    if (isCodeOpen.value) {
      drawer2.value = newValue
    }
  })
  return {
    isCodeOpen,
    toggleCode,
    drawer2,
  }
}

// 侧边菜单逻辑的自定义 Hook
function useMenu() {
  const isMenuOpen = ref(false) // 菜单是否打开
  const isMenuPinned = ref(false) // 菜单是否固定
  const menuTimeoutId = ref(null) // 控制菜单延时关闭

  // 显示菜单
  function showMenu() {
    clearTimeout(menuTimeoutId.value)
    isMenuOpen.value = true
  }

  // 隐藏菜单
  function hideMenu() {
    if (!isMenuPinned.value) {
      menuTimeoutId.value = setTimeout(() => {
        isMenuOpen.value = false
      }, 300) // 延时 300 毫秒后关闭菜单
    }
  }

  // 切换菜单固定状态
  function toggleMenuPin() {
    isMenuPinned.value = !isMenuPinned.value
    if (isMenuPinned.value) {
      isMenuOpen.value = true // 菜单固定时保持打开
    }
  }

  return {
    isMenuOpen,
    isMenuPinned,
    showMenu,
    hideMenu,
    toggleMenuPin,
  }
}

// 调用窗口变化 Hook

const { width, isMobileView } = useWindowResize()
// 调用代码面板控制 Hook

const { isCodeOpen, toggleCode, drawer2 } = useCodeToggle(isMobileView)
// 调用菜单控制 Hook

const { isMenuOpen, isMenuPinned, showMenu, hideMenu, toggleMenuPin } = useMenu()

// 控制主内容区域左边距的自定义 Hook
function useMainMargin(width) {
  const mainMarginLeft = ref(300) // 主内容区域左边距初始值

  // 监听窗口宽度变化，调整左边距
  watch(() => width.value, () => {
    const a = Math.abs(((width.value - 1440) / 2)) // 计算窗口居中后的边距
    nextTick(() => {
      if (width.value > 1440) {
        mainMarginLeft.value = a < 16 ? 16 : a // 如果宽度大于 1440，调整边距
      }
      else {
        mainMarginLeft.value = 16 // 否则设置为 16
      }
    })
  }, { immediate: true })

  return {
    mainMarginLeft,
  }
}

const { mainMarginLeft } = useMainMargin(width) // 调用主内容区域边距控制 Hook
</script>

<template>
  <div class="relative p-4 overflow-hidden">
    <!-- 定义模板 -->
    <AiAnalysisDefineTemplate>
      <pre class="bg-gray-50 p-4 rounded-lg shadow-inner mb-4"><code class="text-sm">
// 这是一个简单的 JavaScript 函数示例
function greet(name) {
  return `Hello, ${name}!`;
}

// 使用该函数
console.log(greet("World"));
              </code></pre>
      <p class="mb-4">
        这个代码面板会根据屏幕大小调整其位置和大小。
      </p>
      <p>在较大的屏幕上，它会与主内容并排显示。在较小的屏幕上，它会变成一个覆盖层，但不会完全覆盖屏幕。</p>
    </AiAnalysisDefineTemplate>

    <!-- 侧边菜单 -->
    <div
      class="fixed top-0 left-0 h-full w-64 bg-gray-800 text-white transition-transform duration-300 ease-in-out transform z-50"
      :class="{ '-translate-x-full': !isMenuOpen, 'translate-x-0': isMenuOpen }" @mouseenter="showMenu"
      @mouseleave="hideMenu"
    >
      <div class="p-4">
        <h2 class="text-xl font-bold mb-4">
          目录
        </h2>
        <ul>
          <li class="mb-2">
            <a href="#" class="hover:text-gray-300">Chapter 1</a>
          </li>
          <li class="mb-2">
            <a href="#" class="hover:text-gray-300">Chapter 2</a>
          </li>
          <li class="mb-2">
            <a href="#" class="hover:text-gray-300">Chapter 3</a>
          </li>
        </ul>
      </div>
      <button
        class="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-700 transition-colors duration-200"
        :class="{ 'bg-gray-600': isMenuPinned }" @click="toggleMenuPin"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>

    <!-- 菜单触发区域 -->
    <div class="fixed top-0 left-0 w-8 h-full z-9 overflow-hidden" @mouseenter="showMenu">
      <div class="h-full w-full flex items-center justify-center">
        <div class="menu-trigger-animation" />
      </div>
    </div>

    <!-- 主内容 -->
    <div class="flex md:space-x-4 h-[calc(100vh-176px)]">
      <div
        class="transition-all duration-300 ease-in-out flex-grow" :class="[
          isCodeOpen && !isMobileView ? `lg:w-[800px] md:w-[400px]` : 'w-full',
        ]"
        :style="[isCodeOpen && !isMobileView ? { marginLeft: `${mainMarginLeft}px` } : { paddingLeft: '24px' }]"
      >
        <div class="max-w-[1000px] mx-auto bg-white rounded-lg shadow p-6">
          <h1 class="text-2xl font-bold mb-4">
            Main Content Area
          </h1>
          <p class="mb-4">
            This is the main content of your page. It will resize when the code panel is opened.
          </p>
          <button
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition mb-4 z-10 relative"
            @click="toggleCode"
          >
            {{ isCodeOpen ? '关闭' : '打开' }} 代码面板
          </button>
        </div>
      </div>

      <!-- 代码面板 -->
      <div
        v-if="!isMobileView" class="transition-all duration-300 ease-in-out overflow-hidden rounded-lg shadow"
        :class="[
          isCodeOpen ? 'lg:w-[800px] md:w-[400px] opacity-100' : 'w-0 opacity-0',
        ]"
      >
        <div class="h-full">
          <div class="bg-white h-full rounded-lg shadow overflow-hidden flex flex-col">
            <div class="flex-grow overflow-auto p-6">
              <h2 class="text-lg font-semibold mb-4 text-gray-700">
                代码面板
              </h2>
              <AiAnalysisReuseTemplate />
            </div>
          </div>
        </div>
      </div>
    </div>
    <TDrawer v-model="drawer2">
      <template #header>
        <h4>代码面板</h4>
      </template>
      <template #default>
        <AiAnalysisReuseTemplate />
      </template>
    </TDrawer>
  </div>
</template>

<style>
/* 隐藏页面滚动条的样式 */
.overflow-hidden-mobile {
  overflow: hidden !important;
  height: 100vh;
}

/* 菜单触发区域的动画 */
.menu-trigger-animation {
  width: 10px;
  height: 60px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 2px;
  animation: pulse 2s infinite;
}

/* 动画效果 */
@keyframes pulse {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.3);
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
  }

  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  }
}
</style>
