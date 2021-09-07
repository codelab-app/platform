import React from 'react'
import { useBuilderSelection } from '../containers/builderState'
import { HoverOverlay } from './Overlay-hover'

export const BuilderHoverOverlay = () => {
  const {
    state: { hoveringElement },
  } = useBuilderSelection()

  if (!hoveringElement) {
    return null
  }

  const content = `${hoveringElement.name} ${
    hoveringElement.atom ? `(${hoveringElement.atom.name})` : ''
  }`

  return <HoverOverlay nodeId={hoveringElement.id} content={content} />
}

BuilderHoverOverlay.displayName = 'ElementBuilderHoverOverlay'
