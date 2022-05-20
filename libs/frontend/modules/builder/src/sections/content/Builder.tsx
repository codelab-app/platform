import {
  BUILDER_CONTAINER_ID,
  DATA_ELEMENT_ID,
} from '@codelab/frontend/abstract/core'
import {
  IBuilderService,
  IElementService,
  IElementTree,
} from '@codelab/shared/abstract/core'
import styled from '@emotion/styled'
import { observer } from 'mobx-react-lite'
import { BuilderDropHandler } from '../../dnd/BuilderDropHandler'
import { ElementDropHandlers } from '../../dnd/ElementDropHandlers'
import { useBuilderHotkeys, useBuilderHoverHandlers } from '../../hooks'
import { useBuilderRootClickHandler } from '../../hooks/useBuilderRootClickHandler'
import { Renderer, RendererProps } from '../../renderer'

type BuilderProps = {
  elementTree: IElementTree
} & Pick<
  IBuilderService,
  | 'setHoveredElement'
  | 'currentDragData'
  | 'selectedElement'
  | 'setSelectedTreeNode'
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
    setHoveredElement,
    setSelectedTreeNode,
    selectedElement,
    elementTree,
    deleteModal,
    rendererProps,
  }) => {
    const { handleMouseOver, handleMouseLeave } = useBuilderHoverHandlers({
      currentDragData: currentDragData,
      setHoveredElement: setHoveredElement,
    })

    useBuilderHotkeys({
      selectedElement,
      setSelectedTreeNode,
      deleteModal,
    })

    const handleContainerClick = useBuilderRootClickHandler({
      setSelectedTreeNode,
    })

    const elementId = elementTree?.root?.id
    const elementsList = elementTree?.elementsList

    return (
      <StyledBuilderContainer
        id={BUILDER_CONTAINER_ID}
        key={elementTree?.id}
        onClick={handleContainerClick}
        onMouseLeave={handleMouseLeave}
        onMouseOver={handleMouseOver}
      >
        {elementId ? <BuilderDropHandler elementId={elementId} /> : null}
        {elementsList ? (
          <ElementDropHandlers elementsList={elementsList} />
        ) : null}

        <Renderer
          isInitialized={rendererProps.isInitialized}
          renderRoot={rendererProps.renderRoot}
        />

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
  background: white;
  max-height: 100%;
  border: 3px dotted rgba(0, 0, 0, 1);
  margin-bottom: 400px;
  .ant-modal-mask,
  .ant-modal-wrap {
    position: absolute;
    z-index: 10;
  }
`

StyledBuilderContainer.displayName = 'StyledBuilderContainer'
