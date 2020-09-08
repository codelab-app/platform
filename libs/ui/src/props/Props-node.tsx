import React from 'react'
import { reduce } from 'lodash'
import { ReactNodeI, isReactNode, TreeNodeI, isTreeNode } from '@codelab/node'
import { Props } from '@codelab/props'
// eslint-disable-next-line import/no-cycle
import { TreeDom } from '../renderer/TreeDom'

export const renderReactNodes = (
  nodePropValue: TreeNodeI | ReactNodeI,
): React.ReactNode => {
  const Node = TreeDom.render(nodePropValue)

  return <Node />
}

/**
 * Render react nodes
 */
export function renderReactProps<P extends Props = Props>(props: P) {
  return reduce<P, Props>(
    props,
    (
      evaluatedProps: Props,
      propValue: Props[keyof Props],
      propKey: keyof Props,
    ) => {
      return isReactNode(propValue) || isTreeNode(propValue)
        ? {
            ...evaluatedProps,
            [propKey]: renderReactNodes(propValue),
          }
        : { ...evaluatedProps }
    },
    {},
  )
}
