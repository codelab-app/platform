/* eslint-disable import/first */
'use client'

import { initWdyr } from '../wdyr'

// initWdyr()

import '../styles/main.css'
// import config from '../tailwind.config.js'
import { StyleProviders } from '@codelab/frontend/infra/context'
import { cn } from '@cui/utils'
import { getActiveSpan } from '@sentry/react'
import { setGlobalConfig } from 'mobx-keystone'
import { Inter, Montserrat, Nunito } from 'next/font/google'

setGlobalConfig({
  showDuplicateModelNameWarnings: process.env.NODE_ENV === 'production',
})

// normal: 400
// bold: 700
// black: 900

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['600', '700', '800', '900'],
})

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  weight: ['300', '400', '500', '600'],
})

const fontClasses = cn(inter.variable, montserrat.variable, nunito.variable)

// export const metadata = {
//   description: 'Codelab platform',
//   title: 'Codelab',
// }

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  // useTwindConfig(config)

  return (
    <html className={fontClasses} lang="en" suppressHydrationWarning>
      <head></head>
      <body className="min-h-screen bg-background antialiased">
        <StyleProviders>{children}</StyleProviders>
      </body>
    </html>
  )
}

RootLayout.displayName = 'RootLayout'

export default RootLayout
