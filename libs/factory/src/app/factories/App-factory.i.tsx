import { TraversalIteratee, TraversalOrder } from '@codelab/graph'
import { Factory } from '@codelab/ui'
import { UIOrder } from '../builder/web/AppWeb-builder--order'

/**
 * Factory creates parts for products, then the builder assembles them
 */
export abstract class AppFactory {
  public order: UIOrder

  private _factory: Factory

  private _traversal: TraversalOrder

  private _iteratee: TraversalIteratee

  constructor(order: UIOrder) {
    this.order = order
  }

  /**
   * @param factory transforms our node into intermediate, which is used during traversal
   */
  set factory(factory: Factory) {
    this._factory = factory
  }

  set traversal(traversal: TraversalOrder) {
    this._traversal = traversal
  }

  set iteratee(iteratee: TraversalIteratee) {
    this._iteratee = iteratee
  }

  abstract createReactTree()
}
