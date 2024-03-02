import {
  IRuntimeElementModel,
  isRuntimePage,
  runtimeComponentRef,
  runtimeElementRef,
  runtimePageRef,
} from '@codelab/frontend/abstract/application'
import { elementRef, IElementModel } from '@codelab/frontend/abstract/domain'
import { computed } from 'mobx'
import type { ObjectMap } from 'mobx-keystone'
import { Model, model, modelAction, objectMap, prop } from 'mobx-keystone'
import { v4 } from 'uuid'
import { RuntimeElementModel } from './runtime-element.model'
import { RuntimeElementPropsModel } from './runtime-element-prop.model'

/**
 * We will have a single RuntimeElementService that contains all runtime elements
 *
 * - RuntimePage
 * - RuntimeComponent
 * - RuntimeElement
 */
@model('@codelab/RuntimeElementService')
export class RuntimeElementService extends Model({
  elements: prop<ObjectMap<IRuntimeElementModel>>(() => objectMap([])),
}) {
  @computed
  get elementsList() {
    return [...this.elements.values()]
  }

  @modelAction
  add(element: IElementModel): IRuntimeElementModel {
    const elementsList = [...this.elements.values()]

    const foundElement = elementsList.find(
      (runtimeElement) => runtimeElement.element.id === element.id,
    )

    if (foundElement) {
      return foundElement
    }

    const id = v4()

    const runtimeElement = RuntimeElementModel.create({
      closestContainerNode: isRuntimePage(this.closestContainerNode.current)
        ? runtimePageRef(this.closestContainerNode.id)
        : runtimeComponentRef(this.closestContainerNode.id),
      element: elementRef(element),
      id,
      runtimeProps: RuntimeElementPropsModel.create({
        runtimeElement: runtimeElementRef(id),
      }),
    })

    this.elements.set(runtimeElement.id, runtimeElement)

    return runtimeElement
  }
}
