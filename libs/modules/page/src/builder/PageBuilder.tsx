import { NodeRenderer } from '@codelab/frontend/builder'
import { CytoscapeService } from '@codelab/frontend/cytoscape'
import styled from '@emotion/styled'
import { Core } from 'cytoscape'
import React from 'react'
import { DeletePageElementModal } from '../pageElement'
import { PageBuilderClickAdapter } from './PageBuilderClickAdapter'
import { PageBuilderHoverAdapter } from './PageBuilderHoverAdapter'
import { usePageElementRenderHandlers } from './usePageElementRenderHandlers'

export interface PageRendererProps {
  cy: Core
}

const StyledPageBuilder = styled.div`
  [data-id]:hover {
    cursor: pointer;
  }
`

export const PageBuilder = ({ cy }: PageRendererProps) => {
  const root = CytoscapeService.componentTree(cy)
  const handlers = usePageElementRenderHandlers(cy)

  return (
    <div>
      <StyledPageBuilder>
        <NodeRenderer node={root} context={{ handlers }} />
        <PageBuilderHoverAdapter />
        <PageBuilderClickAdapter />
        <DeletePageElementModal />
      </StyledPageBuilder>
    </div>
  )
}
