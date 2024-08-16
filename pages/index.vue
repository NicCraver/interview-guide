<script setup>
definePageMeta({
  layout: 'default',
})

// async function addQuestion() {
//   await $fetch('/api/questionApi/create', {
//     method: 'POST',
//     body: {
//       title: 'What is the capital of France?',
//       type: 'multiple',
//       content: 'Which of the following is the capital of France?',
//       correctAnswer: 'Paris',
//       options: [
//         {},
//       ],
//     },
//   })
// }
</script>

<template>
  <div>
    <h1>User Management</h1>

    <InterfaceTest />

    <NuxtLink to="/MockExam/11111111">
      MockExam
    </NuxtLink>
  </div>
</template>
