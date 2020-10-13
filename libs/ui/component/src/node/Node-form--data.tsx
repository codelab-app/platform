import React from 'react'
import { useResource } from 'rest-hooks'
import { RenderProps } from './Node-detail--data'
import { ResourceNode } from '@codelab/core/node'

type NodeFormProps = {
  // id: string
} & RenderProps<Array<ResourceNode>>

export const NodeFormData = ({ children }: NodeFormProps) => {
  const nodes = useResource(ResourceNode.formShape(), {}) as Array<ResourceNode>

  return <>{children(nodes)}</>
}
