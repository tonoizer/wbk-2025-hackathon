<script lang="ts" setup>
import { onMounted, ref } from 'vue'

defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    default: '',
  },
  date: {
    type: String,
    required: true,
  },
})

const router = useRouter()

// Reactive TOC items
const tocItems = ref<{ id: string, label: string }[]>([])

// Automatically generate TOC based on headings inside the <section>
onMounted(() => {
  const section = document.querySelector('section.flex-1') // Select the section
  if (section) {
    const headings = section.querySelectorAll('h1, h2, h3, h4, h5, h6') // Query headings inside the section
    tocItems.value = Array.from(headings).map(heading => ({
      id: heading.id,
      label: heading.textContent || '',
    }))
  }
})
</script>

<template>
  <article>
    <NuxtButton label="Back" color="neutral" variant="ghost" icon="i-lucide-arrow-left" class="mb-8 cursor-pointer" @click="router.back()" />

    <!-- Blog Header -->
    <PageHeader :title="title" :description="subtitle" />

    <!-- TOC for Mobile -->
    <NuxtDrawer
      should-scale-background
      title="Table of Contents"
      description="Select a section to jump to"
      class="lg:hidden"
    >
      <NuxtButton label="Open Table of Contents" color="neutral" variant="subtle" trailing-icon="i-lucide-table-of-contents" />

      <template #body>
        <div>
          <NuxtNavigationMenu color="primary" variant="pill" highlight :items="tocItems" class="w-full" orientation="vertical" />
        </div>
      </template>
    </NuxtDrawer>

    <!-- Blog Content -->
    <div class="flex flex-col sm:flex-row">
      <section class="flex-1">
        <slot />
      </section>

      <!-- TOC for Desktop -->
      <aside class="max-lg:hidden w-65 ml-8">
        <NuxtCard
          class="sticky top-4"
          variant="subtle"
        >
          <template #header>
            <h2 class="text-lg font-semibold flex flex-row items-center">
              <NuxtIcon name="i-lucide-table-of-contents" class="size-4" />
              <span class="ml-3">Table of Contents</span>
            </h2>
          </template>

          <NuxtNavigationMenu color="primary" variant="pill" highlight :items="tocItems" class="w-full" orientation="vertical" />
        </NuxtCard>
      </aside>
    </div>
  </article>
</template>

<style scoped></style>
