import { TraversalIteratee, TraversalOrder } from '@codelab/graph'
import { Factory } from '@codelab/ui'
import { UIOrder } from '../builder/web/AppWeb-builder--order'
import { TreeStrategy } from '../../tree/strategy/Tree-strategy'
import { TreeProduct } from '../../tree/Tree-product.i'

/**
 * Factory creates parts for products, then the builder assembles them
 */
export abstract class AppFactory {
  public order: UIOrder

  private _tree: TreeProduct

  constructor(order: UIOrder) {
    this.order = order
  }

  set tree(tree: TreeProduct) {
    this._tree = tree
  }

  get product(): TreeProduct {
    return this._tree
  }

  abstract createModel()

  abstract createView()

  abstract createData()
}
