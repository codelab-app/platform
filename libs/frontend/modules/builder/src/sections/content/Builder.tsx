import {
  BUILDER_CONTAINER_ID,
  DATA_ELEMENT_ID,
} from '@codelab/frontend/abstract/core'
import { Renderer, RendererProps } from '@codelab/frontend/modules/renderer'
import {
  IBuilderService,
  IElementService,
  IElementTree,
} from '@codelab/shared/abstract/core'
import styled from '@emotion/styled'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { ElementDropHandlers } from '../../dnd/ElementDropHandlers'
import { useBuilderHotkeys, useBuilderHoverHandlers } from '../../hooks'
import { useBuilderRootClickHandler } from '../../hooks/useBuilderRootClickHandler'

type BuilderProps = {
  elementTree: IElementTree
} & Pick<
  IBuilderService,
  'set_hoveredNode' | 'currentDragData' | 'selectedNode' | 'set_selectedNode'
> &
  Pick<IElementService, 'deleteModal'> & {
    rendererProps: RendererProps
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
  }) => {
    const { handleMouseOver, handleMouseLeave } = useBuilderHoverHandlers({
      currentDragData,
      set_hoveredNode,
    })

    useBuilderHotkeys({
      selectedNode,
      set_selectedNode,
      deleteModal,
    })

    const handleContainerClick = useBuilderRootClickHandler()
    const elementsList = elementTree?.elementsList

    return (
      <StyledBuilderContainer
        id={BUILDER_CONTAINER_ID}
        key={elementTree?.id}
        onClick={handleContainerClick}
        onMouseLeave={handleMouseLeave}
        onMouseOver={handleMouseOver}
      >
        {/* TBC */}
        {/* {elementId ? <BuilderDropHandler elementId={elementId} /> : null} */}
        {elementsList ? (
          <ElementDropHandlers elementsList={elementsList} />
        ) : null}

        <Renderer renderRoot={rendererProps.renderRoot} />

        {/* <BuilderHoverOverlay /> */}
        {/* <BuilderClickOverlay /> */}
        {/* {children} */}
      </StyledBuilderContainer>
    )
  },
)

Builder.displayName = 'Builder'

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
  //max-height: 100%;
  overflow: scroll;
  border: 3px dotted rgba(0, 0, 0, 1);
  //margin-bottom: 400px;
  .ant-modal-mask,
  .ant-modal-wrap {
    position: absolute;
    z-index: 10;
  }
`

StyledBuilderContainer.displayName = 'StyledBuilderContainer'
