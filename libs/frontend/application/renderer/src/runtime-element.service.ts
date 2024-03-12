import type {
  IRuntimeElementModel,
  IRuntimeElementService,
} from '@codelab/frontend/abstract/application'
import {
  IRuntimeModel,
  isRuntimeElement,
  isRuntimePage,
  runtimeComponentRef,
  runtimeElementRef,
  runtimePageRef,
} from '@codelab/frontend/abstract/application'
import { elementRef, IElementModel } from '@codelab/frontend/abstract/domain'
import { computed } from 'mobx'
import type { ObjectMap } from 'mobx-keystone'
import { Model, model, modelAction, objectMap, prop } from 'mobx-keystone'
import { RuntimeElementModel } from './runtime-element.model'
import { RuntimeElementPropsModel } from './runtime-element-prop.model'

/**
 * We will have a single RuntimeElementService that contains all runtime elements
 *
 */
@model('@codelab/RuntimeElementService')
export class RuntimeElementService
  extends Model({
    elements: prop<ObjectMap<IRuntimeElementModel>>(() => objectMap([])),
  })
  implements IRuntimeElementService
{
  @computed
  get elementsList() {
    return [...this.elements.values()]
  }

  @modelAction
  add(element: IElementModel, parent: IRuntimeModel, propKey?: string) {
    /**
     * id must be unique across the whole trees.
     * to achieve that we use a composite key
     *
     */
    const compositeKey = RuntimeElementModel.compositeKey(element, propKey)
    const foundElement = this.elements.get(compositeKey)

    if (foundElement) {
      return foundElement
    }

    const closestContainerNode = isRuntimeElement(parent)
      ? parent.closestContainerNode.current
      : parent

    const runtimeElement = RuntimeElementModel.create({
      closestContainerNode: isRuntimePage(closestContainerNode)
        ? runtimePageRef(closestContainerNode.compositeKey)
        : runtimeComponentRef(closestContainerNode.compositeKey),
      compositeKey,
      element: elementRef(element),
      propKey,
      runtimeProps: RuntimeElementPropsModel.create({
        runtimeElement: runtimeElementRef(compositeKey),
      }),
    })

    this.elements.set(runtimeElement.compositeKey, runtimeElement)

    return runtimeElement
  }

  element(compositeKey: string) {
    return this.elements.get(compositeKey)
  }
}
