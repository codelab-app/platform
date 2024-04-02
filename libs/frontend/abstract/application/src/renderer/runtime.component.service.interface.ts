import type { IComponentModel } from '@codelab/frontend/abstract/domain'
import type { ObjectMap, Ref } from 'mobx-keystone'
import type { IRuntimeModel } from './runtime.model.interface'
import type { IRuntimeComponentModel } from './runtime-component'

export interface IRuntimeComponentService {
  components: ObjectMap<IRuntimeComponentModel>
  componentsList: Array<IRuntimeComponentModel>
  add(
    component: IComponentModel,
    parent: IRuntimeModel,
    children: Array<Ref<IRuntimeModel>>,
    propKey?: string,
    childMapperIndex?: number,
    isTypedProp?: boolean,
  ): IRuntimeComponentModel
  delete(runtimeComponent: IRuntimeComponentModel): void
}
