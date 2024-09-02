'use client'

import { App, ConfigProvider } from 'antd'
import type { ReactNode } from 'react'
import React from 'react'
import { AntdRegistry } from './AntdRegistry'
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
