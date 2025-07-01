<script setup lang="ts">
import { appName, appUrl } from '~/config/site'

definePageMeta({
  layout: 'default',
})

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
      href: `${appUrl}/404`,
    },
  ],
})

useSeoMeta({
  title: `${appName} - Page Not Found`,
  description: 'The page you are looking for does not exist. Return to the Hackathon homepage or explore other sections of the event website.',
  ogTitle: `${appName} - Page Not Found`,
  ogDescription: 'The page you are looking for does not exist. Return to the Hackathon homepage or explore other sections of the event website.',
  ogImage: `${appUrl}/__og-image__/static/og-404.png`,
  ogImageAlt: 'A preview image for the 404 page of the Hackathon event website.',
  ogUrl: `${appUrl}/404`,
  ogType: 'website',
  ogSiteName: `${appName}`,
  ogLocale: 'en_US',
  // Twitter-specific tags
  twitterCard: 'summary_large_image',
  twitterTitle: `${appName} - Page Not Found`,
  twitterDescription: 'The page you are looking for does not exist. Return to the Hackathon homepage or explore other sections of the event website.',
  twitterImage: `${appUrl}/__og-image__/static/og-404.png`,
  twitterImageAlt: 'A preview image for the 404 page of the Hackathon event website.',
})

// OG Images: https://github.com/nuxt-modules/og-image/tree/main/src/runtime/app/components/Templates/Community
defineOgImageComponent('Default')
</script>

<template>
  <section class="flex flex-col items-center justify-center text-center h-screen">
    <h1
      v-motion
      :initial="{ opacity: 0, y: 100 }"
      :visible-once="{ opacity: 1, y: 0 }"
      :delay="0"
      :duration="500"
      class="text-4xl font-extrabold"
    >
      Page Not Found
    </h1>
  </section>
</template>
