<script setup>
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
import { Toaster } from './components/ui/sonner'

toggleDark(false)
</script>

<template>
  <main>
    <RouterView />
    <VueQueryDevtools />
    <Toaster position="top-center" close-button rich-colors />
  </main>
</template>

<route lang="yaml">
meta:
  layout: empty
</route>
