import type { IElementModel } from '@codelab/frontend/abstract/domain'
import type { Maybe, Nullable } from '@codelab/shared/abstract/types'
import type { ObjectMap } from 'mobx-keystone'

import type { IRuntimeComponentModel } from '../runtime-component'
import type { IRuntimePageModel } from '../runtime-page'
import type { IRuntimeElementModel } from './runtime-element.model.interface'
import type { ElementStylePseudoClass } from './runtime-element-style.model.interface'

export interface IRuntimeElementService {
  currentStylePseudoClass: ElementStylePseudoClass
  elements: ObjectMap<IRuntimeElementModel>
  elementsList: Array<IRuntimeElementModel>
  expandedKeys: Array<string>
  add(
    element: IElementModel,
    closestContainerNode: IRuntimeComponentModel | IRuntimePageModel,
    parentElement: Nullable<IRuntimeElementModel>,
    propKey?: string,
  ): IRuntimeElementModel
  remove(runtimeElement: IRuntimeElementModel): void
  /**
   * We need to call `render()` to setup the runtime models, so access to the runtime element is delayed until then
   */
  runtimeElement(compositeKey: string): Maybe<IRuntimeElementModel>
  setCurrentStylePseudoClass(pseudoClass: ElementStylePseudoClass): void
}
