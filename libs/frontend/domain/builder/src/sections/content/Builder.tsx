import {
  BUILDER_CONTAINER_ID,
  DATA_ELEMENT_ID,
  DragPosition,
} from '@codelab/frontend/abstract/core'
import {
  makeDropIndicatorStyle,
  Renderer,
} from '@codelab/frontend/domain/renderer'
import { useStore } from '@codelab/frontend/presentation/container'
import { useDroppable } from '@dnd-kit/core'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useMemo, useRef } from 'react'
import styled from 'styled-components'
import { useBuilderHotkeys } from '../../hooks'
import { BuilderClickOverlay } from '../overlay-toolbar/BuilderClickOverlay'
import { BuilderHoverOverlay } from '../overlay-toolbar/BuilderHoverOverlay'
import { BuilderResizeHandle } from './BuilderResizeHandle'

/**
 * Generic builder used for both Component & Element
 */
export const Builder = observer(() => {
  const { builderService, elementService, renderService } = useStore()
  const renderer = renderService.activeRenderer?.current
  const elementTree = builderService.activeElementTree
  const { selectedBuilderWidth, selectedNode } = builderService
  const containerRef = useRef<HTMLDivElement>(null)

  useBuilderHotkeys({
    deleteModal: elementService.deleteModal,
    selectedNode,
    setSelectedNode: builderService.setSelectedNode.bind(builderService),
  })

  const { isOver, node, over, setNodeRef } = useDroppable({
    id: elementTree?.rootElement.id ?? '',
  })

  if (isOver && over) {
    over.data.current = {
      ...over.data.current,
      dragPosition: DragPosition.Inside,
    }
  }

  const rootStyle = useMemo(
    () => ({
      container: 'root / inline-size',
      width: `${selectedBuilderWidth.default}px`,
      ...(isOver
        ? makeDropIndicatorStyle(DragPosition.Inside, {
            backgroundColor: 'rgba(0, 255, 255, 0.2)',
          })
        : {}),
    }),
    [isOver, selectedBuilderWidth.default],
  )

  useEffect(() => {
    if (!containerRef.current) {
      return
    }

    const resizeObserver = new ResizeObserver(() => {
      if (!containerRef.current) {
        return
      }

      builderService.setBuilderContainerWidth(containerRef.current.clientWidth)
    })

    resizeObserver.observe(containerRef.current)

    return () => resizeObserver.disconnect()
  }, [])

  if (!elementTree || !renderer) {
    return null
  }

  return (
    <StyledBuilderContainer ref={containerRef}>
      <BuilderResizeHandle>
        <StyledBuilderResizeContainer
          id={BUILDER_CONTAINER_ID}
          key={elementTree.id}
        >
          <Renderer ref={setNodeRef} renderer={renderer} style={rootStyle} />
          <BuilderClickOverlay
            builderService={builderService}
            elementService={elementService}
            renderContainerRef={node}
          />
          <BuilderHoverOverlay
            builderService={builderService}
            elementService={elementService}
            renderContainerRef={node}
          />
        </StyledBuilderResizeContainer>
      </BuilderResizeHandle>
    </StyledBuilderContainer>
  )
})

Builder.displayName = 'Builder'

const StyledBuilderResizeContainer = styled.div`
  position: relative;
  height: 100%;
  background: transparent;
  border: 3px dotted rgba(0, 0, 0, 1);
  overflow: scroll !important;
  box-sizing: border-box;
`

const StyledBuilderContainer = styled.div`
  // [${DATA_ELEMENT_ID}] is a selector for all rendered elements
  [${DATA_ELEMENT_ID}]:hover {
    cursor: pointer;
  }
  [${DATA_ELEMENT_ID}] {
    // Force all pointer events to be on, because otherwise we won't be able to click to inspect
    // elements that have it disabled by design, like disabled buttons
    pointer-events: all !important;
  }
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: transparent;
  overflow: scroll;
  .ant-modal-mask,
  .ant-modal-wrap {
    position: absolute;
    z-index: 10;
  }
`

StyledBuilderContainer.displayName = 'StyledBuilderContainer'
