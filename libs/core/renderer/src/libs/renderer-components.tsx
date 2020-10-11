/* eslint-disable import/no-cycle */
import React, { FunctionComponent, PropsWithChildren } from 'react'
import { propsMapLeaf } from '../../../props/src/mapper/Props-map--leaf'
import { elementParameterFactory } from './element-factory'
import { NodeEntity } from '@codelab/core/node'
import { traversePostOrder } from '@codelab/core/traversal'
import { makeTree } from '@codelab/core/tree'
import { NodeFactory, NodeI } from '@codelab/shared/interface/node'

export const buildComponents = <P extends {} = {}>(
  data: NodeI,
): FunctionComponent<PropsWithChildren<P>> => {
  let hasRootChildren = false
  const root = makeTree(data) as NodeEntity

  /**
   * Called during traversal for each node.
   *
   * (1) ctx is passed to props
   *
   * (2) RenderProps are passed down
   */
  const componentBuilderIteratee: NodeFactory<void> = (node: any) => {
    const [Component, props] = elementParameterFactory(node)

    /* eslint-disable no-param-reassign */
    node.Component = ({
      children,
      // internalProps is generally AntD internal like Menu to Menu.Item
      // also contains rootProps
      ...internalProps
    }: PropsWithChildren<P>) => {
      // console.log(node.type, internalProps)

      return node.render(
        Component,
        { ...props, ...internalProps },
        children,
        hasRootChildren,
      )
    }

    if (node.type === 'React.Select.Option') {
      ;(node.Component as any).isSelectOption = true
    }

    if (node.type === 'React.Breadcrumb.Item') {
      // eslint-disable-next-line no-underscore-dangle
      ;(node.Component as any).__ANT_BREADCRUMB_ITEM = true
    }
  }

  traversePostOrder(root, componentBuilderIteratee)

  /**
   * rootChildren & rootProps allow us to programmatically modify components
   */
  return ({
    children: rootChildren,
    ...outsideProps
  }: PropsWithChildren<P>) => {
    if (rootChildren) {
      hasRootChildren = true
    }

    /**
     * We only want to transform rootProps to leaf, since root.props contain antd specific props
     */
    const props = root.evalProps(propsMapLeaf(outsideProps))

    return (
      <root.Component {...props}>
        {root.hasChildren()
          ? root.Children(
              rootChildren,
              root.nextRenderProps(propsMapLeaf(outsideProps)),
            )
          : rootChildren}
      </root.Component>
    )
  }
}
