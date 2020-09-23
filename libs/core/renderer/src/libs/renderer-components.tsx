/* eslint-disable import/no-cycle */
import React, { FunctionComponent, PropsWithChildren } from 'react'
import { elementParameterFactory } from './element-factory'
import {
  convertToLeafRenderProps,
  evalPropsWithContext,
} from '@codelab/core/props'
import { traversePostOrder } from '@codelab/core/traversal'
import { makeTree } from '@codelab/core/tree'
import { Node, NodeFactory, NodeI } from '@codelab/shared/interface/node'
import { Props } from '@codelab/shared/interface/props'

export const buildComponents = <P extends Props = {}>(
  data: NodeI,
): FunctionComponent<PropsWithChildren<P>> => {
  let hasRootChildren = false
  const root = makeTree(data) as Node

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
      return node.render(
        Component,
        evalPropsWithContext({ ...props, ...internalProps }),
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
  return ({ children: rootChildren, ...rootProps }: PropsWithChildren<P>) => {
    if (rootChildren) {
      hasRootChildren = true
    }

    root.props = { ...root.props, ...convertToLeafRenderProps(rootProps) }

    return (
      <root.Component {...evalPropsWithContext(root.props)}>
        {root.Children(rootChildren)}
      </root.Component>
    )
  }
}
