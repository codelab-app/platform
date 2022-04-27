import {
  BUILDER_SERVICE,
  DATA_ID,
  ELEMENT_SERVICE,
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
  WithServices<BUILDER_SERVICE | ELEMENT_SERVICE>
>(({ builderService, elementService }) => {
  const { handleMouseOver, handleMouseLeave } = useBuilderHoverHandlers(
    builderService,
    builderService.builderRenderer.tree,
  )

  useBuilderHotkeys(builderService, elementService)

  const handleContainerClick = useBuilderRootClickHandler(builderService)

  return (
    <StyledBuilderContainer
      id="Builder"
      key={builderService.builderRenderer.tree?.id}
      onClick={handleContainerClick}
      onMouseLeave={handleMouseLeave}
      onMouseOver={handleMouseOver}
    >
      <BuilderDropHandler builderService={builderService} />
      <ElementDropHandlers builderService={builderService} />

      <Renderer renderService={builderService.builderRenderer} />

      {/* <BuilderHoverOverlay /> */}
      {/* <BuilderClickOverlay /> */}
      {/* {children} */}
    </StyledBuilderContainer>
  )
})

const StyledBuilderContainer = styled.div`
  // [${DATA_ID}] is a selector for all rendered elements
  [${DATA_ID}]:hover {
    cursor: pointer;
  }
  [${DATA_ID}] {
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
