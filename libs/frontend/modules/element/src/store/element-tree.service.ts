import { getElementService } from '@codelab/frontend/presenter/container'
import { IElementTreeService } from '@codelab/shared/abstract/core'
import { _async, _await, Model, model, modelFlow, prop } from 'mobx-keystone'
import { ElementTree } from './element-tree.model'

/**
 * A base class to extend with, any model that could contain element trees
 */
@model('@codelab/ElementTreeService')
export class ElementTreeService
  extends Model({
    elementTree: prop(() => ElementTree.init()),
  })
  implements IElementTreeService
{
  @modelFlow
  initTree = _async(function* (
    this: ElementTreeService,
    rootElementId: string,
  ) {
    const elementService = getElementService(this)
    const elements = yield* _await(elementService.getTree(rootElementId))

    this.elementTree = ElementTree.init(elements)

    return this.elementTree
  })
}
