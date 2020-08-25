import { NodeI } from '@codelab/graph'
import { TreeStrategyReact } from './strategy/Tree-strategy--react'
import { TreeStrategyGraph } from './strategy/Tree-strategy--graph'
import { TreeStrategy } from './strategy/Tree-strategy'

export enum TreeType {
  Ref = 'Ref',
  React = 'React',
  Graph = 'Graph',
}

export type TreeOrder = {
  type: TreeType
  data: NodeI
}

export class TreeFactory {
  createProduct(order) {
    const { type, data } = order

    let strategy: TreeStrategy

    switch (type) {
      case TreeType.React:
        strategy = new TreeStrategyReact()

        return strategy.execute(data)
      case TreeType.Graph:
        strategy = new TreeStrategyGraph()

        return strategy.execute(data)
      default:
        throw new Error(`${type} is not a valid TreeType`)
    }
  }
}
