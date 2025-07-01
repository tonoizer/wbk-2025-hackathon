import { useSupabaseClient } from '#imports'

/**
 * Insert data into a Supabase table.
 * @param table The table name
 * @param data The data object or array to insert
 * @returns { error, data }
 */
export async function insertToSupabaseTable(table: string, data: any): Promise<{ error: any, data: any }> {
  const client = useSupabaseClient()
  // @ts-expect-error: Supabase client is not typed, so insert expects never[]
  const { error, data: result } = await client.from(table).insert([data])
  return { error, data: result }
}
