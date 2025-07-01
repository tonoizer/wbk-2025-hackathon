<script setup lang="ts">
import { legalItems, navigationItems, socialItemsWithLabel } from '~/config/navigation'
</script>

<template>
  <footer class="h-auto pb-8 sm:opacity-50 hover:opacity-100 transition-opacity">
    <nav class="flex flex-col sm:flex-row sm:justify-between gap-8 sm:gap-4">
      <!-- Left Section: Logo -->
      <div class="flex flex-col sm:items-start gap-4">
        <TheLogo />
      </div>

      <!-- Right Section: Policies and Menu -->
      <div class="flex flex-col sm:flex-row gap-8 sm:gap-16">
        <!-- Policies -->
        <div>
          <div class="text-sm">
            Menu
          </div>
          <NuxtNavigationMenu
            color="primary"
            variant="pill"
            highlight
            :items="navigationItems"
            orientation="vertical"
          />
        </div>

        <!-- Socials -->
        <div>
          <div class="text-sm">
            Socials
          </div>
          <NuxtNavigationMenu
            color="primary"
            variant="pill"
            highlight
            :items="socialItemsWithLabel"
            orientation="vertical"
          />
        </div>

        <!-- Legal -->
        <div>
          <div class="text-sm">
            Legal
          </div>
          <NuxtNavigationMenu
            color="primary"
            variant="pill"
            highlight
            :items="legalItems"
            orientation="vertical"
          />
        </div>
      </div>
    </nav>

    <NuxtSeparator class="my-8" />

    <!-- Bottom Section -->
    <div class="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
      <div>
        © 2025 All rights reserved
      </div>
      <div class="text-center sm:text-right">
        made in Germany
      </div>
    </div>
  </footer>
</template>

<style scoped></style>
