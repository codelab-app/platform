import type { IElementModel } from '@codelab/frontend/abstract/domain'
import type { Ref } from 'mobx-keystone'
import type { IRuntimeModelRef } from '../runtime.model.interface'
import type { IRuntimePropModel } from '../runtime-prop'

export interface IRuntimeElementDTO {
  elementRef: Ref<IElementModel>
  id: string
  parentRef: IRuntimeModelRef
  runtimeProps: IRuntimePropModel
}
