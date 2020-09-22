/* eslint-disable import/no-cycle */
import React, { FunctionComponent, PropsWithChildren } from 'react'
import { elementParameterFactory } from './ElementFactory'
import { buildCtx, convertToLeafRenderProps } from '@codelab/core/props'
import { traversePostOrder } from '@codelab/core/traversal'
import { makeTree } from '@codelab/core/tree'
import { Node, NodeDtoI } from '@codelab/shared/interface/node'
import { Props } from '@codelab/shared/interface/props'

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
        const mergedProps =
          node.type === 'React.Provider'
            ? {
                ...props,
                ...internalProps,
                ctx: buildCtx({ ...props, ...internalProps }),
              }
            : { ...props, ...internalProps }

        return node.render(Component, mergedProps, children, hasRootChildren)
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
