/* eslint-disable no-param-reassign */
/* eslint-disable import/no-cycle */
import React, { FunctionComponent, PropsWithChildren, ReactNode } from 'react'
import { propsMapLeaf } from '../../../alpha/core/props/src/mapper/Props-map--leaf'
import { NodeA, NodeI } from '../../../modules/graph/src/core/domain/node/Node'
import { NodeEntity } from './NodeEntity'
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
