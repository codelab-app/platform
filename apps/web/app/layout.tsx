import '../styles/global.css'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { StoreProvider } from '@codelab/frontend-application-shared-store/provider'
import { getServerUser } from '@codelab/frontend-application-user/use-cases/server-user'
import { App, ConfigProvider } from 'antd'
import React from 'react'
import { CuiProvider } from './providers/CuiProvider'
import { StyledComponentsRegistry } from './registry'
import { theme } from './theme'

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getServerUser()

  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <CuiProvider>
            <StoreProvider user={user}>
              <AntdRegistry>
                <ConfigProvider theme={theme}>
                  <App>{children}</App>
                </ConfigProvider>
              </AntdRegistry>
            </StoreProvider>
          </CuiProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}

export default RootLayout
