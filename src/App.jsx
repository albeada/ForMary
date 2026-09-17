import { useState } from 'react'
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

  const rootBg = active === 0 ? 'bg-pink-50/10' : 'bg-black/90'
  const themeClass = active === 0 ? 'theme-hero' : 'theme-diary'

  return (
    <div className={`app-root min-h-screen flex flex-col items-stretch ${rootBg} ${themeClass}`}>
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          <div className="card-container h-[80vh] md:h-[86vh]">
            <div className={`card-wrapper ${active === 0 ? 'card-visible' : 'card-hidden'}`}>
              <Hero className="h-full" />
            </div>
            <div className={`card-wrapper ${active === 1 ? 'card-visible' : 'card-hidden'}`}>
              <Diary className="h-full" />
            </div>
          </div>
        </div>
      </div>

      <div className="controls fixed bottom-6 left-0 right-0 flex items-center justify-center gap-4 pointer-events-none">
        <button onClick={prev} className="nav-button pointer-events-auto">◀</button>
        <div className={`flex items-center gap-2 rounded-full px-3 py-1 shadow ${active===0 ? 'bg-white/60' : 'bg-gray-800/60'}`}>
          {CARDS.map((c, i) => (
            <button
              key={c}
              onClick={() => setActive(i)}
              className={`w-3 h-3 rounded-full ${active===i ? (active===0 ? 'bg-pink-600' : 'bg-pink-400') : (active===0 ? 'bg-gray-300' : 'bg-gray-500')}`}
              aria-label={`show ${c}`}
            />
          ))}
        </div>
        <button onClick={next} className="nav-button pointer-events-auto">▶</button>
      </div>
    </div>
  )
}
