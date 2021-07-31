import { HoverOverlay } from '@codelab/frontend/builder'
import React from 'react'
import { usePageBuilderState } from './pageBuilderState'

export const PageBuilderHoverAdapter = () => {
  const {
    state: { hoveringPageElement },
  } = usePageBuilderState()

  if (!hoveringPageElement) {
    return null
  }

  const content = `${hoveringPageElement.name} ${
    hoveringPageElement.atom ? `(${hoveringPageElement.atom.name})` : ''
  }`

  return <HoverOverlay nodeId={hoveringPageElement.id} content={content} />
}

PageBuilderHoverAdapter.displayName = 'PageBuilderHoverAdapter'
