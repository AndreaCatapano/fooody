'use client'
import { usePathname } from 'next/navigation'

export function MaskWord() {
  const pathname = usePathname()
  const seg = pathname.replace(/^\//, '').split('/')[0]
  const word = seg ? seg.charAt(0).toUpperCase() + seg.slice(1) : 'Fooody.'
  return (
    <div className="mask-word">
      <span>{word}</span>
    </div>
  )
}
