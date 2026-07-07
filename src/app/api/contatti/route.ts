import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { SITE } from '@/lib/seo'

const SERVIZI: Record<string, string> = {
  metodo: 'Metodo Fooody · per la ristorazione',
  social: 'Social Media',
  web: 'Web Design',
  branding: 'Branding & Identità',
  tutto: 'Tutto — parliamo di persona',
}

const COME_CONOSCIUTO: Record<string, string> = {
  instagram: 'Instagram',
  tiktok: 'TikTok',
  linkedin: 'LinkedIn',
  google: 'Google / ricerca web',
  passaparola: 'Passaparola',
  cliente: 'Era già cliente',
  altro: 'Altro',
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

// Rate limit in-memory per IP: 5 richieste ogni 10 minuti.
// Sufficiente contro spam automatico su singola istanza; non persiste tra deploy/restart.
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT_MAX = 5
const hits = new Map<string, number[]>()

function isRateLimited(ip: string) {
  const now = Date.now()
  const timestamps = (hits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS)
  timestamps.push(now)
  hits.set(ip, timestamps)
  return timestamps.length > RATE_LIMIT_MAX
}

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'Troppe richieste. Riprova tra qualche minuto.' }, { status: 429 })
  }

  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Payload non valido.' }, { status: 400 })
  }

  // Honeypot: bot compilano anche i campi nascosti.
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    return NextResponse.json({ ok: true })
  }

  const nome = typeof body.nome === 'string' ? body.nome.trim() : ''
  const cognome = typeof body.cognome === 'string' ? body.cognome.trim() : ''
  const email = typeof body.email === 'string' ? body.email.trim() : ''
  const telefono = typeof body.telefono === 'string' ? body.telefono.trim() : ''
  const messaggio = typeof body.messaggio === 'string' ? body.messaggio.trim() : ''
  const servizio = typeof body.servizio === 'string' ? body.servizio.trim() : ''
  const comeConosciuto = typeof body.come_conosciuto === 'string' ? body.come_conosciuto.trim() : ''

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!nome || !cognome || !emailPattern.test(email) || !messaggio) {
    return NextResponse.json({ error: 'Compila tutti i campi obbligatori.' }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('RESEND_API_KEY non configurata: impossibile inviare il messaggio del form contatti.')
    return NextResponse.json({ error: 'Servizio email non configurato.' }, { status: 500 })
  }

  const resend = new Resend(apiKey)
  const to = process.env.CONTACT_FORM_TO || SITE.email

  try {
    const { error } = await resend.emails.send({
      from: `Form contatti ${SITE.name} <form@${new URL(SITE.url).hostname}>`,
      to,
      replyTo: email,
      subject: `Nuovo contatto dal sito — ${nome} ${cognome}`,
      html: `
        <h2>Nuovo messaggio dal form contatti</h2>
        <p><strong>Nome:</strong> ${escapeHtml(nome)} ${escapeHtml(cognome)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        ${telefono ? `<p><strong>Telefono:</strong> ${escapeHtml(telefono)}</p>` : ''}
        ${servizio ? `<p><strong>Servizio:</strong> ${escapeHtml(SERVIZI[servizio] ?? servizio)}</p>` : ''}
        ${comeConosciuto ? `<p><strong>Come ci ha conosciuto:</strong> ${escapeHtml(COME_CONOSCIUTO[comeConosciuto] ?? comeConosciuto)}</p>` : ''}
        <p><strong>Messaggio:</strong></p>
        <p>${escapeHtml(messaggio).replace(/\n/g, '<br />')}</p>
      `,
    })

    if (error) {
      console.error('Errore invio email Resend:', error)
      return NextResponse.json({ error: 'Invio non riuscito. Riprova più tardi.' }, { status: 502 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Errore invio email:', err)
    return NextResponse.json({ error: 'Invio non riuscito. Riprova più tardi.' }, { status: 502 })
  }
}
