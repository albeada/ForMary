import { useEffect, useState } from 'react'
import './Hero.css'

const START_DATE = new Date(2024, 8, 21, 23, 50, 0) // 21 Sept 2024 23:50 (month index 8)

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
    <div className={`hero ${className}`}>
      <div className="hero-panel">
        <div className="hero-header">
          <div>
            <h2 className="hero-heading">Tempo trascorso</h2>
            <p className="hero-start">Da <strong>21 Settembre 2024 — 23:50</strong></p>
          </div>
          <div className="hero-heart-frame">
            <div className="hero-heart">💕</div>
          </div>
        </div>

        <div className="elapsed-grid">
          {['years','months','days','hours','minutes','seconds'].map((k) => (
            <div key={k} className="elapsed-item">
              <div className="elapsed-label">{k}</div>
              <div className="elapsed-value">{elapsed[k]}</div>
            </div>
          ))}
        </div>
        <div className="love-note">
          <h1 className="love-note-title">Da parte del tuo cuoricino &hearts;</h1>
          <p className="love-note-text">bhe come sempre inizio dal dire che sono dislesico e che non sono tanto bravo a scrivere o essere romantico (anche perche sono dsa non il nuovo Hayez o manzoni, al massimo assomiglio a leopardi[my love]) ma ci provo lo stesso; onestamente sono passati questi due anni molto velocemente e sono contento della scelta che ho fatto, nemmeno un rimorso, nemmeno un rimpianto, ci sono stati i suoi alti e bassi ma probabilmente se non ci fossero stati ora non saremmo qui a festegiare, perciò si sono felice di questi due anni e spero che staremmo bene anche per molto altro tempo. Abbiamo fatto tante esperienze tra quelle divertenti e non, come quella volta in cui siamo caduti insieme, alla prima uscita in cui ti ho spiegato il sistema binario o nella stessa sera nella mondadori che ci siamo schiattati dal ridere per un libro per bambini sulla cacca, ma ci sono stati anche eventi piu seri come i comicon, le passegiate a unisa mentre tu facevi i esami o ai concerti di willye e capa.
soprattuto al concerto di Caparezza mi sono divertito un sacco e probabilmente senza di te non sarebbe stata la stessa cosa;
come disse Caparezza in una canzone del concerto:

Non è l’amore che muove il mondo ma la sete di conoscenza
L’amore è conseguеnza o un incidente di percorso

e tu se la cosenguenza o l'incidente piu bello che mi poteva capitare (fino a mo almeno).

ovviamente mi ricordo anche la prima canzone che ti ho dedicata e ho trovato un verso in cui mi rispechio ancora oggi:

Non prendermi sul serio
Sto per prendermi male
Ma è normale, sono analfabeta sentimentale

lo so che non sono tanto bravo romanticamente e abbiamo passato dei momenti brutti per cio pero ja vedi dopo 2 anni siamo ancora qua, insieme, e mi ami(spero) ancora come io amo te.

beh non ho nominato tananai perche la frase la tieni gia sul tuo collo e lo ammetto anche se lo critico sempre perchè i suoi testi sono tutte frasi fatte o che è incoerente perchè ha tradito la sua ex anche io sta volto lo sono stato, non intendo a tradirti questo ne mo ne mai, ma posso dire che le parole che ho usato vengono dal cuore e sono sicere e sarei felice passare un altro anno con te. Poi anno prosimo vediamo se rinovare il contratto.

Bhe siamo alla fine non so se ho scritto molto o no ma ti vorrei lasciare con questa frase:
Quando si parla di destino, divento d'un tratto polemico
Sarà pure scritto, sì, ma col tratto d'un medico

questo per dire che il futuro non so se le nostre strade si dividerano, possono esserci mille ragioni per cui puo succedere, pero abbi fede in te e vai avanti perchè il tuo destino lo scrivi tu e con il tuo 100 e lode e tra poco laurea in mate hai tutte le capacita per scrivere un destino nel quale puoi essere felice, ricca possibilmente e in questo caso spero di esserci anche io.
io credo in te.
io ti amo.
by albeada.</p>
        </div>
        
      </div>
    </div>
  )
}
