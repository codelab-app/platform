import type { IRuntimeModel, IRuntimeModelRef } from './runtime.model.interface'

import { isRuntimeComponent, runtimeComponentRef } from './runtime-component'
import { isRuntimeElement, runtimeElementRef } from './runtime-element'
import { runtimePageRef } from './runtime-page'

export const runtimeModelRef = (model: IRuntimeModel): IRuntimeModelRef =>
  isRuntimeComponent(model)
    ? runtimeComponentRef(model)
    : isRuntimeElement(model)
      ? runtimeElementRef(model)
      : runtimePageRef(model)
