import type { IElementService } from '@codelab/frontend/abstract/application'
import type { IBuilderDomainService } from '@codelab/frontend/abstract/domain'
import { isElementRef } from '@codelab/frontend/abstract/domain'
import { queryRenderedElementById } from '@codelab/frontend/application/renderer'
import { isServer } from '@codelab/shared/utils'
import { observer } from 'mobx-react-lite'
import type React from 'react'
import { createPortal } from 'react-dom'

export const BuilderDragDropOverlay = observer<{
  builderService: IBuilderDomainService
  elementService: IElementService
  renderContainerRef: React.MutableRefObject<HTMLElement | null>
}>(({ builderService, renderContainerRef }) => {
  // const dragDropData = builderService.dragDropData

  // if (isServer || !dragDropData?.node || !isElementRef(dragDropData.node)) {
  //   return null
  // }

  // const element = queryRenderedElementById(dragDropData.node.id)

  // if (!element || !renderContainerRef.current) {
  //   return null
  // }

  // return createPortal(
  //   <DragDropOverlay
  //     dropPosition={dragDropData.dropPosition}
  //     element={element}
  //     renderContainer={renderContainerRef.current}
  //   />,
  //   renderContainerRef.current,
  // )
  return null
})

BuilderDragDropOverlay.displayName = 'BuilderDragDropOverlay'
