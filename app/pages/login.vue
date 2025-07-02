<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import { appName, appUrl } from '~/config/site'

const supabase = useSupabaseClient()
const email = ref('')
const loading = ref(false)
const message = ref('')
const touched = ref(false)
const router = useRouter()

const siteUrl = process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000'

const emailPattern = /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/
const emailError = computed(() => {
  if (!touched.value)
    return ''
  if (!email.value)
    return 'Email is required.'
  if (!emailPattern.test(email.value))
    return 'Please enter a valid email address.'
  return ''
})
const isEmailValid = computed(() => emailPattern.test(email.value))

async function signInWithOtp() {
  touched.value = true
  if (!isEmailValid.value)
    return
  loading.value = true
  message.value = ''
  const { error } = await supabase.auth.signInWithOtp({
    email: email.value,
    options: {
      emailRedirectTo: `${siteUrl}/confirm`,
    },
  })
  loading.value = false
  if (error) {
    message.value = error.message
  }
  else {
    message.value = 'Check your email for the login link.'
  }
}

onMounted(async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) {
      console.error('Supabase getUser error:', error)
      return
    }
    if (user) {
      router.replace('/dashboard')
    }
  }
  catch (err) {
    console.error('Unexpected error in login redirect:', err)
  }
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
      href: `${appUrl}/login`,
    },
  ],
})

useSeoMeta({
  title: `${appName} Hackathon - Login`,
  description: 'Sign in to your Hackathon account to access the dashboard and manage your 3D prints.',
  ogTitle: `${appName} Hackathon - Login`,
  ogDescription: 'Sign in to your Hackathon account to access the dashboard and manage your 3D prints.',
  ogImage: `${appUrl}/__og-image__/static/og-login.png`,
  ogImageAlt: 'A preview image for the Login page of the Hackathon event website.',
  ogUrl: `${appUrl}/login`,
  ogType: 'website',
  ogSiteName: `${appName} Hackathon`,
  ogLocale: 'en_US',
  // Twitter-specific tags
  twitterCard: 'summary_large_image',
  twitterTitle: `${appName} Hackathon - Login`,
  twitterDescription: 'Sign in to your Hackathon account to access the dashboard and manage your 3D prints.',
  twitterImage: `${appUrl}/__og-image__/static/og-login.png`,
  twitterImageAlt: 'A preview image for the Login page of the Hackathon event website.',
})

// OG Images: https://github.com/nuxt-modules/og-image/tree/main/src/runtime/app/components/Templates/Community
defineOgImageComponent('Default')
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-transparent">
    <NuxtCard class="max-w-md w-full text-center py-10 px-6" variant="soft">
      <template #header>
        <NuxtIcon name="i-lucide-log-in" size="2.5rem" class="mb-2 text-primary" />
        <h1 class="text-2xl font-bold mb-2">
          Sign In
        </h1>
      </template>
      <div class="flex flex-col items-center gap-4">
        <template v-if="message !== 'Check your email for the login link.'">
          <p class="text-base text-gray-600 dark:text-gray-300 mb-2">
            Enter your email to receive a magic login link.
          </p>
          <form class="flex flex-col gap-4 w-full" novalidate @submit.prevent="signInWithOtp">
            <NuxtInput
              v-model="email"
              type="email"
              placeholder="Your email"
              required
              :disabled="loading"
              autofocus
              size="xl"
              :error="!!emailError"
              :error-message="emailError"
              @blur="touched = true"
            />
            <NuxtButton :loading="loading" type="submit" block size="xl" color="secondary" :disabled="!isEmailValid || loading">
              Sign In with Email
            </NuxtButton>
          </form>
        </template>
        <p v-if="message" class="mt-4 text-center">
          {{ message }}
        </p>
      </div>
    </NuxtCard>
  </div>
</template>
