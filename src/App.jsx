import { useEffect, useState } from 'react'
import Hero from './components/Hero'
import Diary from './components/Diary'
import './App.css'

const CARDS = ['hero', 'diary']

export default function App() {
  const [active, setActive] = useState(0)

  function next() {
    setActive((v) => (v + 1) % CARDS.length)
  }
  function prev() {
    setActive((v) => (v - 1 + CARDS.length) % CARDS.length)
  }

  const themeClass = active === 0 ? 'theme-hero' : 'theme-diary'

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('theme-hero', 'theme-diary')
    root.classList.add(themeClass)

    return () => root.classList.remove(themeClass)
  }, [themeClass])

  return (
    <div className={`app-root ${themeClass}`}>
      <div className="app-content">
        <div className="content-width">
          <div className="card-container">
            <div className={`card-wrapper ${active === 0 ? 'card-visible' : 'card-hidden'}`}>
              <Hero className="full-height" />
            </div>
            <div className={`card-wrapper ${active === 1 ? 'card-visible' : 'card-hidden'}`}>
              <Diary className="full-height" />
            </div>
          </div>
        </div>
      </div>

      <div className="controls">
        <button onClick={prev} className="nav-button">◀</button>
        <div className={`page-indicators ${active === 0 ? 'hero-indicators' : 'diary-indicators'}`}>
          {CARDS.map((c, i) => (
            <button
              key={c}
              onClick={() => setActive(i)}
              className={`page-indicator ${active === i ? 'indicator-active' : 'indicator-inactive'}`}
              aria-label={`show ${c}`}
            />
          ))}
        </div>
        <button onClick={next} className="nav-button">▶</button>
      </div>
    </div>
  )
}
