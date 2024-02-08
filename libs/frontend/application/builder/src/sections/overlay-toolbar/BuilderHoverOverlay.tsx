import type { IElementService } from '@codelab/frontend/abstract/application'
import type { IBuilderDomainService } from '@codelab/frontend/abstract/domain'
import { isElementRef } from '@codelab/frontend/abstract/domain'
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
  builderService: IBuilderDomainService
  elementService: IElementService
  renderContainerRef: React.MutableRefObject<HTMLElement | null>
}>(({ builderService, renderContainerRef }) => {
  const hoveredNode = builderService.hoveredNode
  const selectedNode = builderService.selectedNode
  const renderContainer = renderContainerRef.current

  const boundingRect = useVirtualBoundingRect({
    activeNode: hoveredNode,
    renderContainer,
  })

  if (
    isServer ||
    !hoveredNode ||
    !isElementRef(hoveredNode) ||
    !renderContainer ||
    hoveredNode.id === selectedNode?.id ||
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
