<script setup>
const colorMode = useColorMode()

const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  },
})
</script>

<template>
  <ClientOnly>
    <template v-if="!colorMode?.forced">
      <NuxtButton
        :icon="isDark ? 'i-lucide-moon' : 'i-lucide-sun'"
        color="neutral"
        variant="link"
        @click="isDark = !isDark"
      />
    </template>
    <template #fallback>
      <div class="size-8" />
    </template>
  </ClientOnly>
</template>
