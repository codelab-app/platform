import { makeTree, traversePostOrder } from '@codelab/graph'
import { Node, TreeNodeI, ReactNodeI } from '@codelab/node'
import {
  evalPropsWithContext,
  Props,
  convertToRenderProps,
} from '@codelab/props'
import React, { FunctionComponent, PropsWithChildren } from 'react'
import { elementParameterFactory } from './ElementFactory'
import { ElementFactory } from './ElementFactory.interface'
// eslint-disable-next-line import/no-cycle
import { renderReactProps } from '../props/Props-node'

export class TreeDom {
  static render<P extends Props>(
    data: TreeNodeI<P> | ReactNodeI<P>,
    factory: ElementFactory<P> = elementParameterFactory,
  ): FunctionComponent<any> {
    let hasRootChildren = false
    const root = makeTree(data)

    /**
     * (1) ctx is passed to props
     *
     * (2) RenderProps are passed down
     */
    const componentBuilderIteratee = (node: Node<P>) => {
      const [Component, props] = factory(node)
      const renderedReactProps = renderReactProps(props)

      /* eslint-disable no-param-reassign */
      node.Component = ({
        children,
        // internalProps is generally AntD internal like Menu to Menu.Item
        // also contains rootProps
        ...internalProps
      }: PropsWithChildren<P>) => {
        return node.hasChildren() || hasRootChildren ? (
          <Component {...internalProps} {...renderedReactProps}>
            {children}
          </Component>
        ) : (
          <Component {...internalProps} {...renderedReactProps} />
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

    return ({ children: rootChildren, ...rootProps }: PropsWithChildren<P>) => {
      if (rootChildren) {
        hasRootChildren = true
      }

      return (
        <root.Component
          {...evalPropsWithContext({
            ...root.props,
            ...convertToRenderProps(rootProps),
          })}
        >
          {root.Children(rootChildren)}
        </root.Component>
      )
    }
  }
}
