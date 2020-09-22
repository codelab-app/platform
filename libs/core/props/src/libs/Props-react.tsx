import React from 'react'
// eslint-disable-next-line import/no-cycle
import { Renderer } from '@codelab/core/renderer'
import { NodeDtoI } from '@codelab/shared/interface/node'

export const renderReactNodes = (
  nodePropValue: NodeDtoI | Array<NodeDtoI>,
): React.ReactNode => {
  const Nodes = (Array.isArray(nodePropValue)
    ? nodePropValue
    : [nodePropValue]
  ).map((node) => {
    // TODO: Need to remove the dependency
    const Node = Renderer.components(node)

    return <Node />
  })

  return Array.isArray(nodePropValue) ? Nodes : Nodes[0]
}
