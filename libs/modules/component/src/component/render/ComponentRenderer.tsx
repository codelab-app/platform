import React from 'react'
import { CytoscapeService } from '@codelab/frontend/cytoscape'
import { NodeRenderer } from '@codelab/frontend/builder'
import { __ComponentFragment } from '@codelab/hasura'

type ComponentRendererProps = {
  component: __ComponentFragment
}

export const ComponentRenderer = ({ component }: ComponentRendererProps) => {
  const cy = CytoscapeService.fromComponent(component)
  const root = CytoscapeService.componentTree(cy)

  return <NodeRenderer node={root as any} enableOverlays={false} />
}
