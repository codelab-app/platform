import { TreeProductReact } from '../../tree/Tree-product.i'
import { TreeStrategyReact } from '../../tree/strategy/Tree-strategy--react'
import { AppFactory } from './App-factory.i'

export class AppWebFactory extends AppFactory {
  createModel() {
    throw new Error('Method not implemented.')
  }

  createView() {
    const strategy = new TreeStrategyReact()

    this.tree = new TreeProductReact(strategy)

    return this.tree.getProduct()
  }

  createData() {
    throw new Error('Method not implemented.')
  }
}
