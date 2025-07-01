import { useSupabaseClient } from '#imports'

/**
 * Upload a file to a Supabase Storage bucket and return the path and public URL.
 * @param file The file to upload
 * @param bucket The bucket name
 * @param pathPrefix Optional prefix/folder for the file
 * @returns { path: string, publicUrl: string }
 */
export async function uploadToSupabaseBucket(
  file: File,
  bucket: string,
  pathPrefix: string = '',
): Promise<{ path: string, publicUrl: string }> {
  const client = useSupabaseClient()
  const fileName = `${Date.now()}_${file.name}`
  const filePath = pathPrefix ? `${pathPrefix}/${fileName}` : fileName

  const { error } = await client.storage.from(bucket).upload(filePath, file, {
    cacheControl: '3600',
    upsert: false,
  })
  if (error)
    throw new Error(error.message)

  // Get the public URL
  const { data: publicUrlData } = client.storage.from(bucket).getPublicUrl(filePath)
  if (!publicUrlData || !publicUrlData.publicUrl)
    throw new Error('Failed to get public URL')

  return {
    path: filePath,
    publicUrl: publicUrlData.publicUrl,
  }
}
