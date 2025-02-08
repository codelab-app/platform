'use client'

import type { RenderType } from 'antd/es/config-provider/UnstableContext'
import type { ReactNode } from 'react'

import { App, ConfigProvider, unstableSetRender } from 'antd'
import { unstableSetRender as unstableSetRenderLib } from 'antd/lib'
import { createRoot } from 'react-dom/client'

// import { AntdRegistry } from './AntdRegistry'
import { AntdRegistry } from '@ant-design/nextjs-registry'

import { StyledComponentsRegistry } from './StyledComponentsRegistry'
import { theme } from './theme'

const render: RenderType = (node, container) => {
  const root = createRoot(container)

  root.render(node)

  return async () => {
    root.unmount()
  }
}

// React 19 compatibility
unstableSetRender(render)
unstableSetRenderLib(render)

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
