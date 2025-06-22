import type { IElementModel } from '@codelab/frontend-abstract-domain'
import type { Maybe } from '@codelab/shared-abstract-types'
import type { ObjectMap } from 'mobx-keystone'

import type { IRuntimeElementModel } from './runtime-element.model.interface'
import type { ElementStylePseudoClass } from './runtime-element-style.model.interface'

export interface IRuntimeElementService {
  currentStylePseudoClass: ElementStylePseudoClass
  elements: ObjectMap<IRuntimeElementModel>
  elementsList: Array<IRuntimeElementModel>
  expandedCompositeKeys: Array<string>
  add(
    element: IElementModel,
    parentCompositeKey: string,
    propKey?: string,
  ): IRuntimeElementModel
  maybeRuntimeElement(compositeKey: string): Maybe<IRuntimeElementModel>
  remove(runtimeElement: IRuntimeElementModel): void
  runtimeElement(compositeKey: string): IRuntimeElementModel
  setCurrentStylePseudoClass(pseudoClass: ElementStylePseudoClass): void
}
