import { EnvPublic } from '@codelab/shared/config'
import Script from 'next/script'
import React from 'react'

export const GoogleAnalytics = () => {
  const { id } = EnvPublic().googleAnalytics

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
