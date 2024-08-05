<script setup lang="ts">
import { appName } from '~/constants'

useHead({
  title: appName,
  link: [
    { rel: 'stylesheet', href: 'https://rsms.me/inter/inter.css' },
  ],
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
