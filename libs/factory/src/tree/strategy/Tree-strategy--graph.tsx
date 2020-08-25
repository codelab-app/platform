import {
  Graph,
  graphAppenderIteratee,
  TreeNodeI,
  treeWalker,
} from '@codelab/graph'
import { reduce } from 'lodash'
import { Props } from '@codelab/props'
import { TreeStrategy } from './Tree-strategy'
import { GraphSubTreeContext } from '../../../../graph/src/tree/Tree.i'
import { TreeStrategyDefault } from './Tree-strategy--default'

export class TreeStrategyGraph implements TreeStrategy {
  execute<P extends Props = {}>(data: TreeNodeI<P>) {
    // Convert input to Node input structure first, nodeFinder requires Node representation
    const defaultStrategy = new TreeStrategyDefault()
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
