import {
  nodeRendererFactory,
  useComponentHandlers,
} from '@codelab/frontend/builder'
import { CytoscapeService } from '@codelab/frontend/cytoscape'
import { __ComponentFragment } from '@codelab/hasura'
import React from 'react'

type ComponentRendererProps = {
  component: __ComponentFragment
}

export const ComponentRenderer = ({ component }: ComponentRendererProps) => {
  const cy = CytoscapeService.fromComponent(component)
  const root = CytoscapeService.componentTree(cy)
  const handlers = useComponentHandlers()

  return <>{nodeRendererFactory(root, { handlers })}</>
}
