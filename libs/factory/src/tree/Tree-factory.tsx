import { TreeStrategy } from './strategy/Tree-strategy'
import { NodeDtoI } from '@codelab/shared/interface/node'

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
  data: NodeDtoI
}

export class TreeFactoryMethod {
  private _strategy?: TreeStrategy

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
