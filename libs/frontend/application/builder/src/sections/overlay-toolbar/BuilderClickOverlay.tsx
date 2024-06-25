import {
  isRuntimeComponentRef,
  isRuntimeElementRef,
} from '@codelab/frontend/abstract/application'
import { elementRef, isElementRef } from '@codelab/frontend/abstract/domain'
import { useStore } from '@codelab/frontend/application/shared/store'
import {
  ElementOverlay,
  MarginPaddingOverlay,
} from '@codelab/frontend/presentation/view'
import { isServer } from '@codelab/shared/utils'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { createPortal } from 'react-dom'
import { queryRenderedElementById } from '../../utils'
import { useVirtualBoundingRect } from './hooks/use-virtual-bounding-rect'

export const BuilderClickOverlay = observer<{
  renderContainerRef: React.MutableRefObject<HTMLElement | null>
}>(({ renderContainerRef }) => {
  const { builderService, componentService, elementService } = useStore()
  const runtimeSelectedNode = builderService.selectedNode

  const selectedNode = !runtimeSelectedNode
    ? null
    : isRuntimeElementRef(runtimeSelectedNode)
    ? runtimeSelectedNode.current.element
    : isRuntimeComponentRef(runtimeSelectedNode)
    ? runtimeSelectedNode.current.component
    : null

  const renderContainer = renderContainerRef.current

  const boundingRect = useVirtualBoundingRect({
    activeNode: selectedNode,
    activeRuntimeNode: runtimeSelectedNode,
    renderContainer,
  })

  if (
    isServer ||
    !selectedNode ||
    !isElementRef(selectedNode) ||
    !renderContainer ||
    !boundingRect
  ) {
    return null
  }

  const htmlElement = queryRenderedElementById(selectedNode.id)
  const parentElement = selectedNode.current.closestConcreteParent?.current

  const parentHtmlElement =
    parentElement && queryRenderedElementById(parentElement.id)

  return createPortal(
    <>
      <ElementOverlay
        parentContainer={parentHtmlElement}
        rootContainer={renderContainer}
        targetBoundingRect={boundingRect}
        toolbar={{
          draggable: {
            id: selectedNode.current.id,
          },
          editText: {
            isTextEditable: selectedNode.current.isTextContentEditable,
            toggle: (event) => {
              event.stopPropagation()
              selectedNode.current.setIsTextContentEditable(
                !selectedNode.current.isTextContentEditable,
              )
            },
          },
          onDelete: (event) => {
            event.stopPropagation()

            if (isElementRef(selectedNode)) {
              elementService.deleteModal.open(elementRef(selectedNode.id))
            } else {
              componentService.deleteModal.open(selectedNode)
            }
          },
          title: selectedNode.current.name,
        }}
      />
      {htmlElement && (
        <MarginPaddingOverlay
          element={htmlElement}
          renderContainer={renderContainer}
        />
      )}
    </>,
    renderContainer,
  )
})

BuilderClickOverlay.displayName = 'BuilderClickOverlay'
