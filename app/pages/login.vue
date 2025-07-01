<script setup lang="ts">
import { computed, ref } from 'vue'

const supabase = useSupabaseClient()
const email = ref('')
const loading = ref(false)
const message = ref('')
const touched = ref(false)

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
      emailRedirectTo: `${window.location.origin}/confirm`,
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
        <p v-if="message" class="mt-4 text-center">
          {{ message }}
        </p>
      </div>
    </NuxtCard>
  </div>
</template>
