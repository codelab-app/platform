import { makeTree, traversePostOrder } from '@codelab/entity/graph'
import { Node } from '@codelab/entity/node'
import { TreeNodeI, ReactNodeI } from '@codelab/shared/interface/node'
import {
  evalPropsWithContext,
  convertToLeafRenderProps,
} from '@codelab/entity/props'
import { Props } from '@codelab/shared/interface/props'
import React, { FunctionComponent, PropsWithChildren } from 'react'
import { merge } from 'lodash'
import { elementParameterFactory } from './ElementFactory'

/**
 * We need this function in ui package because TreeDom is required, can't put in node or props package
 */
const evalPropsWithTreeContext = (props: Props): Props => {
  // eslint-disable-next-line no-use-before-define
  return evalPropsWithContext(merge(props, { ctx: { TreeDom } }))
}

export class TreeDom {
  static render<P extends Props>(
    data: TreeNodeI<P> | ReactNodeI<P>,
  ): FunctionComponent<any> {
    let hasRootChildren = false
    const root = makeTree(data)

    /**
     * Called during traversal for each node.
     *
     * (1) ctx is passed to props
     *
     * (2) RenderProps are passed down
     */
    const componentBuilderIteratee = (node: Node<P>) => {
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
          evalPropsWithTreeContext({ ...props, ...internalProps }),
          children,
          hasRootChildren,
        )
      }

      if (node.type === 'Select.Option') {
        ;(node.Component as any).isSelectOption = true
      }

      if (node.type === 'Breadcrumb.Item') {
        // eslint-disable-next-line no-underscore-dangle
        ;(node.Component as any).__ANT_BREADCRUMB_ITEM = true
      }
    }

    traversePostOrder<P>(root, componentBuilderIteratee)

    /**
     * rootChildren & rootProps allow us to programmatically modify components
     */
    return ({ children: rootChildren, ...rootProps }: PropsWithChildren<P>) => {
      if (rootChildren) {
        hasRootChildren = true
      }

      root.props = { ...root.props, ...convertToLeafRenderProps(rootProps) }

      return (
        <root.Component {...evalPropsWithTreeContext(root.props)}>
          {root.Children(rootChildren)}
        </root.Component>
      )
    }
  }
}
