import { AppProduct } from '../products/App-product.interface'

export type AppOrder = {}

export abstract class AppBuilding {
  public build(order: AppOrder): AppProduct {
    const app: AppProduct = this.create(order)

    app.build()

    return app
  }

  protected abstract create(order: AppOrder): AppProduct
}
