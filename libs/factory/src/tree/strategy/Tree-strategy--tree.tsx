import { reduce } from 'lodash'
import { TreeStrategy } from './Tree-strategy'
import { Node } from '@codelab/core/node'
import { treeAppenderIteratee, treeWalker } from '@codelab/core/traversal'
import { NodeDtoI } from '@codelab/shared/interface/node'
import { TreeSubTreeAcc } from '@codelab/shared/interface/tree'

export class TreeStrategyTree implements TreeStrategy {
  execute(data: NodeDtoI) {
    const root = new Node(data)
    const subTreeContext = {
      subTree: root,
      prev: root,
      parent: root,
    }

    return reduce<Node, TreeSubTreeAcc<Node>>(
      (data as Node)?.children ?? [],
      treeWalker<Node, TreeSubTreeAcc<Node>>(root, treeAppenderIteratee as any),
      subTreeContext,
    ).subTree
  }
}
