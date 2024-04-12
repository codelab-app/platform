import type {
  IComponentModel,
  IElementModel,
} from '@codelab/frontend/abstract/domain'
import type { Maybe } from '@codelab/shared/abstract/types'
import type { ObjectMap, Ref } from 'mobx-keystone'
import type { IRuntimeModel } from './runtime.model.interface'
import type { IRuntimeComponentModel } from './runtime-component'

export interface IRuntimeComponentService {
  components: ObjectMap<IRuntimeComponentModel>
  componentsList: Array<IRuntimeComponentModel>
  add(
    component: IComponentModel,
    parent?: IRuntimeModel,
    children?: Array<Ref<IElementModel>>,
    propKey?: string,
    childMapperIndex?: number,
    isTypedProp?: boolean,
  ): IRuntimeComponentModel
  delete(runtimeComponent: IRuntimeComponentModel): void
  maybeRuntimeComponent(compositeKey: string): Maybe<IRuntimeComponentModel>
  runtimeComponent(compositeKey: string): IRuntimeComponentModel
}
