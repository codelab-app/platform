import { makeTree, traversePostOrder } from '@codelab/graph'
import { Node, TreeNodeI, ReactNodeI } from '@codelab/node'
import { evalPropsWithContext, Props } from '@codelab/props'
import React, { FunctionComponent, PropsWithChildren } from 'react'
import { elementParameterFactory } from './ElementFactory'
import { ElementFactory } from './ElementFactory.interface'
// eslint-disable-next-line import/no-cycle
import { produceReactNodeProps } from '../props/Props-node'

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
      const [Type, props] = factory(node)

      const reactNodeProps = produceReactNodeProps(props)

      /**
       * internalProps is generally AntD internal like Menu to Menu.Item
       */
      /* eslint-disable no-param-reassign */
      node.Component = ({
        children,
        ...internalProps
      }: PropsWithChildren<P>) => {
        return node.hasChildren() || hasRootChildren ? (
          <Type {...internalProps} {...reactNodeProps}>
            {children}
          </Type>
        ) : (
          <Type {...internalProps} {...reactNodeProps} />
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

    return ({ children: rootChildren }: PropsWithChildren<P>) => {
      if (rootChildren) {
        hasRootChildren = true
      }

      return (
        <root.Component {...evalPropsWithContext(root.props)}>
          {root.Children(rootChildren)}
        </root.Component>
      )
    }
  }
}
