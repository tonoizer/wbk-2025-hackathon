import { useAsyncData, useSupabaseClient, useToast } from '#imports'
import { onMounted, onUnmounted, ref, watch } from 'vue'

import { insertToSupabaseTable } from '~/composables/useSupabaseInsert'
import { uploadToSupabaseBucket } from '~/composables/useSupabaseUpload'

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
  status: Status
  status_id?: number
  stl_url?: string
  quality?: number
  quality_status?: QualityStatus
}

interface QualityStatus {
  id: number
  type: string
}

export function usePrints() {
  const client = useSupabaseClient()
  const toast = useToast()

  // Fetch prints
  const { data: prints, refresh } = useAsyncData<Print[]>('prints', async () => {
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
        ),
        stl_url
      `)
      .order('created_at', { ascending: false })
    if (error)
      throw error
    return data ?? []
  })

  // Fetch status options
  const { data: statusOptionsData } = useAsyncData<Status[]>('statusOptions', async () => {
    const { data } = await client.from('status').select('id, name, color_hex')
    return data ?? []
  })
  const statusOptions = ref<Status[]>(statusOptionsData.value ?? [])

  // Form state
  const showForm = ref(false)
  const newTitle = ref('My Default Print')
  const newStatusId = ref<number | undefined>(undefined)
  const stlFile = ref<File | null>(null)

  let subscription: any = null

  onMounted(() => {
    subscription = client
      .channel('public:prints')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'prints' },
        async () => {
          await refresh()
        },
      )
      .subscribe()
  })

  onUnmounted(() => {
    if (subscription) {
      client.removeChannel(subscription)
    }
  })

  // Reactively update statusOptions and set default status id
  watch(statusOptionsData, (val) => {
    statusOptions.value = val ?? []
    if (statusOptions.value.length > 0) {
      newStatusId.value = statusOptions.value[0]!.id
    }
    else {
      newStatusId.value = undefined
    }
  }, { immediate: true })

  function openFormWithDefaults() {
    newTitle.value = 'My Default Print'
    newStatusId.value = (statusOptions.value || []).length > 0 ? statusOptions.value[0]!.id : undefined
    showForm.value = true
  }

  function handleStlFileChange(event: Event) {
    const target = event.target as HTMLInputElement
    if (target.files && target.files.length > 0) {
      stlFile.value = target.files[0] ?? null
    }
    else {
      stlFile.value = null
    }
  }

  async function addPrint() {
    if (!newTitle.value || !stlFile.value) {
      toast.add({
        title: 'Missing Fields',
        description: 'Please fill in all fields and select an STL file.',
        color: 'error',
      })
      return
    }
    let stl_url: string | null = null
    try {
      const { publicUrl } = await uploadToSupabaseBucket(stlFile.value, 'stl-bucket')
      stl_url = publicUrl
      toast.add({
        title: 'File Uploaded',
        description: 'STL file uploaded successfully.',
        color: 'success',
      })
    }
    catch (e: any) {
      toast.add({
        title: 'Upload Error',
        description: `Failed to upload STL file: ${e?.message || e}`,
        color: 'error',
      })
      return
    }
    const newPrint = {
      title: newTitle.value,
      started_at: new Date().toISOString(),
      ended_at: null,
      stl_url,
    }
    const { error } = await insertToSupabaseTable('prints', newPrint)
    if (error) {
      toast.add({
        title: 'Database Error',
        description: error.message || 'Failed to add print.',
        color: 'error',
      })
      return
    }
    toast.add({
      title: 'Print Added',
      description: 'The print was added successfully.',
      color: 'success',
    })
    showForm.value = false
    newTitle.value = 'Print'
    newStatusId.value = (statusOptions.value || []).length > 0 ? statusOptions.value[0]!.id : undefined
    stlFile.value = null
    await refresh()
  }

  async function deletePrint(printId: number) {
    await client.from('prints').delete().eq('id', printId)
    await refresh()
  }

  async function updatePrintStatus(printId: number, statusId: number) {
    // @ts-expect-error: Supabase client is not typed, so update expects never
    await client.from('prints').update({ status: statusId }).eq('id', printId)
    await refresh()
  }

  async function downloadStl(stl_url?: string) {
    if (stl_url) {
      const fileName = stl_url.split('/').pop() || ''
      if (!fileName) {
        toast.add({
          title: 'Download Error',
          description: 'Invalid STL file path.',
          color: 'error',
        })
        return
      }
      try {
        const { data, error } = await client.storage.from('stl-bucket').createSignedUrl(fileName, 60)
        if (error || !data?.signedUrl) {
          toast.add({
            title: 'Download Error',
            description: error?.message || 'Failed to generate download link.',
            color: 'error',
          })
        }
        else {
          window.open(data.signedUrl, '_blank')
        }
      }
      catch (e: any) {
        toast.add({
          title: 'Download Error',
          description: `Failed to generate download link. ${e}`,
          color: 'error',
        })
      }
    }
    else {
      toast.add({
        title: 'No File',
        description: 'No STL file available for this print.',
        color: 'error',
      })
    }
  }

  return {
    prints,
    refresh,
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
  }
}
