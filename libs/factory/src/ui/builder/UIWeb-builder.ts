import {
  isReactNode,
  isTreeNode,
  isRefNode,
  traversePostOrder,
} from '@codelab/graph'
import { elementParameterFactory } from '@codelab/ui'
import { UIWebFactory } from '../factories/UIWeb-factory'
import { UIBuilder } from './UI-builder.interface'

import { UIWebProduct } from '../products/UIWeb-product'
import { UIFactory } from '../factories/UI-factory.interface'
import { UIOrder } from './UIWeb-builder--order'

export class UIWebBuilder extends UIBuilder {
  protected create(order: UIOrder): UIWebProduct {
    let product: UIWebProduct

    if (isReactNode(order)) {
      const factory: UIFactory = new UIWebFactory(order)

      // Initialize
      factory.factory = elementParameterFactory
      factory.traversal = traversePostOrder

      product = new UIWebProduct(factory)
    } else if (isTreeNode(order)) {
      //
    } else if (isRefNode(order)) {
      //
    }

    return product
  }
}
