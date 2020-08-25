import {
  isReactNode,
  isRefNode,
  isTreeNode,
  traversePostOrder,
} from '@codelab/graph'
import { elementParameterFactory } from '@codelab/ui'
import { UIOrder } from './AppWeb-builder--order'
import { AppBuilder } from '../App-builder.i'
import { WebAppProduct } from '../../products/web/WebApp-product'
import { AppFactory } from '../../factories/App-factory.i'
import { AppWebFactory } from '../../factories/AppWeb-factory'

export class AppWebBuilder extends AppBuilder {
  protected create(order: UIOrder): WebAppProduct {
    let product: WebAppProduct

    if (isReactNode(order)) {
      const factory: AppFactory = new AppWebFactory(order)

      // Initialize which functions to use
      factory.factory = elementParameterFactory
      factory.traversal = traversePostOrder

      product = new WebAppProduct(factory)
    } else if (isTreeNode(order)) {
      //
    } else if (isRefNode(order)) {
      //
    }

    return product
  }
}
