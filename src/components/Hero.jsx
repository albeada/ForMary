import { useEffect, useState } from 'react'

const START_DATE = new Date(2024, 8, 21, 11, 50, 0) // 21 Sept 2024 11:50 (month index 8)

function computeElapsed(start, now) {
  // Use borrowing method so that each unit is non-negative and days < ~31
  let years = now.getFullYear() - start.getFullYear()
  let months = now.getMonth() - start.getMonth()
  let days = now.getDate() - start.getDate()
  let hours = now.getHours() - start.getHours()
  let minutes = now.getMinutes() - start.getMinutes()
  let seconds = now.getSeconds() - start.getSeconds()

  if (seconds < 0) {
    seconds += 60
    minutes -= 1
  }
  if (minutes < 0) {
    minutes += 60
    hours -= 1
  }
  if (hours < 0) {
    hours += 24
    days -= 1
  }
  if (days < 0) {
    // number of days in the previous month relative to 'now'
    const prevMonthDays = new Date(now.getFullYear(), now.getMonth(), 0).getDate()
    days += prevMonthDays
    months -= 1
  }
  if (months < 0) {
    months += 12
    years -= 1
  }

  // Ensure days less than 31 (should be guaranteed by prevMonthDays)
  if (days >= 31) {
    // normalize (very unlikely) by converting excess days to months
    const extraMonths = Math.floor(days / 30)
    months += extraMonths
    days = days % 30
    if (months >= 12) {
      years += Math.floor(months / 12)
      months = months % 12
    }
  }

  return { years, months, days, hours, minutes, seconds }
}

export default function Hero({ className = '' }) {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const elapsed = computeElapsed(START_DATE, now)

  return (
    <div className={`flex flex-col justify-between ${className}`}>
      <div className="h-full flex flex-col rounded-3xl bg-pink-50 p-8 shadow-2xl border border-pink-200">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-pink-700">Tempo trascorso</h2>
            <p className="mt-1 text-sm text-pink-600">Da <strong>21 Settembre 2024 — 11:50</strong></p>
          </div>
          <div className="hidden sm:flex items-center justify-center w-24 h-24 bg-pink-200 rounded-xl shadow-inner">
            <div className="w-16 h-16 bg-pink-400 rounded-full flex items-center justify-center text-white text-2xl font-semibold">💕</div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-3 sm:grid-cols-6 gap-3">
          {['years','months','days','hours','minutes','seconds'].map((k) => (
            <div key={k} className="bg-white/90 p-4 rounded-xl shadow-sm border border-pink-50 flex flex-col">
              <div className="text-xs text-pink-600 uppercase">{k}</div>
              <div className="text-2xl font-mono text-pink-700 mt-1">{elapsed[k]}</div>
            </div>
          ))}
        </div>

        
      </div>
    </div>
  )
}
