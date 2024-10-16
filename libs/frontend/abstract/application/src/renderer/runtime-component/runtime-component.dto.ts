import type { IComponentModel } from '@codelab/frontend/abstract/domain'
import type { Ref } from 'mobx-keystone'

import type { IRuntimeElementModel } from '../runtime-element'

export interface IRuntimeComponentDTO {
  childMapperIndex?: number
  component: IComponentModel
  compositeKey: string
  isTypedProp?: boolean
  runtimeParent?: Ref<IRuntimeElementModel>
}
