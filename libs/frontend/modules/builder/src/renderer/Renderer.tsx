import { ROOT_RENDER_CONTAINER_ID } from '@codelab/frontend/abstract/core'
import ErrorBoundary from 'antd/lib/alert/ErrorBoundary'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { RenderService } from './RenderService'

export interface RendererProps {
  renderService: RenderService
}

/**
 * Renders an ElementTree
 *
 * Hooks and prop map bindings are currently not implemented, since they might be
 * replaced by platform-level mobx.
 */
export const Renderer = observer(({ renderService }: RendererProps) => {
  return (
    <ErrorBoundary>
      <div id={ROOT_RENDER_CONTAINER_ID} style={{ minHeight: '100%' }}>
        {renderService.renderRoot()}
      </div>
    </ErrorBoundary>
  )
})

Renderer.displayName = 'Renderer'
