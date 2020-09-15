import { TreeOrder } from './Tree-factory'
import { TreeStrategy } from './strategy/Tree-strategy'

/**
 * Factory Method Pattern uses an interface for products. In our case we combine this with the Strategy Pattern by taking a strategy as the constructor argument. The strategy is the way in which we create our product.
 */
export abstract class TreeProduct {
  protected strategy: TreeStrategy

  protected order: TreeOrder

  constructor(strategy: TreeStrategy) {
    this.strategy = strategy
  }

  abstract getProduct()
}

export class TreeProductDefault extends TreeProduct {
  getProduct() {
    return this.strategy.execute(this.order.data)
  }
}

export class TreeProductReact extends TreeProduct {
  getProduct() {
    return this.strategy.execute(this.order.data)
  }
}

export class TreeProductGraph extends TreeProduct {
  getProduct() {
    return this.strategy.execute(this.order.data)
  }
}
