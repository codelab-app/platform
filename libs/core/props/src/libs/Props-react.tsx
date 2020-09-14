import React from 'react'
import { ReactNodeI, TreeNodeI } from '@codelab/shared/interface/node'

export const renderReactNodes = (
  nodePropValue: TreeNodeI | ReactNodeI | Array<ReactNodeI>,
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
