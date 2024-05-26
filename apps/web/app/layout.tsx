'use client'

import '../styles/global.css'
import { UserProvider } from '@auth0/nextjs-auth0/client'
import { CuiProvider } from '@codelab/frontend/presentation/codelab-ui'
import { App, ConfigProvider } from 'antd'
import React, { Suspense } from 'react'
import { CuiStoreProvider } from './components/provider'
import { theme } from './theme'

const RootLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <html lang="en">
      <body>
        <Suspense>
          <CuiStoreProvider>
            <UserProvider>
              <CuiProvider>
                <ConfigProvider theme={theme}>
                  <App className="size-full">{children}</App>
                </ConfigProvider>
              </CuiProvider>
            </UserProvider>
          </CuiStoreProvider>
        </Suspense>
      </body>
    </html>
  )
}

export default RootLayout
