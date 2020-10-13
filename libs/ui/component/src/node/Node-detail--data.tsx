import React from 'react'
import { Resource, useResource } from 'rest-hooks'
import { ResourceNode } from '@codelab/core/node'

export type RenderProps<P extends Resource | Array<ResourceNode>> = {
  children: (props: P) => JSX.Element
}

type NodeDetailProps = {
  id: string
} & RenderProps<ResourceNode>

export const NodeDetailData = ({ id, children }: NodeDetailProps) => {
  console.log('node detail')
  const node = useResource(ResourceNode.detailShape(), { id }) as ResourceNode

  return <>{children(node)}</>
}
