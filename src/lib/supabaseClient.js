// Supabase client helper — will initialize client if env vars exist.
import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = url && key ? createClient(url, key) : null

// Unified helpers that fallback to localStorage when Supabase is not configured.
const STORAGE_KEY = 'phrases_fallback'

export async function fetchPhrases() {
  if (supabase) {
    const { data, error } = await supabase.from('phrases').select('*').order('inserted_at', { ascending: false })
    if (error) throw error
    return data
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch (e) {
    return []
  }
}

export async function insertPhrase(text) {
  if (supabase) {
    const { data, error } = await supabase.from('phrases').insert({ text }).select()
    if (error) throw error
    return data
  }

  // fallback: store locally and return a pseudo-row
  const item = { id: Date.now(), text, inserted_at: new Date().toISOString() }
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const list = raw ? JSON.parse(raw) : []
    list.unshift(item)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
  } catch (e) {
    // ignore
  }
  return [item]
}

