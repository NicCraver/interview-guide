<script lang="ts" setup>
import { CheckCircleIcon } from '@heroicons/vue/24/solid'

interface MassageProps {
  message: string
  duration: number
  marginTop: number
}

const props = defineProps<MassageProps>()
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
  <div
    aria-live="assertive"
    class="pointer-events-none fixed inset-0 flex items-center px-4 py-6 sm:items-start sm:p-6"
  >
    <transition
      enter-active-class="transform ease-out duration-300 transition"
      enter-from-class="translate-y-0 opacity-0 sm:translate-y-0 sm:translate-x-0"
      enter-to-class="translate-y-0 opacity-100 sm:translate-y-0 sm:translate-x-0 "
      leave-active-class="transition ease-in duration-100"
      leave-from-class="opacity-100" leave-to-class="opacity-0"
    >
      <div
        v-if="visible" class="flex w-full flex-col items-center space-y-4 sm:items-center"
        :class="visible2 ? 'massage-content1' : ''" :style="{ marginTop: `${props.marginTop}px` }"
      >
        <div v-if="visible" class="rounded-md bg-green-50 p-4 massage-content">
          <div class="flex">
            <div class="flex-shrink-0">
              <CheckCircleIcon class="h-5 w-5 text-green-400" aria-hidden="true" />
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-green-800">
                {{ message }} {{ marginTop }}
              </h3>
              <!-- <div class="mt-2 text-sm text-green-700">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum similique veniam.
                </p>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.massage-content1 {
  transition:
    margin-top 0.3s ease-in-out,
    transform 0.3s ease-in-out,
    opacity 0.3s;
}
</style>
