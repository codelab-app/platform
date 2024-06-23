import {
  isRuntimeComponentRef,
  isRuntimeElementRef,
} from '@codelab/frontend/abstract/application'
import { isElementRef } from '@codelab/frontend/abstract/domain'
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

export const BuilderHoverOverlay = observer<{
  renderContainerRef: React.MutableRefObject<HTMLElement | null>
}>(({ renderContainerRef }) => {
  const { builderService } = useStore()
  const runtimeHoveredNode = builderService.hoveredNode
  const runtimeSelectedNode = builderService.selectedNode

  const hoveredNode = !runtimeHoveredNode
    ? null
    : isRuntimeElementRef(runtimeHoveredNode)
    ? runtimeHoveredNode.current.element
    : isRuntimeComponentRef(runtimeHoveredNode)
    ? runtimeHoveredNode.current.component
    : null

  const selectedNode = !runtimeSelectedNode
    ? null
    : isRuntimeElementRef(runtimeSelectedNode)
    ? runtimeSelectedNode.current.element
    : isRuntimeComponentRef(runtimeSelectedNode)
    ? runtimeSelectedNode.current.component
    : null

  const renderContainer = renderContainerRef.current

  const boundingRect = useVirtualBoundingRect({
    activeNode: hoveredNode,
    activeRuntimeNode: runtimeHoveredNode,
    renderContainer,
  })

  if (
    isServer ||
    !hoveredNode ||
    !isElementRef(hoveredNode) ||
    !renderContainer ||
    hoveredNode.current.id === selectedNode?.current.id ||
    !boundingRect
  ) {
    return null
  }

  const htmlElement = queryRenderedElementById(hoveredNode.id)
  const parentElement = hoveredNode.current.closestConcreteParent?.current

  const parentHtmlElement =
    parentElement && queryRenderedElementById(parentElement.id)

  return createPortal(
    <>
      <ElementOverlay
        parentContainer={parentHtmlElement}
        rootContainer={renderContainer}
        targetBoundingRect={boundingRect}
        toolbar={{
          title: hoveredNode.current.name,
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

BuilderHoverOverlay.displayName = 'BuilderHoverOverlay'
