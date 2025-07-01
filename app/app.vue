<script setup lang="ts">
// https://vercel.com/docs/analytics/quickstart
import { Analytics } from '@vercel/analytics/nuxt'
// https://vercel.com/docs/speed-insights/quickstart
import { SpeedInsights } from '@vercel/speed-insights/nuxt'

import { appName } from '~/config/site'

useHead({
  title: appName,
})

// Check if the app is running in production
const isProd = process.env.NODE_ENV === 'production'
</script>

<template>
  <NuxtApp>
    <div class="bg-(--ui-bg)" vaul-drawer-wrapper>
      <!-- Only include Analytics and Speed Insights in production -->
      <Analytics v-if="isProd" />
      <SpeedInsights v-if="isProd" />

      <VitePwaManifest />

      <NuxtLoadingIndicator :height="2" />

      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
  </NuxtApp>
</template>

<style>
* {
  font-family: IBM Plex Mono;
}
</style>
