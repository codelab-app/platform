'use client'

import type { PropsWithChildren } from 'react'

import { App, ConfigProvider } from 'antd'

// import { AntdRegistry } from './AntdRegistry'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { useTwindConfig } from '@codelab/frontend/shared/utils'

import { StyledComponentsRegistry } from './StyledComponentsRegistry'
import { theme } from './theme'

export const StyleProviders = ({
  children,
  twindConfig,
}: PropsWithChildren<{ twindConfig: unknown }>) => {
  useTwindConfig(twindConfig)

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
