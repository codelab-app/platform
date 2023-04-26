import type { IBuilderService } from '@codelab/frontend/abstract/core'
import { isElementRef } from '@codelab/frontend/abstract/core'
import { queryRenderedElementById } from '@codelab/frontend/domain/renderer'
import { HoverOverlay } from '@codelab/frontend/view/components'
import styled from '@emotion/styled'
import { observer } from 'mobx-react-lite'
import React from 'react'

export const BuilderHoverOverlay = observer<{
  builderService: IBuilderService
}>(({ builderService }) => {
  const hoveredNode = builderService.hoveredNode

  if (!hoveredNode || !isElementRef(hoveredNode)) {
    return null
  }

  if (hoveredNode.current.id === builderService.selectedNode?.current.id) {
    return null
  }

  const StyledOverlayContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    max-height: 20px;
    justify-content: space-between;
    & > *:not(:last-child) {
      margin-right: 0.3rem;
    }

    .click-overlay-toolbar--button-group {
    }
  `

  const StyledSpan = styled.p`
    height: 20px;
    min-width: 50px;
    margin: 0;
    font-size: 15px;
    overflow: hidden;
    white-space: nowrap;
  `

  const content = (
    <StyledOverlayContainer className="click-overlay-toolbar">
      <StyledSpan>{hoveredNode.current.name}</StyledSpan>
    </StyledOverlayContainer>
  )

  return (
    <HoverOverlay
      content={content}
      getOverlayElement={queryRenderedElementById}
      nodeId={hoveredNode.id}
    />
  )
})

BuilderHoverOverlay.displayName = 'ElementBuilderHoverOverlay'
