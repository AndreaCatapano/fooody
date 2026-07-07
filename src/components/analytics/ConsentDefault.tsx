import Script from 'next/script'

/**
 * Google Consent Mode v2 — deve essere eseguito PRIMA di qualsiasi script
 * di misurazione (GA4, Ads). Imposta consenso negato di default; Iubenda
 * (con l'integrazione "Google Consent Mode" attiva nel suo pannello)
 * aggiorna questi valori via gtag('consent','update', ...) quando l'utente
 * accetta dal banner.
 */
export default function ConsentDefault() {
  return (
    <Script id="consent-default" strategy="beforeInteractive">{`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('consent', 'default', {
        ad_storage: 'denied',
        analytics_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
        wait_for_update: 500
      });
    `}</Script>
  )
}
