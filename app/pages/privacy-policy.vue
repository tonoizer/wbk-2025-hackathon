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
      href: `${appUrl}/privacy-policy`,
    },
  ],
})

useSeoMeta({
  title: `${appName} Hackathon - Privacy Policy`,
  description: 'This Privacy Policy explains how the Hackathon event website collects, uses, and protects information.',
  ogTitle: `${appName} Hackathon - Privacy Policy`,
  ogDescription: 'This Privacy Policy explains how the Hackathon event website collects, uses, and protects information.',
  ogImage: `${appUrl}/__og-image__/static/og-privacy-policy.png`,
  ogImageAlt: 'A preview image for the Privacy Policy page of the Hackathon event website.',
  ogUrl: `${appUrl}/privacy-policy`,
  ogType: 'website',
  ogSiteName: `${appName} Hackathon`,
  ogLocale: 'en_US',
  // Twitter-specific tags
  twitterCard: 'summary_large_image',
  twitterTitle: `${appName} Hackathon - Privacy Policy`,
  twitterDescription: 'This Privacy Policy explains how the Hackathon event website collects, uses, and protects information.',
  twitterImage: `${appUrl}/__og-image__/static/og-privacy-policy.png`,
  twitterImageAlt: 'A preview image for the Privacy Policy page of the Hackathon event website.',
})

// OG Images: https://github.com/nuxt-modules/og-image/tree/main/src/runtime/app/components/Templates/Community
defineOgImageComponent('Default')
</script>

<template>
  <section>
    <PageHeader title="Privacy Policy">
      <template #description>
        This Privacy Policy describes how the Hackathon event website collects, uses, and protects information when you visit this website. If you have any questions or concerns, please contact the event organizers at
        <NuxtLink href="mailto:hackathon@kevinbeier.com" class="underline">
          hackathon@kevinbeier.com
        </NuxtLink>
      </template>
    </PageHeader>

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
              Your Data Protection Rights
            </h1>
          </template>

          <p>
            You have the right to access any personal data we may have about you and request corrections or deletion. If you would like to exercise this right, please contact us (see above). You can also file a complaint with your national data protection authority, but we'd appreciate it if you reach out first so we can address any concerns directly.
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
              Collected Information
            </h1>
          </template>

          <p>
            This website does <strong class="font-extrabold">not</strong> store cookies or collect personally identifiable information. However, the following data is collected for <strong class="font-extrabold">analytics and security purposes</strong>:
          </p>
          <ul class="list-disc list-inside ">
            <li><strong class="font-extrabold">Vercel Analytics</strong> logs anonymized browser information, referrer data, and approximate geographic location (<strong class="font-extrabold">no tracking cookies are used</strong>).</li>
            <li>The web server stores temporary logs (IP address, user agent, timestamp, and status code) for <strong class="font-extrabold">security reasons</strong>. These logs are deleted automatically after a few days.</li>
          </ul>
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
              Secure Data Transfer
            </h1>
          </template>

          <p>
            All data is transmitted securely using HTTPS encryption. While your internet provider may still see that you're visiting this website, the content of your activity remains encrypted.
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
              Changes to This Policy
            </h1>
          </template>

          <p>
            This privacy policy may be updated if necessary. Last updated: <strong class="font-extrabold">26. March 2025</strong>.
          </p>
        </NuxtCard>
      </MotionGroup>
    </div>
  </section>
</template>
