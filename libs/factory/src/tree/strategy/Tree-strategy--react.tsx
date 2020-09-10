import { traversePostOrder } from '@codelab/entity/graph'
import { ReactNodeI, TreeNodeI } from '@codelab/shared/interface/node'
import { Node } from '@codelab/entity/node'
import { evalPropsWithContext } from '@codelab/entity/props'
import { Props } from '@codelab/shared/interface/props'
import React, { PropsWithChildren } from 'react'
import { elementParameterFactory } from '@codelab/ui'
import { TreeStrategy } from './Tree-strategy'
import { TreeStrategyTree } from './Tree-strategy--tree'

export class TreeStrategyReact implements TreeStrategy {
  execute<P extends Props = {}>(data: TreeNodeI<P> | ReactNodeI<P>) {
    const defaultStrategy = new TreeStrategyTree()
    const root = defaultStrategy.execute(data)

    /**
     * (1) ctx is passed to props
     *
     * (2) RenderProps are passed down
     */
    const componentBuilderIteratee = (node: Node<P>) => {
      const [Type, props] = elementParameterFactory(node)

      const reactNodeProps = evalPropsWithContext(props)

      /**
       * internalProps is generally AntD internal like Menu to Menu.Item
       */
      /* eslint-disable no-param-reassign */
      node.Component = ({
        children,
        ...internalProps
      }: PropsWithChildren<P>) => {
        return node.hasChildren() ? (
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

    return () => <root.Component {...evalPropsWithContext(root.props)} />
  }
}
