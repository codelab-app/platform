'use client'

import type { PropsWithChildren } from 'react'

// import { AntdRegistry } from './AntdRegistry'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { App, ConfigProvider } from 'antd'
// import { useTwindConfig } from '@codelab/frontend/shared/utils'

import { StyledComponentsRegistry } from './StyledComponentsRegistry'
import { theme } from './theme'

export const StyleProviders = ({ children }: PropsWithChildren) => {
  // useTwindConfig(twindConfig)

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
