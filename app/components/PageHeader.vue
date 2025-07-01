<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <header class="mb-8">
    <!-- Title -->
    <h1 v-if="title" class="text-3xl font-bold">
      {{ title }}
    </h1>
    <h1 v-else class="text-3xl font-bold my-8">
      <slot />
    </h1>

    <!-- Description -->
    <p v-if="description" class="mt-4 line-clamp">
      {{ description }}
    </p>
    <p v-else class="mt-4 line-clamp">
      <slot name="description" />
    </p>
  </header>
</template>

<style scoped>
.line-clamp {
  /* max-width: 60ch; */
}
</style>
