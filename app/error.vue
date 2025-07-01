<script setup lang="ts">
import type { NuxtError } from '#app';

defineProps<{
  error: NuxtError
}>()

useSeoMeta({
  title: 'Page not found',
  description: 'We are sorry but this page could not be found.',
})

useHead({
  htmlAttrs: {
    lang: 'en',
  },
})
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-transparent">
    <NuxtCard class="max-w-md w-full text-center py-10 px-6" variant="soft">
      <template #header>
        <NuxtIcon name="i-lucide-alert-triangle" size="2.5rem" class="mb-2 text-red-500" />
        <h1 class="text-2xl font-bold mb-2">
          Oops! Something went wrong.
        </h1>
      </template>
      <div class="flex flex-col items-center gap-4">
        <p v-if="error && error.statusCode" class="text-lg">
          <strong>Status:</strong> {{ error.statusCode }}
        </p>
        <p v-if="error && error.message" class="text-base text-red-400">
          <strong>Message:</strong> {{ error.message }}
        </p>
        <details v-if="error && error.stack" class="w-full">
          <summary class="cursor-pointer text-sm text-gray-400 mb-2">
            Show Stack Trace
          </summary>
          <pre class="text-left overflow-x-auto bg-gray-900 p-2 rounded text-xs text-gray-200">{{ error.stack }}</pre>
        </details>
        <NuxtLink to="/" class="w-full">
          <NuxtButton block size="xl" color="primary">
            Go Home
          </NuxtButton>
        </NuxtLink>
      </div>
    </NuxtCard>
  </div>
</template>
