import type {
  IBuilderService,
  IElementService,
} from '@codelab/frontend/abstract/application'
import { isElementRef } from '@codelab/frontend/abstract/domain'
import { queryRenderedElementById } from '@codelab/frontend/application/renderer'
import { DragDropOverlay } from '@codelab/frontend/presentation/view'
import { isServer } from '@codelab/shared/utils'
import { getSnapshot } from 'mobx-keystone'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { createPortal } from 'react-dom'

export const BuilderDragDropOverlay = observer<{
  builderService: IBuilderService
  elementService: IElementService
  renderContainerRef: React.MutableRefObject<HTMLElement | null>
}>(({ builderService, renderContainerRef }) => {
  const dragOverlayData = builderService.dragHoverContext?.overlayData

  if (isServer || !dragOverlayData?.elementId) {
    return null
  }

  const element = queryRenderedElementById(dragOverlayData.elementId)

  if (!element || !renderContainerRef.current) {
    return null
  }

  return createPortal(
    <DragDropOverlay
      element={element}
      position={dragOverlayData.position}
      renderContainer={renderContainerRef.current}
    />,
    renderContainerRef.current,
  )
})

BuilderDragDropOverlay.displayName = 'BuilderDragDropOverlay'
