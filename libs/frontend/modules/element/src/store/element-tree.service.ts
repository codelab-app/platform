import { getElementService } from '@codelab/frontend/presenter/container'
import {
  IElement,
  IElementTree,
  IElementTreeService,
} from '@codelab/shared/abstract/core'
import {
  _async,
  _await,
  Model,
  model,
  modelAction,
  modelFlow,
  prop,
} from 'mobx-keystone'
import { ElementTree } from './element-tree.model'

/**
 * A base class to extend with, any model that could contain element trees
 */
@model('@codelab/ElementTreeService')
export class ElementTreeService
  extends Model({
    elementTree: prop<IElementTree>(null!).withSetter(),
  })
  implements IElementTreeService
{
  @modelAction
  test(t: any) {
    this.elementTree = t
  }

  @modelFlow
  initTree = _async(function* (
    this: ElementTreeService,
    rootElementId: string,
  ) {
    const elementService = getElementService(this)
    const elements = yield* _await(elementService.getDescendants(rootElementId))

    /**
     * Here we need to add to elementService
     */
    elements.forEach((element) => {
      elementService.elements.set(element.id, element)
    })

    if (!this.elementTree) {
      this.elementTree = ElementTree.init(elements)

      return this.elementTree
    }

    this.elementTree.buildTree(elements)

    return this.elementTree
  })

  /**
   * @param elements All elements are assumed to be cached before being used here
   */
  @modelAction
  initTreeV2 = (elements: Array<IElement>) => {
    console.debug('ElementTreeService.initTreeV2', elements)

    const elementService = getElementService(this)

    elements.forEach((element) => {
      elementService.elements.set(element.id, element)
    })

    if (!this.elementTree) {
      this.elementTree = ElementTree.init(elements)

      return this.elementTree
    }

    this.elementTree.buildTree(elements)

    return this.elementTree
  }
}
