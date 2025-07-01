<script setup lang="ts">
import { mobileNavigationItems, navigationItems, socialItemsWithOutLabel } from '~/config/navigation'
</script>

<template>
  <header
    class="h-16"
  >
    <nav class="flex items-center h-full justify-between">
      <TheLogo />

      <div class="flex items-center">
        <NuxtNavigationMenu color="primary" variant="pill" highlight :items="navigationItems" class="max-md:hidden" />

        <NuxtSeparator orientation="vertical" class="h-4 mx-4 max-md:hidden" />

        <NuxtNavigationMenu color="primary" variant="pill" highlight :items="socialItemsWithOutLabel" class="max-md:hidden" />

        <ClientOnly>
          <NuxtSeparator orientation="vertical" class="h-4 mx-4 max-md:hidden" />
        </ClientOnly>

        <ToggleColorModeButton />

        <NuxtDrawer
          should-scale-background
          title="Navigation"
          description="Links to other pages and social media"
          class="md:hidden"
        >
          <NuxtButton label="Menu" color="neutral" variant="subtle" trailing-icon="i-lucide-menu" class="ml-4" />

          <template #body>
            <div>
              <NuxtNavigationMenu color="primary" variant="pill" highlight :items="mobileNavigationItems" class="w-full" orientation="vertical" />
            </div>
          </template>
        </NuxtDrawer>
      </div>
    </nav>
  </header>
</template>
