import { AppOrder } from '../builder/web/AppWeb-builder--order'

import { TreeProduct } from '../../tree/Tree-product.i'

/**
 * Factory creates parts for products, then the builder assembles them
 */
export abstract class AppFactory {
  public order: AppOrder

  private _tree: TreeProduct

  constructor(order: AppOrder) {
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
