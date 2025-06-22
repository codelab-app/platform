import type {
  IRuntimeElementModel,
  IRuntimeElementService,
} from '@codelab/frontend-abstract-application'
import type { IElementModel } from '@codelab/frontend-abstract-domain'
import type { ObjectMap } from 'mobx-keystone'

import {
  ElementStylePseudoClass,
  runtimeElementRef,
} from '@codelab/frontend-abstract-application'
import { elementRef } from '@codelab/frontend-abstract-domain'
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
    elements: prop<ObjectMap<IRuntimeElementModel>>(() =>
      objectMap<IRuntimeElementModel>([]),
    ),
  })
  implements IRuntimeElementService
{
  @computed
  get elementsList() {
    return [...this.elements.values()]
  }

  @computed
  get expandedCompositeKeys() {
    return this.elementsList
      .filter((runtimeElement) => runtimeElement.expanded)
      .map((runtimeElement) => runtimeElement.compositeKey)
  }

  @modelAction
  add(element: IElementModel, parentCompositeKey: string, propkey?: string) {
    /**
     * id must be unique across the whole trees.
     * to achieve that we use a composite key
     *
     */
    const compositeKey = RuntimeElementModel.compositeKey(
      element,
      parentCompositeKey,
      propkey,
    )

    const foundElement = this.elements.get(compositeKey)

    if (foundElement) {
      return foundElement
    }

    const runtimeElement = RuntimeElementModel.create({
      compositeKey,
      element: elementRef(element),
      expanded: false,
      parentCompositeKey,
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

  maybeRuntimeElement(compositeKey: string) {
    return this.elements.get(compositeKey)
  }

  @modelAction
  remove(runtimeElement: IRuntimeElementModel) {
    return this.elements.delete(runtimeElement.compositeKey)
  }

  runtimeElement(compositeKey: string) {
    const runtimeElement = this.elements.get(compositeKey)

    if (!runtimeElement) {
      throw new Error('Missing runtime element')
    }

    return runtimeElement
  }
}
