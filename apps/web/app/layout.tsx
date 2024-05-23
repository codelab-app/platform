import '../styles/global.css'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { UserProvider } from '@auth0/nextjs-auth0/client'
import { App, ConfigProvider } from 'antd'
import type { NextPage } from 'next'
import React from 'react'
import { theme } from './theme'

const RootLayout = async ({ children }: React.PropsWithChildren) => {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <AntdRegistry>
            <ConfigProvider theme={theme}>
              <App className="size-full">{children}</App>
            </ConfigProvider>
          </AntdRegistry>
        </UserProvider>
      </body>
    </html>
  )
}

export default RootLayout
