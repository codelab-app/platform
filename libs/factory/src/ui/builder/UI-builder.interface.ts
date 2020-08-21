import { UIProduct } from '../products/UI-product.interface'
import { UIOrder } from './UIWeb-builder--order'

/**
 * Builder pattern
 */
export abstract class UIBuilder {
  public buildProduct(order: UIOrder): UIProduct {
    const product: UIProduct = this.create(order)

    product.build()

    return product
  }

  protected abstract create(order: UIOrder): UIProduct
}
