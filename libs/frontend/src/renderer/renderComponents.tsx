/* eslint-disable no-param-reassign */
/* eslint-disable import/no-cycle */
import React, { FunctionComponent, PropsWithChildren } from 'react'
import { propsMapLeaf } from '../../../alpha/core/props/src/mapper/Props-map--leaf'
import { Node } from '../../../modules/graph/src/core/domain/node/Tree'
import { NodeEntity } from './NodeEntity'
import { elementParameterFactory } from './elementFactory'
import { traversePostOrder } from '@codelab/alpha/core/traversal'
import { makeTree } from '@codelab/alpha/core/tree'
import { NodeFactory, NodeI } from '@codelab/alpha/shared/interface/node'

export const renderComponents = (data: Node): FunctionComponent => {
  const root = makeTree(data) as NodeEntity

  /**
   * Called during traversal for each node.
   */
  const componentBuilderIteratee: NodeFactory<void> = (node: any) => {
    const [Component, props] = elementParameterFactory(node)

    node.Component = React.createElement(Component, props)
  }

  traversePostOrder(root, componentBuilderIteratee)

  /**
   * rootChildren & rootProps allow us to programmatically modify components
   */
  return ({
    children: rootChildren,
    ...outsideProps
  }: PropsWithChildren<P>) => {
    root.props = { ...root.props, ...propsMapLeaf(outsideProps) }

    /**
     * We only want to transform rootProps to leaf, since root.props contain antd specific props
     */
    const props = root.evalProps(propsMapLeaf(outsideProps))

    const componentChildren = root.Children(
      rootChildren,
      root.nextRenderProps(propsMapLeaf(outsideProps)),
    )

    return rootChildren || root.hasChildren()
      ? React.cloneElement(root.Component, props, componentChildren)
      : React.cloneElement(root.Component, props)
  }
}
