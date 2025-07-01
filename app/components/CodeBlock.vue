<script lang="ts" setup>
import { ref } from 'vue'

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    default: 'html',
  },
})

const copied = ref(false)

function copyToClipboard() {
  navigator.clipboard.writeText(props.code).then(() => {
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  })
}
</script>

<template>
  <NuxtCard variant="subtle">
    <template #header>
      <div class="flex justify-between items-center">
        <h6 class="font-extrabold">
          {{ label }}
        </h6>
        <NuxtButton
          :label="copied ? 'Copied!' : 'Copy'"
          color="neutral"
          variant="solid"
          trailing-icon="i-lucide-copy"
          @click="copyToClipboard"
        />
      </div>
    </template>

    <pre class="overflow-x-auto">
      <code :class="`language-${language}`">{{ code }}</code>
    </pre>
  </NuxtCard>
</template>

<style scoped></style>
