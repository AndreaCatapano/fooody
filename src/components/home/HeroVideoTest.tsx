'use client'
import { useEffect, useState } from 'react'

/**
 * Prova di performance: player Vimeo reale al posto del placeholder statico.
 * ID 32001208 = "EARTH" (Michael König) — video pubblico Vimeo senza
 * restrizioni di dominio sull'embed, usato solo come stand-in tecnico finché
 * il cliente non fornisce il video hero reale (CONTENUTI-DA-CLIENTE.md §7).
 * Il player si monta solo dopo 'hero:assembled' (fine assembly particelle in
 * hero-cine.js), per non competere con LCP/TBT durante il caricamento iniziale.
 */
const TEST_VIMEO_ID = '32001208'

export default function HeroVideoTest() {
  const [active, setActive] = useState(false)

  useEffect(() => {
    const onAssembled = () => setActive(true)
    window.addEventListener('hero:assembled', onAssembled)
    return () => window.removeEventListener('hero:assembled', onAssembled)
  }, [])

  if (!active) return null

  return (
    <iframe
      src={`https://player.vimeo.com/video/${TEST_VIMEO_ID}?background=1&autoplay=1&loop=1&muted=1&controls=0&dnt=1`}
      title="Video hero — prova performance"
      allow="autoplay; fullscreen"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
      aria-hidden="true"
      tabIndex={-1}
    />
  )
}
