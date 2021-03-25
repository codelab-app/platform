/* eslint-disable no-param-reassign */
/* eslint-disable import/no-cycle */
import React, { FunctionComponent, PropsWithChildren } from 'react'
import { propsMapLeaf } from '../../../props/src/mapper/Props-map--leaf'
import { elementParameterFactory } from './element-factory'
import { NodeEntity } from '@codelab/alpha/core/node'
import { traversePostOrder } from '@codelab/alpha/core/traversal'
import { makeTree } from '@codelab/alpha/core/tree'
import { NodeFactory } from '@codelab/alpha/shared/interface/node'
import { NodeI } from '@codelab/frontend'

export const buildComponents = <P extends {} = {}>(
  data: NodeI,
): FunctionComponent<P> => {
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
