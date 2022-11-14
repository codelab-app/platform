import {
  BUILDER_CONTAINER_ID,
  DATA_ELEMENT_ID,
  IBuilderService,
  IElementService,
  IElementTree,
} from '@codelab/frontend/abstract/core'
import { Renderer, RendererRoot } from '@codelab/frontend/domain/renderer'
import styled from '@emotion/styled'
import { motion } from 'framer-motion'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import tw from 'twin.macro'
import { useBuilderHotkeys, useBuilderHoverHandlers } from '../../hooks'
import { useBuilderResize } from '../../hooks/useBuilderResize'
import { useBuilderRootClickHandler } from '../../hooks/useBuilderRootClickHandler'

type BuilderProps = {
  elementTree: IElementTree
  builderTabsWidth?: number
} & Pick<
  IBuilderService,
  | 'set_hoveredNode'
  | 'currentDragData'
  | 'selectedNode'
  | 'set_selectedNode'
  | 'mainContentWidth'
  | 'setMainContentWidth'
  | 'setMainResizingContentWidth'
  | 'setResizingMainContent'
> &
  Pick<IElementService, 'deleteModal'> & {
    rendererProps: RendererRoot
  }
/**
 * Generic builder used for both Component & Element
 */

export const Builder = observer<BuilderProps>(
  ({
    currentDragData,
    set_hoveredNode,
    selectedNode,
    elementTree,
    deleteModal,
    set_selectedNode,
    rendererProps,
    mainContentWidth,
    setMainContentWidth,
    setMainResizingContentWidth,
    setResizingMainContent,
    builderTabsWidth,
  }) => {
    const { handleMouseOver, handleMouseLeave } = useBuilderHoverHandlers({
      currentDragData,
      set_hoveredNode,
    })

    const builderResizable = useBuilderResize({
      width: {
        default: mainContentWidth ? mainContentWidth : builderTabsWidth,
        min: 100,
        max: builderTabsWidth,
      },
      setResizingMainContent,
      setMainResizingContentWidth,
      setMainContentWidth,
    })

    useBuilderHotkeys({
      selectedNode,
      set_selectedNode,
      deleteModal,
    })

    const handleContainerClick = useBuilderRootClickHandler()

    useEffect(() => {
      return setResizingMainContent(false)
    }, [])

    return (
      <StyledBuilderResizeContainer
        css={tw`h-full z-10 flex flex-row`}
        style={{
          ...builderResizable.containerProps.style,
          margin: 'auto',
        }}
      >
        <motion.div
          css={[tw`absolute right-0 bg-transparent h-full z-10`, `width: 2px`]}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...builderResizable.xDragHandleProps}
        />
        <StyledBuilderContainer
          id={BUILDER_CONTAINER_ID}
          key={elementTree.id}
          onClick={handleContainerClick}
          onMouseLeave={handleMouseLeave}
          onMouseOver={handleMouseOver}
        >
          <Renderer renderRoot={rendererProps.renderRoot} />

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
  overflow: scroll;
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
  .ant-modal-mask,
  .ant-modal-wrap {
    position: absolute;
    z-index: 10;
  }
`

StyledBuilderContainer.displayName = 'StyledBuilderContainer'
