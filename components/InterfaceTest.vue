<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid'
import interfaceTestingLogic from './test-com/interfaceTestingLogic.vue'
import notificationAndMessageLogic from './test-com/notificationAndMessageLogic.vue'
import manageQuestions from './test-com/manageQuestions.vue'
</script>

<template>
  <!-- <interfaceTestingLogic />
  <notificationAndMessageLogic /> -->
  <manageQuestions />
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
