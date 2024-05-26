import type { IRuntimeComponentService } from '@codelab/frontend/abstract/application'
import {
  IRuntimeComponentModel,
  IRuntimeModel,
  runtimeElementRef,
} from '@codelab/frontend/abstract/application'
import { IComponentModel } from '@codelab/frontend/abstract/domain'
import { computed } from 'mobx'
import type { ObjectMap } from 'mobx-keystone'
import { Model, model, modelAction, objectMap, prop } from 'mobx-keystone'
import { RuntimeComponentModel } from '../store'

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
    parent?: IRuntimeModel,
    propKey?: string,
    childMapperIndex?: number,
    isTypedProp?: boolean,
  ): IRuntimeComponentModel {
    const compositeKey = RuntimeComponentModel.compositeKey(
      component,
      parent,
      propKey,
      childMapperIndex?.toString(),
    )

    const foundComponent = this.components.get(compositeKey)

    if (foundComponent) {
      return foundComponent
    }

    const runtimeComponent = RuntimeComponentModel.create({
      childMapperIndex,
      component,
      compositeKey,
      isTypedProp,
      runtimeParent: parent
        ? runtimeElementRef(parent.compositeKey)
        : undefined,
    })

    this.components.set(runtimeComponent.compositeKey, runtimeComponent)

    return runtimeComponent
  }

  @modelAction
  delete(runtimeComponent: IRuntimeComponentModel) {
    return this.components.delete(runtimeComponent.compositeKey)
  }

  maybeRuntimeComponent(compositeKey: string) {
    return this.components.get(compositeKey)
  }

  runtimeComponent(compositeKey: string) {
    const runtimeComponent = this.components.get(compositeKey)

    if (!runtimeComponent) {
      throw new Error('Missing runtime component')
    }

    return runtimeComponent
  }
}
