import { isRuntimeElementRef } from '@codelab/frontend/abstract/application'
import { useStore } from '@codelab/frontend-application-shared-store/provider'
import {
  HoverOverlay,
  MarginPaddingOverlay,
} from '@codelab/frontend-presentation-view/components/overlay'
import { isServer } from '@codelab/shared/utils'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { createPortal } from 'react-dom'
import { queryRenderedElementById } from '../../utils/query-rendered-element-by-id'

export const BuilderHoverOverlay = observer<{
  renderContainerRef: React.MutableRefObject<HTMLElement | null>
}>(({ renderContainerRef }) => {
  const { builderService } = useStore()
  const hoveredNode = builderService.hoveredNode
  const selectedNode = builderService.selectedNode

  if (isServer || !hoveredNode || !isRuntimeElementRef(hoveredNode)) {
    return null
  }

  const element = queryRenderedElementById(hoveredNode.current.element.id)

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
