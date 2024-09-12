import type { IElementModel } from '@codelab/frontend/abstract/domain'
import type { Maybe, Nullable } from '@codelab/shared/abstract/types'
import type { ObjectMap } from 'mobx-keystone'
import type { IRuntimeComponentModel } from './runtime-component'
import type {
  ElementStylePseudoClass,
  IRuntimeElementModel,
} from './runtime-element'
import type { IRuntimePageModel } from './runtime-page'

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
  delete(runtimeElement: IRuntimeElementModel): void
  maybeRuntimeElement(compositeKey: string): Maybe<IRuntimeElementModel>
  runtimeElement(compositeKey: string): IRuntimeElementModel
  setCurrentStylePseudoClass(pseudoClass: ElementStylePseudoClass): void
}
