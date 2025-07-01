<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import { h, resolveComponent } from 'vue'

import { usePrints } from '~/composables/usePrints'

const {
  prints,
  statusOptions,
  showForm,
  newTitle,
  newStatusId,
  stlFile,
  openFormWithDefaults,
  handleStlFileChange,
  addPrint,
  deletePrint,
  updatePrintStatus,
  downloadStl,
} = usePrints()

const NuxtBadge = resolveComponent('NuxtBadge')
const NuxtButton = resolveComponent('NuxtButton')
const NuxtDropdownMenu = resolveComponent('NuxtDropdownMenu')
const NuxtModal = resolveComponent('NuxtModal')
const NuxtInput = resolveComponent('NuxtInput')

const columns: TableColumn<any>[] = [
  {
    accessorKey: 'id',
    header: '#',
    cell: ({ row }) => `#${row.getValue('id')}`,
  },
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.status
      const color = status?.color_hex || 'neutral'
      return h(NuxtBadge, { class: 'capitalize', variant: 'subtle', color }, () => status?.name)
    },
  },
  {
    accessorKey: 'started_at',
    header: 'Started',
    cell: ({ row }) => {
      const value = row.getValue('started_at')
      return typeof value === 'string' ? value.replace('T', ' ').substring(0, 19) : '-'
    },
  },
  {
    accessorKey: 'ended_at',
    header: 'Ended',
    cell: ({ row }) => {
      const value = row.getValue('ended_at')
      return typeof value === 'string' ? value.replace('T', ' ').substring(0, 19) : '-'
    },
  },
  {
    accessorKey: 'created_at',
    header: 'Created',
    cell: ({ row }) => {
      const value = row.getValue('created_at')
      return typeof value === 'string' ? value.replace('T', ' ').substring(0, 19) : '-'
    },
  },
  {
    id: 'actions',
    header: '',
    cell: ({ row }) =>
      h(
        NuxtDropdownMenu,
        {
          'items': [
            { label: 'Delete', icon: 'i-lucide-trash', color: 'error', onSelect: () => deletePrint(row.original.id) },
            { type: 'separator' },
            {
              label: 'Download STL',
              icon: 'i-lucide-download',
              onSelect: () => downloadStl(row.original.stl_url),
            },
            { type: 'separator' },
            ...statusOptions.value.map(status => ({
              label: `Set status: ${status.name}`,
              icon: 'i-lucide-check-circle',
              onSelect: () => updatePrintStatus(row.original.id, status.id),
              color: row.original.status?.id === status.id ? 'primary' : undefined,
            })),
          ],
          'aria-label': 'Actions dropdown',
          'content': { align: 'end' },
        },
        () =>
          h(NuxtButton, {
            'icon': 'i-lucide-ellipsis-vertical',
            'color': 'neutral',
            'variant': 'ghost',
            'aria-label': 'Actions',
          }),
      ),
  },
]
</script>

<template>
  <div>
    <div class="flex justify-between items-center">
      <h1>Prints</h1>
      <NuxtButton color="secondary" class="mb-4" @click="openFormWithDefaults">
        Add Print
      </NuxtButton>
    </div>

    <NuxtModal v-model:open="showForm" title="Add Print" description="Fill in the details for the new print.">
      <template #body>
        <NuxtInput v-model="newTitle" placeholder="Title" class="mb-2" required />
        <select v-model="newStatusId" class="mb-2" required>
          <option disabled value="">
            Select Status
          </option>
          <option v-for="status in statusOptions" :key="status.id" :value="status.id">
            {{ status.name }}
          </option>
        </select>
        <div class="mb-2">
          <label class="block mb-1 font-medium">STL File <span class="text-error">*</span></label>
          <NuxtInput
            type="file"
            accept=".stl"
            class="w-full"
            required
            @change="handleStlFileChange"
          />
          <div v-if="stlFile" class="text-xs mt-1 text-muted">
            Selected: {{ stlFile.name }}
          </div>
        </div>
      </template>
      <template #footer>
        <NuxtButton color="success" @click="addPrint">
          Save
        </NuxtButton>
        <NuxtButton color="secondary" variant="ghost" @click="showForm = false">
          Cancel
        </NuxtButton>
      </template>
    </NuxtModal>

    <ClientOnly>
      <!-- TODO: currently there is an hydration issue -->
      <NuxtTable :data="prints ?? []" :columns="columns" class="flex-1" />
    </ClientOnly>
  </div>
</template>
