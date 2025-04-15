import type { IElementModel } from '@codelab/frontend-abstract-domain'
import type { Maybe, Nullable } from '@codelab/shared-abstract-types'
import type { ObjectMap } from 'mobx-keystone'

import type { IRuntimeComponentModel } from '../runtime-component'
import type { IRuntimePageModel } from '../runtime-page'
import type { IRuntimeElementModel } from './runtime-element.model.interface'
import type { ElementStylePseudoClass } from './runtime-element-style.model.interface'

export interface IRuntimeElementService {
  currentStylePseudoClass: ElementStylePseudoClass
  elements: ObjectMap<IRuntimeElementModel>
  elementsList: Array<IRuntimeElementModel>
  expandedCompositeKeys: Array<string>
  add(
    element: IElementModel,
    closestContainerNode: IRuntimeComponentModel | IRuntimePageModel,
    parentElement: Nullable<IRuntimeElementModel>,
    propKey?: string,
  ): IRuntimeElementModel
  maybeRuntimeElement(compositeKey: string): Maybe<IRuntimeElementModel>
  remove(runtimeElement: IRuntimeElementModel): void
  runtimeElement(compositeKey: string): IRuntimeElementModel
  setCurrentStylePseudoClass(pseudoClass: ElementStylePseudoClass): void
}
