<script setup lang="ts">
import { appName } from '~/constants'

const color = useColorMode()

useHead({
  title: appName,
  link: [
    { rel: 'stylesheet', href: 'https://rsms.me/inter/inter.css' },
  ],
  meta: [{
    id: 'theme-color',
    name: 'theme-color',
    content: () => color.value === 'dark' ? '#222222' : '#ffffff',
  }],
})

useHead({
  meta: [{
    id: 'theme-color',
    name: 'theme-color',
    content: () => color.value === 'dark' ? '#222222' : '#ffffff',
  }],
})

// function toggleDark() {
//   color.preference = color.value === 'dark' ? 'light' : 'dark'
// }

onMounted(() => {
  color.preference = 'light'
})
</script>

<template>
  <VitePwaManifest />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
html,
body,
#__nuxt {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
}

html.dark {
  background: #222;
  color: white;
}
</style>
