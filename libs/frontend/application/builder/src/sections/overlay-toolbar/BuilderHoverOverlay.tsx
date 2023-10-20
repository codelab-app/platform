import type {
  IBuilderService,
  IElementService,
} from '@codelab/frontend/abstract/application'
import { isElementRef } from '@codelab/frontend/abstract/domain'
import { queryRenderedElementById } from '@codelab/frontend/application/renderer'
import {
  HoverOverlay,
  MarginPaddingOverlay,
} from '@codelab/frontend/presentation/view'
import { isServer } from '@codelab/shared/utils'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { createPortal } from 'react-dom'

export const BuilderHoverOverlay = observer<{
  builderService: IBuilderService
  elementService: IElementService
  renderContainerRef: React.MutableRefObject<HTMLElement | null>
}>(({ builderService, renderContainerRef }) => {
  const hoveredNode = builderService.hoveredNode
  const selectedNode = builderService.selectedNode

  if (isServer || !hoveredNode || !isElementRef(hoveredNode)) {
    return null
  }

  const element = queryRenderedElementById(hoveredNode.id)

  if (
    !element ||
    !renderContainerRef.current ||
    hoveredNode.id === selectedNode?.id
  ) {
    return null
  }

  return createPortal(
    <>
      {hoveredNode.id !== selectedNode?.id && (
        <HoverOverlay
          element={element}
          renderContainer={renderContainerRef.current}
        />
      )}
      <MarginPaddingOverlay
        element={element}
        renderContainer={renderContainerRef.current}
      />
    </>,
    renderContainerRef.current,
  )
})

BuilderHoverOverlay.displayName = 'BuilderHoverOverlay'
