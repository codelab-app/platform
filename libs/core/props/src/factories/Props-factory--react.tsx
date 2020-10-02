import { reduce } from 'lodash'
import React from 'react'
// eslint-disable-next-line import/no-cycle
import { Renderer } from '@codelab/core/renderer'
import {
  NodeReactI,
  isReactNode,
  isReactNodeArray,
} from '@codelab/shared/interface/node'
import { PropItem, Props } from '@codelab/shared/interface/props'

export const propsFactoryReact = (props: Props) => {
  return reduce<Props, any>(
    props,
    (acc: Props, value: PropItem, key: keyof Props) => {
      if (
        isReactNode(value as NodeReactI) ||
        isReactNodeArray(value as Array<NodeReactI>)
      ) {
        console.log(key, value)
        const Nodes = (Array.isArray(value) ? value : [value]).map((node) => {
          const Node = Renderer.components(node as NodeReactI)

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
