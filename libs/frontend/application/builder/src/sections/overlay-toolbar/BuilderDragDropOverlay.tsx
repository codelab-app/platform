import type {
  IBuilderService,
  IElementService,
} from '@codelab/frontend/abstract/application'
import { queryRenderedElementById } from '@codelab/frontend/application/renderer'
import { DragDropOverlay } from '@codelab/frontend/presentation/view'
import { isServer } from '@codelab/shared/utils'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { createPortal } from 'react-dom'

export const BuilderDragDropOverlay = observer<{
  builderService: IBuilderService
  elementService: IElementService
  renderContainerRef: React.MutableRefObject<HTMLElement | null>
}>(({ builderService, renderContainerRef }) => {
  const dropTargetId = builderService.dragHoverContext?.dropTargetId
  const dragPosition = builderService.dragHoverContext?.dragPosition

  if (isServer || !dropTargetId) {
    return null
  }

  const element = queryRenderedElementById(dropTargetId ?? '')

  if (!element || !renderContainerRef.current) {
    return null
  }

  return createPortal(
    <DragDropOverlay
      element={element}
      position={dragPosition}
      renderContainer={renderContainerRef.current}
    />,
    renderContainerRef.current,
  )
})

BuilderDragDropOverlay.displayName = 'BuilderDragDropOverlay'
