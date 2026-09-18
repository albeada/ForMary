import { useEffect, useState } from 'react'
import { fetchPhrases, insertPhrase } from '../lib/supabaseClient'
import './Notes.css'

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
    <section className="notes">
      <form onSubmit={handleAdd} className="notes-form">
        <label className="notes-label">Aggiungi una frase</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          className="notes-textarea"
          placeholder="Scrivi qualcosa di carino..."
        />
        <div className="notes-actions">
          <button className="notes-save" type="submit">
            Salva
          </button>
          <button
            type="button"
            className="notes-clear"
            onClick={() => setItems([])}
          >
            Cancella tutto
          </button>
        </div>
      </form>

      <div className="notes-items">
        {items.length === 0 && <p className="notes-empty">Nessuna frase ancora.</p>}
        {items.map((it) => (
          <div key={it.id} className="note-item">
            <div className="note-text">{it.text}</div>
            <div className="note-date">{new Date(it.created_at).toLocaleString()}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
