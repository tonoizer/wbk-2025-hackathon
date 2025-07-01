<script setup lang="ts">
const user = useSupabaseUser()
const redirectInfo = useSupabaseCookieRedirect()

watch(user, () => {
  if (user.value) {
    // Get redirect path, and clear it from the cookie
    const path = redirectInfo.pluck()
    // Redirect to the saved path, or fallback to home
    return navigateTo(path || '/')
  }
}, { immediate: true })
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
