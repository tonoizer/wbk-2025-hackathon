<script setup lang="ts"></script>

<template>
  <NuxtContainer>
    <TheNavigation />

    <main class="min-h-screen my-8">
      <slot />
    </main>

    <TheFooter />
  </NuxtContainer>
</template>

<style scoped></style>
