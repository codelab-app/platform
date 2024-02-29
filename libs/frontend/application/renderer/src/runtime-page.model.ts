import {
  IRuntimeComponentModel,
  type IRuntimeElementModel,
  type IRuntimePageDTO,
  type IRuntimePageModel,
  type IRuntimeStoreModel,
  runtimeComponentRef,
  runtimeElementRef,
  runtimePageRef,
} from '@codelab/frontend/abstract/application'
import type { IPageModel } from '@codelab/frontend/abstract/domain'
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
import { RuntimeComponentModel } from './runtime-component.model'
import { RuntimeComponentPropModel } from './runtime-component-prop.model'
import { RuntimeElementModel } from './runtime-element.model'
import { RuntimeElementPropsModel } from './runtime-element-prop.model'
import { RuntimeStoreModel } from './runtime-store.model'

const create = (dto: IRuntimePageDTO) => new RuntimePageModel(dto)

@model('@codelab/RuntimePage')
export class RuntimePageModel
  extends Model({
    _runtimeComponents: prop<ObjectMap<IRuntimeComponentModel>>(() =>
      objectMap([]),
    ),
    _runtimeElements: prop<ObjectMap<IRuntimeElementModel>>(() =>
      objectMap([]),
    ),
    _runtimeRootElement: prop<Maybe<IRuntimeElementModel>>(),
    childPage: prop<Maybe<Ref<IPageModel>>>(),
    id: idProp,
    isTypedProp: prop<Maybe<boolean>>(false),
    page: prop<Ref<IPageModel>>(),
    runtimeParent: prop<Maybe<Ref<IRuntimeElementModel>>>(),
    runtimeStore: prop<IRuntimeStoreModel>(),
  })
  implements IRuntimePageModel
{
  static create = create

  @computed
  get runtimeRootElement() {
    return this.addRuntimeRootElement()
  }

  @computed
  get render(): Nullable<ReactElement> {
    return this.runtimeRootElement.render
  }

  @modelAction
  addRuntimeRootElement() {
    if (this._runtimeRootElement) {
      return this._runtimeRootElement
    }

    const id = v4()

    this._runtimeRootElement = RuntimeElementModel.create({
      closestContainerNode: runtimePageRef(this.id),
      element: elementRef(this.page.current.rootElement.id),
      id,
      runtimeProps: RuntimeElementPropsModel.create({
        runtimeElement: runtimeElementRef(id),
      }),
    })

    return this._runtimeRootElement
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
