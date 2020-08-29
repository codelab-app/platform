import { NodeI, TreeNodeI } from '@codelab/graph'
import { TreeStrategyReact } from './strategy/Tree-strategy--react'
import { TreeStrategyGraph } from './strategy/Tree-strategy--graph'
import { TreeStrategy } from './strategy/Tree-strategy'
import { AppOrder } from '../app/builder/web/AppWeb-builder--order'
import { TreeStrategyTree } from './strategy/Tree-strategy--tree'

export enum TreeType {
  // Products a tree using parent-child
  Tree = 'Tree',
  // Products a tree using refs
  Ref = 'Ref',
  // Products a React tree
  React = 'React',
  // Use vertex/edge representation
  Graph = 'Graph',
}

export type TreeOrder = {
  type: TreeType
  data: NodeI
}

export class TreeFactoryMethod {
  private _strategy: TreeStrategy

  setStrategy(strategy: TreeStrategy) {
    this._strategy = strategy

    return this
  }

  get strategy() {
    return this._strategy
  }

  createProduct(order: TreeOrder) {
    const { type, data } = order

    switch (type) {
      case TreeType.Tree:
        return this._strategy.execute(data)
      case TreeType.React:
        return this._strategy.execute(data)
      case TreeType.Graph:
        return this._strategy.execute(data as TreeNodeI)
      default:
        throw new Error(`${type} is not a valid TreeType`)
    }
  }
}
