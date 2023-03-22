import { PauseOutlined } from '@ant-design/icons'
import type {
  IBuilderService,
  IElementService,
  IElementTree,
} from '@codelab/frontend/abstract/core'
import {
  BUILDER_CONTAINER_ID,
  DATA_ELEMENT_ID,
  DragPosition,
} from '@codelab/frontend/abstract/core'
import type { RendererRoot } from '@codelab/frontend/domain/renderer'
import {
  makeDropIndicatorStyle,
  Renderer,
} from '@codelab/frontend/domain/renderer'
import { useDroppable } from '@dnd-kit/core'
import styled from '@emotion/styled'
import { motion } from 'framer-motion'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { useBuilderHotkeys, useBuilderHoverHandlers } from '../../hooks'
import { useBuilderResize } from '../../hooks/useBuilderResize'
import { useBuilderRootClickHandler } from '../../hooks/useBuilderRootClickHandler'

type BuilderProps = Pick<
  IBuilderService,
  | 'currentBuilderWidth'
  | 'currentDragData'
  | 'selectedBuilderWidth'
  | 'selectedNode'
  | 'setCurrentBuilderWidth'
  | 'setHoveredNode'
  | 'setSelectedNode'
> &
  Pick<IElementService, 'deleteModal'> & {
    elementTree: IElementTree
  } & {
    rendererProps: RendererRoot
  }
/**
 * Generic builder used for both Component & Element
 */

export const Builder = observer<BuilderProps>(
  ({
    currentBuilderWidth: mainContentWidth,
    currentDragData,
    deleteModal,
    elementTree,
    rendererProps,
    selectedBuilderWidth: selectedMainContentWidth,
    selectedNode,
    setCurrentBuilderWidth,
    setHoveredNode,
    setSelectedNode,
  }) => {
    console.log(elementTree)

    // to render the body of the app, the root is required
    if (!elementTree.root) {
      return null
    }

    const { handleMouseLeave, handleMouseOver } = useBuilderHoverHandlers({
      currentDragData,
      setHoveredNode,
    })

    const builderResizable = useBuilderResize({
      selectedWidth: selectedMainContentWidth,
      setCurrentBuilderWidth,
      width: mainContentWidth,
    })

    const { isOver, over, setNodeRef } = useDroppable({
      id: elementTree.root.id,
    })

    useBuilderHotkeys({
      deleteModal,
      selectedNode,
      setSelectedNode,
    })

    const handleContainerClick = useBuilderRootClickHandler()

    if (isOver && over) {
      over.data.current = {
        ...over.data.current,
        dragPosition: DragPosition.Inside,
      }
    }

    const rootStyle = isOver
      ? makeDropIndicatorStyle(DragPosition.Inside, {
          backgroundColor: 'rgba(0, 255, 255, 0.2)',
        })
      : {}

    return (
      <StyledBuilderResizeContainer
        css={tw`h-full z-10 flex flex-row`}
        style={{
          ...builderResizable.containerProps.style,
          margin: 'auto',
        }}
      >
        <div
          css={[
            tw`absolute -right-[14px] bg-transparent h-full w-[17px] z-10 `,
          ]}
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
          <Renderer
            ref={setNodeRef}
            renderRoot={rendererProps.renderRoot}
            style={rootStyle}
          />

          {/* <BuilderHoverOverlay /> */}
          {/* <BuilderClickOverlay /> */}
          {/* {children} */}
        </StyledBuilderContainer>
      </StyledBuilderResizeContainer>
    )
  },
)

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
