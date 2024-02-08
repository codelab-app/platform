import type {
  IComponentApplicationService,
  IElementService,
} from '@codelab/frontend/abstract/application'
import type { IBuilderDomainService } from '@codelab/frontend/abstract/domain'
import { isElementRef } from '@codelab/frontend/abstract/domain'
import { ElementOverlay } from '@codelab/frontend/presentation/view'
import { isServer } from '@codelab/shared/utils'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { createPortal } from 'react-dom'
import { queryRenderedElementById } from '../../utils'
import { useVirtualBoundingRect } from './hooks/use-virtual-bounding-rect'

export const BuilderClickOverlay = observer<{
  builderService: IBuilderDomainService
  elementService: IElementService
  componentService: IComponentApplicationService
  renderContainerRef: React.MutableRefObject<HTMLElement | null>
}>(
  ({
    builderService,
    componentService,
    elementService,
    renderContainerRef,
  }) => {
    const selectedNode = builderService.selectedNode
    const renderContainer = renderContainerRef.current

    const boundingRect = useVirtualBoundingRect({
      activeNode: selectedNode,
      renderContainer,
    })

    if (
      renderContainerRef.current === null ||
      isServer ||
      !selectedNode ||
      !isElementRef(selectedNode) ||
      !boundingRect
    ) {
      return null
    }

    const parentElement = selectedNode.current.closestConcreteParent?.current

    const parentHtmlElement =
      parentElement && queryRenderedElementById(parentElement.id)

    return createPortal(
      <ElementOverlay
        autoScroll
        parentContainer={parentHtmlElement}
        rootContainer={renderContainerRef.current}
        targetBoundingRect={boundingRect}
        toolbar={{
          draggable: {
            id: selectedNode.current.id,
          },
          onDelete: (event) => {
            event.stopPropagation()

            if (isElementRef(selectedNode)) {
              elementService.deleteModal.open(selectedNode)
            } else {
              componentService.deleteModal.open(selectedNode)
            }
          },
          title: selectedNode.current.name,
        }}
      />,
      renderContainerRef.current,
    )
  },
)

BuilderClickOverlay.displayName = 'BuilderClickOverlay'
