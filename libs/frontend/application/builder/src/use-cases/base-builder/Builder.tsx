'use client'

import {
  BUILDER_CONTAINER_ID,
  DATA_ELEMENT_ID,
} from '@codelab/frontend/abstract/domain'
import { useApplicationStore } from '@codelab/frontend/infra/mobx'
import { useDeleteElementModal } from '@codelab/frontend-application-element/use-cases/delete-element'
import { RootRenderer } from '@codelab/frontend-application-renderer/components'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useBuilderHotkeys } from '../../hooks/useBuilderHotkeys.hook'
import { useBuilderService } from '../../services'
import { BuilderClickOverlay } from './BuilderClickOverlay'
import { BuilderHoverOverlay } from './BuilderHoverOverlay'
import { BuilderResizeHandle } from './BuilderResizeHandle'

/**
 * Generic builder used for both Component & Element
 */
export const Builder = observer(() => {
  const { rendererService } = useApplicationStore()
  const builderService = useBuilderService()
  const deleteElementModal = useDeleteElementModal()
  const renderer = rendererService.activeRenderer?.current
  const elementTree = rendererService.activeElementTree
  const { selectedNode } = builderService
  const containerRef = useRef<HTMLDivElement>(null)
  const ref = useRef<HTMLDivElement>(null)

  useBuilderHotkeys({
    deleteModal: deleteElementModal,
    selectedNode,
    setSelectedNode: builderService.setSelectedNode.bind(builderService),
  })

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

    return () => {
      resizeObserver.disconnect()
    }
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
          <RootRenderer ref={ref} renderer={renderer} />
          <BuilderClickOverlay renderContainerRef={ref} />
          <BuilderHoverOverlay renderContainerRef={ref} />
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
  border: 2px dotted rgba(170, 170, 170);
  padding: 2px;
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
