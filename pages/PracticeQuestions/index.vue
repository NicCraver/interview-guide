<script setup lang="ts">
import { CheckCircleIcon } from '@heroicons/vue/24/solid'
</script>

<template>
  <div>
    <TCard title="面试题1，点击阿斯哦飞机爱搜甲方i哦啊随机发i哦啊家算法i哦就阿斯哦飞机啊司法机哦啊是">
      <template #actions>
        <TButton>
          Medium Primary Button
        </TButton>
        <TButton type="text">
          Medium Primary Button
        </TButton>
        <button
          type="button"
          class="ml-3 relative inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Create new job
        </button>
      </template>
      <div>
        <TButton size="small" type="primary">
          <CheckCircleIcon class="-ml-0.5 h-5 w-5" aria-hidden="true" />
          Small Primary Button
        </TButton>
        <TButton size="medium" type="primary">
          Medium Primary Button
        </TButton>
        <TButton size="large" type="primary">
          Large Primary Button
        </TButton>
        <TButton size="xlarge" type="primary">
          XLarge Primary Button
        </TButton>

        <TButton size="small" type="secondary">
          Small Secondary Button
        </TButton>
        <TButton size="medium" type="secondary">
          Medium Secondary Button
        </TButton>
        <TButton size="large" type="secondary">
          Large Secondary Button
        </TButton>
        <TButton size="xlarge" type="secondary">
          XLarge Secondary Button
        </TButton>
      </div>
    </TCard>
  </div>
</template>

<style scoped></style>
