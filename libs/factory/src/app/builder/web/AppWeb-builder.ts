import {
  isReactNode,
  isRefNode,
  isTreeNode,
} from '@codelab/shared/interface/node'
import { AppWebProduct } from '../../products/web/AppWeb-product'
import { AppOrder } from './AppWeb-builder--order'
import { AppBuilder } from '../App-builder.i'
import { AppFactory } from '../../factories/App-factory.i'
import { AppWebFactory } from '../../factories/AppWeb-factory'

export class AppWebBuilder extends AppBuilder {
  protected create(order: AppOrder): AppWebProduct {
    let product: AppWebProduct

    if (isReactNode(order)) {
      const factory: AppFactory = new AppWebFactory(order)

      // Initialize which functions to use
      // factory.factory = elementParameterFactory
      // factory.traversal = traversePostOrder

      product = new AppWebProduct(factory)
    } else if (isTreeNode(order)) {
      //
    } else if (isRefNode(order)) {
      //
    }

    return product
  }
}
