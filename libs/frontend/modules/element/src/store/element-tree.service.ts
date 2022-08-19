import { getElementService } from '@codelab/frontend/presenter/container'
import {
  IElementTree,
  IElementTreeService,
} from '@codelab/shared/abstract/core'
import {
  _async,
  _await,
  getSnapshot,
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
    console.log('-----------')

    let str = ''
    elements.forEach((e) => {
      console.log(e.id, e.name, getSnapshot(e))

      str += `${e.id}, ${e.name}\n`
    })
    console.log(str)

    console.log('---------')

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
}
