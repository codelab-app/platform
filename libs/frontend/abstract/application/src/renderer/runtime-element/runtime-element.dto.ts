import type { IElementModel } from '@codelab/frontend/abstract/domain'
import type { Ref } from 'mobx-keystone'

import type { IRuntimeElementPropModel } from '../runtime-prop'
import type { IRuntimeElementStyleModel } from './runtime-element-style.model.interface'

export interface IRuntimeElementDto {
  compositeKey: string
  element: Ref<IElementModel>
  expanded: boolean
  parentCompositeKey: string
  propKey?: string
  runtimeProps: IRuntimeElementPropModel
  style: IRuntimeElementStyleModel
}
