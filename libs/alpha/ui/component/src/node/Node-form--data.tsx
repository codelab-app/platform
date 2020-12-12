import React from 'react'
import { useResource } from 'rest-hooks'
import { RenderProps } from './Node-detail--data'
import { ResourceNode } from '@codelab/alpha/core/node'

type NodeFormProps = RenderProps<
  {
    // id: string
  },
  Array<ResourceNode>
>

export const NodeFormData = ({ children }: NodeFormProps) => {
  const nodes = useResource(ResourceNode.formShape(), {}) as Array<ResourceNode>

  return <>{children(nodes)}</>
}
