import {
  BUILDER_CONTAINER_ID,
  BUILDER_SERVICE,
  DATA_ELEMENT_ID,
  ELEMENT_SERVICE,
  USER_SERVICE,
  WithServices,
} from '@codelab/frontend/abstract/core'
import styled from '@emotion/styled'
import { observer } from 'mobx-react-lite'
import { BuilderDropHandler } from './dnd/BuilderDropHandler'
import { ElementDropHandlers } from './dnd/ElementDropHandlers'
import { useBuilderHotkeys, useBuilderHoverHandlers } from './hooks'
import { useBuilderRootClickHandler } from './hooks/useBuilderRootClickHandler'
import { Renderer } from './renderer'

export const Builder = observer<
  WithServices<BUILDER_SERVICE | ELEMENT_SERVICE | USER_SERVICE>
>(({ builderService, elementService, userService }) => {
  const { handleMouseOver, handleMouseLeave } = useBuilderHoverHandlers(
    builderService,
    builderService.builderRenderer.tree,
  )

  useBuilderHotkeys(builderService, elementService)

  const handleContainerClick = useBuilderRootClickHandler(builderService)

  return (
    <StyledBuilderContainer
      id={BUILDER_CONTAINER_ID}
      key={builderService.builderRenderer.tree?.id}
      onClick={handleContainerClick}
      onMouseLeave={handleMouseLeave}
      onMouseOver={handleMouseOver}
    >
      <BuilderDropHandler
        builderService={builderService}
        userService={userService}
      />
      <ElementDropHandlers builderService={builderService} />

      <Renderer renderService={builderService.builderRenderer} />

      {/* <BuilderHoverOverlay /> */}
      {/* <BuilderClickOverlay /> */}
      {/* {children} */}
    </StyledBuilderContainer>
  )
})

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
