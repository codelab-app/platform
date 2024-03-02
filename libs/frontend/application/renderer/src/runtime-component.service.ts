import type { IRuntimeComponentService } from '@codelab/frontend/abstract/application'
import {
  IRuntimeComponentModel,
  runtimeComponentRef,
  runtimeElementRef,
} from '@codelab/frontend/abstract/application'
import type { IElementModel } from '@codelab/frontend/abstract/domain'
import {
  componentRef,
  IComponentModel,
  storeRef,
} from '@codelab/frontend/abstract/domain'
import { IRef } from '@codelab/shared/abstract/core'
import isNil from 'lodash/isNil'
import { computed } from 'mobx'
import type { ObjectMap, Ref } from 'mobx-keystone'
import { Model, model, modelAction, objectMap, prop } from 'mobx-keystone'
import { v4 } from 'uuid'
import { RuntimeComponentModel } from './runtime-component.model'
import { RuntimeComponentPropModel } from './runtime-component-prop.model'
import { RuntimeStoreModel } from './runtime-store.model'

/**
 * We will have a single RuntimeElementService that contains all runtime elements
 *
 * - RuntimePage
 * - RuntimeComponent
 * - RuntimeElement
 */
@model('@codelab/RuntimeComponentService')
export class RuntimeComponentService
  extends Model({
    components: prop<ObjectMap<IRuntimeComponentModel>>(() => objectMap([])),
  })
  implements IRuntimeComponentService
{
  @computed
  get componentsList() {
    return [...this.components.values()]
  }

  @modelAction
  add(
    component: IComponentModel,
    runtimeParent: IRef,
    children: Array<Ref<IElementModel>> = [],
    childMapperIndex?: number,
    isTypedProp?: boolean,
  ): IRuntimeComponentModel {
    const componentsList = [...this.components.values()]

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

    this.components.set(runtimeComponent.id, runtimeComponent)

    return runtimeComponent
  }

  @modelAction
  delete(runtimeComponent: IRuntimeComponentModel) {
    return this.components.delete(runtimeComponent.id)
  }
}
