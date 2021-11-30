import React from 'react'
import { useBuilderHoveringElement } from '../../hooks'
import { HoverOverlay } from './Overlay-hover'

export const BuilderHoverOverlay = () => {
  const { hoveringElement } = useBuilderHoveringElement()

  if (!hoveringElement) {
    return null
  }

  const content = `${hoveringElement.name} ${
    hoveringElement.atom ? `(${hoveringElement.atom.name})` : ''
  }`

  return <HoverOverlay nodeId={hoveringElement.id} content={content} />
}

BuilderHoverOverlay.displayName = 'ElementBuilderHoverOverlay'
