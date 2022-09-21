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
  @modelFlow
  initTree = _async(function* (
    this: ElementTreeService,
    rootElementId: string,
  ) {
    const elementService = getElementService(this)
    const elements = yield* _await(elementService.getDescendants(rootElementId))

    elements.forEach((element) => {
      elementService.elements.set(element.id, element)
    })

    const rootElement = elementService.element(rootElementId)

    if (!rootElement) {
      throw new Error('root element not found')
    }

    this.elementTree = ElementTree.init(rootElement, elements)

    return this.elementTree
  })

  /**
   * @param elements  All elements are assumed to be cached before being used here
   */
  @modelAction
  initTreeV2 = (rootElement: IElement, elements: Array<IElement>) => {
    console.debug('ElementTreeService.initTreeV2', elements)

    const elementService = getElementService(this)

    elements.forEach((element) => {
      elementService.elements.set(element.id, element)
    })

    this.elementTree = ElementTree.init(rootElement, elements)

    return this.elementTree
  }
}
