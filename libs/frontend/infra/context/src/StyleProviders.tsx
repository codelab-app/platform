'use client'

import type { ReactNode } from 'react'
import '@ant-design/v5-patch-for-react-19';
import { App, ConfigProvider } from 'antd'

// import { AntdRegistry } from './AntdRegistry'
import { AntdRegistry } from '@ant-design/nextjs-registry'

import { StyledComponentsRegistry } from './StyledComponentsRegistry'
import { theme } from './theme'

export const StyleProviders = ({ children }: { children: ReactNode }) => {
  return (
    <StyledComponentsRegistry>
      <AntdRegistry>
        <ConfigProvider theme={theme}>
          <App className="h-full">{children}</App>
        </ConfigProvider>
      </AntdRegistry>
    </StyledComponentsRegistry>
  )
}
