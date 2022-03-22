import { ROOT_RENDER_CONTAINER_ID } from '@codelab/frontend/abstract/core'
import ErrorBoundary from 'antd/lib/alert/ErrorBoundary'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { ElementWrapper } from './ElementWrapper'
import { RendererModel } from './RendererModel'

export interface RendererProps {
  renderModel: RendererModel
}

/**
 * Renders an ElementTree. Reworked version of ./renderer-old, adapted to use observable state from mobx
 *
 * Hooks and prop map bindings are currently not implemented, since they might be
 * replaced by platform-level mobx.
 */
export const Renderer = observer(({ renderModel }: RendererProps) => {
  const root = renderModel.tree.root

  if (!root) {
    console.warn('RendererModel: No root element found')

    return null
  }

  return (
    <ErrorBoundary>
      <div id={ROOT_RENDER_CONTAINER_ID} style={{ minHeight: '100%' }}>
        <ElementWrapper element={root} renderModel={renderModel} />
      </div>
    </ErrorBoundary>
  )
})

Renderer.displayName = 'Renderer'
