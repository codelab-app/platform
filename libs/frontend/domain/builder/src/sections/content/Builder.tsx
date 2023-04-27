import { PauseOutlined } from '@ant-design/icons'
import {
  BUILDER_CONTAINER_ID,
  DATA_ELEMENT_ID,
  DragPosition,
} from '@codelab/frontend/abstract/core'
import {
  makeDropIndicatorStyle,
  Renderer,
} from '@codelab/frontend/domain/renderer'
import {
  useCurrentPageId,
  useStore,
} from '@codelab/frontend/presentation/container'
import { useDroppable } from '@dnd-kit/core'
import styled from '@emotion/styled'
import { motion } from 'framer-motion'
import { observer } from 'mobx-react-lite'
import React, { useMemo } from 'react'
import tw from 'twin.macro'
import { useBuilderHotkeys, useBuilderHoverHandlers } from '../../hooks'
import { useBuilderResize } from '../../hooks/useBuilderResize'
import { useBuilderRootClickHandler } from '../../hooks/useBuilderRootClickHandler'
import { BuilderClickOverlay } from '../overlay-toolbar/BuilderClickOverlay'

/**
 * Generic builder used for both Component & Element
 */
export const Builder = observer(() => {
  const { builderRenderService, builderService, elementService } = useStore()
  const pageId = useCurrentPageId()
  const activeComponentId = builderService.activeComponent?.id

  const renderer = builderRenderService.renderers.get(
    activeComponentId ?? pageId,
  )

  const elementTree = builderService.activeElementTree

  const {
    currentBuilderWidth,
    currentDragData,
    selectedBuilderWidth,
    selectedNode,
  } = builderService

  const { handleMouseLeave, handleMouseOver } = useBuilderHoverHandlers({
    currentDragData,
    setHoveredNode: builderService.setHoveredNode.bind(builderService),
  })

  const builderResizable = useBuilderResize({
    selectedWidth: selectedBuilderWidth,
    setCurrentBuilderWidth:
      builderService.setCurrentBuilderWidth.bind(builderService),
    width: currentBuilderWidth,
  })

  useBuilderHotkeys({
    deleteModal: elementService.deleteModal,
    selectedNode,
    setSelectedNode: builderService.setSelectedNode.bind(builderService),
  })

  const handleContainerClick = useBuilderRootClickHandler()

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

  if (!elementTree || !renderer) {
    return null
  }

  return (
    <StyledBuilderResizeContainer
      css={tw`h-full z-10 flex flex-row`}
      style={{
        ...builderResizable.containerProps.style,
        margin: 'auto',
      }}
    >
      <div
        css={[tw`absolute -right-[14px] bg-transparent h-full w-[17px] z-10 `]}
      >
        <motion.div
          css={[tw`absolute left-[3px] w-[3px] h-full`]}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...builderResizable.xDragHandleProps}
        />
        <motion.div
          css={[
            tw`absolute w-[14px] h-[40px] -right-[3px] top-[50%] bg-zinc-200 flex items-center justify-center opacity-70 rounded-r`,
          ]}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...builderResizable.xDragHandleProps}
        >
          <PauseOutlined />
        </motion.div>
      </div>
      <StyledBuilderContainer
        id={BUILDER_CONTAINER_ID}
        key={elementTree.id}
        onClick={handleContainerClick}
        onMouseLeave={handleMouseLeave}
        onMouseOver={handleMouseOver}
      >
        <Renderer ref={setNodeRef} renderer={renderer} style={rootStyle} />
        <BuilderClickOverlay
          builderService={builderService}
          elementService={elementService}
        />
      </StyledBuilderContainer>
    </StyledBuilderResizeContainer>
  )
})

Builder.displayName = 'Builder'

const StyledBuilderResizeContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 100%;
  background: transparent;
  //max-height: 100%;
  border: 3px dotted rgba(0, 0, 0, 1);
  //margin-bottom: 400px;
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
