import React from 'react'
import { reduce } from 'lodash'
import { ReactNodeI, isReactNode, TreeNodeI, isTreeNode } from '@codelab/node'
import { Props } from '@codelab/props'

export const renderReactNodes = (
  nodePropValue: TreeNodeI | ReactNodeI,
  cb: any,
): React.ReactNode => {
  const Node = cb(nodePropValue)

  return <Node />
}
