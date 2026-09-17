import { useEffect, useState } from 'react'
import { fetchPhrases, insertPhrase } from '../lib/supabaseClient'

export default function Notes() {
  const [text, setText] = useState('')
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem('phrases')
      return raw ? JSON.parse(raw) : []
    } catch (e) {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('phrases', JSON.stringify(items))
  }, [items])

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const data = await fetchPhrases()
        if (mounted && data && data.length) setItems(data)
      } catch (err) {
        // keep existing local items
      }
    })()
    return () => (mounted = false)
  }, [])

  async function handleAdd(e) {
    e.preventDefault()
    if (!text.trim()) return

    const newItemLocal = { id: Date.now(), text: text.trim(), created_at: new Date().toISOString() }
    setItems((s) => [newItemLocal, ...s])
    setText('')

    try {
      const resp = await insertPhrase(newItemLocal.text)
      // If supabase returned rows, you may reconcile the local list here.
      // e.g., replace the optimistic item with the server row.
    } catch (err) {
      console.error('Insert failed', err)
    }
  }

  return (
    <section className="max-w-3xl mx-auto p-6">
      <form onSubmit={handleAdd} className="flex flex-col gap-3">
        <label className="text-sm text-gray-600">Aggiungi una frase</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          className="p-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-300"
          placeholder="Scrivi qualcosa di carino..."
        />
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-pink-600 text-white rounded-md shadow-sm" type="submit">
            Salva
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-white border rounded-md"
            onClick={() => setItems([])}
          >
            Cancella tutto
          </button>
        </div>
      </form>

      <div className="mt-6 space-y-3">
        {items.length === 0 && <p className="text-sm text-gray-500">Nessuna frase ancora.</p>}
        {items.map((it) => (
          <div key={it.id} className="p-3 rounded-lg bg-white/80 border shadow-sm">
            <div className="text-sm text-gray-700">{it.text}</div>
            <div className="text-xs text-gray-400 mt-1">{new Date(it.created_at).toLocaleString()}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
