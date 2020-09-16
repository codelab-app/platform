import { merge } from 'lodash'
import React, { FunctionComponent, PropsWithChildren } from 'react'
// eslint-disable-next-line import/no-cycle
import { elementParameterFactory } from './ElementFactory'
import {
  convertToLeafRenderProps,
  evalPropsWithContext,
} from '@codelab/core/props'
import { traversePostOrder } from '@codelab/core/traversal'
import { makeTree } from '@codelab/core/tree'
import { Node, NodeDtoI } from '@codelab/shared/interface/node'
import { Props } from '@codelab/shared/interface/props'

/**
 * We need this function in ui package because TreeDom is required, can't put in node or props package
 */
const evalPropsWithTreeContext = (props: Props, parentProps: Props): Props => {
  // eslint-disable-next-line no-use-before-define
  return evalPropsWithContext(merge(props, { ctx: { TreeDom } }), parentProps)
}

export class TreeDom {
  static render<P extends Props = {}>(
    data: NodeDtoI,
  ): FunctionComponent<PropsWithChildren<P>> {
    let hasRootChildren = false
    const root = makeTree(data) as Node

    /**
     * Called during traversal for each node.
     *
     * (1) ctx is passed to props
     *
     * (2) RenderProps are passed down
     */
    const componentBuilderIteratee = (node: Node) => {
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
          evalPropsWithTreeContext(
            { ...props, ...internalProps },
            node.parent ? node.parent.props : {},
          ),
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
        <root.Component {...root.props}>
          {root.Children(rootChildren)}
        </root.Component>
      )
    }
  }
}
