import type { IElementModel } from '@codelab/frontend/abstract/domain'
import type { Ref } from 'mobx-keystone'
import type { IRuntimeElementModel } from '../runtime-element'

export interface IRuntimeElementPropDTO {
  elementRef: Ref<IElementModel>
  runtimeElementRef: Ref<IRuntimeElementModel>
}
