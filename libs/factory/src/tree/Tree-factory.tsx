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
  private _strategy: TreeStrategy

  set strategy(strategy: TreeStrategy) {
    this._strategy = strategy
  }

  get strategy() {
    return this._strategy
  }

  createProduct(order) {
    const { type, data } = order

    switch (type) {
      case TreeType.React:
        return new TreeStrategyReact().execute(data)
      case TreeType.Graph:
        return new TreeStrategyGraph().execute(data)
      default:
        throw new Error(`${type} is not a valid TreeType`)
    }
  }
}
