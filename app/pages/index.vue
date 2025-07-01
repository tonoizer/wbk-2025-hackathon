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
      href: `${appUrl}`,
    },
  ],
})

useSeoMeta({
  title: `${appName} - Hackathon Event`,
  description: 'Welcome to the official Hackathon event website. Join us to innovate, collaborate, and create! All the latest info, schedule, and resources are here.',
  ogTitle: `${appName} - Hackathon Event`,
  ogDescription: 'Welcome to the official Hackathon event website. Join us to innovate, collaborate, and create! All the latest info, schedule, and resources are here.',
  ogImage: `${appUrl}/__og-image__/static/og.png`,
  ogImageAlt: 'A preview image for the Hackathon event website.',
  ogUrl: `${appUrl}`,
  ogType: 'website',
  ogSiteName: `${appName}`,
  ogLocale: 'en_US',
  // Twitter-specific tags
  twitterCard: 'summary_large_image',
  twitterTitle: `${appName} - Hackathon Event`,
  twitterDescription: 'Welcome to the official Hackathon event website. Join us to innovate, collaborate, and create! All the latest info, schedule, and resources are here.',
  twitterImage: `${appUrl}/__og-image__/static/og.png`,
  twitterImageAlt: 'A preview image for the Hackathon event website.',
})

// OG Images: https://github.com/nuxt-modules/og-image/tree/main/src/runtime/app/components/Templates/Community
defineOgImageComponent('Default')
</script>

<template>
  <section>
    <!-- Section 1 -->
    <div class="flex flex-col justify-center h-screen">
      <MotionGroup preset="slideVisibleOnceBottom">
        <h1
          v-motion
          :initial="{ opacity: 0, y: 100 }"
          :visible-once="{ opacity: 1, y: 0 }"
          :delay="0"
          :duration="500"
          class="font-extrabold text-6xl pb-4"
        >
          Hackathon
        </h1>
      </MotionGroup>
    </div>
  </section>
</template>
