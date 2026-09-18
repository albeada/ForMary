import { useEffect, useState } from 'react'
import { fetchPhrases, insertPhrase } from '../lib/supabaseClient'
import './Diary.css'

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
    <div className={`diary ${className}`}>
      <div className="diary-panel">
        <div className="diary-content">
          <div className="diary-header">
            <div>
              <h2 className="diary-heading">DEATH NOTE</h2>
              <p className="diary-subtitle">Taccuino personale</p>
            </div>
          </div>

          <form onSubmit={handleSave} className="diary-form">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={6}
              className="diary-textarea"
              placeholder="Scrivi la frase..."
            />
            <div className="diary-actions">
              <button type="submit" className="diary-submit" disabled={saving}>{saving ? 'Salvando...' : 'Incidi'}</button>
            </div>
          </form>

          <div className="diary-items">
            {loading && <div className="diary-loading">Caricamento...</div>}
            {!loading && items.length === 0 && <div className="diary-empty">Nessuna frase ancora.</div>}
            {items.map((it) => (
              <div key={it.id} className="diary-item">
                <div className="diary-item-text">{it.text}</div>
                <div className="diary-item-date">{it.inserted_at ? new Date(it.inserted_at).toLocaleString() : ''}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
