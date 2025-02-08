'use client'

import type { PropsWithChildren } from 'react'

import { App, ConfigProvider } from 'antd'

// import { AntdRegistry } from './AntdRegistry'
import { AntdRegistry } from '@ant-design/nextjs-registry'

import { StyledComponentsRegistry } from './StyledComponentsRegistry'
import { theme } from './theme'

export const StyleProviders = ({ children }: PropsWithChildren) => {
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
