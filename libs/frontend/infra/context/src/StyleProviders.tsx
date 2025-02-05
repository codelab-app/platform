'use client'

import type { ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import { App, ConfigProvider } from 'antd'
import { unstableSetRender } from 'antd'
import { unstableSetRender as unstableSetRenderLib } from 'antd/lib'

// import { AntdRegistry } from './AntdRegistry'
import { AntdRegistry } from '@ant-design/nextjs-registry'

import { StyledComponentsRegistry } from './StyledComponentsRegistry'
import { theme } from './theme'
import { RenderType } from 'antd/es/config-provider/UnstableContext'

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
