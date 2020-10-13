import React from 'react'
import { useResource } from 'rest-hooks'
import { ResourceNode } from '@codelab/core/node'

export const NodeDetail = ({ id }: { id: string }) => {
  console.log('node detail')
  const node = useResource(ResourceNode.detailShape(), { id })

  console.log(node)

  return <article>{/* <h2>{node}</h2> */}</article>
}
