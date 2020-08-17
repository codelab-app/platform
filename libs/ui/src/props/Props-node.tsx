import React from 'react'
import { reduce } from 'lodash'
import { ReactNodeI, isReactNode, TreeNodeI, isTreeNode } from '@codelab/graph'
import { Props } from '@codelab/props'
// eslint-disable-next-line import/no-cycle
import { TreeDom } from '../renderer/TreeDom'

export const renderNodePropValue = (
  nodePropValue: TreeNodeI | ReactNodeI,
): React.ReactNode => {
  const Node = TreeDom.render(nodePropValue)

  return <Node />
}

export function produceReactNodeProps<P extends Props = Props>(props: P) {
  return reduce<P, Props>(
    props,
    (
      renderedProp: Props,
      propValue: Props[keyof Props],
      propKey: keyof Props,
    ) => {
      return isReactNode(propValue) || isTreeNode(propValue)
        ? {
            ...renderedProp,
            [propKey]: renderNodePropValue(propValue),
          }
        : { ...renderedProp }
    },
    {},
  )
}
