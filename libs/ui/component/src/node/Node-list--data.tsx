import React from 'react'
import { useResource } from 'rest-hooks'
import { RenderProps } from './Node-detail--data'
import { ResourceNode } from '@codelab/core/node'

type NodeListProps = {
  // id: string
} & RenderProps<Array<ResourceNode>>

export const NodeListData = ({ children }: NodeListProps) => {
  const nodes = useResource(ResourceNode.listShape(), {}) as Array<ResourceNode>

  return <>{children(nodes)}</>
}
