import React from 'react'
import { elementParameterFactory } from '@codelab/frontend/builder'
import { ClickOverlay, HoverOverlay } from '../overlay-toolbar'
import { NodeA } from '@codelab/frontend/shared'
import { RenderChildren } from './Renderer-children'
import { useComponentHandlers } from './useComponentHandlers'

export const NodeRenderer = ({
  node,
  enableOverlays = true,
}: {
  node: NodeA
  enableOverlays?: boolean
}) => {
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
