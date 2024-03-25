import type { IRuntimeComponentModel } from './runtime-component'
import type { IRuntimeElementModel } from './runtime-element'
import type { IRuntimePageModel } from './runtime-page'

export type IRuntimeModel =
  | IRuntimeComponentModel
  | IRuntimeElementModel
  | IRuntimePageModel
