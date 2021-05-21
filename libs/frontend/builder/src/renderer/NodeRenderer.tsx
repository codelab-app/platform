import { ComponentElementNode } from '@codelab/frontend/shared'
import React from 'react'
import { ClickOverlay, HoverOverlay } from '../overlay-toolbar'
import { elementParameterFactory } from './elementFactory'
import { RenderChildren } from './Renderer-children'
import { useComponentHandlers } from './useComponentHandlers'

export const NodeRenderer = ({
  node,
  enableOverlays = true,
}: {
  node: ComponentElementNode
  enableOverlays?: boolean
}) => {
  console.log(node)

  const handlers = useComponentHandlers()

  const [RootComponent, props] = elementParameterFactory({
    node,
    handlers,
  })

  if (!RootComponent) {
    return null
  }

  return (
    <div style={{ width: '100%', height: 'auto' }}>
      <RootComponent {...props}>
        <RenderChildren node={node} handlers={handlers} />
      </RootComponent>

      {enableOverlays && (
        <>
          <HoverOverlay />
          <ClickOverlay />
        </>
      )}
    </div>
  )
}
