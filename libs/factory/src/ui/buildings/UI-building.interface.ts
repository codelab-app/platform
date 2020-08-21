import { UIProduct } from '../products/UI-product.interface'

export type UIOrder = {}

export abstract class UIBuilding {
  public build(order: UIOrder): UIProduct {
    return null
  }
}
