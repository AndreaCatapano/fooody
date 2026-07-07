import Script from 'next/script'

/**
 * Iubenda Cookie Solution (CMP). Attivo solo se le env var sono compilate.
 * Setup richiesto lato Iubenda dashboard (fatto dal cliente/agenzia):
 *  1. Creare il sito su iubenda.com, generare Privacy Policy + Cookie Policy.
 *  2. Attivare "Cookie Solution" e collegare i due ID sotto.
 *  3. Nel pannello Cookie Solution → Advanced → attivare l'integrazione
 *     "Google Consent Mode" (necessaria perché GA4 rispetti ConsentDefault).
 */
export default function IubendaCookieSolution() {
  const siteId = process.env.NEXT_PUBLIC_IUBENDA_SITE_ID
  const cookiePolicyId = process.env.NEXT_PUBLIC_IUBENDA_COOKIE_POLICY_ID

  if (!siteId || !cookiePolicyId) return null

  return (
    <>
      <Script id="iubenda-config" strategy="beforeInteractive">{`
        var _iub = _iub || [];
        _iub.csConfiguration = {
          siteId: ${JSON.stringify(siteId)},
          cookiePolicyId: ${JSON.stringify(cookiePolicyId)},
          lang: 'it',
          consentOnContinuedBrowsing: false,
          whitelabel: false,
          googleConsentMode: { enabled: true }
        };
      `}</Script>
      <Script
        src={`https://cs.iubenda.com/autoblocking/${siteId}.js`}
        strategy="beforeInteractive"
      />
      <Script
        src="//cdn.iubenda.com/cs/iubenda_cs.js"
        strategy="beforeInteractive"
      />
    </>
  )
}
