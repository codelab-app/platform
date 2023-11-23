import type { IElementModel } from '@codelab/frontend/abstract/domain'
import type { Ref } from 'mobx-keystone'
import type { IRuntimeModelRef } from '../runtime.model.interface'
import type { IRuntimeElementPropModel } from '../runtime-prop'

export interface IRuntimeElementDTO {
  element: Ref<IElementModel>
  id: string
  parent: IRuntimeModelRef
  runtimeProps: IRuntimeElementPropModel
}
