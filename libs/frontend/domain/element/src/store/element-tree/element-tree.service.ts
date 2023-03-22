import type {
  IElementTree,
  IElementTreeService,
} from '@codelab/frontend/abstract/core'
import { getElementService, IElement } from '@codelab/frontend/abstract/core'
import { Model, model, modelAction, prop } from 'mobx-keystone'
import { ElementTree } from './element-tree.model'

/**
 * A base class to extend with, any model that could contain element trees
 */
// @model('@codelab/ElementTreeService')
// export class ElementTreeService
//   extends Model({
//     elementTree: prop<IElementTree>(() => new ElementTree({})).withSetter(),
//   })
//   implements IElementTreeService
// {
//   /**
//    * @param elements  All elements are assumed to be cached before being used here
//    */
//   @modelAction
//   initTree(rootElement: IElement, elements: Array<IElement>) {
//     const elementService = getElementService(rootElement)

//     elements.forEach((element) => {
//       elementService.elements.set(element.id, element)
//     })

//     this.elementTree = ElementTree.init(rootElement, elements)

//     return this.elementTree
//   }
// }
