import 'server-only'
import '../styles/global.css'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { App, ConfigProvider } from 'antd'
import type { NextPage } from 'next'
import React from 'react'
import { theme } from './theme'

const RootLayout: NextPage = async ({ children }: React.PropsWithChildren) => {
  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <ConfigProvider theme={theme}>
            <App className="size-full">{children}</App>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  )
}

export default RootLayout
