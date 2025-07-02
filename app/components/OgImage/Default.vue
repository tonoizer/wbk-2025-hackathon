<script lang="ts" setup>
import { computed } from 'vue';

const props = withDefaults(defineProps<{ title?: string, description?: string, headline?: string }>(), {
  title: 'title',
  description: 'description',
  headline: 'hackathon',
})

const title = computed(() => props.title.slice(0, 60))
</script>

<template>
  <div class="w-full h-full flex flex-col justify-center bg-[#0E172B]">
    <div class="w-[600px] pl-[100px]">
      <p v-if="headline" class="uppercase text-[24px] text-[#b9b9b9] mb-4 font-semibold">
        {{ headline }}
      </p>
      <h1 class="w-[600px] m-0 text-[75px] font-semibold mb-4 text-white flex items-center">
        <span>{{ title }}</span>
      </h1>
      <p class="text-[32px] text-[#E4E4E7] leading-tight">
        {{ description.slice(0, 200) }}
      </p>
    </div>

    <!-- LOGO HERE -->
  </div>
</template>
