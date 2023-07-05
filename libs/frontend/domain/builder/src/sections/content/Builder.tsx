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
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import type { ImperativePanelHandle } from 'react-resizable-panels'
import { Panel, PanelGroup } from 'react-resizable-panels'
import { useBuilderHotkeys } from '../../hooks'
import { BuilderClickOverlay } from '../overlay-toolbar/BuilderClickOverlay'
import ResizeHandle from './ResizeHandle'

/**
 * Generic builder used for both Component & Element
 */
export const Builder = observer(() => {
  const { builderService, elementService, renderService } = useStore()
  const renderer = renderService.activeRenderer?.current
  const elementTree = builderService.activeElementTree

  const { builderContainerWidth, selectedBuilderWidth, selectedNode } =
    builderService

  const containerRef = useRef<HTMLDivElement>(null)
  const resizableRef = useRef<ImperativePanelHandle>(null)

  useBuilderHotkeys({
    deleteModal: elementService.deleteModal,
    selectedNode,
    setSelectedNode: builderService.setSelectedNode.bind(builderService),
  })

  const { isOver, over, setNodeRef } = useDroppable({
    id: elementTree?.rootElement.id ?? '',
  })

  if (isOver && over) {
    over.data.current = {
      ...over.data.current,
      dragPosition: DragPosition.Inside,
    }
  }

  const rootStyle = useMemo(
    () =>
      isOver
        ? makeDropIndicatorStyle(DragPosition.Inside, {
            backgroundColor: 'rgba(0, 255, 255, 0.2)',
          })
        : {},
    [isOver],
  )

  const defaultSize = useMemo(() => {
    if (
      builderContainerWidth > 0 &&
      selectedBuilderWidth.default < builderContainerWidth
    ) {
      return (selectedBuilderWidth.default / builderContainerWidth) * 100
    }

    return 100
  }, [builderContainerWidth, selectedBuilderWidth])

  const minSize = useMemo(() => {
    if (
      builderContainerWidth > 0 &&
      selectedBuilderWidth.min < builderContainerWidth
    ) {
      return (selectedBuilderWidth.min / builderContainerWidth) * 100
    }

    return 0
  }, [builderContainerWidth, selectedBuilderWidth])

  const maxSize = useMemo(() => {
    if (
      builderContainerWidth > 0 &&
      selectedBuilderWidth.max < builderContainerWidth
    ) {
      return (selectedBuilderWidth.max / builderContainerWidth) * 100
    }

    return 100
  }, [builderContainerWidth, selectedBuilderWidth])

  const handleResize = useCallback((size: number) => {
    builderService.setCurrentBuilderWidth({
      ...builderService.selectedBuilderWidth,
      default: Math.round((size / 100) * builderContainerWidth),
    })
  }, [])

  useEffect(() => {
    if (containerRef.current) {
      builderService.setBuilderContainerWidth(containerRef.current.offsetWidth)
    }
  }, [containerRef.current])

  useEffect(() => {
    if (
      resizableRef.current &&
      builderContainerWidth > 0 &&
      selectedBuilderWidth.default < builderContainerWidth
    ) {
      resizableRef.current.resize(
        (selectedBuilderWidth.default / builderContainerWidth) * 100,
      )
    }
  }, [selectedBuilderWidth, builderContainerWidth])

  if (!elementTree || !renderer) {
    return null
  }

  return (
    <StyledBuilderContainer ref={containerRef}>
      <PanelGroup direction="horizontal" style={{ width: '100%' }}>
        <Panel collapsible={true} minSize={0} order={1}></Panel>
        <ResizeHandle />
        <StyledBuilderResizeContainer
          defaultSize={defaultSize}
          id={BUILDER_CONTAINER_ID}
          key={elementTree.id}
          maxSize={maxSize}
          minSize={minSize}
          onResize={handleResize}
          order={2}
          ref={resizableRef}
        >
          <Renderer ref={setNodeRef} renderer={renderer} style={rootStyle} />
          <BuilderClickOverlay
            builderService={builderService}
            elementService={elementService}
          />
        </StyledBuilderResizeContainer>
        <ResizeHandle />
        <Panel collapsible={true} minSize={0} order={3}></Panel>
      </PanelGroup>
    </StyledBuilderContainer>
  )
})

Builder.displayName = 'Builder'

const StyledBuilderResizeContainer = styled(Panel)`
  position: relative;
  height: 100%;
  background: transparent;
  border: 3px dotted rgba(0, 0, 0, 1);
  overflow: scroll !important;
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
