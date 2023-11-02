import type { IElementModel } from '@codelab/frontend/abstract/domain'
import type { Ref } from 'mobx-keystone'
import type { IRuntimeModelRef } from '../runtime.model.interface'

export interface IRuntimeElementDTO {
  elementRef: Ref<IElementModel>
  parentRef: IRuntimeModelRef
}
