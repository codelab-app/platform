import React from 'react'
import { NodeDtoI } from '@codelab/shared/interface/node'

export const renderReactNodes = (
  nodePropValue: NodeDtoI | Array<NodeDtoI>,
  cb: any,
): React.ReactNode => {
  const Nodes = (Array.isArray(nodePropValue)
    ? nodePropValue
    : [nodePropValue]
  ).map((node) => {
    const Node = cb(node)

    return <Node />
  })

  return Array.isArray(nodePropValue) ? Nodes : Nodes[0]
}
