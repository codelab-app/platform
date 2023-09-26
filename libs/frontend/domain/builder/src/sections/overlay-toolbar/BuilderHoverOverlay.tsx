import type {
  IBuilderService,
  IElementService,
} from '@codelab/frontend/abstract/core'
import { isElementRef } from '@codelab/frontend/abstract/core'
import { queryRenderedElementById } from '@codelab/frontend/domain/renderer'
import { HoverOverlay } from '@codelab/frontend/presentation/view'
import { isServer } from '@codelab/shared/utils'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { createPortal } from 'react-dom'

export const BuilderHoverOverlay = observer<{
  builderService: IBuilderService
  elementService: IElementService
  renderContainerRef: React.MutableRefObject<HTMLElement | null>
}>(({ builderService, elementService, renderContainerRef }) => {
  const hoveredNode = builderService.hoveredNode

  if (isServer || !hoveredNode || !isElementRef(hoveredNode)) {
    return null
  }

  const element = queryRenderedElementById(hoveredNode.id)

  if (!element || !renderContainerRef.current) {
    return null
  }

  return createPortal(
    <HoverOverlay
      element={element}
      renderContainer={renderContainerRef.current}
    />,
    renderContainerRef.current,
  )
})

BuilderHoverOverlay.displayName = 'BuilderClickOverlay'
