import React from 'react'
import { useResource } from 'rest-hooks'
import { ResourceNode } from '@codelab/alpha/core/node'

export type RenderProps<P extends object = {}, C extends object = {}> = P & {
  children: (props: C) => JSX.Element
}

type NodeDetailProps = {
  id: string
} & RenderProps<{}, ResourceNode>

export const NodeDetailData = ({ id, children }: NodeDetailProps) => {
  console.log('node detail')
  const node = useResource(ResourceNode.detailShape(), { id }) as ResourceNode

  return <>{children(node)}</>
}
