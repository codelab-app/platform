import '../styles/global.css'
import '../styles/shadcn.global.css'
import { RootProviders } from '@codelab/frontend/infra/context'
import { getServerUser } from '@codelab/frontend-application-user/use-cases/server-user'
import { getEnv } from '@codelab/shared/config'
import { cn } from '@cui/utils'
import { setGlobalConfig } from 'mobx-keystone'
import { Inter, Montserrat, Nunito } from 'next/font/google'
import Script from 'next/script'
import React from 'react'
// import config from '../tailwind.config.js'

setGlobalConfig({
  showDuplicateModelNameWarnings: process.env.NODE_ENV === 'production',
})

/**
 * Need to paste here for it to work with mobx
 */
if (getEnv().endpoint.isLocal && getEnv().node.enableWdyr) {
  console.log('Enable WDYR...')

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const whyDidYouRender = require('@welldone-software/why-did-you-render')

  whyDidYouRender(React, {
    collapseGroups: true,
    // Exclude Ant Design components
    exclude: [/PopupContent/],
    // onlyLogs: true,
    titleColor: 'green',
    trackAllPureComponents: true,
  })
}

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

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getServerUser()

  // useTwindConfig(config)

  return (
    <html className={fontClasses} lang="en" suppressHydrationWarning>
      <head>
        <Script
          dangerouslySetInnerHTML={{
            // eslint-disable-next-line @typescript-eslint/naming-convention
            /**
             * In case you're wondering why we have this script here. Toggling the readOnly in this line, caused the editor js to spit some errors that crashed the app. Fortunately, even with these errors, I could still use editor js normally. From reading around the internet, I concluded that these errors were just some undefined state not handled correctly. Anyway, we can only wait for editor js team to fix these errors so I figured we could just ignore these errors for now.
             *
             * And if you're wondering why the script is placed here, it's because putting it in other locations won't work. Next.js has a built-in script that catches all errors and displays them to users. We aim to intercept these errors before Next.js does.
             */
            __html: `
                window.addEventListener('error', event => {
                  if(event.filename.includes('editorjs')) {
                    event.stopImmediatePropagation()
                  }
                })
              `,
          }}
          id="editorjs-script"
        ></Script>
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <RootProviders user={user}>{children}</RootProviders>
      </body>
    </html>
  )
}

export default RootLayout
