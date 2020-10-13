import React from 'react'
import { Resource } from 'rest-hooks'
import { ResourceNode } from '@codelab/core/node'

export type ResourceProps<P extends Resource | Array<ResourceNode>> = {
  resource: P
}

export const NodeDetail = ({ resource: node }: ResourceProps<ResourceNode>) => {
  console.log(node)

  return <article>node</article>
}
