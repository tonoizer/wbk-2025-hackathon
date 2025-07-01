<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { Column } from '@tanstack/vue-table'
import { h, ref, resolveComponent } from 'vue'

const NuxtBadge = resolveComponent('NuxtBadge')
const NuxtButton = resolveComponent('NuxtButton')
const NuxtDropdownMenu = resolveComponent('NuxtDropdownMenu')

interface PrintingOrder {
  id: string
  date: string
  status: 'queued' | 'printing' | 'completed' | 'failed' | 'cancelled'
  email: string
  printer: string
  material: string
  cost: number
}

const { data: orders, pending } = await useFetch<PrintingOrder[]>('/api/orders')

function getHeader(column: Column<PrintingOrder>, label: string) {
  const isSorted = column.getIsSorted()
  return h(
    NuxtButton,
    {
      'color': 'neutral',
      'variant': 'ghost',
      label,
      'icon': isSorted
        ? isSorted === 'asc'
          ? 'i-lucide-arrow-up-narrow-wide'
          : 'i-lucide-arrow-down-wide-narrow'
        : 'i-lucide-arrow-up-down',
      'class': '-mx-2.5',
      'onClick': () => column.toggleSorting(column.getIsSorted() === 'asc'),
      'aria-label': `Sort by ${label}`,
    },
  )
}

const columns: TableColumn<PrintingOrder>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => getHeader(column, '#'),
    cell: ({ row }) => `#${row.getValue('id')}`,
  },
  {
    accessorKey: 'date',
    header: ({ column }) => getHeader(column, 'Date'),
    cell: ({ row }) => {
      return new Date(row.getValue('date')).toLocaleString('en-US', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      })
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => getHeader(column, 'Status'),
    cell: ({ row }) => {
      const color = {
        queued: 'neutral' as const,
        printing: 'info' as const,
        completed: 'success' as const,
        failed: 'error' as const,
        cancelled: 'warning' as const,
      }[row.getValue('status') as string]

      return h(NuxtBadge, { class: 'capitalize', variant: 'subtle', color }, () =>
        row.getValue('status'))
    },
  },
  {
    accessorKey: 'email',
    header: ({ column }) => getHeader(column, 'Email'),
  },
  {
    accessorKey: 'printer',
    header: ({ column }) => getHeader(column, 'Printer'),
  },
  {
    accessorKey: 'material',
    header: ({ column }) => getHeader(column, 'Material'),
  },
  {
    accessorKey: 'cost',
    header: ({ column }) => h('div', { class: 'text-right' }, getHeader(column, 'Cost')),
    cell: ({ row }) => {
      const cost = Number.parseFloat(row.getValue('cost'))
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'EUR',
      }).format(cost)
      return h('div', { class: 'text-right font-medium' }, formatted)
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
            { label: 'View Details', icon: 'i-lucide-eye', onSelect: () => alert(`Details for #${row.original.id}`) },
            { label: 'Reprint', icon: 'i-lucide-printer', onSelect: () => alert(`Reprint #${row.original.id}`) },
            { label: 'Cancel', icon: 'i-lucide-x', color: 'error', onSelect: () => alert(`Cancel #${row.original.id}`) },
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

const sorting = ref([
  {
    id: 'id',
    desc: false,
  },
])
</script>

<template>
  <NuxtTable v-model:sorting="sorting" :data="orders" :columns="columns" :loading="pending" class="flex-1" />
</template>
