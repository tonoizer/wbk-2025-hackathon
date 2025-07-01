<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import { h, ref, resolveComponent, watch } from 'vue'

interface Status {
  id: number
  name: string
  color_hex?: string
}

interface Print {
  id: number
  created_at: string
  title: string
  started_at: string | null
  ended_at: string | null
  status: Status // For display (joined)
  status_id?: number // For insert
}

const client = useSupabaseClient()

const { data: prints, refresh } = await useAsyncData<Print[]>('prints', async () => {
  const { data, error } = await client
    .from('prints')
    .select(`
      id,
      created_at,
      title,
      started_at,
      ended_at,
      status:status (
        id,
        name,
        color_hex
      )
    `)
    .order('created_at', { ascending: false })
  if (error)
    throw error
  return data ?? []
})

// SSR-safe status options fetch
const { data: statusOptionsData } = await useAsyncData<Status[]>('statusOptions', async () => {
  const { data } = await client.from('status').select('id, name, color_hex')
  return data ?? []
})
const statusOptions = ref<Status[]>(statusOptionsData.value ?? [])

// Form state
const showForm = ref(false)
const newTitle = ref('My Default Print')
const newStatusId = ref<number | null>(null)

// Reactively update statusOptions and set default status id
watch(statusOptionsData, (val) => {
  statusOptions.value = val ?? []
  if (statusOptions.value.length > 0) {
    newStatusId.value = statusOptions.value[0]!.id
  }
  else {
    newStatusId.value = null
  }
}, { immediate: true })

function openFormWithDefaults() {
  newTitle.value = 'My Default Print'
  newStatusId.value = (statusOptions.value || []).length > 0 ? statusOptions.value[0]!.id : null
  showForm.value = true
}

// Add print handler
async function addPrint() {
  if (!newTitle.value || !newStatusId.value)
    return
  const newPrint = {
    title: newTitle.value,
    started_at: new Date().toISOString(),
    ended_at: null,
    status: newStatusId.value, // Only send the status id
  }
  // @ts-expect-error: Supabase client is not typed, so insert expects never[]
  await client.from('prints').insert([newPrint])
  showForm.value = false
  newTitle.value = 'My Default Print'
  newStatusId.value = (statusOptions.value || []).length > 0 ? statusOptions.value[0]!.id : null
  await refresh()
}

const NuxtBadge = resolveComponent('NuxtBadge')
const NuxtButton = resolveComponent('NuxtButton')
const NuxtDropdownMenu = resolveComponent('NuxtDropdownMenu')

async function deletePrint(printId: number) {
  await client.from('prints').delete().eq('id', printId)
  await refresh()
}

async function updatePrintStatus(printId: number, statusId: number) {
  // @ts-expect-error: Supabase client is not typed, so update expects never
  await client.from('prints').update({ status: statusId }).eq('id', printId)
  await refresh()
}

const columns: TableColumn<Print>[] = [
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
    <h1>Prints</h1>
    <NuxtButton color="secondary" class="mb-4" @click="openFormWithDefaults">
      Add Print
    </NuxtButton>

    <div v-if="showForm" class="mb-4">
      <NuxtInput v-model="newTitle" placeholder="Title" class="mb-2" />
      <select v-model="newStatusId" class="mb-2">
        <option disabled value="">
          Select Status
        </option>
        <option v-for="status in statusOptions" :key="status.id" :value="status.id">
          {{ status.name }}
        </option>
      </select>
      <NuxtButton color="success" @click="addPrint">
        Save
      </NuxtButton>
      <NuxtButton color="secondary" variant="ghost" @click="showForm = false">
        Cancel
      </NuxtButton>
    </div>

    <ClientOnly>
      <!-- TODO: currently there is an hydration issue -->
      <NuxtTable :data="prints ?? []" :columns="columns" class="flex-1" />
    </ClientOnly>
  </div>
</template>
