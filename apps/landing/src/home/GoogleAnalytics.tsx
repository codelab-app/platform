import { getEnv } from '@codelab/shared-config-env'
import Script from 'next/script'

export const GoogleAnalytics = () => {
  const { id } = getEnv().googleAnalytics

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="afterInteractive"
      />
      <Script id="GA" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${id}');`}
      </Script>
    </>
  )
}
