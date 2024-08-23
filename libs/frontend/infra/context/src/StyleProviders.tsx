import { AntdRegistry } from '@ant-design/nextjs-registry'
import { App, ConfigProvider } from 'antd'
import type { ReactNode } from 'react'
import React from 'react'
import { StyledComponentsRegistry } from './StyledComponentsRegistry'
import { theme } from './theme'

export const StyleProviders = ({ children }: { children: ReactNode }) => {
  return (
    <AntdRegistry>
      <StyledComponentsRegistry>
        <ConfigProvider theme={theme}>
          <App className="h-full">{children}</App>
        </ConfigProvider>
      </StyledComponentsRegistry>
    </AntdRegistry>
  )
}
