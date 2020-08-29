import { AppProduct } from '../products/App-product.i'
import { AppOrder } from './web/AppWeb-builder--order'

/**
 * Builder pattern
 */
export abstract class AppBuilder {
  /**
   * Create & build the product here
   *
   * @param order
   */
  public buildProduct(order: AppOrder): AppProduct {
    const product: AppProduct = this.create(order)

    // Steps to configure product can be added here
    product.build()

    return product
  }

  protected abstract create(order: AppOrder): AppProduct
}
