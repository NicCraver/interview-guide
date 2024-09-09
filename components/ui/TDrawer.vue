<script setup>
import { computed } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  direction: {
    type: String,
    default: 'right',
    validator: value => ['left', 'right'].includes(value),
  },
})

const emit = defineEmits(['update:modelValue'])

function closeDrawer() {
  emit('update:modelValue', false)
}

const sideClass = computed(() => props.direction === 'left' ? 'left-0' : 'right-0')
</script>

<template>
  <TransitionRoot as="template" :show="modelValue">
    <Dialog as="div" class="relative z-10" @close="closeDrawer">
      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div class="pointer-events-none fixed inset-y-0 flex max-w-full" :class="[sideClass]">
            <TransitionChild
              as="template"
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              :enter-from="direction === 'left' ? '-translate-x-full' : 'translate-x-full'"
              enter-to="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leave-from="translate-x-0"
              :leave-to="direction === 'left' ? '-translate-x-full' : 'translate-x-full'"
            >
              <DialogPanel class="pointer-events-auto w-screen max-w-md">
                <div class="flex flex-col bg-white shadow-xl rounded-lg h-[calc(100vh-32px)] m-4 ">
                  <div class="px-4 sm:px-6 py-6">
                    <div class="flex items-start justify-between">
                      <DialogTitle class="text-base font-semibold leading-6 text-gray-900">
                        <slot name="header">
                          Panel title
                        </slot>
                      </DialogTitle>
                      <div class="ml-3 flex h-7 items-center">
                        <button type="button" class="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" @click="closeDrawer">
                          <span class="absolute -inset-2.5" />
                          <span class="sr-only">Close panel</span>
                          <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="relative flex-1 px-4 sm:px-6 overflow-auto">
                    <slot />
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
