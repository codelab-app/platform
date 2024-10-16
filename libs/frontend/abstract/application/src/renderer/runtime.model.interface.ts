import type { Ref } from 'mobx-keystone'

import type { IRuntimeComponentModel } from './runtime-component'
import type { IRuntimeElementModel } from './runtime-element'
import type { IRuntimePageModel } from './runtime-page'

export type IRuntimePageNode = IRuntimeComponentModel | IRuntimeElementModel

export type IRuntimeContainerNode = IRuntimeComponentModel | IRuntimePageModel

export type IRuntimeModel =
  | IRuntimeComponentModel
  | IRuntimeElementModel
  | IRuntimePageModel

export type IRuntimeModelRef =
  | Ref<IRuntimeComponentModel>
  | Ref<IRuntimeElementModel>
  | Ref<IRuntimePageModel>
