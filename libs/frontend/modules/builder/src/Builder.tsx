import {
  ElementTreeGraphql,
  isElement,
} from '@codelab/frontend/modules/element'
import styled from '@emotion/styled'
import React, { MouseEventHandler, useCallback } from 'react'
import tw from 'twin.macro'
import {
  useBuilder,
  useBuilderExtraProps,
  useOnRendered,
} from './containers/builderState'
import { useBuilderHandlers } from './containers/useBuilderHandlers'
import { BuilderClickOverlay, BuilderHoverOverlay } from './overlay-toolbar'
import { Renderer } from './renderer'

export type BuilderProps = {
  tree: ElementTreeGraphql
}

const StyledBuilderContainer = styled.div`
  // [data-id] is a selector for all rendered elements
  [data-id]:hover {
    cursor: pointer;
  }

  [data-id] {
    // Force all pointer events to be on, because otherwise we won't be able to click to inspect
    // elements that have it disabled by design, like disabled buttons
    pointer-events: all !important;
  }

  position: relative;
  max-height: 100%;
`

const StyledBuilderInnerContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
`

const BuilderRenderer = ({ tree }: { tree: ElementTreeGraphql }) => {
  const { handleMouseEnter, handleMouseLeave } = useBuilderHandlers(tree)
  const { onRendered } = useOnRendered()
  const extraProps = useBuilderExtraProps()
  const voidClick = useCallback(() => void 0, [])

  return (
    <Renderer
      tree={tree}
      context={{
        onRendered,
        extraElementProps: extraProps,
        extraProps: {
          onMouseEnter: handleMouseEnter,
          onMouseLeave: handleMouseLeave,
          onClick: voidClick,
        },
      }}
    />
  )
}

/**
 * Wraps around {@link Renderer} to provide element-building functionality
 */
export const Builder = ({
  children,
  tree,
}: React.PropsWithChildren<BuilderProps>) => {
  // TODO: Deal with context mapping
  const { resetSelection, setSelectedElement } = useBuilder()

  const handleContainerClick: MouseEventHandler<HTMLDivElement> = (e) => {
    // Handle the click-to-select element here, because if we handled it at the react element props level, we won't
    // be able to capture clicks on elements like disabled antd buttons and other ones that are designed not to emit clicks

    // Go up the dom tree to find a element with a node id
    const visit = (element: HTMLElement) => {
      const nodeId = element.dataset?.id
      // Don't allow selection of elements withing a componentId
      const componentId = element.dataset?.componentId

      if (nodeId && !componentId) {
        setSelectedElement(tree.getVertex(nodeId, isElement))
        e.stopPropagation()
      } else if (element.parentElement && element.id !== 'Builder') {
        // Unless we've reached the top element, or if the next parent is the Builder container, visit the parent
        visit(element.parentElement)
      } else {
        resetSelection()
      }
    }

    visit(e.target as HTMLElement)
  }

  return (
    <StyledBuilderContainer
      onClick={handleContainerClick}
      id="Builder"
      css={tw`relative w-full h-full`}
    >
      <StyledBuilderInnerContainer>
        <BuilderRenderer tree={tree} />
        <BuilderHoverOverlay />
        <BuilderClickOverlay />
        {children}
      </StyledBuilderInnerContainer>
    </StyledBuilderContainer>
  )
}
