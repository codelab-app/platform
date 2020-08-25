import { Props } from '@codelab/props'
import {
  Node,
  ReactNodeI,
  treeAppenderIteratee,
  TreeNodeI,
  treeWalker,
} from '@codelab/graph'
import { reduce } from 'lodash'
import { TreeStrategy } from './Tree-strategy'
import { TreeSubTreeContext } from '../../../../graph/src/tree/Tree.i'

export class TreeStrategyDefault implements TreeStrategy {
  execute<P extends Props = {}>(data: TreeNodeI<P> | ReactNodeI<P>) {
    const root = new Node<P>(data)
    const subTreeContext = {
      subTree: root,
      prev: root,
      parent: root,
    }

    return reduce<TreeNodeI<P> | ReactNodeI<P>, TreeSubTreeContext<P>>(
      data?.children ?? [],
      treeWalker<TreeSubTreeContext<P>>(root, treeAppenderIteratee),
      subTreeContext,
    ).subTree
  }
}
