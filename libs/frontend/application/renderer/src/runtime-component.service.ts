import type { IRuntimeComponentService } from '@codelab/frontend/abstract/application'
import {
  IRuntimeComponentModel,
  IRuntimeModel,
  runtimeElementRef,
} from '@codelab/frontend/abstract/application'
import type { IElementModel } from '@codelab/frontend/abstract/domain'
import { IComponentModel } from '@codelab/frontend/abstract/domain'
import { ObjectKey } from '@codelab/shared/utils'
import { computed } from 'mobx'
import type { ObjectMap, Ref } from 'mobx-keystone'
import { Model, model, modelAction, objectMap, prop } from 'mobx-keystone'
import { RuntimeComponentModel } from './runtime-component.model'

/**
 * We will have a single RuntimeComponentService that contains all runtime components
 *
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
    parent: IRuntimeModel,
    children: Array<Ref<IElementModel>> = [],
    propKey?: ObjectKey,
    childMapperIndex?: number,
    isTypedProp?: boolean,
  ): IRuntimeComponentModel {
    const compositeKey = RuntimeComponentModel.compositeKey(
      component,
      propKey,
      childMapperIndex,
    )

    const foundComponent = this.components.get(compositeKey)

    if (foundComponent) {
      return foundComponent
    }

    const runtimeComponent = RuntimeComponentModel.create({
      childMapperIndex,
      children,
      component,
      compositeKey,
      isTypedProp,
      runtimeParent: runtimeElementRef(parent.compositeKey),
    })

    this.components.set(runtimeComponent.compositeKey, runtimeComponent)

    return runtimeComponent
  }

  @modelAction
  delete(runtimeComponent: IRuntimeComponentModel) {
    return this.components.delete(runtimeComponent.compositeKey)
  }

  component(compositeKey: string) {
    return this.components.get(compositeKey)
  }
}
