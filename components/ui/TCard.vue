<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
    <div class="px-4 py-5 sm:px-6">
      <div class="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
        <div class="ml-4 mt-2">
          <h3 class="text-base font-semibold leading-6 text-gray-900">
            {{ title }}
          </h3>
        </div>
        <div class="ml-4 mt-2 flex-shrink-0 space-x-2">
          <slot name="actions" />
        </div>
      </div>
    </div>
    <div class="px-4 py-5 sm:p-6">
      <slot />
    </div>
  </div>
</template>
