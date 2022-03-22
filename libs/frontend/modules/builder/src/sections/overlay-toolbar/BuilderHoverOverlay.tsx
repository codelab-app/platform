import { HoverOverlay } from '@codelab/frontend/view/components'
import React from 'react'
import { useBuilderHoveringElement } from '../../hooks'
import { queryRenderedElementById } from '../../renderer/utils/queryRenderedElementById'

export const BuilderHoverOverlay = () => {
  const { hoveringElement } = useBuilderHoveringElement()

  if (!hoveringElement) {
    return null
  }

  const content = `${hoveringElement.name} ${
    hoveringElement.atom ? `(${hoveringElement.atom.name})` : ''
  }`

  return (
    <HoverOverlay
      content={content}
      getOverlayElement={queryRenderedElementById}
      nodeId={hoveringElement.id}
    />
  )
}

BuilderHoverOverlay.displayName = 'ElementBuilderHoverOverlay'
