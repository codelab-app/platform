import React, { PropsWithChildren } from 'react'
import { TreeStrategy } from './Tree-strategy'
import { TreeStrategyTree } from './Tree-strategy--tree'
import { evalPropsWithContext } from '@codelab/core/props'
import { elementParameterFactory } from '@codelab/core/renderer'
import { traversePostOrder } from '@codelab/core/traversal'
import { Node, NodeDtoI } from '@codelab/shared/interface/node'
import { Props } from '@codelab/shared/interface/props'

export class TreeStrategyReact implements TreeStrategy {
  execute<P extends Props = {}>(data: NodeDtoI) {
    const defaultStrategy = new TreeStrategyTree()
    const root = defaultStrategy.execute(data)

    /**
     * (1) ctx is passed to props
     *
     * (2) RenderProps are passed down
     */
    const componentBuilderIteratee = (node: Node) => {
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

      if (node.type === 'React.Select.Option') {
        ;(node.Component as any).isSelectOption = true
      }

      if (node.type === 'React.Breadcrumb.Item') {
        // eslint-disable-next-line no-underscore-dangle
        ;(node.Component as any).__ANT_BREADCRUMB_ITEM = true
      }
    }

    traversePostOrder(root, componentBuilderIteratee)

    return () => <root.Component {...evalPropsWithContext(root.props)} />
  }
}
