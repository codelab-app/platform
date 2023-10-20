import type {
  IBuilderService,
  IElementService,
} from '@codelab/frontend/abstract/application'
import { isElementRef } from '@codelab/frontend/abstract/domain'
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
  const dragDropData = builderService.dragDropData

  if (isServer || !dragDropData?.node || !isElementRef(dragDropData.node)) {
    return null
  }

  const element = queryRenderedElementById(dragDropData.node.id)

  if (!element || !renderContainerRef.current) {
    return null
  }

  return createPortal(
    <DragDropOverlay
      dropPosition={dragDropData.dropPosition}
      element={element}
      renderContainer={renderContainerRef.current}
    />,
    renderContainerRef.current,
  )
})

BuilderDragDropOverlay.displayName = 'BuilderDragDropOverlay'
