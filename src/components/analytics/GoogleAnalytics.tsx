import Script from 'next/script'

/**
 * GA4. Si carica sempre (script statico), ma raccoglie dati solo se
 * Iubenda aggiorna il Consent Mode ad 'granted' — vedi ConsentDefault.tsx.
 * Attivo solo se NEXT_PUBLIC_GA_ID è compilata.
 */
export default function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID
  if (!gaId) return null

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', ${JSON.stringify(gaId)});
      `}</Script>
    </>
  )
}
