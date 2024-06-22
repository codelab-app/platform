'use client'

import '../styles/global.css'
import { UserProvider } from '@auth0/nextjs-auth0/client'
import { createDomainStore } from '@codelab/frontend/infra/mobx'
import { CuiProvider } from '@codelab/frontend/presentation/codelab-ui'
import { StoreProvider } from '@codelab/frontend-application-shared-store/provider'
import { App, ConfigProvider } from 'antd'
import { registerRootStore } from 'mobx-keystone'
import React, { Suspense, useState } from 'react'
import { StyledComponentsRegistry } from './registry'
import { theme } from './theme'

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const [store] = useState(() => {
    const coreStore = createDomainStore()

    registerRootStore(coreStore)

    return coreStore
  })

  return (
    <html lang="en">
      <body>
        <Suspense>
          <StyledComponentsRegistry>
            <StoreProvider value={store}>
              <UserProvider>
                <CuiProvider>
                  <ConfigProvider theme={theme}>
                    <App className="size-full">{children}</App>
                  </ConfigProvider>
                </CuiProvider>
              </UserProvider>
            </StoreProvider>
          </StyledComponentsRegistry>
        </Suspense>
      </body>
    </html>
  )
}

export default RootLayout
