import type {
  IComponentModel,
  IElementModel,
} from '@codelab/frontend/abstract/domain'
import type { Ref } from 'mobx-keystone'
import type { IRuntimeElementModel } from '../runtime-element'
import type { IRuntimeComponentPropModel } from '../runtime-prop'
import type { IRuntimeStoreModel } from '../runtime-store'

export interface IRuntimeComponentDTO {
  childMapperIndex?: number
  children?: Array<Ref<IElementModel>>
  component: Ref<IComponentModel>
  id?: string
  isTypedProp?: boolean
  runtimeParent?: Ref<IRuntimeElementModel>
  runtimeProps: IRuntimeComponentPropModel
  runtimeStore: IRuntimeStoreModel
}
