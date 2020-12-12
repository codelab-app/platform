import React, { PropsWithChildren } from 'react'
import { ResourceNode } from '@codelab/alpha/core/node'
import { ResourceProps } from '@codelab/ui/component'

export const NodeList = ({
  resource: nodes,
}: PropsWithChildren<ResourceProps<Array<ResourceNode>>>) => {
  return <article>list</article>
}
