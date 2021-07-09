import { refetchGetPageQuery } from '@codelab/codegen/graphql'
import { NodeRenderer } from '@codelab/frontend/builder'
import { CytoscapeService } from '@codelab/frontend/cytoscape'
import { DeleteElementModal } from '@codelab/modules/element'
import styled from '@emotion/styled'
import { Core } from 'cytoscape'
import React, { MouseEventHandler, useContext } from 'react'
import tw from 'twin.macro'
import { PageContext } from '../providers'
import { PageBuilderClickAdapter } from './PageBuilderClickAdapter'
import { PageBuilderHoverAdapter } from './PageBuilderHoverAdapter'
import { useSetPageBuilderState } from './pageBuilderState'
import { usePageElementRenderHandlers } from './usePageElementRenderHandlers'

export interface PageRendererProps {
  cy: Core
}

const StyledPageBuilder = styled.div`
  // [data-id] is a selector for all rendered elements
  [data-id]:hover {
    cursor: pointer;
  }

  [data-id] {
    // Force all pointer events to be on, because otherwise we won't be able to click to inspect
    // elements that have it disabled by design, like disabled buttons
    pointer-events: all !important;
  }
`

export const PageBuilder = ({ cy }: PageRendererProps) => {
  const root = CytoscapeService.componentTree(cy)
  const { handleClick, ...handlers } = usePageElementRenderHandlers(cy)
  const { reset } = useSetPageBuilderState()
  const { pageId } = useContext(PageContext)

  if (!pageId) {
    throw new Error('PageContext is needed for PageBuilder')
  }

  const handleContainerClick: MouseEventHandler<HTMLDivElement> = (e) => {
    // Handle the click-to-select element here, because if we handled it at the react element props level, we won't
    // be able to capture clicks on elements like disabled antd buttons and other ones that are designed not to emit clicks

    // Go up the dom tree to find a element with a node id
    const visit = (element: HTMLElement) => {
      const nodeId = element.dataset?.id

      if (nodeId) {
        handleClick(nodeId)
        e.stopPropagation()
      } else if (element.parentElement && element.id !== 'Builder') {
        // Unless we've reached the top element, or if the next parent is the Builder container, visit the parent
        visit(element.parentElement)
      } else {
        reset()
      }
    }

    visit(e.target as HTMLElement)
  }

  return (
    <StyledPageBuilder
      onClick={handleContainerClick}
      id="Builder"
      css={tw`relative w-full h-full`}
    >
      <NodeRenderer
        node={root}
        context={{
          handlers,
          // Remove the onClick props from all nodes, since we want to handle onClick with our handler - which will select the element in the builder
          nodePropsMapper: ({ onClick, ...props }) => {
            return props
          },
        }}
      />
      <PageBuilderHoverAdapter />
      <PageBuilderClickAdapter />
      <DeleteElementModal
        formProps={{
          refetchQueries: [refetchGetPageQuery({ input: { pageId } })],
        }}
      />
    </StyledPageBuilder>
  )
}
