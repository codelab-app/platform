'use client'

import '../styles/global.css'
import { UserProvider } from '@auth0/nextjs-auth0/client'
import { CuiProvider } from '@codelab/frontend/presentation/codelab-ui'
import { App, ConfigProvider } from 'antd'
import React, { Suspense } from 'react'
import { CuiStoreProvider } from './components/provider'
import { ReactQueryProvider } from './components/react-query.provider'
import { StyledComponentsRegistry } from './registry'
import { theme } from './theme'

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <Suspense>
          <StyledComponentsRegistry>
            <ReactQueryProvider>
              <CuiStoreProvider>
                <UserProvider>
                  <CuiProvider>
                    <ConfigProvider theme={theme}>
                      <App className="size-full">{children}</App>
                    </ConfigProvider>
                  </CuiProvider>
                </UserProvider>
              </CuiStoreProvider>
            </ReactQueryProvider>
          </StyledComponentsRegistry>
        </Suspense>
      </body>
    </html>
  )
}

export default RootLayout
