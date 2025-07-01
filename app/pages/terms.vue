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
      href: `${appUrl}/terms`,
    },
  ],
})

useSeoMeta({
  title: `${appName} - Terms of Use`,
  description: 'These are the terms of use for the Hackathon event website.',
  ogTitle: `${appName} - Terms of Use`,
  ogDescription: 'These are the terms of use for the Hackathon event website.',
  ogImage: `${appUrl}/__og-image__/static/og-terms.png`,
  ogImageAlt: 'A preview image for the Terms of Use page of the Hackathon event website.',
  ogUrl: `${appUrl}/terms`,
  ogType: 'website',
  ogSiteName: `${appName}`,
  ogLocale: 'en_US',
  // Twitter-specific tags
  twitterCard: 'summary_large_image',
  twitterTitle: `${appName} - Terms of Use`,
  twitterDescription: 'These are the terms of use for the Hackathon event website.',
  twitterImage: `${appUrl}/__og-image__/static/og-terms.png`,
  twitterImageAlt: 'A preview image for the Terms of Use page of the Hackathon event website.',
})

// OG Images: https://github.com/nuxt-modules/og-image/tree/main/src/runtime/app/components/Templates/Community
defineOgImageComponent('Default')
</script>

<template>
  <section>
    <PageHeader title="Terms of Use" description="By using this website, you agree to the following terms." />

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
              <strong class="opacity-50">1. </strong>Website Purpose
            </h1>
          </template>

          <p>
            This website provides information, resources, and updates related to the Hackathon event. It is <strong class="font-extrabold">not commercial</strong> and is intended solely to support participants, organizers, and the community involved in the event. No products or services are sold through this website.
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
              <strong class="opacity-50">2. </strong>Intellectual Property
            </h1>
          </template>

          <p>
            All content (text, images, and code) on this website is provided by the Hackathon organizers or contributors, unless otherwise noted. You may <strong class="font-extrabold">not</strong> copy, distribute, or reuse any content without explicit permission from the event organizers. Content submitted by participants remains their intellectual property unless otherwise agreed.
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
              <strong class="opacity-50">3. </strong>Limitation of Liability
            </h1>
          </template>

          <p>
            The Hackathon organizers strive to keep this site accurate and functional, but make no guarantees regarding the completeness, accuracy, or availability of the information provided. The organizers are <strong class="font-extrabold">not responsible</strong> for any errors, downtime, or issues caused by using this site.
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
              <strong class="opacity-50">4. </strong>External Links
            </h1>
          </template>

          <p>
            This website may contain links to external sites. The Hackathon organizers are <strong class="font-extrabold">not responsible</strong> for the content or privacy practices of those external sites.
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
              <strong class="opacity-50">5. </strong>Changes to These Terms
            </h1>
          </template>

          <p>
            These terms may be updated at any time by the Hackathon organizers. Last updated: <strong class="font-extrabold">1. Juli 2025</strong>.
          </p>
        </NuxtCard>
      </MotionGroup>
    </div>
  </section>
</template>
