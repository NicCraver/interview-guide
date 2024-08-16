<!-- components/ui/TNotifications.vue -->
<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref } from 'vue'
import { CheckCircleIcon, XMarkIcon } from '@heroicons/vue/24/outline'

interface NotificationProps {
  title: string
  message: string
  duration: number
  marginTop: number
}

const props = defineProps<NotificationProps>()
const emit = defineEmits(['close'])

const visible = ref(false)
const visible2 = ref(false)
const timer = ref<number | null>(null)

function close() {
  visible.value = false
  setTimeout(() => {
    emit('close')
  }, 100) // Wait for animation to end
}

onMounted(() => {
  nextTick(() => {
    visible.value = true
    setTimeout(() => {
      visible2.value = true
    }, 300) // Wait for animation to end
  })
  if (props.duration > 0) {
    timer.value = window.setTimeout(() => {
      close()
    }, props.duration)
  }
})

onUnmounted(() => {
  if (timer.value) {
    clearTimeout(timer.value)
  }
})
</script>

<template>
  <div aria-live="assertive" class="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6">
    <div
      class="flex w-full flex-col items-center space-y-4 sm:items-end " :class="visible2 ? 'notification-content1' : ''" :style="{ marginTop: `${props.marginTop}px` }"
    >
      <transition
        enter-active-class="transform ease-out duration-300 transition"
        enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enter-to-class="translate-y-0 opacity-100 sm:translate-x-0" leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100" leave-to-class="opacity-0"
      >
        <div
          v-if="visible"
          class="notification-content pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 notification-transition"
        >
          <div class="p-4">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <CheckCircleIcon class="h-6 w-6 text-green-400" aria-hidden="true" />
              </div>
              <div class="ml-3 w-0 flex-1 pt-0.5">
                <p class="text-sm font-medium text-gray-900">
                  {{ props.title }} {{ props.marginTop }}
                </p>
                <p class="mt-1 text-sm text-gray-500">
                  {{ props.message }}
                </p>
              </div>
              <div class="ml-4 flex flex-shrink-0">
                <button
                  type="button"
                  class="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  @click="close"
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
.notification-content1 {
  transition:
    margin-top 0.3s ease-in-out,
    transform 0.3s ease-in-out,
    opacity 0.3s;
}
</style>
