import { Props } from '@codelab/shared/interface/props'
import { ReactNodeI, TreeNodeI } from '@codelab/shared/interface/node'
import { TreeSubTreeContext } from '@codelab/shared/interface/tree'
import { Node } from '@codelab/core/node'
import { treeAppenderIteratee, treeWalker } from '@codelab/core/traversal'
import { reduce } from 'lodash'
import { TreeStrategy } from './Tree-strategy'

export class TreeStrategyTree implements TreeStrategy {
  execute<P extends Props = {}>(data: TreeNodeI<P> | ReactNodeI<P>) {
    const root = new Node<P>(data)
    const subTreeContext = {
      subTree: root,
      prev: root,
      parent: root,
    }

    return reduce<TreeNodeI<P> | ReactNodeI<P>, TreeSubTreeContext<P>>(
      data?.children ?? [],
      treeWalker<TreeSubTreeContext<P>, any>(root, treeAppenderIteratee),
      subTreeContext,
    ).subTree
  }
}
