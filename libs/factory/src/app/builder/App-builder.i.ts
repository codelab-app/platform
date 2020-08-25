import { UIProduct } from '../products/App-product.i'
import { UIOrder } from './web/AppWeb-builder--order'

/**
 * Builder pattern
 */
export abstract class AppBuilder {
  /**
   * Create & build the product here
   *
   * @param order
   */
  public buildProduct(order: UIOrder): UIProduct {
    const product: UIProduct = this.create(order)

    // Steps to configure product can be added here
    product.build()

    return product
  }

  protected abstract create(order: UIOrder): UIProduct
}
