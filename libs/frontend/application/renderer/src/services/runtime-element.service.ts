import type {
  IRuntimeComponentModel,
  IRuntimeElementModel,
  IRuntimeElementService,
  IRuntimePageModel,
} from '@codelab/frontend/abstract/application'
import type { IElementModel } from '@codelab/frontend/abstract/domain'
import type { Nullable } from '@codelab/shared/abstract/types'
import type { ObjectMap } from 'mobx-keystone'

import {
  ElementStylePseudoClass,
  isRuntimePage,
  runtimeComponentRef,
  runtimeElementRef,
  runtimePageRef,
} from '@codelab/frontend/abstract/application'
import { elementRef } from '@codelab/frontend/abstract/domain'
import { computed } from 'mobx'
import { Model, model, modelAction, objectMap, prop } from 'mobx-keystone'

import { RuntimeElementModel, RuntimeElementPropsModel } from '../store'
import { RuntimeElementStyle } from '../store/runtime-element-style.model'

/**
 * We will have a single RuntimeElementService that contains all runtime elements
 *
 */
@model('@codelab/RuntimeElementService')
export class RuntimeElementService
  extends Model({
    currentStylePseudoClass: prop(
      () => ElementStylePseudoClass.None,
    ).withSetter(),
    elements: prop<ObjectMap<IRuntimeElementModel>>(() => objectMap([])),
  })
  implements IRuntimeElementService
{
  @computed
  get elementsList() {
    return [...this.elements.values()]
  }

  @modelAction
  add(
    element: IElementModel,
    closestContainerNode: IRuntimeComponentModel | IRuntimePageModel,
    parentElement: Nullable<IRuntimeElementModel>,
    propKey?: string,
  ) {
    /**
     * id must be unique across the whole trees.
     * to achieve that we use a composite key
     *
     */
    const compositeKey = RuntimeElementModel.compositeKey(
      element,
      closestContainerNode,
      propKey,
    )

    const foundElement = this.elements.get(compositeKey)

    if (foundElement) {
      return foundElement
    }

    const runtimeElement = RuntimeElementModel.create({
      closestContainerNode: isRuntimePage(closestContainerNode)
        ? runtimePageRef(closestContainerNode.compositeKey)
        : runtimeComponentRef(closestContainerNode.compositeKey),
      compositeKey,
      element: elementRef(element),
      parentElementKey: parentElement ? parentElement.compositeKey : null,
      propKey,
      runtimeProps: RuntimeElementPropsModel.create({
        runtimeElement: runtimeElementRef(compositeKey),
      }),
      style: new RuntimeElementStyle({
        builderStyle: '',
        element: elementRef(element),
      }),
    })

    this.elements.set(runtimeElement.compositeKey, runtimeElement)

    return runtimeElement
  }

  @modelAction
  getExpandedCompositeKeys() {
    return this.elementsList
      .filter((runtimeElement) => runtimeElement.element.current.expanded)
      .map((runtimeElement) => runtimeElement.compositeKey)
  }

  @modelAction
  remove(runtimeElement: IRuntimeElementModel) {
    return this.elements.delete(runtimeElement.compositeKey)
  }

  maybeRuntimeElement(compositeKey: string) {
    return this.elements.get(compositeKey)
  }

  runtimeElement(compositeKey: string) {
    const runtimeElement = this.elements.get(compositeKey)

    if (!runtimeElement) {
      throw new Error('Missing runtime element')
    }

    return runtimeElement
  }
}
