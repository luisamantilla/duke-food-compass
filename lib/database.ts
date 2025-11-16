import { createClient } from './supabase/client'

// Database helper functions
export async function fetchData<T>(
  table: string,
  select: string = '*',
  filters?: { column: string; value: any }[]
) {
  const supabase = createClient()
  let query = supabase.from(table).select(select)

  if (filters) {
    filters.forEach(({ column, value }) => {
      query = query.eq(column, value)
    })
  }

  const { data, error } = await query
  return { data: data as T[], error }
}

export async function insertData<T>(table: string, data: Partial<T>) {
  const supabase = createClient()
  const { data: insertedData, error } = await supabase
    .from(table)
    .insert(data)
    .select()
  return { data: insertedData as T[], error }
}

export async function updateData<T>(
  table: string,
  id: string,
  data: Partial<T>
) {
  const supabase = createClient()
  const { data: updatedData, error } = await supabase
    .from(table)
    .update(data)
    .eq('id', id)
    .select()
  return { data: updatedData as T[], error }
}

export async function deleteData(table: string, id: string) {
  const supabase = createClient()
  const { error } = await supabase.from(table).delete().eq('id', id)
  return { error }
}
