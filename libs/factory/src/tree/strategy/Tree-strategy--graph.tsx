import { reduce } from 'lodash'
import { TreeStrategy } from './Tree-strategy'
import { TreeStrategyTree } from './Tree-strategy--tree'
import { Graph } from '@codelab/core/graph'
import { Node } from '@codelab/core/node'
import { graphAppenderIteratee, treeWalker } from '@codelab/core/traversal'
import { NodeDtoI } from '@codelab/shared/interface/node'
import { GraphSubTreeAcc, TreeSubTreeAcc } from '@codelab/shared/interface/tree'

export class TreeStrategyGraph implements TreeStrategy {
  execute(data: NodeDtoI) {
    // Convert input to Node input structure first, nodeFinder requires Node representation
    const defaultStrategy = new TreeStrategyTree()
    const root = defaultStrategy.execute(data)
    const graph = new Graph({ vertices: [], edges: [] })
    const subTreeContext = {
      graph,
      subTree: root,
      parent: root,
      prev: root,
    }

    graph.addVertexFromNode(root)

    return reduce<Node, GraphSubTreeAcc<Node>>(
      (data as Node).children ?? [],
      treeWalker<GraphSubTreeAcc<Node>>(root, graphAppenderIteratee),
      subTreeContext,
    ).graph
  }
}
