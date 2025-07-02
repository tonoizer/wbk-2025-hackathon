<script setup lang="ts">
import { appName, appUrl } from '~/config/site'

const user = useSupabaseUser()
const redirectInfo = useSupabaseCookieRedirect()

watch(user, () => {
  if (user.value) {
    // Get redirect path, and clear it from the cookie
    const path = redirectInfo.pluck()
    // Redirect to the saved path, or fallback to home
    return navigateTo(path || '/dashboard')
  }
}, { immediate: true })

useHead({
  htmlAttrs: {
    lang: 'en',
  },
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: '/logo.svg',
    },
    {
      rel: 'canonical',
      href: `${appUrl}/confirm`,
    },
  ],
})

useSeoMeta({
  title: `${appName} Hackathon - Confirm Login`,
  description: 'Confirm your login to access the Hackathon dashboard and manage your 3D prints.',
  ogTitle: `${appName} Hackathon - Confirm Login`,
  ogDescription: 'Confirm your login to access the Hackathon dashboard and manage your 3D prints.',
  ogImage: `${appUrl}/__og-image__/static/og-confirm.png`,
  ogImageAlt: 'A preview image for the Confirm Login page of the Hackathon event website.',
  ogUrl: `${appUrl}/confirm`,
  ogType: 'website',
  ogSiteName: `${appName} Hackathon`,
  ogLocale: 'en_US',
  // Twitter-specific tags
  twitterCard: 'summary_large_image',
  twitterTitle: `${appName} Hackathon - Confirm Login`,
  twitterDescription: 'Confirm your login to access the Hackathon dashboard and manage your 3D prints.',
  twitterImage: `${appUrl}/__og-image__/static/og-confirm.png`,
  twitterImageAlt: 'A preview image for the Confirm Login page of the Hackathon event website.',
})

// OG Images: https://github.com/nuxt-modules/og-image/tree/main/src/runtime/app/components/Templates/Community
defineOgImageComponent('Default')
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-transparent">
    <NuxtCard class="max-w-md w-full text-center py-10 px-6" variant="soft">
      <template #header>
        <NuxtIcon name="i-lucide-mail-check" size="2.5rem" class="mb-2 text-primary" />
        <h2 class="text-2xl font-bold mb-2">
          Logging you in...
        </h2>
      </template>
      <div class="flex flex-col items-center gap-4">
        <NuxtLoadingIndicator :height="4" color="primary" class="mb-2" />
        <p class="text-base text-gray-600 dark:text-gray-300">
          Please wait while we confirm your login.<br>
          You will be redirected automatically.<br>
          <span class="text-xs opacity-70">If nothing happens, check your email for the login link or try again.</span>
        </p>
      </div>
    </NuxtCard>
  </div>
</template>
