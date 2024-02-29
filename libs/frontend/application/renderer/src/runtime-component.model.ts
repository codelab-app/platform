import {
  type IRuntimeComponentDTO,
  type IRuntimeComponentModel,
  type IRuntimeComponentPropModel,
  type IRuntimeElementModel,
  type IRuntimeStoreModel,
  runtimeComponentRef,
  runtimeElementRef,
} from '@codelab/frontend/abstract/application'
import {
  componentRef,
  elementRef,
  IComponentModel,
  IElementModel,
  storeRef,
} from '@codelab/frontend/abstract/domain'
import { IRef } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import { Nullable } from '@codelab/shared/abstract/types'
import isNil from 'lodash/isNil'
import { computed } from 'mobx'
import type { ObjectMap, Ref } from 'mobx-keystone'
import {
  idProp,
  Model,
  model,
  modelAction,
  objectMap,
  prop,
} from 'mobx-keystone'
import type { ReactElement } from 'react'
import { v4 } from 'uuid'
import { RuntimeComponentPropModel } from './runtime-component-prop.model'
import { RuntimeElementModel } from './runtime-element.model'
import { RuntimeElementPropsModel } from './runtime-element-prop.model'
import { RuntimeStoreModel } from './runtime-store.model'

const create = (dto: IRuntimeComponentDTO) => new RuntimeComponentModel(dto)

@model('@codelab/RuntimeComponent')
export class RuntimeComponentModel
  extends Model({
    _runtimeComponents: prop<ObjectMap<IRuntimeComponentModel>>(() =>
      objectMap([]),
    ),
    _runtimeElements: prop<ObjectMap<IRuntimeElementModel>>(() =>
      objectMap([]),
    ),
    childMapperIndex: prop<Maybe<number>>().withSetter(),
    children: prop<Array<Ref<IElementModel>>>(() => []),
    component: prop<Ref<IComponentModel>>(),
    id: idProp,
    isTypedProp: prop<Maybe<boolean>>(false),
    runtimeParent: prop<Maybe<Ref<IRuntimeElementModel>>>(),
    runtimeProps: prop<IRuntimeComponentPropModel>(),
    runtimeStore: prop<IRuntimeStoreModel>(),
  })
  implements IRuntimeComponentModel
{
  static create = create

  @computed
  get render(): Nullable<ReactElement> {
    return this.runtimeRootElement.render
  }

  @computed
  get runtimeElementsList() {
    return [...this._runtimeElements.values()]
  }

  @computed
  get runtimeRootElement() {
    return this.addElement(this.component.current.rootElement.current)
  }

  @modelAction
  addComponent(
    component: IComponentModel,
    runtimeParent: IRef,
    children: Array<Ref<IElementModel>> = [],
    childMapperIndex?: number,
    isTypedProp?: boolean,
  ): IRuntimeComponentModel {
    const componentsList = [...this._runtimeComponents.values()]

    const foundComponent = componentsList.find(
      (runtimeComponent) =>
        runtimeComponent.component.id === component.id &&
        isNil(childMapperIndex),
    )

    if (foundComponent) {
      return foundComponent
    }

    const id = v4()

    const runtimeComponent = RuntimeComponentModel.create({
      childMapperIndex,
      children,
      component: componentRef(component.id),
      id,
      isTypedProp,
      runtimeParent: runtimeElementRef(runtimeParent.id),
      runtimeProps: RuntimeComponentPropModel.create({
        runtimeComponent: runtimeComponentRef(id),
      }),
      runtimeStore: RuntimeStoreModel.create({
        store: storeRef(component.store.id),
      }),
    })

    this._runtimeComponents.set(runtimeComponent.id, runtimeComponent)

    return runtimeComponent
  }

  @modelAction
  addElement(element: IElementModel): IRuntimeElementModel {
    const elementsList = [...this._runtimeElements.values()]

    const foundElement = elementsList.find(
      (runtimeElement) => runtimeElement.element.id === element.id,
    )

    if (foundElement) {
      return foundElement
    }

    const id = v4()

    const runtimeElement = RuntimeElementModel.create({
      closestContainerNode: runtimeComponentRef(this.id),
      element: elementRef(element),
      id,
      runtimeProps: RuntimeElementPropsModel.create({
        runtimeElement: runtimeElementRef(id),
      }),
    })

    this._runtimeElements.set(runtimeElement.id, runtimeElement)

    return runtimeElement
  }
}
