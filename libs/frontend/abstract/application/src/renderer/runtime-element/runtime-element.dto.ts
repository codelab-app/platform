import type { IElementModel } from '@codelab/frontend/abstract/domain'
import type { Nullable } from '@codelab/shared/abstract/types'
import type { Ref } from 'mobx-keystone'

import type { IRuntimeComponentModel } from '../runtime-component'
import type { IRuntimePageModel } from '../runtime-page'
import type { IRuntimeElementPropModel } from '../runtime-prop'
import type { IRuntimeElementStyleModel } from './runtime-element-style.model.interface'

export interface IRuntimeElementDto {
  closestContainerNode: Ref<IRuntimeComponentModel> | Ref<IRuntimePageModel>
  compositeKey: string
  element: Ref<IElementModel>
  expanded: boolean
  parentElementKey: Nullable<string>
  propKey?: string
  runtimeProps: IRuntimeElementPropModel
  style: IRuntimeElementStyleModel
}
