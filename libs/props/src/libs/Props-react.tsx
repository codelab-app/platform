import React from 'react'
import { ReactNodeI, TreeNodeI } from '@codelab/node'

export const renderReactNodes = (
  nodePropValue: TreeNodeI | ReactNodeI,
  cb: any,
): React.ReactNode => {
  const Node = cb(nodePropValue)

  return <Node />
}
