import { __ComponentFragment } from '@codelab/codegen/hasura'
import { nodeRendererFactory } from '@codelab/frontend/builder'
import { CytoscapeService } from '@codelab/frontend/cytoscape'
import { usePageElementRenderHandlers } from '@codelab/modules/page'
import React from 'react'

type ComponentRendererProps = {
  component: __ComponentFragment
}

export const ComponentRenderer = ({ component }: ComponentRendererProps) => {
  const cy = CytoscapeService.fromComponent(component)
  const root = CytoscapeService.componentTree(cy)
  const handlers = usePageElementRenderHandlers(cy)

  return <>{nodeRendererFactory(root, { handlers })}</>
}
