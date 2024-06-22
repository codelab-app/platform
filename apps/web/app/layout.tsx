import '../styles/global.css'
import { UserProvider } from '@auth0/nextjs-auth0/client'
import { StoreProvider } from '@codelab/frontend-application-shared-store/provider'
import { getServerUser } from '@codelab/frontend-application-user/use-cases/server-user'
import { App, ConfigProvider } from 'antd'
import React, { Suspense } from 'react'
import { CuiProvider } from './providers/CuiProvider'
import { StyledComponentsRegistry } from './registry'
import { theme } from './theme'

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getServerUser()

  return (
    <html lang="en">
      <body>
        <Suspense>
          <StyledComponentsRegistry>
            <StoreProvider user={user}>
              <UserProvider user={user}>
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
