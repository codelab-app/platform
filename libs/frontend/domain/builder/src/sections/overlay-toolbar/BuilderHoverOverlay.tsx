import { IBuilderService, isElement } from '@codelab/frontend/abstract/core'
import { queryRenderedElementById } from '@codelab/frontend/domain/renderer'
import { HoverOverlay } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'

export const BuilderHoverOverlay = observer<{
  builderService: IBuilderService
}>(({ builderService }) => {
  const hoveredNode = builderService.hoveredNode

  if (!hoveredNode || !isElement(hoveredNode)) {
    return null
  }

  const content = `${hoveredNode.label} ${
    hoveredNode.atom?.current ? `(${hoveredNode.atom.current.name})` : ''
  }`

  return (
    <HoverOverlay
      content={content}
      getOverlayElement={queryRenderedElementById}
      nodeId={hoveredNode.id}
    />
  )
})

BuilderHoverOverlay.displayName = 'ElementBuilderHoverOverlay'
