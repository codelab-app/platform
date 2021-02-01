import React, { ReactNode } from 'react'
import { NodeA, NodeI } from '../../../modules/graph/src/core/domain/node/Node'
import { elementParameterFactory } from './elementFactory'

const hasChildren = (node: NodeI) => {
  return !!node.children?.length
}

export const renderChildren = (
  node: NodeA,
  oldRenderProps: object = {},
): ReactNode | Array<ReactNode> => {
  const children = node.children.reduce(
    (Components: Array<ReactNode>, child: NodeA) => {
      const [Child, props] = elementParameterFactory(child)

      // TODO: remove any cast
      let ChildComponent: ReactNode = React.createElement(Child as any, {
        key: child.id,
        // ...child.evalProps(oldRenderProps),
      })

      if (hasChildren(child)) {
        ChildComponent = React.createElement(
          Child as any,
          {
            key: child.id,
            // ...child.evalProps(oldRenderProps)
          },
          renderChildren(
            child,
            {},
            // child.nextRenderProps(oldRenderProps)
          ),
        )
      }

      return [...Components, ChildComponent]
    },
    [],
  )

  return children
}

export const RenderComponents = (node: NodeA) => {
  const { props, type } = node
  const [RootComponent] = elementParameterFactory({ type })

  return React.createElement(RootComponent as any, props, renderChildren(node))
}
