import type {
  IComponentModel,
  IElementModel,
} from '@codelab/frontend/abstract/domain'
import type { Ref } from 'mobx-keystone'
import type { IRuntimeElementModel } from '../runtime-element'

export interface IRuntimeComponentDTO {
  childMapperIndex?: number
  children?: Array<Ref<IElementModel>>
  component: IComponentModel
  compositeKey: string
  isTypedProp?: boolean
  runtimeParent?: Ref<IRuntimeElementModel>
}
