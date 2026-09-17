import { useEffect, useState } from 'react'
import { fetchPhrases, insertPhrase } from '../lib/supabaseClient'

export default function Diary({ className = '' }) {
  const [text, setText] = useState('')
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const data = await fetchPhrases()
        if (mounted) setItems(data || [])
      } catch (err) {
        console.error('fetchPhrases failed', err)
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => (mounted = false)
  }, [])

  async function handleSave(e) {
    e.preventDefault()
    if (!text.trim()) return
    setSaving(true)
    try {
      const res = await insertPhrase(text.trim())
      const row = Array.isArray(res) && res.length ? res[0] : { id: Date.now(), text: text.trim(), inserted_at: new Date().toISOString() }
      setItems((s) => [row, ...s])
      setText('')
    } catch (err) {
      console.error('insertPhrase failed', err)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className={`flex flex-col justify-between ${className}`}>
      <div className="h-full rounded-3xl bg-gradient-to-br from-black/90 via-gray-900 to-black p-6 shadow-2xl border border-white/10">
        <div className="bg-black/95 p-4 rounded-md">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-serif text-white tracking-wider">DEATH NOTE</h2>
              <p className="text-xs text-gray-300">Taccuino personale</p>
            </div>
          </div>

          <form onSubmit={handleSave} className="mt-4">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={6}
              className="w-full bg-black text-white border border-gray-800 p-3 rounded-md font-serif resize-y"
              placeholder="Scrivi la frase..."
            />
            <div className="mt-3 flex gap-2 justify-end">
              <button type="submit" className="px-4 py-2 bg-red-900 text-white rounded" disabled={saving}>{saving ? 'Salvando...' : 'Incidi'}</button>
            </div>
          </form>

          <div className="mt-6 space-y-3 max-h-64 overflow-auto text-white/90">
            {loading && <div className="text-sm text-gray-400">Caricamento...</div>}
            {!loading && items.length === 0 && <div className="text-sm text-gray-500">Nessuna frase ancora.</div>}
            {items.map((it) => (
              <div key={it.id} className="p-3 border-b border-white/10">
                <div className="text-sm font-serif">{it.text}</div>
                <div className="text-xs text-gray-400 mt-1">{it.inserted_at ? new Date(it.inserted_at).toLocaleString() : ''}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
