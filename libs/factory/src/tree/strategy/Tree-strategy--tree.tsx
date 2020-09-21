import { reduce } from 'lodash'
import { TreeStrategy } from './Tree-strategy'
import { NodeEntity } from '@codelab/core/node'
import { treeAppenderIteratee, treeWalker } from '@codelab/core/traversal'
import { NodeDtoI } from '@codelab/shared/interface/node'
import { TreeSubTreeAcc } from '@codelab/shared/interface/tree'

export class TreeStrategyTree implements TreeStrategy {
  execute(data: NodeDtoI) {
    const root = new NodeEntity(data)
    const subTreeContext = {
      subTree: root,
      prev: root,
      parent: root,
    }

    return reduce<NodeEntity, TreeSubTreeAcc<NodeEntity>>(
      (data as NodeEntity)?.children ?? [],
      treeWalker<NodeEntity, TreeSubTreeAcc<NodeEntity>>(
        root,
        treeAppenderIteratee as any,
      ),
      subTreeContext,
    ).subTree
  }
}
