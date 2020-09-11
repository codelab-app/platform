import { buttonData } from '@codelab/components/ui'
import { AppBuilder } from '../app/builder/App-builder.i'
import { AppWebBuilder } from '../app/builder/web/AppWeb-builder'
import { AppOrder } from '../app/builder/web/AppWeb-builder--order'
import { AppWebProduct } from '../app/products/web/AppWeb-product'

describe('App factory', () => {
  it('creates the view', () => {
    const order: AppOrder = buttonData
    const builder: AppBuilder = new AppWebBuilder()
    const product: AppWebProduct = builder.buildProduct(order)

    console.log(product)
  })
})
