import type {
  IComponentModel,
  IElementModel,
} from '@codelab/frontend/abstract/domain'
import type { IRef } from '@codelab/shared/abstract/core'
import type { ObjectMap, Ref } from 'mobx-keystone'
import type { IRuntimeComponentModel } from './runtime-component'

export interface IRuntimeComponentService {
  components: ObjectMap<IRuntimeComponentModel>
  componentsList: Array<IRuntimeComponentModel>
  add(
    component: IComponentModel,
    runtimeParent: IRef,
    children?: Array<Ref<IElementModel>>,
    childMapperIndex?: number,
    isTypedProp?: boolean,
  ): IRuntimeComponentModel
  delete(runtimeComponent: IRuntimeComponentModel): void
}
