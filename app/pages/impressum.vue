<script lang="ts" setup>
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
      href: `${appUrl}/impressum`,
    },
  ],
})

useSeoMeta({
  title: `${appName} Hackathon - Impressum`,
  description: 'This is the impressum page for the Hackathon event website.',
  ogTitle: `${appName} Hackathon - Impressum`,
  ogDescription: 'This is the impressum page for the Hackathon event website.',
  ogImage: `${appUrl}/__og-image__/static/og-impressum.png`,
  ogImageAlt: 'A preview image for the Impressum page of the Hackathon event website.',
  ogUrl: `${appUrl}/impressum`,
  ogType: 'website',
  ogSiteName: `${appName} Hackathon`,
  ogLocale: 'en_US',
  // Twitter-specific tags
  twitterCard: 'summary_large_image',
  twitterTitle: `${appName} Hackathon - Impressum`,
  twitterDescription: 'This is the impressum page for the Hackathon event website.',
  twitterImage: `${appUrl}/__og-image__/static/og-impressum.png`,
  twitterImageAlt: 'A preview image for the Impressum page of the Hackathon event website.',
})

// OG Images: https://github.com/nuxt-modules/og-image/tree/main/src/runtime/app/components/Templates/Community
defineOgImageComponent('Default')
</script>

<template>
  <section>
    <PageHeader title="Impressum" description="This is a personal, non-commercial website." />

    <div class="flex flex-col gap-6">
      <MotionGroup preset="slideVisibleOnceBottom">
        <NuxtCard
          v-motion
          :initial="{ opacity: 0, y: 100 }"
          :visible-once="{ opacity: 1, y: 0 }"
          :duration="500" variant="soft"
        >
          <template #header>
            <h1
              class="font-extrabold text-2xl"
            >
              Responsible for content according to § 18 Abs. 2 MStV:
            </h1>
          </template>

          <p>
            <strong class="opacity-50">Name:</strong> Konrad Lorenz, Stephan M. C. Wolf, Kevin Beier, Matyas K. Somogyi, Jonas Kreuziger
          </p>
          <p>
            <strong class="opacity-50">E-Mail:</strong> <NuxtLink href="mailto:hackathon@kevinbeier.com" class="underline">
              hackathon@kevinbeier.com
            </NuxtLink>
          </p>
        </NuxtCard>

        <NuxtCard
          v-motion
          :initial="{ opacity: 0, y: 100 }"
          :visible-once="{ opacity: 1, y: 0 }"
          :duration="500" variant="soft"
        >
          <template #header>
            <h1
              class="font-extrabold text-2xl"
            >
              Purpose of the Website
            </h1>
          </template>

          <p>
            This website is a private event website and does not pursue any commercial interests.
          </p>
        </NuxtCard>
      </MotionGroup>
    </div>
  </section>
</template>
