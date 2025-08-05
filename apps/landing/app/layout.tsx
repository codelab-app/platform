import type { Metadata } from 'next'
import type { PropsWithChildren } from 'react'

import { GoogleAnalytics } from '../src/home/GoogleAnalytics'
import { Intercom } from '../src/home/Intercom'
import { HotjarProvider } from './hotjar-provider'
import { Providers } from './providers'
import '../styles/app.css'

export const metadata: Metadata = {
  title: 'Codelab - Build Web Apps Visually',
  description:
    'Build web applications using a visual drag-and-drop interface with the power of code',
}

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link
          crossOrigin=""
          href="https://fonts.gstatic.com"
          rel="preconnect"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800;900&family=Roboto:wght@300;400&family=Nunito:wght@300;400;500;600&family=IBM+Plex+Sans+Thai&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
          rel="stylesheet"
          type="text/css"
        />
      </head>
      <body>
        <GoogleAnalytics />
        <Intercom />
        <HotjarProvider />
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

export default RootLayout
