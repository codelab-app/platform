import { reduce } from 'lodash'
import React from 'react'
// eslint-disable-next-line import/no-cycle
import { isReactNode, isReactNodeArray } from '@codelab/alpha/core/node'
import { Renderer } from '@codelab/alpha/core/renderer'
import { PropItem, Props } from '@codelab/alpha/shared/interface/props'
import { NodeI } from '@codelab/frontend'

export const propsFactoryReact = (props: Props) => {
  return reduce<Props, any>(
    props,
    (acc: Props, value: PropItem, key: keyof Props) => {
      if (
        isReactNode(value as NodeI) ||
        isReactNodeArray(value as Array<NodeI>)
      ) {
        console.log(key, value)
        const Nodes = (Array.isArray(value) ? value : [value]).map((node) => {
          const Node = Renderer.components(node as any)

          console.log(Node)

          return <Node />
        })

        const Components = Array.isArray(value) ? Nodes : Nodes[0]

        console.log(Components)

        return {
          ...acc,
          [key]: Components,
        }
      }

      return {
        ...acc,
        [key]: value,
      }
    },
    {},
  )
}
