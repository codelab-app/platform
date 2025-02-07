'use client'

import type { RenderType } from 'antd/es/config-provider/UnstableContext'

import { unstableSetRender } from 'antd'
import { unstableSetRender as unstableSetRenderLib } from 'antd/lib'
import { createRoot } from 'react-dom/client'

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

export const React19Compatibility = () => null
