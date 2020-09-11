import { Graph } from '@codelab/core/graph'
import { GraphSubTreeContext } from '@codelab/shared/interface/tree'
import { graphAppenderIteratee, treeWalker } from '@codelab/core/traversal'

import { TreeNodeI } from '@codelab/shared/interface/node'
import { reduce } from 'lodash'
import { Props } from '@codelab/shared/interface/props'
import { TreeStrategy } from './Tree-strategy'
import { TreeStrategyTree } from './Tree-strategy--tree'

export class TreeStrategyGraph implements TreeStrategy {
  execute<P extends Props = {}>(data: TreeNodeI<P>) {
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

    return reduce<TreeNodeI<P>, GraphSubTreeContext<P>>(
      data.children ?? [],
      treeWalker<GraphSubTreeContext<P>>(root, graphAppenderIteratee),
      subTreeContext,
    ).graph
  }
}
