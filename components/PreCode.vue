<script setup lang="ts">
defineProps({
  codeData: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="my-4 max-h-[400px] overflow-auto border-black-400 shadow">
    <pre>
      <code>
        {{ codeData }}
      </code>
    </pre>
  </div>
</template>
