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
import { BuilderDropHandler } from './dnd/BuilderDropHandler'
import { ElementDropHandlers } from './dnd/ElementDropHandlers'
import { useBuilderHotkeys, useBuilderHoverHandlers } from './hooks'
import { useBuilderRootClickHandler } from './hooks/useBuilderRootClickHandler'

type BuilderProps = {
  elementTree: IElementTree
} & Pick<
  IBuilderService,
  | 'setHoveredElement'
  | 'currentDragData'
  | 'set_selectedElement'
  | 'selectedElement'
> &
  Pick<IElementService, 'deleteModal'>

export const Builder = observer<BuilderProps>(
  ({
    currentDragData,
    setHoveredElement,
    set_selectedElement,
    selectedElement,
    elementTree,
    deleteModal,
  }) => {
    console.log('Builder', elementTree)

    const { handleMouseOver, handleMouseLeave } = useBuilderHoverHandlers({
      currentDragData: currentDragData,
      setHoveredElement: setHoveredElement,
    })

    useBuilderHotkeys({
      selectedElement,
      set_selectedElement,
      deleteModal,
    })

    const handleContainerClick = useBuilderRootClickHandler({
      set_selectedElement,
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

        {/* <Renderer renderService={builderService.builderRenderer} /> */}

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
  .ant-modal-mask,
  .ant-modal-wrap {
    position: absolute;
    z-index: 10;
  }
`

StyledBuilderContainer.displayName = 'StyledBuilderContainer'
