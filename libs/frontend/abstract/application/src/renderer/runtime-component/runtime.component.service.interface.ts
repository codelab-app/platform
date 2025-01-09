import type { IComponentModel } from '@codelab/frontend/abstract/domain'
import type { Maybe } from '@codelab/shared/abstract/types'
import type { ObjectMap } from 'mobx-keystone'

import type { IRuntimeComponentModel } from '.'
import type { IRuntimeModel } from '../runtime.model.interface'

export interface IRuntimeComponentService {
  components: ObjectMap<IRuntimeComponentModel>
  componentsList: Array<IRuntimeComponentModel>
  add(
    component: IComponentModel,
    parent?: IRuntimeModel,
    propKey?: string,
    childMapperIndex?: number,
    isTypedProp?: boolean,
  ): IRuntimeComponentModel
  delete(runtimeComponent: IRuntimeComponentModel): void
  maybeRuntimeComponent(compositeKey: string): Maybe<IRuntimeComponentModel>
  runtimeComponent(compositeKey: string): IRuntimeComponentModel
}
