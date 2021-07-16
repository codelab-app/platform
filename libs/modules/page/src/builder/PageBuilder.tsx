import { refetchGetPageQuery } from '@codelab/codegen/graphql'
import { Renderer } from '@codelab/frontend/builder'
import { DeleteElementModal, ElementTree } from '@codelab/modules/element'
import styled from '@emotion/styled'
import React, { MouseEventHandler } from 'react'
import tw from 'twin.macro'
import { PageBuilderClickAdapter } from './PageBuilderClickAdapter'
import { PageBuilderHoverAdapter } from './PageBuilderHoverAdapter'
import { useSetPageBuilderState } from './pageBuilderState'
import { usePageElementRenderHandlers } from './usePageElementRenderHandlers'

export interface PageRendererProps {
  tree: ElementTree
  pageId: string
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

export const PageBuilder = ({ tree, pageId }: PageRendererProps) => {
  const { handleClick, ...handlers } = usePageElementRenderHandlers(tree)
  const { reset } = useSetPageBuilderState()

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
      <Renderer
        tree={tree}
        context={{
          extraProps: {
            onMouseEnter: handlers.handleMouseEnter,
            onMouseLeave: handlers.handleMouseLeave,
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
