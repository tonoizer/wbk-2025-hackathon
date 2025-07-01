<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    default: 'Page Under Maintenance',
  },
  description: {
    type: String,
    default: 'This page is currently being worked on. Please check back soon!',
  },
  buttonLabel: {
    type: String,
    default: 'Go Back',
  },
  buttonTo: {
    type: String,
    default: '/',
  },
})
</script>

<template>
  <div class="flex flex-col items-center justify-center text-center h-screen">
    <MotionGroup preset="slideVisibleOnceBottom">
      <!-- Title -->
      <h1
        v-motion
        :initial="{ opacity: 0, y: 100 }"
        :visible-once="{ opacity: 1, y: 0 }"
        :delay="0"
        :duration="500"
        class="text-4xl font-extrabold"
      >
        {{ title }}
      </h1>

      <!-- Description -->
      <p
        v-motion
        :initial="{ opacity: 0, y: 100 }"
        :visible-once="{ opacity: 1, y: 0 }"
        :delay="200"
        :duration="500"
        class="text-lg"
      >
        {{ description }}
      </p>
    </MotionGroup>
  </div>
</template>

<style scoped></style>
